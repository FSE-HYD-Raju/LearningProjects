"use strict";

import { get } from "lodash";
import { ConsulValues } from "../consul/consul.types";
import { LocationInfo, LocationState } from "./location.types";
import { ContactMediaTypeEnum } from "../../types";

import { getParsedValue, getPostalAddressRoleForDefaultLocationSearch } from "../../utils";

function extractValues(payload: ConsulValues): Partial<LocationState> {
	const postalAddressRoleForDefaultLocationSearch = getPostalAddressRoleForDefaultLocationSearch(
		get(payload, "features/default_location_fetch/role_of_postal_address_to_pick"),
		ContactMediaTypeEnum.PRIMARY
	);
	const defaultLocationAddress = getParsedValue(
		get(payload, "features/default_location_fetch/default_address")
	);
	const postalAddressPartsToUseInQuery = getParsedValue(
		get(payload, "features/default_location_fetch/postal_address_parts_for_query"),
		[]
	);
	const defaultLocationSearchIncludeString = getParsedValue(
		get(payload, "features/default_location_fetch/include_string")
	);
	const maxLevel = getParsedValue(get(payload, "features/default_location_fetch/max_level"));
	const locationSelectionEnabled = getParsedValue(
		get(payload, "features/default_location_fetch/location_selection_enabled", false)
	);
	const shouldCallDefaultLocation = getParsedValue(
		get(payload, "features/default_location_fetch/should_call_default_location", false)
	);
	return {
		defaultLocationAddress,
		postalAddressRoleForDefaultLocationSearch,
		postalAddressPartsToUseInQuery,
		defaultLocationSearchIncludeString,
		maxLevel,
		locationSelectionEnabled,
		shouldCallDefaultLocation
	} as Partial<LocationState>;
}

function selectedLocationFromStorage(): LocationInfo | undefined {
	const selectedLocation = localStorage.getItem("selectedLocation");
	return selectedLocation ? JSON.parse(selectedLocation) : undefined;
}

export { extractValues, selectedLocationFromStorage };
