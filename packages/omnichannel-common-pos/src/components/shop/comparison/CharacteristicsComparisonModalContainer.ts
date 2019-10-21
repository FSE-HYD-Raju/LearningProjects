"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { actions, AppState, HasFlux } from "../../../redux";
import {
	default as CharacteristicsComparisonModal,
	CharacteristicsComparisonModalActionProps,
	CharacteristicsComparisonModalStateProps,
	CharacteristicsComparisonModalProps,
} from "./CharacteristicsComparisonModal";
import { User } from "../../../redux/types";
import { RouteComponentProps } from "react-router";

interface CharacteristicsComparisonModalContainerOwnProps extends HasFlux , Pick<RouteComponentProps<{category: string}>, "match"> {}

const mapStateToProps = (state: AppState, ownProps: CharacteristicsComparisonModalContainerOwnProps): CharacteristicsComparisonModalStateProps => ({
	items: state.comparison.items,
	open: state.comparison.open,
	comparisonCharacteristics: state.comparison.comparisonCharacteristics,
	activeCustomer: (state.customerCase.activeCustomerCase && state.customerCase.activeCustomerCase.attributes) && state.customerCase.activeCustomerCase.attributes.activeCustomer as User,
	activeBasketId: state.basket.activeBasket && state.basket.activeBasket.id,
	configurations: state.productOfferingConfiguration.configurations,
	category: ownProps.match.params.category,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): CharacteristicsComparisonModalActionProps => ({
	actions: {
		addProductToBasket: ownProps.flux.actions.BasketActions.addProductToBasket,
		hide: () => {
			dispatch(actions.comparison.hide());
		},
		showConfigurationModalForProduct: (id: string) => {
			dispatch(actions.comparison.showConfigurationModalForProduct(id));
		},
	}
});

const mergeProps = (stateProps: CharacteristicsComparisonModalStateProps, dispatchProps: CharacteristicsComparisonModalActionProps,
					ownProps: CharacteristicsComparisonModalContainerOwnProps): CharacteristicsComparisonModalProps => {

	return {
		...stateProps,
		...dispatchProps
	};

};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CharacteristicsComparisonModal);
export {
	CharacteristicsComparisonModalContainerOwnProps
};
