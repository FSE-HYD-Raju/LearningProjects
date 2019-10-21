/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductMessagesType {
	addonCancel: FormattedMessage.MessageDescriptor;
	addonConfigFailureMessage: FormattedMessage.MessageDescriptor;
	addonConfigFailureModalTitle: FormattedMessage.MessageDescriptor;
	addonConfiguration: FormattedMessage.MessageDescriptor;
	addonConfigured: FormattedMessage.MessageDescriptor;
	addonName: FormattedMessage.MessageDescriptor;
	apply: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	configuringFailed: FormattedMessage.MessageDescriptor;
	getNewNumber: FormattedMessage.MessageDescriptor;
	planConfiguration: FormattedMessage.MessageDescriptor;
	planConfigurationFailure: FormattedMessage.MessageDescriptor;
	planConfigured: FormattedMessage.MessageDescriptor;
	pleaseConfigureAddon: FormattedMessage.MessageDescriptor;
	pleaseConfigurePlan: FormattedMessage.MessageDescriptor;
	pleaseConfigureService: FormattedMessage.MessageDescriptor;
	save: FormattedMessage.MessageDescriptor;
	serviceConfigFailureMessage: FormattedMessage.MessageDescriptor;
	serviceConfigFailureModalTitle: FormattedMessage.MessageDescriptor;
	serviceConfiguration: FormattedMessage.MessageDescriptor;
	serviceConfigured: FormattedMessage.MessageDescriptor;
	serviceName: FormattedMessage.MessageDescriptor;
	transferOldNumber: FormattedMessage.MessageDescriptor;
}
const ProductMessages: ProductMessagesType = defineMessages({
	addonCancel: {
		id: "addon-configuration-cancel",
		description: "Cancel button text in Addon configuration modal",
		defaultMessage: "Cancel"
	},
	addonConfigFailureMessage: {
		id: "addon-configuration-failure-modal-body-message",
		description: "Message of Addon configuration failure modal",
		defaultMessage: "Configuring {productName} failed"
	},
	addonConfigFailureModalTitle: {
		id: "addon-configuration-failure-modal-title",
		description: "Title of Addon configuration failure modal",
		defaultMessage: "Addon configuration"
	},
	addonConfiguration: {
		id: "addon-configured-modal-title",
		description: "Title of Addon configuration success modal",
		defaultMessage: "Addon configuration"
	},
	addonConfigured: {
		id: "addon-configured-modal-body-message",
		description: "Message of Addon configuration success modal",
		defaultMessage: "Addon {productName} configured"
	},
	addonName: {
		id: "addon-configuration-name-label",
		description: "Label for Add-on name",
		defaultMessage: "Add-on name"
	},
	apply: {
		id: "existing-plan-configuration-apply",
		description: "OK button text in Plan configuration modal",
		defaultMessage: "Apply"
	},
	cancel: {
		id: "existing-plan-configuration-cancel",
		description: "Cancel button text in Plan configuration modal",
		defaultMessage: "Cancel"
	},
	configuringFailed: {
		id: "existing-plan-configuration-failure-modal-body-message",
		description: "Message of Plan configuration failure modal",
		defaultMessage: "Configuring {productName} failed"
	},
	getNewNumber: {
		id: "portin-message-newnumber",
		description: "Get new number message for PortIn",
		defaultMessage: "Get new number"
	},
	planConfiguration: {
		id: "plan-configured-modal-title",
		description: "Title of Plan configuration success modal",
		defaultMessage: "Plan {productName} configuration"
	},
	planConfigurationFailure: {
		id: "existing-plan-configuration-failure-modal-title",
		description: "Title of Plan configuration failure modal",
		defaultMessage: "Plan {productName} configuration"
	},
	planConfigured: {
		id: "plan-configured-modal-body-message",
		description: "Message of Plan configuration success modal",
		defaultMessage: "Plan {productName} configured"
	},
	pleaseConfigureAddon: {
		id: "addon-configuration-modal-title",
		description: "Title of Addon configuration modal",
		defaultMessage: "Please configure addon"
	},
	pleaseConfigurePlan: {
		id: "existing-plan-configuration-modal-title",
		description: "Title of Plan configuration modal",
		defaultMessage: "Please configure plan {productName}"
	},
	pleaseConfigureService: {
		id: "service-configuration-modal-title",
		description: "Title of Service configuration modal",
		defaultMessage: "Please configure service"
	},
	save: {
		id: "addon-configuration-save",
		description: "OK button text in Addon configuration modal",
		defaultMessage: "Save"
	},
	serviceConfigFailureMessage: {
		id: "service-configuration-failure-modal-body-message",
		description: "Message of Service configuration failure modal",
		defaultMessage: "Configuring {productName} failed"
	},
	serviceConfigFailureModalTitle: {
		id: "service-configuration-failure-modal-title",
		description: "Title of Service configuration failure modal",
		defaultMessage: "Service configuration"
	},
	serviceConfiguration: {
		id: "service-configured-modal-title",
		description: "Title of Service configuration success modal",
		defaultMessage: "Service configuration"
	},
	serviceConfigured: {
		id: "service-configured-modal-body-message",
		description: "Message of Service configuration success modal",
		defaultMessage: "Service {productName} configured"
	},
	serviceName: {
		id: "service-configuration-name-label",
		description: "Label for Service name",
		defaultMessage: "Service name"
	},
	transferOldNumber: {
		id: "portin-message-oldnumber",
		description: "Transfer old number",
		defaultMessage: "Transfer old number"
	},
});

export default ProductMessages;
export { ProductMessages, ProductMessagesType };
