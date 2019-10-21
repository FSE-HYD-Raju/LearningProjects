"use strict";

import { get, isEmpty } from "lodash";

import { AppState } from "../../reducers";
import { featureInitialState } from "./feature.reducers";
import { withFunctionCustomization } from "../../../customization/customization";

import { CommonFunctionCustomizationPoints } from "../../../customization/points";

import { FeatureState } from "./feature.types";
import { DomainContext } from "../../types/DomainContext";
import { ConsulValues } from "../consul/consul.types";
import {
	getParsedValue,
	getSafeParsedValue,
	getPriceAttributeValue,
	getCountryOptions,
	getValue
} from "../../utils";
import { isChannelB2c } from "../../../utils/Channel.utils";

import { extractChangeSimValues } from "../eCare/changeSim/changeSim.feature";
import { extractProductLoanValues } from "../productLoan/productLoan.feature";
import { extractActivateSimValues } from "../eCare/activateSim/activateSim.utils";
import { extractSuspensionValues } from "../eCare/suspension/suspension.feature";
import { productToBasketItem } from "./feature.types";
import { eCareFeatureParser } from "./eCare/ECareFeatureParser";
import { DEFAULT_DATE_TIME_CONFIG } from "../../../channelUtils/Time";

function extractValues(payload: ConsulValues, state: Partial<FeatureState>): Partial<FeatureState> {
	const priceAttribute = getPriceAttributeValue(get(payload, "features/eshop/price_attribute"), "taxFreeAmount");

	window.dateConfig = getSafeParsedValue(get(payload, "features/date_format_config"), DEFAULT_DATE_TIME_CONFIG);

	// TODO until a module multiple loading issue exist in app use window.dateConfig
	// Time.dateConfig = getSafeParsedValue(get(payload, "features/date_format_config"), DEFAULT_DATE_TIME_CONFIG);
	return {
		// don't use lodashes defaultValue with getParsedValue(). Use getParsedValue(value, defaultValue) instead.
		// In error cases getParsedValue returns defaultValue. That is undefined if not set.
		backToShoppingLinkURL: get(payload, "features/back_to_shopping_link_url", "/"),
		registrationFormEnabled: get(payload, "features/registration_form_enabled") === "true",
		enableRoleChecking: get(payload, "features/enable_role_checking") === "true",
		operatorList: getParsedValue(get(payload, "features/eshop/operator_list"), []),
		hostOperator: getParsedValue(get(payload, "features/eshop/host_operator")),
		editProfileUrl: get(payload, "features/external_edit_profile_url"),
		changePasswordUrl: get(payload, "features/change_password_url"),
		googleMapKey: get(payload, "features/google_map_key"),
		marketingConsentPos: getSafeParsedValue(get(payload, "features/ecare/marketing-consent/marketing_pos"), []),
		processingOfPersonalDataUrl: get(payload, "features/ecare/marketing-consent/processing_of_personal_data_url"),
		marketingConsent: getParsedValue(get(payload, "features/marketing_consent")),
		portInProductIdentifier: getParsedValue(get(payload, "features/port_in"), null),
		phoneDirectoryRegistrationConsentIdentifier: getParsedValue(get(payload, "features/register_to_phone_directory")),
		mapMarketingConsentAliasToProductCharacteristic: getParsedValue(get(payload, "features/marketing_consent_aliases"), null),
		mapPhoneDirectoryRegistrationConsentAliasToProductCharacteristic: getParsedValue(get(payload, "features/phone_directory_registration_aliases"), null),
		mapPortInConfigurationAliasToProductCharacteristics: getParsedValue(get(payload, "features/port_in_configuration_aliases"), null),
		ecareRecurringTopUpsIdentifier: getParsedValue(get(payload, "features/ecare/recurring_top_up"), null),
		recurringTopUpsIdentifier: getParsedValue(get(payload, "features/recurring_top_up"), null),
		recurringTopUpsAliases: getParsedValue(get(payload, "features/recurring_top_up_aliases"), null),
		mdmConfigurationUrl: get(payload, "features/mdm_configuration_url"),
		enableCookieMessage: get(payload, "features/show_cookie_consent") === "true",
		enableCheckoutDeliveryMap: get(payload, "features/checkout_delivery_map_enabled") === "true",
		enableOverviewMyBalances: get(payload, "features/overview_my_balances_enabled") === "true",
		enableOverviewMyPeople: get(payload, "features/overview_my_people_enabled", "false") === "true",
		enableOverviewCompactProductsList: get(payload, "features/overview_compact_products_list_enabled", "false") === "true",
		enableSubscriptionSummaryGraphLayout: get(payload, "features/subscription_summary_graph_layout_enabled", "false") === "true",
		placesOfBirth: getParsedValue(get(payload, "features/places_of_birth")),
		homeDeliveryProducts: getSafeParsedValue(get(payload, "features/eshop/home_delivery_products"), []),
		checkoutDeliveryIdentificationsKey: get(payload, "features/eshop/checkout_delivery_identifications_key"),
		ecareThresholdValues: getSafeParsedValue(get(payload, "features/ecare/threshold_values"), []),
		ecareThresholdTopUpValues: getSafeParsedValue(get(payload, "features/ecare/threshold_top_up_values"), []),
		ecareLimitInMonthValues: getSafeParsedValue(get(payload, "features/ecare/limit_in_month_values"), []),
		ecareWeeklyTopUpValues: getSafeParsedValue(get(payload, "features/ecare/weekly_top_up_values"), []),
		ecareMonthlyTopUpValues: getSafeParsedValue(get(payload, "features/ecare/monthly_top_up_values"), []),
		ecarePlanCategoriesIds: getSafeParsedValue(get(payload, "features/ecare/plan_categories_ids"), []),
		topUpAmountValues: getSafeParsedValue(get(payload, "features/top_up_amount_values"), []),
		privacySettingsKeys: getParsedValue(get(payload, "features/privacy_settings_keys"), null),
		hideChildBasketItemPrices: get(payload, "features/basket/hide_child_item_prices", "true") === "true",
		disableBasketSubmit: get(payload, "features/basket/disable_basket_submit", "false") === "true",
		disableMaxSubscriptionsInBasketMessage: get(payload, "features/basket/disable_max_subscriptions_in_basket_message", "false") === "true",
		basketMaxItemsLimits: getSafeParsedValue(get(payload, "features/basket/limit_max_items"), []),
		disableContractCheck: get(payload, "features/disable_contract_check", "false") === "true",
		gsmAuthorizationDisableMaxTimeInMinutes:
			parseInt(get(payload, "features/disable_gsm_auth_cookie_expiration_time_in_minutes"), 10) || state.gsmAuthorizationDisableMaxTimeInMinutes,
		nominationPOCharacteristics: getParsedValue(get(payload, "features/nomination_po_characteristics_config"), null),
		smsDialogPOConfig: getParsedValue(get(payload, "features/sms_dialog_po_config"), null),
		cashPaymentIdentifiers: get(payload, "features/cash_payment_identifiers", []),
		msisdnUseInventories: getParsedValue(get(payload, "features/msisdn_use_inventories"), null),
		msisdnReservationMinutes: getParsedValue(get(payload, "features/msisdn_reservation_minutes"), null),
		msisdnReservationNumberCount: parseInt(get(payload, "features/msisdn_reservation_number_count", "9"), 10),
		msisdnPatternSearchInputValidation: get(payload, "features/msisdn_pattern_search_input_validation", ""),
		disabilityPOConfig: getParsedValue(get(payload, "features/tarifa_solidaria_po_config"), null),
		smartPostManIdentification: getParsedValue(get(payload, "features/eshop/smartpostman_identification"), null),
		paymentGatewayIdentifier: getParsedValue(get(payload, "features/payment_gateway_identifier"), null),
		brandToTenantMap: getSafeParsedValue(get(payload, "features/eshop/brand_to_tenant_map"), {}),
		internalCharacteristicsConfiguration: getParsedValue(get(payload, "features/internal_characteristics_configuration")),
		enableChangeSubscription: get(payload, "features/enableChangeSubscription", "false") === "true",
		enableChangeCustomerData: get(payload, "features/enableChangeCustomerData", "false") === "true",
		showActionsForPlans: get(payload, "features/showActionsForPlans", "true") === "true",
		birthDayAgeLimit: get(payload, "features/birthDayAgeLimit", "18"),
		deliveryOptionsGroup: get(payload, "features/delivery_options_group"),
		enableOTP: get(payload, "features/eshop/enable_one_time_password") === "true",
		OTPConfiguration: getParsedValue(get(payload, "features/eshop/one_time_password_configuration"), null),
		suspensionReasons: getParsedValue(get(payload, "features/ecare/suspension_reasons"), null),
		ecareChangeSim: extractChangeSimValues(payload),
		ecareProductLoan: extractProductLoanValues(payload),
		posShowSummaryData: get(payload, "features/posShowSummaryData", "false") === "true",
		hardBundleCharacteristicMatcher: getParsedValue(get(payload, "features/eshop/hardbundle_characteristic_matcher"), {
			CH_Bundle_Type: {
				name: "CH_Bundle_Type",
				values: [
					{
						name: "hardbundle",
						value: "hardbundle"
					}
				]
			}
		}),
		streetTypes: getSafeParsedValue(get(payload, "features/CH_ETG/street_types"), []),
		changeMsisdnConfigurations: getSafeParsedValue(get(payload, "features/change-msisdn/configurations"), {
			po: "PO_change_msisdn",
			eligibilityCheckRequired: false,
			patternSearchValidationRegex: "^\\d+$"
		}),
		topUpLinkRedirectUrl: get(payload, "features/ecare/top_up_link_redirect_url"),
		orderDeliveryProducts: getSafeParsedValue(get(payload, "features/ecare/order_delivery_products"), []),
		priceAttribute: getPriceAttributeValue(get(payload, "features/eshop/price_attribute"), "taxFreeAmount"),
		securedRoutes: getSafeParsedValue(get(payload, "features/secured_routes"), isChannelB2c() ? ["/digilife"] : [""]),
		validPortInLifecycleStatus: getSafeParsedValue(get(payload, "features/eshop/valid_portin_lifecycle_status"), []),
		supportCaseCategories: getSafeParsedValue(get(payload, "features/ecare/support_case_categories"), []),
		enableBasketSelection: get(payload, "features/enable_basket_selection") === "true",
		oneForm: get(payload, "features/eshop/one_persondetails_form") === "true",
		documentIdTypes: getSafeParsedValue(get(payload, "features/eshop/document_id_types"), {}),
		eShopBuyNowButtonEnabled: get(payload, "features/eshop/simple-subscription/buy_now_button_enabled") === "true",
		hideCreateOrganizationButton: get(payload, "features/hide_create_organization_button") === "true",
		portInDaysToAdd: parseInt(get(payload, "features/eshop/port_in_days_to_add"), 0),
		displayExtendedAddressForm: get(payload, "features/eshop/display_extended_address_form") === "true",
		sendCheckoutCompleteNotification: get(payload, "features/send_checkout_complete_notification") === "true",
		activateSimConfiguration: extractActivateSimValues(payload),
		suspensionConfiguration: extractSuspensionValues(payload),
		characteristicsAliases: getSafeParsedValue(get(payload, "features/characteristics_aliases"), {}),
		ICCIDValidationPOs: getSafeParsedValue(get(payload, "features/iccid_validation_product_offerings"), []),
		POSErrorMessagesMap: getParsedValue(get(payload, "features/error_messages_map")),
		ICCIDPreactivationValidationPOs: getSafeParsedValue(get(payload, "features/iccid_preactivation_validation_product_offerings"), []),
		linkToPrivacyStatement: get(payload, "features/link_to_privacy_statement"),
		paymentMethodRelationId: getParsedValue(get(payload, "features/eshop/paymentmethod_relation_id"), null),
		singleSubscriptionNavigationActive: get(payload, "features/ecare/navigation/single_subscription") === "true",
		enableDomainContextMapping: get(payload, "features/enable_domain_context_mapping") === "true",
		showStockAvailability: get(payload, "features/pos/show_stock_availablity", "false") === "true",
		componentVisibility: getSafeParsedValue(get(payload, "features/ecare/component_visibility"), {}),
		tariffZones: getSafeParsedValue(get(payload, "features/ecare/consumptions/tariff_zones"), []),
		serviceTypes: getSafeParsedValue(get(payload, "features/ecare/consumptions/service_types"), []),
		loggedInCustomerScreeningEnabled: get(payload, "wind3/coexistence/logged_in_screening_enabled") === "true",
		hideAddonDisableOption: get(payload, "features/ecare/hide_addon_disable_option", "false") === "true",
		addonsStatusFilter: getSafeParsedValue(get(payload, "features/ecare/addons_status_filter"), state.addonsStatusFilter),
		addSubscriptionUrl: get(payload, "features/overview_add_subscription_url"),
		cardPaymentKeys: getParsedValue(get(payload, "features/card_payment_keys", {})),
		eCare: eCareFeatureParser(payload),
		productUsagePeriodFilterConfig: getSafeParsedValue(get(payload, "features/products/period_filter_config"), undefined),
		transactionsPeriodFilterConfig: getSafeParsedValue(get(payload, "features/ecare/transactions_period_filter_config"), undefined),
		eShopCompareProductsEnabled: Boolean(get(payload, "features/eshop/compare_products_enabled") !== "false"), // compare should be enabled by default
		customerBlacklistCheck: get(payload, "features/customer_blacklist_check") === "true",
		checkoutTopUpConfiguration: getSafeParsedValue(get(payload, "features/eshop/checkout/checkout_top_up_configuration"),
			featureInitialState.checkoutTopUpConfiguration),
		clearBasketRedirectLink: get(payload, "wind3/clear_basket_redirect_link", "/"),
		productUsageEventTypeExcludes: getSafeParsedValue(get(payload, "features/products/usageEventTypeExcludes"), []),
		hideIdentificationAtCheckoutPage: get(payload, "features/hide_identification_at_checkout_page") === "true",
		defaultCountryForResidentialAddress: getCountryOptions(get(payload, "features/eshop/default_country_for_residential_address")),
		delayAfterBasketSubmission: parseInt(get(payload, "features/ecare/delay_after_basket_submission", 3000), 0),
		showStartSessionButton: get(payload, "features/show_start_session_button") === "true",
		showDigitalSignature: get(payload, "features/toggle_digital_signature") === "true",
		digitalSignatureTemplateId: get(payload, "features/digital_signature_template_id", "F002"),
		hideBasketAfterXHours: parseInt(get(payload, "features/ecare/hide_basket_after_x_hours"), 0),
		uploadDocumentConfiguration: getSafeParsedValue(get(payload, "features/upload_document_configuration"), featureInitialState.uploadDocumentConfiguration),
		installationAddressDisplayFieldsTemplate:
			getValue(get(payload, "features/installation_address_display_fields_template"), state.installationAddressDisplayFieldsTemplate),
		installationTimeslotConfiguration:
			getSafeParsedValue(payload["features/installation_timeslot_configuration"], featureInitialState.installationTimeslotConfiguration),
		msisdnConfiguration: getSafeParsedValue(payload["features/msisdn_configuration"], featureInitialState.msisdnConfiguration),
		disableExternalPaymentForAddons: payload["features/disable_external_payment_for_addons"] === "true",
		enableNavbarInToolmode: payload["features/enable_navbar_in_toolmode"] === "true",
		portInPhoneNumberLength: Number(payload["features/port_in_phone_number_length"]) || state.portInPhoneNumberLength,
		nipNumberLength: Number(payload["features/nip_number_length"]) || state.nipNumberLength,
		patternNumberLength: Number(payload["features/pattern_number_length"]) || state.patternNumberLength,
		commercialProductOfferingId: payload["features/product_offering_groups/commercial_product_offering_id"],
	} as Partial<FeatureState>;
}

