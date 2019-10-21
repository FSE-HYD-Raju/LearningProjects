"use strict";

import { B2CCheckoutActionPayload, B2CCheckoutActions } from "./b2cCheckout.actions";
import { B2CCheckoutState } from "./b2cCheckout.types";
import { ContactMediaTypeEnum } from "../../types";

export { B2CCheckoutActionPayload } from "./b2cCheckout.actions";

export { B2CCheckoutState } from "./b2cCheckout.types";

const initialState = {
	validatingAddress: false,
	deliveryAddressRole: ContactMediaTypeEnum.PRIMARY,
	validationsBySource: {},
	showB2CDeliveryModal: false
};

const b2cCheckoutReducer = (state: Partial<B2CCheckoutState> = initialState, action: B2CCheckoutActionPayload) => {
	const { type } = action;
	switch (type) {
		case B2CCheckoutActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case B2CCheckoutActions.SEND_CHECKOUT_COMPLETE_NOTIFICATION:
			return { ...state, basketId: action.basketId };
		case B2CCheckoutActions.SEND_CHECKOUT_COMPLETE_NOTIFICATION_FAILED:
			return { ...state, basketId: null };
		case B2CCheckoutActions.INITIALIZE_USER_INFORMATION:
			return {
				...state,
				storedCustomer: { ...action.storedCustomer, updated: false },
				initiatedByLogin: !!action.initiatedByLogin
			};
		case B2CCheckoutActions.STORE_USER_INFORMATION:
			return {
				...state,
				storedCustomer: { ...state.storedCustomer, ...action.storedCustomer, updated: true }
			};
		case B2CCheckoutActions.CLEAR_USER_INFORMATION:
			return {
				...state,
				storedCustomer: {}
			};
		case B2CCheckoutActions.CLEAR_IDENTIFICATIONS:
			return {
				...state,
				storedCustomer: {
					...state.storedCustomer,
					identifications: {},
					updated: false
				}
			};
		case B2CCheckoutActions.CONTACT_FORM_IS_VALID:
			return { ...state, contactFormIsValid: action.valid };
		case B2CCheckoutActions.DOCUMENTS_FORM_IS_VALID:
			return { ...state, documentsFormIsValid: action.valid };
		case B2CCheckoutActions.PERSONAL_FORM_IS_VALID:
			return { ...state, personalFormIsValid: action.valid };
		case B2CCheckoutActions.FISCAL_CODE_FORM_IS_VALID:
			return { ...state, fiscalCodeFormIsValid: action.valid };
		case B2CCheckoutActions.ADDRESS_FORM_IS_VALID:
			const addressFormValidity = action.source ? {
				validationsBySource: {
					...state.validationsBySource,
					[action.source]: !!action.valid
				}
			} : {
					addressFormIsValid: action.valid
				};
			return { ...state, ...addressFormValidity };
		case B2CCheckoutActions.VALIDATE_ADDRESS:
			return { ...state, validatingAddress: true };
		case B2CCheckoutActions.VALIDATE_ADDRESS_COMPLETE:
			const validationComplete = action.source ? {
				validationsBySource: {
					...state.validationsBySource,
					[action.source]: true
				}
			} : {
					addressFormIsValid: true
				};
			return {
				...state,
				validatingAddress: false,
				...validationComplete,
			};
		case B2CCheckoutActions.VALIDATE_ADDRESS_FAILED:
			const validationFailure = action.source ? {
				validationsBySource: {
					...state.validationsBySource,
					[action.source]: false
				}
			} : {
					addressFormIsValid: false
				};
			return {
				...state,
				validatingAddress: false,
				addressValidationError: action.addressValidationError,
				...validationFailure,
			};
		case B2CCheckoutActions.VALIDATE_IDENTIFICATION:
			return { ...state, validatingIdentification: true };
		case B2CCheckoutActions.VALIDATE_IDENTIFICATION_COMPLETE:
			return {
				...state,
				validatingIdentification: false,
				documentsFormIsValid: true,
				identificationValidationError: null,
			};
		case B2CCheckoutActions.VALIDATE_IDENTIFICATION_FAILED:
			return {
				...state,
				validatingIdentification: false,
				identificationValidationError: action.identificationValidationError
			};
		case B2CCheckoutActions.STORE_SELECTED_SHIPPING_ADDRESS:
			return { ...state, storedDeliveryAddress: action.address };
		case B2CCheckoutActions.STORE_DELIVERY_PRODUCT:
			return { ...state, storedDeliveryProduct: action.deliveryProduct };
		case B2CCheckoutActions.SET_DELIVERY_ADDRESS_ROLE:
			return { ...state, deliveryAddressRole: action.deliveryAddressRole };
		case B2CCheckoutActions.TRIGGER_FORM_VALIDATION:
			return { ...state, triggerFormValidation: action.triggerTS };
		case B2CCheckoutActions.SET_DELIVERY_TO_NEW_ADDRESS:
			return { ...state, isDeliveryToNewAddress: action.isDeliveryToNewAddress };
		default:
			return state;
	}
};

export default b2cCheckoutReducer;
