"use strict";

import { get, find, cloneDeep } from "lodash";
import { getParsedValue } from "../../utils";
import { ConsulValues } from "../consul/consul.types";
import {
	NominationSearchResult,
	ProductOfferingConfigurationState,
	ProductOfferingsConfigObject
} from "./productOfferingConfiguration.types";
import {
	Configurations, Msisdn,
	MsisdnSofReservationResult,
	NominationCharacteristics,
	ProductOffering,
	ProductPath,
	SimCard,
} from "../../types";

function extractValues(payload: ConsulValues) {
	const values: Partial<ProductOfferingConfigurationState> = {};
	const charsConfig = getParsedValue(get(payload, "characteristics_configuration_context"));

	if (charsConfig) {
		Object.assign(values, {
			characteristicsConfigurationContext: charsConfig
		});
	}
	values.synchronizeEnhancedCharacteristics = get(payload, "features/synchronize_enhanced_characteristics", "true") === "true";

	return values;
}

function getEmptyConfigObject(id: string,
							  pos: Array<ProductOfferingsConfigObject> = [],
							  pogs: Array<ProductOfferingsConfigObject> = [],
							  opos: Array<ProductOfferingsConfigObject> = []): ProductOfferingsConfigObject {
	return {
		id,
		inputtedCharacteristics: {},
		enhancedCharacteristics: {},
		productOfferings: pos,
		productOfferingGroups: pogs,
		optionalProductOfferings: opos,
	};
}

/**
 * Navigates to the given path and applies the given applicator function to the last object.
 * Any missing product-offering configuration objects on the path are generated.
 * @param configObject the config object to modify
 * @param path array of objects with either a PO or a POG id. Example: [{"po":"basic-sub-po"},{"pog":"addons-pog"},{"po":"basic-hybrid-po"}]
 * @param applicator a function that modifies the given config object
 */
function modifyConfigObject(configObject: ProductOfferingsConfigObject, path: ProductPath, applicator: (configuration: ProductOfferingsConfigObject) => void) {
	// iterate through path and create missing configuration objects until the last element is found
	if (path.length > 0) {
		const config = path[0];
		const remainingPath = path.slice(1, path.length);
		const poId = config.po;
		const pogId = config.pog;
		const optionalPoId = config.optionalPo;
		if (poId) {
			const existingPOConfigObject = find(configObject.productOfferings, { id: poId });
			const item = existingPOConfigObject || getEmptyConfigObject(poId);
			if (!existingPOConfigObject) {
				configObject.productOfferings.push(item);
			}
			modifyConfigObject(item as ProductOfferingsConfigObject, remainingPath, applicator);

		} else if (pogId) {
			const existingPOGConfigObject = find(configObject.productOfferingGroups, { id: pogId });
			const item = existingPOGConfigObject || getEmptyConfigObject(pogId);
			if (!existingPOGConfigObject) {
				configObject.productOfferingGroups.push(item);
			}
			modifyConfigObject(item as ProductOfferingsConfigObject, remainingPath, applicator);

		} else if (optionalPoId) {
			const existingPOConfigObject = find(configObject.optionalProductOfferings, { id: optionalPoId });
			const item = existingPOConfigObject || getEmptyConfigObject(optionalPoId);
			if (!existingPOConfigObject) {
				configObject.optionalProductOfferings.push(item);
			}
			modifyConfigObject(item as ProductOfferingsConfigObject, remainingPath, applicator);
		}
	} else if (applicator) {
		// last element is found
		applicator(configObject);
	}
}

/**
 * Toggles the product-offering indicated by the given path and returns updated configuration
 * @param configurations current configuration
 * @param path array of objects with either a PO or a POG id. Example: [{"po":"basic-sub-po"},{"pog":"addons-pog"},{"po":"basic-hybrid-po"}]
 * @param forceSelect always sets selected=true
 */
function toggleProductOffering(configurations: Configurations, path: ProductPath, forceSelect: boolean): Configurations {
	const newConfigurations = cloneDeep(configurations);
	const poId = path[0].po!;
	const config = newConfigurations[poId] || getEmptyConfigObject(poId);
	modifyConfigObject(config, path.slice(1, path.length),
		configObject => { configObject.selected = forceSelect ? true : !configObject.selected; }
	);
	newConfigurations[poId] = config;
	return newConfigurations;
}

/**
 * set given characteristics type e.g inputted-characteristics or enhanced-characeristicso
 */

