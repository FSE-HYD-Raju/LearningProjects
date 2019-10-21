"use strict";

import {
	FeatureIdentifierType,
	Characteristic,
	BasketItemLimit,
	BasketItemLimitArray,
	ChangeMsisdnConfigurations,
	NominationPOCharacteristicsConfig,
	TariffZone,
	ServiceType,
	ProductOffering,
} from "../../types";
import { ECareFeatureType } from "./eCare/ECareFeatureType";

export type FeatureIdentifierType = {
	key: string;
	values: Array<string>;
};

export type IdentificationType = {
	backendValue: string;
	localisation: { [key: string]: string; };
	identificationIssuingAuthority: boolean;
	identificationExpiryDate: boolean;
};

export interface DocumentIdentificationTypes {
	identification?: Array<IdentificationType>;
}

export type OperatorType = {
	name: string;
	operatorId: string;
	virtualDon?: string;
	iccid56: Array<string>;
};

export type CharacteristicsConfigurationType = {
	source: string;
	mandatory: string;
	value: string;
	characteristics: Array<object>;
};

export type smartPostManIdentificationType = {
	key: string;
	value: string;
};

export type MapMarketingConsent = {
	[key: string]: string;
	ownMarketing: string,
	thirdPartyMarketing: string,
	geoLocalization: string,
	profiling: string,
	thirdPartyEnrichment: string,
	thirdPartyTransfer: string
};

export type OneTimePasswordConfigurationType = {
	passwordRegEx: string;
	maxAttempts: number;
};

export type SuspensionReason = {
	topLevelPo: string;
	usedBundledItems: Array<string>;
};

export type BasketItemLimit = {
	specType?: string;
	specSubType?: string;
	maxItems: number;
};

export type BasketItemLimitArray = Array<BasketItemLimit>;

export type ChangeMsisdnConfigurationOptions = {
	category?: ChangeMsisdnOptionCategory;
	custom?: ChangeMsisdnOptionCustom;
};
export type ChangeMsisdnOptionCategory = {
	enabled: boolean;
	numberClasses?: Array<string>;
};
export type ChangeMsisdnOptionCustom = {
	enabled: boolean;
	po?: string;
};
export type ChangeMsisdnConfigurations = {
	po?: string;
	eligibilityCheckRequired?: boolean;
	patternSearchValidationRegex?: string;
};

export type ProductLoanConfigurationType = {
	loanCategoryId?: string;
	dueDateCharacteristicPurpose?: string;
};

export type ChangeSimConfigurationType = {
	POId?: string;
	changeSimPOSubscriptionIdCharacteristicName?: string;
	changeSimPOPaymentMethodCharacteristicName?: string;
	reasonPOFeeAmountCharacteristicName?: string;
	deliveryPOContactInfoCharacteristicName?: string;
	deliveryPOIdentificationIdCharacteristicName?: string;
	deliveryPOVerificationMethodCharacteristicName?: string;
	deliveryPOVerificationMethodCharacteristicValue?: string;
	activeSubscriptionReasonsPOIds?: string[];
	suspendedSubscriptionReasonsPOIds?: string[];
	identificationsTypePriority?: string[];
	caseCategoryId?: string;
};

export type ActivateSimConfigurationType = {
	verificationCharacteristicName?: string;
	iccidVerificationValue?: string;
	videoVerificationValue?: string;
	activatePOIds?: string[];
	deliveryPOIds?: string[];
};

export type SuspensionConfigurationType = {
	suspensionCharacteristicName?: string;
	categoryId?: string;
	purpose?: string;
};

export type SupportCaseCategoryType = {
	id: string;
	name: string;
};

export type TariffConfig = {
	zoneType: TariffZone;
	name: string;
};

export type ServiceConfig = {
	serviceType: ServiceType;
	name: string;
};

export type PosErrorMessages = {
	ErrorMessages: Array<{
		errCode: string,
		messageId: string,
		target: string,
		characteristic: string
	}>
};

export type VisibleComponents = {
	profile_interactions?: boolean;
	profile_things?: boolean;
	profile_security?: boolean;
	profile_troubleshooting?: boolean;
	profile_create_new_support_request?: boolean;
	subscription_change_msisdn?: boolean;
	orders_filter?: boolean;
	support?: boolean;
	quickActions?: boolean;
	edit_basket_button_ecare?: boolean;
};

