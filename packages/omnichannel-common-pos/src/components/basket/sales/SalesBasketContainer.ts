import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { StatelessComponent, ComponentClass } from "react";
import { AppState } from "../../../redux/reducers";
import SalesBasket, { SalesBasketActionProps, SalesBasketStateProps } from "./SalesBasket";
import { HasFlux, BasketItem } from "../../../redux/types";
import actions from "../../../redux/actions";

const mapStateToProps = (state: AppState): SalesBasketStateProps => {
	return {
		selectedCurrency: state.currency.selectedCurrency,
		locale: state.consul.locale,
		activeBasketId: state.basket.activeBasket && state.basket.activeBasket.id,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): SalesBasketActionProps => ({
	actions: {
		removeFromBasket: (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => {
			dispatch(actions.basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket));
		},
		getBasketIncludeBasketItems: ownProps.flux.actions.BasketActions.getBasketIncludeBasketItems,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesBasket);
