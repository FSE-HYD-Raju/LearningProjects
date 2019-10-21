"use strict";

import { Action } from "redux";

export enum CustomerInteractionsActions {
	GET_CUSTOMER_INTERACTIONS = "CustomerInteractions_GET_CUSTOMER_INTERACTIONS",
	GET_CUSTOMER_INTERACTIONS_COMPLETE = "CustomerInteractions_GET_CUSTOMER_INTERACTIONS_COMPLETE",
	GET_CUSTOMER_INTERACTIONS_FAIL = "CustomerInteractions_GET_CUSTOMER_INTERACTIONS_FAIL",
}

export interface CustomerInteractionsActionPayload extends Action<CustomerInteractionsActions> {
	filterArgs?: string;
	customerInteractions?: any;
}

export const customerInteractions = {
	getCustomerInteractions: (filterArgs?: string) => ({type: CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS, filterArgs}),
	getCustomerInteractionsComplete: (customerInteractions: any) =>
		({type: CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS_COMPLETE, customerInteractions}),
	getCustomerInteractionsFail: (error: any) => ({type: CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS_FAIL, error}),
};
