"use strict";

import { connect } from "react-redux";

import { PlanInfo, PlanInfoProps } from "./PlanInfo";
import { AppState } from "../../../../../redux/reducers/index";
import messages from "./ChangePlanSummary.messages";
import ProductOfferingUtil from "../../../../../utils/ProductOfferingUtil";
import PriceUtil from "../../../../../utils/PriceUtil";
import AllowanceUtil from "../../../../../utils/AllowanceUtil";

const mapStateToProps = (state: AppState): PlanInfoProps => {
	const plan = state.changePlan.selectedPlan;

	const allowancesInfo = (plan && AllowanceUtil.getAllowances(plan).map(AllowanceUtil.getAllowanceInfo)) || [];
	return {
		labelMessage: messages.targetPlanLabel,
		name: (plan && ProductOfferingUtil.getPOName(plan)) || "",
		allowancesInfo,
		recurringFee: (plan && PriceUtil.getRecurrentPriceSumInList(ProductOfferingUtil.getPricesList(plan))) || PriceUtil.getRecurrentPrice(0),
		activationFee: (plan && PriceUtil.getOneTimePriceSumInList(ProductOfferingUtil.getPricesList(plan))) || PriceUtil.getOneTimePrice(0),
	};
};

const TargetPlanInfoContainer = connect(mapStateToProps)(PlanInfo);
export { TargetPlanInfoContainer };
