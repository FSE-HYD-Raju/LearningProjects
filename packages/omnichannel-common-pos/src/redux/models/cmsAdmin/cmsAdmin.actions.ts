"use strict";

import { Action } from "redux";

export enum CmsAdminActions {
	FLUX_SYNC = "CMSAdmin_FLUX_SYNC",
	SAVE_STYLES = "CMSAdmin_SAVE_STYLES",
}

export interface CmsAdminActionPayload extends Action<CmsAdminActions> {
	fluxState?: any;
	error?: string;
	styles?: any;
	successMessage?: string;
	errorMessage?: string;
}

export const cmsAdmin = {
	fluxSync: (fluxState: any) => ({type: CmsAdminActions.FLUX_SYNC, fluxState}),
	saveStyles: (styles: any, successMessage: string, errorMessage: string) => ({
		type: CmsAdminActions.SAVE_STYLES,
		styles,
		successMessage,
		errorMessage,
	}),
};
