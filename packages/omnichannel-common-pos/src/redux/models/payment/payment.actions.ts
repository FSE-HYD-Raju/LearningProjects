"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import { CustomerPaymentMethod } from "../../types";
import { LocationState } from "history";
import { ContextualPaymentMethod, ContextualPaymentValidation } from "../../types";
import { AuthActions } from "../../actions";

export enum PaymentActions {
	FLUX_SYNC = "Payment_FLUX_SYNC",
	SET_VALUES = "Payment_SET_VALUES",
	STORE_CUSTOMER_PAYMENT_METHOD = "Payment_STORE_CUSTOMER_PAYMENT_METHOD",
	GET_CUSTOMER_PAYMENT_METHODS = "Payment_GET_CUSTOMER_PAYMENT_METHODS",
	GET_CUSTOMER_PAYMENT_METHODS_COMPLETE = "Payment_GET_CUSTOMER_PAYMENT_METHODS_COMPLETE",
	STORE_RETURN_BASE_LOCATION = "Payment_STORE_RETURN_LOCATION",
	STORE_TOPUP_MSISDN = "Payment_STORE_TOPUP_MSISDN",
	STORE_TOPUP_AMOUNT = "Payment_STORE_TOPUP_AMOUNT",
	SET_TOPUP_STATUS = "Payment_SET_TOPUP_STATUS",
	STORE_CUSTOMER_CONTEXTUAL_PAYMENT_METHOD = "Payment_STORE_CUSTOMER_CONTEXTUAL_PAYMENT_METHOD",
	GET_CONTEXTUAL_PAYMENT_METHODS = "Payment_GET_CONTEXTUAL_PAYMENT_METHODS",
	GET_CONTEXTUAL_PAYMENT_METHODS_COMPLETE = "Payment_GET_CONTEXTUAL_PAYMENT_METHODS_COMPLETE",
	GET_CONTEXTUAL_PAYMENT_METHODS_FAILED = "Payment_GET_CONTEXTUAL_PAYMENT_METHODS_FAILED",
	VALIDATE_PAYMENT_WITHOUT_BASKET = "Payment_VALIDATE_PAYMENT_WITHOUT_BASKET",
	VALIDATE_PAYMENT_WITHOUT_BASKET_COMPLETE = "Payment_VALIDATE_PAYMENT_WITHOUT_BASKET_COMPLETE",
	VALIDATE_PAYMENT_WITHOUT_BASKET_FAILED = "Payment_VALIDATE_PAYMENT_WITHOUT_BASKET_FAILED",
	VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA = "Payment_VALIDATE_PAYMENT_RESULT_AFTER_RETURNIG_FROM_THE_SIA",
	VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA_COMPLETE = "Payment_VALIDATE_PAYMENT_RESULT_AFTER_RETURNIG_FROM_THE_SIA_COMPLETE",
	CLEAR_PAYMENT_FORM = "Payment_CLEAR_PAYMENT_FORM",
	CLEAR_TOPUP = "Payment_CLEAR_TOPUP",
	RESET_TOPUP  = "Payment_RESET_TOPUP",
}

export interface PaymentActionPayload extends Action<PaymentActions | AuthActions> {
	// FIXME: update payload model
	fluxState?: any;
	error?: string;
	values?: ConsulValues;
	storeCustomerPaymentMethod?: boolean;
	customerAccountId?: string;
	customerPaymentMethods?: CustomerPaymentMethod[];
	location: LocationState;
	contextualPaymentMethods: Array<ContextualPaymentMethod>;
	paymentUsecase: string;
	topUpMsisdn: string;
	contextualPaymentMethodId: string;
	storedContextualPaymentMethod: string;
	paymentParams: Object;
	validationResponse: ContextualPaymentValidation;
	amount: number;
	topUpPending: boolean;
}

export const payment = {
	fluxSync: (fluxState: any) => ({ type: PaymentActions.FLUX_SYNC, fluxState }),
	setValues: (values: any) => ({ type: PaymentActions.SET_VALUES, values }),
	getCustomerPaymentMethods: (customerAccountId?: string) => ({
		type: PaymentActions.GET_CUSTOMER_PAYMENT_METHODS,
		customerAccountId
	}),
	getCustomerPaymentMethodsComplete: (customerPaymentMethods: CustomerPaymentMethod[]) => ({
		type: PaymentActions.GET_CUSTOMER_PAYMENT_METHODS_COMPLETE,
		customerPaymentMethods
	}),
	handleStoreCustomerPaymentMethodSelection: (storeCustomerPaymentMethod: boolean) => ({
		type: PaymentActions.STORE_CUSTOMER_PAYMENT_METHOD,
		storeCustomerPaymentMethod
	}),
	storeReturnBaseLocation: (location: Partial<LocationState>) => ({ type: PaymentActions.STORE_RETURN_BASE_LOCATION, location }),
	storeTopUpMsisdn: (topUpMsisdn: string) => ({ type: PaymentActions.STORE_TOPUP_MSISDN, topUpMsisdn}),
	getContextualPaymentMethods: (paymentUsecase: string) => ({ type: PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS, paymentUsecase}),
	storeCustomerContextualPaymentMethod: (contextualPaymentMethodId: string) =>
		({ type: PaymentActions.STORE_CUSTOMER_CONTEXTUAL_PAYMENT_METHOD, contextualPaymentMethodId}),
	getContextualPaymentMethodsComplete: (paymentUsecase: string, contextualPaymentMethods: Array<ContextualPaymentMethod>) => ({
		type: PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS_COMPLETE,
		paymentUsecase,
		contextualPaymentMethods
	}),
	getContextualPaymentMethodsFailed: (paymentUsecase: string) => ({ type: PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS_FAILED, paymentUsecase }),
	validatePaymentWithoutBasket: (
		paymentUsecase: string,
		contextualPaymentMethodId: string,
		paymentParams: Object,
		customerAccountId: string
	) => ({ type: PaymentActions.VALIDATE_PAYMENT_WITHOUT_BASKET, paymentUsecase, contextualPaymentMethodId, paymentParams, customerAccountId}),
	validatePaymentWithoutBasketComplete: (validationResponse: ContextualPaymentValidation) => (
		{ type: PaymentActions.VALIDATE_PAYMENT_WITHOUT_BASKET_COMPLETE, validationResponse }
	),
	validatePaymentResultAfterReturningFromTheSIA: (
		contextualPaymentMethodId: string,
		paymentParams: Object,
		customerAccountId: string
	) => ({ type: PaymentActions.VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA, contextualPaymentMethodId, paymentParams, customerAccountId}),
	validatePaymentResultAfterReturningFromTheSIAComplete: (validationResponse: ContextualPaymentValidation) => (
		{ type: PaymentActions.VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA_COMPLETE, validationResponse }
	),
	clearPaymentForm: () => ({ type: PaymentActions.CLEAR_PAYMENT_FORM }),
	storeTopUpAmount: (amount: number) => ({ type: PaymentActions.STORE_TOPUP_AMOUNT, amount }),
	setTopUpStatus: (topUpPending: boolean) => ({ type: PaymentActions.SET_TOPUP_STATUS, topUpPending }),
	resetTopUp: () => ({ type: PaymentActions.RESET_TOPUP }),
	clearTopUp: () => ({ type: PaymentActions.CLEAR_TOPUP }),
};
