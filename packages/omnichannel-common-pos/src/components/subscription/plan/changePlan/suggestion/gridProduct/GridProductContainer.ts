"use strict";

import * as React from "react";
import { actions, AppState } from "../../../../../../redux";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { GridProduct, GridProductActionProps, GridProductOwnProps, GridProductStateProps } from "./GridProduct";
import { ProductOffering } from "../../../../../../redux/types/index";
import ProductOfferingUtil from "../../../../../../utils/ProductOfferingUtil";
import AllowanceUtil from "../../../../../../utils/AllowanceUtil";
import PriceUtil from "../../../../../../utils/PriceUtil";

interface GridProductContainerProps extends GridProductOwnProps {
	product: ProductOffering;
}

const mapStateToProps = (state: AppState, ownProps: GridProductContainerProps): GridProductOwnProps & GridProductStateProps => {
	const { product } = ownProps;
	const allowancesInfo = (product && AllowanceUtil.getAllowances(product).map(AllowanceUtil.getAllowanceInfo)) || [];
	return {
		product,
		name: ProductOfferingUtil.getPOName(product) || "",
		allowancesInfo,
		recurringPrice: ProductOfferingUtil.getRecurrentPriceSum(product) || PriceUtil.getZeroPrice(),
		activationPrice: ProductOfferingUtil.getOneTimePriceSum(product) || PriceUtil.getZeroPrice(),
	};
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: GridProductContainerProps): GridProductActionProps => ({
	actions: {
		selectProduct: () => dispatch(actions.changePlan.selectNewPlan(ownProps.product)),
	},
});

const GridProductContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(GridProduct);
export { GridProductContainer, GridProductContainerProps };
