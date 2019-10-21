import { isMatch } from "lodash";
const SagaTester = require("redux-saga-tester").default;

import actions, { LocationActions } from "../../actions";
import { LocationInfo, LocationItem, LocationRelationships, LocationsCache } from "./location.types";
import LocationService from "../../services/LocationService";
import { locationSaga } from "./location.saga";

const locations = [
	{
		id: "1",
		type: "geolocations",
		attributes: ({
			city: "null",
			externalId: "external_id_1",
			label: "Western Finland",
			level: 0,
			postalCode: "null"
		} as any) as LocationItem,
		relationships: ({
			parent: null /* NOTE this is not necessarily standard, just for these tests! */
		} as any) as LocationRelationships
	} as LocationInfo,
	{
		id: "2",
		type: "geolocations",
		attributes: ({
			city: "Kokkola",
			externalId: "external_id_2",
			label: "Kokkola",
			level: 1,
			postalCode: "30400"
		} as any) as LocationItem,
		relationships: ({
			parent: "1" /* NOTE this is not standard, just for these tests! */
		} as any) as LocationRelationships
	} as LocationInfo,
	{
		id: "3",
		type: "geolocations",
		attributes: ({
			city: "null",
			externalId: "external_id_3",
			label: "Central Ukraine",
			level: 0,
			postalCode: "null"
		} as any) as LocationItem,
		relationships: ({
			parent: null /* NOTE this is not necessarily standard, just for these tests! */
		} as any) as LocationRelationships
	} as LocationInfo,
	{
		id: "4",
		type: "geolocations",
		attributes: ({
			city: "Kiev",
			externalId: "external_id_4",
			label: "Kiev",
			level: 1,
			postalCode: "12345"
		} as any) as LocationItem,
		relationships: ({
			parent: "3" /* NOTE this is not standard, just for these tests! */
		} as any) as LocationRelationships
	} as LocationInfo
];

describe("location.saga", () => {
	describe("fetches default location", () => {
		let sagaTester: any = null;
		const originalGetLocations = LocationService.getLocations;

		beforeEach(() => {
			sagaTester = new SagaTester({});
			sagaTester.start(locationSaga);

			LocationService.getLocations = jest.fn().mockImplementation(address => {
				return locations.reduce((stack: LocationInfo[], elem: LocationInfo) => {
					if (isMatch(elem.attributes, address)) {
						const parent = locations.find(l => l.id === ((elem.relationships.parent as any) as string));

						if (parent) {
							return stack.concat(elem, (parent as any) as LocationInfo);
						} else {
							return stack.concat(elem);
						}
					} else {
						return stack;
					}
				}, []);
			});
		});

		afterEach(() => {
			LocationService.getLocations = originalGetLocations;
		});

		it("for an anonymous user", async () => {
			const address = {
				postalCode: "12345",
				city: "Kiev"
			};
			const isUserLoggedIn = false;

			sagaTester.dispatch(actions.location.getDefaultLocation(address, isUserLoggedIn));

			await sagaTester.waitFor(LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: [locations[3], locations[2]],
				type: "Location_GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
		});

		it("for a logged-in user", async () => {
			const address = {
				postalCode: "30400",
				city: "Kokkola"
			};
			const isUserLoggedIn = true;

			sagaTester.dispatch(actions.location.getDefaultLocation(address, isUserLoggedIn));

			await sagaTester.waitFor(LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: [locations[1], locations[0]],
				type: "Location_GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
		});
	});

	describe("toggle location list", () => {
		const sagaTester: any = null;

		const initTest = (toggleLocationVisible: boolean, locationsCache: LocationsCache = {}) => {
			let sagaTester: any = null;
			const initialState = {
				location: {
					locationListVisible: toggleLocationVisible,
					locationsCache
				} as any
			};
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(locationSaga);
			LocationService.getLocations = jest.fn().mockReturnValue(locations);
			return sagaTester;
		};

		it("fetches root level locations, when location list is not visible before clicking", async () => {
			const sagaTester = initTest(true);

			sagaTester.dispatch(actions.location.toggleLocationList());

			await sagaTester.waitFor(LocationActions.TOGGLE_LOCATION_LIST_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: locations,
				type: "Location_TOGGLE_LOCATION_LIST_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(1);
		});

		it("fetches root level locations from cache, when location list is not visible before clicking", async () => {
			const locationsCache = {
				root: locations
			};

			const sagaTester = initTest(true, locationsCache);

			sagaTester.dispatch(actions.location.toggleLocationList());

			await sagaTester.waitFor(LocationActions.TOGGLE_LOCATION_LIST_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: locations,
				type: "Location_TOGGLE_LOCATION_LIST_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(0);
		});

		it("only closes dropdown, when location list is visible before clicking", async () => {
			const sagaTester = initTest(false);

			sagaTester.dispatch(actions.location.toggleLocationList());

			await sagaTester.waitFor(LocationActions.TOGGLE_LOCATION_LIST);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				type: "Location_TOGGLE_LOCATION_LIST"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(0);
		});
	});

	describe("set default location", () => {
		const sagaTester: any = null;

		const initTest = (maxLevel: number, locationsCache: LocationsCache = {}) => {
			let sagaTester: any = null;
			const initialState = {
				location: {
					maxLevel,
					locationsCache
				} as any
			};
			sagaTester = new SagaTester({ initialState });
			sagaTester.start(locationSaga);
			LocationService.getLocations = jest.fn().mockReturnValue(locations);
			return sagaTester;
		};

		it("should not fetch children and select location, when max level is reached", async () => {
			const sagaTester = initTest(0);

			const location = locations[0] as LocationInfo;
			sagaTester.dispatch(actions.location.setLocation(location));

			await sagaTester.waitFor(LocationActions.SET_LOCATION_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				location: location,
				type: "Location_SET_LOCATION_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(0);
		});
		it("should fetch children and not select location, when max level is not reached", async () => {
			const sagaTester = initTest(0);

			const location = locations[1] as LocationInfo;
			sagaTester.dispatch(actions.location.setLocation(location));

			await sagaTester.waitFor(LocationActions.GET_LOCATIONS_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: locations,
				type: "Location_GET_LOCATIONS_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(1);
		});

		it("should fetch children from cache and not select location, when max level is not reached", async () => {
			const locationsCache = {
				2: locations
			};

			const sagaTester = initTest(0, locationsCache);

			const location = locations[1] as LocationInfo;
			sagaTester.dispatch(actions.location.setLocation(location));

			await sagaTester.waitFor(LocationActions.GET_LOCATIONS_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				locations: locations,
				type: "Location_GET_LOCATIONS_COMPLETE"
			};

			expect(calledAction).toEqual(expected);
			expect(LocationService.getLocations).toHaveBeenCalledTimes(0);
		});
	});
});
