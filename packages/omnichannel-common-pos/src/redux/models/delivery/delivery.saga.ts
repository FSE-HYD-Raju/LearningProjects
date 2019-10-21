"use strict";

import { all, call, put, takeEvery } from "redux-saga/effects";
import { delivery, DeliveryActionPayload, DeliveryActions } from "./delivery.actions";
import { DeliveryService } from "../../services";
import { error } from "../error/error.actions";

function* onGetShippingMethodForPO(action: DeliveryActionPayload) {
	const { poId } = action;
	if (!poId) {
		return;
	}
	try {
		const deliveryResult = yield call(() => {
			return DeliveryService.getShippingMethodsForPO(poId);
		});
		if (deliveryResult) {
			deliveryResult.reverse();
		}
		yield put(delivery.getShippingMethodsForPOComplete(poId, deliveryResult));
	} catch (e) {
		yield put(delivery.getShippingMethodsForPOFail(poId, e));
	}
}

function* onGetShippingMethodForBasket(action: DeliveryActionPayload) {
	const { basketId, postalCode } = action;
	if (!basketId || !postalCode) {
		return;
	}
	try {
		const deliveryResult = yield call(() => {
			return DeliveryService.getShippingMethodsForBasket(basketId, postalCode);
		});
		yield put(delivery.getShippingMethodsForBasketComplete(basketId, deliveryResult));
	} catch (e) {
		yield put(delivery.getShippingMethodsForBasketFail(basketId, e.detail));
	}
}

export function* deliverySaga(): Iterable<any> {
	yield all([
		takeEvery(DeliveryActions.GET_SHIPPING_METHODS_FOR_PO, onGetShippingMethodForPO),
		takeEvery(DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET, onGetShippingMethodForBasket),
	]);
}
