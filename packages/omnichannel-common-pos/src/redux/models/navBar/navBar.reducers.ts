"use strict";

import { ConsulValues } from "../consul/consul.types";
import { NavBarActionPayload, NavBarActions } from "./navBar.actions";
import { extractValues, getViewportSize } from "./navBar.utils";

export type NavBarState = {
	showLogin: boolean,
	showBasketMenu: boolean,
	showMobileNavigation: boolean,
	showCustomerCreationModal?: boolean,
	clientWidth: number,
	clientHeight: number,
	sticky: boolean,
	viewportSize: string,
	toolmode: boolean,
	toolmodeLanguage?: string, // Language retrieved from URL parameter set by CSRtb
	showStopImpersonatingPrompt: boolean,
	showBasket: boolean,
	brandLink: string
	isMobileViewActive: boolean;
	viewPortSize: string;
};

const initialState = {
	isMobileViewActive: false,
	showLogin: false,
	showBasketMenu: false,
	clientWidth: 920,
	clientHeight: 0,
	sticky: false,
	viewportSize: "desktop",
	toolmode: false,
	showStopImpersonatingPrompt: false,
	showBasket: false,
	showMobileNavigation: false
};

const toggleBasketMenu = (state: Partial<NavBarState>): Partial<NavBarState> => ({
	...state,
	showBasketMenu: !state.showBasketMenu,
	showLogin: false
});

const hideAll = (state: Partial<NavBarState>): Partial<NavBarState> => {
	const { showLogin, showBasketMenu } = state;
	if (showLogin || showBasketMenu) {
		return {
			...state,
			showBasketMenu: false,
			showLogin: false,
		};
	} else {
		return state;
	}
};

const navBarReducer = (state: Partial<NavBarState> = initialState, action: NavBarActionPayload) => {
	const { type } = action;
	switch (type) {
		case NavBarActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case NavBarActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues)};
		case NavBarActions.TOGGLE_BASKET_MENU:
			return toggleBasketMenu(state);
		case NavBarActions.HANDLE_WINDOW_RESIZE:
			return {
				...state,
				clientWidth: action.clientWidth,
				clientHeight: action.clientHeight,
				viewportSize: getViewportSize(action.clientWidth!),
			};
		case NavBarActions.SET_MOBILE_VIEW_ACTIVE: {
			if (state.isMobileViewActive !== action.isMobileViewActive) {
				return {...state, isMobileViewActive: action.isMobileViewActive};
			}
			return state;
		}
		case NavBarActions.TOGGLE_LOGIN:
			return {
				...state,
				showLogin: !state.showLogin,
				showBasketMenu: !state.showLogin && false
			};
		case NavBarActions.HIDE_ALL:
			return hideAll(state);
		case NavBarActions.TOGGLE_MOBILE_NAVIGATION:
			return {
				...state,
				showMobileNavigation: !state.showMobileNavigation,
			};
		case NavBarActions.CLOSE_MOBILE_NAVIGATION:
			return {
				...state,
				showMobileNavigation: false,
			};
		case NavBarActions.SHOW_CUSTOMER_CREATION_MODAL:
			return {
				...state,
				showCustomerCreationModal: action.showCustomerCreationModal
			};
		case NavBarActions.TOGGLE_TOOLMODE:
			return {
				...state,
				toolmode: action.toolModeEnabled,
			};
		case NavBarActions.TOGGLE_TOOLMODE_LANGUAGE:
			return {
				...state,
				toolmodeLanguage: action.toolmodeLanguage
			};
		case NavBarActions.TOGGLE_STOP_IMPERSONATING_PROMPT:
			return {
				...state,
				showStopImpersonatingPrompt: action.showStopImpersonationPrompt,
			};
		default:
			return state;
	}
};

export default navBarReducer;
