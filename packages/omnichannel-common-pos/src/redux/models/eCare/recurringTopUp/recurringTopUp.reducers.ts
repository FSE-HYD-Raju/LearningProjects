"use strict";

import { RecurringTopUpActionPayload, RecurringTopUpActions } from "./recurringTopUp.actions";
import { RecurringTopUpState } from "./recurringTopUp.types";

const getRecurringInitialState = (): RecurringTopUpState => ({
	newTopUpProductOfferingsByAgreement: {},
	isBasketSubmitted: false,
});

const recurringTopUpReducer = (state: RecurringTopUpState = getRecurringInitialState(), action: RecurringTopUpActionPayload): RecurringTopUpState => {
	const { type } = action;
	switch (type) {
		case RecurringTopUpActions.RESET_IS_BASKET_SUBMIT:
			return {
				...state,
				isBasketSubmitted: false,
			};
		case RecurringTopUpActions.SUBMIT_TOP_UP_COMPLETE:
			return {
				...state,
				isBasketSubmitted: true,
			};
		case RecurringTopUpActions.RESET_NEW_TOP_UP_PRODUCT_OFFERINGS:
			return {
				...state,
				newTopUpProductOfferingsByAgreement: {},
			};
		case RecurringTopUpActions.GET_NEW_TOP_UP_PRODUCT_OFFERINGS_COMPLETE:
			const { agreementId, productOfferings } = action;
			if (!agreementId) {
				return state;
			}
			return {
				...state,
				newTopUpProductOfferingsByAgreement: {
					...state.newTopUpProductOfferingsByAgreement,
					[agreementId]: productOfferings || [],
				},
			};

		default:
			return state;
	}
};

export default recurringTopUpReducer;

export { RecurringTopUpState, getRecurringInitialState };
