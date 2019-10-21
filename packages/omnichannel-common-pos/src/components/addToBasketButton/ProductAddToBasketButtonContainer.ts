"use strict";

import * as React from "react";
import { connect } from "react-redux";
import AddToBasketButton, { AddToBasketButtonStateProps } from "./AddToBasketButton";
import BasketSelectors from "../../selectors/basket/BasketSelectors";
import { AppState } from "../../redux/reducers";
import BasketUtil from "../../utils/BasketUtil";
import { ProductOffering } from "../../redux/types";

export interface ProductAddToBasketButtonContainerContainerProps {
	product: ProductOffering;
}
const mapStateToProps = (state: AppState, props: ProductAddToBasketButtonContainerContainerProps): AddToBasketButtonStateProps => ({
	product: props.product,
	isProductInBasket: BasketSelectors.isProductInBasket(props.product, state.basket.basketItems),
	allowedToAddToBasket: BasketUtil.allowedToAddToBasket(props.product, state.basket.basketItems, state.feature.basketMaxItemsLimits),
	updatingBasket: state.basket.updatingBasket
});

export default connect(mapStateToProps)(AddToBasketButton);
