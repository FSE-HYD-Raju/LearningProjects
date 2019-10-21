/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ServiceDeskContainerMessagesType {
	insufficientPermissions: FormattedMessage.MessageDescriptor;
	pointOfSales: FormattedMessage.MessageDescriptor;
	toolModeNotConfigured: FormattedMessage.MessageDescriptor;
}
const ServiceDeskContainerMessages: ServiceDeskContainerMessagesType = defineMessages({
	insufficientPermissions: {
		id: "service-desk-insufficient-permissions",
		description: "service desk, insufficient permissions",
		defaultMessage: "You have insufficient permissions to view this page."
	},
	pointOfSales: {
		id: "service-desk-cold-point-of-sales",
		description: "service desk, title",
		defaultMessage: "Point of Sales"
	},
	toolModeNotConfigured: {
		id: "service-desk-tool-mode-not-configured",
		description: "Message for when CSRTb config is missing from Consul",
		defaultMessage: "CSRTb not configured in consul"
	},
});

export default ServiceDeskContainerMessages;
export { ServiceDeskContainerMessages, ServiceDeskContainerMessagesType };
