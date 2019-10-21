"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { HasFlux } from "../redux/types";
import { AppState, actions } from "../redux";
import {
	ProductOfferingConfigurationModal,
	ProductOfferingConfigurationModalActionProps,
	ProductOfferingConfigurationModalEnhancedProps,
	ProductOfferingConfigurationModalStateProps
} from "./ProductOfferingConfigurationModal";
import ComparisonSelectors from "../selectors/comparison/ComparisonSelectors";

interface ProductOfferingConfigurationModalContainerLocalProps extends ProductOfferingConfigurationModalStateProps {
	isActiveCustomer: boolean;
}

const mapStateToProps = (state: AppState): ProductOfferingConfigurationModalContainerLocalProps => {
	const product = ComparisonSelectors.getProductInCurrentComparison(state);

	return {
		product: product,
		configurations: state.productOfferingConfiguration.configurations,
		activeBasket: state.basket.activeBasket,
		isActiveCustomer: Boolean(state.customerCase.activeCustomerCase &&
						  state.customerCase.activeCustomerCase.attributes &&
						  state.customerCase.activeCustomerCase.attributes.activeCustomer),
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): ProductOfferingConfigurationModalActionProps => ({
	actions: {
		handleClose: () => {
			dispatch(actions.comparison.showConfigurationModalForProduct(""));
		},
		addProductToBasket: ownProps.flux.actions.BasketActions.addProductToBasket,
	}
});

const mergedProps = (stateProps: ProductOfferingConfigurationModalContainerLocalProps,
					dispatchProps: ProductOfferingConfigurationModalActionProps): ProductOfferingConfigurationModalEnhancedProps => {
const { isActiveCustomer, ...restStateProps } = stateProps;
	return {
		...restStateProps,
		...dispatchProps,
		addProduct: () => {
			if (!stateProps.product) {
				return;
			}
			dispatchProps.actions.addProductToBasket({
				product: stateProps.product,
				configurations: stateProps.configurations!,
				basketId: stateProps.activeBasket && stateProps.activeBasket.id,
				hasCustomer: stateProps.isActiveCustomer,
			});
			dispatchProps.actions.handleClose();
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergedProps)(ProductOfferingConfigurationModal);
