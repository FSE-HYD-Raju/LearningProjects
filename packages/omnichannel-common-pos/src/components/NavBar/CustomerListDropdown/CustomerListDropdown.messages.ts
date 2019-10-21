/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CustomerListDropdownMessagesType {
	createCustomer: FormattedMessage.MessageDescriptor;
	customerAddress: FormattedMessage.MessageDescriptor;
	customerName: FormattedMessage.MessageDescriptor;
	customerNumber: FormattedMessage.MessageDescriptor;
	hyphenSymbol: FormattedMessage.MessageDescriptor;
	items: FormattedMessage.MessageDescriptor;
	noCustomerAccount: FormattedMessage.MessageDescriptor;
	noResultsFound: FormattedMessage.MessageDescriptor;
	ofText: FormattedMessage.MessageDescriptor;
	searchPlaceholder: FormattedMessage.MessageDescriptor;
	searching: FormattedMessage.MessageDescriptor;
}
const CustomerListDropdownMessages: CustomerListDropdownMessagesType = defineMessages({
	createCustomer: {
		id: "Customer-list-dropdown-create-customer-button-label",
		description: "Create customer button in customer list",
		defaultMessage: "Create customer"
	},
	customerAddress: {
		id: "Customer-list-dropdown-address",
		description: "Address",
		defaultMessage: "Address"
	},
	customerName: {
		id: "Customer-list-dropdown-name",
		description: "Name",
		defaultMessage: "Name"
	},
	customerNumber: {
		id: "Customer-list-dropdown-phone-number",
		description: "Phone number",
		defaultMessage: "Number"
	},
	hyphenSymbol: {
		id: "Customer-list-dropdown-pagination-hyphen-symbol",
		description: "pagination info",
		defaultMessage: "-"
	},
	items: {
		id: "Customer-list-dropdown-pagination-items",
		description: "pagination info",
		defaultMessage: "items"
	},
	noCustomerAccount: {
		id: "Customer-list-dropdown-no-customer-account",
		description: "No customer accounts exists ",
		defaultMessage: "No customer account. View individual details."
	},
	noResultsFound: {
		id: "Customer-list-dropdown-could-not-find-customer-with",
		description: "Message shown when no results were found in search",
		defaultMessage: "Couldn't find anything with {terms}"
	},
	ofText: {
		id: "Customer-list-dropdown-pagination-of-text",
		description: "pagination info",
		defaultMessage: "of"
	},
	searchPlaceholder: {
		id: "Customer-list-dropdown-placeholder",
		description: "Search Placeholder",
		defaultMessage: "Filter results"
	},
	searching: {
		id: "Customer-list-dropdown-searching-for-customer",
		description: "Message shown when customer search in is in progress",
		defaultMessage: "Searching for {terms}"
	},
});

export default CustomerListDropdownMessages;
export { CustomerListDropdownMessages, CustomerListDropdownMessagesType };
