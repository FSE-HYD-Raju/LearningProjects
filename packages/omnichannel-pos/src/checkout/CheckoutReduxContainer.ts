"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux, actions, BasketItem } from "omnichannel-common-pos";
import { withRouter, RouteComponentProps } from "react-router";
import {
	default as CheckoutContainer,
	CheckoutContainerActionProps, CheckoutContainerStateProps, CheckoutContainerProps
} from "./CheckoutContainer";

const mapStateToProps = (state: AppState): CheckoutContainerStateProps => {
	return {
		activeBasket: state.basket.activeBasket,
		orderBasket: state.basket.orderBasket,
		viewportSize: state.navBar.viewportSize,
		checkoutSteps: state.basket.checkoutSteps,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): CheckoutContainerActionProps => {
	return {
		actions: {
			clearOrderBasket: ownProps.flux.actions.BasketActions.clearOrderBasket,
			getBasketIncludeBasketItems: ownProps.flux.actions.BasketActions.getBasketIncludeBasketItems,
			removeFromBasket: (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => {
				dispatch(actions.basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket));
			},
		}
	};
};

const mergeProps = (stateProps: CheckoutContainerStateProps, dispatchProps: CheckoutContainerActionProps,
					ownProps: HasFlux & RouteComponentProps<any>): CheckoutContainerProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(CheckoutContainer));
