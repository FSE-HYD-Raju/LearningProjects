"use strict";

import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { changeSim, ChangeSimActionPayload, ChangeSimActions } from "./changeSim.actions";
import { ChangeSimService, DeliveryService } from "../../../services";
import { productOfferings } from "../../productOfferings/productOfferings.actions";
import { CHANGE_SIM_INITIALIZE_LOADING_KEY, ChangeResourceInitialization, ProductOffering } from "../../../types";
import BasketService from "../../../services/BasketService";
import { ChangeSimUtil } from "./changeSim.util";
import { loadingOverlay } from "../../loadingOverlay/loadingOverlay.actions";
import ChangeSimSagaUtil from "./ChangeSimSagaUtil";
import { payment, PaymentActionPayload, PaymentActions } from "../../payment/payment.actions";
import { UserActionPayload, UserActions } from "../../user/user.actions";
import { getUser } from "../../user/user.selectors";
import PostalAddressService from "../../../services/PostalAddressService";
import actions from "../../../actions";
import PostalAddressUtil from "../../../../utils/user/PostalAddressUtil";

function* onInitialize(action: ChangeSimActionPayload) {
	let createdBasketId: string | undefined;
	const { initializeRequest } = action;
	if (!initializeRequest) {
		console.error("Arguments are not set for changeSim.saga.onInitialize");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(CHANGE_SIM_INITIALIZE_LOADING_KEY));
	try {
		const changeSimInitializeResult: ChangeResourceInitialization = yield call(
			ChangeSimService.initialize,
			initializeRequest
		);
		createdBasketId = ChangeSimUtil.extractBasketId(changeSimInitializeResult);

		yield put(productOfferings.getProductOffering(initializeRequest.poId));
		const reasons = yield call(ChangeSimSagaUtil.fetchReasons, initializeRequest.reasonsPOIds);
		const shippingMethods = yield call(DeliveryService.getShippingMethodsForPO, initializeRequest.poId);
		if (ChangeSimSagaUtil.hasCreditCardPaymentMethod(changeSimInitializeResult)) {
			yield put(
				payment.getCustomerPaymentMethods(
					initializeRequest.user!.customerAccountId ||
						(initializeRequest.user!.attributes && initializeRequest.user!.attributes.customerAccountId) ||
						""
				)
			);
		}

		const user = yield select(getUser);
		let deliveryAddress;
		if (Boolean(user)) {
			deliveryAddress = PostalAddressUtil.getPrimaryAddressAsTemplate(user);
		}

		yield put(
			changeSim.initializeComplete(changeSimInitializeResult, reasons as ProductOffering[], shippingMethods, deliveryAddress)
		);
		yield put(changeSim.showChangeSimModal(true));
	} catch (e) {
		console.error(e);
		if (createdBasketId) {
			yield put(changeSim.cleanup(createdBasketId));
		}
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(CHANGE_SIM_INITIALIZE_LOADING_KEY));
	}
}
function* onCleanup(action: ChangeSimActionPayload) {
	const { basketId } = action;
	if (!basketId) {
		console.error("BasketId is not set for changeSim cleanup");
		return;
	}
	try {
		yield call(BasketService.delete, basketId);
	} catch (e) {}
}
function* onShowModalChange(action: ChangeSimActionPayload) {
	if (!action.showingChangeSimModal && action.basketId) {
		yield put(changeSim.cleanup(action.basketId));
	}
}

export function* onSubmit(action: ChangeSimActionPayload) {
	const { submitData } = action;
	if (!submitData) {
		console.error("Submit data is not set for submit change SIM");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(CHANGE_SIM_INITIALIZE_LOADING_KEY));
	try {
		if (!submitData.basketId) {
			const reinitializationResult = yield call(ChangeSimSagaUtil.reinitializeBeforeSubmit, submitData);
			if (!reinitializationResult) {
				return;
			}
			submitData.basketId = reinitializationResult.basketId;
			submitData.basketItemIdToRemove = reinitializationResult.basketItemIdToRemove;
		}

		if (!submitData.deliveryAddress!.postalAddress!.id) {
			let { postalAddress, forceCreation } = submitData.deliveryAddress!;
			if (!postalAddress || forceCreation === undefined) {
				window.console.error("Missing postalAddress in UserActionPayload");
				return;
			}
			const user = yield select(getUser);
			if (!user) {
				return;
			}

			postalAddress = PostalAddressUtil.findExistingDeliveryAddress(user, postalAddress) || postalAddress;
			if (!postalAddress.id) {
				if (Boolean(user) && PostalAddressUtil.isEquals(postalAddress, PostalAddressUtil.getPrimaryAddressAsTemplate(user))) {
					forceCreation = true;
				}
				try {
					const resp = yield call(PostalAddressService.updateOrCreatePostalAddress, {
						postalAddress,
						individualId: user.id,
						forceAddressUpdate: forceCreation,
					});
					postalAddress.id = resp.id;
					yield put(actions.user.updatePostalAddressComplete(postalAddress));
				} catch (e) {
					if (e.errorContainer) {
						yield put(actions.error.onAddressValidationError(e.errorContainer));
					}
				}
			}
			submitData.deliveryAddress!.postalAddress = postalAddress;
		}
		yield call(ChangeSimSagaUtil.submitCaseWithAttachments, submitData);
		yield call(ChangeSimService.submit, submitData);
		yield put(changeSim.submitComplete());
		yield put(changeSim.showChangeSimModal(false));
	} catch (e) {
		// TODO: delete case if basket submission failed
		if (submitData.basketId) {
			yield put(changeSim.cleanup(submitData.basketId));
		}
		yield put(changeSim.submitComplete());
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(CHANGE_SIM_INITIALIZE_LOADING_KEY));
	}
}

function* onGetCustomerPaymentMethodsComplete(action: PaymentActionPayload) {
	const { customerPaymentMethods } = action;
	if (!customerPaymentMethods || customerPaymentMethods.length === 0) {
		return;
	}
	yield put(changeSim.selectCustomerPaymentMethod(customerPaymentMethods[0].id));
}

function* onUpdatePostalAddressComplete(action: UserActionPayload) {
	const { postalAddress } = action;
	if (!postalAddress || !postalAddress.id) {
		return;
	}
	yield put(changeSim.changeDeliveryAddress(postalAddress, false));
}

function* onChangeDeliveryAddress(action: ChangeSimActionPayload) {
	yield put(changeSim.changeDeliveryAddressComplete(action.deliveryAddress!.postalAddress!));
}

export function* changeSimSaga(): Iterable<any> {
	yield all([
		takeEvery(ChangeSimActions.CLEANUP, onCleanup),
		takeEvery(ChangeSimActions.INITIALIZE, onInitialize),
		takeEvery(ChangeSimActions.SUBMIT, onSubmit),
		takeEvery(ChangeSimActions.SHOW_MODAL, onShowModalChange),
		takeEvery(PaymentActions.GET_CUSTOMER_PAYMENT_METHODS_COMPLETE, onGetCustomerPaymentMethodsComplete),
		takeEvery(UserActions.UPDATE_POSTAL_ADDRESS_COMPLETE, onUpdatePostalAddressComplete),
		takeEvery(ChangeSimActions.CHANGE_DELIVERY_ADDRESS, onChangeDeliveryAddress),
	]);
}
