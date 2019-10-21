/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface PaymentMessagesType {
	balance: FormattedMessage.MessageDescriptor;
	balanceIsTooLow: FormattedMessage.MessageDescriptor;
	cashOnDelivery: FormattedMessage.MessageDescriptor;
	creditcard: FormattedMessage.MessageDescriptor;
	currentBalance: FormattedMessage.MessageDescriptor;
	notEnoughBalance: FormattedMessage.MessageDescriptor;
	notEnoughBalanceForChangeSim: FormattedMessage.MessageDescriptor;
	paymentMethodsVerification: FormattedMessage.MessageDescriptor;
	remainingBalance: FormattedMessage.MessageDescriptor;
	totalFee: FormattedMessage.MessageDescriptor;
}
const PaymentMessages: PaymentMessagesType = defineMessages({
	balance: {
		id: "digitallife-payment-method-balance",
		description: "Change SIM modal pay with balance",
		defaultMessage: "Pay with balance"
	},
	balanceIsTooLow: {
		id: "balance-limit-surpassed-error",
		description: "Warning shown when customer does not have enough balance to pay for their stuff",
		defaultMessage: "Your balance is too low to pay to pay for this item"
	},
	cashOnDelivery: {
		id: "digitallife-payment-method-cashOnDelivery",
		description: "Change SIM modal pay on delivery",
		defaultMessage: "Payment on delivery"
	},
	creditcard: {
		id: "digitallife-payment-method-creditcard",
		description: "Change SIM modal pay with credit card",
		defaultMessage: "Credit card"
	},
	currentBalance: {
		id: "payment-messages-current-balance",
		description: "Change phone number modal, current balance label",
		defaultMessage: "Current balance"
	},
	notEnoughBalance: {
		id: "payment-messages-not-enough-balance",
		description: "General message presented to customer when there is not enough balance to proceed",
		defaultMessage: "You do not have enough balance."
	},
	notEnoughBalanceForChangeSim: {
		id: "change-sim-not-enough-balance",
		description: "Message presented to customer when there is not enough balance to proceed with the change sim operation",
		defaultMessage: "You do not have enough balance to change sim."
	},
	paymentMethodsVerification: {
		id: "payment-methods-verification",
		description: "Payment methods, your new payment method is being verified message",
		defaultMessage: "Your new payment method is being verified, it won't take long for it to appear here."
	},
	remainingBalance: {
		id: "change-phone-number-remaining-balance",
		description: "Change phone number modal, remaining balance label",
		defaultMessage: "Remaining balance"
	},
	totalFee: {
		id: "change-phone-number-total-fee",
		description: "Change phone number modal, total fee label",
		defaultMessage: "Total fees"
	},
});

export default PaymentMessages;
export { PaymentMessages, PaymentMessagesType };
