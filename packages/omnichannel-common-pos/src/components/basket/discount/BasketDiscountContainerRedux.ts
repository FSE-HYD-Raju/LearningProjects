"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	default as BasketDiscountContainer,
	BasketDiscountContainerActionProps,
	BasketDiscountContainerStateProps, BasketDiscountContainerProps
} from "./BasketDiscountContainer";
import { AppState } from "../../../redux/reducers";
import { HasFlux } from "../../../redux/types";

const mapStateToProps = (state: AppState): BasketDiscountContainerStateProps => ({
	activeBasket: state.basket.activeBasket,
	selectedDiscount: state.basket.selectedDiscount,
	basketItems: state.basket.basketItems,
	discounts: state.basket.discounts,
	selectedCurrency: state.currency.selectedCurrency,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): BasketDiscountContainerActionProps => {
	return {
		actions: {
			fetchDiscounts: ownProps.flux.actions.BasketActions.fetchDiscounts,
			removeSelectedDiscount: ownProps.flux.actions.BasketActions.removeSelectedDiscount,
			applyDiscountToBasket: ownProps.flux.actions.BasketActions.applyDiscountToBasket,
		}
	};
};

const mergeProps = (stateProps: BasketDiscountContainerStateProps, dispatchProps: BasketDiscountContainerActionProps, ownProps: HasFlux):
	BasketDiscountContainerProps => {

	return {
		...stateProps,
		...dispatchProps
	};

};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(BasketDiscountContainer);
