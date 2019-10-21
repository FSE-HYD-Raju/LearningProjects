"use strict";

import { ContactMediaTypeEnum, Links, PostalAddress } from "../../types";

export const LOCATIONS_ROOT_LEVEL_QUERY = "filter[level]=0";
export const CACHE_KEY_ROOT = "root";

export type LocationItem = {
	id: string;
	label: string;
	type: string; // "area"
	children: Array<LocationItem>;
	level: number;
	idParent: string;
};

export type LocationRelationship = Record<string, { links: Links; }>;

export type LocationRelationships = LocationRelationship & {
	children: {
		links: Links;
	};
	parent: {
		links: Links;
	};
};

export type LocationInfo = {
	id: string;
	attributes: LocationItem;
	type: string; // "geolocations"
	links?: Record<string, string>;
	relationships: LocationRelationships;
};

export type LocationsCache = {
	[key: string]: Array<LocationInfo>;
};

export type AddressValidationResponse = {
	valid: boolean;
	proposals: Array<object>;
	error: boolean;
};

export type AddressValidation = {
	status: string;
	address: PostalAddress | null;
};
export type City = {
	id: string;
	name: string;
};

export type County = {
	cluster_name: string;
};

export type Street = {
	block: string;
	street_name: string;
};

export type Address = {
	id: string;
	house_number: string;
	rt: string;
	rw: string;
};

export type LocationState = {
	postalAddressRoleForDefaultLocationSearch: ContactMediaTypeEnum;
	postalAddressPartsToUseInQuery: string[] /* keys of interface PostalAddress */;
	defaultLocationSearchIncludeString: string;
	locations: Array<LocationInfo>;
	locationListVisible: boolean;
	selectedLocation?: LocationInfo;
	defaultLocation: LocationInfo;
	defaultLocationAddress: PostalAddress;
	fetchingLocations?: Boolean;
	fetchingDefaultLocation?: Boolean;
	addressProposals: { valid: boolean };
	maxLevel?: number;
	locationSelectionEnabled?: boolean;
	shouldCallDefaultLocation?: boolean;
	locationsCache?: LocationsCache;
	locationConfirmed: boolean;
	addressValidation: AddressValidation;
	cities: Array<City>;
	cityId: string;
	county: string;
	counties: Array<County>;
	streets: Array<Street>;
	addresses: Array<Address>;
	streetBlock: string;
};
