"use strict";

import { find, get } from "lodash";
import { all, call, put, select, takeLatest, throttle } from "redux-saga/effects";
import { user, UserActionPayload, UserActions, UserAALoginPayload } from "./user.actions";
import { consul } from "../consul/consul.actions";
import { b2cCheckout } from "../b2cCheckout/b2cCheckout.actions";
import { AppState } from "../../reducers";
import { PostalAddress, User } from "../../types";
import UserService from "../../services/UserService";
import PostalAddressService from "../../services/PostalAddressService";
import actions, { ChangeSimActionPayload, ChangeSimActions } from "../../actions";
import { getUser, getStoredCustomerModel } from "./user.selectors";
import { withFunctionCustomization, B2CFunctionCustomizationPoints } from "../../../customization";
import { parseJSON, SessionUtils, SessionKeys } from "../../../utils/SessionUtils";


const resolveCustomizedLoginRedirectUrl = withFunctionCustomization(B2CFunctionCustomizationPoints.CUSTOM_LOGIN_URL_PROVIDER, () => null);
const URI_LOCATION_STATE = "uriLocation";

function* onAALogin(action: UserAALoginPayload) {
	const { anonymousUser, loginHint, isSilentAuth } = action;

	const state: AppState = yield select();

	const customizedLoginRedirectUrl = resolveCustomizedLoginRedirectUrl(state);
	if (customizedLoginRedirectUrl) {
		window.location.assign(customizedLoginRedirectUrl);
	}

	const { pathname: path, search: query } = window.location; // TODO: ok to access window here?
	yield put(actions.uriLocation.saveUri(path, query));

	let sessionState: object | null = parseJSON(SessionUtils.getItem(SessionKeys.app));
	if (sessionState) {
		const uriLocation = get(sessionState, URI_LOCATION_STATE, {});
		(sessionState as any)[URI_LOCATION_STATE] = { ...uriLocation, path, query };
	} else {
		sessionState = { [URI_LOCATION_STATE]: { path, query, pathname: "" } };
	}

	SessionUtils.setItem(SessionKeys.app, JSON.stringify(sessionState));

	try {
		const response: string = yield call(UserService.authorize, loginHint, anonymousUser, isSilentAuth);
		yield put(actions.user.aaLoginComplete(anonymousUser));
		window.location.assign(response);
	} catch (error) {
		yield put(actions.user.loginError(error));
	}
}

function* onAddPersonData(action: UserActionPayload) {
	const language = yield select(
		(state: AppState): string => {
			const user = state.digitalLife.user as User;
			const person = find(state.digitalLife.people, { id: user.id });
			const toolMode = state.navBar.toolmode;
			const userNotDefined = !get(state.user.user, "attributes");
			return userNotDefined && !toolMode && get(person, "attributes.language");
		}
	);

	if (language) {
		yield put(consul.changeLanguageByCode(language));
	}
}

function* onGetChargingBalances(action: UserActionPayload) {
	try {
		const response = yield call(() => {
			return UserService.getChargingBalances(action.billingAccountId as string);
		});

		yield put(user.getChargingBalancesComplete(response));
	} catch (e) {
		yield put(user.getChargingBalancesFail(e));
	}
}

function* onLogout(action: UserActionPayload) {
	try {
		const redirectUrl: string = yield call(() => {
			return UserService.logout();
		});

		yield put(b2cCheckout.clearIdentifications());
		yield put(user.logoutComplete(redirectUrl));
	} catch (e) {}
}
function* onUpdatePostalAddress(action: UserActionPayload) {
	const { postalAddress, forceAddressUpdate } = action;
	if (!postalAddress || forceAddressUpdate === undefined) {
		window.console.error("Missing postalAddress in UserActionPayload");
		return;
	}
	const user = yield select(getUser);
	if (!user) {
		return;
	}
	try {
		const resp = yield call(PostalAddressService.updateOrCreatePostalAddress, {
			postalAddress,
			individualId: user.id,
			forceAddressUpdate
		});
		postalAddress.id = resp.id;
		yield put(actions.user.updatePostalAddressComplete(postalAddress));
	} catch (e) {
		if (e.errorContainer) {
			yield put(actions.error.onAddressValidationError(e.errorContainer));
		}
	}
}

function* onGenerateOneTimePassword(action: UserActionPayload) {
	const { userId } = action;

	if (!userId) {
		return;
	}

	try {
		const resp = yield call(UserService.generateOneTimePassword, userId);
		const oneTimePasswordToken = resp.data.attributes.encryptedOTP;
		yield put(actions.user.generateOneTimePasswordComplete(oneTimePasswordToken));
	} catch (e) {
		if (e.errorContainer) {
			yield put(actions.user.generateOneTimePasswordFail(e.errorContainer));
		} else {
			throw e;
		}
	}
}

function* onCheckOneTimePassword(action: UserActionPayload) {
	const { oneTimePassword, oneTimePasswordToken } = action;

	if (!oneTimePassword || !oneTimePasswordToken) {
		return;
	}
	try {
		const isOneTimePasswordValid = yield call(UserService.validateOneTimePassword, oneTimePassword, oneTimePasswordToken);
		yield put(actions.user.checkOneTimePasswordComplete(isOneTimePasswordValid));
	} catch (e) {
		if (e.errorContainer) {
			yield put(actions.user.checkOneTimePasswordFail(e.errorContainer));
		} else {
			throw e;
		}
	}
}

function* onChangeDeliveryAddressComplete(action: ChangeSimActionPayload) {
	yield put(actions.user.setIsPostalAddressUpdated());
}

const getStoredCustomerAddress = (postalAddress?: PostalAddress): Partial<PostalAddress> | undefined => {
	return postalAddress && {
		street: postalAddress.street,
		building: postalAddress.building,
		description: postalAddress.description,
		stateOrProvince: postalAddress.stateOrProvince,
		county: postalAddress.county,
		postalCode: postalAddress.postalCode,
		city: postalAddress.city,
		country: postalAddress.country,
		role: postalAddress.role
	};
};

function* onUpdatePostalAddressComplete(action: UserActionPayload) {
	const { postalAddress } = action;
	const storedUser = yield select(getStoredCustomerModel);
	const storedAddress = getStoredCustomerAddress(postalAddress);
	if (storedUser && storedAddress) {
		yield put(actions.b2cCheckout.storeUserInformation({ ...storedUser, address: { ...storedAddress } }));
	}
}

export function* userSaga(): Iterable<any> {
	yield all([
		takeLatest(UserActions.ADD_PERSON_DATA, onAddPersonData),
		takeLatest(UserActions.GET_CHARGING_BALANCES, onGetChargingBalances),
		takeLatest(UserActions.LOGOUT, onLogout),
		takeLatest(UserActions.UPDATE_POSTAL_ADDRESS, onUpdatePostalAddress),
		takeLatest(UserActions.UPDATE_POSTAL_ADDRESS_COMPLETE, onUpdatePostalAddressComplete),
		takeLatest(UserActions.GENERATE_ONE_TIME_PASSWORD, onGenerateOneTimePassword),
		takeLatest(UserActions.CHECK_ONE_TIME_PASSWORD, onCheckOneTimePassword),
		throttle(5000, UserActions.AA_LOGIN, onAALogin),
		takeLatest(ChangeSimActions.CHANGE_DELIVERY_ADDRESS_COMPLETE, onChangeDeliveryAddressComplete),
	]);
}
