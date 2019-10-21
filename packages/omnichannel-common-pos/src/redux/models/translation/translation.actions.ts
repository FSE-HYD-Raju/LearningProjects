"use strict";

import { Action } from "redux";

export enum TranslationActions {
    FLUX_SYNC = "Translation_FLUX_SYNC"
}

export interface TranslationActionPayload extends Action<TranslationActions> {
    fluxState?: any;
    error?: string;
}

export const translation = {
    fluxSync: (fluxState: any) => ({type: TranslationActions.FLUX_SYNC, fluxState})
};
