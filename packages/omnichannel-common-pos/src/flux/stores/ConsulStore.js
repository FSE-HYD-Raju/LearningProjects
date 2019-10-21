// @flow

import BaseStore from "./BaseStore";
import ImmStore from "../seamless-alt";
import moment from "moment";
import { set } from "lodash";
import get from "lodash/get";
import find from "lodash/find";
import isNumber from "lodash/isNumber";
import toInteger from "lodash/toInteger";
import isString from "lodash/isString";
import trim from "lodash/trim";
import { deprecated, ConsulUtils } from "../../redux";
import { isChannelPos } from "../../utils/Channel.utils";
import isClient from "../../utils/isClient";
import type { ConsulStoreState } from "omnichannel-flow-pos";

// TODO: anything coming from consul should be kept here
// this takes away translations from translationsStore, but that still contains
// other stuff (genders, countries) so maybe rename that?

const defaultStyles = "";
const defaultLogo = "/static/img/qvantel_logo_white_small.png";

@ImmStore
export default class ConsulStore extends BaseStore {
	state: ConsulStoreState;

	constructor() {
		super();
		this.bindActions(this.alt.actions.ConsulActions);

		this.state = {
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
			logo: defaultLogo,
			styles: defaultStyles,
			countries: ConsulUtils.getMappedCountries(),
			languages: ConsulUtils.getMappedLanguages(),
			// random stuffs that should probably come from somewhere
			genders: ["male", "female", "other"],
			maritalStatuses: [
				"single",
				"married",
				"divorced",
				"widowed",
				"cohabiting"
			],
			registrationFormAdditionalFields: [],
			// java date format: yyyy-MM-dd'T'HH:mm:ss.SSSZ,
			// to a format that moment understands
			javaDateStringFormat: moment.ISO_8601,
			icc_subtype_display: {
				dropdown: ["dropdown"],
				radio: ["radio"]
			},
			brand: null,
			initialized: false,
			searchConfigs: {},
			msisdnReservationRequired: true,
			identifications: {},
			locations: [],
			logSchemaDiscrepancies: false,
		};

		this.exportPublicMethods({
			getLanguageNameByCode: this.getLanguageNameByCode
		});
	}

	@deprecated("Covered in consul.reducers and consul.actions")
	setLanguage(locale: *, isUserSetLocale: boolean = true) {
		if (locale && locale.locale && locale.iso6392 && locale.messages) {
			this.setState({
				locale: locale.locale,
				iso6392: locale.iso6392,
				messages: locale.messages,
				isUserSetLocale
			});
		}
	}

	@deprecated("Covered in consul.reducers and consul.actions")
	changeLanguage(locale: *) {
		this.setLanguage(locale);
	}
	changeInitialLanguage(locale: *) {
		this.setLanguage(locale, false);
	}
	languageIsSupported(language?: Object = {}) {
		const supportedLanguage = find(this.state.locales, locale => {
			return locale.locale === language.locale;
		});
		return Boolean(supportedLanguage);
	}

	@deprecated("Covered in consul.reducers and consul.actions")
	initializeLanguage() {
		if (this.state.isUserSetLocale) {
			return;
		}
		if (isClient) {
			const navigatorLanguage = get(window, "navigator.language", "");
			const navigatorLocale = navigatorLanguage.split("-")[0];
			const language = find(this.state.locales, locale => {
				return locale.locale === navigatorLocale;
			});
			if (language) {
				this.changeInitialLanguage(language);
			} else {
				const defaultLanguage = find(this.state.locales, locale => {
					return locale.iso6392 === this.state.defaultLanguage;
				});

				this.changeInitialLanguage(defaultLanguage);
			}
		}
	}

	@deprecated("Covered in consul.reducers and consul.actions")
	changeLanguageByCode(iso6392: string) {
		const newLocale = find(this.state.locales, { iso6392 });
		if (newLocale) {
			this.changeLanguage(newLocale);
		}
	}

	getHosts(payload: Object) {
		this.setState(payload);
	}

	getLanguageNameByCode = (code: string) => {
		const language = find(this.state.languages, { code });
		return language ? language.name : null;
	};

