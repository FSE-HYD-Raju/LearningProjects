"use strict";

import { Action } from "redux";
import { LocationInfo, City, County, Street, Address, AddressValidationResponse } from "./location.types";
import { ConsulValues } from "../consul/consul.types";
import { PostalAddress, User } from "../../types";

export enum LocationActions {
	FLUX_SYNC = "Location_FLUX_SYNC",

	SET_VALUES = "Location_SET_VALUES",

	SET_DEFAULTS = "Location_SET_DEFAULTS",

	GET_LOCATIONS = "Location_GET_LOCATIONS",
	GET_LOCATIONS_COMPLETE = "Location_GET_LOCATIONS_COMPLETE",
	GET_LOCATIONS_FAILED = "Location_GET_LOCATIONS_FAILED",

	GET_DEFAULT_LOCATION = "Location_GET_DEFAULT_LOCATION",
	GET_DEFAULT_LOCATION_FOR_CUSTOMER = "Location_GET_DEFAULT_LOCATION_FOR_CUSTOMER",
	GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE = "Location_GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE",
	GET_DEFAULT_LOCATION_FOR_CUSTOMER_FAILED = "Location_GET_DEFAULT_LOCATION_FOR_CUSTOMER_FAILED",
	GET_DEFAULT_LOCATION_FOR_ANONYMOUS = "Location_GET_DEFAULT_LOCATION_FOR_ANONYMOUS",
	GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE = "Location_GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE",
	GET_DEFAULT_LOCATION_FOR_ANONYMOUS_FAILED = "Location_GET_DEFAULT_LOCATION_FOR_ANONYMOUS_FAILED",

	GET_CITIES = "Location_GET_CITIES",
	GET_CITIES_COMPLETE = "Location_GET_CITIES_COMPLETE",
	GET_COUNTIES = "Location_GET_COUNTIES",
	GET_COUNTIES_COMPLETE = "Location_GET_COUNTIES_COMPLETE",
	GET_STREETS = "Location_GET_STREETS",
	GET_STREETS_COMPLETE = "Location_GET_STREETS_COMPLETE",
	GET_ADDRESSES = "Location_GET_ADDRESSES",
	GET_ADDRESSES_COMPLETE = "Location_GET_ADDRESSES_COMPLETE",

	VALIDATE_STREET_ADDRESS = "Location_VALIDATE_STREET_ADDRESS",
	VALIDATE_STREET_ADDRESS_COMPLETE = "Location_VALIDATE_STREET_ADDRESS_COMPLETE",
	VALIDATE_STREET_ADDRESS_FAILED = "Location_VALIDATE_STREET_ADDRESS_FAILED",

	VALIDATE_ADDRESS = "Location_VALIDATE_ADDRESS",
	VALIDATE_ADDRESS_COMPLETE = "Location_VALIDATE_ADDRESS_COMPLETE",
	VALIDATE_ADDRESS_FAILED = "Location_VALIDATE_ADDRESS_FAILED",

	SET_LOCATION = "Location_SET_LOCATION",
	SET_LOCATION_COMPLETE = "Location_SET_LOCATION_COMPLETE",
	SET_LOCATION_VISIBLE = "Location_SET_LOCATION_VISIBLE",
	TOGGLE_LOCATION_LIST = "Location_TOGGLE_LOCATION_LIST",
	TOGGLE_LOCATION_LIST_COMPLETE = "Location_TOGGLE_LOCATION_LIST_COMPLETE",
	TOGGLE_LOCATION_LIST_FAILED = "Location_TOGGLE_LOCATION_LIST_FAILED",
	CLEAR_LOCATION = "Location_CLEAR_LOCATION",

	ADD_TO_LOCATIONS_CACHE = "Location_ADD_TO_LOCATIONS_CACHE",

	RESET_LOCATIONS = "Location_RESET_LOCATIONS"
}

export interface LocationActionPayload extends Action<LocationActions> {
	fluxState?: any;
	values?: ConsulValues;
	visible?: boolean;
	locations?: Array<LocationInfo>;
	location?: LocationInfo;
	streetName?: string;
	address?: PostalAddress;
	user?: User;
	isUserLoggedIn?: boolean;
	additionalCategory?: string;
	addressProposals?: any;
	addressValidationResponse?: AddressValidationResponse;
	error?: string;
	additionalParameters?: string;
	locationsCacheKey?: string;
	locationsCacheLocations?: Array<LocationInfo>;
	cities?: Array<City>;
	streets?: Array<Street>;
	addresses?: Array<Address>;
	counties?: Array<County>;
	cityId?: string;
	county?: string;
	streetBlock?: string;
}

