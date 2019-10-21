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
import { service, ServiceActionPayload, ServiceActions } from "./service.actions";
import ServiceModificationService from "../../services/ServiceModificationService";
import { CallForwardingServiceModify } from "../../types";

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
	const targetAgreementId = action.targetAgreementId as string;
	const categoryIds: Array<string> = yield select((state: AppState): Array<string> => state.sales.addonsCategoryIds || []);

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

function* submitCallForwardingConfiguration(action: ServiceActionPayload) {
	try {
		const callForwardingModify: CallForwardingServiceModify = yield call(() => {
			return ServiceModificationService.submitCallForwardingConfiguration(action.configuration!, action.individualId!, action.agreementId!);
		});

		yield put(service.submitCallForwardingConfigurationCompleted(callForwardingModify));
	} catch (e) {
		yield put(service.submitCallForwardingConfigurationError(e));
	}
}

export function* serviceSaga(): Iterable<any> {
	yield all([
		takeLatest(ServiceActions.SUBMIT_CF_CONFIGURATION, submitCallForwardingConfiguration),
	]);
}
