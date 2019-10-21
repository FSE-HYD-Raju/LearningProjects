/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductLoansListMessagesType {
	listTitle: FormattedMessage.MessageDescriptor;
	noListTitle: FormattedMessage.MessageDescriptor;
	noResults: FormattedMessage.MessageDescriptor;
	payBackNow: FormattedMessage.MessageDescriptor;
	serviceDetails: FormattedMessage.MessageDescriptor;
}
const ProductLoansListMessages: ProductLoansListMessagesType = defineMessages({
	listTitle: {
		id: "product-loans-list-title",
		description: "Product loans list (addons) title",
		defaultMessage: "Product loans"
	},
	noListTitle: {
		id: "product-loans-no-list-title",
		description: "No product loans list (addons) title",
		defaultMessage: "Product loans (none available)"
	},
	noResults: {
		id: "product-loans-list-no-results-text",
		description: "Product loans list (addons) no results text",
		defaultMessage: "Loans are not available for you"
	},
	payBackNow: {
		id: "product-loans-list-pay-back-now-button-text",
		description: "Product loans list (addons) pay back now (top-up) button text",
		defaultMessage: "Pay back now"
	},
	serviceDetails: {
		id: "product-loans-list-service-details-title",
		description: "Product loans list, Service details title",
		defaultMessage: "Service details"
	},
});

export default ProductLoansListMessages;
export { ProductLoansListMessages, ProductLoansListMessagesType };
