"use strict";
import * as React from "react";
import { ComponentClass } from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { withRouter, RouteComponentProps, StaticContext } from "react-router";
import { AppState, actions, Selectors } from "../../redux";
import {
	default as PaymentReturnHandler,
	PaymentReturnHandlerActionProps,
	PaymentReturnHandlerStateProps
} from "./PaymentReturnHandler";
import { HasFlux } from "../../redux/types";

interface PaymentReturnHandlerContainerOwnProps extends HasFlux {
	successRoute: string;
	rejectRoute: string;
	receiptCreateFailedRoute: string;
}

const mapStateToProps = (state: AppState, ownProps: PaymentReturnHandlerContainerOwnProps & RouteComponentProps<any>):
	PaymentReturnHandlerStateProps & RouteComponentProps<any> => {
	const user = Selectors.user.getUser(state);
	return {
		location: ownProps.location,
		history: ownProps.history,
		match: ownProps.match,
		staticContext: ownProps.staticContext,
		submittedBasket: state.basket.submittedBasket,
		committedBasket: state.basket.committedBasket,
		paymentStatus: state.payment.paymentStatus,
		errors: state.payment.errors,
		contextualPaymentMethodId: state.payment.contextualPaymentMethodId,
		successRoute: ownProps.successRoute,
		rejectRoute: ownProps.rejectRoute,
		receiptCreateFailedRoute: ownProps.receiptCreateFailedRoute,
		disableBasketSubmit: state.feature.disableBasketSubmit || false,
		storedTopupProduct: state.basket.storedTopupProduct,
		customerAccountId: user && user.id,
		selectedPaymentUseCase: state.payment.selectedPaymentUseCase,
		returnBaseLocation: state.payment.returnBaseLocation,
		customerPaymentMethod: state.payment.customerPaymentMethod,
		paymentMethodRelationId: state.feature.paymentMethodRelationId
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: PaymentReturnHandlerContainerOwnProps): PaymentReturnHandlerActionProps => {
	return {
		actions: {
			submitBasket: ownProps.flux.actions.BasketActions.submitBasket,
			addProductToBasket: ownProps.flux.actions.BasketActions.addProductToBasket,
			handlePaymentReject: ownProps.flux.actions.PaymentActions.handlePaymentReject,
			validatePayment: ownProps.flux.actions.PaymentActions.validatePayment,
			validatePaymentWithoutBasket: (paymentUsecase: string, contextualPaymentMethodId: string, paymentParams: object, customerAccountId: string) =>
				dispatch(actions.payment.validatePaymentWithoutBasket(paymentUsecase, contextualPaymentMethodId, paymentParams, customerAccountId)),
			historyPush: (newLocation: string) => dispatch(actions.router.push(newLocation)),
		}
	};
};

const PaymentReturnHandlerConnected: ComponentClass<PaymentReturnHandlerContainerOwnProps> =
	withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentReturnHandler));
export default PaymentReturnHandlerConnected;
export {
	PaymentReturnHandlerContainerOwnProps,
};
