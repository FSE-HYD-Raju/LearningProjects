"use strict";

import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import { Basket, ContextualPaymentMethod, OmnichannelApiEntity, OmnichannelApiResponse } from "../types";
import { ProductsReplaceType } from "../types/ProductsReplaceType";
interface ProductsReplaceInitializationResult {
	// 	basketId: string;
	basket: Basket;
	paymentMethods: ContextualPaymentMethod[];
}
interface ProductReplaceInitializeRequest {
	individualId: string;
	agreementId: string;
	productId: string;
	productOfferingId: string;
	replaceType: ProductsReplaceType;
	inputtedCharacteristics: Record<string, string>;
}
class ProductReplacementService extends BaseService {
	static async productsReplaceInitialize(request: ProductReplaceInitializeRequest): Promise<ProductsReplaceInitializationResult> {
		const { inputtedCharacteristics, replaceType, productId, individualId, productOfferingId } = request;
		const param = {
			type: "products-replace-initialize",
			attributes: {
				characteristics: inputtedCharacteristics,
				type: replaceType,
			},
			relationships: {
				product: {
					data: {
						type: "products",
						id: productId,
					},
				},
				owner: {
					data: {
						type: "persons",
						id: individualId,
					},
				},
				productOffering: {
					data: {
						type: "productOfferings",
						id: productOfferingId,
					},
				},
			},
		};

		try {
			const resp: OmnichannelApiResponse = await Rest.post(`${REST.PRODUCT_REPLACEMENT.INITIALIZE}?include=resultBasket.basketItems`, { data: param });
			ProductReplacementService.validateResp(resp);

			return {
				basket: ((resp.included || []).find(includedObject => includedObject.type === "baskets") as any) as Basket,
				paymentMethods: (resp.data as OmnichannelApiEntity).attributes.contextualPaymentMethods,
			};
		} catch (e) {
			throw e;
		}
	}
}
export { ProductReplacementService, ProductsReplaceInitializationResult, ProductReplaceInitializeRequest };
