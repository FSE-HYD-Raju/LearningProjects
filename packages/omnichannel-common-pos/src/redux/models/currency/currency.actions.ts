"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum CurrencyActions {
    FLUX_SYNC = "Currency_FLUX_SYNC",
	SET_VALUES = "Currency_SET_VALUES",
	CHANGE_CURRENCY = "Currency_CHANGE_CURRENCY",
	IS_UPDATING = "Currency_IS_UPDATING",
	SELECT_CURRENCY = "Currency_SELECT_CURRENCY",
}

export interface CurrencyActionPayload extends Action<CurrencyActions> {
    fluxState?: any;
    values?: ConsulValues;
	selectedCurrency?: string;
    error?: string;
    currency?: { value: string};
}

export const currency = {
    fluxSync: (fluxState: any) => ({type: CurrencyActions.FLUX_SYNC, fluxState}),
	setValues: (values: any) => ({type: CurrencyActions.SET_VALUES, values}),
	changeCurrency: (selectedCurrency: string) => ({type: CurrencyActions.CHANGE_CURRENCY, selectedCurrency}),
	selectCurrency: (currency: {value: string}) => ({type: CurrencyActions.SELECT_CURRENCY, currency}),
};
