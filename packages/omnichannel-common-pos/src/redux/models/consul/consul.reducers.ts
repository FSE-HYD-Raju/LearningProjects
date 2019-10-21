"use strict";

import * as moment from "moment";
import { find } from "lodash";
import { ConsulState, LocaleItem, ConsulValues } from "./consul.types";
export { ConsulState, LocaleItem } from "./consul.types";
import { ConsulActions, ConsulActionPayload } from "./consul.actions";
import {
	extractValues,
	getMappedCountries,
	getMappedLanguages,
	initLocale,
	pickLocaleData
} from "./consul.utils";
const Cookies = require("universal-cookie");

export const initialState = (): Partial<ConsulState> => ({
	services: {},
	serviceLocations: {},
	displayVersionInformation: false,
	sslInUse: false,
	defaultLanguage: "eng",
	locale: "en",
	iso6392: "eng",
	messages: {},
	locales: [],
	isUserSetLocale: false,
	logo: "/static/img/qvantel_logo_white_small.png",
	styles: "",
	countries: getMappedCountries(),
	languages: getMappedLanguages(),
	// random stuffs that should probably come from somewhere
	genders: ["MALE", "FEMALE", "OTHER"],
	maritalStatuses: ["single", "married", "divorced", "widowed", "cohabiting"],
	registrationFormAdditionalFields: [],
	// java date format: yyyy-MM-dd'T'HH:mm:ss.SSSZ,
	// to a format that moment understands
	javaDateStringFormat: moment.ISO_8601,
	icc_subtype_display: {
		dropdown: ["dropdown"],
		radio: ["radio"]
	},
	brand: "",
	initialized: false,
	searchConfigs: "",
	serviceNameHeaderValue: process.env.SERVICE_NAME,
	ICCIDValidationConditions: {
		resourceStockName: "",
		simStatus: []
	},
	categoriesBlacklist: [],
	msisdnReservationRequired: true,
	locations: {
		cities: [],
		provinces: []
	},
	logFormValidationErrors: false,
	logSchemaDiscrepancies: false,
});

const consulReducer = (state: Partial<ConsulState> = initialState(), action: ConsulActionPayload) => {
	const { type } = action;
	const cookies = new Cookies();

	switch (type) {
		case ConsulActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case ConsulActions.GET_VALUES_COMPLETE:
			const values = extractValues(action.values as ConsulValues, state);
			return {
				...state,
				...values
			};
		case ConsulActions.GET_SERVICE_LOCATIONS_COMPLETE:
			const { serviceLocations } = action;
			return {
				...state,
				serviceLocations
			};
		case ConsulActions.INIT_LOCALE:
			const defaultLocale = initLocale(state);
			if (state.isUserSetLocale || !defaultLocale) {
				return state;
			}
			return {
				...state,
				...pickLocaleData(defaultLocale),
				isUserSetLocale: false
			};
		case ConsulActions.CHANGE_LANGUAGE:
			if (action.locale && action.saveInCookie && !!cookies.get("cookie_banner")) {
				cookies.set("selected_lang", action.locale.locale, {path: "/"});
			}
			return {
				...state,
				...pickLocaleData(action.locale as LocaleItem),
				isUserSetLocale: true
			};
		case ConsulActions.CHANGE_LANGUAGE_BY_CODE:
			const locale = find(state.locales, {iso6392: action.iso6392});
			if (locale) {
				if (action.saveInCookie && !!cookies.get("cookie_banner")) {
					cookies.set("selected_lang", locale.locale, {path: "/"});
				}
				return {
					...state,
					...pickLocaleData(locale),
					isUserSetLocale: true
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default consulReducer;
