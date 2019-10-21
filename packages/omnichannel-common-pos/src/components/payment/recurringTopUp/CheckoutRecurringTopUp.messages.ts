/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CheckoutRecurringTopUpMessagesType {
	doneInfoLabel: FormattedMessage.MessageDescriptor;
	eCare: FormattedMessage.MessageDescriptor;
	recurringTopUpHeader: FormattedMessage.MessageDescriptor;
	recurringTopUpPaymentInfoLabel: FormattedMessage.MessageDescriptor;
	recurringTopUpPreferencesInfoLabel: FormattedMessage.MessageDescriptor;
}
const CheckoutRecurringTopUpMessages: CheckoutRecurringTopUpMessagesType = defineMessages({
	doneInfoLabel: {
		id: "recurring-top-up-done-info-label-modify",
		description: "Recurring top-up, done info label",
		defaultMessage: "{messageType} You can modify top-ups later in {topUpLink}."
	},
	eCare: {
		id: "recurring-top-up-config-link-message",
		description: "Message for link to eCare recurring top ups",
		defaultMessage: "eCare"
	},
	recurringTopUpHeader: {
		id: "recurring-top-up-header",
		description: "Recurring top-up capture",
		defaultMessage: "Recurring top-up configuration"
	},
	recurringTopUpPaymentInfoLabel: {
		id: "recurring-top-up-payment-info-label",
		description: "Recurring top-up, payments info label",
		defaultMessage: "We have stored your card information and we will use it for the recurring payments of the offer you have acquired."
	},
	recurringTopUpPreferencesInfoLabel: {
		id: "recurring-top-up-preferences-info-label",
		description: "Recurring top-up, preferences info label",
		defaultMessage: "You have now opportunity to save your preference about recurring top-up option. You can change it in our self-service system."
	},
});

export default CheckoutRecurringTopUpMessages;
export { CheckoutRecurringTopUpMessages, CheckoutRecurringTopUpMessagesType };
