"use strict";

import { Action } from "redux";
import {
	StoredCustomerType,
	PostalAddress,
	ProductWrapper,
	ErrorType,
	ContactMediaType,
} from "../../types";

export enum B2CCheckoutActions {
	FLUX_SYNC = "B2CCheckout_FLUX_SYNC",
	SEND_CHECKOUT_COMPLETE_NOTIFICATION = "B2CCheckout_COMPLETE_NOTIFICATION",
	SEND_CHECKOUT_COMPLETE_NOTIFICATION_FAILED = "B2CCheckout_COMPLETE_NOTIFICATION_FAILED",
	STORE_USER_INFORMATION = "B2CCheckout_STORE_USER_INFORMATION",
	CLEAR_USER_INFORMATION = "B2CCheckout_CLEAR_USER_INFORMATION",
	CLEAR_IDENTIFICATIONS = "B2CCheckout_CLEAR_IDENTIFICATIONS",
	INITIALIZE_USER_INFORMATION = "B2CCheckout_INITIALIZE_USER_INFORMATION",
	CONTACT_FORM_IS_VALID = "B2CCheckout_CONTACT_FORM_IS_VALID",
	DOCUMENTS_FORM_IS_VALID = "B2CCheckout_DOCUMENTS_FORM_IS_VALID",
	PERSONAL_FORM_IS_VALID = "B2CCheckout_PERSONAL_FORM_IS_VALID",
	FISCAL_CODE_FORM_IS_VALID = "B2CCheckout_FISCAL_CODE_FORM_IS_VALID",
	ADDRESS_FORM_IS_VALID = "B2CCheckout_ADDRESS_FORM_IS_VALID",
	VALIDATE_ADDRESS = "B2CCheckout_VALIDATE_ADDRESS",
	VALIDATE_ADDRESS_COMPLETE = "B2CCheckout_VALIDATE_ADDRESS_COMPLETE",
	VALIDATE_ADDRESS_FAILED = "B2CCheckout_VALIDATE_ADDRESS_FAILED",
	VALIDATE_IDENTIFICATION = "B2CCheckout_VALIDATE_IDENTIFICATION",
	VALIDATE_IDENTIFICATION_COMPLETE = "B2CCheckout_VALIDATE_IDENTIFICATION_COMPLETE",
	VALIDATE_IDENTIFICATION_FAILED = "B2CCheckout_VALIDATE_IDENTIFICATION_FAILED",
	STORE_SELECTED_SHIPPING_ADDRESS = "B2CCheckout_STORE_SELECTED_SHIPPING_ADDRESS",
	STORE_DELIVERY_PRODUCT = "B2CCheckout_STORE_DELIVERY_PRODUCT",
	SET_DELIVERY_ADDRESS_ROLE = "B2CCheckout_SET_DELIVERY_ADDRESS_ROLE",
	TRIGGER_FORM_VALIDATION = "B2CCheckout_TRIGGER_FORM_VALIDATION",
	SET_DELIVERY_TO_NEW_ADDRESS = "B2CCheckout_SET_DELIVERY_TO_NEW_ADDRESS",
}

export interface B2CCheckoutActionPayload extends Action<B2CCheckoutActions> {
	fluxState?: any;
	error?: string;
	basketId: string;
	storedCustomer: StoredCustomerType;
	initiatedByLogin?: boolean;
	valid: boolean;
	address: Partial<PostalAddress>;
	addressValidationError: Object;
	identification: Partial<StoredCustomerType>;
	identificationValidationError: ErrorType;
	validatingIdentification: boolean;
	validatingAddress: boolean;
	deliveryProduct: ProductWrapper;
	deliveryAddressRole?: ContactMediaType;
	source?: string;
	triggerTS?: Date;
	isDeliveryToNewAddress: boolean;
}

