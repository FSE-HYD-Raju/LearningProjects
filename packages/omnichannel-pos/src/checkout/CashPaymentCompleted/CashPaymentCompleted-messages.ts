import { defineMessages, FormattedMessage } from "react-intl";

interface CashPaymentMessagesType {
	title: FormattedMessage.MessageDescriptor;
	message: FormattedMessage.MessageDescriptor;
	continueToShopLink: FormattedMessage.MessageDescriptor;
}

const CashPaymentMessages: CashPaymentMessagesType = defineMessages({
	title: {
		id: "CashPaymentCompleted-title",
		description: "CashPaymentCompleted-title",
		defaultMessage: "Purchase received"
	},
	message: {
		id: "CashPaymentCompleted-message",
		description: "CashPaymentCompleted-message",
		defaultMessage:
			"We have received information about this payment and your receipt id is:"
	},
	continueToShopLink: {
		id: "CashPaymentCompleted-shopping",
		description:
			"CashPaymentCompleted - Link back to shop after cash payment succeeded",
		defaultMessage: "Continue to shop"
	}
});

export default CashPaymentMessages;
export { CashPaymentMessages, CashPaymentMessagesType };
