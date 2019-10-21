"use strict";

import { CategoryActions, CategoryActionPayload } from "./category.actions";
import { CategoryState } from "./category.types";

const initialState = {
	mainCategories: []
};

const categoryReducer = (state: Partial<CategoryState> = initialState, action: CategoryActionPayload) => {
	const { type } = action;
	switch (type) {
		case CategoryActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case CategoryActions.UPDATE_MAIN_CATEGORIES_COMPLETE:
			return {...state, mainCategories: action.categories};
		case CategoryActions.SELECT_PRODUCT:
			return { ...state, selectedProductId: action.productId };
		case CategoryActions.SELECT_CATEGORY:
			return { ...state, selectedCategoryId: action.categoryId };
		case CategoryActions.SELECT_PRODUCT_DETAIL:
			return { ...state, selectedProductDetail: action.productDetail };
		case CategoryActions.SELECT_BUNDLE_PRODUCT:
			return { ...state, selectedBundleProductId: action.productId };
		default:
			return state;
	}
};

export default categoryReducer;

export { CategoryState };
