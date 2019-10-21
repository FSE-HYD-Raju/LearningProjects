"use strict";

import {default as reducer, initialState as defaultState, CurrencyState } from "./currency.reducers";
import { CurrencyActions, CurrencyActionPayload } from "./currency.actions";

describe("Test currency.reducers: ", () => {

	let initialState: Partial<CurrencyState>;
	let state;
	beforeEach(() => {
		initialState = {...defaultState};
	});

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: CurrencyActionPayload|any;
		newState: Partial<CurrencyState>|any;
	}> = [{
		description: "do nothing for unexpected action type",
		action: {type: "SOME_ACTION", value: 1},
		newState: {...defaultState}
	}, {
		description: "should enrich state by new data",
		action: {type: CurrencyActions.FLUX_SYNC, fluxState: {PROP1: "PROP1", PROP2: "PROP1"}},
		newState: {...defaultState, PROP1: "PROP1", PROP2: "PROP1"}
	}, {
		description: "should update selectedCurrency",
		action: {type: CurrencyActions.CHANGE_CURRENCY, selectedCurrency: "UAH"},
		newState: {...defaultState, selectedCurrency: "UAH"}
	}, {
		description: "should not update selectedCurrency if undefined in action",
		action: {type: CurrencyActions.CHANGE_CURRENCY, wrongProp: 1},
		newState: {...defaultState, selectedCurrency: defaultState.selectedCurrency}
	}];

	specs.forEach(({action, newState, description}) => {

		it(`${action.type} ${description}`, () => {
			state = reducer(initialState, action);
			expect(state).toEqual(newState);
		});

	});

});
