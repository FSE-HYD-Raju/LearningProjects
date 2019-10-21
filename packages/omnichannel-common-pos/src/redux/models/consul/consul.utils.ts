"use strict";

/* tslint:disable:variable-name */

import { get, set, isNumber, isString, trim, isEmpty, find, pickBy, entries, chain, map } from "lodash";
import { isChannelPos, isClient, getParsedValue } from "../../utils";
import { ConsulB2CConfiguration, Country, RechargePurchaseConfigType } from "../../types";
import { ConsulState, LocaleItem, ConsulValues } from "./consul.types";

const Cookies = require("universal-cookie");
const { countries, languages } = require("country-data");
const langs = require("langs");

const getParsedConsulValue = (data: any, key: string): any => getParsedValue(data[key], {});

function getMappedCountries(): Array<Country> {
	return chain(countries.all as Array<{ alpha2: string; name: string; status: "assigned" }>)
		.filter(item => !isEmpty(item.alpha2) && item.status === "assigned")
		.sortBy(item => item.name)
		.map(item => ({
			code: item.alpha2, // this is the ISO 3166-1 alpha-2 format
			name: item.name, // string format of country name
			locale: item.alpha2 // this is the ISO 3166-1 alpha-2 format
		}))
		.value();
}

function getMappedLanguages() {
	return chain(languages.all as Array<{ alpha2: string; alpha3: string; name: string }>)
		.filter(l => !isEmpty(l.alpha3) && !isEmpty(l.alpha2))
		.sortBy(l => l.name)
		.map(lang => ({
			code: lang.alpha3, // this is the ISO 639-2 format
			name: lang.name, // string format of language/country name
			locale: lang.alpha2 // ISO 639-1 -> bcp 47 -> for frontend
		}))
		.value();
}

function initLocale(state: Partial<ConsulState>): LocaleItem | void {
	if (!isClient()) {
		return;
	}

	const cookies = new Cookies();
	const navigatorLocale = get(window, "navigator.language", "").split("-")[0];
	return find(state.locales, ({ locale }) => locale === cookies.get("selected_lang")) ||
		find(state.locales, ({ locale }) => locale === navigatorLocale) ||
		find(state.locales, ({ iso6392 }) => iso6392 === state.defaultLanguage);
}

function pickLocaleData(locale: LocaleItem): LocaleItem | void {
	if (!isEmpty(locale)) {
		return {
			locale: locale.locale,
			iso6392: locale.iso6392,
			messages: locale.messages || {}
		};
	}
}

const findLanguageByCode = (ConsulStore: any, code: string) => {
	return ConsulStore.languages.find((language: any) => {
		return language.code === code;
	});
};

const getDefaultIntegerProp = (data: any, key: string, defValue: number): number => {
	const value = data[key] || defValue;
	return isNumber(value) ? value : isString(value) ? parseInt(value, 10) : defValue;
};

const getTranslationsFromLocales = (locales: Array<LocaleItem>, locale: string) => {
	const defLocale = locales.find(l => l.locale === locale);
	return {
		locales,
		messages: defLocale && defLocale.messages
	};
};

const extractTranslations = (payload: ConsulValues, locale: string = "en") => {
	const translations: Array<LocaleItem> = [];
	const configuredTranslations = pickBy(payload, (value: string, key: string) => key.startsWith("translations/"));

	entries(configuredTranslations).forEach(([key, value]) => {
		const iso6392 = key.substring(key.indexOf("/") + 1); // i.e. translations/eng -> eng
		const lang = langs.where("2", iso6392);

		if (lang && lang["1"]) {
			const locale = lang["1"];
			const messages = getParsedValue(value, null);
			if (messages !== null) {
				translations.push({
					iso6392,
					locale,
					messages
				});
			} else {
				console.error(`Unable to parse translation [iso6392=${iso6392}, lang=${lang}, locale=${locale}].`);
			}
		} else {
			console.error("Unsupported locale", iso6392);
		}
	});
	return getTranslationsFromLocales(translations, locale);
};

