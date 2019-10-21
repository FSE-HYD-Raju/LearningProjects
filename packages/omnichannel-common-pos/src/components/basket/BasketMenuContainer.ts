import { connect } from "react-redux";
import actions from "../../redux/actions";
import * as React from "react";

import BasketMenu, { BasketMenuActionProps, BasketMenuStateProps } from "./BasketMenu";
import { AppState } from "../../redux/reducers";
import { AnyAction, Dispatch } from "redux";

const mapStateToProps = (state: AppState): BasketMenuStateProps => {
	const { basket, user } = state;
	return {
		basketItems: basket.basketItems,
		showBasketMenuNotification: basket.showBasketMenuNotification,
		activeBasket: basket.activeBasket,
		isUser: !!user.user
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BasketMenuActionProps => ({
	actions: {
		toggleBasketMenu: () =>
			dispatch(actions.navBar.toggleBasketMenu())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketMenu);
