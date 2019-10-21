"use strict";

import { ChangePlanActionPayload, ChangePlanActions } from "./changePlan.actions";
import { ChangePlanState } from "./changePlan.types";
import PriceUtil from "../../../../utils/PriceUtil";
import { UnitOfMeasureEnum } from "../../../types/UnitOfMeasure";

const getRecurringInitialState = (): ChangePlanState => ({
	availablePlanProductOfferingsByAgreement: {},
	isChangePlanSummaryModalShown: false,
});

const changePlanReducer = (state: ChangePlanState = getRecurringInitialState(), action: ChangePlanActionPayload): ChangePlanState => {
	const { type } = action;
	switch (type) {
		case ChangePlanActions.INIT_CHANGE_PLAN:
			return {
				...state,
				agreementId: action.agreementId,
				selectedPlan: undefined,
			};
		case ChangePlanActions.SELECT_NEW_PLAN:
			return {
				...state,
				selectedPlan: action.selectedPlan,
				initializationResult: undefined,
			};
		case ChangePlanActions.SET_CURRENT_PLAN:
			return {
				...state,
				currentPlan: action.currentPlan,
			};
		case ChangePlanActions.SELECT_NEW_PLAN_COMPLETE:
			return {
				...state,
				initializationResult: action.initializationResult,
			};
		case ChangePlanActions.SHOW_CHANGE_PLAN_SUMMARY_MODAL:
			return {
				...state,
				isChangePlanSummaryModalShown: true,
			};
		case ChangePlanActions.HIDE_CHANGE_PLAN_SUMMARY_MODAL:
			return {
				...state,
				isChangePlanSummaryModalShown: false,
			};
		case ChangePlanActions.RESET_AVAILABLE_PLAN_PRODUCT_OFFERINGS:
			return {
				...state,
				availablePlanProductOfferingsByAgreement: {},
			};
		case ChangePlanActions.GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS_COMPLETE:
			const { agreementId, availablePlans } = action;
			if (!agreementId) {
				return state;
			}
			return {
				...state,
				availablePlanProductOfferingsByAgreement: {
					...state.availablePlanProductOfferingsByAgreement,
					[agreementId]: availablePlans || [],
				},
			};

		default:
			return state;
	}
};

export default changePlanReducer;

export { ChangePlanState, getRecurringInitialState };
