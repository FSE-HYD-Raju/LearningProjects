"use strict";

import { PaymentActions, PaymentActionPayload } from "./payment.actions";
import { extractPaymentValues } from "./payment.utils";
import { ConsulValues } from "../../models/consul/consul.types";
import { ContextualPaymentMethod, ValidatedPaymentMethod, CustomerPaymentMethod } from "../../types";
import { LocationState } from "history";
import { AuthActions } from "../../actions";
import { SessionStorage, SessionStorageKeysEnum } from "../../services";

export type PaymentState = {
	paymentUseCases: object;
	selectedPaymentUseCase: string;
	// from payment store
	contextualPaymentMethods: Array<ContextualPaymentMethod>;
	customerPaymentMethods: Array<CustomerPaymentMethod>;
	contextualPaymentMethodId: string;
	customerPaymentMethodId?: string;
	storedContextualPaymentMethod: string;
	paymentInfo: {
		paymentErrorCode: string;
		paymentForm: object;
		paymentCompleted: boolean;
	};
	paymentStatus: string;
	paymentCancel: boolean;
	paymentResponse: Record<string, any>;
	topUpSuccessful?: boolean;
	storeCustomerPaymentMethod: boolean;
	failedCashpayment: boolean;
	errors: Array<any>;
	returnBaseLocation?: LocationState;
	creditCardToken: string;
	topUpMsisdn: string;
	topUpAmount: number;
	topUpPending: boolean;
	validating: boolean;
	paymentMethodId: string;
	customerPaymentMethod: ValidatedPaymentMethod;
	referenceNumber: string;
	paymentMethodChanged: boolean;
	failedCashPayment: boolean;
};

const initialState: Partial<PaymentState> = {
	storeCustomerPaymentMethod: false,
	contextualPaymentMethods: [],
	customerPaymentMethods: [],
	errors: [],
	paymentResponse: {},
	paymentUseCases: {},
	referenceNumber: "",
	contextualPaymentMethodId: "",
	paymentStatus: "",
	paymentMethodChanged: false,
	paymentCancel: false,
	topUpSuccessful: false,
	failedCashPayment: false
};

// Returns object with fields to be cleaned out from state if auth token does not exist
const cleanupStateOnPageLoad = () => {
	return SessionStorage && !SessionStorage.getItem(SessionStorageKeysEnum.auth) && {
			customerPaymentMethods: [],
			contextualPaymentMethods: []
	} || {};
};

const paymentReducer = (state: Partial<PaymentState> = initialState, action: PaymentActionPayload) => {
	const { type } = action;
	switch (type) {
		case PaymentActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case PaymentActions.SET_VALUES:
			return { ...state, ...cleanupStateOnPageLoad(), ...extractPaymentValues(action.values as ConsulValues) };
		case PaymentActions.STORE_CUSTOMER_PAYMENT_METHOD:
			return {
				...state,
				storeCustomerPaymentMethod: action.storeCustomerPaymentMethod
			};
		case PaymentActions.GET_CUSTOMER_PAYMENT_METHODS_COMPLETE:
			return {
				...state,
				customerPaymentMethods: action.customerPaymentMethods
			};
		case PaymentActions.STORE_RETURN_BASE_LOCATION:
			return { ...state, returnBaseLocation: action.location };
		case PaymentActions.STORE_TOPUP_MSISDN:
			return { ...state, topUpMsisdn: action.topUpMsisdn };
		case PaymentActions.STORE_TOPUP_AMOUNT:
			return { ...state, topUpAmount: action.amount };
		case PaymentActions.STORE_CUSTOMER_CONTEXTUAL_PAYMENT_METHOD:
			return { ...state, storedContextualPaymentMethod: action.contextualPaymentMethodId || state.storedContextualPaymentMethod };
		case PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS:
			return { ...state, selectedPaymentUseCase: action.paymentUsecase };
		case PaymentActions.GET_CONTEXTUAL_PAYMENT_METHODS_COMPLETE:
			return { ...state, contextualPaymentMethods: action.contextualPaymentMethods };
		case PaymentActions.VALIDATE_PAYMENT_WITHOUT_BASKET:
			return { ...state, validating: true };
		case PaymentActions.VALIDATE_PAYMENT_WITHOUT_BASKET_COMPLETE:
			return {
				...state,
				paymentStatus: action.validationResponse.paymentStatus,
				creditCardToken: action.validationResponse.creditCardAlias,
				paymentInfo: {},
				validating: false,
				topUpSuccessful: true,
				paymentResponse: action.validationResponse.paymentResponse,
			};
		case PaymentActions.CLEAR_PAYMENT_FORM:
			return { ...state, paymentInfo: {} };
		case PaymentActions.SET_TOPUP_STATUS:
			return { ...state, topUpPending: action.topUpPending };
		case PaymentActions.RESET_TOPUP:
			return {
				...state,
				topUpPending: false,
				topUpSuccessful: false,
				selectedPaymentUseCase: null,
				paymentStatus: null,
			};
		case PaymentActions.CLEAR_TOPUP:
			return {
				...state,
				returnBaseLocation: null,
				creditCardToken: null,
				topUpMsisdn: null,
				topUpAmount: null,
			};
		case AuthActions.POST_LOGIN_CLEANUP:
			return {
				...state,
				customerPaymentMethods: [],
				contextualPaymentMethods: []
			};
		default:
			return state;
	}
};

export default paymentReducer;
