"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import {
	customerInteractions,
	CustomerInteractionsActionPayload,
	CustomerInteractionsActions
} from "./customerInteractions.actions";
import PersonService from "../../services/PersonService";

function* onGetCustomerInteractions(action: CustomerInteractionsActionPayload) {
	try {
		const customerInteractionsResult = yield call(() => {
			return PersonService.getCustomerInteractions(action.filterArgs);
		});
		if (customerInteractionsResult) {
			customerInteractionsResult.reverse();
		}
		yield put(customerInteractions.getCustomerInteractionsComplete(customerInteractionsResult));
	} catch (e) {
		yield put(customerInteractions.getCustomerInteractionsFail(e));
	}
}

export function* customerInteractionsSaga(): Iterable<any> {
	yield all([takeLatest(CustomerInteractionsActions.GET_CUSTOMER_INTERACTIONS, onGetCustomerInteractions)]);
}
