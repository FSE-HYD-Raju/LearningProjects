"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "../../../../redux";
import AddonConfigurationModal, {
	AddonConfigurationModalStateProps,
	AddonConfigurationModalOwnProps,
	AddonConfigurationModalActionProps,
	AddonConfigurationModalProps
} from "./AddonConfigurationModal";
import { AddonUtils } from "../Addon.utils";
import actions from "../../../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: AddonConfigurationModalOwnProps & HasFlux & { forCustomer?: boolean }):
	AddonConfigurationModalStateProps => {

	const { forCustomer } = ownProps;
	return {
		individualId: AddonUtils.getIndividualId(state, forCustomer),
		productConfigurationSummary: state.sales.productConfigurationSummary,
		productConfigurationErrors: state.sales.productConfigurationErrors,
		configurations: state.productOfferingConfiguration.configurations,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: AddonConfigurationModalOwnProps & HasFlux & { forCustomer?: boolean }):
	AddonConfigurationModalActionProps => {
	const flux = ownProps.flux;
	return {
		actions: {
			submitProductConfiguration: flux.actions.SalesActions.submitProductConfiguration,
			terminateProductConfiguration: () => {
				flux.actions.SalesActions.resetProductConfiguration();
				dispatch(actions.router.goBack());
			}
		}
	};
};

const mergeProps = (stateProps: AddonConfigurationModalStateProps, dispatchProps: AddonConfigurationModalActionProps,
					ownProps: AddonConfigurationModalOwnProps & HasFlux & { forCustomer?: boolean }): AddonConfigurationModalProps => {

	const { flux, forCustomer, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddonConfigurationModal);
