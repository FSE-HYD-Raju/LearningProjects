import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import { HasFlux, InitializeServiceStateTransitionsParam, Service } from "../../../redux/types";
import { AppState } from "../../../redux";
import { RouteComponentProps, withRouter, StaticContext } from "react-router";
import StateChangeModal, {
	StateChangeModalOwnProps, StateChangeModalProps,
	StateChangeModalStateProps
} from "../stateChange/StateChangeModal";
import actions from "../../../redux/actions";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";

interface ServiceStateChangeModalOwnProps extends RouteComponentProps<{subscriptionId: string}>, StateChangeModalOwnProps {}

interface ServiceStateChangeModalStateProps extends StateChangeModalStateProps {
	tempProps: {
		customerId: string;
		agreementId: string;
		basketId: string | undefined;
		service: Service;
	};
}

const mapStateToProps = (state: AppState, ownProps: ServiceStateChangeModalOwnProps):
	ServiceStateChangeModalStateProps => {
	const agreementId = ownProps.match.params.subscriptionId;
	const customerId = state.customerCase.activeCustomerCase
		? get(state.customerCase.activeCustomerCase, "attributes.activeCustomer.id")
		: get(state.user, "user.id");

	const transition = state.lifecycle.transition!;
	const selectedService = state.lifecycle.selectedService;

	const tempProps: ServiceStateChangeModalStateProps["tempProps"] = {
		customerId,
		agreementId,
		basketId: state.lifecycle.serviceModification && state.lifecycle.serviceModification.basket
			? state.lifecycle.serviceModification.basket.id
			: undefined,
		service: state.lifecycle.selectedService!
	};

	return {
		isAddon: false,
		shouldInitializeStateTransition: true,
		reasons: state.lifecycle.reasons || [],
		resultTransition: state.lifecycle.serviceModification
					&& state.lifecycle.serviceModification.resource
					&& state.lifecycle.serviceModification.resource.attributes
			? state.lifecycle.serviceModification.resource.attributes.stateTransition
			: undefined,
		currency: state.currency.selectedCurrency,
		name: get(selectedService, "specification.name", ""),
		description: "",
		transition,
		tempProps,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): { dispatch: Dispatch<AnyAction> } => {
	return { dispatch };
};

const mergeProps = (stateProps: ServiceStateChangeModalStateProps, dispatchProps: { dispatch: Dispatch<AnyAction> },
					ownProps: ServiceStateChangeModalOwnProps): StateChangeModalProps => {

	const { tempProps, ...restStateProps } = stateProps;

	const initializeStateTransition = (reason?: string) => {
		const param: InitializeServiceStateTransitionsParam = {
			service: tempProps.service,
			stateTransition: stateProps.transition,
			agreementId: tempProps.agreementId,
			customerId: tempProps.customerId,
			reason
		};
		dispatchProps.dispatch(actions.lifecycle.initializeServiceStateTransition(param));
	};

	const acceptStateTransition = () => {
		dispatchProps.dispatch(actions.lifecycle.acceptServiceLifecycleStatusChange(tempProps.basketId!));
	};

	const cancelLifecycleStatusChange = () => {
		dispatchProps.dispatch(actions.lifecycle.cancelLifecycleStatusChange(tempProps.basketId!));
	};

	const resetStateModificationResult = () => {
		dispatchProps.dispatch(actions.lifecycle.resetStateModificationResult());
	};

	return {
		actions: {
			initializeStateTransition,
			acceptStateTransition,
			cancelLifecycleStatusChange,
			resetStateModificationResult,
		},
		requirePaymentMethodSelection: ownProps.requirePaymentMethodSelection,
		phoneNumber: ownProps.phoneNumber,
		requireReasonSelect: true,
		...restStateProps,
	};
};

const ServiceStateChangeModalContainerBaseline = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(StateChangeModal));

export default withCustomization<StateChangeModalOwnProps>(CommonCustomizationPoints.SERVICE_STATE_CHANGE_MODAL, ServiceStateChangeModalContainerBaseline);
export {
	ServiceStateChangeModalContainerBaseline
};
