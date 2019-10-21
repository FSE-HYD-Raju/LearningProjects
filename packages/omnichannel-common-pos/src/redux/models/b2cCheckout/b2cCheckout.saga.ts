"use strict";

import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { b2cCheckout, B2CCheckoutActionPayload, B2CCheckoutActions } from "./b2cCheckout.actions";
import CheckoutService from "../../services/CheckoutService";
import AddressValidationService from "../../services/AddressValidationService";
import { get, isEmpty } from "lodash";
import { error } from "../../actions";
import { ErrorType, ID_ALREADY_EXIST } from "../../types";
import IdentificationService from "../../services/IdentificationService";

function* sendCheckoutCompleteNotification(action: B2CCheckoutActionPayload) {
	const { basketId } = action;
	if (basketId) {
		try {
			yield call(() => {
				return CheckoutService.sendCheckoutCompleteNotification(basketId);
			});
		} catch (e) {
			yield put(b2cCheckout.sendCheckutCompleteNotificationFailed(basketId, e.message));
		}
	}
}

function* validateAddress(action: B2CCheckoutActionPayload) {
	const { address, source } = action;
	if (!!address) {
		try {
			yield call(() => {
				return AddressValidationService.validateAddress(address);
			});
			yield put(b2cCheckout.validateAddressComplete(source));

		} catch (errorResponse /* PostalAddressValidationErrorsType | ErrorsType */) {
			const errors = get(errorResponse, "errors", []);
			const invalidPostalAddressError = errors && errors.length && errors
				.find((error: ErrorType) => error && error.code === "invalid-postal-address");

			if (!isEmpty(errorResponse)) {
				yield put(error.onAddressValidationError(errorResponse));
				yield put(b2cCheckout.validateAddressFailed(errorResponse, source));

				if (!invalidPostalAddressError) {
					console.error(errorResponse);
				}
			}
		}
	}
}

function* validateIdentification(action: B2CCheckoutActionPayload) {
	const { identification } = action;
	if (identification) {
		try {
			const response = yield call(() => {
				return IdentificationService.validateIdentification(identification);
			});
			if (!response) {
				yield put(b2cCheckout.validateIdentificationComplete());
			} else {
				const errorCode = {
					code: ID_ALREADY_EXIST
				};
				yield put(error.onIdentificationValidationError(errorCode));
				yield put(b2cCheckout.validateIdentificationFailed(errorCode));
			}

		} catch (errorResponse /* PostalAddressValidationErrorsType | ErrorsType */) {
			const errors = get(errorResponse, "errors", []);
			if (!isEmpty(errors)) {
				yield put(error.onIdentificationValidationError(errors));
				yield put(b2cCheckout.validateIdentificationFailed(errors));
			}
		}
	}
}

export function* b2cCheckoutSaga(): any {
	yield all([
		takeLatest(B2CCheckoutActions.SEND_CHECKOUT_COMPLETE_NOTIFICATION, sendCheckoutCompleteNotification),
		takeEvery(B2CCheckoutActions.VALIDATE_ADDRESS, validateAddress),
		takeEvery(B2CCheckoutActions.VALIDATE_IDENTIFICATION, validateIdentification),
	]);
}
