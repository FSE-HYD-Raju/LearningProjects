"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "omnichannel-common-pos";
import {
	default as SalesOrganizationModal,
	SalesOrganizationModalActionProps,
	SalesOrganizationModalStateProps
} from "./SalesOrganizationModal";

interface SalesOrganizationModalContainerOwnProps extends HasFlux {}

const mapStateToProps = (state: AppState): SalesOrganizationModalStateProps => ({
	consulValuesLoaded: state.salesRepSession.consulValuesLoaded || false,
	inventories: state.salesRepSession.inventories,
	salesOrganizations: state.salesRepSession.salesOrganizations,
	activeSalesOrganization: state.salesRepSession.activeSalesOrganization,
	activeInventory: state.salesRepSession.activeInventory,
	showSalesOrganizationModal: Boolean(state.salesRepSession.showSalesOrganizationModal),
	toolmode: state.navBar.toolmode || false,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: SalesOrganizationModalContainerOwnProps): SalesOrganizationModalActionProps => {
	const { actions } = ownProps.flux;
	return {
		actions: {
			setSelectedOrganization: actions.SalesRepSessionActions.setSelectedOrganization,
			revertSalesOrganizationAndInventory: actions.SalesRepSessionActions.revertSalesOrganizationAndInventory,
			getInventories: actions.SalesRepSessionActions.getInventories,
			getOrganizations: actions.SalesRepSessionActions.getOrganizations,
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesOrganizationModal);
