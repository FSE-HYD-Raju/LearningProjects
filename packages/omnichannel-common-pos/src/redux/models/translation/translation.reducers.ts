"use strict";

import { TranslationActions, TranslationActionPayload } from "./translation.actions";

export type TranslationState = {
	locale: string;
};

const initialState = {

};

const translationReducer = (state: Partial<TranslationState> = initialState, action: TranslationActionPayload) => {
	const { type } = action;
	switch (type) {
		case TranslationActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		default:
			return state;
	}
};

export default translationReducer;
