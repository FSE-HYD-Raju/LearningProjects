"use strict";
import { ReactNode } from "react";
import { ToasterActions, ToasterActionPayload } from "./toaster.actions";

export type ToasterState = {
	success?: ReactNode;
	error?: ReactNode;
	info?: ReactNode;
	warning?: ReactNode;
};

const initialState = {

};

const toasterReducer = (state: Partial<ToasterState> = initialState, action: ToasterActionPayload) => {
	const { type } = action;
	switch (type) {
		case ToasterActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case ToasterActions.SHOW_SUCCESS:
			return {...state, success: action.success};
		case ToasterActions.SHOW_ERROR:
			return {...state, error: action.error};
		case ToasterActions.SHOW_INFO:
			return {...state, info: action.info};
		case ToasterActions.SHOW_WARNING:
			return {...state, warning: action.warning};
		case ToasterActions.CLEAR_MESSAGES:
			return {
				...state,
				success: undefined,
				error: undefined,
				info: undefined,
				warning: undefined
			};
		default:
			return state;
	}
};

export default toasterReducer;
