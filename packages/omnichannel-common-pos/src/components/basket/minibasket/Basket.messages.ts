/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface BasketMessagesType {
	BASKET_TOTAL: FormattedMessage.MessageDescriptor;
	NAME: FormattedMessage.MessageDescriptor;
	RECURRING: FormattedMessage.MessageDescriptor;
	UPFRONT: FormattedMessage.MessageDescriptor;
	clearBasket: FormattedMessage.MessageDescriptor;
	goToCheckout: FormattedMessage.MessageDescriptor;
	miniBasketWithRefNumber: FormattedMessage.MessageDescriptor;
	minibasketEmpty: FormattedMessage.MessageDescriptor;
	minibasketTitle: FormattedMessage.MessageDescriptor;
	pricePerMonth: FormattedMessage.MessageDescriptor;
	referenceNumber: FormattedMessage.MessageDescriptor;
}
const BasketMessages: BasketMessagesType = defineMessages({
	BASKET_TOTAL: {
		id: "minibasket-table-header-total",
		description: "minibasket, table header total",
		defaultMessage: "BASKET TOTAL"
	},
	NAME: {
		id: "minibasket-table-header-name",
		description: "minibasket, table header name",
		defaultMessage: "NAME"
	},
	RECURRING: {
		id: "minibasket-table-header-recurring",
		description: "minibasket, table header recurring",
		defaultMessage: "RECURRING"
	},
	UPFRONT: {
		id: "minibasket-table-header-upfront",
		description: "minibasket, table header upfront",
		defaultMessage: "UPFRONT"
	},
	clearBasket: {
		id: "sd-minibasket-clear-basket",
		description: "Minibasket, clear basket button label",
		defaultMessage: "Clear basket"
	},
	goToCheckout: {
		id: "sd-minibasket-go-to-checkout",
		description: "Minibasket go to checkout",
		defaultMessage: "Go to checkout"
	},
	miniBasketWithRefNumber: {
		id: "minibasket-with-reference-number",
		description: "Title for mini basket with reference number",
		defaultMessage: "basket, {referenceNumberMessage}"
	},
	minibasketEmpty: {
		id: "sd-minibasket-basket-is-empty",
		description: "Minibasket, basket is empty",
		defaultMessage: "Basket is empty"
	},
	minibasketTitle: {
		id: "sd-minibasket-title",
		description: "Title for mini basket",
		defaultMessage: "Basket"
	},
	pricePerMonth: {
		id: "minibasket-per-month-shorthand",
		description: "Per month shorthand",
		defaultMessage: " /mth"
	},
	referenceNumber: {
		id: "sd-minibasket-reference-number",
		description: "reference-number",
		defaultMessage: "reference number {referenceNumber}"
	},
});

export default BasketMessages;
export { BasketMessages, BasketMessagesType };
