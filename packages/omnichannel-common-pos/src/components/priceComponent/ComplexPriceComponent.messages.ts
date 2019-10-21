/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ComplexPriceComponentMessagesType {
	monthShorthand: FormattedMessage.MessageDescriptor;
	monthly: FormattedMessage.MessageDescriptor;
	monthlyFees: FormattedMessage.MessageDescriptor;
	monthlyFeesAdditionalText: FormattedMessage.MessageDescriptor;
	now: FormattedMessage.MessageDescriptor;
	payNow: FormattedMessage.MessageDescriptor;
	payNowAdditionalText: FormattedMessage.MessageDescriptor;
	starting: FormattedMessage.MessageDescriptor;
	totalInfoOnetime: FormattedMessage.MessageDescriptor;
	totalInfoRecurring: FormattedMessage.MessageDescriptor;
}
const ComplexPriceComponentMessages: ComplexPriceComponentMessagesType = defineMessages({
	monthShorthand: {
		id: "complex-shop-product-price-tag-month",
		description: "Shop product price, price per month shorthand label",
		defaultMessage: " / mo"
	},
	monthly: {
		id: "complex-shop-product-price-tag-monthly",
		description: "Shop product price, monthly label",
		defaultMessage: "monthly"
	},
	monthlyFees: {
		id: "complex-shop-product-price-single-product-page-tag-monthly-fees",
		description: "Shop product price, monthly fees (for single product page view)",
		defaultMessage: "Monthly fees"
	},
	monthlyFeesAdditionalText: {
		id: "complex-shop-product-price-single-product-page-tag-monthly-fees-additional-text",
		description: "Shop product price, monthly fees additional text)",
		defaultMessage: "from second month"
	},
	now: {
		id: "complex-shop-product-price-tag-now",
		description: "Shop product price, price now",
		defaultMessage: "now"
	},
	payNow: {
		id: "complex-shop-product-price-single-product-page-tag-now",
		description: "Shop product price, price now (for single product page view)",
		defaultMessage: "Pay now"
	},
	payNowAdditionalText: {
		id: "complex-shop-product-price-single-product-page-tag-now-additional-text",
		description: "Shop product price, price now additional text",
		defaultMessage: "+ first month fees"
	},
	starting: {
		id: "complex-shop-product-price-starting-from-label",
		description: "Shop product price, starting from label",
		defaultMessage: "Starting from"
	},
	totalInfoOnetime: {
		id: "complex-shop-product-price-single-product-page-tag-total-info-onetime",
		description: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Pay now - tooltip",
		defaultMessage: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Pay now - tooltip"
	},
	totalInfoRecurring: {
		id: "complex-shop-product-price-single-product-page-tag-total-info-recurring",
		description: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Monthly fee - tooltip",
		defaultMessage: "eShop - Product Page - PO_YoungDigitalEdition - Price banner - Monthly fee - tooltip"
	},
});

export default ComplexPriceComponentMessages;
export { ComplexPriceComponentMessages, ComplexPriceComponentMessagesType };
