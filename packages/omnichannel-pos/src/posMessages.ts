import { defineMessages, FormattedMessage } from "react-intl";

interface PosMessagesType {
	street: FormattedMessage.MessageDescriptor;
	coAddress: FormattedMessage.MessageDescriptor;
	postalCode: FormattedMessage.MessageDescriptor;
	city: FormattedMessage.MessageDescriptor;
	country: FormattedMessage.MessageDescriptor;
	checkoutStepConfiguration: FormattedMessage.MessageDescriptor;
	checkoutStepConfigurationMessage: FormattedMessage.MessageDescriptor;
	checkoutStepSecondNumber: FormattedMessage.MessageDescriptor;
	checkoutStepDelivery: FormattedMessage.MessageDescriptor;
	checkoutStepDeliveryMessage: FormattedMessage.MessageDescriptor;
	checkoutStepThirdNumber: FormattedMessage.MessageDescriptor;
	checkoutStepSummary: FormattedMessage.MessageDescriptor;
	checkoutStepSummaryMessage: FormattedMessage.MessageDescriptor;
	checkoutStepFourthNumber: FormattedMessage.MessageDescriptor;
	checkoutStepPayment: FormattedMessage.MessageDescriptor;
	checkoutStepPaymentMessage: FormattedMessage.MessageDescriptor;
	checkoutCancel: FormattedMessage.MessageDescriptor;
	checkoutFor: FormattedMessage.MessageDescriptor;
	checkoutPayer: FormattedMessage.MessageDescriptor;
	checkoutUser: FormattedMessage.MessageDescriptor;
	createForm: FormattedMessage.MessageDescriptor;
	formUserDetails: FormattedMessage.MessageDescriptor;
	createNewUser: FormattedMessage.MessageDescriptor;
	modifyNewUser: FormattedMessage.MessageDescriptor;
	genericYouPronoun: FormattedMessage.MessageDescriptor;
	genericOk: FormattedMessage.MessageDescriptor;
	failedGenerateCheckstatus: FormattedMessage.MessageDescriptor;
	formNewUser: FormattedMessage.MessageDescriptor;
	formFirstName: FormattedMessage.MessageDescriptor;
	formDateOfBirth: FormattedMessage.MessageDescriptor;
	formPersonalInformation: FormattedMessage.MessageDescriptor;
	formContactInformation: FormattedMessage.MessageDescriptor;
	formLastName: FormattedMessage.MessageDescriptor;
	formEmailAddress: FormattedMessage.MessageDescriptor;
	formContactPhone: FormattedMessage.MessageDescriptor;
	formAddress: FormattedMessage.MessageDescriptor;
	formAddressDetails: FormattedMessage.MessageDescriptor;
	formUseAdddress: FormattedMessage.MessageDescriptor;
	formStreetAddress: FormattedMessage.MessageDescriptor;
	formPostalCode: FormattedMessage.MessageDescriptor;
	formCity: FormattedMessage.MessageDescriptor;
	formState: FormattedMessage.MessageDescriptor;
	formCountryLabel: FormattedMessage.MessageDescriptor;
	formCountryDefault: FormattedMessage.MessageDescriptor;
	formIdentificationId: FormattedMessage.MessageDescriptor;
	summaryInStock: FormattedMessage.MessageDescriptor;
	summaryInCentralStock: FormattedMessage.MessageDescriptor;
	summaryForYou: FormattedMessage.MessageDescriptor;
	bundleTitle: FormattedMessage.MessageDescriptor;
	packageSummaryUserAndPayer: FormattedMessage.MessageDescriptor;
	paymentsUpfront: FormattedMessage.MessageDescriptor;
	paymentsMonthly: FormattedMessage.MessageDescriptor;
	totalPaymentUpfront: FormattedMessage.MessageDescriptor;
	totalPaymentMonthly: FormattedMessage.MessageDescriptor;
	goToCommunicationSpace: FormattedMessage.MessageDescriptor;
	goToDigitalLife: FormattedMessage.MessageDescriptor;
	backToSetup: FormattedMessage.MessageDescriptor;
	backToDelivery: FormattedMessage.MessageDescriptor;
	deliveryTitle: FormattedMessage.MessageDescriptor;
	documentSigned: FormattedMessage.MessageDescriptor;
	documentYetSigned: FormattedMessage.MessageDescriptor;
	documentTypeNotSupport: FormattedMessage.MessageDescriptor;
	useKnownAddress: FormattedMessage.MessageDescriptor;
	useAnotherAddress: FormattedMessage.MessageDescriptor;
	pickupAtStore: FormattedMessage.MessageDescriptor;
	yourCurrentOrder: FormattedMessage.MessageDescriptor;
	firstNameRequired: FormattedMessage.MessageDescriptor;
	lastNameRequired: FormattedMessage.MessageDescriptor;
	emailRequired: FormattedMessage.MessageDescriptor;
	phoneRequired: FormattedMessage.MessageDescriptor;
	streetRequired: FormattedMessage.MessageDescriptor;
	coAddressRequired: FormattedMessage.MessageDescriptor;
	postalCodeRequired: FormattedMessage.MessageDescriptor;
	cityRequired: FormattedMessage.MessageDescriptor;
	countryRequired: FormattedMessage.MessageDescriptor;
	gender: FormattedMessage.MessageDescriptor;
	gender_FEMALE: FormattedMessage.MessageDescriptor;
	gender_MALE: FormattedMessage.MessageDescriptor;
	gender_OTHER: FormattedMessage.MessageDescriptor;
	chooseADate: FormattedMessage.MessageDescriptor;
	identificationTypePlaceholder: FormattedMessage.MessageDescriptor;
	formIdentificationInformation: FormattedMessage.MessageDescriptor;
	formIdentificationInformationTypeLabel: FormattedMessage.MessageDescriptor;
	identificationIssuingAuthority: FormattedMessage.MessageDescriptor;
	identificationIssuingAuthorityPlaceholder: FormattedMessage.MessageDescriptor;
	identificationIssuingDate: FormattedMessage.MessageDescriptor;
	identificationDatePlaceholder: FormattedMessage.MessageDescriptor;
	identificationExpiryDate: FormattedMessage.MessageDescriptor;
	aaLoginCallback: FormattedMessage.MessageDescriptor;
	aaLoginProcess: FormattedMessage.MessageDescriptor;
	checkoutCustomerDetails: FormattedMessage.MessageDescriptor;
	checkoutCustomerDescription: FormattedMessage.MessageDescriptor;
	checkoutContract: FormattedMessage.MessageDescriptor;
	checkoutContractDescription: FormattedMessage.MessageDescriptor;
	checkoutPayment: FormattedMessage.MessageDescriptor;
	checkoutPaymentDescription: FormattedMessage.MessageDescriptor;
	paymentErrorMessageFailed: FormattedMessage.MessageDescriptor;
	orderReferenceNumber: FormattedMessage.MessageDescriptor;
	orderBasketFinalCost: FormattedMessage.MessageDescriptor;
	orderBasketRecurring: FormattedMessage.MessageDescriptor;
	orderBasketUpfront: FormattedMessage.MessageDescriptor;
	orderBasketName: FormattedMessage.MessageDescriptor;
	orderPurchaseSummary: FormattedMessage.MessageDescriptor;
	orderContinueShopping: FormattedMessage.MessageDescriptor;
	orderConfirmation: FormattedMessage.MessageDescriptor;
	checkoutBackDetails: FormattedMessage.MessageDescriptor;
	summaryGoPayment: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFile: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFileSuccess: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFileFailed: FormattedMessage.MessageDescriptor;
	summaryHaveRead: FormattedMessage.MessageDescriptor;
	summaryHaveReadContract: FormattedMessage.MessageDescriptor;
	summaryCheckOrder: FormattedMessage.MessageDescriptor;
	summaryTermLink: FormattedMessage.MessageDescriptor;
	summaryContractLink: FormattedMessage.MessageDescriptor;
	successGenerate: FormattedMessage.MessageDescriptor;
	successGenerateCheckStatus: FormattedMessage.MessageDescriptor;
	checkoutSaveAndCloseLabel: FormattedMessage.MessageDescriptor;
	checkoutCancelLabel: FormattedMessage.MessageDescriptor;
	checkoutPickUpStore: FormattedMessage.MessageDescriptor;
	checkoutNewAddressCountry: FormattedMessage.MessageDescriptor;
	checkoutNewAddressCity: FormattedMessage.MessageDescriptor;
	checkoutNewAddressPostCode: FormattedMessage.MessageDescriptor;
	checkoutNewCoAddress: FormattedMessage.MessageDescriptor;
	checkoutNewStreetAddress: FormattedMessage.MessageDescriptor;
	checkoutDeliveryNewAddress: FormattedMessage.MessageDescriptor;
	basketNotReadyPayment: FormattedMessage.MessageDescriptor;
	paymentBtnTitle: FormattedMessage.MessageDescriptor;
	selectPaymentMethod: FormattedMessage.MessageDescriptor;
	paymentCompleteOneTime: FormattedMessage.MessageDescriptor;
	paymentErrorPaymentCanceled: FormattedMessage.MessageDescriptor;
	paymentErrorPaymentReject: FormattedMessage.MessageDescriptor;
	paymentErrorCashFailed: FormattedMessage.MessageDescriptor;
	paymentErrorBalanceSurpassed: FormattedMessage.MessageDescriptor;
	paymentErrorBasketNotFound: FormattedMessage.MessageDescriptor;
	paymentErrorMethodNotFound: FormattedMessage.MessageDescriptor;
	paymentErrorReject: FormattedMessage.MessageDescriptor;
	setupGoToSummary: FormattedMessage.MessageDescriptor;
	checkoutSavePersonInfo: FormattedMessage.MessageDescriptor;
	personalFormAddress: FormattedMessage.MessageDescriptor;
	fillInCustomerDetails: FormattedMessage.MessageDescriptor;
	checkoutPaymentText: FormattedMessage.MessageDescriptor;
	checkoutPaymentTitle: FormattedMessage.MessageDescriptor;
	checkoutPaymentProcced: FormattedMessage.MessageDescriptor;
	notEnoughBalance: FormattedMessage.MessageDescriptor;
	privacyConsent: FormattedMessage.MessageDescriptor;
}

