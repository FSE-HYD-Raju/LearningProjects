"use strict";

import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { productOfferings, ProductOfferingsActionPayload, ProductOfferingsActions } from "./productOfferings.actions";
import ProductOfferingService from "../../services/ProductOfferingService";
import { ProductOffering } from "../../types";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";

function* getProductOffering(action: ProductOfferingsActionPayload) {
	const productOfferingId = action.productOfferingId;

	try {
		const response: ProductOffering = yield call(() => {
			return ProductOfferingService.getProductOffering(productOfferingId);
		});
		yield put(productOfferings.getProductOfferingComplete(productOfferingId, response));
	} catch (e) {
		yield put(productOfferings.getProductOfferingFailed(productOfferingId));
	}
}

function* getProductOfferingWithLoader(action: ProductOfferingsActionPayload) {
	const productOfferingId = action.productOfferingId;
	yield put(loadingOverlay.showLoadingOverlay("productOfferingLoading"));
	try {
		const response: ProductOffering = yield call(() => {
			return ProductOfferingService.getProductOffering(productOfferingId);
		});
		yield put(productOfferings.getProductOfferingComplete(productOfferingId, response));
	} catch (e) {
		yield put(productOfferings.getProductOfferingFailed(productOfferingId));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay("productOfferingLoading"));
	}
}

function* getOptionalProductOfferings(action: ProductOfferingsActionPayload) {
	const productOfferingId = action.productOfferingId;
	try {
		const response: Array<ProductOffering> = yield call(() => {
			return ProductOfferingService.getOptionalProductOfferings(productOfferingId);
		});
		yield put(productOfferings.getOptionalProductOfferingsComplete(productOfferingId, response));
	} catch (e) {
		yield put(productOfferings.getOptionalProductOfferingsFailed(productOfferingId));
	}
}

export function* productOfferingsSaga(): any {
	yield all([
		takeEvery(ProductOfferingsActions.GET_PRODUCT_OFFERING, getProductOffering),
		takeEvery(ProductOfferingsActions.GET_PRODUCT_OFFERING_WITH_LOADER, getProductOfferingWithLoader),
		takeEvery(ProductOfferingsActions.GET_OPTIONAL_OFFERINGS, getOptionalProductOfferings)
	]);
}
