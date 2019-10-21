"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import { default as MiniBasket, MiniBasketActionProps, MiniBasketStateProps } from "./MiniBasket";
import { AppState } from "../../../redux/reducers";
import BasketUtil from "../../../utils/BasketUtil";
import { HasFlux, BasketItem } from "../../../redux/types";
import actions from "../../../redux/actions";
import { commonShopRoutes } from "../../../routes/commonRoutesMap";

const mapStateToProps = (state: AppState): MiniBasketStateProps => ({
	basketItems: state.basket.basketItems,
	referenceNumber: "",
	activeBasketId: state.basket.activeBasket && state.basket.activeBasket.id,
	activeCustomerId: get(state.customerCase.activeCustomerCase, "attributes.activeCustomer.id"),
	customerAccountId: get(state.customerCase.activeCustomerCase, "attributes.activeCustomer.customerAccountId"),
	hideCheckoutButton: state.basket.basketItems && state.basket.basketItems.length === 0 ||
		state.router.location.pathname.includes(commonShopRoutes.CHECKOUT.path),
	basketLifeCycleStatusOpen: get(state.basket.activeBasket, "attributes.lifecycleStatus") === "OPEN",
	upfrontCost: BasketUtil.getPrice(state.basket.activeBasket, "ONE_TIME"),
	monthlyCost: BasketUtil.getPrice(state.basket.activeBasket, "RECURRENT"),
	miniBasketErrors: state.basketError && state.basketError.errors
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): MiniBasketActionProps => {
	return {
		actions: {
			discardBasket: ownProps.flux.actions.BasketActions.discardBasket,
			removeFromBasket: (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => {
				dispatch(actions.basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket));
			},
			removeBasketErrors: () => {
				dispatch(actions.basketError.clearBasketErrorStore());
			},
			resetAddressWithBasketItemIdEntries: () => {
				dispatch(actions.basket.resetAddressWithBasketItemIdEntries());
			}
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniBasket);
