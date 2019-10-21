"use strict";

import { head, isEmpty, omit } from "lodash";
import { ConsulValues } from "../consul/consul.types";
import { LocationActions, LocationActionPayload } from "./location.actions";
import { LocationState, LocationInfo, AddressValidationResponse } from "./location.types";

import { extractValues } from "./location.utils";
import { PostalAddress } from "../../types";

export { LocationState } from "./location.types";

const initialState = (): Partial<LocationState> => ({
	locations: [],
	defaultLocation: {} as LocationInfo,
	fetchingLocations: false,
	fetchingDefaultLocation: false,
	addressProposals: { valid: true },
	locationsCache: {},
	selectedLocation: undefined,
	addressValidation: {
		status: "NOT_VALIDATED",
		address: null,
	},
	cities: [],
	addresses: [],
	streets: [],
	counties: []
});

const locationReducer = (state: Partial<LocationState> = initialState(), action: LocationActionPayload) => {
	const { type } = action;

	let defaultLocation;

	switch (type) {
		case LocationActions.FLUX_SYNC:
			return {
				...state,
				...action.fluxState
			};
		case LocationActions.SET_VALUES:
			return {
				...state,
				...extractValues(action.values as ConsulValues)
			};
		case LocationActions.SET_DEFAULTS:
			return {
				...state,
				selectedLocation: isEmpty(state.defaultLocation) ? undefined : state.defaultLocation,
				locationConfirmed: false
			};
		case LocationActions.SET_LOCATION_VISIBLE:
			return {
				...state,
				locationListVisible: action.visible
			};
		case LocationActions.GET_LOCATIONS:
			return {
				...state,
				fetchingLocations: true
			};
		case LocationActions.GET_LOCATIONS_COMPLETE:
			const selectedLocation = isEmpty(state.selectedLocation) ? undefined : state.selectedLocation;
			return {
				...state,
				fetchingLocations: false,
				locations: action.locations,
				defaultLocation,
				selectedLocation
			};
		case LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER:
		case LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS:
			return {
				...state,
				fetchingDefaultLocation: true
			};
		case LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE:
			defaultLocation = head(action.locations as Array<LocationInfo>) || null;
			return {
				...state,
				fetchingDefaultLocation: false,
				selectedLocation: defaultLocation
			};
		case LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE:
			defaultLocation = head(action.locations as Array<LocationInfo>) || null;
			return {
				...state,
				fetchingDefaultLocation: false,
				selectedLocation: defaultLocation
			};
		case LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER_FAILED:
		case LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS_FAILED:
			return {
				...state,
				fetchingDefaultLocation: false
			};
		case LocationActions.SET_LOCATION_COMPLETE:
			return {
				...state,
				selectedLocation: action.location,
				locationListVisible: false
			};
		case LocationActions.TOGGLE_LOCATION_LIST:
			return {
				...state,
				locationListVisible: !state.locationListVisible
			};
		case LocationActions.TOGGLE_LOCATION_LIST_COMPLETE:
			return {
				...state,
				locations: action.locations
			};
		case LocationActions.CLEAR_LOCATION:
			return {
				...state,
				selectedLocation: null,
				locationConfirmed: false
			};

		case LocationActions.VALIDATE_STREET_ADDRESS_COMPLETE:
			return {
				...state,
				addressProposals: action.addressProposals
			};
		case LocationActions.VALIDATE_STREET_ADDRESS_FAILED:
			return {
				...state,
				addressProposals: { valid: true }
			};
		case LocationActions.VALIDATE_ADDRESS_COMPLETE:
			const { proposals = [] } = action.addressValidationResponse as AddressValidationResponse;
			const addressFound = !!(proposals.length && proposals[0]);
			if (addressFound) {
				return {
					...state,
					addressValidation: {
						status: "ADDRESS_FOUND",
						address: { ...proposals[0] },
					}
				};
			} else {
				return {
					...state,
					addressValidation: {
						status: "ADDRESS_NOT_FOUND",
						address: null,
					}
				};
			}
		case LocationActions.VALIDATE_ADDRESS_FAILED:
			return {
				...state,
				addressValidation: {
					status: "VALIDATION_FAIL",
					address: null,
				}
			};
		case LocationActions.ADD_TO_LOCATIONS_CACHE:
			const cache = action.locationsCacheKey
				? { [action.locationsCacheKey]: action.locationsCacheLocations }
				: {};
			return {
				...state,
				locationsCache: {
					...state.locationsCache,
					...cache
				}
			};
		case LocationActions.RESET_LOCATIONS: {
			const resetState = omit(initialState(), "locationsCache");
			return {
				...resetState
			};
		}
		case LocationActions.GET_CITIES_COMPLETE: {
			return {
				...state,
				cities: action.cities,
			};
		}
		case LocationActions.GET_COUNTIES_COMPLETE: {
			return {
				...state,
				counties: action.counties,
				cityId: action.cityId,
				addresses: [],
				streets: [],
			};
		}
		case LocationActions.GET_STREETS_COMPLETE: {
			return {
				...state,
				streets: action.streets,
				county: action.county,
				addresses: [],
			};
		}
		case LocationActions.GET_ADDRESSES_COMPLETE: {
			return {
				...state,
				addresses: action.addresses,
				streetBlock: action.streetBlock,
			};
		}
		default:
			return state;
	}
};

export { initialState };

export default locationReducer;
