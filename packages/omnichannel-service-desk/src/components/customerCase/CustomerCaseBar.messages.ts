/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CustomerCaseBarMessagesType {
	activeCustomerAddress: FormattedMessage.MessageDescriptor;
	chaneSimButton: FormattedMessage.MessageDescriptor;
	customerCaseBareCreateCustomer: FormattedMessage.MessageDescriptor;
	customerLabel: FormattedMessage.MessageDescriptor;
	customerSessionBtn: FormattedMessage.MessageDescriptor;
	endCustomerCase: FormattedMessage.MessageDescriptor;
	guestCustomer: FormattedMessage.MessageDescriptor;
	moreActionsBtn: FormattedMessage.MessageDescriptor;
	noCustomerAccount: FormattedMessage.MessageDescriptor;
	refundsButton: FormattedMessage.MessageDescriptor;
	reportIssueButton: FormattedMessage.MessageDescriptor;
	someActionBtnOne: FormattedMessage.MessageDescriptor;
	someActionBtnTwo: FormattedMessage.MessageDescriptor;
	topUpButton: FormattedMessage.MessageDescriptor;
}
const CustomerCaseBarMessages: CustomerCaseBarMessagesType = defineMessages({
	activeCustomerAddress: {
		id: "service-desk-active-customer-address",
		description: "CustomerCaseBar active customer address",
		defaultMessage: "{address}"
	},
	chaneSimButton: {
		id: "change-sim-button",
		description: "Change SIM button on customer case bar",
		defaultMessage: "Change SIM"
	},
	customerCaseBareCreateCustomer: {
		id: "customer-case-bar-create-customer",
		description: "Create customer button label",
		defaultMessage: "Create customer"
	},
	customerLabel: {
		id: "service-desk-active-customer-label",
		description: "In POS, active customer label containing customer id or name",
		defaultMessage: "{phoneAndName}"
	},
	customerSessionBtn: {
		id: "customer-session-button",
		description: "Customer session button on customer case bar",
		defaultMessage: "Customer session"
	},
	endCustomerCase: {
		id: "service-desk-end-customer-case",
		description: "In POS, end customer case button label",
		defaultMessage: "End customer case"
	},
	guestCustomer: {
		id: "service-desk-guest-customer",
		description: "Text to show in place of customer's name in POS, when no customer is selected",
		defaultMessage: "Unidentified customer"
	},
	moreActionsBtn: {
		id: "more-actions-button",
		description: "More actions button on customer case bar",
		defaultMessage: "More actions"
	},
	noCustomerAccount: {
		id: "customer-case-bar-no-customer-account",
		description: "Text to show when no customer account exist",
		defaultMessage: "No customer account"
	},
	refundsButton: {
		id: "refunds-button",
		description: "Refunds button on customer case bar",
		defaultMessage: "Refunds"
	},
	reportIssueButton: {
		id: "report-issue-button",
		description: "Report issue button on customer case bar",
		defaultMessage: "Report issue"
	},
	someActionBtnOne: {
		id: "some-action-button-1",
		description: "Some action 1 button on customer case bar",
		defaultMessage: "Some action 1"
	},
	someActionBtnTwo: {
		id: "some-action-button-2",
		description: "some action 2 button on customer case bar",
		defaultMessage: "Some action 2"
	},
	topUpButton: {
		id: "top-up-button",
		description: "some top up button on customer case bar",
		defaultMessage: "Top-up"
	},
});

export default CustomerCaseBarMessages;
export { CustomerCaseBarMessages, CustomerCaseBarMessagesType };
