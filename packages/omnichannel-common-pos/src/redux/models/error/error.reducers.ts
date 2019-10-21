"use strict";

import { ErrorActionPayload, ErrorActions } from "./error.actions";
import { ErrorType } from "../../types";

export type ErrorState = {
	error?: object,
	addressValidationError: object,
	identificationValidationError: ErrorType,
	customerScreeningError: object,
	productOfferingErrors: object[],
	errorToBeShownOnProductTable: string,
};

const initialState = {

};

const errorReducer = (state: Partial<ErrorState> = initialState, action: ErrorActionPayload) => {
	const { type, error, addressValidationError, identificationValidationError } = action;
	switch (type) {
		case ErrorActions.ON_ERROR:
			return {...state, error};
		case ErrorActions.ON_ADDRESS_VALIDATION_ERROR:
			return {...state, addressValidationError};
		case ErrorActions.ON_IDENTIFICATION_VALIDATION_ERROR:
			return {...state, identificationValidationError};
		case ErrorActions.CLEAR_ADDRESS_VALIDATION_ERROR:
			return {...state, addressValidationError: undefined};
		case ErrorActions.CLEAR_ERROR:
			return {...state, error: null };
		case ErrorActions.CLEAR_ERROR_ON_PRODUCT_TABLE:
			return {...state, errorToBeShownOnProductTable: null};
		case ErrorActions.SHOW_ERROR_MODAL:
			return {...state, error};
		default:
			return state;
	}
};

export default errorReducer;
