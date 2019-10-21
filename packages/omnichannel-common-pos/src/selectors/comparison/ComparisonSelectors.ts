import { AppState, ProductOffering } from "../../redux";

const getProductInCurrentComparison = (state: AppState) => {
	return state.comparison.items && state.comparison.items.find(
		item => item.id === state.comparison.showConfigurationModalForProduct
	);
};

const isItemInComparison = (product: ProductOffering, itemsInComparison: ProductOffering[] | undefined): boolean => {
	return Boolean(product && itemsInComparison && itemsInComparison.find(po => po.id === product.id));
};

const isItemInComparisonStateSelector = (product: ProductOffering, state: AppState): boolean => {
	return isItemInComparison(product, state.comparison.items);
};

const ComparisonSelectors = {
	isItemInComparison,
	getProductInCurrentComparison,
	isItemInComparisonStateSelector
};

export default ComparisonSelectors;
