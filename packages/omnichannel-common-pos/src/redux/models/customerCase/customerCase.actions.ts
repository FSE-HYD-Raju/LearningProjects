"use strict";

import { Action } from "redux";

export enum CustomerCaseActions {
	FLUX_SYNC = "CustomerCase_FLUX_SYNC",
	CREATE_CUSTOMER_ACCOUNT_COMPLETE = "customerCase_CREATE_CUSTOMER_ACCOUNT_COMPLETE",
	RESET_CUSTOMER_CASE = "customerCase_RESET_CUSTOMER_CASE",
}

export interface CustomerCaseActionPayload extends Action<CustomerCaseActions> {
	fluxState?: any;
	error?: string;
	customerAccountId?: string;
	customerAccountNumber?: string;
}

export const customerCase = {
	fluxSync: (fluxState: any) => ({ type: CustomerCaseActions.FLUX_SYNC, fluxState }),
	createCustomerAccountComplete: (customerAccountId: string, customerAccountNumber: string) => {
		return ({ type: CustomerCaseActions.CREATE_CUSTOMER_ACCOUNT_COMPLETE, customerAccountId, customerAccountNumber });
	},
	resetCustomerCase: () => {
		return ({ type: CustomerCaseActions.RESET_CUSTOMER_CASE });
	},
};
