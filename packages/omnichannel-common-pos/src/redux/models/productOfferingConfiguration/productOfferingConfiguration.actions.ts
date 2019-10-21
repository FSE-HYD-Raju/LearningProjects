"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import {
	MsisdnSofReservationResult, NominationCharacteristics, NominationSearchResult,
	ProductOffering,
	ProductOfferingsConfigObject,
	ProductPath
} from "../../types";

export enum ProductOfferingConfigurationActions {
	FLUX_SYNC = "ProductOfferingConfiguration_FLUX_SYNC",

	SET_VALUES = "ProductOfferingConfiguration_SET_VALUES",
	SET_CHARS_CONFIG_CONTEXT = "ProductOfferingConfiguration_SET_CHARS_CONFIG_CONTEXT",
	TOGGLE_PRODUCT_OFFERING = "ProductOfferingConfiguration_TOGGLE_PRODUCT_OFFERING",
	SET_INPUTTED_CHARACTERISTIC = "ProductOfferingConfiguration_SET_INPUTTED_CHARACTERISTIC",
	SELECT_PRODUCT_OFFERING = "ProductOfferingConfiguration_SELECT_PRODUCT_OFFERING",
	MAKE_MSISDN_SOFT_RESERVATION = "ProductOfferingConfiguration_MAKE_MSISDN_SOFT_RESERVATION",
	MAKE_MSISDN_SOFT_RESERVATION_COMPLETE = "ProductOfferingConfiguration_MAKE_MSISDN_SOFT_RESERVATION_COMPLETE",
	UPDATE_MSISDN_SOFT_RESERVATION = "ProductOfferingConfiguration_UPDATE_MSISDN_SOFT_RESERVATION",
	UPDATE_MSISDN_SOFT_RESERVATION_COMPLETE = "ProductOfferingConfiguration_UPDATE_MSISDN_SOFT_RESERVATION_COMPLETE",
	RESET_CONFIGURATIONS = "ProductOfferingConfiguration_RESET_CONFIGURATIONS",
	SET_CONFIGURABLE_INSTALLATION_TIME = "ProductOfferingConfiguration_SET_CONFIGURABLE_INSTALLATION_TIME",
	RESET_CONFIGURABLE_INSTALLATION_TIME = "ProductOfferingConfiguration_RESET_CONFIGURABLE_INSTALLATION_TIME",
	RESET_MSISDN_SOFT_RESERVATION = "ProductOfferingConfiguration_RESET_MSISDN_SOFT_RESERVATION",
	RESET_PRODUCT_OFFERING_GROUPS = "ProductOfferingConfiguration_RESET_PRODUCT_OFFERING_GROUPS",
	SET_ENHANCED_CHARACTERISTICS = "ProductOfferingConfiguration_SET_ENHANCED_CHARACTERISTICS",
	NOMINATION_SEARCH = "ProductOfferingConfiguration_NOMINATION_SEARCH",
	NOMINATION_SEARCH_START = "ProductOfferingConfiguration_NOMINATION_SEARCH_START",
	NOMINATION_SEARCH_COMPLETE = "ProductOfferingConfiguration_NOMINATION_SEARCH_COMPLETE",
}

export interface ProductOfferingConfigurationActionPayload extends Action<ProductOfferingConfigurationActions> {
	fluxState?: any;
	values?: ConsulValues;
	config?: any;
	error?: string;
	path?: ProductPath;
	forceSelect?: boolean;
	key?: string;
	value?: string;
	valueArray?: Array<{ value: string }> | Array<string>;
	id?: string;
	productOfferings?: Array<ProductOffering>;
	makeReservationResult?: MsisdnSofReservationResult;
	searchTerm?: string;
	nominationCharacteristics?: NominationCharacteristics;
	nominationSearchResult?: NominationSearchResult;
	productOffering?: ProductOffering;
	productId?: string;
}

export const productOfferingConfiguration = {
	fluxSync: (fluxState: any) => ({type: ProductOfferingConfigurationActions.FLUX_SYNC, fluxState}),
	setValues: (values: ConsulValues) => ({type: ProductOfferingConfigurationActions.SET_VALUES, values}),
	setCharacteristicsConfigurationContext: (config: any) => ({
		type: ProductOfferingConfigurationActions.SET_CHARS_CONFIG_CONTEXT, config
	}),
	toggleProductOffering: (path: ProductPath, forceSelect?: boolean) =>
		({type: ProductOfferingConfigurationActions.TOGGLE_PRODUCT_OFFERING, path, forceSelect}),
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) =>
		({type: ProductOfferingConfigurationActions.SET_INPUTTED_CHARACTERISTIC, path, key, value}),
	selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) =>
		({type: ProductOfferingConfigurationActions.SELECT_PRODUCT_OFFERING, path, value, productOfferings}),
	makeMsisdnSoftReservation: (path: ProductPath, key: string, value: any, id: string) =>
		({type: ProductOfferingConfigurationActions.MAKE_MSISDN_SOFT_RESERVATION, path, key, value, id}),
	makeMsisdnSoftReservationComplete: (makeReservationResult?: MsisdnSofReservationResult) =>
		({type: ProductOfferingConfigurationActions.MAKE_MSISDN_SOFT_RESERVATION_COMPLETE, makeReservationResult}),
	updateMsisdnSoftReservation: (path: ProductPath, key: string, value: any, id: string) =>
		({type: ProductOfferingConfigurationActions.UPDATE_MSISDN_SOFT_RESERVATION, path, key, value, id}),
	updateMsisdnSoftReservationComplete: (makeReservationResult?: MsisdnSofReservationResult) =>
		({type: ProductOfferingConfigurationActions.UPDATE_MSISDN_SOFT_RESERVATION_COMPLETE, makeReservationResult}),
	resetConfigurations: () => ({type: ProductOfferingConfigurationActions.RESET_CONFIGURATIONS}),
	resetProductOfferingGroups: (productId: string) => ({type: ProductOfferingConfigurationActions.RESET_PRODUCT_OFFERING_GROUPS, productId}),
	setConfigurableInstallationTime: (path: ProductPath, key: string) =>
		({type: ProductOfferingConfigurationActions.SET_CONFIGURABLE_INSTALLATION_TIME, path, key}),
	resetConfigurableInstallationTime: () => ({type: ProductOfferingConfigurationActions.RESET_CONFIGURABLE_INSTALLATION_TIME}),
	resetMsisdnSoftReservation: () => ({type: ProductOfferingConfigurationActions.RESET_MSISDN_SOFT_RESERVATION}),
	setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{ value: string }> | Array<string>) =>
		({type: ProductOfferingConfigurationActions.SET_ENHANCED_CHARACTERISTICS, path, key, valueArray}),
	nominationSearch: (searchTerm: string, path: ProductPath, nominationCharacteristics: NominationCharacteristics) =>
		({type: ProductOfferingConfigurationActions.NOMINATION_SEARCH, searchTerm, path, nominationCharacteristics}),
	nominationSearchStart: (searchTerm: string, path: ProductPath, nominationCharacteristics: NominationCharacteristics) =>
		({
			type: ProductOfferingConfigurationActions.NOMINATION_SEARCH_START,
			searchTerm,
			path,
			nominationCharacteristics
		}),
	nominationSearchComplete: (path: ProductPath,
	                           nominationCharacteristics: NominationCharacteristics,
	                           nominationSearchResult?: NominationSearchResult,
	                           productOffering?: ProductOffering) =>
		({
			type: ProductOfferingConfigurationActions.NOMINATION_SEARCH_COMPLETE,
			path,
			nominationCharacteristics,
			nominationSearchResult,
			productOffering
		}),

};
