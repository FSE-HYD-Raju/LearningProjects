/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OrganizationMessagesType {
	createIndividual: FormattedMessage.MessageDescriptor;
	createOrganization: FormattedMessage.MessageDescriptor;
	organizationCreateCustomer: FormattedMessage.MessageDescriptor;
	organizationCustomerCreated: FormattedMessage.MessageDescriptor;
	organizationWasCreatedSuccessfully: FormattedMessage.MessageDescriptor;
}
const OrganizationMessages: OrganizationMessagesType = defineMessages({
	createIndividual: {
		id: "pos-create-individual",
		description: "pos create individual selector button",
		defaultMessage: "Create Individual"
	},
	createOrganization: {
		id: "pos-create-organization",
		description: "pos create organization selector button",
		defaultMessage: "Create Organization"
	},
	organizationCreateCustomer: {
		id: "organization-creation-form-create-customer",
		description: "Organization creation form, Create customer label",
		defaultMessage: "Create customer"
	},
	organizationCustomerCreated: {
		id: "organization-creation-success-ok-button",
		description: "Organization customer created, press OK to proceed",
		defaultMessage: "OK"
	},
	organizationWasCreatedSuccessfully: {
		id: "organization-creation-form-success",
		description: "Create organizational customer success",
		defaultMessage: "Organization was created successfully!"
	},
});

export default OrganizationMessages;
export { OrganizationMessages, OrganizationMessagesType };
