"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../redux";
import NavBarSessionButton, {
	NavBarSessionButtonActionsProps,
	NavBarSessionButtonStateProps
} from "./NavBarSessionButton";

const mapStateToProps = (state: AppState): NavBarSessionButtonStateProps => {
	const salesRepSession: any = state.salesRepSession as any;
	return {
		error: salesRepSession.error,
		salesOrganizationRoleId: salesRepSession.salesOrganizationRoleId,
		active: salesRepSession.active,
		consulValuesLoaded: salesRepSession.consulValuesLoaded,
		showSalesOrganizationModal: salesRepSession.showSalesOrganizationModal,
		selectedTerminal: salesRepSession.selectedTerminal,
		showModal: salesRepSession.showModal,
		terminals: salesRepSession.terminals || [],
		user: state.user.user,
		userRoleId: state.auth.userRoleId || "",
		activeBasket: state.basket.activeBasket

	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: {flux: any}): NavBarSessionButtonActionsProps => {
	return {
		actions: {
			clearSalesRepSession: ownProps.flux.actions.SalesRepSessionActions.clearSalesRepSession,
			showModal: ownProps.flux.actions.SalesRepSessionActions.showModal,
			updateInfo: ownProps.flux.actions.SalesRepSessionActions.updateInfo,
			clearSalesOrganizationAndInventory: ownProps.flux.actions.SalesRepSessionActions.clearSalesOrganizationAndInventory,
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSessionButton);
