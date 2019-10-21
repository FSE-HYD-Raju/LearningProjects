/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface NewCustomerMessagesType {
	duplicateSelectCustomer: FormattedMessage.MessageDescriptor;
}
const NewCustomerMessages: NewCustomerMessagesType = defineMessages({
	duplicateSelectCustomer: {
		id: "duplicate-results-select-customer",
		description: "Button for selecting a customer",
		defaultMessage: "Select"
	},
});

export default NewCustomerMessages;
export { NewCustomerMessages, NewCustomerMessagesType };
