/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ServiceDeskMessagesType {
	cancel: FormattedMessage.MessageDescriptor;
	cantAddProduct: FormattedMessage.MessageDescriptor;
	createNewCustomer: FormattedMessage.MessageDescriptor;
	customer: FormattedMessage.MessageDescriptor;
	customerBlacklisted: FormattedMessage.MessageDescriptor;
	or: FormattedMessage.MessageDescriptor;
	searchCustomerPlaceholder: FormattedMessage.MessageDescriptor;
	serviceDesk: FormattedMessage.MessageDescriptor;
	serviceDeskUnidentified: FormattedMessage.MessageDescriptor;
	shop: FormattedMessage.MessageDescriptor;
	singlePointOfContact: FormattedMessage.MessageDescriptor;
	startNewCustomerCase: FormattedMessage.MessageDescriptor;
	toolMode: FormattedMessage.MessageDescriptor;
}
const ServiceDeskMessages: ServiceDeskMessagesType = defineMessages({
	cancel: {
		id: "sd-plan-config-modal-cancel",
		description: "cancel button label",
		defaultMessage: "Cancel"
	},
	cantAddProduct: {
		id: "service-desk-cant-add-product-to-basket",
		description: "service-desk, title for dialog which appears when sales reo adds product to basket without an identified customer",
		defaultMessage: "Can't add product to basket"
	},
	createNewCustomer: {
		id: "sd-newcustomer-create-new-customer",
		description: "service-desk, new customer, create new customer link",
		defaultMessage: "Create new customer"
	},
	customer: {
		id: "service-desk-front-page-customer-link",
		description: "Label for customer link",
		defaultMessage: "Customer"
	},
	customerBlacklisted: {
		id: "service-desk-blacklisted-customer",
		description: "service-desk, title for dialog which appears when customer is blacklisted",
		defaultMessage: "Customer blacklisted, not possible to proceed"
	},
	or: {
		id: "service-desk-unidentified-customer-modal-or",
		description: "Or",
		defaultMessage: "or"
	},
	searchCustomerPlaceholder: {
		id: "service-desk-search-customer",
		description: "service-desk, placeholder for customer search input field",
		defaultMessage: "Search customer"
	},
	serviceDesk: {
		id: "service-desk-title",
		description: "Service desk title",
		defaultMessage: "Service Desk"
	},
	serviceDeskUnidentified: {
		id: "service-desk-unidentified-customer-modal-information",
		description: "Service desk unidentified customer modal, info message",
		defaultMessage: "To add products to basket you have to"
	},
	shop: {
		id: "service-desk-front-page-shop-link",
		description: "Label for shop link",
		defaultMessage: "Shop"
	},
	singlePointOfContact: {
		id: "service-desk-description",
		description: "Service desk description",
		defaultMessage: "Single point of contact for handling your shop and customers"
	},
	startNewCustomerCase: {
		id: "start-new-customer-case",
		description: "Used with button that start's new customer case on POS",
		defaultMessage: "Start new customer case"
	},
	toolMode: {
		id: "service-desk-tool-mode-link",
		description: "Label for toolmode link",
		defaultMessage: "Tool mode"
	},
});

export default ServiceDeskMessages;
export { ServiceDeskMessages, ServiceDeskMessagesType };
