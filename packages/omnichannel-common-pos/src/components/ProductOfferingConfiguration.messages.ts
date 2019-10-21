/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductOfferingConfigurationMessagesType {
	addToBasket: FormattedMessage.MessageDescriptor;
	close: FormattedMessage.MessageDescriptor;
	pleaseConfigure: FormattedMessage.MessageDescriptor;
}
const ProductOfferingConfigurationMessages: ProductOfferingConfigurationMessagesType = defineMessages({
	addToBasket: {
		id: "poc-submit-button-message",
		description: "Shop add product to basket button message",
		defaultMessage: "Add to basket"
	},
	close: {
		id: "product-offering-configuration-modal-close-button-label",
		description: "Close",
		defaultMessage: "Close"
	},
	pleaseConfigure: {
		id: "product-offering-configuration-modal-title",
		description: "Title of product offering configuration modal",
		defaultMessage: "Please configure {productName}"
	},
});

export default ProductOfferingConfigurationMessages;
export { ProductOfferingConfigurationMessages, ProductOfferingConfigurationMessagesType };