	@deprecated("consul.utils extractFeatures")
	extractFeatures = (payload: Object) => {
		return Object.keys(payload)
			.filter(key => key.match("features/"))
			.reduce((res, key) => {
				const prop = key.replace(/\//g, ".");
				set(res, prop, payload[key]);
				return res;
			}, {});
	};

	@deprecated("Covered in consul.reducers and consul.actions")
	getValues(payload: *) {
		const state = {
			...this.extractServices(payload),
			...this.extractDisplayVersionInformation(payload),
			...this.extractRegistrationFormAdditionalFields(payload),
			...ConsulUtils.extractTranslations(payload, this.state.locale),
			...this.extractCustomizations(payload),
			...this.extractCsrtbServiceName(payload),
			...this.extractMaxUploadSize(payload),
			...this.extractMaxUploadFiles(payload),
			...this.extractPagingSize(payload),
			...this.extractB2cConfiguration(payload),
			...this.extractBrand(payload),
			...this.extractPOSSearchConfigs(payload),
			...this.extractPOSErrorMessagesMap(payload),
			...this.extractSkipCmsRequests(payload),
			...this.extractServiceNameHeaderValue(payload),
			...this.extractDisplayOptions(payload),
			...this.extractEnvironmentVariables(payload),
			...this.extractRechargePurchaseVariables(payload),
			...this.extractMsisdnReservationRequired(payload),
			...this.extractIdentifications(payload),
			...this.extractLocations(payload),

			icc_subtype_display: get(
				payload,
				"icc_subtype_display",
				this.state.icc_subtype_display
			),
			...this.extractDefaultLanguage(payload),
			initialized: true
		};

		const { features } = this.extractFeatures(payload);

		Object.assign(state.features, features);

		this.setState(state);
	}

	extractCsrtbServiceName(payload: any) {
		// Try to set csrtb service name for pos, no need for b2c / cms
		if (isChannelPos()) {
			const csrtb_service_name = get(payload, "csrtb_service_name");

			if (csrtb_service_name) {
				this.setState({
					csrtb_service_name
				});
			} else {
				console.warn("Unable to parse config 'csrtb_service_name'");
			}
		}
	}

	extractRegistrationFormAdditionalFields(payload: Object): Object {
		return {
			registrationFormAdditionalFields: this.getParsedConsulValue(
				payload,
				"registration_form_additional_fields"
			)
		};
	}

	extractBrand(payload: Object): Object {
		const brand = get(payload, "x_brand");

		if (brand) {
			return {
				brand
			};
		}
		return {};
	}

	extractPOSSearchConfigs(payload: Object): Object {
		const POSSearchConfiguration = get(
			payload,
			"features/pos_search_configuration"
		);

		if (!POSSearchConfiguration || POSSearchConfiguration === "") {
			return { searchConfigs: false };
		} else {
			return { searchConfigs: POSSearchConfiguration };
		}
	}

	extractPOSErrorMessagesMap(payload: Object): Object {
		const POSErrorMessagesMap = get(payload, "features/error_messages_map");

		if (!POSErrorMessagesMap || POSErrorMessagesMap === "") {
			console.log("POSErrorMessagesMap not found in consul");
			return {};
		} else {
			return { POSErrorMessagesMap: JSON.parse(POSErrorMessagesMap) };
		}
	}

	extractCustomizations(payload: Object): Object {
		return {
			logo: get(payload, "customizations/logo") || defaultLogo,
			styles: get(payload, "customizations/styles") || defaultStyles
		};
	}

	extractDisplayVersionInformation(payload: any): Object {
		const config = get(payload, "display_version_information");
		return {
			displayVersionInformation: config === "true"
		};
	}

	// Used by CMS asset create feature. Maximum size (kB) of upload file.
	// Converts the value read from Consul to integer if necessary.
	extractMaxUploadSize(payload: any): Object {
		const defaultMaxUploadSize = 2048;
		let maxUploadSize = get(
			payload,
			"max_upload_size",
			defaultMaxUploadSize
		);
		if (!isNumber(maxUploadSize)) {
			if (isString(maxUploadSize)) {
				maxUploadSize = toInteger(maxUploadSize);
			} else {
				maxUploadSize = defaultMaxUploadSize;
			}
		}
		return {
			maxUploadSize
		};
	}

	// Used by CMS asset create feature. Maximum number of files allowed in
	// a single upload request. Converts the value read from Consul to integer
	// if necessary.
	extractMaxUploadFiles(payload: any): Object {
		const defaultMaxUploadFiles = 12;
		let maxUploadFiles = get(
			payload,
			"max_upload_files",
			defaultMaxUploadFiles
		);
		if (!isNumber(maxUploadFiles)) {
			if (isString(maxUploadFiles)) {
				maxUploadFiles = toInteger(maxUploadFiles);
			} else {
				maxUploadFiles = defaultMaxUploadFiles;
			}
		}
		return {
			maxUploadFiles
		};
	}

	// Max number of items per page when paging applied to CMS lists/grids.
	// Converts the value read from Consul to integer if necessary.
	extractPagingSize(payload: any): Object {
		const defaultPagingSize = 4;
		let pagingSize = get(payload, "paging_size", defaultPagingSize);
		if (!isNumber(pagingSize)) {
			if (isString(pagingSize)) {
				pagingSize = toInteger(pagingSize);
			} else {
				pagingSize = defaultPagingSize;
			}
		}
		return {
			pagingSize
		};
	}

	extractServices(payload: any): Object {
		return {
			services: {
				pos: get(payload, "omnichannel_pos_service_name"),
				b2c: get(payload, "omnichannel_b2c_service_name"),
				cms_mss: get(
					payload,
					"omnichannel_cms_mediasharingservice_service_name"
				),
				cms_admin: get(payload, "omnichannel_cms_admin_service_name"),
				cms: get(payload, "omnichannel_cms_extip_service_name")
			}
		};
	}

	extractDisplayOptions(payload: any): Object {
		return {
			features: {
				pos: this.getParsedConsulValue(
					payload,
					"features/display_options"
				)
			}
		};
	}

	getParsedConsulValue(payload: any, key: string): Object {
		const configuredFields = get(payload, key);

		if (configuredFields) {
			try {
				const value = JSON.parse(configuredFields);
				return value;
			} catch (e) {
				console.error(`Unable to parse config "${key}"`, e);
			}
		}
		return {};
	}

	extractB2cConfiguration(payload: any) {
		const simCardPinsUnmasked =
			get(payload, "digilife/things/sim_card_pins_unmasked") === "true";
		const numberOfBundles = get(payload, "shop/number_of_bundles");

		/* number of orders showed on /digilife/orders
		 * fall back value: 10
		*/
		const pagination_limit_config_value = get(
			payload,
			"digilife/orders/pagination_limit",
			10
		);

		const mdmConfigurationUrl = get(
			payload,
			"features/mdm_configuration_url"
		);

		const pagination_limit = isString(pagination_limit_config_value)
			? toInteger(pagination_limit_config_value)
			: pagination_limit_config_value;

		const actionsEnabledConfig = get(
			payload,
			"digilife/things/addons/actions_enabled"
		);
		const actionsEnabled =
			trim(actionsEnabledConfig) === "true" ||
			actionsEnabledConfig === null;

		const b2c_configuration = {
			digilife: {
				things: {
					sim_card_pins_unmasked: simCardPinsUnmasked,
					addons: {
						actionsEnabled
					}
				},
				orders: {
					pagination_limit
				}
			},
			features: {
				mdm_configuration_url: mdmConfigurationUrl
			},
			shop: {
				number_of_bundles: numberOfBundles
			}
		};
		return { b2c_configuration };
	}
	extractDefaultLanguage(payload: any) {
		const defaultLanguage = get(payload, "default_language", "eng");
		return {
			defaultLanguage
		};
	}

	extractSkipCmsRequests(payload: any) {
		const skipCmsRequests =
			get(payload, "skip_cms_requests") === "true" ? true : false;
		return { skipCmsRequests };
	}

	extractServiceNameHeaderValue(payload: any) {
		const serviceNameHeaderValue = get(
			payload,
			"service_name_header_value"
		);
		return { serviceNameHeaderValue };
	}

	extractEnvironmentVariables(payload: Object) {
		return {
			env: {
				SERVICE_NAME: get(payload, "env/SERVICE_NAME"),
				IS_RUNTIME: get(payload, "env/IS_RUNTIME")
			}
		};
	}

	extractRechargePurchaseVariables(payload: Object) {
		return {
			rechargePurchaseConfig: {
				rechargePurchaseStream: get(
					payload,
					"recharge-purchases/rechargePurchaseStream"
				)
			}
		};
	}

	// reservation is required by default (if no value specified ibn consul)
	extractMsisdnReservationRequired(payload: Object) {
		const msisdnReservationRequiredRaw =
			payload["features/msisdn_reservation"];
		return {
			msisdnReservationRequired:
				msisdnReservationRequiredRaw === undefined ||
				msisdnReservationRequiredRaw.toLowerCase() === "true"
		};
	}

	extractIdentifications(payload: Object) {
		return {
			features: {
				identifications: this.getParsedConsulValue(
					payload,
					"features/identifications"
				)
			}
		};
	}

	extractLocations(payload: Object) {
		return {
			locations:  this.getParsedConsulValue(
					payload,
					"locations"
				)
		};
	}
}
