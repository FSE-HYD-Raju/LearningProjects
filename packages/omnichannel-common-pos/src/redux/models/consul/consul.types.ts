"use strict";

import { MomentBuiltinFormat } from "moment";
import { Country, Gender, IdentificationType } from "../../types";

type ConsulValues = Record<string, any>;

type LocaleItem = {
	locale: string;
	iso6392: string;
	messages: any;
};

type SearchConfiguration = {
	id: string;
	enabled: boolean;
	identificationType?: string;
};

type POSSearchConfiguration = {
	POSSearchConfigs: Array<SearchConfiguration>;
};

type ICCIDValidationConditions = {
	resourceStockName: string;
	simStatus: Array<string>;
};

type Locations = {
	cities?: Array<{
		cityName: string,
		provinceCode: number
	}>;
	provinces?: Array<{
		provinceName: string,
		provinceCode: number
	}>;
};

interface ConsulB2CConfiguration {
	digilife: {
		things: {
			sim_card_pins_unmasked: boolean;
			addons: {
				actionsEnabled: boolean;
			};
		};
		orders: {
			pagination_limit: number;
		};
	};
	features: {
		mdm_configuration_url?: string;
		products: {
			enable_usage_counters_from_events_calculation: boolean;
		};
	};
	shop: {
		number_of_bundles?: number;
	};
}
interface RechargePurchaseConfigType {
	rechargePurchaseStream?: string;
	rechargePurchaseSubChannelToStreamMap?: Record<string, string>;
	rechargePurchaseSubstream?: string;
}
type ConsulState = {
	initialized: boolean;
	services: object;
	serviceLocations: Record<string, string>;
	displayVersionInformation: boolean;
	sslInUse: boolean;
	locale: LocaleItem["locale"];
	iso6392: LocaleItem["iso6392"];
	messages: LocaleItem["messages"];
	locales?: Array<LocaleItem>;
	isUserSetLocale: boolean;
	logo: string;
	styles?: string;
	countries: Array<Country>;
	languages: Array<{ code: string; name: string; locale: string }>;
	genders: Array<Gender>;
	maritalStatuses: Array<string>;
	registrationFormAdditionalFields?: Array<any>;
	javaDateStringFormat: MomentBuiltinFormat;
	icc_subtype_display: {
		dropdown: Array<"dropdown" | string>;
		radio: Array<"radio" | string>;
	};
	brand: string;
	features: Record<string, any>;
	locations: Locations;
	defaultLanguage: string;
	searchConfigs: string;
	serviceNameHeaderValue: string;
	displayOptions: {
		organizationIdentification: Array<IdentificationType>;
		identification: Array<any>;
		customerDataForm: any;
	};
	ICCIDValidationConditions: ICCIDValidationConditions;
	categoriesBlacklist: Array<string>;
	msisdnReservationRequired: boolean;
	checkoutMsisdnValidationRegex?: string;
	b2c_configuration: ConsulB2CConfiguration;
	rechargePurchaseConfig: RechargePurchaseConfigType;
	payment_manager: {
		reservation_amount_for_creditcard_tokenization: number;
	};
	documentIdentifications: any;
	customerCreationMandatoryFields: Array<any>;
	customerIdentificationValidationEnabled: boolean;
	logFormValidationErrors: boolean;
	logSchemaDiscrepancies: boolean;
	dataUsageLimits: {
		nationalLimitOptions: Array<number>;
		roaminglLimitOptions: Array<number>;
	};
	skipCmsRequests: boolean;
};

export {
	ConsulState,
	ConsulValues,
	LocaleItem,
	SearchConfiguration,
	POSSearchConfiguration,
	ICCIDValidationConditions,
	Locations,
	ConsulB2CConfiguration,
	RechargePurchaseConfigType
};