function setCharacteristics(configurations: Configurations, params: {
		path: ProductPath,
		key: string,
		value: string | Array<{value: string}> | Array<string>
	}, characteristicsType: "inputtedCharacteristics" | "enhancedCharacteristics"): Configurations {
	const { path, key, value } = params;
	const poId = path[0].po!;
	const newConfigurations = cloneDeep(configurations);
	const config = newConfigurations[poId] || getEmptyConfigObject(poId);
	modifyConfigObject(config, path.slice(1, path.length),
		configObject => {
			// bug in lodash typings. "set" can accept array as second param
			if (!configObject[characteristicsType]) {
				configObject[characteristicsType] = {};
			}
			configObject[characteristicsType][key] = value;
		}
	);
	newConfigurations[poId] = config;
	return newConfigurations;
}

/**
 * Sets the enhanced-characteristic to the product-offering indicated by the path.
 * @param configurations - current configuration
 * @param params object with update info
 * @param params.path array of objects with either a PO or a POG id. Example: [{"po":"basic-sub-po"},{"pog":"addons-pog"},{"po":"basic-hybrid-po"}]
 * @param params.key characteristic key
 * @param params.valueArray characteristic values

 */
function setEnhancedCharacteristics(configurations: Configurations, params: {
	path: ProductPath,
	key: string,
	valueArray: Array<{value: string}> | Array<string>
}): Configurations {
	const { path, key, valueArray } = params;
	return setCharacteristics(configurations,
		{ path, key, value: valueArray },
		"enhancedCharacteristics"
	);
}

/**
 * Sets the inputted-characteristic to the product-offering indicated by the path.
 * @param path array of objects with either a PO or a POG id. Example: [{"po":"basic-sub-po"},{"pog":"addons-pog"},{"po":"basic-hybrid-po"}]
 * @param key characteristic key
 * @param value characteristic value
 * @param syncCharacteristics boolean enabling enhancedCharacteristic synchronization
 */
function setInputtedCharacteristic(configurations: Configurations,
								   path: ProductPath,
								   key: string,
								   value: string,
								   syncCharacteristics: boolean): Configurations {
	const newConfigurations = setCharacteristics(configurations, { path, key, value }, "inputtedCharacteristics");
	if (syncCharacteristics) {
		const valueArray = [{ value }];
		return setEnhancedCharacteristics(newConfigurations,  { path, key, valueArray });
	} else {
		return newConfigurations;
	}
}

/**
 * Sets selected=true for a PO. Sets selected=false for other POs in the same POG.
 */
function selectProductOffering(configurations: Configurations,
							   pogPath: ProductPath,
							   poId: string,
							   pos: Array<ProductOffering>): Configurations {
	const rootPoId = pogPath[0].po!;
	const newConfigurations = cloneDeep(configurations);
	const config = newConfigurations[rootPoId] || getEmptyConfigObject(rootPoId);
	modifyConfigObject(config, pogPath.slice(1, pogPath.length),
		configObject => {
			const productOfferings = cloneDeep(pos);
			productOfferings.forEach((po: ProductOffering) => {
				po.selected = po.id === poId;
			});
			configObject.productOfferings = productOfferings;
		}
	);
	newConfigurations[rootPoId] = config;
	return newConfigurations;
}

function makeMsisdnSoftReservation(configurations: Configurations, result: MsisdnSofReservationResult, syncCharacteristics: boolean): Configurations {
	const { path, key, value } = result.inputtedCharacteristics;
	return setInputtedCharacteristic(configurations, path, key, value, syncCharacteristics);
}

function nominationSearchStart(state: ProductOfferingConfigurationState,
							   searchTerm: string,
							   path: ProductPath,
							   nominationCharacteristics: NominationCharacteristics): ProductOfferingConfigurationState {
	const newState = {...state};
	newState.nominationSubscriptionInformation = {
		[path[0]!.po!]: {
			nominationSearchStarted: true,
			msisdn: undefined,
			number: undefined,
			productOffering: undefined
		}
	};
	newState.configurations = setInputtedCharacteristic(newState.configurations, path, nominationCharacteristics.iccKey, "", newState.synchronizeEnhancedCharacteristics);
	newState.configurations = setInputtedCharacteristic(newState.configurations, path, nominationCharacteristics.numberKey, "", newState.synchronizeEnhancedCharacteristics);
	return newState;
}

