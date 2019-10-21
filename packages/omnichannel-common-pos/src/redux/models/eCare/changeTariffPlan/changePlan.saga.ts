"use strict";

import { delay } from "redux-saga";
import { all, call, put, select, takeEvery, race, take } from "redux-saga/effects";
import { changePlan, ChangePlanActionPayload, ChangePlanActions } from "./changePlan.actions";
import { AppState } from "../../../reducers";
import TraceUtil from "../../../../utils/TraceUtil";
import ContextualProductService from "../../../services/ContextualProductService";
import { CHANGE_PLAN_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY, CHANGE_PLAN_PURPOSE_CONSUL_KEY } from "../../feature/eCare/ECareChangePlanFeatureType";
import { loadingOverlay } from "../../loadingOverlay/loadingOverlay.actions";
import { AddonService } from "../../../services/index";
import { InitializeAddonConfig } from "../../../services/AddonService";
import { User } from "../../user/user.types";
import { InitializedAddon } from "../../basket/basket.types";
import BasketService from "../../../services/BasketService";
import actions, { DigitalLifeActions } from "../../../actions/index";
import ProductOfferingService from "../../../services/ProductOfferingService";
import { ProductOffering } from "../../../types/ProductOffering";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";

const CHANGE_PLAN_LOADING_KEY = "CHANGE_PLAN_LOADING_KEY";

export function* onProceedChangePlan(action: ChangePlanActionPayload) {
	const { redirectUrl } = action;
	if (!redirectUrl) {
		console.error("Wrong parameter, redirectUrl is not set");
		return;
	}
	const basketId = yield select((state: AppState) => state.changePlan.initializationResult && state.changePlan.initializationResult.basketId);
	if (!basketId) {
		console.error("Basket id for change plan basket submit is not set");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	try {
		yield call(BasketService.submit, basketId);

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
		yield put(actions.router.push(redirectUrl));
	} catch (e) {
		// cleanup after failing submit
		try {
			yield call(BasketService.delete, basketId);
		} catch (e) {}
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	}
	yield put(changePlan.hideChangePlanSummaryModal());
}
export function* onCancelChangePlan(action: ChangePlanActionPayload) {
	const basketId = yield select((state: AppState) => state.changePlan.initializationResult && state.changePlan.initializationResult.basketId);
	if (basketId) {
		try {
			yield call(BasketService.delete, basketId);
		} catch (e) {}
	}
	yield put(changePlan.hideChangePlanSummaryModal());
}
export function* onInitChangePlan(action: ChangePlanActionPayload) {
	const { redirectUrl, currentPlanProductOfferingId } = action;
	if (!redirectUrl) {
		console.error("Wrong parameter, redirectUrl is not set");
		return;
	}
	// TODO: remove if BSSApiAgreementsProvider.getAgreementsByCustomerAccountId will include child-product.allowances.commercial-enrichments
	// it is not implemented in backend now due to https://extranet-sd.qvantel.com/browse/RUBT-158488
	// remove also changePlan.setCurrentPlan action
	// this hack fetches allowance.commercial-enrichments for current plan product
	if (!currentPlanProductOfferingId) {
		console.error("Assertion error currentPlanProductOfferingId is not set");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	try {
		const productOffering: ProductOffering = yield call(ProductOfferingService.getProductOffering, currentPlanProductOfferingId);
		// we are requesting plan PO, but omni-back can return parent PO instead
		const currentPlan =
			productOffering.id !== currentPlanProductOfferingId
				? ProductOfferingUtil.getBundledProductOffering(productOffering, currentPlanProductOfferingId)
				: productOffering;
		if (!currentPlan) {
			console.error("Assertion error currentPlan PO request failed");
			return;
		}
		yield put(changePlan.setCurrentPlan(currentPlan));

		yield put(actions.router.push(redirectUrl));
	} catch (e) {
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	}
}
export function* onSelectNewPlan(action: ChangePlanActionPayload) {
	const { selectedPlan } = action;
	if (!selectedPlan) {
		console.error(`Wrong parameter, selectedPlan(${selectedPlan}) is not set`);
		return;
	}
	const agreementId: string | undefined = yield select((state: AppState) => state.changePlan.agreementId);
	if (!agreementId) {
		console.error("Assertion error, changePlan.agreementId is not set");
		return;
	}
	const user: User | undefined = yield select((state: AppState) => state.user.user);
	if (!user || !user.id) {
		console.error("Assertion error, user or user.id is not set");
		return;
	}
	yield put(loadingOverlay.showLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	try {
		const requestConfig: InitializeAddonConfig = {
			targetAgreementId: agreementId,
			personId: user.id,
			productId: selectedPlan.id,
		};
		const initializationResult: InitializedAddon = yield call(AddonService.initializeAddon, requestConfig);
		// const initializationResult: InitializedAddon = {
		// 	basketId: "b1",
		// 	paymentUseCase: "cPuC ok",
		// 	basketItems: [],
		// 	paymentMethods: [{ label: "blalance", id: "balance", balance: 100 }],
		// };

		yield put(changePlan.selectNewPlanComplete(initializationResult));
		yield put(changePlan.showChangePlanSummaryModal());
	} catch (e) {
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(CHANGE_PLAN_LOADING_KEY));
	}
}
export function* onGetAvailablePlanProductOfferings(action: ChangePlanActionPayload) {
	const { agreementId } = action;
	if (!agreementId) {
		console.error("Wrong parameter, agreementId is not set");
		return;
	}
	try {
		const changePlanPurpose: string | undefined = yield select((state: AppState): string | undefined => state.feature.eCare.changePlan.changePlanPurpose);
		const changePlanProductOfferingsCategoriesIds: string[] = yield select(
			(state: AppState): string[] => state.feature.eCare.changePlan.changePlanProductOfferingsCategoriesIds
		);

		if (!changePlanPurpose || changePlanProductOfferingsCategoriesIds.length === 0) {
			TraceUtil.logOnce(
				`Missing configuration for "Change Plan": ${CHANGE_PLAN_PURPOSE_CONSUL_KEY} or ${CHANGE_PLAN_PRODUCT_OFFERINGS_CATEGORIES_IDS_CONSUL_KEY}`
			);
			yield put(changePlan.getAvailablePlanProductOfferingsComplete(agreementId, []));
			return;
		}
		const availablePlans = yield call(
			ContextualProductService.getEligibleProductsForPurpose,
			changePlanPurpose,
			agreementId,
			changePlanProductOfferingsCategoriesIds
		);
		yield put(changePlan.getAvailablePlanProductOfferingsComplete(agreementId, availablePlans));
	} catch (e) {
		yield put(changePlan.getAvailablePlanProductOfferingsComplete(agreementId, []));
	}
}

export function* changePlanSaga(): Iterable<any> {
	yield all([
		takeEvery(ChangePlanActions.GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS, onGetAvailablePlanProductOfferings),
		takeEvery(ChangePlanActions.INIT_CHANGE_PLAN, onInitChangePlan),
		takeEvery(ChangePlanActions.SELECT_NEW_PLAN, onSelectNewPlan),
		takeEvery(ChangePlanActions.CANCEL_CHANGE_PLAN, onCancelChangePlan),
		takeEvery(ChangePlanActions.PROCEED_CHANGE_PLAN, onProceedChangePlan),
	]);
}
