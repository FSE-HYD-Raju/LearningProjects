import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	Plans,
	PlansActionProps,
	PlansOwnProps,
	PlansProps,
	PlansStateProps,
	AppState,
	HasFlux,
	ProductOffering,
	ProductPath,
	actions,
	Product
} from "omnichannel-common-pos";
import { isEmpty } from "lodash";

const getValidFocusedProduct = (product?: ProductOffering): ProductOffering | undefined => {
	if (isEmpty(product)) {
		return undefined;
	}

	if (product && product.type === "productOfferings" && product.attributes && !isEmpty(product.attributes.specSubType)) {
		return product;
	}

	return undefined;
};

const mapStateToProps = (state: AppState, ownProps: PlansOwnProps): PlansStateProps => {
	const focusedPlan = getValidFocusedProduct(state.sales.product);
	return {
		agreements: state.customerCase.agreements || [], // since we are in POS we never try to get agreements from digitalLife store
		alternatePlans: state.sales.alternateProductOfferings, // TODO: why renaming?
		contextualPaymentMethodsWithExtraInfo: state.sales.eligiblePaymentMethods,
		plan: focusedPlan,
		focusedPlan: focusedPlan, // same???
		individualId: state.user.user && state.user.user.individualId,
		paymentInfo: state.sales.paymentInfo,
		productConfigurationSummary: state.sales.productConfigurationSummary,
		configurations: state.productOfferingConfiguration.configurations,
		submittedBasket: state.basket.submittedBasket,
		showChangePlanAction: (plan: Product) => Boolean(state.feature.showActionsForPlans && plan.hasAlternateOfferings),
		showConfigurePlanAction: (plan: Product) => Boolean(state.feature.showActionsForPlans && plan.isPlan),
		subscription: ownProps.subscription,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: PlansOwnProps & HasFlux): PlansActionProps => {
	const fluxActions = ownProps.flux.actions;
	return 	{
		actions: {
			commitProductReplace: fluxActions.SalesActions.commitProductReplace,
			resetProductConfiguration: fluxActions.SalesActions.resetProductConfiguration,
			submitProductConfiguration: fluxActions.SalesActions.submitProductConfiguration,
			resetProductChange: fluxActions.SalesActions.resetProductChange,
			initializeProductReplace: fluxActions.SalesActions.initializeProductReplace,
			getProductById: fluxActions.SalesActions.getProductById,
			getProductsByIds: fluxActions.SalesActions.getProductsByIds,
			getProductsFromCategory: fluxActions.SalesActions.getProductsFromCategory,
			discardBasket: fluxActions.BasketActions.discardBasket,
			submitBasket: fluxActions.BasketActions.submitBasket,
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => {
				dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
			},
			selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
				dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
			},
			onChangePlan: fluxActions.SalesActions.getAlternateOfferingsForProduct, // TODO: why renaming?
		}
	};
};

// this is required to omit flux property in component
const mergeProps = (stateProps: PlansStateProps, dispatchProps: PlansActionProps, ownProps: PlansOwnProps & HasFlux): PlansProps => {
	const { flux, ...restOwnProps } = ownProps;
	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

export default connect<PlansStateProps, PlansActionProps, PlansOwnProps & HasFlux, PlansProps, AppState>
(mapStateToProps, mapDispatchToProps, mergeProps)(Plans);
