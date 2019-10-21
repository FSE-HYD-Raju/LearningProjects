/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ShopComparisonMessagesType {
	addAtleastTwo: FormattedMessage.MessageDescriptor;
	clearAll: FormattedMessage.MessageDescriptor;
	compare: FormattedMessage.MessageDescriptor;
	compareProducts: FormattedMessage.MessageDescriptor;
	configure: FormattedMessage.MessageDescriptor;
	detailedComparisonNotAvailable: FormattedMessage.MessageDescriptor;
	price: FormattedMessage.MessageDescriptor;
	select: FormattedMessage.MessageDescriptor;
}
const ShopComparisonMessages: ShopComparisonMessagesType = defineMessages({
	addAtleastTwo: {
		id: "comparison-footer-add-at-atleast-two-products",
		description: "Title for disabled comparison modal open button",
		defaultMessage: "Please add at least two products to compare"
	},
	clearAll: {
		id: "shop-comparison-footer-clear-all-action-message",
		description: "Shop comparison footer clear all action message",
		defaultMessage: "Clear all"
	},
	compare: {
		id: "shop-comparison-footer-compare-button-message",
		description: "Shop comparison footer compare button message",
		defaultMessage: "Compare"
	},
	compareProducts: {
		id: "shop-comparison-modal-compare-products-message",
		description: "Shop product comparison modal compare products message",
		defaultMessage: "Compare products"
	},
	configure: {
		id: "pos-compare-devices-configure-device-button-label",
		description: "Configure device button label",
		defaultMessage: "Configure"
	},
	detailedComparisonNotAvailable: {
		id: "pos-compare-devices-no-characteristics-configured",
		description: "No comparison characteristics available",
		defaultMessage: "Detailed comparison not available"
	},
	price: {
		id: "comparison-price-message",
		description: "Comparison price message",
		defaultMessage: "Price"
	},
	select: {
		id: "pos-compare-devices-select-device-button-label",
		description: "Select device button label",
		defaultMessage: "Select"
	},
});

export default ShopComparisonMessages;
export { ShopComparisonMessages, ShopComparisonMessagesType };
