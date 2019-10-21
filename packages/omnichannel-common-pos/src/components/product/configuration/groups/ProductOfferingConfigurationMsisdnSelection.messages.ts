/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductOfferingConfigurationMsisdnSelectionMessagesType {
	addToBasket: FormattedMessage.MessageDescriptor;
	changeNumber: FormattedMessage.MessageDescriptor;
	configureCustomerProduct: FormattedMessage.MessageDescriptor;
	msisdn: FormattedMessage.MessageDescriptor;
	noNumberSelected: FormattedMessage.MessageDescriptor;
	none: FormattedMessage.MessageDescriptor;
	selectNewNumber: FormattedMessage.MessageDescriptor;
	selectNumber: FormattedMessage.MessageDescriptor;
}
const ProductOfferingConfigurationMsisdnSelectionMessages: ProductOfferingConfigurationMsisdnSelectionMessagesType = defineMessages({
	addToBasket: {
		id: "product-offering-add-to-basket-button-message",
		description: "Shop add product to basket button messsage",
		defaultMessage: "Add to basket"
	},
	changeNumber: {
		id: "product-configuration-msisdn-change-number",
		description: "Label for change number button in MSISDN selection",
		defaultMessage: "Change number"
	},
	configureCustomerProduct: {
		id: "product-offering-config-msisdn-modal-title",
		description: "Title of MSISDN config modal",
		defaultMessage: "Configure customer product"
	},
	msisdn: {
		id: "po-configuration-msisdn-abbreviation",
		description: "localized MSISDN abbreviation on product page",
		defaultMessage: "MSISDN"
	},
	noNumberSelected: {
		id: "product-offering-configuration-number-not-selected",
		description: "Msisdn has not yet been selected",
		defaultMessage: "No number selected"
	},
	none: {
		id: "product-offering-group-select-none",
		description: "'None' option in product offering configuration select element",
		defaultMessage: "None"
	},
	selectNewNumber: {
		id: "product-offering-config-msisdn-select-new-number",
		description: "Title of MSISDN config modal",
		defaultMessage: "Select new number"
	},
	selectNumber: {
		id: "product-configuration-msisdn-select-number",
		description: "Label for select number button in MSISDN selection",
		defaultMessage: "Select number"
	},
});

export default ProductOfferingConfigurationMsisdnSelectionMessages;
export { ProductOfferingConfigurationMsisdnSelectionMessages, ProductOfferingConfigurationMsisdnSelectionMessagesType };
