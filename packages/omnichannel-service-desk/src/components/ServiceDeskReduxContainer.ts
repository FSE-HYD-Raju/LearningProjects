"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { actions, AppState, HasFlux, ProductPath } from "omnichannel-common-pos";
import { default as ServiceDeskContainer, ServiceDeskContainerActionProps, ServiceDeskContainerStateProps } from "./ServiceDeskContainer";
import { ComponentType } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface ServiceDeskReduxContainerOwnProps extends HasFlux, RouteComponentProps<any> {
	posRoutes: ComponentType<any>;
}

const mapStateToProps = (state: AppState, ownProps: ServiceDeskReduxContainerOwnProps): ServiceDeskContainerStateProps => ({
	toolmode: state.navBar.toolmode,
	toolmodeIndividualId: state.user.toolmodeIndividualId,
	user: state.user.user,
	activeCustomerCase: state.customerCase.activeCustomerCase,
	showNoCustomerWarning: state.basket.showNoCustomerWarning,
	showBlacklistedCustomerWarning: state.basket.showBlacklistedCustomerWarning,
	singleTermCustomers: state.customer.singleTermCustomers,
	searchingForSingleCustomer: state.customer.searchingForSingleCustomer,
	showCustomerCreationModal: state.navBar.showCustomerCreationModal,
	showInstallationTimeConfigurationModal: state.basket.showInstallationTimeConfigurationModal,
	installationTimeConfig: state.basket.installationTimeConfig,
	posRoutes: ownProps.posRoutes,
	searchConfigs: state.consul.searchConfigs,
	consulValuesLoaded: state.salesRepSession.consulValuesLoaded,
	enableNavbarInToolmode: state.feature.enableNavbarInToolmode,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): ServiceDeskContainerActionProps => {
	const fluxActions = ownProps.flux.actions;
	return {
		actions: {
			createNewCustomerCase: fluxActions.CustomerCaseActions.createNewCustomerCase,
			getAgreements: fluxActions.CustomerCaseActions.getAgreements,
			setCustomer: ownProps.flux.actions.CustomerCaseActions.setCustomer,
			getCustomerById: fluxActions.CustomerActions.getCustomerById,
			searchCustomerWithSingleTerm: fluxActions.CustomerActions.searchCustomerWithSingleTerm,
			cancelAddProduct: fluxActions.BasketActions.cancelAddProduct,
			showCustomerCreationModal: (keepCustomer: boolean) => {
				dispatch(actions.navBar.showCustomerCreationModal(keepCustomer));
			},
			toggleInstallationTimeConfigurationModal: fluxActions.BasketActions.toggleInstallationTimeConfigurationModal,
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			resetConfigurableInstallationTime: () => {
				dispatch(actions.productOfferingConfiguration.resetConfigurableInstallationTime());
			},
			hideNoCustomerWarning: fluxActions.BasketActions.hideNoCustomerWarning,
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceDeskContainer));
