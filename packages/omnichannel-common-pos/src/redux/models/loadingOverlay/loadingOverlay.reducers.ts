"use strict";

import { LoadingOverlayActions, LoadingOverlayActionPayload } from "./loadingOverlay.actions";

export type LoadingOverlayState = {
	ongoingRequests: string[];
};

const initialState = {
	ongoingRequests: []
};

const loadingOverlayReducer = (
	state: Partial<LoadingOverlayState> = initialState,
	action: LoadingOverlayActionPayload
) => {
	const { type } = action;
	switch (type) {
		case LoadingOverlayActions.SHOW_LOADING_OVERLAY:
			return { ...state, ongoingRequests: [...state.ongoingRequests!, action.requestKey!] };
		case LoadingOverlayActions.HIDE_LOADING_OVERLAY:
			return { ...state, ongoingRequests: state.ongoingRequests!.filter(key => key !== action.requestKey) };
		case LoadingOverlayActions.RESET_LOADING_OVERLAY:
			return { ...state, ongoingRequests: [] };

		case LoadingOverlayActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		default:
			return state;
	}
};

export default loadingOverlayReducer;
