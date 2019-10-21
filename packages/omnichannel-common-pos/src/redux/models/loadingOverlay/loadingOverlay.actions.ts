"use strict";

import { Action } from "redux";

export enum LoadingOverlayActions {
	FLUX_SYNC = "LoadingOverlay_FLUX_SYNC",
	SHOW_LOADING_OVERLAY = "LoadingOverlay_SHOW_LOADING_OVERLAY",
	HIDE_LOADING_OVERLAY = "LoadingOverlay_HIDE_LOADING_OVERLAY",
	RESET_LOADING_OVERLAY = "LoadingOverlay_RESET_LOADING_OVERLAY"
}

export interface LoadingOverlayActionPayload extends Action<LoadingOverlayActions> {
	fluxState?: any;
	error?: string;
	requestKey?: string;
}

export const loadingOverlay = {
	fluxSync: (fluxState: any) => ({ type: LoadingOverlayActions.FLUX_SYNC, fluxState }),
	showLoadingOverlay: (requestKey: string) => ({ type: LoadingOverlayActions.SHOW_LOADING_OVERLAY, requestKey }),
	hideLoadingOverlay: (requestKey: string) => ({ type: LoadingOverlayActions.HIDE_LOADING_OVERLAY, requestKey }),
	resetLoadingOverlay: () => ({ type: LoadingOverlayActions.RESET_LOADING_OVERLAY })
};
