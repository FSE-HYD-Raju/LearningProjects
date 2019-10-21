import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import CallForwardingConfigurationModal, {
	CallForwardingConfigurationModalActionProps,
	CallForwardingConfigurationModalOwnProps, CallForwardingConfigurationModalProps,
	CallForwardingConfigurationModalStateProps
} from "./CallForwardingConfigurationModal";
import { HasFlux } from "../../../../redux/types";
import { AppState } from "../../../../redux/reducers";
import actions from "../../../../redux/actions";
import { CallForwardingConfigurationItem } from "./CallForwardingConfigurationState";

const mapStateToProps = (state: AppState, ownProps: CallForwardingConfigurationModalOwnProps & HasFlux):
	CallForwardingConfigurationModalStateProps => {
	return {
		callForwardingReasonCode: state.service.callForwardingReasonCode,
		callForwardingConfigurationErrors: state.service.callForwardingConfigurationErrors,
		customerId: state.customerCase.activeCustomerCase
		? get(state.customerCase, "attributes.activeCustomer.id")
		: get(state.user, "user.id"),

	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: CallForwardingConfigurationModalOwnProps & HasFlux):
	CallForwardingConfigurationModalActionProps => {
	return {
		actions: {
			submitCallForwardingConfiguration: (configuration: Record<string, CallForwardingConfigurationItem>, individualId: string, agreementId: string) => {
				dispatch(actions.service.submitCallForwardingConfiguration(configuration, individualId, agreementId));
			}
		}
	};
};

const mergeProps = (stateProps: CallForwardingConfigurationModalStateProps,
					dispatchProps: CallForwardingConfigurationModalActionProps,
					ownProps: CallForwardingConfigurationModalOwnProps & HasFlux): CallForwardingConfigurationModalProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CallForwardingConfigurationModal);
