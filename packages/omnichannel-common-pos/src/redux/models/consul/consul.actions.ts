"use strict";

import { Action } from "redux";
import { LocaleItem, ConsulValues } from "./consul.types";

export enum ConsulActions {
	FLUX_SYNC = "Consul_FLUX_SYNC",

	INIT_LOCALE = "Consul_INIT_LOCALE",
	CHANGE_LANGUAGE = "Consul_CHANGE_LANGUAGE",
	CHANGE_LANGUAGE_BY_CODE = "Consul_CHANGE_LANGUAGE_BY_CODE",

	GET_VALUES = "Consul_GET_VALUES",
	GET_VALUES_COMPLETE = "Consul_GET_VALUES_COMPLETE",
	GET_VALUES_FAILED = "Consul_GET_VALUES_FAILED",

	GET_SERVICE_LOCATIONS = "Consul_GET_SERVICE_LOCATIONS",
	GET_SERVICE_LOCATIONS_COMPLETE = "Consul_GET_SERVICE_LOCATIONS_COMPLETE",
	GET_SERVICE_LOCATIONS_FAILED = "Consul_GET_SERVICE_LOCATIONS_FAILED",

	ON_ERROR = "Consul_ON_ERROR"
}

export interface ConsulActionPayload extends Action<ConsulActions> {
	fluxState?: any;
	all?: any;
	values?: ConsulValues;
	serviceLocations?: ConsulValues;
	locale?: LocaleItem;
	iso6392?: LocaleItem["iso6392"];
	error?: string;
	saveInCookie?: boolean;
}

export const consul = {
	fluxSync: (fluxState: any) => ({type: ConsulActions.FLUX_SYNC, fluxState}),

	getValues: () => ({type: ConsulActions.GET_VALUES}),
	getValuesComplete: (values: ConsulValues) => ({type: ConsulActions.GET_VALUES_COMPLETE, values}),
	getValuesFailed: (error: string) => ({type: ConsulActions.GET_VALUES_FAILED, error}),

	getServiceLocations: () => ({type: ConsulActions.GET_SERVICE_LOCATIONS}),
	getServiceLocationsComplete: (serviceLocations: ConsulValues) => ({type: ConsulActions.GET_SERVICE_LOCATIONS_COMPLETE, serviceLocations}),
	getServiceLocationsFailed: (error: string) => ({type: ConsulActions.GET_SERVICE_LOCATIONS_FAILED, error}),

	initLocale: () => ({type: ConsulActions.INIT_LOCALE}),
	changeLanguage: (locale: LocaleItem, saveInCookie: boolean = false) => ({type: ConsulActions.CHANGE_LANGUAGE, locale, saveInCookie}),
	changeLanguageByCode: (iso6392: LocaleItem["iso6392"], saveInCookie: boolean = false) => ({type: ConsulActions.CHANGE_LANGUAGE_BY_CODE, iso6392, saveInCookie})
};
