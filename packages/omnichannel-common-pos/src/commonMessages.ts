import { defineMessages, FormattedMessage } from "react-intl";

interface CommonMessagesType {
	navbarQvantelOC: FormattedMessage.MessageDescriptor;
	inStoreStock: FormattedMessage.MessageDescriptor;
	inCentralStock: FormattedMessage.MessageDescriptor;
	loginSessionExpired: FormattedMessage.MessageDescriptor;
	loginButton: FormattedMessage.MessageDescriptor;
	loginModalEmailInput: FormattedMessage.MessageDescriptor;
	loginModalPasswordInput: FormattedMessage.MessageDescriptor;
	loginError: FormattedMessage.MessageDescriptor;
	apiErrorInvitationNotFound: FormattedMessage.MessageDescriptor;
	loginEmailError: FormattedMessage.MessageDescriptor;
	loginPasswordError: FormattedMessage.MessageDescriptor;
	upfrontPrice: FormattedMessage.MessageDescriptor;
	monthlyPrice: FormattedMessage.MessageDescriptor;
	payOrder: FormattedMessage.MessageDescriptor;
	paymentMethodLabelBilling_cashier: FormattedMessage.MessageDescriptor;
	paymentMethodLabelBilling_nextBill: FormattedMessage.MessageDescriptor;
	paymentMethodLabelBilling_creditCard: FormattedMessage.MessageDescriptor;
	paymentMethodLabelBilling_direct: FormattedMessage.MessageDescriptor;
	paymentCancel: FormattedMessage.MessageDescriptor;
	priceInterval_MONTH: FormattedMessage.MessageDescriptor;
	priceInterval_MONTH_shorthand: FormattedMessage.MessageDescriptor;
	priceInterval_NOW: FormattedMessage.MessageDescriptor;
	priceInterval_WEEK: FormattedMessage.MessageDescriptor;
	priceInterval_YEAR: FormattedMessage.MessageDescriptor;
	save: FormattedMessage.MessageDescriptor;
	changeSim: FormattedMessage.MessageDescriptor;
	gender: FormattedMessage.MessageDescriptor;
	language: FormattedMessage.MessageDescriptor;
	dateOfBirth: FormattedMessage.MessageDescriptor;
	countryOfBirth: FormattedMessage.MessageDescriptor;
	country: FormattedMessage.MessageDescriptor;
	emailRequired: FormattedMessage.MessageDescriptor;
	streetRequired: FormattedMessage.MessageDescriptor;
	postalCodeRequired: FormattedMessage.MessageDescriptor;
	cityRequired: FormattedMessage.MessageDescriptor;
	countryRequired: FormattedMessage.MessageDescriptor;
	apiErrorNotFound: FormattedMessage.MessageDescriptor;
	useHomeAddress: FormattedMessage.MessageDescriptor;
	useCustomAddress: FormattedMessage.MessageDescriptor;
	collectFromStore: FormattedMessage.MessageDescriptor;
	orderNewSim: FormattedMessage.MessageDescriptor;
	selectedSim: FormattedMessage.MessageDescriptor;
	selectSim: FormattedMessage.MessageDescriptor;
	orderNewSimDone: FormattedMessage.MessageDescriptor;
	orderNewSimCanceled: FormattedMessage.MessageDescriptor;
	cardTypeRequired: FormattedMessage.MessageDescriptor;
	cardNumberRequired: FormattedMessage.MessageDescriptor;
	cardHolderNameRequired: FormattedMessage.MessageDescriptor;
	passwordRequired: FormattedMessage.MessageDescriptor;
	oldPasswordRequired: FormattedMessage.MessageDescriptor;
	newPasswordRequired: FormattedMessage.MessageDescriptor;
	retypeNewPasswordRequired: FormattedMessage.MessageDescriptor;
	retypeNewPasswordMatch: FormattedMessage.MessageDescriptor;
	passwordConfirmPlaceholder: FormattedMessage.MessageDescriptor;
	passwordPlaceholder: FormattedMessage.MessageDescriptor;
	passwordConfirmationRequired: FormattedMessage.MessageDescriptor;
	passwordsDoNotMatch: FormattedMessage.MessageDescriptor;
	addressStreet: FormattedMessage.MessageDescriptor;
	addressPostalCode: FormattedMessage.MessageDescriptor;
	addressCity: FormattedMessage.MessageDescriptor;
	addressCountry: FormattedMessage.MessageDescriptor;
	registrationFailureDueToDuplicateEmail: FormattedMessage.MessageDescriptor;
	backToSearch: FormattedMessage.MessageDescriptor;
	streetName: FormattedMessage.MessageDescriptor;
	zipCode: FormattedMessage.MessageDescriptor;
	city: FormattedMessage.MessageDescriptor;
	selectCountry: FormattedMessage.MessageDescriptor;
	basketClearedErrorMessage: FormattedMessage.MessageDescriptor;
	compareDevices: FormattedMessage.MessageDescriptor;
	inBasket: FormattedMessage.MessageDescriptor;
	addToBasket: FormattedMessage.MessageDescriptor;
	changePasswordContactType: FormattedMessage.MessageDescriptor;
	changePasswordEmailInput: FormattedMessage.MessageDescriptor;
	changePasswordPhoneInput: FormattedMessage.MessageDescriptor;
	changePasswordEmailRequired: FormattedMessage.MessageDescriptor;
	changePasswordEmailInvalidFormat: FormattedMessage.MessageDescriptor;
	changePasswordPhoneRequired: FormattedMessage.MessageDescriptor;
	registerContactPhoneRequired: FormattedMessage.MessageDescriptor;
	registerEmailRequired: FormattedMessage.MessageDescriptor;
	registerValidationCodeRequired: FormattedMessage.MessageDescriptor;
	registerPasswordRequired: FormattedMessage.MessageDescriptor;
	registerPasswordConfirmationRequired: FormattedMessage.MessageDescriptor;
	registerPasswordsMustMatch: FormattedMessage.MessageDescriptor;
	registerContinueToNextStep: FormattedMessage.MessageDescriptor;
	lifeCycleStatusPending: FormattedMessage.MessageDescriptor;
	lifeCycleStatusActive: FormattedMessage.MessageDescriptor;
	lifeCycleStatusActivated: FormattedMessage.MessageDescriptor;
	lifeCycleStatusTerminated: FormattedMessage.MessageDescriptor;
	lifeCycleStatusSuspended: FormattedMessage.MessageDescriptor;
	invalidPhone: FormattedMessage.MessageDescriptor;
	subscriptionAddonActivationFee: FormattedMessage.MessageDescriptor;
	subscriptionAddonRecurringFee: FormattedMessage.MessageDescriptor;
	productOfferingConfigFreeProduct: FormattedMessage.MessageDescriptor;
	subscriptionsChangeAddon: FormattedMessage.MessageDescriptor;
	subscriptionsConfigureAddon: FormattedMessage.MessageDescriptor;
	subscriptionAvailableAddonsShowMore: FormattedMessage.MessageDescriptor;
	subscriptionAvailableAddonsShowAll: FormattedMessage.MessageDescriptor;
	activateAddon: FormattedMessage.MessageDescriptor;
	configureButtonLabel: FormattedMessage.MessageDescriptor;
	servicesNameLabel: FormattedMessage.MessageDescriptor;
	iHaveQuestionAbout: FormattedMessage.MessageDescriptor;
	sendSupportRequest: FormattedMessage.MessageDescriptor;
	creditCardStorageSelectionLabel: FormattedMessage.MessageDescriptor;
	creditCardStorageSelectionDescription: FormattedMessage.MessageDescriptor;
	noStoredCreditCards: FormattedMessage.MessageDescriptor;
}

