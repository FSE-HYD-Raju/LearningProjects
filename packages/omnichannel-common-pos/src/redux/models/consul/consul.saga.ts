"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { consul, ConsulActions, ConsulActionPayload } from "./consul.actions";
import {
	cms,
	digitalLife,
	productOfferingConfiguration,
	auth,
	currency,
	feature,
	lifecycle,
	location,
	navBar,
	sales,
	salesRepSession,
	schema,
	service,
	payment,
	comparison,
	base,
	posCheckout,
} from "../../actions";

import ConsulService from "../../services/ConsulService";

function* getValues(action: ConsulActionPayload) {
	try {
		const response = yield call(() => {
			return ConsulService.getValues();
		});
		yield all([
			put(cms.getStyles(response)),
			put(digitalLife.setValues(response)),
			put(productOfferingConfiguration.setValues(response)),
			put(currency.setValues(response)),
			put(feature.setValues(response)),
			put(lifecycle.setValues(response)),
			put(location.setValues(response)),
			put(navBar.setValues(response)),
			put(sales.setValues(response)),
			put(salesRepSession.setValues(response)),
			put(schema.setValues(response)),
			put(service.setValues(response)),
			put(auth.setValues(response)),
			put(comparison.setValues(response)),
			put(payment.setValues(response)),
			put(base.setValuesCustomization(response)),
			put(posCheckout.setValues(response)),
		]);

		yield put(consul.getValuesComplete(response));
		yield put(consul.initLocale());
	} catch (e) {
		yield put(consul.getValuesFailed(e));
	}
}

function* getServiceLocations(action: ConsulActionPayload) {
	try {
		const response = yield call(() => {
			return ConsulService.getServiceLocations();
		});
		yield put(consul.getServiceLocationsComplete(response));

	} catch (e) {
		yield put(consul.getServiceLocationsFailed(e));
	}
}

export function* consulSaga(): any {
	yield all([
		takeLatest(ConsulActions.GET_VALUES, getValues),
		takeLatest(ConsulActions.GET_SERVICE_LOCATIONS, getServiceLocations)
	]);
}
