/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ProductTableMessagesType {
	categoryBlacklisted: FormattedMessage.MessageDescriptor;
	categoryNoProductsFound: FormattedMessage.MessageDescriptor;
	compare: FormattedMessage.MessageDescriptor;
	contains: FormattedMessage.MessageDescriptor;
	detailsAvailability: FormattedMessage.MessageDescriptor;
	detailsBasicInformation: FormattedMessage.MessageDescriptor;
	detailsTechnicalInformation: FormattedMessage.MessageDescriptor;
	filtersHideAndReset: FormattedMessage.MessageDescriptor;
	fromCurrency: FormattedMessage.MessageDescriptor;
	name: FormattedMessage.MessageDescriptor;
	noProductFound: FormattedMessage.MessageDescriptor;
	noProductFoundForSearch: FormattedMessage.MessageDescriptor;
	oneTimePrice: FormattedMessage.MessageDescriptor;
	productDetailsStockLevel: FormattedMessage.MessageDescriptor;
	productFound: FormattedMessage.MessageDescriptor;
	productSelectProduct: FormattedMessage.MessageDescriptor;
	productTotalOneTimeFee: FormattedMessage.MessageDescriptor;
	productTotalRecurringFee: FormattedMessage.MessageDescriptor;
	quantity: FormattedMessage.MessageDescriptor;
	recurringPrice: FormattedMessage.MessageDescriptor;
	search: FormattedMessage.MessageDescriptor;
	searchLabel: FormattedMessage.MessageDescriptor;
	selectProduct: FormattedMessage.MessageDescriptor;
	showFilters: FormattedMessage.MessageDescriptor;
	stock: FormattedMessage.MessageDescriptor;
	subscriptionShopping: FormattedMessage.MessageDescriptor;
	subscriptionShoppingEnd: FormattedMessage.MessageDescriptor;
	thisProductAvailability: FormattedMessage.MessageDescriptor;
	usagePrice: FormattedMessage.MessageDescriptor;
}
const ProductTableMessages: ProductTableMessagesType = defineMessages({
	categoryBlacklisted: {
		id: "service-browser-category-blacklisted",
		description: "Label shown when browsing a category with product offerings that need an applicable agreement",
		defaultMessage: "Please select an agreement."
	},
	categoryNoProductsFound: {
		id: "service-browser-category-no-products-found",
		description: "Label shown when user selected category but category had no products",
		defaultMessage: "No products found in category"
	},
	compare: {
		id: "product-table-compare",
		description: "Product table head column",
		defaultMessage: "Compare"
	},
	contains: {
		id: "product-table-contains",
		description: "Product table head column",
		defaultMessage: "Contains"
	},
	detailsAvailability: {
		id: "service-desk-product-table-details-availability-tab-title",
		description: "Title for availability tab in product details",
		defaultMessage: "Availability"
	},
	detailsBasicInformation: {
		id: "service-desk-product-table-details-basic-information-tab-title",
		description: "Title for basic information tab in product details",
		defaultMessage: "Basic information"
	},
	detailsTechnicalInformation: {
		id: "service-desk-product-table-details-technical-information-tab-title",
		description: "Title for technical information tab in product details",
		defaultMessage: "Technical information"
	},
	filtersHideAndReset: {
		id: "service-desk-filters-hide-and-reset",
		description: "Hide and reset filters link text",
		defaultMessage: "Hide and reset filters"
	},
	fromCurrency: {
		id: "service-desk-producttable-price-starting-from",
		description: "Service desk, product table price starting from",
		defaultMessage: "from {currency}"
	},
	name: {
		id: "product-table-name",
		description: "Product table head column",
		defaultMessage: "Name"
	},
	noProductFound: {
		id: "service-desk-no-products-found",
		description: "Label shown when no products where found",
		defaultMessage: "No products found in category {category}"
	},
	noProductFoundForSearch: {
		id: "service-desk-search-no-products-found-for-search",
		description: "Label shown when user searched for products and none were found",
		defaultMessage: "No products found for search {search} in category {category}"
	},
	oneTimePrice: {
		id: "product-table-one-time-price",
		description: "Product table head column",
		defaultMessage: "Upfront"
	},
	productDetailsStockLevel: {
		id: "service-desk-product-details-stock-level",
		description: "Service desk select product stock level text",
		defaultMessage: "Stock level: "
	},
	productFound: {
		id: "service-desk-product-found",
		description: "Service desk products found",
		defaultMessage: "{productCount, number} {productCount, plural, \n		=0 {products found} one {product found} other {products found}}"
	},
	productSelectProduct: {
		id: "service-desk-product-details-select-product",
		description: "Service desk select product button label",
		defaultMessage: "Add to cart"
	},
	productTotalOneTimeFee: {
		id: "service-desk-product-details-total-one-time-fee",
		description: "Service desk total one-time fee price label",
		defaultMessage: "Total one time fee"
	},
	productTotalRecurringFee: {
		id: "service-desk-product-details-total-recurring-fee",
		description: "Service desk total recurring fee price label",
		defaultMessage: "Total recurring fee"
	},
	quantity: {
		id: "service-desk-product-table-details-availability-tab-quantity",
		description: "Service desk product table details availability tab quantity label",
		defaultMessage: "Quantity"
	},
	recurringPrice: {
		id: "product-table-recurring-price",
		description: "Product table head column",
		defaultMessage: "Recurring"
	},
	search: {
		id: "service-desk-producttable-search",
		description: "Service desk, product table search input label",
		defaultMessage: "Search from category"
	},
	searchLabel: {
		id: "service-desk-producttable-search-label",
		description: "Service desk, product table search input label",
		defaultMessage: "Search"
	},
	selectProduct: {
		id: "servicedesk-product-table-row-add-to-basket",
		description: "Select product button label",
		defaultMessage: "Select"
	},
	showFilters: {
		id: "service-desk-show-filters",
		description: "Show filters link text in service desk",
		defaultMessage: "Show filters"
	},
	stock: {
		id: "product-table-stock",
		description: "Product table head column",
		defaultMessage: "Stock"
	},
	subscriptionShopping: {
		id: "service-desk-phone-for-subscription-shopping",
		description: "Notification text about shopping for a phone for a subscription",
		defaultMessage: "Note: You are currently shopping for subscription {phoneNumber}"
	},
	subscriptionShoppingEnd: {
		id: "service-desk-phone-for-subscription-shopping-end",
		description: "Text for end phone shopping button",
		defaultMessage: "End"
	},
	thisProductAvailability: {
		id: "service-desk-product-table-details-availability-tab-description",
		description: "Service desk product table details availability tab description",
		defaultMessage: "This product availability in stores"
	},
	usagePrice: {
		id: "product-table-usage-price",
		description: "Product table head column",
		defaultMessage: "Usage"
	},
});

export default ProductTableMessages;
export { ProductTableMessages, ProductTableMessagesType };
