"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { Product } from "../../../redux/types/Product";
import { RowRendererProps } from "./list/PlansListView";
import { Agreement } from "../../../redux/types/Agreement";
import PlanUtils from "./Plan.utils";
import actions from "../../../redux/actions/index";
import { AppState } from "../../../redux/reducers/index";
import ProductUtil from "../../../utils/product/ProductUtil";
import { SubscriptionPlansProps, SubscriptionPlansStateProps, SubscriptionPlansActionProps, SubscriptionPlans } from "./SubscriptionPlans";
import { Selectors } from "../../../redux/index";

interface SubscriptionPlansContainerProps {
	subscription: Product;
	rowRenderer?: React.ComponentType<RowRendererProps>;
	changePlanRedirectUrl: string;
}

const mapStateToProps = (state: AppState, ownProps: SubscriptionPlansContainerProps): SubscriptionPlansStateProps => {
	const { subscription } = ownProps;
	const agreementId = subscription.agreementId;
	const agreement: Agreement | undefined = Selectors.digitalLife.getAgreementById(agreementId)(state);
	const plans = PlanUtils.extractActivePlans(agreement);

	return {
		plans,
		showChangePlanAction: (plan: Product) => Selectors.changePlan.isChangePlanAvailable(state, agreementId),
		showConfigurePlanAction: (plan: Product) => false,
	};
};
const mergeProps = (
	stateProps: SubscriptionPlansStateProps,
	dispatchProps: SubscriptionPlansActionProps,
	ownProps: SubscriptionPlansContainerProps
): SubscriptionPlansProps => {
	return {
		...stateProps,
		...dispatchProps,
		subscription: ownProps.subscription,
		rowRenderer: ownProps.rowRenderer,
		changePlanRedirectUrl: ownProps.changePlanRedirectUrl,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: SubscriptionPlansContainerProps): SubscriptionPlansActionProps => ({
	actions: {
		onChangePlan: (agreementId: string, plan: Product, redirectUrl: string) => {
			dispatch(actions.changePlan.initChangePlan(agreementId, plan.productOfferingId, redirectUrl));
		},
		onConfigurePlan: (x: any) => {},
		getAvailablePlansToChangePlan: (agreementId: string) => {
			dispatch(actions.changePlan.getAvailablePlanProductOfferings(agreementId));
		},
	},
});

const SubscriptionPlansContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SubscriptionPlans);
export { SubscriptionPlansContainer, SubscriptionPlansContainerProps };
