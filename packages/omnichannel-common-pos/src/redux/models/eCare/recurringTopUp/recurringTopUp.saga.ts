"use strict";

import { delay } from "redux-saga";
import { all, call, put, race, select, take, takeEvery } from "redux-saga/effects";
import { recurringTopUp, RecurringTopUpActionPayload, RecurringTopUpActions } from "./recurringTopUp.actions";
import { loadingOverlay } from "../../loadingOverlay/loadingOverlay.actions";
import { AppState } from "../../../reducers";
import TraceUtil from "../../../../utils/TraceUtil";
import {
	NEW_TOP_UP_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY,
	NEW_TOP_UP_PRODUCT_OFFERINGS_PURPOSE_CONSUL_KEY,
} from "../../feature/eCare/ECareFeatureParser";
import ContextualProductService from "../../../services/ContextualProductService";
import { AddonService, InitializeAddonConfig } from "../../../services";
import BasketService from "../../../services/BasketService";
import actions, { DigitalLifeActions } from "../../../actions";
import { RecurringTopUpSelector } from "./recurringTopUp.selectors";
import { InitializedAddon, User } from "../../..";
import ProductsTerminateService from "../../../services/ProductsTerminateService";

const GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY: string = "GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY";

export function* onRemoveTopUp(action: RecurringTopUpActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	try {
		const { productId } = action;
		if (!productId) {
			console.error("Missing productId on remove recurring top-up");
			return;
		}
		yield call(ProductsTerminateService.terminateProduct, productId);
		yield put(recurringTopUp.submitTopUpComplete());

		const delayAfterBasketSubmission: number = yield select((state: AppState) => state.feature.delayAfterBasketSubmission);
		yield delay(delayAfterBasketSubmission);
		const user: User | undefined = yield select((state: AppState) => state.user.user);
		if (user) {
			yield put(actions.digitalLife.getAgreements(user));
			yield race({
				complete: take(DigitalLifeActions.GET_AGREEMENTS_COMPLETE),
				fail: take(DigitalLifeActions.GET_AGREEMENTS_FAIL),
			});
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	}
}
export function* onSubmitNewTopUp(action: RecurringTopUpActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	try {
		const { model } = action;
		if (!model) {
			console.error("Missing model  on recurring top-up submit");
			return;
		}
		const initializeRequest: InitializeAddonConfig = yield select((state: AppState) => RecurringTopUpSelector.getAddRecurringTopUpRequest(state, model));
		if (!initializeRequest) {
			console.error("Cannot prepare data for adding recurring top-up");
			return;
		}
		const initializationResult: InitializedAddon = yield call(AddonService.initializeAddon, initializeRequest);
		yield call(BasketService.submit, initializationResult.basketId);
		yield put(recurringTopUp.submitTopUpComplete());

		const delayAfterBasketSubmission: number = yield select((state: AppState) => state.feature.delayAfterBasketSubmission);
		yield delay(delayAfterBasketSubmission);
		const user: User | undefined = yield select((state: AppState) => state.user.user);
		if (user) {
			yield put(actions.digitalLife.getAgreements(user));
			yield race({
				complete: take(DigitalLifeActions.GET_AGREEMENTS_COMPLETE),
				fail: take(DigitalLifeActions.GET_AGREEMENTS_FAIL),
			});
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	}
}
export function* onSubmitExistingTopUp(action: RecurringTopUpActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	try {
		const { model } = action;
		if (!model) {
			console.error("Missing model on recurring top-up submit");
			return;
		}
		if (!model.productId) {
			console.error("Cannot edit recurring top-up, productId is missed in model");
			return;
		}
		const initializeRequest: InitializeAddonConfig = yield select((state: AppState) => RecurringTopUpSelector.getAddRecurringTopUpRequest(state, model));
		if (!initializeRequest) {
			console.error("Cannot prepare data for adding recurring top-up");
			return;
		}
		yield call(ProductsTerminateService.terminateProduct, model.productId);
		const initializationResult: InitializedAddon = yield call(AddonService.initializeAddon, initializeRequest);
		yield call(BasketService.submit, initializationResult.basketId);
		yield put(recurringTopUp.submitTopUpComplete());

		const delayAfterBasketSubmission: number = yield select((state: AppState) => state.feature.delayAfterBasketSubmission);
		yield delay(delayAfterBasketSubmission);
		const user: User | undefined = yield select((state: AppState) => state.user.user);
		if (user) {
			yield put(actions.digitalLife.getAgreements(user));
			yield race({
				complete: take(DigitalLifeActions.GET_AGREEMENTS_COMPLETE),
				fail: take(DigitalLifeActions.GET_AGREEMENTS_FAIL),
			});
		}
	} catch (e) {
		console.error(e);
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	}
}
export function* onGetNewTopUpProductOfferings(action: RecurringTopUpActionPayload) {
	const { agreementId } = action;
	if (!agreementId) {
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	try {
		const newTopUpProductOfferingsPurpose: string | undefined = yield select(
			(state: AppState): string | undefined => state.feature.eCare.recurringTopUp.newTopUpProductOfferingsPurpose
		);
		const newTopUpProductOfferingsCategoriesIds: string[] = yield select(
			(state: AppState): string[] => state.feature.eCare.recurringTopUp.newTopUpProductOfferingsCategoriesIds
		);

		if (!newTopUpProductOfferingsPurpose || newTopUpProductOfferingsCategoriesIds.length === 0) {
			TraceUtil.logOnce(
				`Missing configuration: ${NEW_TOP_UP_PRODUCT_OFFERINGS_PURPOSE_CONSUL_KEY} or ${NEW_TOP_UP_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY}`
			);
			yield put(recurringTopUp.getNewTopUpProductOfferingsComplete(agreementId, []));
			return;
		}
		const newRecurringTopUpProductOfferings = yield call(
			ContextualProductService.getEligibleProductsForPurpose,
			newTopUpProductOfferingsPurpose,
			agreementId,
			newTopUpProductOfferingsCategoriesIds
		);
		yield put(recurringTopUp.getNewTopUpProductOfferingsComplete(agreementId, newRecurringTopUpProductOfferings));
	} catch (e) {
		yield put(recurringTopUp.getNewTopUpProductOfferingsComplete(agreementId, []));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_NEW_TOP_UP_PRODUCT_OFFERINGS_LOADING_KEY));
	}
}

export function* recurringTopUpSaga(): Iterable<any> {
	yield all([
		takeEvery(RecurringTopUpActions.GET_NEW_TOP_UP_PRODUCT_OFFERINGS, onGetNewTopUpProductOfferings),
		takeEvery(RecurringTopUpActions.SUBMIT_NEW_TOP_UP, onSubmitNewTopUp),
		takeEvery(RecurringTopUpActions.SUBMIT_EXISTING_TOP_UP, onSubmitExistingTopUp),
		takeEvery(RecurringTopUpActions.REMOVE_TOP_UP, onRemoveTopUp),
	]);
}
