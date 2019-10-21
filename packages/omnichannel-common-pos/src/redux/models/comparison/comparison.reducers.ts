"use strict";

import { ComparisonActions, ComparisonActionPayload } from "./comparison.actions";
import { ConsulValues } from "../../models/consul/consul.types";
import { ComparisonState } from "./comparison.types";
import { extractValues, getNewItems } from "./comparison.utils";

export { ComparisonState } from "./comparison.types";

const initialState: ComparisonState = {
	items: [],
	open: false,
	comparisonCharacteristics: null,
	showConfigurationModalForProduct: "",
};

const comparisonReducer = (state: Partial<ComparisonState> = initialState, action: ComparisonActionPayload) => {
	const { type } = action;
	switch (type) {
		case ComparisonActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case ComparisonActions.SET_VALUES:
			return { ...state, ...extractValues(action.values as ConsulValues) };
		case ComparisonActions.TOGGLE_ITEM:
			return { ...state, items: getNewItems(state.items, action.item) };
		case ComparisonActions.HIDE:
			return { ...state, open: false };
		case ComparisonActions.SHOW:
			return { ...state, open: true };
		case ComparisonActions.CLEAR:
			return { ...state, open: false, items: [] };
		case ComparisonActions.SHOW_CONFIGURATION_MODAL_FOR_PRODUCT:
			return { ...state, showConfigurationModalForProduct: action.id };
		default:
			return state;
	}
};

export default comparisonReducer;
