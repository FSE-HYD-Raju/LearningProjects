"use strict";

import { all, call, put, takeLatest, take } from "redux-saga/effects";

import { support, SupportActions, SupportActionPayload } from "./support.actions";
import { GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY } from "../customerCase/customerCase.types";
import CasesService from "../../services/CasesService";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";

function* getCustomerCases(action: SupportActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY));
	try {
		const userId = action.userId as string;
		const cases = yield call(() => CasesService.getCustomerCases(userId));
		yield put(support.getCustomerCasesComplete(cases));
	} catch (e) {
		yield put(support.getCustomerCasesFail(e));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY));
	}
}

function* postCustomerCase(action: SupportActionPayload) {
	yield put(loadingOverlay.showLoadingOverlay(GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY));
	try {
		const createCustomerCasePayload = action.customerCase;
		if (!createCustomerCasePayload) {
			console.error("Support case is not provided for creation");
			return;
		}

		const data = yield call(() => {
			return CasesService.addCustomerCase(createCustomerCasePayload);
		});
		yield put(support.getCustomerCases(createCustomerCasePayload.actorId));
	} catch (e) {
		yield put(support.postCustomerCaseFail(e));
	} finally {
		yield put(loadingOverlay.hideLoadingOverlay(GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY));
	}
}

export function* supportSaga(): any {
	yield all([
		takeLatest(SupportActions.GET_CUSTOMER_CASES, getCustomerCases),
		takeLatest(SupportActions.POST_CUSTOMER_CASE, postCustomerCase)
	]);
}
