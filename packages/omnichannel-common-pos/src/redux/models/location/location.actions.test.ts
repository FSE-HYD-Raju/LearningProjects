"use strict";

import { invoke } from "lodash";
import { location, LocationActions } from "./location.actions";

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

describe("location.actions", () => {
	const specs: Array<{
		action: keyof any;
		type: LocationActions;
		data: any;
		expectedData: any;
	}> = [
		{
			action: "toggleLocationList",
			type: LocationActions.TOGGLE_LOCATION_LIST,
			data: {},
			expectedData: {}
		},
		{
			action: "toggleLocationListComplete",
			type: LocationActions.TOGGLE_LOCATION_LIST_COMPLETE,
			data: { locations },
			expectedData: {
				locations: {
					locations
				}
			}
		},
		{
			action: "setLocation",
			type: LocationActions.SET_LOCATION,
			data: {},
			expectedData: {
				location: {}
			}
		},
		{
			action: "setLocationComplete",
			type: LocationActions.SET_LOCATION_COMPLETE,
			data: { location: locations[0] },
			expectedData: {
				location: {
					location: locations[0]
				}
			}
		},
		{
			action: "resetLocations",
			type: LocationActions.RESET_LOCATIONS,
			data: {},
			expectedData: {}
		}
	];

	specs.forEach(({ action, type, data, expectedData }: any) => {
		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(location, action, data);
			expect(result).toEqual({ type, ...expectedData });
		});
	});

	describe("fetches default location", () => {
		it("for an anonymous user", () => {
			const address = {
				postalCode: "12345",
				city: "Kiev"
			};
			const isUserLoggedIn = false;

			const result = location.getDefaultLocation(address, isUserLoggedIn);
			expect(result.type).toEqual(LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS);
			expect(result.address).toEqual(address);
			expect(result.isUserLoggedIn).toEqual(isUserLoggedIn);
		});

		it("for a logged-in user", () => {
			const address = {
				postalCode: "00100",
				city: "Helsinki"
			};
			const isUserLoggedIn = true;

			const result = location.getDefaultLocation(address, isUserLoggedIn);
			expect(result.type).toEqual(LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER);
			expect(result.address).toEqual(address);
			expect(result.isUserLoggedIn).toEqual(isUserLoggedIn);
		});
	});
});