export const location = {
	fluxSync: (fluxState: any) => ({
		type: LocationActions.FLUX_SYNC,
		fluxState
	}),

	setValues: (values: ConsulValues) => ({ type: LocationActions.SET_VALUES, values }),

	setDefault: () => ({ type: LocationActions.SET_DEFAULTS }),

	getLocations: (address?: PostalAddress, additionalParameters?: string) => ({
		type: LocationActions.GET_LOCATIONS,
		address,
		additionalParameters
	}),
	getLocationsComplete: (locations: Array<LocationInfo>) => ({
		type: LocationActions.GET_LOCATIONS_COMPLETE,
		locations
	}),
	getLocationsFailed: (error: any) => ({
		type: LocationActions.GET_LOCATIONS_FAILED,
		error
	}),

	getDefaultLocation: (address: PostalAddress, isUserLoggedIn: boolean) => {
		if (isUserLoggedIn) {
			return { type: LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER, address, isUserLoggedIn };
		} else {
			return { type: LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS, address, isUserLoggedIn };
		}
	},
	getDefaultLocationForCustomerComplete: (locations: Array<LocationInfo>) => ({
		type: LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER_COMPLETE,
		locations
	}),
	getDefaultLocationForCustomerFailed: (error: any) => ({
		type: LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER_FAILED,
		error
	}),

	getDefaultLocationForAnonymous: (address?: PostalAddress) => ({
		type: LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS,
		address
	}),
	getDefaultLocationForAnonymousComplete: (locations: Array<LocationInfo>) => ({
		type: LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS_COMPLETE,
		locations
	}),
	getDefaultLocationForAnonymousFailed: (error: any) => ({
		type: LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS_FAILED,
		error
	}),

	validateStreetAddress: (streetName: string, additionalCategory?: string) => ({
		type: LocationActions.VALIDATE_STREET_ADDRESS,
		streetName,
		additionalCategory
	}),
	validateStreetAddressComplete: (addressProposals: any) => ({
		type: LocationActions.VALIDATE_STREET_ADDRESS_COMPLETE,
		addressProposals
	}),
	validateStreetAddressFailed: (error: any) => ({
		type: LocationActions.VALIDATE_STREET_ADDRESS_FAILED,
		error
	}),

	validateAddress: (address: PostalAddress) => ({
		type: LocationActions.VALIDATE_ADDRESS,
		address
	}),
	validateAddressComplete: (addressValidationResponse: AddressValidationResponse) => ({
		type: LocationActions.VALIDATE_ADDRESS_COMPLETE,
		addressValidationResponse
	}),
	validateAddressFailed: (error: any) => ({
		type: LocationActions.VALIDATE_ADDRESS_FAILED,
		error
	}),
	setLocation: (location: LocationInfo) => ({
		type: LocationActions.SET_LOCATION,
		location
	}),
	setLocationComplete: (location: LocationInfo) => ({
		type: LocationActions.SET_LOCATION_COMPLETE,
		location
	}),
	setLocationListVisible: (visible: boolean) => ({
		type: LocationActions.SET_LOCATION_VISIBLE,
		visible
	}),
	toggleLocationList: () => ({ type: LocationActions.TOGGLE_LOCATION_LIST }),
	toggleLocationListComplete: (locations: Array<LocationInfo>) => ({
		type: LocationActions.TOGGLE_LOCATION_LIST_COMPLETE,
		locations
	}),
	toggleLocationListFailed: (error: any) => ({ type: LocationActions.TOGGLE_LOCATION_LIST_FAILED, error }),
	clearLocation: () => ({ type: LocationActions.CLEAR_LOCATION }),
	addToLocationsCache: (locationsCacheKey: string, locationsCacheLocations: Array<LocationInfo>) => ({
		type: LocationActions.ADD_TO_LOCATIONS_CACHE,
		locationsCacheKey,
		locationsCacheLocations
	}),
	resetLocations: () => ({
		type: LocationActions.RESET_LOCATIONS
	}),
	getCities: () => ({
		type: LocationActions.GET_CITIES
	}),
	getCitiesComplete: (cities: City) => ({
		type: LocationActions.GET_CITIES_COMPLETE,
		cities
	}),
	getCounties: (cityId: string) => ({
			type: LocationActions.GET_COUNTIES,
			cityId
	}),
	getCountiesComplete: (counties: County, cityId: string) => ({
			type: LocationActions.GET_COUNTIES_COMPLETE,
			counties,
			cityId
	}),
	getStreets: (cityId: string, county: string) => ({
			type: LocationActions.GET_STREETS,
			cityId,
			county
	}),
	getStreetsComplete: (streets: Street, county: string) => ({
			type: LocationActions.GET_STREETS_COMPLETE,
			streets,
			county
	}),
	getAddresses: (cityId: string, county: string, streetName: string, streetBlock: string) => ({
			type: LocationActions.GET_ADDRESSES,
			cityId,
			county,
			streetName,
			streetBlock
	}),
	getAddressesComplete: (addresses: Address, streetBlock: string) => ({
			type: LocationActions.GET_ADDRESSES_COMPLETE,
			addresses,
			streetBlock
	}),
};
