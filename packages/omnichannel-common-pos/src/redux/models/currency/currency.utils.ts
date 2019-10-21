"use strict";

import { get } from "lodash";
import { getParsedValue } from "../../utils";
import { ConsulValues } from "../consul/consul.types";
import { CurrencyState } from "./currency.types";

export function extractValues(data: ConsulValues): Partial<CurrencyState> {
	const currencies = getParsedValue(get(data, "currencies/all"), []) || [];
	const defaultCurrency = getParsedValue(get(data, "currencies/default"), "");

	const values = {
		currencies,
		defaultCurrency
	};

	if (defaultCurrency) {
		Object.assign(values, {
			selectedCurrency: defaultCurrency
		});
	}
	return values as Partial<CurrencyState>;
}
