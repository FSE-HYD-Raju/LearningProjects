"use strict";

import { Action } from "redux";
import { ReactNode } from "react";

export enum ToasterActions {
	FLUX_SYNC = "Toaster_FLUX_SYNC",
	SHOW_SUCCESS = "Toaster_SHOW_SUCCESS",
	SHOW_ERROR = "Toaster_SHOW_ERROR",
	SHOW_INFO = "Toaster_SHOW_INFO",
	SHOW_WARNING = "Toaster_SHOW_WARNING",
	CLEAR_MESSAGES = "Toaster_CLEAR_MESSAGES",
}

export interface ToasterActionPayload extends Action<ToasterActions> {
	fluxState?: any;
	success?: ReactNode;
	error?: ReactNode;
	info?: ReactNode;
	warning?: ReactNode;
}

export const toaster = {
	fluxSync: (fluxState: any) => ({type: ToasterActions.FLUX_SYNC, fluxState}),
	showSuccess: (msg: ReactNode) => ({type: ToasterActions.SHOW_SUCCESS, success: msg}),
	showError: (msg: ReactNode) => ({type: ToasterActions.SHOW_ERROR, error: msg}),
	showInfo: (msg: ReactNode) => ({type: ToasterActions.SHOW_INFO, info: msg}),
	showWarning: (msg: ReactNode) => ({type: ToasterActions.SHOW_WARNING, warning: msg}),
	clearMessages: () => ({type: ToasterActions.CLEAR_MESSAGES}),
};