export const b2cCheckout = {
	fluxSync: (fluxState: any) => ({ type: B2CCheckoutActions.FLUX_SYNC, fluxState }),
	sendCheckoutCompleteNotification: (basketId: string) => ({ type: B2CCheckoutActions.SEND_CHECKOUT_COMPLETE_NOTIFICATION, basketId }),
	sendCheckutCompleteNotificationFailed: (basketId: string, error: string) => ({
		type: B2CCheckoutActions.SEND_CHECKOUT_COMPLETE_NOTIFICATION_FAILED,
		basketId,
		error
	}),
	storeUserInformation: (storedCustomer: Partial<StoredCustomerType>) => ({ type: B2CCheckoutActions.STORE_USER_INFORMATION, storedCustomer }),
	clearUserInformation: () => ({ type: B2CCheckoutActions.CLEAR_USER_INFORMATION }),
	clearIdentifications: () => ({ type: B2CCheckoutActions.CLEAR_IDENTIFICATIONS }),
	initializeUserInformation: (storedCustomer: Partial<StoredCustomerType>, initiatedByLogin?: boolean) =>
		({ type: B2CCheckoutActions.INITIALIZE_USER_INFORMATION, storedCustomer, initiatedByLogin }),
	storeDeliveryProduct: (deliveryProduct: ProductWrapper) => ({ type: B2CCheckoutActions.STORE_DELIVERY_PRODUCT, deliveryProduct }),
	contactFormIsValid: (valid: boolean) => ({ type: B2CCheckoutActions.CONTACT_FORM_IS_VALID, valid }),
	documentsFormIsValid: (valid: boolean) => ({ type: B2CCheckoutActions.DOCUMENTS_FORM_IS_VALID, valid }),
	personalFormIsValid: (valid: boolean) => ({ type: B2CCheckoutActions.PERSONAL_FORM_IS_VALID, valid }),
	fiscalCodeFormIsValid: (valid: boolean) => ({ type: B2CCheckoutActions.FISCAL_CODE_FORM_IS_VALID, valid }),
	addressFormIsValid: (valid: boolean, source?: string) => ({ type: B2CCheckoutActions.ADDRESS_FORM_IS_VALID, valid, source }),
	validateAddress: (address: Partial<PostalAddress>, source?: string) => ({ type: B2CCheckoutActions.VALIDATE_ADDRESS, address, source }),
	validateAddressComplete: (source?: string) => ({ type: B2CCheckoutActions.VALIDATE_ADDRESS_COMPLETE, source }),
	validateAddressFailed: (addressValidationError: Object, source?: string) => ({ type: B2CCheckoutActions.VALIDATE_ADDRESS_FAILED, addressValidationError, source }),
	validateIdentification: (identification: Partial<StoredCustomerType>) => ({ type: B2CCheckoutActions.VALIDATE_IDENTIFICATION, identification }),
	validateIdentificationComplete: () => ({ type: B2CCheckoutActions.VALIDATE_IDENTIFICATION_COMPLETE }),
	validateIdentificationFailed: (identificationValidationError: Object) =>
		({ type: B2CCheckoutActions.VALIDATE_IDENTIFICATION_FAILED, identificationValidationError }),
	storeSelectedShippingAddress: (address: PostalAddress) => ({ type: B2CCheckoutActions.STORE_SELECTED_SHIPPING_ADDRESS, address }),
	setDeliveryAddressRole: (deliveryAddressRole: ContactMediaType) => ({ type: B2CCheckoutActions.SET_DELIVERY_ADDRESS_ROLE, deliveryAddressRole }),
	triggerFormValidation: (triggerTS: Date) => ({ type: B2CCheckoutActions.TRIGGER_FORM_VALIDATION, triggerTS}),
	setDeliveryToNewAddress: (isDeliveryToNewAddress: boolean) => ({ type: B2CCheckoutActions.SET_DELIVERY_TO_NEW_ADDRESS, isDeliveryToNewAddress }),
};
