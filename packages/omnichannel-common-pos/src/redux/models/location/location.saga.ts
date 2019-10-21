"use strict";

import { AppState } from "../../reducers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import LocationService from "../../services/LocationService";
import { location, LocationActions, LocationActionPayload } from "./location.actions";
import { sales } from "../sales/sales.actions";
import { LocationInfo, LocationsCache, CACHE_KEY_ROOT, LOCATIONS_ROOT_LEVEL_QUERY } from "./location.types";
import { get } from "lodash";
import { PostalAddress } from "../../types";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";

function* getLocations(action: LocationActionPayload): Iterable<any> {
	const { address, additionalParameters } = action;
	try {
		const cache: LocationsCache = yield select((state: AppState) => state.location.locationsCache);
		if (cache && !cache[CACHE_KEY_ROOT]) {
			const response = yield call(() => {
				return LocationService.getLocations(address, additionalParameters);
			});
			yield put(location.addToLocationsCache(CACHE_KEY_ROOT, response));
			yield put(location.getLocationsComplete(response));
		}
	} catch (e) {
		yield put(location.getLocationsFailed(e));
	}
}

function* getDefaultLocation(action: LocationActionPayload): Iterable<any> {
	const { isUserLoggedIn } = action;
	const completionFunction = isUserLoggedIn
		? location.getDefaultLocationForCustomerComplete
		: location.getDefaultLocationForAnonymousComplete;
	const failureFunction = isUserLoggedIn
		? location.getDefaultLocationForCustomerFailed
		: location.getDefaultLocationForAnonymousFailed;

	const params = yield select(
		(state: AppState): string =>
			state.location &&
			state.location.defaultLocationSearchIncludeString &&
			`include=${state.location.defaultLocationSearchIncludeString}`
	);

	try {
		const response = yield call(() => {
			return LocationService.getLocations(action.address, isUserLoggedIn ? undefined : params);
		});

		yield put(completionFunction(response));
	} catch (e) {
		yield put(failureFunction(e));
	}
}

function* onValidateStreetAddress(action: LocationActionPayload) {
	try {
		const street = action.streetName as string;
		const additionalCategory = action.additionalCategory;
		const addressProposals = yield call(() => {
			return LocationService.validateStreetAddress(street);
		});
		yield put(location.validateStreetAddressComplete(addressProposals));

		if (additionalCategory) {
			const proposalAddressRegistryId = addressProposals[0].addressRegisterId;
			yield put(sales.queryProductOfferingsViaAddressRegistryId(proposalAddressRegistryId, additionalCategory));
		}
	} catch (e) {
		yield put(location.validateStreetAddressFailed(e));
	}
}

function* onValidateAddress(action: LocationActionPayload) {
	try {
		const address: PostalAddress = action.address as PostalAddress;
		const addressValidationResponse = yield call(() => {
			return LocationService.validateAddress(address);
		});
		yield put(location.validateAddressComplete(addressValidationResponse));
	} catch (e) {
		yield put(location.validateAddressFailed(e));
	}
}

function* toggleLocationList(): Iterable<any> {
	const fetchTopLevelLocations: boolean = yield select((state: AppState) => state.location.locationListVisible);
	const cache: LocationsCache = yield select((state: AppState) => state.location.locationsCache);
	const key: string = CACHE_KEY_ROOT;
	if (fetchTopLevelLocations) {
		try {
			if (!cache[key]) {
				const filterParams = LOCATIONS_ROOT_LEVEL_QUERY;
				const response = yield call(() => {
					return LocationService.getLocations(undefined, filterParams);
				});
				yield put(location.addToLocationsCache(key, response));
				yield put(location.toggleLocationListComplete(response));
			} else {
				yield put(location.toggleLocationListComplete(cache[key]));
			}
		} catch (e) {
			yield put(location.toggleLocationListFailed(e));
		}
	}
}

function* setLocation(action: LocationActionPayload) {
	const locationItem: LocationInfo | undefined = action.location;
	const maxLevel: number = yield select((state: AppState) => state.location.maxLevel);
	const itemLevel: number = locationItem && get(locationItem, "attributes.level");
	const cache: LocationsCache = yield select((state: AppState) => state.location.locationsCache);
	const key: string | undefined = locationItem && locationItem.id;
	if (locationItem && key) {
		try {
			if (maxLevel === itemLevel) {
				yield put(location.setLocationComplete(locationItem));
			} else {
				if (cache && !cache[key]) {
					const response = yield call(() => {
						return LocationService.getLocations(undefined, undefined, `/${locationItem.id}/children`);
					});
					yield put(location.addToLocationsCache(key, response));
					yield put(location.getLocationsComplete(response));
				} else {
					yield put(location.getLocationsComplete(cache[key]));
				}
			}
		} catch (e) {
			yield put(location.getLocationsFailed(e));
		}
	}
}

function* getCities() {
	try {
		yield put(loadingOverlay.showLoadingOverlay(LocationActions.GET_CITIES));
		const response = yield call(LocationService.getCities);
		yield put(location.getCitiesComplete(response));
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(LocationActions.GET_CITIES));
	}
}

function* getCounties(action: LocationActionPayload) {
	const { cityId } = action;
	let response;
	try {
		yield put(loadingOverlay.showLoadingOverlay(LocationActions.GET_COUNTIES));
		if (cityId) {
			response = yield call(LocationService.getCounties, cityId);
			yield put(location.getCountiesComplete(response, cityId));
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(LocationActions.GET_COUNTIES));
	}
}

function* getStreet(action: LocationActionPayload) {
	const { cityId, county } = action;
	try {
		yield put(loadingOverlay.showLoadingOverlay(LocationActions.GET_STREETS));
		if (cityId && county) {
			const response = yield call(LocationService.getStreets, cityId, county);
			yield put(location.getStreetsComplete(response, county));
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(LocationActions.GET_STREETS));
	}
}
function* getAddresses(action: LocationActionPayload) {
	const { cityId, county, streetName, streetBlock } = action;
	try {
		yield put(loadingOverlay.showLoadingOverlay(LocationActions.GET_ADDRESSES));
		if (cityId && county && streetName && streetBlock) {
			const response = yield call(LocationService.getAddresses, cityId, county, streetName, streetBlock);
			yield put(location.getAddressesComplete(response, streetBlock));
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(LocationActions.GET_ADDRESSES));
	}
}

export function* locationSaga(): Iterable<any> {
	yield all([
		takeLatest(LocationActions.GET_LOCATIONS, getLocations),
		takeLatest(LocationActions.GET_DEFAULT_LOCATION_FOR_CUSTOMER, getDefaultLocation),
		takeLatest(LocationActions.GET_DEFAULT_LOCATION_FOR_ANONYMOUS, getDefaultLocation),
		takeLatest(LocationActions.VALIDATE_STREET_ADDRESS, onValidateStreetAddress),
		takeLatest(LocationActions.VALIDATE_ADDRESS, onValidateAddress),
		takeLatest(LocationActions.TOGGLE_LOCATION_LIST, toggleLocationList),
		takeLatest(LocationActions.SET_LOCATION, setLocation),
		takeLatest(LocationActions.GET_CITIES, getCities),
		takeLatest(LocationActions.GET_COUNTIES, getCounties),
		takeLatest(LocationActions.GET_STREETS, getStreet),
		takeLatest(LocationActions.GET_ADDRESSES, getAddresses),
	]);
}
