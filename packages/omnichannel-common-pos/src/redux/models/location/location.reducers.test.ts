"use strict";

import { omit } from "lodash";
import { default as reducer, initialState } from "./location.reducers";
import { LocationActions, LocationActionPayload } from "./location.actions";

const locations = [
	{
		id: "1",
		type: "geolocations",
		attributes: {
			city: "null",
			externalId: "external_id_1",
			label: "Western Finland",
			level: 0,
			postalCode: "null"
		}
	}
];

describe("location.reducers: ", () => {
	const defaultState = initialState();
	const getInitialState = (state = {}) => ({ ...defaultState, ...state });
	let state;
	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: LocationActionPayload | any;
		newState: Partial<LocationActionPayload> | any;
	}> = [
		{
			description: "do nothing for unexpected action type",
			action: { type: "SOME_ACTION", value: 1 },
			newState: { ...defaultState }
		}
	];
	specs.forEach(({ action, newState, description }) => {
		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});
	});
	describe(LocationActions.RESET_LOCATIONS, () => {
		const action = () => ({
			type: LocationActions.RESET_LOCATIONS
		});
		const setState = (
			state = {
				selectedLocation: locations[0],
				locationsCache: { [1]: locations[0] }
			}
		) => omit(getInitialState({ ...state }));
		it("should reset state, excluding locations", () => {
			state = reducer(setState(), action());
			expect(state).toEqual({
				...omit(initialState(), "locationsCache")
			});
		});
	});
});
