"use strict";

import BaseService from "./BaseService";
import { Rest } from "./Rest";
import { REST } from "../settings/core";

class ProductsTerminateService extends BaseService {
	static async terminateProduct(productId: string) {
		const data = {
			type: "products-terminate",
			relationships: {
				product: {
					data: {
						type: "products",
						id: productId
					}
				}
			}
		};

		try {
			const resp = await Rest.post(REST.PRODUCTS_TERMINATE, { data });
			ProductsTerminateService.validateResp(resp);
		} catch (e) {
			throw e;
		}
	}
}

export default ProductsTerminateService;
