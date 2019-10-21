/* tslint:disable:max-line-length */
"use strict";

export const serverConsulValues = {
	italy_regions_service_name: {
		address: "52.212.50.159",
		port: 9047,
		name: "omnichannel-italy-regions"
	},
	omnichannel_cms_admin_service_name: {
		address: "localhost",
		port: 6002,
		name: "omnichannel-cms-admin",
		protocol: "http"
	},
	omnichannel_cms_mediasharingservice_service_name: {
		address: "localhost",
		port: 3605,
		name: "omnichannel-cms-mediasharingservice",
		protocol: "http"
	},
	aa_solution_service_name: {
		address: "52.19.87.245",
		port: 9980,
		name: "KEYCLOAK-EXTIP"
	},
	display_version_information: "true",
	"features/anonymous_authentication": "false",
	"features/basket/disable_basket_submit": "false",
	"features/basket/hide_child_item_prices": "true",
	"features/checkout_delivery_map_enabled": "false",
	"features/disable_contract_check": "true",
	"features/disable_gsm_auth_cookie_expiration_time_in_minutes": "30",
	"features/display_shopping_basket": "true",
	"features/enable_grid_on_category_page": "false",
	"features/enable_location_and_currency": "true",
	"features/enable_role_checking": "true",
	"features/eshop/display_agreement_selection": "false",
	"features/mdm_configuration_url": "http://mdm.wind.it/dbterminali/tre/",
	"features/msisdn_reservation": "true",
	"features/overview_my_balances_enabled": "false",
	"features/password_change_form_enabled": "false",
	"features/registration_form_enabled": "false",
	"features/security_settings_url": "https://example.org/",
	"features/show_cookie_consent": "true",
	"features/threshold_values": "[25, 50, 75, 100, 125]",
	"features/display_options": "{\"organizationIdentifications\": {\"identificationTypes\": [\"passport\", \"driving-licence\"]}}",
	skip_cms_requests: "true",
	service_name_header_value: "B2C-EXTIP",
	default_language: "eng\n",
	"features/products/enable_usage_counters_from_events_calculation": "true",
	"digilife/orders/pagination_limit": "10",
	"digilife/things/accessory_details_presentation_configuration":
		"[\n  {\n    \"specSubType\": \"ACCESSORY\",\n    \"keys\": [\"manufacturer\", \"material\", \"dimensions\", \"serial-number\"]\n  }\n]",
	"digilife/things/agreement_overview_presentation_configuration": "[\"HANDSET\", \"ACCESSORY\", \"TABLET\", \"SIM\"]\n",
	"digilife/things/device_details_presentation_configuration":
		"{\n    \"handset\": {\n        \"modelName\": \"specification.name\",\n        \"modelNumber\": \"specification.instanceCharacteristics.model-number.values[0].value\",\n        \"manufacturer\": \"specification.instanceCharacteristics.brand.values[0].value\",\n        \"description\": \"commercialEnrichments[0].descriptions.detailed\",\n        \"skuNumber\": \"specification.instanceCharacteristics.SKUNUMBER.values[0].value\",\n        \"serialNumber\": \"specification.instanceCharacteristics.serial-number.values[0].value\",\n        \"imei\": \"specification.instanceCharacteristics.imei.values[0].value\"\n    },\n    \"accessory\": {\n        \"modelName\": \"specification.name\",\n        \"modelNumber\": \"specification.instanceCharacteristics.model-number.values[0].value\",\n        \"manufacturer\": \"specification.instanceCharacteristics.brand.values[0].value\",\n        \"color\": \"specification.instanceCharacteristics.color.values[0].value\",\n        \"serialNumber\": \"specification.instanceCharacteristics.serial-number.values[0].value\"\n    },\n    \"sim\": {\n        \"modelName\": \"specification.name\",\n        \"msisdn\": \"simCards[0].msisdn\",\n        \"icc\": \"simCards[0].icc\",\n        \"simStatus\": \"simCards[0].lifecycleStatus\",\n        \"pin\": \"simCards[0].pin1\",\n        \"pin2\": \"simCards[0].pin2\",  \n        \"puk\": \"simCards[0].puk1\",\n        \"puk2\": \"simCards[0].puk2\",     \n        \"imsi\": \"simCards[0].imsi\"\n    }\n}",
	"digilife/things/sim_card_pins_unmasked": "false",
	"digilife/things/subscription_plan_name": "Plan",
	"auth/anonymous_user_role": "anon",
	"auth/claims/user_role_claim_key": "role_characteristics_value",
	"auth/oauth/client_id": "ocb2c",
	"auth/oauth/session_check_enabled": "false",
	"auth/oauth/session_check_iframe_path": "/oauth2/checkSession",
	"auth/oauth/session_check_interval_seconds": "60",
	"auth/permissions/contentmanager": "[\n  \"cms\",\n  \"contentmanager\",\n  \"pos\",\n  \"eshop\"\n]",
	"auth/permissions/eshop_user": "[\n  \"eshop\"\n]",
	"auth/silent_authentication_enabled": "true",
	"eligibility-categories/addons_category_ids": "[\n \"cat-b2c-mobile-addon-postpaid\"\n]",
	"eligibility-categories/phones_category_id": "cat-b2c-mobile-device",
	"eligibility-categories/plans_category_id": "cat-b2c-mobile-plan-postpaid",
	"currencies/all": "[\n  {\n    \"code\": \"EUR\"\n  },\n  {\n    \"code\": \"USD\"\n  }\n]\n",
	"currencies/default": "\"EUR\"",
	"services/call_forwarding":
		"{\n    \"key\": \"SERVICEID\",\n    \"values\": [\n        \"CFUFWD\",\n        \"CFBFWD\",\n        \"CFNRYFWD\",\n        \"CFNRCFWD\"\n    ]\n}",
	"services/reason_code": "CFReason",
	"services/state_transition_to_action": "{\n  \"enable\": \"enable\",\n  \"disable\": \"disable\"\n}",
	comparison_characteristics:
		"{\n    \"color\": {\n        \"name\": \"Color\"\n    },\n    \"display-size\": {\n        \"name\": \"Display size\"\n    },\n    \"processor\": {\n        \"name\": \"Processor\"\n    },\n    \"weight\": {\n        \"name\": \"Weight\"\n    }\n}",
	payment_use_case_configuration: "{\n    \"b2c-checkout\": \"b2c-checkout\"\n}",
	"change-msisdn/reasons":
		"[\n    {\n        \"id\": \"PRSC\",\n        \"attributes\": {\n          \"name\": \"Simple Change\",\n          \"value\": \"PRSC\"\n        }\n    },\n    {\n        \"id\": \"PRNCC\",\n        \"attributes\": {\n          \"name\": \"Number Class Change\",\n          \"value\": \"PRNCC\"\n        }\n    },\n    {\n        \"id\": \"PRBK\",\n        \"attributes\": {\n          \"name\": \"Broken\",\n          \"value\": \"PRBK\"\n        }\n    },\n    {\n        \"id\": \"PRST\",\n        \"attributes\": {\n          \"name\": \"Stolen\",\n          \"value\": \"PRST\"\n        }\n    },\n    {\n        \"id\": \"PRLST\",\n        \"attributes\": {\n          \"name\": \"Lost\",\n          \"value\": \"PRLST\"\n        }\n    },\n    {\n        \"id\": \"PRNTC\",\n        \"attributes\": {\n        \"name\": \"Not compatible\",\n        \"value\": \"PRNTC\"\n        }\n    }\n]",
	"products/state_transition_to_action":
		"{\n  \"resume\": \"resume\",\n  \"reactivate\": \"reactivate\",\n  \"disable\": \"disable\",\n  \"suspend\": \"suspend\",\n  \"deactivate\": \"deactivate\"\n}",
	"recharge-purchases/defaultCreditCardAlias": "Default Card",
	"recharge-purchases/rechargePurchaseStream": "ECARE",
	"recharge-purchases/rechargePurchaseSubChannelToStreamMap": "{\"eCare\":\"ECARE\",\"eShop\":\"ESHOP\"}",
	"recharge-purchases/rechargePurchaseSubstream": "CC",
	"shop/number_of_bundles": "2",
	registration_form_additional_fields: "[]\n",
	"schemas/b2c-personDetailsForm":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"personDetailsForm\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"length\": {\n\t\t\t\t\t\"max\": \"now\"\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"contactPhone\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t}\n\t}\n}",
	"schemas/credentials":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"credentials\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"password\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"length\": {\n\t\t\t\t\t\"min\": 8\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}",
	"schemas/customerDataForm":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"customerDataForm\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName2\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"phone\": true\n\t\t\t}\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"phone\": true\n\t\t\t}\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"identificationType\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"identificationId\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"identificationIssuingAuthority\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"identificationIssuingDate\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": false,\n\t\t\t\"nullable\": true\n\t\t},\n\t\t\"identificationExpiryDate\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": false,\n\t\t\t\"nullable\": true\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"building\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"apartment\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t}\n\t}\n}\n",
	"schemas/marketing-consent":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"marketingConsent\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"ownMarketing\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"thirdPartyMarketing\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"geoLocalization\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"profiling\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"thirdPartyEnrichment\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"thirdPartyTransfer\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t}\n\t}\n}",
	"schemas/overviewUserInfo":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"overviewUserInfo\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"language\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"countryOfBirth\": {\n\t\t\t \"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"maritalStatus\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"enum\": [\n\t\t\t\t\t\"single\",\n\t\t\t\t\t\"married\",\n\t\t\t\t\t\"divorced\",\n\t\t\t\t\t\"widowed\",\n\t\t\t\t\t\"cohabiting\",\n\t\t\t\t\tnull\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t}\n\t}\n}",
	"schemas/paymentFormWrapper":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"paymentFormWrapper\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"language\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"countryOfBirth\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportExpiryDate\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": false\n\t\t},\n\t\t\"maritalStatus\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"enum\": [\n\t\t\t\t\t\"single\",\n\t\t\t\t\t\"married\",\n\t\t\t\t\t\"divorced\",\n\t\t\t\t\t\"widowed\",\n\t\t\t\t\t\"cohabiting\"\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy1\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy2\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t}\n\t}\n}",
	"schemas/personDetailsForm":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"personDetailsForm\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"length\": {\n\t\t\t\t\t\"max\": \"now\"\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": true\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t}\n\t}\n}",
	"schemas/person":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"person\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"language\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"nullable\": true,\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"countryOfBirth\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportExpiryDate\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"maritalStatus\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"enum\": [\n\t\t\t\t\t\"single\",\n\t\t\t\t\t\"married\",\n\t\t\t\t\t\"divorced\",\n\t\t\t\t\t\"widowed\",\n\t\t\t\t\t\"cohabiting\"\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"phone\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy1\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy2\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t}\n\t}\n}",
	"schemas/phoneDirectoryRegistration":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"phoneDirectoryRegistration\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"titleOrSpecialization\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"professionOrDepartment\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"postal_code\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"stateOrProvince\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"publishShortenedName\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"postalAdvertising\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t},\n\t\t\"searchByPhoneNumberOnly\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"required\": true,\n\t\t\t\"nullable\": false\n\t\t}\n\t}\n}\n",
	"schemas/posCheckoutDelivery":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"posCheckoutDelivery\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"language\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"nullable\": true,\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"countryOfBirth\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"passportExpiryDate\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"maritalStatus\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"enum\": [\n\t\t\t\t\t\"single\",\n\t\t\t\t\t\"married\",\n\t\t\t\t\t\"divorced\",\n\t\t\t\t\t\"widowed\",\n\t\t\t\t\t\"cohabiting\"\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy1\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"privacy2\": {\n\t\t\t\"type\": \"boolean\",\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t}\n\t}\n}",
	"schemas/postalAddress":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"postal-address\",\n\t\"type\": \"object\",\n\t\"properties\": { \n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t}\n\t}\n}",
	"schemas/recurringTopUpForm":
		"{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"title\": \"recurringTopUpForm\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"recurringTopUp\": {\n      \"type\": \"string\",\n      \"required\": true,\n      \"nullable\": false\n    },\n    \"thresholdValue\": {\n      \"type\": \"number\",\n      \"editable\": true,\n      \"validation\": {\n        \"number\": true,\n        \"min\": 0\n      }\n    },\n    \"topUpAmount\": {\n      \"type\": \"number\",\n      \"editable\": true,\n      \"validation\": {\n        \"number\": true,\n        \"min\": 0\n      }\n    },\n    \"limitInMonth\": {\n      \"type\": \"number\",\n      \"editable\": true,\n      \"validation\": {\n        \"number\": true,\n        \"min\": 0\n      }\n    },\n    \"topUpAmountWeekly\": {\n      \"type\": \"number\",\n      \"editable\": true,\n      \"validation\": {\n        \"number\": true,\n        \"min\": 0\n      }\n    }\n  }\n}",
	"schemas/registration":
		"{\n\t\"$schema\": \"http://json-schema.org/draft-04/schema#\",\n\t\"title\": \"registration\",\n\t\"type\": \"object\",\n\t\"properties\": {\n\t\t\"firstName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"lastName\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"gender\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"birthDay\": {\n\t\t\t\"type\": \"date\",\n\t\t\t\"nullable\": true,\n\t\t\t\"required\": false,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"language\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"email\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"validation\": {\n\t\t\t\t\"email\": true\n\t\t\t}\n\t\t},\n\t\t\"mobileNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"fixedLineNumber\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true\n\t\t},\n\t\t\"street\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"coAddress\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": false\n\t\t},\n\t\t\"postalCode\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"city\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"country\": {\n\t\t\t\"type\": \"string\",\n\t\t\t\"required\": true\n\t\t},\n\t\t\"password\": {\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"type\": \"string\",\n\t\t\t\"validation\": {\n\t\t\t\t\"length\": {\n\t\t\t\t\t\"min\": 8\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"passwordConfirmation\": {\n\t\t\t\"required\": true,\n\t\t\t\"editable\": true,\n\t\t\t\"type\": \"string\",\n\t\t\t\"validation\": {\n\t\t\t\t\"equals\": \"#.properties.password\"\n\t\t\t}\n\t\t}\n\t}\n}",
	x_brand: "ERICSSON",
	"translations/eng": "{}",
	"translations/fin": "{}",
	"translations/swe": "{}",
	"env/SERVICE_NAME": "omnichannel-b2c"
};

