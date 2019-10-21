"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import PersonService from "../../../services/PersonService";
import ActivateSimService from "../../../services/ActivateSimService";
import { activateSim, ActivateSimActions, ActivateSimActionPayload } from "./activateSim.actions";
import { Order, OrderItem, SimIccVerification } from "../../../types";

class ActivateSimYields {
	static onGetInProgressOrders = function* (action: ActivateSimActionPayload) {
		try {
			const response: any = yield call(() => {
				return PersonService.getInProgressOrders(action.personId!);
			});

			const orders: Array<Order> = response.data;
			const includes: Array<any> = response.included;
			const orderItems: Array<OrderItem> = includes.filter(item => item.type === "orderItems");

			yield put(activateSim.getInProgressOrdersComplete({ orders, orderItems }));
		} catch (e) {
			yield put(activateSim.getInProgressOrdersFail());
		}
	};

	static onSimIccVerification = function* (action: ActivateSimActionPayload) {
		try {
			const response: SimIccVerification = yield call(() => {
				return ActivateSimService.simIccVerification(action.verificationPayload!);
			});

			yield put(activateSim.simIccVerificationComplete(response));
		} catch (e) {
			yield put(activateSim.simIccVerificationFail());
		}
	};
}

export function* activateSimSaga(): Iterable<any> {
	yield all([takeLatest(ActivateSimActions.GET_IN_PROGRESS_ORDERS, ActivateSimYields.onGetInProgressOrders)]);
	yield all([takeLatest(ActivateSimActions.SIM_ICC_VERIFICATION, ActivateSimYields.onSimIccVerification)]);
}
