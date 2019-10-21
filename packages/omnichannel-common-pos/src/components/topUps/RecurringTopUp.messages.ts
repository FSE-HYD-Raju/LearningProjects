/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface RecurringTopUpMessagesType {
	addNewTopUp: FormattedMessage.MessageDescriptor;
	addPaymentMethod: FormattedMessage.MessageDescriptor;
	addRecurringTopUpModalTitle: FormattedMessage.MessageDescriptor;
	addTopUp: FormattedMessage.MessageDescriptor;
	amountHeader: FormattedMessage.MessageDescriptor;
	cannotAddTopUp: FormattedMessage.MessageDescriptor;
	cardDescription: FormattedMessage.MessageDescriptor;
	changesHaveBeenMadeSuccessfully: FormattedMessage.MessageDescriptor;
	edit: FormattedMessage.MessageDescriptor;
	editRecurringTopUpModalTitle: FormattedMessage.MessageDescriptor;
	monthlyLimitHeader: FormattedMessage.MessageDescriptor;
	noRecurringTopUps: FormattedMessage.MessageDescriptor;
	noRecurringTopUpsDescription: FormattedMessage.MessageDescriptor;
	paymentMethodHeader: FormattedMessage.MessageDescriptor;
	phoneNumberHeader: FormattedMessage.MessageDescriptor;
	recurringTopUpList: FormattedMessage.MessageDescriptor;
	thresholdHeader: FormattedMessage.MessageDescriptor;
	topUpTypeHeader: FormattedMessage.MessageDescriptor;
}
const RecurringTopUpMessages: RecurringTopUpMessagesType = defineMessages({
	addNewTopUp: {
		id: "recurring-top-ups-top-up-button",
		description: "Recurring top-ups top-up button message",
		defaultMessage: "Add new recurring top-up"
	},
	addPaymentMethod: {
		id: "recurring-top-up-add-payment-method",
		description: "Recurring top-up add payment method",
		defaultMessage: "Add payment method"
	},
	addRecurringTopUpModalTitle: {
		id: "add-recurring-top-up-modal-title",
		description: "Add recurring top-up modal title",
		defaultMessage: "Add Recurring Top-up"
	},
	addTopUp: {
		id: "recurring-top-ups-add-top-up-button",
		description: "Recurring top-ups add recurring top-up button message",
		defaultMessage: "Add recurring top-up"
	},
	amountHeader: {
		id: "recurring-top-ups-table-header-amount",
		description: "digital-life, recurring top-ups table header amount",
		defaultMessage: "Amount"
	},
	cannotAddTopUp: {
		id: "recurring-top-ups-no-payment-method-notify",
		description: "digital-life, recurring top-ups, no payment method modal body text",
		defaultMessage: "Recurring top-up cannot be added as there is no stored payment method to link it to. Please add a payment method first."
	},
	cardDescription: {
		id: "recurring-top-ups-credit-card-description",
		description: "digital-life, recurring top-ups, credit card ending in",
		defaultMessage: "{cardType} ending in {cardEnding}"
	},
	changesHaveBeenMadeSuccessfully: {
		id: "recurring-top-ups-changes-have-been-made",
		description: "Recurring top-ups alert message",
		defaultMessage: "<strong>Changes have</strong> been made successfully"
	},
	edit: {
		id: "recurring-top-ups-top-edit-button",
		description: "Recurring top-ups edit button",
		defaultMessage: "Edit"
	},
	editRecurringTopUpModalTitle: {
		id: "edit-recurring-top-up-modal-title",
		description: "Edit recurring top-up modal title",
		defaultMessage: "Edit recurring top-up"
	},
	monthlyLimitHeader: {
		id: "recurring-top-ups-table-header-monthly-limit",
		description: "digital-life, recurring top-ups table header monthly limit",
		defaultMessage: "Monthly limit"
	},
	noRecurringTopUps: {
		id: "recurring-top-ups-empty-list",
		description: "digital-life, no recurring top-ups header",
		defaultMessage: "No recurring top-ups"
	},
	noRecurringTopUpsDescription: {
		id: "recurring-top-ups-empty-description",
		description: "digital-life, no recurring top-ups description",
		defaultMessage: "Recurring top up allows you set an aomunt and a date on which that amount is sent to your phone each month. This is very useful if you would like to keep your pre-paid sim always active."
	},
	paymentMethodHeader: {
		id: "recurring-top-ups-table-header-payment-method",
		description: "digital-life, recurring top-ups table header payment method",
		defaultMessage: "Payment-method"
	},
	phoneNumberHeader: {
		id: "recurring-top-ups-table-header-phone-number",
		description: "digital-life, recurring top-ups table header phone number",
		defaultMessage: "Phone number"
	},
	recurringTopUpList: {
		id: "recurring-top-up-list-title",
		description: "Recurring top-up list title",
		defaultMessage: "Recurring top-up"
	},
	thresholdHeader: {
		id: "recurring-top-ups-table-header-threshold-value",
		description: "digital-life, recurring top-ups table header threshold value",
		defaultMessage: "Threshold"
	},
	topUpTypeHeader: {
		id: "recurring-top-ups-table-header-top-up-type",
		description: "digital-life, recurring top-ups table header top-up type",
		defaultMessage: "Top-up type"
	},
});

export default RecurringTopUpMessages;
export { RecurringTopUpMessages, RecurringTopUpMessagesType };
