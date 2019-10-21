"use strict";

import { Action } from "redux";
import { CustomerAccount } from "../../types";

export enum CustomerActions {
	FLUX_SYNC = "Customer_FLUX_SYNC",
	RESET_NEW_CUSTOMER = "Customer_RESET_NEW_CUSTOMER",
	SET_ACTIVE_CUSTOMER_ACCOUNT = "Customer_SET_ACTIVE_CUSTOMER_ACCOUNT",
	CUSTOMER_ADDRESS_VALIDATION_ERROR = "Customer_ADDRESS_VALIDATION_ERROR"
}

export interface CustomerActionPayload extends Action<CustomerActions> {
	fluxState?: any;
	error?: string;
	activeCustomerAccount?: CustomerAccount;
	customerData?: object;
}

export const customer = {
	fluxSync: (fluxState: any) => ({type: CustomerActions.FLUX_SYNC, fluxState}),
	resetNewCustomer: () => ({ type: CustomerActions.RESET_NEW_CUSTOMER }),
	setActiveCustomerAccount: (activeCustomerAccount: CustomerAccount) => ({ type: CustomerActions.SET_ACTIVE_CUSTOMER_ACCOUNT, activeCustomerAccount}),
	customerAddressValidationError: (customerData: object) => ({type: CustomerActions.CUSTOMER_ADDRESS_VALIDATION_ERROR, customerData }),
};
