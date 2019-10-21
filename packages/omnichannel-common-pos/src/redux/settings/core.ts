"use strict";

const omnichannel_crnk = (endpoint: string): string => `/omnichannel-api/api/v0/${endpoint}`;
const omnichannel_rest = (endpoint: string): string => `/omnichannel-api/api/rest/${endpoint}`;
const cms_crnk = (endpoint: string): string => `/omnichannel-cms-api/api/v0/${endpoint}`;

const REST = {
	CATEGORIES: omnichannel_rest("categories"),
	CALL_FORWARDING_SERVICE: omnichannel_crnk("call-forwarding-service-modify"),
	CONSUL: {
		ALL: "/consul/all",
		SERVICES: "/consul/services",
	},

	CHECKOUT: {
		SEND_CHECKOUT_COMPLETE_NOTIFICATION: omnichannel_crnk("notification-message"),
	},

	CUSTOMER_ACCOUNTS: omnichannel_crnk("customerAccounts"),

	INFO: {
		ARTIFACTS: "/qartifact-info",
	},

	LOCATION: {
		LOCATION: omnichannel_rest("location"),
		GEOLOCATION: omnichannel_rest("geolocation"),
		POSTAL_ADDRESS: omnichannel_rest("postal-address"),
		INSTALLATION_ADDRESS: omnichannel_rest("installation-address"),
		AVAILABILITY_ADDRESS: omnichannel_rest("postal-address/availabilities"),
		VALIDATE_ADDRESS: omnichannel_rest("postal-address/validate"),
	},

	OAUTH2: {
		LOGIN: omnichannel_rest("oauth2/authorize"),
		CALLBACK: omnichannel_rest("oauth2/callback"),
		LOGOUT: omnichannel_rest("oauth2/logout"),
		REFRESH: omnichannel_rest("oauth2/refresh"),
	},

	PAYMENT: {
		GET_CONTEXTUAL_PAYMENT_METHODS: omnichannel_crnk("contextualPaymentMethods"),
		SELECT_CONTEXTUAL_PAYMENT_METHODS: omnichannel_crnk("contextualPayments"),
		VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA: omnichannel_crnk("contextualPaymentValidations"),
		CUSTOMER_PAYMENT_METHODS: omnichannel_crnk("payment-methods"),
	},

	PERSONAL_INFO: {
		PHONE_NUMBER_MOBILE: omnichannel_rest("phone-number/mobile"),
		PHONE_NUMBER_FIXED: omnichannel_rest("phone-number/fixed"),
		CONTACT_EMAIL_ADDRESS: omnichannel_rest("email-address"),
	},

	PERSONS: omnichannel_crnk("persons"),
	AGREEMENTS: omnichannel_crnk("agreements"),
	CUSTOMER_INTERACTIONS: omnichannel_crnk("customer-interactions"),

	ORGANIZATION: omnichannel_crnk("organizations"),

	PORT_IN_DECISIONS: omnichannel_crnk("portInDecisions"),

	ELIGIBILITY: {
		ELIGIBILITY_DECISIONS: omnichannel_crnk("eligibility-decisions"),
		ELIGIBILITY_OPTIONS: omnichannel_crnk("bss/api/eligibilities/eligibility-options"),
	},

	PRODUCT_OFFERINGS: {
		GET_PRODUCT_OFFERING_BY_ID: omnichannel_crnk("productOfferings"),
	},
	CONTEXTUAL_PRODUCTS: {
		GET_PRODUCTS: omnichannel_crnk("contextualProducts"),
	},

	BASKETS: {
		BASKETS: omnichannel_crnk("baskets"),
		BASKET_ITEMS: omnichannel_crnk("basketItems"),
		BASKET_PRODUCTS: omnichannel_crnk("basket-products"),
		BASKET_SUBMIT: omnichannel_crnk("baskets-submit"),
	},
	ADDONS: {
		INITIALIZE: omnichannel_crnk("products-enable-addon-initialize"),
		ENABLE: omnichannel_crnk("products-enable-addon"),
	},
	CHANGE_RESOURCES: {
		CHANGE_RESOURCE_INITIALIZATION: omnichannel_crnk("change-resource-initialization"),
		CHANGE_RESOURCE: omnichannel_crnk("change-resource"),
	},

	USER: {
		CHARGING_BALANCES: omnichannel_crnk("charging-balances"),
		POSTAL_ADDRESS: omnichannel_rest("postal-address"),
		LOGOUT: omnichannel_rest("oauth2/logout"),
		GENERATE_OTP: omnichannel_crnk("one-time-password-message"),
		VALIDATE_OTP: omnichannel_rest("otp/validate"),
		AUTHORIZE: omnichannel_rest("oauth2/authorize"),
	},

	SUPPORT_CASES: {
		CASES: omnichannel_crnk("cases"),
	},

	SHIPPING_METHODS: omnichannel_crnk("shippingMethods"),
	CHANGE_RESOURCE_INITIALIZATION: omnichannel_crnk("change-resource-initialization"),
	CHANGE_RESOURCE: omnichannel_crnk("change-resource"),

	CMS: {
		STYLES: cms_crnk("cms/styles"),
		GET_CONTENT_ITEMS: cms_crnk("cms-admin/contentitems"),
		GET_CONTENT_PAGE_WITH_CONTENT: cms_crnk("cms/contentpage/withcontent"),
		GET_CONTENT_ITEMS_FOR_LANGUAGE: cms_crnk("cms-admin/contentitemsforlanguage"),
		GET_CONTENT_FOR_PREVIEW: cms_crnk("cms-admin/contentitem/preview?contentItemId="),
		POST_SAVE_CONTENT_SPOT: cms_crnk("cms-admin/contentspot/save"),
		POST_SAVE_STYLES: cms_crnk("cms-admin/styles/save"),
		POST_CONTENT_SPOT: cms_crnk("cms/contentspot"),
	},
	MSISDN: omnichannel_crnk("msisdn"),
	MSISDN_RESERVATIONS: omnichannel_crnk("msisdn-reservations"),

	DOCUMENTS: {
		UPLOAD: omnichannel_rest("document/upload"),
		CREATE_FROM_TEMPLATE: omnichannel_rest("document/create-from-template"),
		GET: omnichannel_crnk("documents"),
	},

	USAGE: {
		COUNTERS: omnichannel_crnk("usage-counters"),
		AGGREGATED: omnichannel_crnk("aggregated-usage"),
	},

	MANAGE_SIM_ICC_VERIFICATION_OUTCOME: omnichannel_crnk("manage-sim-icc-verification-outcome"),

	SERVICE_MODIFICATION: {
		INITIALIZE: omnichannel_crnk("services-modify-initialize"),
		MODIFY: omnichannel_crnk("services-modify"),
	},

	PRODUCT_MODIFICATION: {
		INITIALIZE: omnichannel_crnk("productModificationInitializations"),
		MODIFY: omnichannel_crnk("productModification"),
	},
	PRODUCT_REPLACEMENT: {
		INITIALIZE: omnichannel_crnk("products-replace-initialize"),
	},
	PROVINCE_AND_CITY: {
		PROVINCE: "/states-or-provinces",
		CITIES: "/cities",
	},

	REASONS: omnichannel_crnk("reasons"),

	IDENTIFICATIONS: omnichannel_crnk("identifications"),

	IDENTIFICATION_CHECK: omnichannel_rest("identifications-check"),

	PRODUCTS_TERMINATE: omnichannel_crnk("products-terminate"),

	NOTIFICATION: omnichannel_crnk("notification"),
	ORDERS_CANCEL: omnichannel_crnk("orders-cancel"),
	SIM_CARDS: omnichannel_crnk("sim-cards"),

	WORKFORCE: {
		AVAILABILITY: omnichannel_rest("workforce/availability"),
	},

	RESOURCE_INVENTORIES: omnichannel_crnk("resource-inventories"),
};

export {
	omnichannel_crnk as omnichannelEndpoint,
	omnichannel_rest as omnichannelRestEndpoint,
	cms_crnk as cmsEndpoint,
	REST
};
