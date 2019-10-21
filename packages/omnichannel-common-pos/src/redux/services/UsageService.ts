"use strict";

import { AxiosResponse } from "axios";
import { REST } from "../settings/core";
import { Rest } from "./Rest";
import BaseService from "./BaseService";

export default class UsageService extends BaseService {

	static async getProductUsageCounters(productId: string, startDate: string, endDate: string): Promise<AxiosResponse<Array<any>>> {
		let resp;
		try {
			const data = `?filter[productId]=${productId}&filter[startDate]=${startDate}&filter[endDate]=${endDate}`;
			resp = await Rest.get(REST.USAGE.COUNTERS, data);
			this.validateResp(resp, "Fetching product usage counters returned an error");
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getAgreementUsageEvents(agreementId: string, startDate: string, endDate: string) {
		let resp;
		try {
			const data = `?filter[startDate]=${startDate}&filter[endDate]=${endDate}`;
			resp = await Rest.get(`${REST.AGREEMENTS}/${agreementId}/usageEvents`, data);
			this.validateResp(resp, "Fetching agreement usage events returned an error");
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

}
