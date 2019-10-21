/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface StateChangeMessagesType {
	activate: FormattedMessage.MessageDescriptor;
	activationFee: FormattedMessage.MessageDescriptor;
	addon: FormattedMessage.MessageDescriptor;
	balanceAfter: FormattedMessage.MessageDescriptor;
	balanceBefore: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	close: FormattedMessage.MessageDescriptor;
	confirm: FormattedMessage.MessageDescriptor;
	consequences: FormattedMessage.MessageDescriptor;
	deactivate: FormattedMessage.MessageDescriptor;
	deactivateAddon: FormattedMessage.MessageDescriptor;
	deactivateService: FormattedMessage.MessageDescriptor;
	description: FormattedMessage.MessageDescriptor;
	fees: FormattedMessage.MessageDescriptor;
	msisdn: FormattedMessage.MessageDescriptor;
	needTopUp: FormattedMessage.MessageDescriptor;
	paymentMethods: FormattedMessage.MessageDescriptor;
	purchaseSummary: FormattedMessage.MessageDescriptor;
	questionDeactivate: FormattedMessage.MessageDescriptor;
	reactivate: FormattedMessage.MessageDescriptor;
	reason: FormattedMessage.MessageDescriptor;
	resume: FormattedMessage.MessageDescriptor;
	selectReason: FormattedMessage.MessageDescriptor;
	service: FormattedMessage.MessageDescriptor;
	serviceIsNow: FormattedMessage.MessageDescriptor;
	serviceName: FormattedMessage.MessageDescriptor;
	stateTransitionDeactivate: FormattedMessage.MessageDescriptor;
	stateTransitionFee: FormattedMessage.MessageDescriptor;
	suspend: FormattedMessage.MessageDescriptor;
	transitionAddonAreYouSure: FormattedMessage.MessageDescriptor;
	transitionServiceAreYouSure: FormattedMessage.MessageDescriptor;
}
const StateChangeMessages: StateChangeMessagesType = defineMessages({
	activate: {
		id: "subscription-enable-word",
		description: "Subscription lifecycle status activation word",
		defaultMessage: "Activation"
	},
	activationFee: {
		id: "action-fee-title",
		description: "Amount title for life-cycle-action",
		defaultMessage: "{actionName} fee"
	},
	addon: {
		id: "addon-word",
		description: "Localization for the word add-on",
		defaultMessage: "Add-on"
	},
	balanceAfter: {
		id: "balance-after-amount-title",
		description: "Title for the balance after life-cycle-action",
		defaultMessage: "Balance after"
	},
	balanceBefore: {
		id: "balance-before-amount-title",
		description: "Title for the balance before life-cycle-action",
		defaultMessage: "Balance before"
	},
	cancel: {
		id: "service-state-transition-confirmaton-cancel",
		description: "Cancel button text in Add-on/Service state transition modal",
		defaultMessage: "Cancel"
	},
	close: {
		id: "service-state-transition-modal-purchase-summary-close",
		description: "Close button text in Service state transition modal Purchase summary",
		defaultMessage: "Close"
	},
	confirm: {
		id: "service-state-transition-confirmaton-confirm-word",
		description: "Add-on/Service state transition modal, verb 'confirm' in title",
		defaultMessage: "Confirm"
	},
	consequences: {
		id: "service-state-transition-consequences",
		description: "State transition consequences in (Add-on) Service state transition modal",
		defaultMessage: "These are the consequences:"
	},
	deactivate: {
		id: "subscription-deactivation-word",
		description: "Subscription lifecycle status deactivation word",
		defaultMessage: "Deactivation"
	},
	deactivateAddon: {
		id: "addon-state-transition-confirmaton-deactivation-header",
		description: "Header of Deactivate addon modal",
		defaultMessage: "Deactivate Addon"
	},
	deactivateService: {
		id: "service-state-transition-confirmaton-deactivation-header",
		description: "Header of Deactivate service modal",
		defaultMessage: "Deactivate Service"
	},
	description: {
		id: "service-state-transition-product-description",
		description: "Add-on/Service state transition modal, product description label",
		defaultMessage: "Description"
	},
	fees: {
		id: "service-state-transition-fees-label",
		description: "Add-on/Service state transition modal, Fees label",
		defaultMessage: "Fees"
	},
	msisdn: {
		id: "deactivate-service-msisdn-number-row",
		description: "Row of msisdn number in deactivate service modal",
		defaultMessage: "MSISDN"
	},
	needTopUp: {
		id: "balance-top-up-is-needed",
		description: "Warning text when balance does not suffice for state transition",
		defaultMessage: "Customer will need to perform a top-up of {topUpAmount} before the {stateTransitionWord} can proceed"
	},
	paymentMethods: {
		id: "service-change-modal-payment-methods-title",
		description: "Payment methods",
		defaultMessage: "Payment methods"
	},
	purchaseSummary: {
		id: "service-state-transition-modal-purchase-summary-title",
		description: "Title for the Service state transition modal Purchase summary",
		defaultMessage: "Purchase summary"
	},
	questionDeactivate: {
		id: "service-state-transition-deactivate-serivce-question",
		description: "Deactivate service question in deactivate service modal",
		defaultMessage: "Deactivate service?"
	},
	reactivate: {
		id: "subscription-reactivation-word",
		description: "Subscription lifecycle status reactivation word",
		defaultMessage: "Reactivation"
	},
	reason: {
		id: "service-state-transition-reason-text",
		description: "Add-on/Service state transition modal, product description label",
		defaultMessage: "Reason"
	},
	resume: {
		id: "subscription-resume-word",
		description: "Subscription lifecycle status resume word",
		defaultMessage: "Resume"
	},
	selectReason: {
		id: "service-state-transition-reason-dropdown-placeholder-text",
		description: "Service state transition modal, reason code dropdown placeholder text",
		defaultMessage: "Please select a reason"
	},
	service: {
		id: "service-state-transition-confirmaton",
		description: "Title for the (Add-on) Service state transition modal",
		defaultMessage: "Service"
	},
	serviceIsNow: {
		id: "service-state-transition-modal-purchase-summary-text",
		description: "Close button text in Service state transition modal Purchase summary",
		defaultMessage: "Service \"{serviceName}\" is now {stateTransition}."
	},
	serviceName: {
		id: "service-state-transition-service-name-label",
		description: "Add-on/Service state transition modal, product name label",
		defaultMessage: "Service name"
	},
	stateTransitionDeactivate: {
		id: "service-state-transition-disable-service-confirmation",
		description: "Confirm button text in disable service modal",
		defaultMessage: "Confirm"
	},
	stateTransitionFee: {
		id: "service-state-transition-fee-label",
		description: "Add-on/Service state transition modal, Fee label",
		defaultMessage: "{stateTransitionWord} fee"
	},
	suspend: {
		id: "subscription-suspension-word",
		description: "Subscription lifecycle status suspension word",
		defaultMessage: "Suspension"
	},
	transitionAddonAreYouSure: {
		id: "addon-state-transition-confirmaton-text",
		description: "Add-on/Service state transition modal, confirmation text for add-on",
		defaultMessage: "You are about to {stateTransitionWord} add-on product \"{name}\". Are you sure?"
	},
	transitionServiceAreYouSure: {
		id: "service-state-transition-confirmaton-text",
		description: "Add-on/Service state transition modal, confirmation text for service",
		defaultMessage: "You are about to {stateTransitionWord} service \"{name}\". Are you sure?"
	},
});

export default StateChangeMessages;
export { StateChangeMessages, StateChangeMessagesType };
