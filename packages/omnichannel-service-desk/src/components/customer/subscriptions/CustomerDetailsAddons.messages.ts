/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CustomerDetailsAddonsMessagesType {
	addonsActiveHeader: FormattedMessage.MessageDescriptor;
	addonsInactiveHeader: FormattedMessage.MessageDescriptor;
	availableAddonsActiveHeader: FormattedMessage.MessageDescriptor;
	availableAddonsInactiveHeader: FormattedMessage.MessageDescriptor;
}
const CustomerDetailsAddonsMessages: CustomerDetailsAddonsMessagesType = defineMessages({
	addonsActiveHeader: {
		id: "active-addons-list-title-addons-available",
		description: "Active addons title when addons are available",
		defaultMessage: "Active addons"
	},
	addonsInactiveHeader: {
		id: "active-addons-list-title-no-addons-available",
		description: "Active addons title when no addons are available",
		defaultMessage: "Active addons (none available)"
	},
	availableAddonsActiveHeader: {
		id: "customer-subscription-available-addons-title",
		description: "In POS, Customer subscriptions, available addons, title",
		defaultMessage: "Available addons"
	},
	availableAddonsInactiveHeader: {
		id: "customer-subscription-available-addons-none-available-title",
		description: "In POS, Customer subscriptions, no available addons, title",
		defaultMessage: "Available addons (none available)"
	},
});

export default CustomerDetailsAddonsMessages;
export { CustomerDetailsAddonsMessages, CustomerDetailsAddonsMessagesType };
