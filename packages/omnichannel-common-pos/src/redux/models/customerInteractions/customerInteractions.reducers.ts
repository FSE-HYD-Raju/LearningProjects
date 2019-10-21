"use strict";

import { CustomerInteractionsActionPayload, CustomerInteractionsActions } from "./customerInteractions.actions";
import { CustomerInteractionsState } from "./customerInteractions.types";

const initialState = {

};

const customerInteractionsReducer = (state: Partial<CustomerInteractionsState> = initialState, action: CustomerInteractionsActionPayload) => {
	const { type } = action;
	switch (type) {
		case CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS_COMPLETE:
			return {
				...state,
				customerInteractions: action.customerInteractions
			};
		case CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS_FAIL:
			return {
				...state,
				customerInteractions: []
			};
		default:
			return state;
	}
};

export default customerInteractionsReducer;

export { CustomerInteractionsState };
