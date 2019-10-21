import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import { HasFlux, LifecycleChangeAction, ProductModificationResult, Service } from "../../../redux/types";
import { AppState } from "../../../redux/reducers";
import ProductServicesByActivity, {
	ProductServicesByActivityActionProps,
	ProductServicesByActivityOwnProps, ProductServicesByActivityProps,
	ProductServicesByActivityStateProps
} from "./ProductServicesByActivity";
import actions from "../../../redux/actions";

const mapStateToProps = (state: AppState, ownProps: HasFlux & ProductServicesByActivityOwnProps):
	ProductServicesByActivityStateProps => {

	const showServiceStatusChangeModal = Boolean(state.lifecycle.transition
		&& state.lifecycle.reasons && state.lifecycle.reasons.length > 0
		&& state.lifecycle.selectedService);

	return {
		serviceStateTransitionByActionName: state.lifecycle.serviceStateTransitionByActionName || {},
		callForwardingServices: state.service.callForwardingServices,
		callForwardingConfigurationResult: state.service.callForwardingConfigurationResult,
		showServiceStatusChangeModal
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux & ProductServicesByActivityOwnProps): ProductServicesByActivityActionProps => {
	return {
		actions: {
			resetCallForwardingConfiguration: () => {
				dispatch(actions.service.resetCallForwardingConfiguration());
			},
			initializeStateTransition: (service: Service, transition: LifecycleChangeAction) => {
				dispatch(actions.lifecycle.fetchReasons(transition.id, transition.targetType));
				dispatch(actions.lifecycle.setTransition(transition));
				dispatch(actions.lifecycle.setSelectedService(service));
			}
		}
	};
};

const mergeProps = (stateProps: ProductServicesByActivityStateProps,
					dispatchProps: ProductServicesByActivityActionProps,
					ownProps: HasFlux & ProductServicesByActivityOwnProps): ProductServicesByActivityProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductServicesByActivity);
