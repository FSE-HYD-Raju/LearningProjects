"use strict";

export type CurrencyState = {
	defaultCurrency: string;
	selectedCurrency: string;
	currencies: Array<{code: string}>;
};
