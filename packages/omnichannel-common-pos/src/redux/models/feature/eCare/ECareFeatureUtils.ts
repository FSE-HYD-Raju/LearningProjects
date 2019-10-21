import { BasketItemAttributes, OrderItemAttributes } from "../../../types";
import { AppState } from "../../../reducers";

function getIconClassForBasketItem(attributes: BasketItemAttributes, state: AppState): string | undefined {
	if (!attributes || !attributes.product || !attributes.product.categories) {
		return undefined;
	}
	return getIconClassForCategories(attributes.product.categories,
		state.feature.eCare.basketItemsIconsByCategoriesIds);
}

function getIconClassForOrderItem(attributes: OrderItemAttributes, state: AppState): string | undefined {
	if (!attributes || !attributes.productOffering || !attributes.productOffering.categories) {
		return undefined;
	}
	return getIconClassForCategories(attributes.productOffering.categories,
		state.feature.eCare.basketItemsIconsByCategoriesIds);
}

function getIconClassForCategories(categories: Array<string>, iconCategoriesIdsMap: Record<string, Array<string>>): string | undefined {
	return Object.keys(iconCategoriesIdsMap).find((icon: string) => {
		const iconCategoriesIds: Array<string> = iconCategoriesIdsMap[icon];
		return categories.some((category: string) => iconCategoriesIds.includes(category));
	});
}

export {
	getIconClassForBasketItem,
	getIconClassForOrderItem,
};
