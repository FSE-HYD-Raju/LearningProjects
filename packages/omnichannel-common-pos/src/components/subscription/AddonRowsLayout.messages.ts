/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AddonRowsLayoutMessagesType {
	addonServicesCompatible: FormattedMessage.MessageDescriptor;
	addonServicesIncompatible: FormattedMessage.MessageDescriptor;
	expiryDate: FormattedMessage.MessageDescriptor;
	fees: FormattedMessage.MessageDescriptor;
	name: FormattedMessage.MessageDescriptor;
	noCompatibility: FormattedMessage.MessageDescriptor;
	showAll: FormattedMessage.MessageDescriptor;
	status: FormattedMessage.MessageDescriptor;
}
const AddonRowsLayoutMessages: AddonRowsLayoutMessagesType = defineMessages({
	addonServicesCompatible: {
		id: "addon-compatibility-view-compatible-addons",
		description: "Addon compatibility view, label for compatible addons",
		defaultMessage: "<span class='text-success'>{addonCount} add-on services</span> are incompatible with the new plan and will be migrated"
	},
	addonServicesIncompatible: {
		id: "addon-compatibility-view-incompatible-addons",
		description: "Addon compatibility view, label for incompatible addons",
		defaultMessage: "<span class='text-danger'>{addonCount} add-on services</span> are incompatible with the new plan and will be disabled"
	},
	expiryDate: {
		id: "service-desk-active-customer-subscription-addons-service-expiry-date",
		description: "In POS, Customer subscriptions, active addons, expiry date",
		defaultMessage: "Expiry date"
	},
	fees: {
		id: "customer-subscription-available-addons-service-fees",
		description: "In Customer subscriptions, available addons, fees",
		defaultMessage: "Fees"
	},
	name: {
		id: "customer-subscription-available-addons-service-name-label",
		description: "In Customer subscriptions, available addons, service name",
		defaultMessage: "Name"
	},
	noCompatibility: {
		id: "addon-compatibility-no-compatibility-issues",
		description: "Addon compatibility view, label for no compatibility / incompatibility to display",
		defaultMessage: "No compatibility / incompatibility to display for this subscription."
	},
	showAll: {
		id: "addon-compatibility-more-items",
		description: "Addon compatibility view, label for no 'show all' addons",
		defaultMessage: "Show all"
	},
	status: {
		id: "customer-subscription-available-addons-service-lifecycle-status",
		description: "In Customer subscriptions, available addons, service lifecycle status",
		defaultMessage: "Status"
	},
});

export default AddonRowsLayoutMessages;
export { AddonRowsLayoutMessages, AddonRowsLayoutMessagesType };
