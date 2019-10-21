"use strict";

import { CustomerCaseActions, CustomerCaseActionPayload } from "./customerCase.actions";
import { CustomerCaseState } from "./customerCase.types";
export { CustomerCaseActionPayload } from "./customerCase.actions";
export { CustomerCaseState } from "./customerCase.types";

const initialState = {
	agreements: [],
	activeAddons: [],
	activeAgreementId: "",
	customerBasketSelectData: {
		customerBaskets: []
	},
	customerAccountId: "",
	customerAccountNumber: "",
};

const customerCaseReducer = (state: Partial<CustomerCaseState> = initialState, action: CustomerCaseActionPayload) => {
	const { type } = action;
	switch (type) {
		case CustomerCaseActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case CustomerCaseActions.CREATE_CUSTOMER_ACCOUNT_COMPLETE:
			return { ...state, customerAccountId: action.customerAccountId, customerAccountNumber: action.customerAccountNumber };
		case CustomerCaseActions.RESET_CUSTOMER_CASE:
			return { ...state, ...initialState };
		default:
			return state;
	}
};

export default customerCaseReducer;
