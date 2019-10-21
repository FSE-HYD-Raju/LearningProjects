/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CustomerDetailsSubscriptionMessagesType {
	detailsAddPhone: FormattedMessage.MessageDescriptor;
	detailsAssociatedDevice: FormattedMessage.MessageDescriptor;
	detailsNoPhoneConnected: FormattedMessage.MessageDescriptor;
	msisdnNotLinked: FormattedMessage.MessageDescriptor;
	msisdnTitle: FormattedMessage.MessageDescriptor;
	posExistingPlanListingHeader: FormattedMessage.MessageDescriptor;
	subscriptionsPageTitle: FormattedMessage.MessageDescriptor;
}
const CustomerDetailsSubscriptionMessages: CustomerDetailsSubscriptionMessagesType = defineMessages({
	detailsAddPhone: {
		id: "subscription-details-add-phone",
		description: "Subscriptions, text for the Add phone button",
		defaultMessage: "Add phone"
	},
	detailsAssociatedDevice: {
		id: "subscription-details-associated-device",
		description: "Subscriptions, device associated to a plan in Things",
		defaultMessage: "Phone"
	},
	detailsNoPhoneConnected: {
		id: "subscription-details-no-phone-connected",
		description: "Subscriptions, text when no phone associated to shown plan",
		defaultMessage: "No phone connected"
	},
	msisdnNotLinked: {
		id: "subscription-details-msisdn-not-linked",
		description: "subscription details MSISDN not linked",
		defaultMessage: "MSISDN not linked"
	},
	msisdnTitle: {
		id: "subscription-details-msisdn",
		description: "subscription details MSISDN, title",
		defaultMessage: "MSISDN"
	},
	posExistingPlanListingHeader: {
		id: "pos-existing-plan-listing-header",
		description: "Header for listing of customer's existing Plans",
		defaultMessage: "Plans"
	},
	subscriptionsPageTitle: {
		id: "service-desk-active-customer-subscriptions-page-title",
		description: "In POS, Customer subscriptions, title",
		defaultMessage: "Subscriptions"
	},
});

export default CustomerDetailsSubscriptionMessages;
export { CustomerDetailsSubscriptionMessages, CustomerDetailsSubscriptionMessagesType };
