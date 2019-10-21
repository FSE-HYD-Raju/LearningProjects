import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { get } from "lodash";
import {
	HasFlux,
	actions,
	AppState,
	ProductOffering,
	Product,
	Eligibilities,
	EligibilityDecisionUseCase,
	RecipeId,
	ProductPath
} from "omnichannel-common-pos";
import ChangePlanView, { ChangePlanViewStoreProps, ChangePlanViewActionProps } from "./ChangePlanView";

export interface ChangePlanViewContainerProps extends HasFlux {
	subscription: Product;
	msisdn: string;
}

// Had to use reduce here since combining map with nested find may result in undefined
const filterChildProductsByIds = (childProducts: Product[], productIds: string[]): Product[] => {
	return productIds.reduce((acc: Product[], productId) => {
		const product: Product | undefined = childProducts.find(cp =>
			cp.productOfferingId === productId || cp.id === productId
		);
		if (product) {
			acc.push(product);
		}
		return acc;
	}, []);
};

const mapStateToProps = (state: AppState, ownProps: ChangePlanViewContainerProps): ChangePlanViewStoreProps => {
	const { msisdn, subscription } = ownProps;
	const errorCode =
		state.eligibility &&
		state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN] &&
		state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes &&
		state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.SUBSCRIPTION_VALIDATION][msisdn] &&
		state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.SUBSCRIPTION_VALIDATION][msisdn].error;

	const options = state.eligibility &&
	state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN] &&
	state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes &&
	state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.SUBSCRIPTION_PLAN_CHANGE] &&
	state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.SUBSCRIPTION_PLAN_CHANGE][msisdn] &&
	state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.SUBSCRIPTION_PLAN_CHANGE][msisdn].eligibilityOptions;

	const offerings = (state.productOfferings && state.productOfferings.productOfferings) || {};
	const alternatePlans: ProductOffering[] =
		(Array.isArray(options) &&
			options
				.map(option => option["product-offering-id"])
				.filter(productOfferingId => Object.keys(offerings).includes(productOfferingId))
				.map(productOfferingId => offerings[productOfferingId])) ||
		[];
	const eligibilityQueryActive: boolean =
		state.eligibility &&
		(state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN] && state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].changePlanQueryActive) || false;
	const addonCompatibilityQueryActive =
		state.eligibility &&
		(state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN] &&
			state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].addonCompatibilityQueryActive) ||
		false;
	const addonEligibilities: Eligibilities =
		state.eligibility &&
		(state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN] &&
			state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes &&
			state.eligibility[EligibilityDecisionUseCase.CHANGE_PLAN].recipes[RecipeId.PRODUCT_COMPATIBILITY_VALIDATION]) ||
		{};
	const childProducts: Product[] = ownProps.subscription && ownProps.subscription.childProducts || [];
	const compatible = filterChildProductsByIds(
		childProducts,
		Object.keys(addonEligibilities).filter(
			addonId => addonEligibilities[addonId].eligible && childProducts.find((childProduct: Product) =>
				childProduct.productOfferingId === addonId || childProduct.id === addonId)
		)
	);
	const incompatible = filterChildProductsByIds(
		childProducts,
		Object.keys(addonEligibilities).filter(
			addonId => !addonEligibilities[addonId].eligible && childProducts.find((childProduct: Product) =>
				childProduct.productOfferingId === addonId || childProduct.id === addonId)
		)
	);

	return {
		eligibilityQueryActive,
		addonCompatibilityQueryActive,
		subscription,
		alternatePlans,
		msisdn: ownProps.msisdn,
		addons: {
			compatible,
			incompatible
		},
		errorCode,
		configurations: state.productOfferingConfiguration && state.productOfferingConfiguration.configurations,
		basketId: get(state.basket, "activeBasket.id"),
		customerId: get(state.customerCase, "activeCustomerCase.attributes.activeCustomer.id"),
		enableChangeSubscription: state.feature && state.feature.enableChangeSubscription
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ChangePlanViewContainerProps): ChangePlanViewActionProps => {
	const fluxActions = ownProps.flux.actions;
	return {
		actions: {
			checkEligibilities: () =>
				dispatch(
					actions.eligibility.getEligibilitiesForChangePlan(EligibilityDecisionUseCase.CHANGE_PLAN, RecipeId.SUBSCRIPTION_VALIDATION, {
						msisdn: ownProps.msisdn
					})
				),
			checkAddonCompatibilities: (newPlanId: string, addonIds: Array<string>) =>
				dispatch(
					actions.eligibility.getAddonCompatibilitiesForChangePlan(
						EligibilityDecisionUseCase.CHANGE_PLAN,
						RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
						newPlanId,
						addonIds
					)
				),
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => {
				dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
			},
			selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
				dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
			},
			discardBackendBasket: fluxActions.BasketActions.discardBackendBasket,
			createBasket: fluxActions.BasketActions.createBasket,
			addProductToBasket: fluxActions.BasketActions.addProductToBasket,
			deleteUIbasket: fluxActions.BasketActions.deleteUIbasket,
			addChangePlanBasketItem: fluxActions.BasketActions.addChangePlanBasketItem,
			changeActiveAgreement: fluxActions.CustomerCaseActions.changeCustomerActiveAgreement,
		}
	};
};

export default connect<ChangePlanViewStoreProps, ChangePlanViewActionProps, ChangePlanViewContainerProps, AppState>
	(mapStateToProps, mapDispatchToProps)(ChangePlanView);
