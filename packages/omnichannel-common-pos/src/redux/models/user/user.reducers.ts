"use strict";

import { UserActions, UserActionPayload } from "./user.actions";
import { UserState } from "./user.types";
import { PersonAttributes } from "../../types";
import isClient from "../../../utils/isClient";
import SessionStorage, { SessionStorageKeysEnum } from "../../services/SessionStorage";
import { isChannelCmsAdmin } from "../../utils";
import { saveStateToSessionStore } from "../../../customization/customization";
import { SessionUtils, SessionKeys } from "../../../utils/SessionUtils";
const Cookies = require("universal-cookie");

export { UserState } from "./user.types";

const initialState = {
	hasInitialized: false,
	hasResults: false,
	updatingUser: false,
	salesRepSession: {
		showModal: false,
		active: false,
		sessionId: "",
		terminals: [],
		userRoleId: "",
		salesOrganizationRoleId: ""
	},
	anonymousUser: false,
	showPasswordChangeConfirmation: false,
	identificationExists: false,
	resendSuccessful: false,
	chargingBalances: [],
	oneTimePassword: "",
	deliveryIdentificationId: "",
	toolmodeIndividualId: null,
	impersonatedIndividualId: null,
	error: undefined,
};

const userReducer = (state: Partial<UserState> = initialState, action: UserActionPayload): Partial<UserState> => {
	const { type } = action;
	switch (type) {
		case UserActions.FLUX_SYNC:
			return {
				...state,
				...action.fluxState
			};
		case UserActions.LOGOUT_COMPLETE: {
			if (isClient && process.env.BROWSER) {
				if (isChannelCmsAdmin()) {
					new Cookies().remove("session_state", { path: "/" });
				}
				if (SessionStorage) {
					// need to cancel the debounce to avoid race condition when emptying sessionStorage
					saveStateToSessionStore.cancel();
					SessionStorage.removeItem(SessionStorageKeysEnum.sessionUser);
					SessionStorage.clear();
				}
				if (isClient) {
					window.location.replace(action.redirectUrl!);
				}
			}
			break;
		}
		case UserActions.READ_COOKIE:
			const cookies = new Cookies();
			cookies.set("cookie_banner", "approved", { path: "/" });
			break;
		case UserActions.ADD_PERSON_DATA:
			return {
				...state,
				user: { ...state.user!, attributes: action.person as PersonAttributes }
			};
		case UserActions.GET_CHARGING_BALANCES_COMPLETE:
			return {
				...state,
				chargingBalances: action.balances
			};
		case UserActions.RESET_IS_POSTAL_ADDRESS_UPDATED:
			return {
				...state,
				isPostalAddressUpdated: false
			};
		case UserActions.SET_IS_POSTAL_ADDRESS_UPDATED:
			return {
				...state,
				isPostalAddressUpdated: true
			};
		case UserActions.UPDATE_POSTAL_ADDRESS_COMPLETE:
			const { postalAddress } = action;
			if (!state.user || !postalAddress) {
				return state;
			}
			const oldPostalAddresses = state.user.attributes.postalAddresses || [];
			const oldPostalAddressesExceptUpdated = postalAddress.id
				? oldPostalAddresses.filter(address => address.id !== postalAddress.id)
				: oldPostalAddresses;
			const newPostalAddresses = [...oldPostalAddressesExceptUpdated, postalAddress];
			return {
				...state,
				isPostalAddressUpdated: true,
				user: { ...state.user, attributes: { ...state.user.attributes, postalAddresses: newPostalAddresses } }
			};
		case UserActions.GENERATE_ONE_TIME_PASSWORD_COMPLETE:
			const { oneTimePasswordToken } = action;
			return {
				...state,
				oneTimePasswordToken
			};
		case UserActions.GENERATE_ONE_TIME_PASSWORD_FAIL:
			return {
				...state,
				error: action.error
			};
		case UserActions.CHECK_ONE_TIME_PASSWORD_COMPLETE:
			const { isOneTimePasswordValid } = action;
			return {
				...state,
				isOneTimePasswordValid
			};
		case UserActions.CHECK_ONE_TIME_PASSWORD_FAIL:
			return {
				...state,
				error: action.error
			};

		case UserActions.AA_LOGIN_COMPLETE:
			const anonymousUser = action.value;
			SessionUtils.setItem(SessionKeys.anonymousUser, anonymousUser + "");
			return {
				...state,
				anonymousUser: Boolean(anonymousUser),
			};
		
		case UserActions.LOGIN_ERROR:
			return {
				...state,
				user: undefined,
				error: action.value,
				hasInitialized: true,
			};

		default:
			return state;
	}
	// solves typescript error TS2366 when function returns Partial<UserState>
	return state;
};

export default userReducer;
