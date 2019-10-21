import * as React from "react";
import { actions, AppState } from "../../redux";
import { Dispatch, AnyAction } from "redux";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import {
	default as PaymentMethodsReturnHandler,
	PaymentMethodsReturnHandlerStateProps,
	PaymentMethodsReturnHandlerActionProps
} from "./PaymentMethodsReturnHandler";

const mapStateToProps = (state: AppState, props: RouteComponentProps<any>):
	PaymentMethodsReturnHandlerStateProps & RouteComponentProps<any> => {
	return {
		user: state.user.user,
		contextualPaymentMethodId: state.payment.contextualPaymentMethodId,
		location: props.location,
		history: props.history,
		match: props.match,
		staticContext: props.staticContext,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>):
	PaymentMethodsReturnHandlerActionProps => ({
		actions: {
			paymentMethodsVerificationToaster: (msg: string) => dispatch(actions.toaster.showSuccess(msg)),
			validatePaymentResultAfterReturningFromTheSIA: (contextualPaymentMethodId: string, paymentParams: object, customerAccountId: string) =>
				dispatch(actions.payment.validatePaymentResultAfterReturningFromTheSIA(contextualPaymentMethodId, paymentParams, customerAccountId)),
			historyPush: (newLocation: string) => {
				dispatch(actions.router.push(newLocation));
			},
		}
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsReturnHandler);
