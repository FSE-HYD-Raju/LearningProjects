"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { provinceAndCity, ProvinceAndCityActions, ProvinceAndCityPayload } from "./provinceAndCity.actions";
import { City, Province } from "./provinceAndCity.types";
import ProvinceAndCityService from "../../services/ProvinceAndCityService";

function* getProvince() {
	try {
		const response: Array<Province> = yield call(() => {
			return ProvinceAndCityService.getProvince();
		});
		yield put(provinceAndCity.getProvinceComplete(response));
	} catch (e) {
		yield put(provinceAndCity.getProvinceFailed(e));
	}
}

function* getCitiesByProvinceId(action: ProvinceAndCityPayload) {
	const provinceId = action.provinceId;
	try {
		const response: Array<City> = yield call(() => {
			return ProvinceAndCityService.getCitiesByProvinceId(provinceId);
		});
		yield put(provinceAndCity.getCitiesByProvinceIdComplete(response));
	} catch (e) {
		yield put(provinceAndCity.getCitiesByProvinceIdFailed(e));
	}
}

export function* provinceAndCitySaga(): any {
	yield all([
		takeLatest(ProvinceAndCityActions.GET_PROVINCE, getProvince),
		takeLatest(ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID, getCitiesByProvinceId),
	]);
}