function transformDomainContextToKeyValueList(domainContext: DomainContext): string {
	const keys = Object.keys(domainContext);

	const paramPairs = keys
		.filter(key => {
			if (isEmpty(domainContext[key])) {
				return false;
			}

			switch (typeof domainContext[key]) {
				case "object":
				case "string":
					return true;
				default:
					return false;
			}
		})
		.map(key => {
			const value = domainContext[key];

			if (typeof value === "object") {
				const valueObjectKeys = Object.keys(value);
				return valueObjectKeys.map(vok => `${key}[${vok}]=${((value as any)[vok])}`);
			} else {
				return `${key}=${domainContext[key]}`;
			}
		});
	const paramString = paramPairs.join(",");

	return paramString;
}

const mapCustomizationDomainContextKeys = withFunctionCustomization(
	CommonFunctionCustomizationPoints.DOMAIN_CONTEXT_KEY_MAPPER,
	(state: AppState): Record<string, string> => {
		return {};
	}
);

const mapBaselineDomainContextKeys = (state: AppState): Record<string, string> => {
	return {};
};

const mapDomainContextKeys = (state: AppState): Record<string, string> => {
	return { ...mapBaselineDomainContextKeys(state), ...mapCustomizationDomainContextKeys(state) };
};

const customizationProductToBasketItem = withFunctionCustomization(
	CommonFunctionCustomizationPoints.ADD_PRODUCT_TO_BASKET_ITEM,
	(params: productToBasketItem) => {
		const {
			basketId,
			salesRepSessionStore,
			inputtedCharacteristics,
			parentBasketItemContainer,
			product,
			enhancedCharacteristics,
			targetAgreementId,
			targetProductId,
			getChildBasketItems
		} = params;
		return {
			attributes: {
				product: {
					id: get(product, "id")
				},
				quantity: 1,
				inputtedCharacteristics,
				enhancedCharacteristics,
				childBasketItems: getChildBasketItems(product, salesRepSessionStore),
				targetAgreementId,
				targetProductId,
			},
			type: "basketItems",
			relationships: {
				basket: {
					data: {
						id: basketId,
						type: "baskets"
					}
				},
				...parentBasketItemContainer
			}
		};
	}
);

export {
	customizationProductToBasketItem,
	extractValues,
	mapDomainContextKeys,
	transformDomainContextToKeyValueList,
};
