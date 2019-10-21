/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OverviewProductLoanMessagesType {
	creditInfo: FormattedMessage.MessageDescriptor;
	creditInfoModalBack: FormattedMessage.MessageDescriptor;
	creditInfoModalPayBackBtn: FormattedMessage.MessageDescriptor;
	dueDate: FormattedMessage.MessageDescriptor;
	loanAmountToPayBack: FormattedMessage.MessageDescriptor;
	loanFeeToPayBack: FormattedMessage.MessageDescriptor;
	originalLoanAmount: FormattedMessage.MessageDescriptor;
	originalLoanFee: FormattedMessage.MessageDescriptor;
	remainingLoanAmount: FormattedMessage.MessageDescriptor;
	subscriptionCreditInfo: FormattedMessage.MessageDescriptor;
	totalRemainingCredit: FormattedMessage.MessageDescriptor;
}
const OverviewProductLoanMessages: OverviewProductLoanMessagesType = defineMessages({
	creditInfo: {
		id: "overview-credit-info-modal-title",
		description: "Credit info modal title",
		defaultMessage: "Credit info"
	},
	creditInfoModalBack: {
		id: "credit-info-modal-back-button",
		description: "Credit info modal, back button",
		defaultMessage: "Back"
	},
	creditInfoModalPayBackBtn: {
		id: "credit-info-modal-pay-back-button",
		description: "Credit info modal, Pay back now button",
		defaultMessage: "Pay back now"
	},
	dueDate: {
		id: "credit-info-loan-due-date",
		description: "Credit info modal, due date",
		defaultMessage: "Due date"
	},
	loanAmountToPayBack: {
		id: "credit-info-loan-amount-to-pay-back",
		description: "Credit info modal, loan amount to pay back",
		defaultMessage: "Loan amount to pay back"
	},
	loanFeeToPayBack: {
		id: "credit-info-loan-fee-to-pay-back",
		description: "Credit info modal, loan fee to pay back",
		defaultMessage: "Loan fee to pay back"
	},
	originalLoanAmount: {
		id: "credit-info-original-loan-amount",
		description: "Credit info modal, original loan amount",
		defaultMessage: "Original loan amount"
	},
	originalLoanFee: {
		id: "credit-info-original-loan-fee",
		description: "Credit info modal, original loan fee",
		defaultMessage: "Original loan fee"
	},
	remainingLoanAmount: {
		id: "credit-info-remaining-loan-amount",
		description: "Credit info modal, remaining loan amount",
		defaultMessage: "Remaining loan amount"
	},
	subscriptionCreditInfo: {
		id: "subscription-overview-credit-info-title",
		description: "Subscription overview (balances section) credit info title",
		defaultMessage: "Credit"
	},
	totalRemainingCredit: {
		id: "credit-info-total-remaining-credit",
		description: "Credit info modal, total remaining credit",
		defaultMessage: "Total remaining credit"
	},
});

export default OverviewProductLoanMessages;
export { OverviewProductLoanMessages, OverviewProductLoanMessagesType };