export const expectedConsulValues = {
	services: {
		b2c: undefined,
		cms: undefined,
		cms_mss: {
			address: "localhost",
			port: 3605,
			name: "omnichannel-cms-mediasharingservice",
			protocol: "http"
		},
		cms_admin: {
			address: "localhost",
			port: 6002,
			name: "omnichannel-cms-admin",
			protocol: "http"
		},
		pos: undefined,
	},
	serviceLocations: {},
	displayVersionInformation: true,
	sslInUse: false,
	defaultLanguage: "eng",
	locale: "en",
	iso6392: "eng",
	messages: {},
	locales: [
		{
			iso6392: "eng",
			locale: "en",
			messages: {}
		},
		{
			iso6392: "fin",
			locale: "fi",
			messages: {}
		},
		{
			iso6392: "swe",
			locale: "sv",
			messages: {}
		}
	],
	isUserSetLocale: false,
	logo: "/static/img/qvantel_logo_white_small.png",
	styles: "",
	countries: [],
	locations: {
		cities: [],
		provinces: []
	},
	logFormValidationErrors: false,
	languages: [],
	genders: ["MALE", "FEMALE", "OTHER"],
	maritalStatuses: ["single", "married", "divorced", "widowed", "cohabiting"],
	registrationFormAdditionalFields: [],
	icc_subtype_display: {
		dropdown: ["dropdown"],
		radio: ["radio"]
	},
	brand: "ERICSSON",
	initialized: true,
	searchConfigs: false,
	msisdnReservationRequired: true,
	maxUploadSize: 2048,
	maxUploadFiles: 12,
	pagingSize: 4,
	payment_manager: { reservation_amount_for_creditcard_tokenization: {} },
	ICCIDValidationConditions: {},
	categoriesBlacklist: {},
	checkoutMsisdnValidationRegex: undefined,
	customerCreationMandatoryFields: [
		"firstName",
		"lastName",
		"email",
		"mobileNumber",
		"fixedLineNumber",
		"gender",
		"identificationType",
		"identificationId",
		"identificationIssuingAuthority",
		"identificationIssuingDate",
		"street",
		"postalCode",
		"city",
		"country"
	],
	contentPagePathValidationRegexp: undefined,
	b2c_configuration: {
		digilife: {
			things: {
				sim_card_pins_unmasked: false,
				addons: {
					actionsEnabled: false
				}
			},
			orders: {
				pagination_limit: 10
			}
		},
		features: {
			mdm_configuration_url: "http://mdm.wind.it/dbterminali/tre/",
			products: {
				enable_usage_counters_from_events_calculation: true
			}
		},
		shop: {
			number_of_bundles: "2"
		}
	},
	skipCmsRequests: true,
	serviceNameHeaderValue: "B2C-EXTIP",
	displayOptions: {
		organizationIdentifications: {
			identificationTypes: ["passport", "driving-licence"]
		}
	},
	identificationTypes: [],
	customerIdentificationValidationEnabled: {},

	features: {
		anonymous_authentication: "false",
		basket: {
			disable_basket_submit: "false",
			hide_child_item_prices: "true"
		},
		checkout_delivery_map_enabled: "false",
		disable_contract_check: "true",
		disable_gsm_auth_cookie_expiration_time_in_minutes: "30",
		display_options: "{\"organizationIdentifications\": {\"identificationTypes\": [\"passport\", \"driving-licence\"]}}",
		display_shopping_basket: "true",
		enable_grid_on_category_page: "false",
		enable_location_and_currency: "true",
		enable_role_checking: "true",
		eshop: {
			display_agreement_selection: "false",
			document_id_types: []
		},
		mdm_configuration_url: "http://mdm.wind.it/dbterminali/tre/",
		msisdn_reservation: "true",
		overview_my_balances_enabled: "false",
		password_change_form_enabled: "false",
		registration_form_enabled: "false",
		security_settings_url: "https://example.org/",
		show_cookie_consent: "true",
		threshold_values: "[25, 50, 75, 100, 125]",
		products: {
			enable_usage_counters_from_events_calculation: "true"
		}
	},
	env: {
		IS_RUNTIME: undefined,
		SERVICE_NAME: "omnichannel-b2c"
	},
	rechargePurchaseConfig: {
		rechargePurchaseStream: "ECARE",
		rechargePurchaseSubChannelToStreamMap: { eCare: "ECARE", eShop: "ESHOP" },
		rechargePurchaseSubstream: "CC"
	},
	logSchemaDiscrepancies: false
};
