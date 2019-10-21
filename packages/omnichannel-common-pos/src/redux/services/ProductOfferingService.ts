"use strict";

import { AxiosResponse } from "../types";
import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import { ProductOffering } from "../types";
import ErrorContainer from "./ErrorContainer";

export default class ProductOfferingService extends BaseService {

	public static URL = REST.PRODUCT_OFFERINGS.GET_PRODUCT_OFFERING_BY_ID;

	static async getProductOffering(productOfferingId: string, include?: string): Promise<ProductOffering> {
		const response: AxiosResponse<ProductOffering> | ErrorContainer = await Rest.get(
			`${ProductOfferingService.URL}/${productOfferingId}${include || ""}`,
			"",
			{ "X-Include-Internal-Characteristics" : "true" }
		);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		const optionalProductOfferings = response.included && response.included.filter(
			includedItem => includedItem.type === "optionalProductOfferings"
		) ||  [];

		const optionalProductOfferingGroups = response.included && response.included.filter(
			includedItem => includedItem.type === "optionalProductOfferingGroups"
		) ||  [];

		const productOffering = {
			...response.data,
			attributes: {
				...response.data.attributes,
				optionalProductOfferings,
				optionalProductOfferingGroups
			}
		} as ProductOffering;

		return productOffering;
	}

	static async getOptionalProductOfferings(productOfferingId: string): Promise<Array<ProductOffering>> {
		const response: AxiosResponse<Array<ProductOffering>> | ErrorContainer = await Rest.get(
			`${ProductOfferingService.URL}/${productOfferingId}/optionalProductOfferings`
		);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response.data;
	}

	static async getProductOfferings(availabilities: Array<string>): Promise<Array<ProductOffering>> {
		let resp;
		try {
			const productOfferings = availabilities
				.reduce((res: Array<string>, item: string) => {
					res.push(`filter[categoryIds]=${item}`);
					return res;
				}, [])
				.join("&");
			resp = await Rest.get(`${ProductOfferingService.URL}?${productOfferings}`);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}

		return resp.data;
	}
}
