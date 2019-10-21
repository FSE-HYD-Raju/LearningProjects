"use strict";

import { connect } from "react-redux";

import { PlanInfo, PlanInfoProps } from "./PlanInfo";
import { AppState } from "../../../../../redux/reducers/index";
import messages from "./ChangePlanSummary.messages";
import ProductOfferingUtil from "../../../../../utils/ProductOfferingUtil";
import PriceUtil from "../../../../../utils/PriceUtil";
import AllowanceUtil from "../../../../../utils/AllowanceUtil";

const mapStateToProps = (state: AppState): PlanInfoProps => {
	const plan = state.changePlan.currentPlan;
	const allowancesInfo = (plan && AllowanceUtil.getAllowances(plan).map(AllowanceUtil.getAllowanceInfo)) || [];

	return {
		labelMessage: messages.currentPlanLabel,
		name: (plan && ProductOfferingUtil.getPOName(plan)) || "",
		allowancesInfo,
		recurringFee: plan && PriceUtil.getRecurrentPriceSumInList(ProductOfferingUtil.getPricesList(plan)),
		activationFee: undefined,
	};
};

const CurrentPlanInfoContainer = connect(mapStateToProps)(PlanInfo);
export { CurrentPlanInfoContainer };
