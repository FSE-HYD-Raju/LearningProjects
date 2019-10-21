/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ActivateProductLoanMessagesType {
	aboutToTakeLoan: FormattedMessage.MessageDescriptor;
	activateProductLoan: FormattedMessage.MessageDescriptor;
	addingLoanConfirmationRequest: FormattedMessage.MessageDescriptor;
	loanDetailsHeader: FormattedMessage.MessageDescriptor;
	loanFee: FormattedMessage.MessageDescriptor;
	loanedBalance: FormattedMessage.MessageDescriptor;
	productLoanDueDate: FormattedMessage.MessageDescriptor;
	productLoanModalCancel: FormattedMessage.MessageDescriptor;
	productLoanModalConfirm: FormattedMessage.MessageDescriptor;
	productLoanTotalCredit: FormattedMessage.MessageDescriptor;
	termsAgreementConfirmation: FormattedMessage.MessageDescriptor;
}
const ActivateProductLoanMessages: ActivateProductLoanMessagesType = defineMessages({
	aboutToTakeLoan: {
		id: "about-to-take-loan-reminder",
		description: "Activate product loan modal, intention reminder",
		defaultMessage: "You are about to take loan for {msisdn}"
	},
	activateProductLoan: {
		id: "activate-product-loan-header",
		description: "Activate product loan modal header",
		defaultMessage: "Activate Product Loan"
	},
	addingLoanConfirmationRequest: {
		id: "adding-loan-confirmation-request-message",
		description: "Adding loan confirmation request message",
		defaultMessage: "Please confirm that you want to add the loan to your subscription by clicking \"Confirm\"."
	},
	loanDetailsHeader: {
		id: "loan-details-header-text",
		description: "Activate product loan modal, loan details header text",
		defaultMessage: "These are the details of the loan: "
	},
	loanFee: {
		id: "activate-product-loan-fee",
		description: "Activate product loan modal, loan fee",
		defaultMessage: "Loan fee"
	},
	loanedBalance: {
		id: "activate-product-loan-balance",
		description: "Activate product loan modal, loaned balance",
		defaultMessage: "Loaned balance"
	},
	productLoanDueDate: {
		id: "activate-product-loan-due-date",
		description: "Activate product loan modal, due date",
		defaultMessage: "Due date"
	},
	productLoanModalCancel: {
		id: "activate-product-loan-modal-cancel",
		description: "Activate product loan modal, cancel",
		defaultMessage: "Cancel"
	},
	productLoanModalConfirm: {
		id: "activate-product-loan-modal-confirm",
		description: "Activate product loan modal, confirm",
		defaultMessage: "Confirm"
	},
	productLoanTotalCredit: {
		id: "activate-product-loan-total-credit",
		description: "Activate product loan modal, total credit",
		defaultMessage: "Total credit"
	},
	termsAgreementConfirmation: {
		id: "terms-agreement-confirmation",
		description: "Activate product loan modal, terms and conditions agreement confirmation",
		defaultMessage: "I have read terms and conditions and agree to them"
	},
});

export default ActivateProductLoanMessages;
export { ActivateProductLoanMessages, ActivateProductLoanMessagesType };
