"use strict";

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { suspension, SuspensionActions, SuspensionActionPayload } from "./suspension.actions";
import ContextualProductService from "../../../services/ContextualProductService";
import { ProductOffering } from "../../../types";
import BasketService from "../../../services/BasketService";
import { AppState } from "../../../reducers";

class SuspensionYields {
	static onGetSuspensionProductOfferings = function* (action: SuspensionActionPayload) {
		try {
			const categories = action.categoryId!.split(",");
			const purpose = yield select((state: AppState) => state.feature.suspensionConfiguration.purpose);
			const response: any = yield call(() => {
				return ContextualProductService.getEligibleProductsForPurpose(purpose, action.targetAgreementId!, categories);
			});

			yield put(suspension.getSuspensionProductOfferingsComplete(response));
		} catch (e) {
			yield put(suspension.getSuspensionProductOfferingsFail());
		}
	};

	static onDeleteBasket = function* (action: SuspensionActionPayload) {
		const { basketId } = action;
		if (!basketId) {
			console.error("BasketId is not set for suspension deleteBasket");
			return;
		}
		try {
			yield call(BasketService.delete, basketId);
		} catch (e) {}
	};
}

export function* suspensionSaga(): Iterable<any> {
	yield all([takeLatest(SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS, SuspensionYields.onGetSuspensionProductOfferings)]);
	yield all([takeLatest(SuspensionActions.DELETE_BASKET, SuspensionYields.onDeleteBasket)]);
}
