/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductOfferingConfigurationMessagesType {
	offeringConfigFree: FormattedMessage.MessageDescriptor;
	offeringConfigPriceMth: FormattedMessage.MessageDescriptor;
}
const ProductOfferingConfigurationMessages: ProductOfferingConfigurationMessagesType = defineMessages({
	offeringConfigFree: {
		id: "product-offering-config-free",
		description: "Free product",
		defaultMessage: "Free"
	},
	offeringConfigPriceMth: {
		id: "product-offering-config-price-mth",
		description: "Per month shorthand",
		defaultMessage: " /mth"
	},
});

export default ProductOfferingConfigurationMessages;
export { ProductOfferingConfigurationMessages, ProductOfferingConfigurationMessagesType };
