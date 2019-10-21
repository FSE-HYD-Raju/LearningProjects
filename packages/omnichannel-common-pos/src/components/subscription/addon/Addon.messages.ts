/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AddonMessagesType {
	addonLifecycleStatus: FormattedMessage.MessageDescriptor;
	addonsTitle: FormattedMessage.MessageDescriptor;
	callForwarding: FormattedMessage.MessageDescriptor;
	callForwardingDescription: FormattedMessage.MessageDescriptor;
	configurationActivate: FormattedMessage.MessageDescriptor;
	configurationActivateAddon: FormattedMessage.MessageDescriptor;
	configurationActivationFee: FormattedMessage.MessageDescriptor;
	configurationCancel: FormattedMessage.MessageDescriptor;
	configurationCurrentBalance: FormattedMessage.MessageDescriptor;
	configurationDescription: FormattedMessage.MessageDescriptor;
	configurationFees: FormattedMessage.MessageDescriptor;
	configurationFree: FormattedMessage.MessageDescriptor;
	configurationMsisdn: FormattedMessage.MessageDescriptor;
	configurationNoPaymentMethods: FormattedMessage.MessageDescriptor;
	configurationNotEnoughBalance: FormattedMessage.MessageDescriptor;
	configurationPayWith: FormattedMessage.MessageDescriptor;
	configurationPayment: FormattedMessage.MessageDescriptor;
	configurationRecurrentFees: FormattedMessage.MessageDescriptor;
	configurationRemainingBalance: FormattedMessage.MessageDescriptor;
	configurationServiceName: FormattedMessage.MessageDescriptor;
	configurationTotalFees: FormattedMessage.MessageDescriptor;
	deactivate: FormattedMessage.MessageDescriptor;
	deactivateClose: FormattedMessage.MessageDescriptor;
	deactivateConfirm: FormattedMessage.MessageDescriptor;
	deactivateDisclaimerText: FormattedMessage.MessageDescriptor;
	headerDate: FormattedMessage.MessageDescriptor;
	headerFees: FormattedMessage.MessageDescriptor;
	headerName: FormattedMessage.MessageDescriptor;
	headerStatus: FormattedMessage.MessageDescriptor;
	hyphen: FormattedMessage.MessageDescriptor;
	manageAddon: FormattedMessage.MessageDescriptor;
	noAddonsTitle: FormattedMessage.MessageDescriptor;
	noConfigurationRequired: FormattedMessage.MessageDescriptor;
	serviceConfiguration: FormattedMessage.MessageDescriptor;
	startsFrom: FormattedMessage.MessageDescriptor;
}
const AddonMessages: AddonMessagesType = defineMessages({
	addonLifecycleStatus: {
		id: "customer-subscription-addon-lifecycle-status",
		description: "Service status for addons row in customer subscription",
		defaultMessage: "{lifecycleStatus}"
	},
	addonsTitle: {
		id: "customer-subscriptions-available-addons-title",
		description: "In POS, Customer subscriptions, available addons, title",
		defaultMessage: "Addons"
	},
	callForwarding: {
		id: "customer-subscription-addons-callforwarding-title",
		description: "Addon expanded content, call forwarding services title",
		defaultMessage: "Call forwarding"
	},
	callForwardingDescription: {
		id: "customer-subscription-addons-callforwarding-description",
		description: "Addon expanded content, call forwarding services description",
		defaultMessage: "User can choose the situations and numbers when and where the calls he receives will be forwarded"
	},
	configurationActivate: {
		id: "customer-subscription-confirm-addon-activation",
		description: "Activate addon button label",
		defaultMessage: "Activate"
	},
	configurationActivateAddon: {
		id: "customer-subscription-activate-available-addon-modal-title",
		description: "Title for activate available addon modal",
		defaultMessage: "Activate add-on"
	},
	configurationActivationFee: {
		id: "customer-details-addon-upfront-fee-label",
		description: "Addon upfront fee label",
		defaultMessage: "Activation fee"
	},
	configurationCancel: {
		id: "customer-subscription-cancel-adding-addon--to-basket",
		description: "Cancel",
		defaultMessage: "Cancel"
	},
	configurationCurrentBalance: {
		id: "addon-activation-current-balance-label",
		description: "Current balance label",
		defaultMessage: "Current balance"
	},
	configurationDescription: {
		id: "addon-activation-modal-description-label",
		description: "Add-on activation modal, description label",
		defaultMessage: "Description"
	},
	configurationFees: {
		id: "customer-details-available-addons-fees-label",
		description: "Addon fees summary",
		defaultMessage: "Fees"
	},
	configurationFree: {
		id: "customer-details-addon-upfront-free-label",
		description: "Addon upfront free label",
		defaultMessage: "Free"
	},
	configurationMsisdn: {
		id: "addon-activation-modal-msisdn-label",
		description: "Add-on activation modal, msisdn label",
		defaultMessage: "Phone number"
	},
	configurationNoPaymentMethods: {
		id: "customer-details-available-addons-no-payment-method",
		description: "Payment methods are missed",
		defaultMessage: "No available payment methods"
	},
	configurationNotEnoughBalance: {
		id: "customer-subscription-not-enough-balance-alert",
		description: "customer-subscription-not-enough-balance-alert",
		defaultMessage: "You don't have enough balance to proceed with add-on activation!"
	},
	configurationPayWith: {
		id: "customer-details-available-addons-single-payment-method",
		description: "Addon activation modal, single payment message",
		defaultMessage: "Pay with my {payment}"
	},
	configurationPayment: {
		id: "customer-details-available-addons-payment-methods-label",
		description: "Payment methods",
		defaultMessage: "Payment"
	},
	configurationRecurrentFees: {
		id: "customer-details-addon-recurring-fees-label",
		description: "Addon recurring fees label",
		defaultMessage: "Recurring fees (per {period})"
	},
	configurationRemainingBalance: {
		id: "addon-activation-remaining-balance-label",
		description: "Remaining balance label",
		defaultMessage: "Remaining balance"
	},
	configurationServiceName: {
		id: "customer-details-available-addons-name-label",
		description: "Add-on name label",
		defaultMessage: "Service name"
	},
	configurationTotalFees: {
		id: "addon-activation-total-fees-label",
		description: "total fees label",
		defaultMessage: "Total fees"
	},
	deactivate: {
		id: "customer-subscriptions-deactivate-addon-button",
		description: "Addon Deactivation Modal, deactivate button label",
		defaultMessage: "Deactivate"
	},
	deactivateClose: {
		id: "customer-subscriptions-close-addon-button",
		description: "Addon Deactivation Modal, close button label",
		defaultMessage: "Close"
	},
	deactivateConfirm: {
		id: "customer-subscriptions-confirm-addon-button",
		description: "Addon Deactivation Modal, confirm button label",
		defaultMessage: "Confirm"
	},
	deactivateDisclaimerText: {
		id: "customer-subscriptions-addon-deactivation-disclaimer-text",
		description: "Addon Deactivation Modal, disclaimer text",
		defaultMessage: "This service will be deactivated immediately. Click 'Confirm' to complete deactivation process."
	},
	headerDate: {
		id: "digital-life-service-plan-and-products-expiry-date-header",
		description: "In POS, Customer subscriptions, inactive services, expiry date",
		defaultMessage: "Expiry date"
	},
	headerFees: {
		id: "digital-life-service-plan-and-products-fee-header",
		description: "In B2C, Product subpage, Service plan & products, active services, fee heading label",
		defaultMessage: "Fees"
	},
	headerName: {
		id: "digital-life-service-plan-and-products-name-header",
		description: "In B2C, Product subpage, Service plan & products, inactive services, service name heading label",
		defaultMessage: "Name"
	},
	headerStatus: {
		id: "digital-life-service-plan-and-products-lifecycle-status-header",
		description: "In B2C, Product subpage, Service plan & products, inactive services, lifecycle status heading label",
		defaultMessage: "Status"
	},
	hyphen: {
		id: "customer-subscriptions-hyphen",
		description: "Addon Row, hyphen",
		defaultMessage: "-"
	},
	manageAddon: {
		id: "customer-subscriptions-manage-addon-title",
		description: "Addon Deactivation Modal, title label",
		defaultMessage: "Manage add-on"
	},
	noAddonsTitle: {
		id: "customer-subscriptions-available-addons-none-available-title",
		description: "In POS, Customer subscriptions, no available addons, title",
		defaultMessage: "Addons (none available)"
	},
	noConfigurationRequired: {
		id: "customer-subscription-addons-configuration-no-configuration",
		description: "Message for the case when addon does not require configuration",
		defaultMessage: "Selected addon does not require configuration"
	},
	serviceConfiguration: {
		id: "customer-subscription-addons-configuration-title",
		description: "Expanded content for addons list, service configuration title",
		defaultMessage: "Service configuration "
	},
	startsFrom: {
		id: "service-desk-active-customer-subscription-available-addons-price-from",
		description: "Service desk, product table price starting from",
		defaultMessage: "from {currency}"
	},
});

export default AddonMessages;
export { AddonMessages, AddonMessagesType };
