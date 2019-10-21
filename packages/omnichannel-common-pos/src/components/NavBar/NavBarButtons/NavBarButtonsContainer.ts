"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux } from "../../../redux";
import NavBarButtons, { NavBarButtonsStateProps, NavBarButtonsActionProps } from "./NavBarButtons";
import actions from "../../../redux/actions";

const mapStateToProps = (state: AppState): NavBarButtonsStateProps => {
	const locales = state.consul.locales || [];
	return {
		showBasket: state.navBar.showBasket,
		showBasketMenu: state.navBar.showBasketMenu,
		showLogin: state.navBar.showLogin,
		showMobileNavigation: state.navBar.showMobileNavigation,
		salesRepUser: state.user.salesRepUser,
		user: state.user.user,
		basketItems: state.basket.basketItems,
		isBasketAfterPayment: !!state.basket.submittedBasket && state.basket.checkoutSteps && state.basket.checkoutSteps.activeStep === "PAYMENT",
		registrationFormEnabled: state.feature.registrationFormEnabled,
		haveMultipleCurrencies: state.currency.currencies.length > 1,
		haveMultipleLanguages: locales.length > 1
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): NavBarButtonsActionProps => {
	return {
		actions: {
			hideAll: () => {
				dispatch(actions.navBar.hideAll());
			},
			toggleLogin: () => {
				dispatch(actions.navBar.toggleLogin());
			},
			toggleBasketMenu: () => {
				dispatch(actions.navBar.toggleBasketMenu());
			},
			toggleMobileNavigation: () => {
				dispatch(actions.navBar.toggleMobileNavigation());
			},
			aaLogin: () => {
				ownProps.flux.actions.UserActions.aaLogin(undefined);
			}
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarButtons);
