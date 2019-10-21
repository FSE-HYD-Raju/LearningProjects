/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CategoryListMessagesType {
	selectCategory: FormattedMessage.MessageDescriptor;
	shop: FormattedMessage.MessageDescriptor;
}
const CategoryListMessages: CategoryListMessagesType = defineMessages({
	selectCategory: {
		id: "CategoryList-select-a-category",
		description: "Shown when user has not clicked on a category yet",
		defaultMessage: "Select a category"
	},
	shop: {
		id: "service-desk-shop-page-title",
		description: "Shop page title",
		defaultMessage: "Shop"
	},
});

export default CategoryListMessages;
export { CategoryListMessages, CategoryListMessagesType };