function extractValuesFromSearchResult(searchResultObject: Msisdn | SimCard | null,
									   simPath: string,
									   msisdnPath: string,
									   associatedWithPath: string,
									   productOfferingIdPath: string): NominationSearchResult {
	const sim = get(searchResultObject, simPath);
	const msisdn = get(searchResultObject, msisdnPath);
	const associatedWith = get(searchResultObject, msisdnPath);
	const productOfferingId = get(searchResultObject, productOfferingIdPath);
	return { sim, msisdn, associatedWith, productOfferingId };
}

function exctractValuesFromNominationSearch(searchResult: [ Msisdn | null, SimCard | null ]): NominationSearchResult | undefined {
	let result: NominationSearchResult | undefined;
	if (searchResult[0]) {
		result = extractValuesFromSearchResult(searchResult[0],
			"attributes.preactivatedSim",
			"attributes",
			"attributes.associatedWith",
			"attributes.characteristics.plan-offering-id");
	} else if (searchResult[1]) {
		result = extractValuesFromSearchResult(searchResult[1],
			"attributes",
			"attributes.msisdn",
			"attributes.associatedWith",
			"attributes.msisdn.characteristics.plan-offering-id");
	}

	return result;
}

function validateMsisdn(state: ProductOfferingConfigurationState,
						path: ProductPath,
						nominationCharacteristics: NominationCharacteristics,
						searchResult: NominationSearchResult): Msisdn | undefined {
	let errorCode: string | undefined;
	if (!get(searchResult.msisdn, "number")) {
		errorCode = "notFound";
	} else if (get(searchResult.msisdn, "lifecycleStatus") !== "reserved") {
		errorCode = "numberNotReserved";
	}
	let msisdn: Msisdn | undefined = searchResult.msisdn ? {...searchResult.msisdn} : undefined;
	if (errorCode) {
		msisdn = { ...searchResult.msisdn!, errorCode };
	} else {
		state.configurations = setInputtedCharacteristic(state.configurations, path,
			nominationCharacteristics.numberKey,
			searchResult.msisdn!.number!,
			state.synchronizeEnhancedCharacteristics);
		state.configurations = setInputtedCharacteristic(state.configurations, path,
			nominationCharacteristics.reservedForKey,
			searchResult.msisdn!.reservedFor!,
			state.synchronizeEnhancedCharacteristics);
	}
	return msisdn;
}

function validateSim(state: ProductOfferingConfigurationState,
					 path: ProductPath,
					 nominationCharacteristics: NominationCharacteristics,
					 searchResult: NominationSearchResult): SimCard | undefined {
	let errorCode: string | undefined;
	if (!get(searchResult.sim, "icc")) {
		errorCode = "notFound";
	} else if (get(searchResult.sim, "simStatus") !== "available") {
		errorCode = "simNotAvailable";
	}
	let sim: SimCard | undefined = searchResult.sim ? { ...searchResult.sim } : undefined;
	if (errorCode) {
		sim = { ...searchResult.sim!, errorCode };
	} else {
		state.configurations = setInputtedCharacteristic(state.configurations, path,
			nominationCharacteristics.iccKey,
			searchResult.sim!.icc!,
			state.synchronizeEnhancedCharacteristics);
	}
	return sim;
}

function validatePO(productOffering: ProductOffering): ProductOffering {
	if (!get(productOffering, "id")) {
		const errorCode = "notFound";
		productOffering = {
			...productOffering,
			errorCode
		} as any as ProductOffering;
	}
	return productOffering;
}

function nominationSearchComplete(state: ProductOfferingConfigurationState,
								  path: ProductPath,
								  nominationCharacteristics: NominationCharacteristics,
								  nominationSearchResult: NominationSearchResult | undefined,
								  productOffering: ProductOffering | undefined): ProductOfferingConfigurationState {
	if (!nominationSearchResult) {
		return { ...state, nominationSubscriptionInformation: {} };
	}
	const newState = { ...state };
	newState.nominationSubscriptionInformation[path[0]!.po!] = {
		msisdn: validateMsisdn(newState, path, nominationCharacteristics, nominationSearchResult),
		sim: validateSim(newState, path, nominationCharacteristics, nominationSearchResult),
		productOffering: productOffering ? validatePO(productOffering) : undefined,
		nominationSearchStarted: false
	};
	return newState;
}

export {
	toggleProductOffering,
	setInputtedCharacteristic,
	setEnhancedCharacteristics,
	selectProductOffering,
	extractValues,
	makeMsisdnSoftReservation,
	nominationSearchStart,
	exctractValuesFromNominationSearch,
	nominationSearchComplete,
};
