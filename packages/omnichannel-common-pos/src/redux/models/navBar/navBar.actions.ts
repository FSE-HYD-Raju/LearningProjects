"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum NavBarActions {
	FLUX_SYNC = "NavBar_FLUX_SYNC",
	SET_VALUES = "NavBar_SET_VALUES",
	TOGGLE_BASKET_MENU = "NavBar_TOGGLE_BASKET_MENU",
	HANDLE_WINDOW_RESIZE = "NavBar_HANDLE_WINDOW_RESIZE",
	SET_MOBILE_VIEW_ACTIVE = "NavBar_SET_MOBILE_VIEW_ACTIVE",
	TOGGLE_LOGIN = "NavBar_TOGGLE_LOGIN",
	HIDE_ALL = "NavBar_SET_HIDE_ALL",
	TOGGLE_MOBILE_NAVIGATION = "NavBar_TOGGLE_MOBILE_NAVIGATION",
	CLOSE_MOBILE_NAVIGATION = "NavBar_CLOSE_MOBILE_NAVIGATION",
	SHOW_CUSTOMER_CREATION_MODAL = "NavBar_SHOW_CUSTOMER_CREATION_MODAL",
	TOGGLE_TOOLMODE = "NavBar_TOGGLE_TOOLMODE",
	TOGGLE_TOOLMODE_LANGUAGE = "NavBar_TOGGLE_TOOLMODE_LANGUAGE",
	TOGGLE_STOP_IMPERSONATING_PROMPT = "NavBar_TOGGLE_STOP_IMPERSONATING_PROMPT",
}

export interface NavBarActionPayload extends Action<NavBarActions> {
	fluxState?: any;
	values?: ConsulValues;
	error?: string;
	clientWidth?: number;
	clientHeight?: number;
	isMobileViewActive?: boolean;
	toolmodeLanguage?: string;
	showStopImpersonationPrompt?: boolean;
	toolModeEnabled?: boolean;
	showCustomerCreationModal?: boolean;
}

export const navBar = {
	fluxSync: (fluxState: any) => ({type: NavBarActions.FLUX_SYNC, fluxState}),

	setValues: (values: ConsulValues) => ({type: NavBarActions.SET_VALUES, values}),
	toggleBasketMenu: () => ({type: NavBarActions.TOGGLE_BASKET_MENU}),
	handleWindowResize: (clientWidth: number, clientHeight: number) => ({
		type: NavBarActions.HANDLE_WINDOW_RESIZE, clientWidth, clientHeight
	}),

	setMobileViewActive: (isMobileViewActive: boolean) => ({
		type: NavBarActions.SET_MOBILE_VIEW_ACTIVE,
		isMobileViewActive
	}),

	toggleLogin: () => ({ type: NavBarActions.TOGGLE_LOGIN}),
	hideAll: () => ({ type: NavBarActions.HIDE_ALL}),
	toggleMobileNavigation: () => ({ type: NavBarActions.TOGGLE_MOBILE_NAVIGATION}),
	closeMobileNavigation: () => ({ type: NavBarActions.CLOSE_MOBILE_NAVIGATION}),
	showCustomerCreationModal: (showCustomerCreationModal: boolean) => ({ type: NavBarActions.SHOW_CUSTOMER_CREATION_MODAL, showCustomerCreationModal}),

	toggleToolmode: (toolModeEnabled: boolean) => ({ type: NavBarActions.TOGGLE_TOOLMODE, toolModeEnabled}),
	toggleToolmodeLanguage: (toolmodeLanguage: string) => ({ type: NavBarActions.TOGGLE_TOOLMODE_LANGUAGE, toolmodeLanguage}),
	toggleStopImpersonatingPrompt: (showStopImpersonationPrompt: boolean) => ({ type: NavBarActions.TOGGLE_STOP_IMPERSONATING_PROMPT, showStopImpersonationPrompt}),
};
