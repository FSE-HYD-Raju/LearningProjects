/* eslint no-undef: 0 */
declare type ConsulStoreState = {
	services: Object,
	displayVersionInformation: boolean,
	sslInUse: boolean,
	locale: string,
	iso6392: string,
	messages: Object,
	locales: ?Array<*>,
	isUserSetLocale: boolean,
	logo: ?string,
	styles: ?string,
	countries: Array<CountryType>,
	languages: Array<{
		code: string,
		name: string,
		locale: string
	}>,
	genders: Array<GendersType>,
	maritalStatuses: Array<
		"single" | "married" | "divorced" | "widowed" | "cohabiting"
	>,
	registrationFormAdditionalFields: ?Array<*>,
	javaDateStringFormat: string,
	icc_subtype_display: {
		dropdown: Array<"dropdown" | string>,
		radio: Array<"radio" | string>
	},
	defaultLanguage: string,
	searchConfigs: Object,
	msisdnReservationRequired: boolean,
	documentIdentifications: any
};
declare type GendersType = "male" | "female" | "other";
declare type CountryType = {
	code: string,
	name: string,
	locale: string
};
export {
	GendersType,
	CountryType,
	ConsulStoreState
};
