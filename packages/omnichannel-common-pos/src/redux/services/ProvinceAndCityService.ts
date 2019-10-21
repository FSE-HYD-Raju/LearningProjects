
import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import { City, Province } from "../models/provinceAndCity/provinceAndCity.types";

export default class ProvinceAndCityService extends BaseService {

	static async getProvince(): Promise<AxiosResponse<Array<Province>>> {
		let response;
		try {
			response = await Rest.get(REST.PROVINCE_AND_CITY.PROVINCE);
			ProvinceAndCityService.validateResp(response);
		} catch (e) {
			throw e;
		}
		return response;
	}

	static async getCitiesByProvinceId(provinceId: string): Promise<AxiosResponse<Array<City>>> {
		let response;
		try {
			response = await Rest.get(`${REST.PROVINCE_AND_CITY.CITIES}?stateOrProvince=${provinceId}`);
			ProvinceAndCityService.validateResp(response);
		} catch (e) {
			throw e;
		}
		return response;
	}
}
