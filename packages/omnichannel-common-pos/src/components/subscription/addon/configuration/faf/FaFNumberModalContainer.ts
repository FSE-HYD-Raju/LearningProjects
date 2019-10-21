"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "../../../../../redux";
import FaFNumberModal, {
	FaFNumberModalActionProps,
	FaFNumberModalOwnProps,
	FaFNumberModalProps,
	FaFNumberModalStateProps
} from "./FaFNumberModal";
import { AddonUtils } from "../../Addon.utils";
import actions from "../../../../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: FaFNumberModalOwnProps & { forCustomer?: boolean } & HasFlux): FaFNumberModalStateProps => {
	const { product, forCustomer } = ownProps;
	return {
		productConfigurationInitialization: state.sales.productConfigurationInitialization,
		productConfigurationSummary: state.sales.productConfigurationSummary,
		individualId: AddonUtils.getIndividualId(state, forCustomer),
		fafInputCharacteristic: AddonUtils.getFaFInputCharacteristics(product),
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: FaFNumberModalOwnProps & { forCustomer?: boolean } & HasFlux):
	FaFNumberModalActionProps => {
	const flux = ownProps.flux;
	return {
		actions: {
			initializeProductConfiguration: flux.actions.SalesActions.initializeProductConfiguration,
			resetProductConfiguration: flux.actions.SalesActions.resetProductConfiguration,
			goBack: () => {
				dispatch(actions.router.goBack());
			},
			submitInitializedProductConfiguration: flux.actions.SalesActions.submitInitializedProductConfiguration,
			getAgreement: flux.actions.DigitalLifeActions.getAgreement,
		}
	};
};

const mergeProps = (stateProps: FaFNumberModalStateProps, dispatchProps: FaFNumberModalActionProps,
					ownProps: FaFNumberModalOwnProps & { forCustomer?: boolean } & HasFlux): FaFNumberModalProps => {

	const { flux, forCustomer, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FaFNumberModal);
