import { get, isEmpty } from "lodash";
import { ProductOffering } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { DomainContext } from "../types/DomainContext";
import { transformDomainContextToKeyValueList } from "../models/feature/feature.utils";
import BaseService from "./BaseService";

import { HttpHeaders } from "../services/Rest";

export default class ContextualProductService extends BaseService {
	static async getProductsFromCategory(
		categoryId: string,
		targetAgreementId?: string,
		activeInventory?: object | string,
		domainContext?: DomainContext
	): Promise<{ products: ProductOffering[]; filters: object[] }> {
		const headers: HttpHeaders = {
			"X-Entry-Point": categoryId
		};

		if (domainContext && !isEmpty(domainContext)) {
			headers["X-Domain-Context"] = transformDomainContextToKeyValueList(domainContext);
		}

		const activeInventoryPlaceId = typeof activeInventory === "object" ? get(activeInventory, "attributes.place-id", undefined) : activeInventory;

		const params: any = {};
		if (activeInventoryPlaceId) {
			params["filter[inventoryId]"] = activeInventoryPlaceId;
		}
		if (targetAgreementId) {
			params["filter[agreementId]"] = targetAgreementId;
		}

		const response = await Rest.get(REST.CONTEXTUAL_PRODUCTS.GET_PRODUCTS, params, headers);
		ContextualProductService.validateResp(response);

		return {
			products: response.data,
			filters: get(response, "meta.filters", []),
		};
	}

	static getEligibleRecurringTopUpProductsHeaders(categoriesIds: string[]) {
		return  { "X-Include-Internal-Characteristics" : "true", "X-Entry-Point": categoriesIds.join(",")};
	}

	static async getAvailableAddonProducts(agreementId: string, categoryId?: string): Promise<ProductOffering> {
		const resp = await Rest.get(
			`${REST.CONTEXTUAL_PRODUCTS.GET_PRODUCTS}?filter[agreementId]=${agreementId}`,
			"",
			categoryId ? { "X-Entry-Point": categoryId } : undefined
		);
		ContextualProductService.validateResp(resp);
		return resp.data;
	}

	static async getEligibleProductsForPurpose(purpose: string, agreementId: string, categoriesIds: string[]): Promise<ProductOffering> {
		const params = {
			["filter[agreementId]"]: agreementId,
			["filter[purpose]"]: purpose,
		};
		const resp = await Rest.get(`${REST.CONTEXTUAL_PRODUCTS.GET_PRODUCTS}`, params, ContextualProductService.getEligibleRecurringTopUpProductsHeaders(categoriesIds));
		ContextualProductService.validateResp(resp);
		return resp.data;
	}

	static async getProductOfferingsByChannelCode(channelCode: string): Promise<Array<ProductOffering>> {
		const resp = await Rest.get(
			`${REST.CONTEXTUAL_PRODUCTS.GET_PRODUCTS}?filter[channelCode]=${channelCode}`,
			"",
			{ "X-Entry-Point": channelCode }
		);
		ContextualProductService.validateResp(resp);
		return resp.data;
	}
}
