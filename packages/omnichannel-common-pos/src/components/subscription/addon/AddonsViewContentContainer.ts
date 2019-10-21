import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import {
	AddonsViewContent,
	AddonsViewContentActionProps,
	AddonsViewContentOwnProps, AddonsViewContentProps,
	AddonsViewContentStateProps
} from "./AddonsViewContent";
import { AppState, LifecycleChangeAction, Product, Selectors, actions, ProductOffering } from "../../../redux";
import { HasFlux } from "../../../redux/types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";

const PRODUCT_ID_KEY = "product-id";

const mapStateToProps = (state: AppState, ownProps: AddonsViewContentOwnProps): AddonsViewContentStateProps => {
	const { product } = ownProps;

	const showAddonModificationModal = Boolean(state.lifecycle.transition
		&& state.lifecycle.reasons && state.lifecycle.reasons.length > 0
		&& state.lifecycle.selectedAddon);

	const allowedActiveAddons: string = state.sales.activeAddons.map((addon: ProductOffering): string => {
		const characteristics = ProductOfferingUtil.getInstanceCharacteristics(addon);
		return characteristics[PRODUCT_ID_KEY] && characteristics[PRODUCT_ID_KEY].values ? characteristics[PRODUCT_ID_KEY].values[0].value : "";
	}).join(",");
	const activeAddons = (product ? Selectors.digitalLife.getActiveAddons(product, state) : [])
		.filter((product: Product) => {
			return allowedActiveAddons.includes(product.id);
		});

	return {
		availableAddons: state.sales.availableAddons,
		activeAddons,
		addonPaginationCount: ownProps.addonPaginationCount || 15, // TODO: took from consul?
		addonEnableError: state.basket.addonEnableError,
		addonSuccessfullyUpdated: state.basket.addonSuccessfullyUpdated,
		stateTransitionByActionName: state.lifecycle.stateTransitionByActionName || {},
		showAddonModificationModal,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux & AddonsViewContentOwnProps): AddonsViewContentActionProps => {
	return {
		actions: {
			getAvailableAddonProducts: () => dispatch(actions.sales.getAvailableAddonProducts(ownProps.agreementId)),
			getAlternateOfferingsForProduct: ownProps.flux.actions.SalesActions.getAlternateOfferingsForProduct,
			initializeStateTransition: (addon: Product, transition: LifecycleChangeAction) => {
				dispatch(actions.lifecycle.fetchReasons(transition.id, transition.targetType));
				dispatch(actions.lifecycle.setTransition(transition));
				dispatch(actions.lifecycle.setSelectedAddon(addon));
			}
		}
	};
};

const mergeProps = (stateProps: AddonsViewContentStateProps,
					dispatchProps: AddonsViewContentActionProps,
					ownProps: AddonsViewContentOwnProps): AddonsViewContentProps => {

	return {
		...ownProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddonsViewContent);
