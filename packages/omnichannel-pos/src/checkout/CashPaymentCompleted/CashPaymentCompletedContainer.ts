import { ComponentClass } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState, HasFlux } from "omnichannel-common-pos";
import { get } from "lodash";
import {
	default as CashPaymentCompleted,
	CashPaymentCompletedStateProps,
	CashPaymentCompletedActionProps,
	CashPaymentCompletedProps,
} from "./CashPaymentCompleted";

interface CashPaymentCompletedContainerOwnProps extends HasFlux {
}
interface CashPaymentCompletedContainerStateProps extends CashPaymentCompletedStateProps {
	personId: string;
}

interface CashPaymentCompletedContainerActionProps {
	actions: {
		createBasket: (personId: string) => void;
	};
}

const mapStateToProps = (state: AppState, ownProps: CashPaymentCompletedContainerOwnProps):
	CashPaymentCompletedContainerStateProps => {
	return {
		personId: get(state.customerCase, "activeCustomerCase.attributes.activeCustomer.customerAccountId") ?
			get(state.customerCase, "activeCustomerCase.attributes.activeCustomer.id") : undefined,
		referenceNumber: state.payment && state.payment.referenceNumber
	};
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CashPaymentCompletedContainerOwnProps): CashPaymentCompletedActionProps => {
	return {
		actions: {
			createBasket: ownProps.flux.actions.BasketActions.createBasket,
		}
	};
};

const mergeProps = (stateProps: CashPaymentCompletedContainerStateProps,
	dispatchProps: CashPaymentCompletedContainerActionProps,
	ownProps: CashPaymentCompletedContainerOwnProps): CashPaymentCompletedProps => {
	const { flux, ...restOwnProps } = ownProps;
	const { personId, ...restStateProps } = stateProps;

	return {
		...restStateProps,
		actions: {
			...dispatchProps.actions,
			createBasket: () => dispatchProps.actions.createBasket(personId),
		},
		...restOwnProps,
	};
};

const CashPaymentCompletedConnected: ComponentClass<CashPaymentCompletedContainerOwnProps> = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CashPaymentCompleted);

export default CashPaymentCompletedConnected;

export {
	CashPaymentCompletedContainerOwnProps,
};
