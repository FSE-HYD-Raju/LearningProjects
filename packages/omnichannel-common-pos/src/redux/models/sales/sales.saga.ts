"use strict";

import { AppState } from "../../reducers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import LocationService from "../../services/LocationService";
import ProductOfferingService from "../../services/ProductOfferingService";
import ContextualProductService from "../../services/ContextualProductService";
import { sales, SalesActions, SalesActionPayload } from "../sales/sales.actions";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";
import { mapDomainContextKeys } from "../feature/feature.utils";
import { DomainContext } from "../../types/DomainContext";

function* getProductsFromCategory(action: SalesActionPayload) {
	const categoryId = action.categoryId as string;
	const targetAgreementId = action.targetAgreementId as string;
	const activeInventory = action.activeInventory as any;

	const domainContext = yield select((state: AppState): DomainContext | undefined =>
		state.feature.enableDomainContextMapping
			? mapDomainContextKeys(state)
			: undefined
	);

	try {
		loadingOverlay.showLoadingOverlay(SalesActions.GET_PRODUCTS_FROM_CATEGORY);

		const response = yield call(() =>
			ContextualProductService.getProductsFromCategory(
				categoryId,
				targetAgreementId,
				activeInventory,
				domainContext
			)
		);
		yield put(sales.getProductsFromCategoryComplete(
			response.products,
			response.filters,
			categoryId
		));
	} catch (e) {
		yield put(sales.getProductsFromCategoryFailed(e));
	} finally {
		loadingOverlay.hideLoadingOverlay(SalesActions.GET_PRODUCTS_FROM_CATEGORY);
	}
}

function* getAvailableAddonProducts(action: SalesActionPayload) {
	const {targetAgreementId} = action;
	if (!targetAgreementId) {
		console.error("sales.getAvailableAddonProducts targetAgreementId is not set in action");
		return;
	}
	const categoryIds: Array<string> = yield select((state: AppState): Array<string> => state.sales.addonsCategoryIds || []);

	if (categoryIds.length > 0) {
		try {
			const response = yield call(() =>
				ContextualProductService.getProductsFromCategory(
					categoryIds.join(","),
					targetAgreementId
				)
			);
			yield put(sales.getAvailableAddonProductsComplete(
				response.products
			));
		} catch (e) {
			yield put(sales.getAvailableAddonProductsFailed(e));
		}
	}
}

function* getAvailablePlans(action: SalesActionPayload) {
	const categoryId = yield select((state: AppState): string|undefined => state.sales.plansCategoryId);

	try {
		const response = yield call(() =>
			ContextualProductService.getProductsFromCategory(
				categoryId
			)
		);
		yield put(sales.getAvailablePlansComplete(
			response.products
		));
	} catch (e) {
		yield put(sales.getAvailablePlansFailed(e));
	}
}

function* onQueryProductsViaStreetAddress(action: SalesActionPayload) {
	try {
		const proposalAddressRegistryId = action.proposalAddressRegistryId as string;
		const additionalCategory = action.additionalCategory as string;
		const availabilities = yield call(() => {
			return LocationService.availabilitiesByAddressId(proposalAddressRegistryId);
		});

		if (availabilities && additionalCategory) {
			availabilities.push(additionalCategory);

			const products = yield call(() => {
				return ProductOfferingService.getProductOfferings(availabilities);
			});

			yield put(sales.queryProductOfferingsViaAddressRegistryIdComplete(products));
		}

	} catch (e) {
		yield put(sales.queryProductOfferingsViaAddressRegistryIdFailed(e));
	}
}

export function* salesSaga(): Iterable<any> {
	yield all([
		takeLatest(SalesActions.GET_PRODUCTS_FROM_CATEGORY, getProductsFromCategory),
		takeLatest(SalesActions.GET_AVAILABLE_ADDON_PRODUCTS, getAvailableAddonProducts),
		takeLatest(SalesActions.GET_AVAILABLE_PLANS, getAvailablePlans),
		takeLatest(SalesActions.QUERY_PRODUCTS_VIA_ADDRESS_ID, onQueryProductsViaStreetAddress),
	]);
}
