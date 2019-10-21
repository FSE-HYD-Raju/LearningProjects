"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { category, CategoryActionPayload, CategoryActions } from "./category.actions";
import CategoryService from "../../services/CategoryService";

function* onUpdateMainCategories(action: CategoryActionPayload) {
	try {
		const categories = yield call(() => {
			return CategoryService.fetchCategories();
		});

		yield put(category.updateMainCategoriesComplete(categories));

	} catch (e) {
		yield put(category.updateMainCategoriesComplete([]));
	}
}

export function* categorySaga(): Iterable<any> {
	yield all([
		takeLatest(CategoryActions.UPDATE_MAIN_CATEGORIES, onUpdateMainCategories),
	]);
}
