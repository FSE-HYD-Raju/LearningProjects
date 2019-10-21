"use strict";

import { all, call, put, takeEvery, select } from "redux-saga/effects";
import { PaymentActionPayload, PaymentActions, payment } from "./payment.actions";
import PaymentService from "../../services/PaymentService";
import { AppState } from "../../index";
import { delay } from "redux-saga";

function* getContextualPaymentMethods(action: PaymentActionPayload) {
	const paymentUsecase = action.paymentUsecase;
	try {
		const response = yield call(PaymentService.getContextualPaymentMethods, paymentUsecase);
		yield put(payment.getContextualPaymentMethodsComplete(paymentUsecase, response.data));
	} catch (error) {
		yield put(payment.getContextualPaymentMethodsFailed(paymentUsecase));
	}
}

function* onGetPaymentActions(action: PaymentActionPayload) {
	let customerAccountId = action.customerAccountId;
	// if no customer account id was passed from outside - try to pick it from store, if store doesn't contain user - it's an error
	if (!customerAccountId) {
		customerAccountId = yield select((state: AppState): string | undefined => state.user.user && state.user.user.customerAccountId);
		if (!customerAccountId) {
			console.error("Payment.getCustomerPaymentMethods, customerAccountId is not set");
			return;
		}
	}
	try {
		const customerPaymentMethods = yield call(PaymentService.getCustomerPaymentMethods, customerAccountId);
		yield put(payment.getCustomerPaymentMethodsComplete(customerPaymentMethods));
	} catch (e) {
		console.error(e);
		yield put(payment.getCustomerPaymentMethodsComplete([]));
	}
}

function* validatePaymentWithoutBasket(action: PaymentActionPayload) {
	const { contextualPaymentMethodId, paymentParams, paymentUsecase } = action;
	try {
		const storeCreditCard = action.storeCustomerPaymentMethod;

		const payload = {
			data: {
				type: "contextualPaymentValidations",
				attributes: {
					contextualPaymentMethodId,
					paymentUseCase: paymentUsecase,
					paymentResponse: {
						paymentParams
					},
					storeCreditCard,
				},

			}
		};
		yield put(payment.clearPaymentForm());
		const response = yield call(PaymentService.validatePaymentResultAfterReturningFromTheSIA, payload);
		yield put(payment.validatePaymentWithoutBasketComplete(response));
	} catch (e) {

	}
}

function* validatePaymentResultAfterReturningFromTheSIA(action: PaymentActionPayload) {
	const { contextualPaymentMethodId, paymentParams, customerAccountId } = action;
	try {
		const payload = {
			data: {
				type: "contextualPaymentValidations",
				attributes: {
					contextualPaymentMethodId,
					paymentUseCase: "b2c-card-registration",
					paymentResponse: {
						paymentParams
					},
					customerAccountId
				}
			}
		};
		yield call(PaymentService.validatePaymentResultAfterReturningFromTheSIA, payload);
		yield delay(1000);
		onGetPaymentActions(action);
	} catch (e) {

	}
}

export function* paymentSaga(): any {
	yield all([
		takeEvery(PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS, getContextualPaymentMethods),
		takeEvery(PaymentActions.GET_CUSTOMER_PAYMENT_METHODS, onGetPaymentActions),
		takeEvery(PaymentActions.VALIDATE_PAYMENT_WITHOUT_BASKET, validatePaymentWithoutBasket),
		takeEvery(PaymentActions.VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA, validatePaymentResultAfterReturningFromTheSIA),
	]);
}
