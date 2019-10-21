import { Category } from "../../types";

type CategoryState = {
	selectedCategoryId?: string;
	selectedProductId?: string;
	selectedProductDetail?: string;
	selectedBundleProductId?: string;
	mainCategories: Array<Category>;
};

export {
	CategoryState,
};
