"use strict";

import { Action } from "redux";
import { ErrorForModal, Error } from "../../services/ErrorContainer";
import { ErrorType } from "../../types";

export enum ErrorActions {
	ON_ERROR = "Error_ON_ERROR",
	ON_ADDRESS_VALIDATION_ERROR = "Error_ON_ADDRESS_VALIDATION_ERROR",
	ON_IDENTIFICATION_VALIDATION_ERROR = "Error_ON_IDENTIFICATION_VALIDATION_ERROR",
	ON_PHONE_NUMBER_VALIDATION_ERROR = "Error_ON_PHONE_NUMBER_VALIDATION_ERROR",
	ON_CONTACT_EMAIL_VALIDATION_ERROR = "Error_ON_CONTACT_EMAIL_VALIDATION_ERROR",
	CLEAR_ADDRESS_VALIDATION_ERROR = "Error_CLEAR_ADDRESS_VALIDATION_ERROR",
	CLEAR_ERROR = "Error_CLEAR_ERROR",
	CLEAR_PRODUCT_OFFERING_ERROR = "Error_CLEAR_PRODUCT_OFFERING_ERROR",
	SHOW_ERROR_MODAL = "Error_SHOW_ERROR_MODAL",
	CLEAR_ERROR_ON_PRODUCT_TABLE = "Error_CLEAR_ERROR_ON_PRODUCT_TABLE",
}

export interface ErrorActionPayload extends Action<ErrorActions> {
	error?: ErrorForModal;
	addressValidationError: object;
	identificationValidationError: ErrorType;
}

export const error = {
	onError: (error: ErrorForModal) => ({ type: ErrorActions.ON_ERROR, error }),
	// for future use. shows ErrorModal with provided details
	onErrorShort: (title: string, detail: string) => ({
		type: ErrorActions.ON_ERROR,
		error: {
			errors: [new Error(undefined, undefined, title, detail)]
		}
	}),
	onAddressValidationError: (addressValidationError: object) => ({
		type: ErrorActions.ON_ADDRESS_VALIDATION_ERROR,
		addressValidationError
	}),
	onIdentificationValidationError: (identificationValidationError: object) => ({
		type: ErrorActions.ON_IDENTIFICATION_VALIDATION_ERROR,
		identificationValidationError
	}),
	onPhoneNumberValidationError: (phoneNumberValidationError: object) => ({
		type: ErrorActions.ON_PHONE_NUMBER_VALIDATION_ERROR,
		phoneNumberValidationError
	}),
	onContactEmailValidationError: (contactEmailValidationError: object) => ({
		type: ErrorActions.ON_CONTACT_EMAIL_VALIDATION_ERROR,
		contactEmailValidationError
	}),
	clearAddressValidationError: () => ({ type: ErrorActions.CLEAR_ADDRESS_VALIDATION_ERROR }),
	clearProductOfferingErrors: () => ({ type: ErrorActions.CLEAR_PRODUCT_OFFERING_ERROR }),
	clearError: () => ({ type: ErrorActions.CLEAR_ERROR }),
	clearErrorOnProductTable: () => ({ type: ErrorActions.CLEAR_ERROR_ON_PRODUCT_TABLE }),
	showErrorModal: (e: ErrorForModal) => ({ type: ErrorActions.SHOW_ERROR_MODAL, error: e })
};
