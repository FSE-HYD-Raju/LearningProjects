"use strict";

import { invoke } from "lodash";
import { currency, CurrencyActions } from "./currency.actions";

type Currency = typeof currency;

describe("Test currency.actions: ", () => {

	it("should be an object", () => {
		expect(typeof currency).toEqual("object");
	});

	const specs: Array<{
		action: keyof Currency;
		type: CurrencyActions;
		data: any;
		expectedData: any
	}> = [{
		action: "fluxSync",
		type: CurrencyActions.FLUX_SYNC,
		data: {value: 1},
		expectedData: {fluxState: {value: 1}}
	}, {
		action: "changeCurrency",
		type: CurrencyActions.CHANGE_CURRENCY,
		data: "UAH",
		expectedData: {selectedCurrency: "UAH"}
	}];

	specs.forEach(({action, type, data, expectedData}: any) => {

		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(currency, action, data);
			expect(result).toEqual({type, ...expectedData});
		});

	});

});
