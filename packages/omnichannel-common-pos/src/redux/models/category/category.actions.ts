"use strict";

import { Action } from "redux";
import { Category } from "../../types";

export enum CategoryActions {
	FLUX_SYNC = "Category_FLUX_SYNC",
	UPDATE_MAIN_CATEGORIES = "Category_UPDATE_MAIN_CATEGORIES",
	SELECT_BUNDLE_PRODUCT = "Category_SELECT_BUNDLE_PRODUCT",
	SELECT_PRODUCT = "Category_SELECT_SELECT_PRODUCT",
	SELECT_CATEGORY = "Category_SELECT_SELECT_CATEGORY",
	SELECT_PRODUCT_DETAIL = "Category_SELECT_PRODUCT_DETAIL",
	UPDATE_MAIN_CATEGORIES_COMPLETE = "Category_UPDATE_MAIN_CATEGORIES_COMPLETE",
}

export interface CategoryActionPayload extends Action<CategoryActions> {
	fluxState?: any;
	error?: string;
	categories?: Array<Category>;
	productDetail?: string | null;
	productId?: string | undefined;
	categoryId?: string | undefined;
}

export const category = {
	fluxSync: (fluxState: any) => ({type: CategoryActions.FLUX_SYNC, fluxState}),
	updateMainCategories: () => ({type: CategoryActions.UPDATE_MAIN_CATEGORIES}),
	updateMainCategoriesComplete: (categories: Array<Category>) => ({
		type: CategoryActions.UPDATE_MAIN_CATEGORIES_COMPLETE,
		categories
	}),
	selectBundleProductById: (productId?: string) => ({
		type: CategoryActions.SELECT_BUNDLE_PRODUCT,
		productId
	}),
	selectProductById: (productId?: string) => ({
		type: CategoryActions.SELECT_PRODUCT,
		productId
	}),
	selectCategoryById: (categoryId?: string) => ({
		type: CategoryActions.SELECT_CATEGORY,
		categoryId
	}),
	selectProductDetail: (productDetail?: string) => ({
		type: CategoryActions.SELECT_PRODUCT_DETAIL,
		productDetail
	})
};
