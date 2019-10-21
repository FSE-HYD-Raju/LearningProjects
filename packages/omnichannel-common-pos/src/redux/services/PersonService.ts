"use strict";

import { AxiosResponse } from "axios";
import BaseService from "./BaseService";
import { Rest, QueryParams } from "./Rest";
import { Basket, BasketLifecycleStatusEnum, PersonsOrderData } from "../types";
import { REST } from "../settings/core";

import { PersonsResponse } from "../types";

export default class PersonService extends BaseService {
	static async getPersons(personId: string, includeFields?: Array<string>): Promise<AxiosResponse<PersonsResponse>> {
		let resp;
		const include = includeFields ? includeFields.join("") : "agreements,relatedPersons,customerAccount";
		try {
			resp = await Rest.get(`${REST.PERSONS}/${personId}`, include && { include });
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		resp.included = resp.included || [];
		return resp;
	}

	/**
	 * @param {string} personId
	 * @param {string} filterArgs = filter[onlyBaseProducts]=true
	 */
	static async getAgreements(personId: string, filterArgs?: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.PERSONS}/${personId}/agreements`, filterArgs);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getAgreementById(agreementId: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.AGREEMENTS}/${agreementId}`);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}

		return resp.data;
	}

	/**
	 * @param {string} filterArgs = filter[onlyBaseProducts]=true
	 */
	// this call returns customer interactions by login user
	static async getCustomerInteractions(filterArgs?: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.CUSTOMER_INTERACTIONS}`);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getTransactions(personId: string, startDate: string, endDate: string) {
		let resp;
		try {
			const data = `?filter[startDate]=${startDate}&filter[endDate]=${endDate}`;
			resp = await Rest.get(`${REST.PERSONS}/${personId}/transactionEvents`, data);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async getPersonOrders(personId: string, queryParams?: QueryParams): Promise<AxiosResponse<any>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.PERSONS}/${personId}/orders`, queryParams);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async getInProgressOrders(personId: string): Promise<AxiosResponse<any>> {
		return PersonService.getPersonOrders(personId, {
			include: "orderItems,orderDetails",
			["filter[status]"]: BasketLifecycleStatusEnum.IN_PROGRESS
		});
	}
	static getBasketsQueryParams(
		statuses: Array<BasketLifecycleStatusEnum> = [BasketLifecycleStatusEnum.OPEN, BasketLifecycleStatusEnum.COMMITTED],
		includeBasketItems: boolean = false,
		queryParams?: QueryParams
	): QueryParams {
		const combinedQueryParams: QueryParams = {
			["filter[bssSecondaryFilter][bssBasket][lifecycle-status]"]: statuses.map(status => status.toLowerCase()).join(","),
			...queryParams
		};
		if (includeBasketItems) {
			combinedQueryParams["filter[baskets][basketItems][id][LIKE]"] = "%";
			combinedQueryParams["include[baskets]"] = "basketItems";
		}
		return combinedQueryParams;
	}
	static async getBaskets(
		personId: string,
		statuses: Array<BasketLifecycleStatusEnum> = [BasketLifecycleStatusEnum.OPEN, BasketLifecycleStatusEnum.COMMITTED],
		includeBasketItems: boolean = false,
		queryParams?: QueryParams
	): Promise<AxiosResponse<any>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.PERSONS}/${personId}/baskets`, PersonService.getBasketsQueryParams(statuses, includeBasketItems, queryParams));
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}
}
