"use strict";

import { all, call, put, takeEvery } from "redux-saga/effects";
import { portIn, PortInActionPayload, PortInActions } from "./portIn.actions";
import { error } from "../error/error.actions";
import PortInService from "../../services/PortInService";
import { EligibilityDecision } from "../../types";

function* getPortInDecision(action: PortInActionPayload) {
	const { msisdn } = action;
	try {
		const response: string = yield call(() => {
			return PortInService.getPortInDecision(msisdn);
		});
		yield put(portIn.getPortInDecisionComplete(msisdn, response));
	} catch (e) {
		yield put(portIn.getPortInDecisionFailed(msisdn, e.detail));
	}
}

function* checkMsisdnPortInValidity(action: PortInActionPayload) {
	const { msisdn } = action;
	try {
		const response: EligibilityDecision = yield call(() => PortInService.checkMsisdnPortInValidity(msisdn));
		yield put(portIn.checkMsisdnPortInValidityComplete(msisdn, response));
	} catch (e) {
		yield put(portIn.checkMsisdnPortInValidityFailed(msisdn, e));
	}
}

export function* portInSaga(): any {
	yield all([
		takeEvery(PortInActions.GET_PORTIN_NIP, getPortInDecision),
		takeEvery(PortInActions.CHECK_MSISDN_PORTIN_VALIDITY, checkMsisdnPortInValidity),
	]);
}
