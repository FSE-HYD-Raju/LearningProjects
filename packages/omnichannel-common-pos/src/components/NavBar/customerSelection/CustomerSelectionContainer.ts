"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux, actions, CustomerAccount } from "../../../redux";
import CustomerSelection, {
	CustomerSelectionStateProps,
	CustomerSelectionActionProps
} from "./CustomerSelection";

const mapStateToProps = (state: AppState): CustomerSelectionStateProps => {
	return {
		user: state.user.user,
		searchConfigs: state.consul.searchConfigs,
		singleTerm: state.customer.singleTerm,
		singleTermCustomers: state.customer.singleTermCustomers,
		searchingForSingleCustomer: state.customer.searchingForSingleCustomer || false,
		hasActiveCustomerCase: !!state.customerCase.activeCustomerCase,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): CustomerSelectionActionProps => {
	const flux = ownProps.flux;

	return {
		actions: {
			clearSingleTermSearch: flux.actions.CustomerActions.clearSingleTermSearch,
			searchCustomerWithSingleTerm: flux.actions.CustomerActions.searchCustomerWithSingleTerm,
			setSingleTerm: flux.actions.CustomerActions.setSingleTerm,
			showCustomerCreationModal: (keepExistingCustomer: boolean) => {
				dispatch(actions.navBar.showCustomerCreationModal(keepExistingCustomer));
			},
			setCustomer: flux.actions.CustomerCaseActions.setCustomer,
			createNewCustomerCase: flux.actions.CustomerCaseActions.createNewCustomerCase,
			deleteUIbasket: flux.actions.BasketActions.deleteUIbasket,
			cancelAddProduct: flux.actions.BasketActions.cancelAddProduct,
			resetConfigurations: () => {
				dispatch(actions.productOfferingConfiguration.resetConfigurations());
			},
			resetAddressWithBasketItemIdEntries: () => {
				dispatch(actions.basket.resetAddressWithBasketItemIdEntries());
			},
			resetLocations: () => {
				dispatch(actions.location.resetLocations());
			},
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelection);
