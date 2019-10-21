/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AddToBasketButtonMessagesType {
	addToBasket: FormattedMessage.MessageDescriptor;
	buyNow: FormattedMessage.MessageDescriptor;
	checkBasket: FormattedMessage.MessageDescriptor;
	inBasket: FormattedMessage.MessageDescriptor;
	maximumSubscriptionNumbers: FormattedMessage.MessageDescriptor;
}
const AddToBasketButtonMessages: AddToBasketButtonMessagesType = defineMessages({
	addToBasket: {
		id: "b2c-shop-add-product-to-basket-button-message",
		description: "Shop add product to basket button messsage",
		defaultMessage: "Add to basket"
	},
	buyNow: {
		id: "b2c-shop-buy-now-button-message",
		description: "Shop buy now button messsage",
		defaultMessage: "Buy now"
	},
	checkBasket: {
		id: "shop-product-page-check-basket-link-text",
		description: "Text to for check basket link",
		defaultMessage: "Check basket"
	},
	inBasket: {
		id: "b2c-shop-in-basket-basket-button-message",
		description: "Shop in basket basket button messsage",
		defaultMessage: "In basket"
	},
	maximumSubscriptionNumbers: {
		id: "shop-product-page-basket-is-full-on-button",
		description: "Text to show for user when no more products of this type can be added to basket",
		defaultMessage: "You already have maximum number of subscriptions in basket."
	},
});

export default AddToBasketButtonMessages;
export { AddToBasketButtonMessages, AddToBasketButtonMessagesType };
