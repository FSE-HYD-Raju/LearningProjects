/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface RecurringTopUpConfigurationFormMessagesType {
	chooseAmount: FormattedMessage.MessageDescriptor;
	chooseLimitInAMonthValue: FormattedMessage.MessageDescriptor;
	chooseSubscription: FormattedMessage.MessageDescriptor;
	chooseThreshold: FormattedMessage.MessageDescriptor;
	close: FormattedMessage.MessageDescriptor;
	confirm: FormattedMessage.MessageDescriptor;
	monthlyTopUpSaved: FormattedMessage.MessageDescriptor;
	recurringMonthlyTopUp: FormattedMessage.MessageDescriptor;
	recurringThresholdTopUp: FormattedMessage.MessageDescriptor;
	recurringTopUpCancel: FormattedMessage.MessageDescriptor;
	recurringTopUpCardDescription: FormattedMessage.MessageDescriptor;
	recurringTopUpCurrentSelection: FormattedMessage.MessageDescriptor;
	recurringTopUpLimitInMonth: FormattedMessage.MessageDescriptor;
	recurringTopUpMonthly: FormattedMessage.MessageDescriptor;
	recurringTopUpMonthlyAmount: FormattedMessage.MessageDescriptor;
	recurringTopUpPaymentMethod: FormattedMessage.MessageDescriptor;
	recurringTopUpRemove: FormattedMessage.MessageDescriptor;
	recurringTopUpSelectCard: FormattedMessage.MessageDescriptor;
	recurringTopUpSelectPaymentMethod: FormattedMessage.MessageDescriptor;
	recurringTopUpSubmitButton: FormattedMessage.MessageDescriptor;
	recurringTopUpSubscription: FormattedMessage.MessageDescriptor;
	recurringTopUpThreshold: FormattedMessage.MessageDescriptor;
	recurringTopUpThresholdAmount: FormattedMessage.MessageDescriptor;
	recurringTopUpThresholdExplanation: FormattedMessage.MessageDescriptor;
	recurringTopUpThresholdValue: FormattedMessage.MessageDescriptor;
	recurringTopUpWeekly: FormattedMessage.MessageDescriptor;
	recurringTopUpWeeklyAmount: FormattedMessage.MessageDescriptor;
	thresholdTopUpSaved: FormattedMessage.MessageDescriptor;
	topUpModalUseNewCreditCardOption: FormattedMessage.MessageDescriptor;
	topUpType: FormattedMessage.MessageDescriptor;
	weeklyTopUpSaved: FormattedMessage.MessageDescriptor;
}
const RecurringTopUpConfigurationFormMessages: RecurringTopUpConfigurationFormMessagesType = defineMessages({
	chooseAmount: {
		id: "top-up-amount-required-message",
		description: "Choose top-up amount value",
		defaultMessage: "Choose top-up amount"
	},
	chooseLimitInAMonthValue: {
		id: "limit-in-month-required-message",
		description: "Choose limit in a month value",
		defaultMessage: "Choose limit in a month value"
	},
	chooseSubscription: {
		id: "subscription-required-message",
		description: "Choose subscription",
		defaultMessage: "Choose subscription"
	},
	chooseThreshold: {
		id: "threshold-required-message",
		description: "Choose threshold value",
		defaultMessage: "Choose threshold value"
	},
	close: {
		id: "top-up-modal-close",
		description: "Message of top-up modal close button",
		defaultMessage: "Close"
	},
	confirm: {
		id: "top-up-modal-confirm",
		description: "Message of top-up modal confirm button",
		defaultMessage: "Save"
	},
	monthlyTopUpSaved: {
		id: "top-up-type-monthly",
		description: "Label describing a monthly type recurring top up",
		defaultMessage: "<b>Montly top-up saved!</b>"
	},
	recurringMonthlyTopUp: {
		id: "recurring-monthly-top-up-label",
		description: "Recurring top-up, label for Monthly top-up",
		defaultMessage: "{value}"
	},
	recurringThresholdTopUp: {
		id: "recurring-threshold-top-up-label",
		description: "Recurring top-up, label for Threshold top-up",
		defaultMessage: "{value}"
	},
	recurringTopUpCancel: {
		id: "recurring-top-up-cancel-label",
		description: "Recurring top-up, label for Cancel top-up",
		defaultMessage: "I don't want to configure a recurring top up"
	},
	recurringTopUpCardDescription: {
		id: "recurring-top-up-credit-card-description",
		description: "Recurring top-up, payment method selection, credit card description",
		defaultMessage: "My {cardType} (ending {cardEnding})"
	},
	recurringTopUpCurrentSelection: {
		id: "recurring-top-up-current-selection-label",
		description: "Recurring top-up, label for current selection",
		defaultMessage: "(your current selection)"
	},
	recurringTopUpLimitInMonth: {
		id: "recurring-top-up-threshold-limit-label",
		description: "Recurring top-up, label for Threshold limit value",
		defaultMessage: "Limit in a month"
	},
	recurringTopUpMonthly: {
		id: "recurring-top-up-monthly-label",
		description: "Recurring top-up, label for Monthly top-up",
		defaultMessage: "Monthly recurring top-up"
	},
	recurringTopUpMonthlyAmount: {
		id: "recurring-top-up-monthly-top-up-amount-label",
		description: "Recurring top-up, label for Monthly top-up amount value",
		defaultMessage: "Top-up amount"
	},
	recurringTopUpPaymentMethod: {
		id: "recurring-top-up-payment-method-label",
		description: "Recurring top-up, label for payment method",
		defaultMessage: "Payment method"
	},
	recurringTopUpRemove: {
		id: "recurring-top-up-remove-label",
		description: "Recurring top-up, label for Remove top-up",
		defaultMessage: "I want to cancel recurring top up"
	},
	recurringTopUpSelectCard: {
		id: "recurring-top-up-credit-card-placeholder",
		description: "Recurring top-up, placeholder for credit card selection",
		defaultMessage: "Select credit card"
	},
	recurringTopUpSelectPaymentMethod: {
		id: "recurring-top-up-select-payment-method",
		description: "Recurring top-up, placeholder for payment method selection",
		defaultMessage: "Select payment method"
	},
	recurringTopUpSubmitButton: {
		id: "recurring-top-up-submit-button-label",
		description: "Recurring top-up button label",
		defaultMessage: "Save my choice"
	},
	recurringTopUpSubscription: {
		id: "recurring-top-up-subscription-label",
		description: "Recurring top-up, label for subscription",
		defaultMessage: "Phone number"
	},
	recurringTopUpThreshold: {
		id: "recurring-top-up-threshold-label",
		description: "Recurring top-up, label for Threshold top-up",
		defaultMessage: "Threshold top-up"
	},
	recurringTopUpThresholdAmount: {
		id: "recurring-top-up-threshold-top-up-amount-label",
		description: "Recurring top-up, label for Threshold top-up amount value",
		defaultMessage: "Top-up amount"
	},
	recurringTopUpThresholdExplanation: {
		id: "recurring-top-up-threshold-explanation-text",
		description: "Recurring top-up, Threshold explanation Text",
		defaultMessage: "<i class='fa fa-exclamation-circle'></i><p>In order to enable the recurring top-up, check that your remaining credit is not below the set threshold and does not exceed the set monthly limit</p>"
	},
	recurringTopUpThresholdValue: {
		id: "recurring-top-up-threshold-value-label",
		description: "Recurring top-up, label for Threshold top-up value",
		defaultMessage: "Threshold value"
	},
	recurringTopUpWeekly: {
		id: "recurring-top-up-weekly-label",
		description: "Recurring top-up, label for Weekly top-up",
		defaultMessage: "Weekly recurring top-up"
	},
	recurringTopUpWeeklyAmount: {
		id: "recurring-top-up-weekly-top-up-amount-label",
		description: "Recurring top-up, label for Weekly top-up amount value",
		defaultMessage: "Top-up amount"
	},
	thresholdTopUpSaved: {
		id: "top-up-type-threshold",
		description: "Label describing a threshold type recurring top up",
		defaultMessage: "<b>Threshold top-up saved!</b>"
	},
	topUpModalUseNewCreditCardOption: {
		id: "top-up-use-new-credit-card",
		description: "Top-up modal, credit cards selection, use new credit card option",
		defaultMessage: "Use new credit card"
	},
	topUpType: {
		id: "recurring-top-up-monthly-top-up-type-label",
		description: "Recurring top-up, label for top-up section",
		defaultMessage: "Top-up type"
	},
	weeklyTopUpSaved: {
		id: "top-up-type-weekly",
		description: "Label describing a weekly type recurring top up",
		defaultMessage: "<b>Weekly top-up saved!</b>"
	},
});

export default RecurringTopUpConfigurationFormMessages;
export { RecurringTopUpConfigurationFormMessages, RecurringTopUpConfigurationFormMessagesType };