const PosMessages: PosMessagesType = defineMessages({
	street: {
		id: "checkout-delivery-street-address-is-required",
		description:
			"Checkout delivery form, error shown when street address was not entered",
		defaultMessage: "Street address is required"
	},
	coAddress: {
		id: "checkout-delivery-co-address-is-required",
		description:
			"Checkout delivery, error shown when C/o address was not entered",
		defaultMessage: "C/o address is required"
	},
	postalCode: {
		id: "checkout-delivery-postal-code-is-required",
		description:
			"Checkout delivery form, error shown when postal code was not entered",
		defaultMessage: "Postal code is required"
	},
	city: {
		id: "checkout-delivery-city-is-required",
		description:
			"Checkout delivery form, error shown when city is not entered",
		defaultMessage: "City is required"
	},
	country: {
		id: "checkout-delivery-country-is-required",
		description:
			"Checkout delivery form, error shown when country is not entered",
		defaultMessage: "Country is required"
	},
	checkoutStepConfiguration: {
		id: "checkout-steps-configuration",
		description: "Checkout first step: configuration",
		defaultMessage: "Configuration"
	},
	checkoutStepConfigurationMessage: {
		id: "checkout-steps-configuration-message",
		description: "Checkout configuration message",
		defaultMessage: "Configure your services"
	},
	checkoutStepSecondNumber: {
		id: "checkout-step-2",
		description: "checkout, step indicator for second step",
		defaultMessage: "2"
	},
	checkoutStepDelivery: {
		id: "checkout-steps-delivery",
		description: "Checkout second step: delivery",
		defaultMessage: "Delivery"
	},
	checkoutStepDeliveryMessage: {
		id: "checkout-steps-delivery-message",
		description: "Checkout delivery message",
		defaultMessage: "Select your delivery methods"
	},
	checkoutStepThirdNumber: {
		id: "checkout-step-3",
		description: "checkout, step indicator for third step",
		defaultMessage: "3"
	},
	checkoutStepSummary: {
		id: "checkout-step-summary",
		description: "Checkout second step: summary",
		defaultMessage: "Summary"
	},
	checkoutStepSummaryMessage: {
		id: "checkout-steps-summary-message",
		description: "Checkout summary message",
		defaultMessage: "Review your order and accept the related contract"
	},
	checkoutStepFourthNumber: {
		id: "checkout-step-4",
		description: "Checkout steps fourth number",
		defaultMessage: "4"
	},
	checkoutStepPayment: {
		id: "checkout-step-payment",
		description: "Checkout second step: payment",
		defaultMessage: "Payment"
	},
	checkoutStepPaymentMessage: {
		id: "checkout-steps-payment-message",
		description: "Checkout payment message",
		defaultMessage: "Pay for your order"
	},
	checkoutCancel: {
		id: "checkout-cancel",
		description: "checkout, cancel-button in every step",
		defaultMessage: "Cancel"
	},
	checkoutFor: {
		id: "checkout-for",
		description: "checkout, setup and delivery, For-text before user image",
		defaultMessage: "For"
	},
	checkoutPayer: {
		id: "checkout-payer",
		description:
			"checkout, setup and delivery, Payer-text before payer image",
		defaultMessage: "Payer"
	},
	checkoutUser: {
		id: "checkout-user",
		description:
			"checkout, setup and delivery, User-text before payer image",
		defaultMessage: "User"
	},
	formUserDetails: {
		id: "form-user-details",
		description: "checkout, details, User details-title",
		defaultMessage: "User details"
	},
	createNewUser: {
		id: "form-create-new-user",
		description:
			"checkout, details, in user dropdown, create user option text",
		defaultMessage: "Create new user"
	},
	modifyNewUser: {
		id: "form-modify-new-user",
		description:
			"checkout, details, in user dropdown, modify user option text",
		defaultMessage: "Modify {user}"
	},
	genericYouPronoun: {
		id: "checkout-generic-you-pronoun",
		description:
			"Generic you pronoun used in multiple places to address current user",
		defaultMessage: "You"
	},
	genericOk: {
		id: "checkout-generic-ok",
		description:
			"Generic ok text used in multiple places indicate everything is ok",
		defaultMessage: "Ok"
	},
	formNewUser: {
		id: "form-new-user",
		description: "checkout, details, New user-text",
		defaultMessage: "New user"
	},
	formFirstName: {
		id: "form-first-name",
		description: "checkout, details, label for first name input",
		defaultMessage: "First name"
	},
	formDateOfBirth: {
		id: "form-date-of-birth",
		description: "checkout, details, label for date of birth input",
		defaultMessage: "Date of birth"
	},
	formPersonalInformation: {
		id: "form-person-information",
		description: "checkout, details, title in person part of details form",
		defaultMessage: "Personal information"
	},
	formContactInformation: {
		id: "form-contact-information",
		description: "checkout, details, title in contact part of details form",
		defaultMessage: "Contact information"
	},
	formLastName: {
		id: "form-last-name",
		description: "checkout, details, label for lastname",
		defaultMessage: "Last name"
	},
	formEmailAddress: {
		id: "form-email-address",
		description: "checkout, details, label for email input",
		defaultMessage: "Email address"
	},
	formContactPhone: {
		id: "form-contact-phone",
		description: "checkout, details, label for phone input",
		defaultMessage: "Contact phone"
	},
	formAddress: {
		id: "form-address",
		description: "checkout, details, title before address inputs",
		defaultMessage: "Address"
	},
	formAddressDetails: {
		id: "form-formAddressDetails",
		description: "checkout, details, title before addressDetail inputs",
		defaultMessage: "Address details"
	},
	formUseAdddress: {
		id: "form-use-address-from-place",
		description: "checkout, details, use addess from place link",
		defaultMessage: "Use address from place"
	},
	formStreetAddress: {
		id: "form-street-address",
		description: "checkout, details, title before address inputs",
		defaultMessage: "Street address"
	},
	formPostalCode: {
		id: "form-postalcode",
		description: "checkout, details, placeholder for postal code input",
		defaultMessage: "Postal code"
	},
	formCity: {
		id: "form-city",
		description: "checkout, details, placeholder for city input",
		defaultMessage: "City"
	},
	formState: {
		id: "form-state",
		description: "checkout, details, placeholder for state input",
		defaultMessage: "State"
	},
	formCountryLabel: {
		id: "form-country-labek",
		description:
			"checkout, details, placeholder for country input floating label",
		defaultMessage: "Country"
	},
	formCountryDefault: {
		id: "form-country-default",
		description:
			"checkout, details, placeholder for country input floating default value",
		defaultMessage: "Please select country"
	},
	formIdentificationId: {
		id: "form-identification-id",
		description: "checkout, details, label for identification id input",
		defaultMessage: "Identification id"
	},
	summaryInStock: {
		id: "summary-in-store-stock",
		description: "checkout, summary, in stock text",
		defaultMessage: "In store stock"
	},
	summaryInCentralStock: {
		id: "summary-in-central-stocl",
		description: "checkout, summary, in central stock text",
		defaultMessage: "In central stock"
	},
	summaryForYou: {
		id: "summary-for-you",
		description: "checkout, summary, for: you",
		defaultMessage: "You"
	},
	bundleTitle: {
		id: "bundle-title",
		description:
			"In checkout, this is the package (basket row) title, i.e Package 1, Package 2",
		defaultMessage: "Package {bundleNumber}"
	},
	packageSummaryUserAndPayer: {
		id: "package-summary-user-and-payer",
		description:
			"In checkout summary, this is the package (basket row) title which contains package's user's and payer's names",
		defaultMessage:
			'Package {bundleNumber} for <span class:"title-bold">{user}</span>, paid by <span class:"title-bold">{payer}</span>'
	},
	paymentsUpfront: {
		id: "package-summary-payments-upfront",
		description:
			"In checkout summary, this is the package (basket row) upfront payment sum",
		defaultMessage: 'Upfront <span class:"payments-price">{price1}</span>'
	},
	paymentsMonthly: {
		id: "package-summary-payments-monthly",
		description:
			"In checkout summary, this is the package (basket row) monthly payment sum",
		defaultMessage: 'Monthly <span class:"payments-price">{price2}</span>'
	},
	totalPaymentUpfront: {
		id: "package-summary-total-payment-upfront",
		description:
			"In checkout summary, this is the basket total upfront payment sum",
		defaultMessage: 'Upfront <span class:"payments-price">{price1}</span>'
	},
	totalPaymentMonthly: {
		id: "package-summary-total-payment-monthly",
		description:
			"In checkout summary, this is the basket total monthly payment sum",
		defaultMessage: 'Monthly <span class:"payments-price">{price2}</span>'
	},
	goToCommunicationSpace: {
		id: "payment-return-go-to-communications-space",
		description:
			"In checkout payment return page (cancel or success), go to communication space after clicking this link",
		defaultMessage: "Continue to communication space"
	},
	goToDigitalLife: {
		id: "payment-return-go-to-digi-life",
		description:
			"In checkout payment return page (cancel or success), go to digital life after clicking this link",
		defaultMessage: "Continue to digital life"
	},
	backToSetup: {
		id: "checkout-back-to-setup-label",
		description: "In checkout back to configuration button label",
		defaultMessage: "Back to configuration"
	},
	backToDelivery: {
		id: "checkout-back-to-delivery-label",
		description: "In checkout back to delivery button label",
		defaultMessage: "Back to delivery"
	},
	deliveryTitle: {
		id: "checkout-delivery-title",
		description: "In checkout delivery step, a generic title",
		defaultMessage: "Delivery"
	},
	useKnownAddress: {
		id: "checkout-delivery-use-known-address-label",
		description:
			"In checkout delivery step, use known address radio button label",
		defaultMessage: "Deliver to my primary address"
	},
	useAnotherAddress: {
		id: "checkout-delivery-use-another-address-label",
		description:
			"In checkout delivery step, use another address radio button label",
		defaultMessage: "Deliver to a new address"
	},
	pickupAtStore: {
		id: "checkout-delivery-pickup-at-store-label",
		description:
			"In checkout delivery step, pickup at store radio button label",
		defaultMessage: "Pick up at store"
	},
	yourCurrentOrder: {
		id: "checkout-your-current-order",
		description:
			"In process of checkout, client's current order above Basket",
		defaultMessage: "Your current order"
	},
	firstNameRequired: {
		id: "person-details-form-first-name",
		description:
			"Person details form, error shown when first name is not given",
		defaultMessage: "First name is required"
	},
	lastNameRequired: {
		id: "person-details-form-last-name",
		description:
			"Delivery address validation, error shown when last name is not given",
		defaultMessage: "Last name is required"
	},
	emailRequired: {
		id: "person-details-form-email",
		description:
			"Delivery address validation, error shown when email is invalid",
		defaultMessage: "Not a valid email address"
	},
	phoneRequired: {
		id: "person-details-form-phone",
		description:
			"Delivery address validation, error shown when phone number is invalid",
		defaultMessage: "Not a valid phone number"
	},
	streetRequired: {
		id: "person-details-form-street",
		description:
			"Delivery address validation, error shown when street is required but not given",
		defaultMessage: "Street address is required"
	},
	coAddressRequired: {
		id: "person-details-form-coaddress",
		description:
			"Delivery address validation, error shown when coAddress is required but not given",
		defaultMessage: "CoAddress is required"
	},
	postalCodeRequired: {
		id: "person-details-form-postal-code",
		description:
			"Delivery address validation, error shown when postal code is invalid",
		defaultMessage: "Not a valid postal code"
	},
	cityRequired: {
		id: "person-details-form-city",
		description:
			"Delivery address validation, error shown when city is required but not given",
		defaultMessage: "City is required"
	},
	countryRequired: {
		id: "person-details-form-country",
		description:
			"Delivery address validation, error shown when country is required but not given",
		defaultMessage: "Country is required"
	},
	gender: {
		id: "gender-on-person-detail-form",
		description: "Gender on person detail form",
		defaultMessage: "Gender"
	},
	gender_FEMALE: {
		id: "gender-on-person-detail-form-option-female",
		description: "Female gender on person detail form",
		defaultMessage: "Female"
	},
	gender_MALE: {
		id: "gender-on-person-detail-form-option-male",
		description: "Male gender on person detail form",
		defaultMessage: "Male"
	},
	gender_OTHER: {
		id: "gender-on-person-detail-form-option-other",
		description: "Other gender on person detail form",
		defaultMessage: "Other"
	},
	chooseADate: {
		id: "person-details-form-choose-a-date",
		description: "Person details form, birthday datepicker placeholder",
		defaultMessage: "Choose a date"
	},
	identificationTypePlaceholder: {
		id: "identification-type-placeholder",
		description: "Person details form, placeholder identification type",
		defaultMessage: "Choose type"
	},
	formIdentificationInformation: {
		id: "pos-form-identification-information",
		description:
			"checkout, details, title in identification part of details form",
		defaultMessage: "Identification"
	},
	formIdentificationInformationTypeLabel: {
		id: "pos-form-identification-type-label",
		description:
			"checkout, details, identification type label in identification part of details form",
		defaultMessage: "Identification type: {identificationType}"
	},
	identificationIssuingAuthority: {
		id: "identification-issuing-authority",
		description:
			"service-desk, checkout, details, label identification issuing authority",
		defaultMessage: "Issuing authority"
	},
	identificationIssuingAuthorityPlaceholder: {
		id: "identification-issuing-authority-placeholder",
		description:
			"service-desk, checkout, details, placeholder identification issuing authority",
		defaultMessage: "Enter issuer"
	},
	identificationIssuingDate: {
		id: "identification-issuing-date",
		description:
			"service-desk, checkout, details, label identification issuing date",
		defaultMessage: "Issuing date"
	},
	identificationDatePlaceholder: {
		id: "identification-date-placeholder",
		description:
			"service-desk, checkout, details, placeholder identification issuing date & expiry date",
		defaultMessage: "Choose Date"
	},
	identificationExpiryDate: {
		id: "identification-expiry-date",
		description:
			"service-desk, checkout, details, label identification expiry date",
		defaultMessage: "Expiry date"
	},
	countryNameAF: {
		id: "global-countries-names-AF",
		description: "Country name in countries list",
		defaultMessage: "Afghanistan"
	},
	countryNameAL: {
		id: "global-countries-names-AL",
		description: "Country name in countries list",
		defaultMessage: "Albania"
	},
	countryNameDZ: {
		id: "global-countries-names-DZ",
		description: "Country name in countries list",
		defaultMessage: "Algeria"
	},
	countryNameAS: {
		id: "global-countries-names-AS",
		description: "Country name in countries list",
		defaultMessage: "American Samoa"
	},
	countryNameAD: {
		id: "global-countries-names-AD",
		description: "Country name in countries list",
		defaultMessage: "Andorra"
	},
	countryNameAO: {
		id: "global-countries-names-AO",
		description: "Country name in countries list",
		defaultMessage: "Angola"
	},
	countryNameAI: {
		id: "global-countries-names-AI",
		description: "Country name in countries list",
		defaultMessage: "Anguilla"
	},
	countryNameAQ: {
		id: "global-countries-names-AQ",
		description: "Country name in countries list",
		defaultMessage: "Antarctica"
	},
	countryNameAG: {
		id: "global-countries-names-AG",
		description: "Country name in countries list",
		defaultMessage: "Antigua And Barbuda"
	},
	countryNameAR: {
		id: "global-countries-names-AR",
		description: "Country name in countries list",
		defaultMessage: "Argentina"
	},
	countryNameAM: {
		id: "global-countries-names-AM",
		description: "Country name in countries list",
		defaultMessage: "Armenia"
	},
	countryNameAW: {
		id: "global-countries-names-AW",
		description: "Country name in countries list",
		defaultMessage: "Aruba"
	},
	countryNameAU: {
		id: "global-countries-names-AU",
		description: "Country name in countries list",
		defaultMessage: "Australia"
	},
	countryNameAT: {
		id: "global-countries-names-AT",
		description: "Country name in countries list",
		defaultMessage: "Austria"
	},
	countryNameAZ: {
		id: "global-countries-names-AZ",
		description: "Country name in countries list",
		defaultMessage: "Azerbaijan"
	},
	countryNameBS: {
		id: "global-countries-names-BS",
		description: "Country name in countries list",
		defaultMessage: "Bahamas"
	},
	countryNameBH: {
		id: "global-countries-names-BH",
		description: "Country name in countries list",
		defaultMessage: "Bahrain"
	},
	countryNameBD: {
		id: "global-countries-names-BD",
		description: "Country name in countries list",
		defaultMessage: "Bangladesh"
	},
	countryNameBB: {
		id: "global-countries-names-BB",
		description: "Country name in countries list",
		defaultMessage: "Barbados"
	},
	countryNameBY: {
		id: "global-countries-names-BY",
		description: "Country name in countries list",
		defaultMessage: "Belarus"
	},
	countryNameBE: {
		id: "global-countries-names-BE",
		description: "Country name in countries list",
		defaultMessage: "Belgium"
	},
	countryNameBZ: {
		id: "global-countries-names-BZ",
		description: "Country name in countries list",
		defaultMessage: "Belize"
	},
	countryNameBJ: {
		id: "global-countries-names-BJ",
		description: "Country name in countries list",
		defaultMessage: "Benin"
	},
	countryNameBM: {
		id: "global-countries-names-BM",
		description: "Country name in countries list",
		defaultMessage: "Bermuda"
	},
	countryNameBT: {
		id: "global-countries-names-BT",
		description: "Country name in countries list",
		defaultMessage: "Bhutan"
	},
	countryNameBO: {
		id: "global-countries-names-BO",
		description: "Country name in countries list",
		defaultMessage: "Bolivia, Plurinational State Of"
	},
	countryNameBQ: {
		id: "global-countries-names-BQ",
		description: "Country name in countries list",
		defaultMessage: "Bonaire, Saint Eustatius And Saba"
	},
	countryNameBA: {
		id: "global-countries-names-BA",
		description: "Country name in countries list",
		defaultMessage: "Bosnia &amp; Herzegovina"
	},
	countryNameBW: {
		id: "global-countries-names-BW",
		description: "Country name in countries list",
		defaultMessage: "Botswana"
	},
	countryNameBV: {
		id: "global-countries-names-BV",
		description: "Country name in countries list",
		defaultMessage: "Bouvet Island"
	},
	countryNameBR: {
		id: "global-countries-names-BR",
		description: "Country name in countries list",
		defaultMessage: "Brazil"
	},
	countryNameIO: {
		id: "global-countries-names-IO",
		description: "Country name in countries list",
		defaultMessage: "British Indian Ocean Territory"
	},
	countryNameBN: {
		id: "global-countries-names-BN",
		description: "Country name in countries list",
		defaultMessage: "Brunei Darussalam"
	},
	countryNameBG: {
		id: "global-countries-names-BG",
		description: "Country name in countries list",
		defaultMessage: "Bulgaria"
	},
	countryNameBF: {
		id: "global-countries-names-BF",
		description: "Country name in countries list",
		defaultMessage: "Burkina Faso"
	},
	countryNameBI: {
		id: "global-countries-names-BI",
		description: "Country name in countries list",
		defaultMessage: "Burundi"
	},
	countryNameCV: {
		id: "global-countries-names-CV",
		description: "Country name in countries list",
		defaultMessage: "Cabo Verde"
	},
	countryNameKH: {
		id: "global-countries-names-KH",
		description: "Country name in countries list",
		defaultMessage: "Cambodia"
	},
	countryNameCM: {
		id: "global-countries-names-CM",
		description: "Country name in countries list",
		defaultMessage: "Cameroon"
	},
	countryNameCA: {
		id: "global-countries-names-CA",
		description: "Country name in countries list",
		defaultMessage: "Canada"
	},
	countryNameKY: {
		id: "global-countries-names-KY",
		description: "Country name in countries list",
		defaultMessage: "Cayman Islands"
	},
	countryNameCF: {
		id: "global-countries-names-CF",
		description: "Country name in countries list",
		defaultMessage: "Central African Republic"
	},
	countryNameTD: {
		id: "global-countries-names-TD",
		description: "Country name in countries list",
		defaultMessage: "Chad"
	},
	countryNameCL: {
		id: "global-countries-names-CL",
		description: "Country name in countries list",
		defaultMessage: "Chile"
	},
	countryNameCN: {
		id: "global-countries-names-CN",
		description: "Country name in countries list",
		defaultMessage: "China"
	},
	countryNameCX: {
		id: "global-countries-names-CX",
		description: "Country name in countries list",
		defaultMessage: "Christmas Island"
	},
	countryNameCC: {
		id: "global-countries-names-CC",
		description: "Country name in countries list",
		defaultMessage: "Cocos (Keeling) Islands"
	},
	countryNameCO: {
		id: "global-countries-names-CO",
		description: "Country name in countries list",
		defaultMessage: "Colombia"
	},
	countryNameKM: {
		id: "global-countries-names-KM",
		description: "Country name in countries list",
		defaultMessage: "Comoros"
	},
	countryNameCK: {
		id: "global-countries-names-CK",
		description: "Country name in countries list",
		defaultMessage: "Cook Islands"
	},
	countryNameCR: {
		id: "global-countries-names-CR",
		description: "Country name in countries list",
		defaultMessage: "Costa Rica"
	},
	countryNameHR: {
		id: "global-countries-names-HR",
		description: "Country name in countries list",
		defaultMessage: "Croatia"
	},
	countryNameCU: {
		id: "global-countries-names-CU",
		description: "Country name in countries list",
		defaultMessage: "Cuba"
	},
	countryNameCW: {
		id: "global-countries-names-CW",
		description: "Country name in countries list",
		defaultMessage: "Curacao"
	},
	countryNameCY: {
		id: "global-countries-names-CY",
		description: "Country name in countries list",
		defaultMessage: "Cyprus"
	},
	countryNameCZ: {
		id: "global-countries-names-CZ",
		description: "Country name in countries list",
		defaultMessage: "Czech Republic"
	},
	countryNameCI: {
		id: "global-countries-names-CI",
		description: "Country name in countries list",
		defaultMessage: "Côte d'Ivoire"
	},
	countryNameCD: {
		id: "global-countries-names-CD",
		description: "Country name in countries list",
		defaultMessage: "Democratic Republic Of Congo"
	},
	countryNameDK: {
		id: "global-countries-names-DK",
		description: "Country name in countries list",
		defaultMessage: "Denmark"
	},
	countryNameDJ: {
		id: "global-countries-names-DJ",
		description: "Country name in countries list",
		defaultMessage: "Djibouti"
	},
	countryNameDM: {
		id: "global-countries-names-DM",
		description: "Country name in countries list",
		defaultMessage: "Dominica"
	},
	countryNameDO: {
		id: "global-countries-names-DO",
		description: "Country name in countries list",
		defaultMessage: "Dominican Republic"
	},
	countryNameEC: {
		id: "global-countries-names-EC",
		description: "Country name in countries list",
		defaultMessage: "Ecuador"
	},
	countryNameEG: {
		id: "global-countries-names-EG",
		description: "Country name in countries list",
		defaultMessage: "Egypt"
	},
	countryNameSV: {
		id: "global-countries-names-SV",
		description: "Country name in countries list",
		defaultMessage: "El Salvador"
	},
	countryNameGQ: {
		id: "global-countries-names-GQ",
		description: "Country name in countries list",
		defaultMessage: "Equatorial Guinea"
	},
	countryNameER: {
		id: "global-countries-names-ER",
		description: "Country name in countries list",
		defaultMessage: "Eritrea"
	},
	countryNameEE: {
		id: "global-countries-names-EE",
		description: "Country name in countries list",
		defaultMessage: "Estonia"
	},
	countryNameET: {
		id: "global-countries-names-ET",
		description: "Country name in countries list",
		defaultMessage: "Ethiopia"
	},
	countryNameFK: {
		id: "global-countries-names-FK",
		description: "Country name in countries list",
		defaultMessage: "Falkland Islands"
	},
	countryNameFO: {
		id: "global-countries-names-FO",
		description: "Country name in countries list",
		defaultMessage: "Faroe Islands"
	},
	countryNameFJ: {
		id: "global-countries-names-FJ",
		description: "Country name in countries list",
		defaultMessage: "Fiji"
	},
	countryNameFI: {
		id: "global-countries-names-FI",
		description: "Country name in countries list",
		defaultMessage: "Finland"
	},
	countryNameFR: {
		id: "global-countries-names-FR",
		description: "Country name in countries list",
		defaultMessage: "France"
	},
	countryNameGF: {
		id: "global-countries-names-GF",
		description: "Country name in countries list",
		defaultMessage: "French Guiana"
	},
	countryNamePF: {
		id: "global-countries-names-PF",
		description: "Country name in countries list",
		defaultMessage: "French Polynesia"
	},
	countryNameTF: {
		id: "global-countries-names-TF",
		description: "Country name in countries list",
		defaultMessage: "French Southern Territories"
	},
	countryNameGA: {
		id: "global-countries-names-GA",
		description: "Country name in countries list",
		defaultMessage: "Gabon"
	},
	countryNameGM: {
		id: "global-countries-names-GM",
		description: "Country name in countries list",
		defaultMessage: "Gambia"
	},
	countryNameGE: {
		id: "global-countries-names-GE",
		description: "Country name in countries list",
		defaultMessage: "Georgia"
	},
	countryNameDE: {
		id: "global-countries-names-DE",
		description: "Country name in countries list",
		defaultMessage: "Germany"
	},
	countryNameGH: {
		id: "global-countries-names-GH",
		description: "Country name in countries list",
		defaultMessage: "Ghana"
	},
	countryNameGI: {
		id: "global-countries-names-GI",
		description: "Country name in countries list",
		defaultMessage: "Gibraltar"
	},
	countryNameGR: {
		id: "global-countries-names-GR",
		description: "Country name in countries list",
		defaultMessage: "Greece"
	},
	countryNameGL: {
		id: "global-countries-names-GL",
		description: "Country name in countries list",
		defaultMessage: "Greenland"
	},
	countryNameGD: {
		id: "global-countries-names-GD",
		description: "Country name in countries list",
		defaultMessage: "Grenada"
	},
	countryNameGP: {
		id: "global-countries-names-GP",
		description: "Country name in countries list",
		defaultMessage: "Guadeloupe"
	},
	countryNameGU: {
		id: "global-countries-names-GU",
		description: "Country name in countries list",
		defaultMessage: "Guam"
	},
	countryNameGT: {
		id: "global-countries-names-GT",
		description: "Country name in countries list",
		defaultMessage: "Guatemala"
	},
	countryNameGG: {
		id: "global-countries-names-GG",
		description: "Country name in countries list",
		defaultMessage: "Guernsey"
	},
	countryNameGN: {
		id: "global-countries-names-GN",
		description: "Country name in countries list",
		defaultMessage: "Guinea"
	},
	countryNameGW: {
		id: "global-countries-names-GW",
		description: "Country name in countries list",
		defaultMessage: "Guinea-bissau"
	},
	countryNameGY: {
		id: "global-countries-names-GY",
		description: "Country name in countries list",
		defaultMessage: "Guyana"
	},
	countryNameHT: {
		id: "global-countries-names-HT",
		description: "Country name in countries list",
		defaultMessage: "Haiti"
	},
	countryNameHM: {
		id: "global-countries-names-HM",
		description: "Country name in countries list",
		defaultMessage: "Heard Island And McDonald Islands"
	},
	countryNameHN: {
		id: "global-countries-names-HN",
		description: "Country name in countries list",
		defaultMessage: "Honduras"
	},
	countryNameHK: {
		id: "global-countries-names-HK",
		description: "Country name in countries list",
		defaultMessage: "Hong Kong"
	},
	countryNameHU: {
		id: "global-countries-names-HU",
		description: "Country name in countries list",
		defaultMessage: "Hungary"
	},
	countryNameIS: {
		id: "global-countries-names-IS",
		description: "Country name in countries list",
		defaultMessage: "Iceland"
	},
	countryNameIN: {
		id: "global-countries-names-IN",
		description: "Country name in countries list",
		defaultMessage: "India"
	},
	countryNameID: {
		id: "global-countries-names-ID",
		description: "Country name in countries list",
		defaultMessage: "Indonesia"
	},
	countryNameIR: {
		id: "global-countries-names-IR",
		description: "Country name in countries list",
		defaultMessage: "Iran, Islamic Republic Of"
	},
	countryNameIQ: {
		id: "global-countries-names-IQ",
		description: "Country name in countries list",
		defaultMessage: "Iraq"
	},
	countryNameIE: {
		id: "global-countries-names-IE",
		description: "Country name in countries list",
		defaultMessage: "Ireland"
	},
	countryNameIM: {
		id: "global-countries-names-IM",
		description: "Country name in countries list",
		defaultMessage: "Isle Of Man"
	},
	countryNameIL: {
		id: "global-countries-names-IL",
		description: "Country name in countries list",
		defaultMessage: "Israel"
	},
	countryNameIT: {
		id: "global-countries-names-IT",
		description: "Country name in countries list",
		defaultMessage: "Italy"
	},
	countryNameJM: {
		id: "global-countries-names-JM",
		description: "Country name in countries list",
		defaultMessage: "Jamaica"
	},
	countryNameJP: {
		id: "global-countries-names-JP",
		description: "Country name in countries list",
		defaultMessage: "Japan"
	},
	countryNameJE: {
		id: "global-countries-names-JE",
		description: "Country name in countries list",
		defaultMessage: "Jersey"
	},
	countryNameJO: {
		id: "global-countries-names-JO",
		description: "Country name in countries list",
		defaultMessage: "Jordan"
	},
	countryNameKZ: {
		id: "global-countries-names-KZ",
		description: "Country name in countries list",
		defaultMessage: "Kazakhstan"
	},
	countryNameKE: {
		id: "global-countries-names-KE",
		description: "Country name in countries list",
		defaultMessage: "Kenya"
	},
	countryNameKI: {
		id: "global-countries-names-KI",
		description: "Country name in countries list",
		defaultMessage: "Kiribati"
	},
	countryNameKP: {
		id: "global-countries-names-KP",
		description: "Country name in countries list",
		defaultMessage: "Korea, Democratic People's Republic Of"
	},
	countryNameKR: {
		id: "global-countries-names-KR",
		description: "Country name in countries list",
		defaultMessage: "Korea, Republic Of"
	},
	countryNameKW: {
		id: "global-countries-names-KW",
		description: "Country name in countries list",
		defaultMessage: "Kuwait"
	},
	countryNameKG: {
		id: "global-countries-names-KG",
		description: "Country name in countries list",
		defaultMessage: "Kyrgyzstan"
	},
	countryNameLA: {
		id: "global-countries-names-LA",
		description: "Country name in countries list",
		defaultMessage: "Lao People's Democratic Republic"
	},
	countryNameLV: {
		id: "global-countries-names-LV",
		description: "Country name in countries list",
		defaultMessage: "Latvia"
	},
	countryNameLB: {
		id: "global-countries-names-LB",
		description: "Country name in countries list",
		defaultMessage: "Lebanon"
	},
	countryNameLS: {
		id: "global-countries-names-LS",
		description: "Country name in countries list",
		defaultMessage: "Lesotho"
	},
	countryNameLR: {
		id: "global-countries-names-LR",
		description: "Country name in countries list",
		defaultMessage: "Liberia"
	},
	countryNameLY: {
		id: "global-countries-names-LY",
		description: "Country name in countries list",
		defaultMessage: "Libya"
	},
	countryNameLI: {
		id: "global-countries-names-LI",
		description: "Country name in countries list",
		defaultMessage: "Liechtenstein"
	},
	countryNameLT: {
		id: "global-countries-names-LT",
		description: "Country name in countries list",
		defaultMessage: "Lithuania"
	},
	countryNameLU: {
		id: "global-countries-names-LU",
		description: "Country name in countries list",
		defaultMessage: "Luxembourg"
	},
	countryNameMO: {
		id: "global-countries-names-MO",
		description: "Country name in countries list",
		defaultMessage: "Macao"
	},
	countryNameMK: {
		id: "global-countries-names-MK",
		description: "Country name in countries list",
		defaultMessage: "Macedonia, The Former Yugoslav Republic Of"
	},
	countryNameMG: {
		id: "global-countries-names-MG",
		description: "Country name in countries list",
		defaultMessage: "Madagascar"
	},
	countryNameMW: {
		id: "global-countries-names-MW",
		description: "Country name in countries list",
		defaultMessage: "Malawi"
	},
	countryNameMY: {
		id: "global-countries-names-MY",
		description: "Country name in countries list",
		defaultMessage: "Malaysia"
	},
	countryNameMV: {
		id: "global-countries-names-MV",
		description: "Country name in countries list",
		defaultMessage: "Maldives"
	},
	countryNameML: {
		id: "global-countries-names-ML",
		description: "Country name in countries list",
		defaultMessage: "Mali"
	},
	countryNameMT: {
		id: "global-countries-names-MT",
		description: "Country name in countries list",
		defaultMessage: "Malta"
	},
	countryNameMH: {
		id: "global-countries-names-MH",
		description: "Country name in countries list",
		defaultMessage: "Marshall Islands"
	},
	countryNameMQ: {
		id: "global-countries-names-MQ",
		description: "Country name in countries list",
		defaultMessage: "Martinique"
	},
	countryNameMR: {
		id: "global-countries-names-MR",
		description: "Country name in countries list",
		defaultMessage: "Mauritania"
	},
	countryNameMU: {
		id: "global-countries-names-MU",
		description: "Country name in countries list",
		defaultMessage: "Mauritius"
	},
	countryNameYT: {
		id: "global-countries-names-YT",
		description: "Country name in countries list",
		defaultMessage: "Mayotte"
	},
	countryNameMX: {
		id: "global-countries-names-MX",
		description: "Country name in countries list",
		defaultMessage: "Mexico"
	},
	countryNameFM: {
		id: "global-countries-names-FM",
		description: "Country name in countries list",
		defaultMessage: "Micronesia, Federated States Of"
	},
	countryNameMD: {
		id: "global-countries-names-MD",
		description: "Country name in countries list",
		defaultMessage: "Moldova"
	},
	countryNameMC: {
		id: "global-countries-names-MC",
		description: "Country name in countries list",
		defaultMessage: "Monaco"
	},
	countryNameMN: {
		id: "global-countries-names-MN",
		description: "Country name in countries list",
		defaultMessage: "Mongolia"
	},
	countryNameME: {
		id: "global-countries-names-ME",
		description: "Country name in countries list",
		defaultMessage: "Montenegro"
	},
	countryNameMS: {
		id: "global-countries-names-MS",
		description: "Country name in countries list",
		defaultMessage: "Montserrat"
	},
	countryNameMA: {
		id: "global-countries-names-MA",
		description: "Country name in countries list",
		defaultMessage: "Morocco"
	},
	countryNameMZ: {
		id: "global-countries-names-MZ",
		description: "Country name in countries list",
		defaultMessage: "Mozambique"
	},
	countryNameMM: {
		id: "global-countries-names-MM",
		description: "Country name in countries list",
		defaultMessage: "Myanmar"
	},
	countryNameNA: {
		id: "global-countries-names-NA",
		description: "Country name in countries list",
		defaultMessage: "Namibia"
	},
	countryNameNR: {
		id: "global-countries-names-NR",
		description: "Country name in countries list",
		defaultMessage: "Nauru"
	},
	countryNameNP: {
		id: "global-countries-names-NP",
		description: "Country name in countries list",
		defaultMessage: "Nepal"
	},
	countryNameNL: {
		id: "global-countries-names-NL",
		description: "Country name in countries list",
		defaultMessage: "Netherlands"
	},
	countryNameNC: {
		id: "global-countries-names-NC",
		description: "Country name in countries list",
		defaultMessage: "New Caledonia"
	},
	countryNameNZ: {
		id: "global-countries-names-NZ",
		description: "Country name in countries list",
		defaultMessage: "New Zealand"
	},
	countryNameNI: {
		id: "global-countries-names-NI",
		description: "Country name in countries list",
		defaultMessage: "Nicaragua"
	},
	countryNameNE: {
		id: "global-countries-names-NE",
		description: "Country name in countries list",
		defaultMessage: "Niger"
	},
	countryNameNG: {
		id: "global-countries-names-NG",
		description: "Country name in countries list",
		defaultMessage: "Nigeria"
	},
	countryNameNU: {
		id: "global-countries-names-NU",
		description: "Country name in countries list",
		defaultMessage: "Niue"
	},
	countryNameNF: {
		id: "global-countries-names-NF",
		description: "Country name in countries list",
		defaultMessage: "Norfolk Island"
	},
	aaLoginCallback: {
		id: "aa-login-callback-point-of-sales",
		description: "service desk, title",
		defaultMessage: "Point of Sales"
	},
	aaLoginProcess: {
		id: "pos-aalogin-process-login",
		description: "AA login callback, show this text while processing callback",
		defaultMessage: "Logging in, please wait"
	},
	checkoutCustomerDetails: {
		id: "pos-checkout-wizard-customer-details",
		description: "Label for pos checkout wizard customer details step",
		defaultMessage: "Customer details"
	},
	checkoutCustomerDescription: {
		id: "pos-checkout-add-wizard-customer-description",
		description: "Description for pos checkout wizard customer details tep",
		defaultMessage: "Add your customer details"
	},
	checkoutContract: {
		id: "pos-checkout-wizard-contract",
		description: "Label for pos checkout wizard contract step",
		defaultMessage: "Contract"
	},
	checkoutContractDescription: {
		id: "pos-checkout-wizard-contract-description",
		description: "Description for pos checkout wizard contract step",
		defaultMessage: "Upload, review & sign contract"
	},
	checkoutPayment: {
		id: "pos-checkout-wizard-payment",
		description: "Label for pos checkout wizard payment step",
		defaultMessage: "Payment"
	},
	checkoutPaymentDescription: {
		id: "pos-checkout-wizard-payment-description",
		description: "Description for pos checkout wizard payment step",
		defaultMessage: "Choose payment option"
	},
	paymentErrorMessageFailed: {
		id: "pos-payment-specific-error-message-receipt-create-failed",
		description: "Payment error message, receipt create failed",
		defaultMessage: "Your order was paid and accepted," +
			"but the payment did not register in our system. Please contact sales person.",
	},
	orderReferenceNumber: {
		id: "pos-order-completed-reference-number",
		defaultMessage: "Basket reference number",
		description: "POS Order completed, basket reference number display"
	},
	orderBasketFinalCost: {
		id: "pos-order-completed-basket-item-list-final-cost",
		description: "Final cost label in pos order completed basket list",
		defaultMessage: "Final cost"
	},
	orderBasketRecurring: {
		id: "pos-order-completed-basket-item-list-Recurring",
		description: "Recurring field of basket list table",
		defaultMessage: "Recurring"
	},
	orderBasketUpfront: {
		id: "pos-order-completed-basket-item-list-upfront",
		description: "Upfront field of basket list table",
		defaultMessage: "Upfront"
	},
	orderBasketName: {
		id: "pos-order-completed-basket-item-list-name",
		description: "Name field of basket list table",
		defaultMessage: "Name"
	},
	orderPurchaseSummary: {
		id: "pos-order-completed-purchase-summary",
		description: "Purchase summary title in pos order completed",
		defaultMessage: "Purchase summary"
	},
	orderContinueShopping: {
		id: "pos-order-completed-continue-shopping",
		description: "Link back to shop after payment succeeded",
		defaultMessage: "Continue to shop"
	},
	orderConfirmation: {
		id: "pos-order-completed-confirmation",
		description: "Message shown when payment succeeded and user was returned to shop",
		defaultMessage: "Purchase completed"
	},
	checkoutBackDetails: {
		id: "pos-checkout-back-to-details",
		description: "Pos checkout, go back to details button label",
		defaultMessage: "Back to details"
	},
	summaryGoPayment: {
		id: "pos-summary-go-to-payment",
		description: "checkout, summary, go to payment-button",
		defaultMessage: "Go to payment"
	},
	paymentSummaryUploadFile: {
		id: "pos-payment-summary-upload-file",
		description: "payment, summary step, upload files",
		defaultMessage: "Upload scanned documents"
	},
	paymentSummaryUploadFileSuccess: {
		id: "pos-payment-summary-upload-file-success",
		description: "payment, summary step, file uploaded successfully",
		defaultMessage: "Document uploaded successfully"
	},
	paymentSummaryUploadFileFailed: {
		id: "pos-payment-summary-upload-file-failed",
		description: "payment, summary step, file uploaded failed",
		defaultMessage: "Document upload failed. Please try again"
	},
	summaryHaveRead: {
		id: "pos-summary-i-have-read",
		description: "checkout, summary, i have read and signed, link to terms and conditions",
		defaultMessage: "I have read and agree with {link}"
	},
	summaryHaveReadContract: {
		id: "pos-summary-have-read-contract-with-link",
		description: "checkout, summary, i have read contract select and link",
		defaultMessage: "I have downloaded and read {link}"
	},
	summaryCheckOrder: {
		id: "pos-summary-check-your-order-contents",
		description: "Checkout summary step title",
		defaultMessage: "Check your order contents"
	},
	summaryTermLink: {
		id: "pos-summary-term-link",
		description: "Checkout summary, terms preview modal link",
		defaultMessage: "terms & conditions"
	},
	summaryContractLink: {
		id: "pos-summary-contract-link",
		description: "Checkout summary, contract preview modal link",
		defaultMessage: "my contract"
	},
	checkoutSaveAndCloseLabel: {
		id: "pos-checkout-save-and-close-button-label",
		description: "Save and close button label",
		defaultMessage: "Save and close"
	},
	checkoutCancelLabel: {
		id: "pos-checkout-cancel-button-label",
		description: "Cancel button label",
		defaultMessage: "Cancel"
	},
	checkoutPickUpStore: {
		id: "pos-checkout-pick-up-from-store",
		description: "Pos checkout pick up from store radio button label",
		defaultMessage: "Pick up from store"
	},
	checkoutNewAddressCountry: {
		id: "pos-checkout-new-address-country",
		description: "Label for new country form entry",
		defaultMessage: "Country"
	},
	checkoutNewAddressCity: {
		id: "pos-checkout-new-address-city",
		description: "Label for new city form entry",
		defaultMessage: "City"
	},
	checkoutNewAddressPostCode: {
		id: "pos-checkout-new-address-postal-code",
		description: "Label for new postal code form entry",
		defaultMessage: "Postal code"
	},
	checkoutNewCoAddress: {
		id: "pos-checkout-new-coaddress-address",
		description: "Label for new co address form entry",
		defaultMessage: "Co address"
	},
	checkoutNewStreetAddress: {
		id: "pos-checkout-new-street-address",
		description: "Label for new street address form entry",
		defaultMessage: "Street address"
	},
	checkoutDeliveryNewAddress: {
		id: "pos-checkout-delivery-use-new-address",
		description: "Use new address radio button label",
		defaultMessage: "Use new address"
	},
	basketNotReadyPayment: {
		id: "basket-not-ready-payment",
		description: "checkout, payment, basket not ready",
		defaultMessage: "Basket not ready for payment"
	},
	checkoutPaymentTitle: {
		id: "checkout-payment-title",
		description: "Checkout payment step page title",
		defaultMessage: "Pay for your order"
	},
	paymentBtnTitle: {
		id: "pos-payment-pay-button-label",
		description: "POS, payment, pay button label",
		defaultMessage: "Pay"
	},
	selectPaymentMethod: {
		id: "pos-payment-select-payment-method",
		description: "payment-select-payment-method",
		defaultMessage: "Please select method of payment"
	},
	paymentCompleteOneTime: {
		id: "payment-to-complete-one-time",
		description: "payment-to-complete-one-time",
		defaultMessage: "To complete your order, you must pay {totalSum}"
	},
	paymentErrorPaymentCanceled: {
		id: "pos-payment-specific-error-message-payment-canceled",
		description: "Payment error message, payment canceled",
		defaultMessage: "Your payment was canceled"
	},
	paymentErrorPaymentReject: {
		id: "pos-payment-specific-error-message-payment-rejected",
		description: "Payment error message, payment rejected",
		defaultMessage: "Your payment was rejected"
	},
	paymentErrorCashFailed: {
		id: "pos-payment-specific-error-message-cash-payment-failed",
		description: "Payment error message, cash payment failed",
		defaultMessage: "Cash payment failed"
	},
	paymentErrorBalanceSurpassed: {
		id: "pos-payment-specific-error-message-balance-surpassed",
		description: "Payment error message, balance surpassed",
		defaultMessage: "Total fee {totalFee} cannot be deducted from MainBalance {mainBalance}, Please perform the top up and press {refreshButton}",
	},
	paymentErrorBasketNotFound: {
		id: "pos-payment-specific-error-message-basket-not-found",
		description: "Payment error message, basket not found",
		defaultMessage: "Basket not found"
	},
	paymentErrorMethodNotFound: {
		id: "pos-payment-specific-error-message-payment-method-not-found",
		description: "Payment error message, payment method not found",
		defaultMessage: "Payment method not found"
	},
	paymentErrorReject: {
		id: "pos-payment-specific-error-message-payment-rejected-choose-another",
		description: "Payment error message, payment rejected",
		defaultMessage: "Your payment was rejected, please choose another payment method"
	},
	setupGoToSummary: {
		id: "pos-setup-go-to-summary",
		description: "Checkout setup step continue to next step contracts step button",
		defaultMessage: "Go to contracts"
	},
	checkoutSavePersonInfo: {
		id: "checkout-save-person-information",
		defaultMessage: "Save information",
		description: "Checkout person details form save button label",
	},
	personalFormAddress: {
		id: "person-details-form-address-label",
		description: "Person details form, address label",
		defaultMessage: "Address"
	},
	fillInCustomerDetails: {
		id: "person-details-form-please-fill-in-customer-details",
		description: "Person details form, fill in customer details title",
		defaultMessage: "Fill in customer details"
	},
	checkoutPaymentText: {
		id: "pos-checkout-no-payment-text",
		description: "no-payment-to-complete-one-time",
		defaultMessage: "Payment is not required. To complete your order, press proceed."
	},
	checkoutPaymentProcced: {
		id: "pos-payment-proceed-button-label",
		description: "POS, payment, proceed button label",
		defaultMessage: "Proceed"
	},
	createForm: {
		id: "pos-document-create-form",
		description: "POS, create form",
		defaultMessage: "Create form"
	},
	successGenerate: {
		id: "pos-document-success-generate-form",
		description: "POS, create form success",
		defaultMessage: "Form generated successfully.",
	},
	successGenerateCheckStatus: {
		id: "pos-document-success-generate-form-status",
		description: "POS, create form success form status",
		defaultMessage: "Check Status"
	},
	failedGenerateCheckstatus: {
		id: "pos-document-failed-generate-form-status",
		description: "POS, create form Failed  status",
		defaultMessage: "Error generating form."
	},
	documentSigned: {
		id: "pos-document-success-generate-signed-status",
		description: "POS, success generate signed status",
		defaultMessage: "Document signed."
	},
	documentYetSigned: {
		id: "pos-document-success-yet-signed-status",
		description: "POS, generate signed status",
		defaultMessage: "Document yet to be signed."
	},
	documentTypeNotSupport: {
		id: "pos-document-type-not-support",
		description: "POS, document type",
		defaultMessage: "Document type not supported."
	},
	notEnoughBalance: {
		id: "pos-messages-not-enough-balance",
		description: "General message presented to customer when there is not enough balance to proceed",
		defaultMessage: "The account balance is insufficient. Please perform the top up and retry"
	},
	privacyConsent: {
		id: "pos-summary-privacy-consent",
		description: "Checkout summary, capture customer privacy consent",
		defaultMessage: "Privacy Consents"
	},
});

export default PosMessages;
export { PosMessages, PosMessagesType };
