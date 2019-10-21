/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ServicesMessagesType {
	addonFee: FormattedMessage.MessageDescriptor;
	configureCallForwarding: FormattedMessage.MessageDescriptor;
	disableService: FormattedMessage.MessageDescriptor;
	enableService: FormattedMessage.MessageDescriptor;
	freePrice: FormattedMessage.MessageDescriptor;
	lifecycleStatusDefaultValue: FormattedMessage.MessageDescriptor;
	lifecycleStatusRow: FormattedMessage.MessageDescriptor;
	noActiveServicesActive: FormattedMessage.MessageDescriptor;
	noInactiveServices: FormattedMessage.MessageDescriptor;
	noServicesAvailable: FormattedMessage.MessageDescriptor;
	servicesTitle: FormattedMessage.MessageDescriptor;
}
const ServicesMessages: ServicesMessagesType = defineMessages({
	addonFee: {
		id: "customer-subscription-addons-fee",
		description: "Free service",
		defaultMessage: "Free"
	},
	configureCallForwarding: {
		id: "digital-life-callforwarding-configure-row-description",
		description: "Configure call forwarding services, row description",
		defaultMessage: "Configure call forwarding services"
	},
	disableService: {
		id: "service-allowed-transitions-disable-message",
		description: "Disable service",
		defaultMessage: "Disable"
	},
	enableService: {
		id: "service-allowed-transitions-enable-message",
		description: "Enable service",
		defaultMessage: "Enable"
	},
	freePrice: {
		id: "customer-subscription-addons-free-service",
		description: "Free service",
		defaultMessage: "Free"
	},
	lifecycleStatusDefaultValue: {
		id: "digital-life-service-plan-and-products-active-services-service-lifecycle-status-default-value",
		description: "In Service plan & products, active/inactive services, status to display if lifecycle-status is null",
		defaultMessage: "-"
	},
	lifecycleStatusRow: {
		id: "customer-subscription-services-lifecycle-status",
		description: "Service status for addons row in customer subscription",
		defaultMessage: "{lifecycleStatus}"
	},
	noActiveServicesActive: {
		id: "digital-life-no-active-services-title",
		description: "Label shown when there are no active services",
		defaultMessage: "No active services"
	},
	noInactiveServices: {
		id: "digital-life-no-inactive-services-title",
		description: "Label shown when there are no inactive services",
		defaultMessage: "No inactive services"
	},
	noServicesAvailable: {
		id: "digital-life-service-plan-and-products-no-active-services-title",
		description: "In Service plan & products, no active services available, title",
		defaultMessage: "Services (none available)"
	},
	servicesTitle: {
		id: "digital-life-service-plan-and-products-active-services-title",
		description: "In Service plan & products, active services, title",
		defaultMessage: "Services"
	},
});

export default ServicesMessages;
export { ServicesMessages, ServicesMessagesType };
