"use strict";

import BaseService from "./BaseService";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { ProductOfferingShippingMethod, BasketShippingMethod } from "../types";

const isValidateShippingMethod = (raw: any): boolean => {
	return !(!raw.id || !raw.attributes || !raw.attributes.type || !raw.attributes.productOffering);
};
const mapShippingMethodsToProductOfferingShippingMethod = (raw: any): ProductOfferingShippingMethod => {
	return {
		id: raw.id,
		type: raw.attributes.type,
		productOffering: raw.attributes.productOffering
	};
};

export default class DeliveryService extends BaseService {
	static filterOutInvalidShippingMethodsForPO(raw: any): ProductOfferingShippingMethod[] {
		return (
			(raw && raw.filter(isValidateShippingMethod).map(mapShippingMethodsToProductOfferingShippingMethod)) || []
		);
	}
	static async getShippingMethodsForPO(poId: string): Promise<ProductOfferingShippingMethod[]> {
		try {
			const resp = await Rest.get(
				`${REST.PRODUCT_OFFERINGS.GET_PRODUCT_OFFERING_BY_ID}/${poId}/shippingMethods`,
				{}
			);
			DeliveryService.validateResp(resp);
			return DeliveryService.filterOutInvalidShippingMethodsForPO(resp.data);
		} catch (e) {
			throw e;
		}
	}

	static async getShippingMethodsForBasket(basketId: string, postalCode: string): Promise<BasketShippingMethod[]> {
		try {
			const resp = await Rest.get(
				`${REST.BASKETS.BASKETS}/${basketId}/shippingMethods`,
				`?filter[postalCode]=${postalCode}`
			);
			DeliveryService.validateResp(resp);
			return resp.data;
		} catch (e) {
			throw e;
		}
	}
}
