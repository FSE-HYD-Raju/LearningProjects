"use strict";

import { FeatureActionPayload, FeatureActions } from "./feature.actions";
import { AddonsStatus, FeatureState } from "./feature.types";
import { ConsulValues } from "../consul/consul.types";
import { extractValues } from "./feature.utils";
import { ECareFeatureInitialValue } from "./eCare/ECareFeatureInitialValue";

export { FeatureState } from "./feature.types";

const installationAddressDisplayFieldsTemplate = "<div> \
						<p>city postOfficeBox</p> \
						<p>county coAddress</p> \
						<p>street building postalCode</p> \
						<p>room</p> \
					</div>";

// Please set default value here or mark field as optional
const initialState: FeatureState = {
	birthDayAgeLimit: "18",
	backToShoppingLinkURL: "/",
	registrationFormEnabled: false,
	enableRoleChecking: false,
	cmsContentSpots: false,
	enableCookieMessage: true,
	enableCheckoutDeliveryMap: true,
	enableOverviewMyBalances: true,
	enableOverviewMyPeople: true,
	enableOverviewCompactProductsList: true,
	enableSubscriptionSummaryGraphLayout: true,
	disableBasketSubmit: false,
	disableMaxSubscriptionsInBasketMessage: false,
	basketMaxItemsLimits: [],
	disableContractCheck: false,
	thresholdValues: [],
	gsmAuthorizationDisableMaxTimeInMinutes: 30,
	msisdnUseInventories: false,
	enableChangeSubscription: false,
	showActionsForPlans: true,
	enableBasketSelection: false,
	documentIdTypes: {},
	msisdnReservationNumberCount: 9,
	msisdnPatternSearchInputValidation: "",
	POSErrorMessagesMap: {
		ErrorMessages: []
	},
	characteristicsAliases: {},
	ICCIDValidationPOs: [],
	ICCIDPreactivationValidationPOs: [],
	mapPhoneDirectoryRegistrationConsentAliasToProductCharacteristic: {},
	mapPortInConfigurationAliasToProductCharacteristics: {},
	privacySettingsKeys: null,
	homeDeliveryProducts: [],
	nominationPOCharacteristics: null,
	msisdnReservationMinutes: null,
	brandToTenantMap: {},
	cashPaymentIdentifiers: [],
	enableOTP: false,
	hardBundleCharacteristicMatcher: {},
	streetTypes: [],
	orderDeliveryProducts: [],
	securedRoutes: [],
	validPortInLifecycleStatus: [],
	supportCaseCategories: [],
	sendCheckoutCompleteNotification: false, // TODO: set proper default value or allow undefined
	activateSimConfiguration: {},
	suspensionConfiguration: {
		purpose: "activate"
	},
	oneForm: false, // TODO: set proper default value or allow undefined
	eShopBuyNowButtonEnabled: false, // TODO: set proper default value or allow undefined
	hideCreateOrganizationButton: false, // TODO: set proper default value or allow undefined
	portInDaysToAdd: 1, // TODO: set proper default value or allow undefined
	displayExtendedAddressForm: false, // TODO: set proper default value or allow undefined,
	priceAttribute: "taxFreeAmount",
	singleSubscriptionNavigationActive: false,
	enableDomainContextMapping: false,
	changeMsisdnConfigurations: {},
	showStockAvailability: false,
	componentVisibility: {},
	ecarePlanCategoriesIds: [],
	eShopCompareProductsEnabled: true,
	tariffZones: [],
	serviceTypes: [],
	loggedInCustomerScreeningEnabled: false,
	enableChangeCustomerData: false,
	dateFormatConfig: {},
	addonsStatusFilter: {
		visible: true,
		defaultStatus: AddonsStatus.ALL,
		statuses: [AddonsStatus.ALL, AddonsStatus.AVAILABLE, AddonsStatus.ACTIVE],
	},
	posShowSummaryData: true,
	eCare: ECareFeatureInitialValue,
	cardPaymentKeys: {},
	customerBlacklistCheck: false,
	clearBasketRedirectLink: "/",
	checkoutTopUpConfiguration: {
		topUpAmount: "CH_TopUp_Amount",
		thresholdValue: "CH_Threshold_Value",
		monthlyLimit: "CH_Monthly_TopUp_Limit",
	},
	productUsageEventTypeExcludes: [],
	thresholdTopUpValues: [],
	limitInMonthValues: [],
	weeklyTopUpValues: [],
	monthlyTopUpValues: [],
	ecareThresholdValues: [],
	ecareThresholdTopUpValues: [],
	ecareLimitInMonthValues: [],
	ecareWeeklyTopUpValues: [],
	ecareMonthlyTopUpValues: [],
	hideIdentificationAtCheckoutPage: false,
	delayAfterBasketSubmission: 3000,
	showStartSessionButton: false,
	showDigitalSignature: false,
	digitalSignatureTemplateId: "FOO2",
	hideBasketAfterXHours: 6,
	uploadDocumentConfiguration: {
		mandatory: false,
		isEnabled: false,
		acceptedFileFormats: []
	},
	installationAddressDisplayFieldsTemplate,
	installationTimeslotConfiguration: {},
	msisdnConfiguration: {
		countryCode: 591
	},
	disableExternalPaymentForAddons: false,
	enableNavbarInToolmode: false,
	portInPhoneNumberLength: 12,
	nipNumberLength: 5,
	patternNumberLength: 10,  
	commercialProductOfferingId: "GRP_Select_Commercial_offer",
};

const featureReducer = (state: Partial<FeatureState> = initialState, action: FeatureActionPayload) => {
	const { type } = action;
	switch (type) {
		case FeatureActions.SET_VALUES:
			return { ...state, ...extractValues(action.values as ConsulValues, state) };
		case FeatureActions.ENABLE_COOKIE_MESSAGE:
			return {
				...state,
				enableCookieMessage: action.enableCookie
			};
		default:
			return state;
	}
};

export default featureReducer;
export {
	initialState as featureInitialState
};
