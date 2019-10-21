"use strict";

import { ProductLoanActionPayload, ProductLoanActions } from "./productLoan.actions";
import { ProductLoanState } from "./productLoan.types";

const initialState: ProductLoanState = {
	loans: [],
	isShowingActivateProductLoanModal: false
};

const productLoanReducer = (state: Partial<ProductLoanState> = initialState, action: ProductLoanActionPayload): Partial<ProductLoanState> => {
	const { type } = action;
	switch (type) {
		case ProductLoanActions.GET_AVAILABLE_LOANS:
			return {
				...state,
				loans: []
			};
		case ProductLoanActions.GET_AVAILABLE_LOANS_COMPLETE:
			return {
				...state,
				loans: action.loans
			};
		case ProductLoanActions.SHOW_LOAN_ACTIVATION_MODAL:
			return {
				...state,
				selectedLoan: action.selectedLoan,
				isShowingActivateProductLoanModal: true
			};
		case ProductLoanActions.HIDE_LOAN_ACTIVATION_MODAL:
			return {
				...state,
				selectedLoan: undefined,
				isShowingActivateProductLoanModal: false
			};

		default:
			return state;
	}
};

export default productLoanReducer;

export { ProductLoanState };