export enum AddonsStatus {
	ALL = "ALL",
	AVAILABLE = "AVAILABLE",
	ACTIVE = "ACTIVE",
}

export type AddonsStatusFilterType = {
	visible: boolean;
	defaultStatus: AddonsStatus;
	statuses: Array<AddonsStatus>;
};

export type ProductUsagePeriodFilterConfig = {
	maxDaysBefore: number;
};

export type TransactionsPeriodFilterConfig = {
	maxDaysBefore: number;
};

export interface CountryOptions {
	country?: string;      /* Abbreviation of a country, confining to ISO 3166-1 alpha-2 standard */
	countryName?: string;  /* name of a country. HOX! if this does not match to localization, you're in trouble. */
}

export type InstallationTimeslotConfiguration = {
	dropdownLabel?: string;
	installationStartDateTimeCharacteristicKey?: string;
	installationEndDateTimeCharacteristicKey?: string;
	workOrderType?: string;
	countyField?: string;
	cityField?: string;
};

export type FeatureState = {
	birthDayAgeLimit: string;
	backToShoppingLinkURL: string;
	registrationFormEnabled: boolean;
	enableCookieMessage: boolean;
	enableRoleChecking: boolean;
	cmsContentSpots: boolean;
	changePasswordUrl?: string;
	googleMapKey?: string;
	editProfileUrl?: string;
	marketingConsentPos?: string[];
	processingOfPersonalDataUrl?: string;
	marketingConsent?: FeatureIdentifierType;
	mapMarketingConsentAliasToProductCharacteristic?: MapMarketingConsent;
	paymentGatewayIdentifier?: FeatureIdentifierType;
	portInProductIdentifier?: FeatureIdentifierType;
	phoneDirectoryRegistrationConsentIdentifier?: FeatureIdentifierType;
	recurringTopUpsIdentifier?: FeatureIdentifierType;
	mapPhoneDirectoryRegistrationConsentAliasToProductCharacteristic: Record<string, string>;
	mapPortInConfigurationAliasToProductCharacteristics: Record<string, string>;
	ecareRecurringTopUpsIdentifier?: FeatureIdentifierType;
	recurringTopUpsAliases?: Record<string, string>;
	hideChildBasketItemPrices?: boolean;
	enableCheckoutDeliveryMap: boolean;
	enableNavbarInToolmode: boolean;
	enableOverviewMyBalances: boolean;
	enableOverviewMyPeople: boolean;
	enableOverviewCompactProductsList: boolean;
	enableSubscriptionSummaryGraphLayout: boolean;
	disableBasketSubmit?: boolean;
	disableMaxSubscriptionsInBasketMessage?: boolean;
	basketMaxItemsLimits?: BasketItemLimitArray;
	disableContractCheck?: boolean;
	mdmConfigurationUrl?: string;
	privacySettingsKeys: null;
	thresholdValues?: Array<number>;
	thresholdTopUpValues?: Array<number>;
	homeDeliveryProducts: Array<string>
	limitInMonthValues?: Array<number>;
	weeklyTopUpValues?: Array<number>;
	monthlyTopUpValues?: Array<number>;
	checkoutDeliveryIdentificationsKey?: string | null;
	ecareThresholdValues?: Array<number>;
	ecareThresholdTopUpValues?: Array<number>;
	ecareLimitInMonthValues?: Array<number>;
	ecareWeeklyTopUpValues?: Array<number>;
	ecareMonthlyTopUpValues?: Array<number>;
	ecarePlanCategoriesIds: string[];
	operatorList?: Array<OperatorType>;
	hostOperator?: OperatorType;
	gsmAuthorizationDisableMaxTimeInMinutes: number;
	nominationPOCharacteristics: NominationPOCharacteristicsConfig | null;
	msisdnUseInventories: boolean;
	msisdnReservationMinutes: null;
	msisdnReservationNumberCount: number,
	msisdnPatternSearchInputValidation: string,
	brandToTenantMap: Record<string, string>;
	smsDialogPOConfig?: any;
	internalCharacteristicsConfiguration?: CharacteristicsConfigurationType;
	enableChangeSubscription: boolean;
	enableChangeCustomerData: boolean;
	showActionsForPlans: boolean;
	cashPaymentIdentifiers: Array<string>;
	smartPostManIdentification?: smartPostManIdentificationType;
	deliveryOptionsGroup?: string;
	enableOTP: boolean;
	OTPConfiguration?: OneTimePasswordConfigurationType;
	suspensionReasons?: SuspensionReason;
	ecareChangeSim?: ChangeSimConfigurationType;
	ecareProductLoan?: ProductLoanConfigurationType;
	hardBundleCharacteristicMatcher: Record<string, Partial<Characteristic>> | null;
	streetTypes: Array<string>;
	orderDeliveryProducts: Array<string>;
	topUpLinkRedirectUrl?: string;
	priceAttribute: string;
	securedRoutes: Array<string>;
	validPortInLifecycleStatus: Array<string>;
	changeMsisdnConfigurations: ChangeMsisdnConfigurations;
	supportCaseCategories: Array<SupportCaseCategoryType>;
	enableBasketSelection: boolean;
	POSErrorMessagesMap: PosErrorMessages;
	characteristicsAliases: Record<string, string>;
	ICCIDValidationPOs: Array<string>;
	ICCIDPreactivationValidationPOs: Array<string>;
	sendCheckoutCompleteNotification: boolean;
	activateSimConfiguration: ActivateSimConfigurationType;
	suspensionConfiguration: SuspensionConfigurationType;
	documentIdTypes: DocumentIdentificationTypes;
	oneForm: boolean;
	placesOfBirth?: string;
	eShopBuyNowButtonEnabled: boolean;
	eShopCompareProductsEnabled: boolean;
	hideCreateOrganizationButton: boolean;
	portInDaysToAdd: number;
	displayExtendedAddressForm: boolean;
	linkToPrivacyStatement?: string;
	paymentMethodRelationId?: string;
	singleSubscriptionNavigationActive: boolean;
	enableDomainContextMapping: boolean;
	showStockAvailability: boolean;
	tariffZones: TariffConfig[];
	serviceTypes: ServiceConfig[];
	componentVisibility: VisibleComponents;
	loggedInCustomerScreeningEnabled: boolean;
	hideAddonDisableOption?: boolean;
	addonsStatusFilter: AddonsStatusFilterType;
	posShowSummaryData: boolean;
	addSubscriptionUrl?: string;
	eCare: ECareFeatureType;
	cardPaymentKeys: Record<string, string>;
	dateFormatConfig: Record<string, string>;
	productUsagePeriodFilterConfig?: ProductUsagePeriodFilterConfig;
	transactionsPeriodFilterConfig?: TransactionsPeriodFilterConfig;
	checkoutTopUpConfiguration: CheckoutTopUpConfiguration;
	customerBlacklistCheck: boolean;
	clearBasketRedirectLink: string;
	productUsageEventTypeExcludes: Array<string>;
	hideIdentificationAtCheckoutPage: boolean;
	defaultCountryForResidentialAddress?: CountryOptions;
	delayAfterBasketSubmission: number;
	showStartSessionButton: boolean;
	showDigitalSignature: boolean;
	digitalSignatureTemplateId: string;
	hideBasketAfterXHours: number;
	uploadDocumentConfiguration: UploadDocumentConfiguration;
	installationAddressDisplayFieldsTemplate: string;
	installationTimeslotConfiguration?: InstallationTimeslotConfiguration;
	msisdnConfiguration: MsisdnConfigurationValidation;
	disableExternalPaymentForAddons: boolean;
	portInPhoneNumberLength: number;
	nipNumberLength: number;
	patternNumberLength: number;
	commercialProductOfferingId: string;
};

export type productToBasketItem = {
	basketId: string;
	enhancedCharacteristics: Record<string, Array<any>>;
	inputtedCharacteristics: Record<string, string>;
	targetAgreementId: string;
	targetProductId: string;
	salesRepSessionStore: any;
	parentBasketItemContainer: any | {};
	product: ProductOffering;
	getChildBasketItems: (product: ProductOffering, salesRepSessionStore: any) => void;
};


export type CheckoutTopUpConfiguration = {
	topUpAmount: string;
	thresholdValue: string;
	monthlyLimit: string;
};

export type UploadDocumentConfiguration = {
	mandatory: boolean;
	isEnabled: boolean;
	acceptedFileFormats: Array<string>;
};

export type MsisdnConfigurationValidation = {
	countryCode: number;
};
