"use strict";

import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { AppState } from "../../reducers";
import { WorkforceService } from "../../services";
import { WorkforceAppointment } from "../../types";
import { workforce, WorkforceActionPayload, WorkforceActions } from "./workforce.actions";
import { getValueByKeyFromAddress } from "../../utils";

function* onGetAvailability(action: WorkforceActionPayload) {
	try {
		const { productOfferingId } = action;
		const { cityValue, countyValue, workOrderType = "Installation" } = yield select((state: AppState) => {
			const { address = {} } = state.location.addressValidation || {};
			const installationTimeslotConfiguration = state.feature.installationTimeslotConfiguration || {};

			const countyKey = installationTimeslotConfiguration.countyField || "county";
			const cityKey = installationTimeslotConfiguration.cityField || "city";

			const countyValueBasedonConsul = address && getValueByKeyFromAddress(address, countyKey);
			const cityValueBasedonConsul = address && getValueByKeyFromAddress(address, cityKey);

			return {
				...address,
				countyValue: countyValueBasedonConsul,
				cityValue: cityValueBasedonConsul,
				...installationTimeslotConfiguration,
			};
		});
		const workforceAppointments: WorkforceAppointment[] =
			yield call(() => WorkforceService.getAvailability(productOfferingId!, cityValue, countyValue, workOrderType));
		yield put(workforce.getAvailabilityComplete(workforceAppointments));
	} catch (e) {
		yield put(workforce.getAvailabilityFail());
	}
}

export function* workforceSaga(): Iterable<any> {
	yield all([
		takeLatest(WorkforceActions.GET_AVAILABILITY, onGetAvailability)
	]);
}