const extractFeatures = (payload: ConsulValues) => {
	const features: Record<string, any> = {};

	const data = Object.keys(payload)
		.filter(key => key.match("features/"))
		.reduce((res, key: string) => {
			const prop = key.replace(/\//g, ".");
			return set(res, prop, payload[key]);
		}, {}) as { features: Object };

	if (data.features) {
		Object.assign(features, data.features);
	}

	if (features.eshop) {
		Object.assign(features.eshop, {
			document_id_types: getParsedValue(features.eshop.document_id_types, [])
		});
	}

	return features;
};

function extractValues(data: ConsulValues, state: Partial<ConsulState>) {
	const extractB2cConfiguration = (payload: ConsulValues): ConsulB2CConfiguration => {
		const simCardPinsUnmasked = get(payload, "digilife/things/sim_card_pins_unmasked") === "true";
		const numberOfBundles = get(payload, "shop/number_of_bundles");

		/* number of orders showed on /digilife/orders
		 * fall back value: 10
		*/
		const pagination_limit_config_value = get(payload, "digilife/orders/pagination_limit", 10);
		const mdmConfigurationUrl = get(payload, "features/mdm_configuration_url");
		const pagination_limit = isString(pagination_limit_config_value) ? parseInt(pagination_limit_config_value, 10) : pagination_limit_config_value;

		const actionsEnabledConfig = get(payload, "digilife/things/addons/actions_enabled");
		const actionsEnabled = trim(actionsEnabledConfig) === "true" || actionsEnabledConfig === null;

		const usageCountersFromEventsCalculationConfig = get(payload, "features/products/enable_usage_counters_from_events_calculation");
		const usageCountersFromEventsCalculation = trim(usageCountersFromEventsCalculationConfig) === "true";

		return {
			digilife: {
				things: {
					sim_card_pins_unmasked: simCardPinsUnmasked,
					addons: {
						actionsEnabled
					}
				},
				orders: {
					pagination_limit
				},
			},
			features: {
				mdm_configuration_url: mdmConfigurationUrl,
				products: {
					enable_usage_counters_from_events_calculation: usageCountersFromEventsCalculation
				}
			},
			shop: {
				number_of_bundles: numberOfBundles
			}
		};
	};

	const extractMsisdnReservationRequired = (payload: ConsulValues) => {
		const msisdn_reservation = get(payload, "features/msisdn_reservation");
		return msisdn_reservation === undefined || msisdn_reservation.toLowerCase() === "true";
	};

	const extractCustomerCreationMandatoryFields = (payload: ConsulValues) => {
		const customerDataFormSchema = getParsedConsulValue(payload, "schemas/customerDataForm");
		const mandatoryFields = [];
		if (customerDataFormSchema && customerDataFormSchema.properties) {
			for (const property in customerDataFormSchema.properties) {
				if (customerDataFormSchema.properties[property].required === true) {
					mandatoryFields.push(property);
				}
			}
		}
		return mandatoryFields;
	};

	const extractIdentificationTypes = () => {
		const payload = getParsedConsulValue(data, "features/display_options");
		return map(payload.identification, idObject => {
			return idObject.backendValue;
		});
	};

	const extractRechargePurchaseConfig = (payload: ConsulValues): RechargePurchaseConfigType => {
		const basePath = "recharge-purchases";
		return {
			rechargePurchaseStream: get(data, `${basePath}/rechargePurchaseStream`),
			rechargePurchaseSubChannelToStreamMap: getParsedValue(get(data, `${basePath}/rechargePurchaseSubChannelToStreamMap`), {}),
			rechargePurchaseSubstream: get(data, `${basePath}/rechargePurchaseSubstream`)
		};
	};

	const translationData = extractTranslations(data, state.locale);

	const values = {
		initialized: true,
		services: {
			pos: data.omnichannel_pos_service_name,
			b2c: data.omnichannel_b2c_service_name,
			cms_mss: data.omnichannel_cms_mediasharingservice_service_name,
			cms_admin: data.omnichannel_cms_admin_service_name,
			cms: data.omnichannel_cms_extip_service_name
		},
		displayVersionInformation: data.display_version_information === "true",
		registrationFormAdditionalFields: getParsedConsulValue(data, "registration_form_additional_fields"),

		logo: get(data, "customizations/logo") || state.logo,
		styles: get(data, "customizations/styles") || state.styles,

		maxUploadSize: getDefaultIntegerProp(data, "max_upload_size", 2048),
		maxUploadFiles: getDefaultIntegerProp(data, "max_upload_files", 12),
		pagingSize: getDefaultIntegerProp(data, "paging_size", 4),
		b2c_configuration: extractB2cConfiguration(data),
		brand: data.x_brand,

		searchConfigs: get(data, "features/pos_search_configuration") || false,
		ICCIDValidationConditions: getParsedConsulValue(data, "features/iccid_validation_conditions"),
		categoriesBlacklist: getParsedConsulValue(data, "features/blacklisted_categories_if_no_agreement_selected"),
		customerCreationMandatoryFields: extractCustomerCreationMandatoryFields(data),
		displayOptions: getParsedConsulValue(data, "features/display_options"),
		identificationTypes: extractIdentificationTypes(),
		customerIdentificationValidationEnabled: getParsedConsulValue(data, "features/customer_identification_validation") || {
			enabled: false,
			idTypes: []
		},

		contentPagePathValidationRegexp: get(data, "content_page_path_validation_regexp"),

		skipCmsRequests: data.skip_cms_requests === "true",
		serviceNameHeaderValue: data.service_name_header_value,

		payment_manager: {
			reservation_amount_for_creditcard_tokenization: getParsedConsulValue(data, "payment-manager/reservation_amount_for_creditcard_tokenization")
		},

		env: {
			SERVICE_NAME: get(data, "env/SERVICE_NAME"),
			IS_RUNTIME: get(data, "env/IS_RUNTIME")
		},

		rechargePurchaseConfig: extractRechargePurchaseConfig(data),

		msisdnReservationRequired: extractMsisdnReservationRequired(data),
		checkoutMsisdnValidationRegex: get(data, "features/checkout_msisdn_validation_regex"),
		icc_subtype_display: get(data, "icc_subtype_display", state.icc_subtype_display),
		defaultLanguage: get(data, "default_language", "eng").trim(),

		locations: {
			cities: getParsedValue(get(data, "locations/cities")) || [],
			provinces: getParsedValue(get(data, "locations/provinces")) || []
		},

		logFormValidationErrors: get(data, "log_form_validation_errors") === "true",

		logSchemaDiscrepancies: get(data, "log_schema_discrepancies", false) === "true",

		...translationData
	};

	Object.assign(values, {
		features: extractFeatures(data)
	});

	if (isChannelPos()) {
		const csrtb_service_name = data.csrtb_service_name;
		if (csrtb_service_name) {
			Object.assign(values, { csrtb_service_name });
		} else {
			console.warn("Unable to parse config 'csrtb_service_name'");
		}
	}
	return values;
}

export {
	extractValues,
	getMappedCountries,
	getMappedLanguages,
	initLocale,
	pickLocaleData,
	findLanguageByCode,
	getTranslationsFromLocales,
	extractTranslations
};
