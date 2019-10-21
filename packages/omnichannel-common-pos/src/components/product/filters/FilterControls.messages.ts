/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface FilterControlsMessagesType {
	allCosts: FormattedMessage.MessageDescriptor;
	from: FormattedMessage.MessageDescriptor;
	fromMin: FormattedMessage.MessageDescriptor;
	includedMinutes: FormattedMessage.MessageDescriptor;
	inputRangeMaxLabel: FormattedMessage.MessageDescriptor;
	min: FormattedMessage.MessageDescriptor;
	oneTimeCost: FormattedMessage.MessageDescriptor;
	priceRange: FormattedMessage.MessageDescriptor;
	recurringCost: FormattedMessage.MessageDescriptor;
	to: FormattedMessage.MessageDescriptor;
	toMin: FormattedMessage.MessageDescriptor;
	usageCost: FormattedMessage.MessageDescriptor;
}
const FilterControlsMessages: FilterControlsMessagesType = defineMessages({
	allCosts: {
		id: "shop-container-all-costs",
		description: "Shop container filters all costs title",
		defaultMessage: "All costs"
	},
	from: {
		id: "shopcontainer-product-price-filter-from",
		description: "Starting from price label in product filtering",
		defaultMessage: "From"
	},
	fromMin: {
		id: "filter-controls-minutes-included-input-range-min-label",
		description: "Filter controls minutes included input range min label",
		defaultMessage: "From "
	},
	includedMinutes: {
		id: "shop-container-included-minutes-filter-title",
		description: "Shop container inclued minutes filter title",
		defaultMessage: "Included minutes"
	},
	inputRangeMaxLabel: {
		id: "filter-controls-minutes-included-input-range-max-label",
		description: "Filter controls minutes included input range max label",
		defaultMessage: "To "
	},
	min: {
		id: "filter-controls-minutes-included-input-range-min-value",
		description: "Filter controls minutes included input range min unit label",
		defaultMessage: " min"
	},
	oneTimeCost: {
		id: "shop-container-one-time-cost",
		description: "Shop container filters one time cost title",
		defaultMessage: "One-time cost"
	},
	priceRange: {
		id: "shop-container-price-range-filter-title",
		description: "Shop container filters price range title",
		defaultMessage: "Price range"
	},
	recurringCost: {
		id: "shop-container-recurring-cost",
		description: "Shop container filters recurring cost title",
		defaultMessage: "Recurring cost"
	},
	to: {
		id: "shopcontainer-product-price-filter-to",
		description: "Maximum price label in product filtering",
		defaultMessage: "To"
	},
	toMin: {
		id: "filter-controls-minutes-included-input-range-max-value",
		description: "Filter controls minutes included input range max unit label",
		defaultMessage: " min"
	},
	usageCost: {
		id: "shop-container-usage-cost",
		description: "Shop container filters usage cost title",
		defaultMessage: "Usage cost"
	},
});

export default FilterControlsMessages;
export { FilterControlsMessages, FilterControlsMessagesType };
