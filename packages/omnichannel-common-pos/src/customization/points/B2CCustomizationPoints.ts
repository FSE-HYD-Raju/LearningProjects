enum B2CComponentCustomizationPoints {
	APP_ROUTES_EXTENSION = "B2C_APP_ROUTES_EXTENSION",
	PHONE_DIRECTORY_REGISTRATION_FORM = "B2C_PHONE_DIRECTORY_REGISTRATION_FORM",
	HEAD_INJECTOR = "B2C_HEAD_INJECTOR",
	APP_HEADER_TOP_BAR = "B2C_APP_HEADER_TOP_BAR",
	APP_HEADER_NAV_BAR_COMPONENT = "B2C_APP_HEADER_NAV_BAR_COMPONENT",
	APP_HEADER_NAV_BAR_MOBILE_COMPONENT = "B2C_APP_HEADER_NAV_BAR_MOBILE_COMPONENT",
	PERSONAL_INFORMATION_CONTAINER = "B2C_PERSONAL_INFORMATION_CONTAINER",
	PERSONAL_INFORMATION = "B2C_PERSONAL_INFORMATION",
	DOCUMENTS_INFORMATION_CONTAINER = "B2C_DOCUMENTS_INFORMATION_CONTAINER",
	DOCUMENTS_INFORMATION = "B2C_DOCUMENTS_INFORMATION",
	TOP_UP_CONTAINER = "B2C_TOP_UP_CONTAINER",
	PERSON_DETAILS_FORM_EXTRA_FIELDS = "B2C_PERSON_DETAILS_FORM_EXTRA_FIELDS",
	PORT_IN_CONFIGURATION = "PORT_IN_CONFIGURATION",
	PERSON_DETAILS_ADDRESS_INFORMATION_CONTAINER = "B2C_PERSON_DETAILS_ADDRESS_INFORMATION_CONTAINER",
	PERSON_DETAILS_POSTAL_ADDRESS_FORM = "B2C_PERSON_DETAILS_POSTAL_ADDRESS_FORM",
	MARKETING_CONSENT = "B2C_MARKETING_CONSENT",
	MARKETING_CONSENT_CONTAINER = "B2C_MARKETING_CONSENT_CONTAINER",
	CONFIGURATION_ACTIONS_CONTAINER = "B2C_CONFIGURATION_ACTIONS_CONTAINER",
	CONFIGURATION_ACTIONS = "B2C_CONFIGURATION_ACTIONS",
	SHOPCONTAINER_CUSTOM_MODAL = "B2C_SHOPCONTAINER_CUSTOM_MODAL", // Modal component embedded to ShopContainer
	SHOPPRODUCTPAGE_CUSTOM_MODAL = "B2C_SHOPPRODUCTPAGE_CUSTOM_MODAL", // Modal component embedded to ShopProductPage
	CHECKOUTCONTAINER_CUSTOM_MODAL = "B2C_CHECKOUTCONTAINER_CUSTOM_MODAL", // Modal component embedded to CheckoutContainer
	SHOPPRODUCTPAGE_DETAILS = "B2C_SHOPPRODUCTPAGE_DETAILS",
	CONTACT_INFORMATION_CONTAINER = "B2C_CONTACT_INFORMATION_CONTAINER",
	CONTACT_INFORMATION = "B2C_CONTACT_INFORMATION",
	CHANGE_DELIVERY_ADDRESS_CONTAINER = "B2C_CHANGE_DELIVERY_ADDRESS_CONTAINER",
	CHANGE_DELIVERY_ADDRESS_CONTAINER_ECARE = "B2C_CHANGE_DELIVERY_ADDRESS_CONTAINER_ECARE",
	DELIVERY_ADDRESS_SELECTION_CONTAINER = "B2C_DELIVERY_ADDRESS_SELECTION_CONTAINER",
	DELIVERY_ADDRESS_SELECTION = "B2C_DELIVERY_ADDRESS_SELECTION",
	CHECKOUT_DELIVERY = "B2C_CHECKOUT_DELIVERY",
	CHECKOUT_PRODUCT_CONFIGURATION = "B2C_CHECKOUT_PRODUCT_CONFIGURATION",
	PERSON_DETAILS_CONFIGURATION_CONTAINER = "B2C_PERSON_DETAILS_CONFIGURATION_CONTAINER",
	PERSON_DETAILS_CONFIGURATION = "B2C_PERSON_DETAILS_CONFIGURATION",
	ORDER_COMPLETED = "B2C_ORDER_COMPLETED", /* TODO obsoleted, may be removed */
	ORDER_COMPLETED_CONTAINER = "B2C_ORDER_COMPLETED_CONTAINER",
	ORDER_SUMMARY = "B2C_ORDER_SUMMARY",
	SHOP_GRID_PRODUCT = "B2C_SHOP_GRID_PRODUCT",
}

enum B2CSchemaCustomizationPoints {
	PERSONAL_INFORMATION = "B2C_SCHEMA_PERSONAL_INFORMATION",
	POSTAL_ADDRESS = "B2C_POSTAL_ADDRESS",
	DOCUMENTS_INFORMATION = "B2C_SCHEMA_DOCUMENTS_INFORMATION",
	CONTACT_INFORMATION = "B2C_SCHEMA_CONTACT_INFORMATION",
}

enum B2CFunctionCustomizationPoints {
	APP_ROUTER_RESTRICTION = "APP_ROUTER_RESTRICTION",
	PERSON_DETAILS_FORM_DUPLICATE_CHECK = "B2C_PERSON_DETAILS_FORM_DUPLICATE_CHECK",
	PERSON_DETAILS_FORM_CREATE_CUSTOMER = "B2C_PERSON_DETAILS_FORM_CREATE_CUSTOMER",
	REGISTRATION_CREATE_CUSTOMER = "B2C_REGISTRATION_CREATE_CUSTOMER",
	REGISTRATION_DUPLICATE_CHECK = "B2C_REGISTRATION_DUPLICATE_CHECK",
	TOASTER_ERROR_ACTIONS_MESSAGE_INJECTOR = "B2C_TOASTER_ERROR_ACTIONS_MESSAGE_INJECTOR",
	CHECKOUT_BASKET_PRE_COMMIT = "B2C_CHECKOUT_BASKET_PRE_COMMIT",
	CHECKOUT_SHOULD_CREATE_CUSTOMER = "B2C_CHECKOUT_SHOULD_CREATE_CUSTOMER",
	CHECKOUT_PERFORM_CUSTOMER_SCREENING = "B2C_CHECKOUT_PERFORM_CUSTOMER_SCREENING",
	CHECKOUT_DISABLE_CONTINUE_TO_PAYMENT_BUTTON = "B2C_CHECKOUT_DISABLE_CONTINUE_TO_PAYMENT_BUTTON",
	CUSTOM_LOGIN_URL_PROVIDER = "B2C_CUSTOM_LOGIN_URL_PROVIDER",
	PROPOSED_DELIVERY_ADDRESS_VALIDATION = "B2C_PROPOSED_DELIVERY_ADDRESS_VALIDATION",
}

enum B2CObjectsCustomizationPoints {
	ESHOP_TITLE = "ESHOP_PAGE_TITLE",
}

export {
	B2CComponentCustomizationPoints,
	B2CSchemaCustomizationPoints,
	B2CFunctionCustomizationPoints,
	B2CObjectsCustomizationPoints,
};