/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CustomerMessagesType {
	duplicateIndividual: FormattedMessage.MessageDescriptor;
	formSaveButton: FormattedMessage.MessageDescriptor;
	newcustomerHasBeenCreated: FormattedMessage.MessageDescriptor;
	sidebarShowallLink: FormattedMessage.MessageDescriptor;
}
const CustomerMessages: CustomerMessagesType = defineMessages({
	duplicateIndividual: {
		id: "duplicate-results-found-modal-text",
		description: "Shown when customer creation found an existing individual by the same name and identification data",
		defaultMessage: "Found an existing individual"
	},
	formSaveButton: {
		id: "customer-details-form-save-button",
		description: "Save button for customer details form",
		defaultMessage: "Save"
	},
	newcustomerHasBeenCreated: {
		id: "service-desk-newcustomer-info-customer-has-been-created",
		description: "Title for customer creation modal",
		defaultMessage: "Create new customer"
	},
	sidebarShowallLink: {
		id: "customer-details-sidebar-showall-link",
		description: "Show all link label",
		defaultMessage: "All"
	},
});

export default CustomerMessages;
export { CustomerMessages, CustomerMessagesType };
