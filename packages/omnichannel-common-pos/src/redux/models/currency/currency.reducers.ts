"use strict";

import { CurrencyActions, CurrencyActionPayload } from "./currency.actions";
import { CurrencyState } from "./currency.types";
import { ConsulValues } from "../consul/consul.types";
import { extractValues } from "./currency.utils";
import { Rest } from "../../services/Rest";

export { CurrencyState } from "./currency.types";

export const initialState: Partial<CurrencyState> = {
	currencies: [],
	defaultCurrency: "EUR",
	selectedCurrency: "EUR",
};

const currencyReducer = (state: Partial<CurrencyState> = initialState, action: CurrencyActionPayload) => {
	const { type } = action;
	switch (type) {
		case CurrencyActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case CurrencyActions.SET_VALUES:
			return { ...state, ...extractValues(action.values as ConsulValues) };
		case CurrencyActions.CHANGE_CURRENCY:
			if (action.selectedCurrency !== state.selectedCurrency) {
				Rest.clearCache();
			}
			const selectedCurrency = action.selectedCurrency || state.selectedCurrency;
			return {
				...state,
				selectedCurrency
			};
		default:
			return state;
	}
};

export default currencyReducer;
