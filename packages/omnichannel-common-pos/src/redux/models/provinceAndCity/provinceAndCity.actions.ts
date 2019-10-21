
import { Action } from "redux";
import { City, Province } from "./provinceAndCity.types";

export enum ProvinceAndCityActions {

	GET_PROVINCE = "provinceAndCity_GET_PROVINCE",
	GET_PROVINCE_COMPLETE = "provinceAndCity_GET_PROVINCE_COMPLETE",
	GET_PROVINCE_FAILED = "provinceAndCity_GET_PROVINCE_FAILED",
	GET_CITIES_BY_PROVINCE_ID = "provinceAndCity_GET_CITIES_BY_PROVINCE_ID",
	GET_CITIES_BY_PROVINCE_ID_COMPLETE = "provinceAndCity_GET_CITIES_BY_PROVINCE_ID_COMPLETE",
	GET_CITIES_BY_PROVINCE_ID_FAILED = "provinceAndCity_GET_CITIES_BY_PROVINCE_ID_FAILED",
}

export interface ProvinceAndCityPayload extends Action<ProvinceAndCityActions> {

	cities?: Array<City>;
	provinces?: Array<Province>;
	provinceId: string;
	error?: {
		status: number;
		title: string;
		detail: string;
	};
}

export const provinceAndCity = {
	getProvince: () => ({ type: ProvinceAndCityActions.GET_PROVINCE }),
	getProvinceComplete: (provinces: Array<Province>) => ({ type: ProvinceAndCityActions.GET_PROVINCE_COMPLETE, provinces }),
	getProvinceFailed: (error: string) => ({ type: ProvinceAndCityActions.GET_PROVINCE_FAILED, error }),
	getCitiesByProvinceId: (provinceId: string) => ({ type: ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID, provinceId }),
	getCitiesByProvinceIdComplete: (cities: Array<City>) => ({ type: ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID_COMPLETE, cities }),
	getCitiesByProvinceIdFailed: (error: string) => ({ type: ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID_FAILED, error }),
};