const CommonMessages: CommonMessagesType = defineMessages({
	navbarQvantelOC: {
		id: "qvantel-omnichannel",
		description: "navbar, title qvantel-omnichannel",
		defaultMessage: "Omnichannel"
	},
	inStoreStock: {
		id: "service-browser-in-store-stock",
		description: "Service browser, product is in store stock",
		defaultMessage: "In store stock"
	},
	inCentralStock: {
		id: "service-browser-in-central-stock",
		description: "Service browser, product is in central stock",
		defaultMessage: "In central stock"
	},
	loginSessionExpired: {
		id: "session-expired",
		description: "User session has expired and he has to log in again",
		defaultMessage: "Your session has expired. Please sign in again."
	},
	loginButton: {
		id: "login-modal-login-button",
		description: "Login button",
		defaultMessage: "Login"
	},
	loginModalEmailInput: {
		id: "login-modal-email-input",
		description: "Placeholder for email input field",
		defaultMessage: "Email"
	},
	loginModalPasswordInput: {
		id: "login-modal-password-input",
		description: "Placeholder for password input field",
		defaultMessage: "Password"
	},
	loginError: {
		id: "Login error",
		description: "Login error",
		defaultMessage: "Login error"
	},
	apiErrorInvitationNotFound: {
		id: "api-error-invitation-not-found",
		description: "Login invitation was not found",
		defaultMessage: "Invitation was not found"
	},
	loginEmailError: {
		id: "common-loginform-email-validation-error",
		description: "Error message shown when user has entered an invalid email address",
		defaultMessage: "Please enter a valid email address"
	},
	loginPasswordError: {
		id: "common-loginform-password-validation-error",
		description: "Error message shown when user has tried to login with no password or with a password that does not satisfy validation requirements",
		defaultMessage: "Please enter a password"
	},
	upfrontPrice: {
		id: "service-browser-navigation-bar-upfront-price",
		description: "Service browser navi back upfront price label",
		defaultMessage: "Upfront:"
	},
	monthlyPrice: {
		id: "service-browser-navigation-bar-monthly-price",
		description: "Service browser navi back monthly price label",
		defaultMessage: "Monthly:"
	},
	payOrder: {
		id: "checkout-paymentform-submit-button-value",
		description: "checkout, PaymentForm, submit button",
		defaultMessage: "Pay order using mock bank"
	},
	paymentMethodLabelBilling_cashier: {
		id: "payment-method-billing-cashier-label",
		description: "In checkout payment step, cashier payment method label text",
		defaultMessage: "Pay through cashier system"
	},
	paymentMethodLabelBilling_nextBill: {
		id: "payment-method-billing-next-bill-label",
		description: "In checkout payment step, pay in next bill payment method label text",
		defaultMessage: "Pay in my next bill"
	},
	paymentMethodLabelBilling_creditCard: {
		id: "payment-method-billing-credit-card-label",
		description: "In checkout payment step, credit card payment method label text",
		defaultMessage: "Pay with my credit card"
	},
	paymentMethodLabelBilling_direct: {
		id: "payment-method-billing-direct-payment-label",
		description: "In checkout payment step, direct payment method label text",
		defaultMessage: "Pay through direct payment"
	},
	paymentCancel: {
		id: "payment-cancel",
		description: "in payment selection, cancel-button",
		defaultMessage: "Cancel"
	},
	priceInterval_MONTH: {
		id: "b2c-shop-generic-price-interval-monthly",
		description: "Monthly price text",
		defaultMessage: "monthly"
	},
	priceInterval_MONTH_shorthand: {
		id: "b2c-shop-generic-price-interval-monthly-shorthand",
		description: "Monthly price text, shorthand",
		defaultMessage: " / mo"
	},
	priceInterval_NOW: {
		id: "b2c-shop-generic-price-interval-pay-now",
		description: "Pay now price text",
		defaultMessage: "now"
	},
	priceInterval_WEEK: {
		id: "b2c-shop-generic-price-interval-weekly",
		description: "Weekly price text",
		defaultMessage: "weekly"
	},
	priceInterval_YEAR: {
		id: "b2c-shop-generic-price-interval-yearly",
		description: "Yearly price text",
		defaultMessage: "yearly"
	},
	save: {
		id: "common-messages-save",
		description: "Save",
		defaultMessage: "Save"
	},
	changeSim: {
		id: "new-sim",
		description: "in order new SIM, pay button",
		defaultMessage: "Order new SIM"
	},
	gender: {
		id: "registration-gender",
		description: "Register, gender",
		defaultMessage: "Gender"
	},
	language: {
		id: "registration-select-language",
		description: "Register, select language",
		defaultMessage: "Language"
	},
	dateOfBirth: {
		id: "registration-date-of-birth",
		description: "Label for date of birth input",
		defaultMessage: "Date of birth"
	},
	countryOfBirth: {
		id: "registration-place-of-birth",
		description: "Register, place of birth",
		defaultMessage: "Country of birth"
	},
	country: {
		id: "registration-country",
		description: "Register, contact country",
		defaultMessage: "Country"
	},
	emailRequired: {
		id: "common-messages-form-email-is-required",
		description: "error shown when email was not given",
		defaultMessage: "Email is required"
	},
	streetRequired: {
		id: "common-messages-delivery-address-validation-form-street-is-required",
		description: "Delivery address validation, error shown when street was not given",
		defaultMessage: "Street Address is required"
	},
	postalCodeRequired: {
		id: "common-messages-delivery-address-validation-form-postal-code-is-required",
		description: "Delivery address validation, error shown when postalCode was not given",
		defaultMessage: "Postal code is required"
	},
	cityRequired: {
		id: "common-messages-delivery-address-validation-form-city-is-required",
		description: "Delivery address validation, error shown when city was not given",
		defaultMessage: "City is required"
	},
	countryRequired: {
		id: "common-messages-delivery-address-validation-form-country-is-required",
		description: "Delivery address validation, error shown when country was not selected",
		defaultMessage: "Country is required"
	},
	apiErrorNotFound: {
		id: "api-request-returned-404",
		description: "Error messages to show when ErrorContainer returned apiErrorNotFound code.",
		defaultMessage: "The requested resource could not be found."
	},
	useHomeAddress: {
		id: "use-home-address-checkbox",
		description: "Use home address checkbox",
		defaultMessage: "Use home address"
	},
	useCustomAddress: {
		id: "use-custom-address-checkbox",
		description: "Use custom address checkbox",
		defaultMessage: "Use custom address"
	},
	collectFromStore: {
		id: "collect-from-store-checkbox",
		description: "Collect from checkbox",
		defaultMessage: "Collect from store"
	},
	orderNewSim: {
		id: "order-new-sim",
		description: "Used with order new SIM title",
		defaultMessage: "Order new SIM"
	},
	selectedSim: {
		id: "selected-sim-card",
		description: "Used with change SIM selectable SIM cards, with the selected one",
		defaultMessage: "SELECTED"
	},
	selectSim: {
		id: "select-sim-card",
		description: "Used with change SIM selectable SIM cards",
		defaultMessage: "SELECT"
	},
	orderNewSimDone: {
		id: "select-sim-card-done",
		description: "Used with change SIM when order is completed",
		defaultMessage: "All done!"
	},
	orderNewSimCanceled: {
		id: "select-sim-card-canceled",
		description: "Used with change SIM when order is canceled",
		defaultMessage: "Order was canceled."
	},
	cardTypeRequired: {
		id: "credit-card-card-type-is-required",
		description: "Credit card type selection",
		defaultMessage: "Card type is required"
	},
	cardNumberRequired: {
		id: "credit-card-card-number-is-required",
		description: "Credit card number typing",
		defaultMessage: "Card number is required"
	},
	cardHolderNameRequired: {
		id: "credit-card-card-holder-is-required",
		description: "Credit card holder typing",
		defaultMessage: "Card holder is required"
	},
	passwordRequired: {
		id: "password-required",
		description: "Used with required input password",
		defaultMessage: "Password is required"
	},
	oldPasswordRequired: {
		id: "old-password-required",
		description: "Used with required input password when changing password",
		defaultMessage: "Old password is required"
	},
	newPasswordRequired: {
		id: "new-password-required",
		description: "Used with required input password when changing password",
		defaultMessage: "New password is required"
	},
	retypeNewPasswordRequired: {
		id: "retype-new-password-required",
		description: "Used with required input password when changing password",
		defaultMessage: "Retype is required"
	},
	retypeNewPasswordMatch: {
		id: "retype-new-password-match",
		description: "Used with required input password when changing password",
		defaultMessage: "Retype should match with new password"
	},
	passwordConfirmPlaceholder: {
		id: "registration-password-confirm-placeholder",
		description: "Registration password confirmation placeholder",
		defaultMessage: "Confirm password"
	},
	passwordPlaceholder: {
		id: "registration-password-placeholder",
		description: "Registration password placeholder",
		defaultMessage: "Enter a password"
	},
	passwordConfirmationRequired: {
		id: "common-messages-registration-form-password-confirmation-is-required",
		description: "Registration form, password confirmation is required",
		defaultMessage: "Password confirmation is required"
	},
	passwordsDoNotMatch: {
		id: "common-messages-passwords-do-not-match",
		description: "Used when passwords do not match",
		defaultMessage: "Passwords do not match"
	},
	addressStreet: {
		id: "Address-street",
		description: "Address-street",
		defaultMessage: "Street address"
	},
	addressPostalCode: {
		id: "address-postal-code",
		description: "Address postal code",
		defaultMessage: "Postal code"
	},
	addressCity: {
		id: "address-city",
		description: "Address city",
		defaultMessage: "City"
	},
	addressCountry: {
		id: "address-country",
		description: "Address country",
		defaultMessage: "Country"
	},
	registrationFailureDueToDuplicateEmail: {
		id: "registration-failure-duplicate-email",
		description: "Error message that is shown when user tried to register with a reserved email",
		defaultMessage: "This email address is already registered"
	},
	backToSearch: {
		id: "address-validation-handler-back-to-search-button-message",
		description: "Address validation handler back to search button message",
		defaultMessage: "Back to search"
	},
	streetName: {
		id: "address-validation-handler-form-street-name",
		description: "Address validation handler form street name",
		defaultMessage: "Street name"
	},
	zipCode: {
		id: "address-validation-handler-form-zip-code",
		description: "Address validation handler form zip code",
		defaultMessage: "Zip code"
	},
	city: {
		id: "address-validation-handler-form-city",
		description: "Address validation handler form city",
		defaultMessage: "City"
	},
	selectCountry: {
		id: "address-validation-handler-form-selected-country",
		description: "Address validation handler form selected country",
		defaultMessage: "Select country"
	},
	basketClearedErrorMessage: {
		id: "basket-cleared-error-message-details",
		description: "Message for error modal when basket is cleared during checkout.",
		defaultMessage: "Cannot proceed with checkout because basket was cleared."
	},
	compareDevices: {
		id: "shop-comparison-modal-compare-devices-message",
		description: "Shop product comparison modal compare devices message",
		defaultMessage: "Compare devices"
	},
	inBasket: {
		id: "shop-in-basket-basket-button-message",
		description: "Shop in basket basket button message",
		defaultMessage: "In basket"
	},
	addToBasket: {
		id: "shop-add-product-to-basket-button-message",
		description: "Shop add product to basket button message",
		defaultMessage: "Add to basket"
	},
	changePasswordContactType: {
		id: "change-password-contact-type",
		description: "Placeholder for contact type field",
		defaultMessage: "Select contact type"
	},
	changePasswordEmailInput: {
		id: "change-password-email-input",
		description: "Placeholder for email input field",
		defaultMessage: "E-mail"
	},
	changePasswordPhoneInput: {
		id: "change-password-phone-input",
		description: "Placeholder for phone input field",
		defaultMessage: "Phone"
	},
	changePasswordEmailRequired: {
		id: "change-password-email-validation-error-required",
		description: "Error message shown when user has entered an invalid email address",
		defaultMessage: "Email address is required field"
	},
	changePasswordEmailInvalidFormat: {
		id: "change-password-email-validation-error-invalid",
		description: "Error message shown when user has entered an invalid email address",
		defaultMessage: "Please enter a valid email address"
	},
	changePasswordPhoneRequired: {
		id: "change-password-email-validation-error",
		description: "Error message shown when user has entered an invalid phone number",
		defaultMessage: "Phone number is required field"
	},
	registerContactPhoneRequired: {
		id: "register-contact-phone-required",
		description: "Register modal, contact phone required field",
		defaultMessage: "Contact phone is required"
	},
	registerEmailRequired: {
		id: "register-contact-email-required",
		description: "Register modal, email required field",
		defaultMessage: "E-mail is required"
	},
	registerValidationCodeRequired: {
		id: "register-validation-code-required",
		description: "Register modal, validation code required field",
		defaultMessage: "Validation code is required"
	},
	registerPasswordRequired: {
		id: "register-password-required",
		description: "Register modal, password required field",
		defaultMessage: "Password is required"
	},
	registerPasswordConfirmationRequired: {
		id: "register-password-confirm-required",
		description: "Register modal, password confirm required field",
		defaultMessage: "Password confirmation is required"
	},
	registerPasswordsMustMatch: {
		id: "register-password-must-match",
		description: "Register modal, passwords must match validation text",
		defaultMessage: "Passwords must match"
	},
	registerContinueToNextStep: {
		id: "register-continue-to-next-step-message",
		description: "Register modal, continue to next register step button label",
		defaultMessage: "Continue"
	},
	lifeCycleStatusPending: {
		id: "lifecycle-status-pending",
		description: "Lifecycle status, pending",
		defaultMessage: "Pending"
	},
	lifeCycleStatusActive: {
		id: "lifecycle-status-active",
		description: "Lifecycle status, active",
		defaultMessage: "Active"
	},
	lifeCycleStatusActivated: {
		id: "lifecycle-status-activated",
		description: "Lifecycle status, active",
		defaultMessage: "Activated"
	},
	lifeCycleStatusTerminated: {
		id: "lifecycle-status-terminated",
		description: "Lifecycle status, terminated",
		defaultMessage: "Terminated"
	},
	lifeCycleStatusSuspended: {
		id: "lifecycle-status-suspended",
		description: "Lifecycle status, suspended",
		defaultMessage: "Suspended"
	},
	invalidPhone: {
		id: "invalid-phone-number",
		description: "Phone number format is invalid",
		defaultMessage: "Please enter a valid phone number"
	},
	subscriptionAddonActivationFee: {
		id: "customer-subscription-addons-activation-fee",
		description: "Activation fee for addons row in customer subscription",
		defaultMessage: "Activation cost "
	},
	subscriptionAddonRecurringFee: {
		id: "customer-subscription-addons-recurring-fee",
		description: "Recurring fee for addons row in customer subscription",
		defaultMessage: "Recurring fee"
	},
	productOfferingConfigFreeProduct: {
		id: "product-offering-config-plan-configuration-modal-free",
		description: "Free product",
		defaultMessage: "Free"
	},
	subscriptionsChangeAddon: {
		id: "service-desk-active-customer-subscription-active-addons-action-change-addon",
		description: "In Service Desk, Customer's Subscriptions, Active add-on listing, Change add-on button text",
		defaultMessage: "Change add-on"
	},
	subscriptionsConfigureAddon: {
		id: "service-desk-active-customer-subscription-active-addons-action-configure",
		description: "In POS, Customer subscriptions, active addons, configure link",
		defaultMessage: "Configure"
	},
	subscriptionAvailableAddonsShowMore: {
		id: "customer-subscription-available-addons-show-more",
		description: "In customer subscriptions, available addons, title",
		defaultMessage: "Load {addonPaginationCount} more"
	},
	subscriptionAvailableAddonsShowAll: {
		id: "customer-subscription-available-addons-show-all-remaining",
		description: "In customer subscriptions, available addons, none available title",
		defaultMessage: "Show all remaining services"
	},
	activateAddon: {
		id: "available-addons-activate-addon",
		description: "Activate addon button label",
		defaultMessage: "Activate"
	},
	configureButtonLabel: {
		id: "digital-life-callforwarding-configure-service-button-label",
		description: "Configure callforwarding service button label",
		defaultMessage: "Configure"
	},
	servicesNameLabel: {
		id: "digital-life-callforwarding-services-name-label",
		description: "Label shown for call forwarding name",
		defaultMessage: "Call forwarding"
	},
	iHaveQuestionAbout: {
		id: "digital-life-question-about-label",
		description: "Digital life label question about label",
		defaultMessage: "I have question about"
	},
	sendSupportRequest: {
		id: "digital-life-send-support-request-button",
		description: "Digital life send support request button",
		defaultMessage: "Send support request"
	},
	creditCardStorageSelectionLabel: {
		id: "b2c-payment-store-credit-card",
		description: "label for checkbox to store new credit card as customer payment method",
		defaultMessage: "Save my credit card for future purchases."
	},
	creditCardStorageSelectionDescription: {
		id: "b2c-payment-store-credit-card-description",
		description: "description text for checkbox to store new credit card as customer payment method",
		defaultMessage: "By allowing this, your credit card will be immediately available next time. You can change this later via eCare."
	},
	noStoredCreditCards: {
		id: "no-stored-credit-cards",
		description: "there are no stored credit cards",
		defaultMessage: "You have no stored credit cards yet"
	}
});
export default CommonMessages;
export { CommonMessages, CommonMessagesType };
