/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface PriceComponentMessagesType {
	mnth: FormattedMessage.MessageDescriptor;
	monthly: FormattedMessage.MessageDescriptor;
	now: FormattedMessage.MessageDescriptor;
	payNow: FormattedMessage.MessageDescriptor;
	recurring: FormattedMessage.MessageDescriptor;
	starting: FormattedMessage.MessageDescriptor;
}
const PriceComponentMessages: PriceComponentMessagesType = defineMessages({
	mnth: {
		id: "shop-product-price-tag-mnth",
		description: "Shop product price, per month price shorthand",
		defaultMessage: "/mth"
	},
	monthly: {
		id: "shop-product-price-tag-monthly",
		description: "Shop product price, per month price",
		defaultMessage: "monthly"
	},
	now: {
		id: "shop-product-price-tag-now",
		description: "Shop product price, price now",
		defaultMessage: "now"
	},
	payNow: {
		id: "shop-product-price-single-product-page-tag-now",
		description: "Shop product price, price now (for single product page view)",
		defaultMessage: "Pay now"
	},
	recurring: {
		id: "shop-product-price-single-product-page-tag-recurring",
		description: "Shop product price, price recurring (for single product page view)",
		defaultMessage: "Recurring fee"
	},
	starting: {
		id: "shop-product-price-starting-from-label",
		description: "Shop product price, starting from label",
		defaultMessage: "Starting from"
	},
});

export default PriceComponentMessages;
export { PriceComponentMessages, PriceComponentMessagesType };
