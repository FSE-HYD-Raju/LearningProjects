"use strict";
import * as React from "react";
import { connect } from "react-redux";
import AddToBasketButton, { AddToBasketButtonStateProps } from "./AddToBasketButton";
import BasketSelectors from "../../selectors/basket/BasketSelectors";
import { AppState } from "../../redux/reducers";
import { ProductOffering } from "../../redux/types";
import BasketUtil from "../../utils/BasketUtil";

export interface AddToBasketButtonContainerProps {
	product: ProductOffering;
}

const mapStateToProps = (state: AppState, ownProps: AddToBasketButtonContainerProps): AddToBasketButtonStateProps => ({
	product: ownProps.product,
	isProductInBasket: BasketSelectors.isProductInBasket(ownProps.product, state.basket.basketItems),
	allowedToAddToBasket: BasketUtil.allowedToAddToBasket(ownProps.product, state.basket.basketItems, state.feature.basketMaxItemsLimits),
	updatingBasket: state.basket.updatingBasket,
	buyNowButtonEnabled: state.feature.eShopBuyNowButtonEnabled,
    disableMaxSubscriptionsInBasketMessage: state.feature.disableMaxSubscriptionsInBasketMessage,
});

export default connect(mapStateToProps)(AddToBasketButton);
