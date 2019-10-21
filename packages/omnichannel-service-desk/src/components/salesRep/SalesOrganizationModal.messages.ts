/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SalesOrganizationModalMessagesType {
	activateButtonMessage: FormattedMessage.MessageDescriptor;
	noEligibleSalesFound: FormattedMessage.MessageDescriptor;
	serviceDeskOrganizationModalTitle: FormattedMessage.MessageDescriptor;
	titleForInventorySelect: FormattedMessage.MessageDescriptor;
	titleForOrganizationSelect: FormattedMessage.MessageDescriptor;
}
const SalesOrganizationModalMessages: SalesOrganizationModalMessagesType = defineMessages({
	activateButtonMessage: {
		id: "sales-organization-modal-make-active",
		description: "Activate button message for sales organization selection modal",
		defaultMessage: "Make active"
	},
	noEligibleSalesFound: {
		id: "sales-organization-modal-no-organizations-error-message",
		description: "Message informing about errors while finding ",
		defaultMessage: "No eligible sales organizations found."
	},
	serviceDeskOrganizationModalTitle: {
		id: "service-desk-sales-organization-modal-title",
		description: "Service desk sales organization selection modal title",
		defaultMessage: "Select sales organization"
	},
	titleForInventorySelect: {
		id: "sales-organization-modal-inventory-select-label",
		description: "Title for inventory select in organization selection modal",
		defaultMessage: "Inventory"
	},
	titleForOrganizationSelect: {
		id: "sales-organization-modal-organization-select-label",
		description: "Title for organization select in organization selection modal",
		defaultMessage: "Organization"
	},
});

export default SalesOrganizationModalMessages;
export { SalesOrganizationModalMessages, SalesOrganizationModalMessagesType };
