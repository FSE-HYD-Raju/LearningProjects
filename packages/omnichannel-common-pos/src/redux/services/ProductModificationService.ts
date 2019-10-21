"use strict";

import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import {
	InitializeAddonStateTransitionParam,
	InitializeServiceStateTransitionsParam, ProductModificationResult,
	ServiceModificationInitialization
} from "../types";
import { ErrorContainer } from "../index";

export default class ProductModificationService extends BaseService {
	static async initializeProductStateTransition(param: InitializeAddonStateTransitionParam): Promise<ProductModificationResult> {
		let resp;

		const { addon, agreementId, stateTransition, reason, paymentMethodId, customerAccountId } = param;

		const productId = addon.id;
		const productOfferingId = addon.productOfferingId;

		const transition = {
			type: "productModificationInitializations",
			attributes: {
				paymentMethodId,
				owner: {
					customerAccountId
				},
				productId,
				productOfferingId,
				agreementId,
				stateTransition: stateTransition.name,
				actionId: stateTransition.id,
				reason
			}
		};

		try {
			resp = await Rest.post(`${REST.PRODUCT_MODIFICATION.INITIALIZE}?include=basket.basketItems`, { data: transition });
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async acceptProductLifecycleStatusChange(basketId: string, paymentMethodId: string | undefined): Promise<ProductModificationResult> {
		let resp;

		const param = {
			type: "productModification",
			attributes: {
				paymentMethodId: paymentMethodId
			},
			relationships: {
				basket: {
					data: {
						id: basketId,
						type: "baskets"
					}
				}
			}
		};

		try {
			resp = await Rest.post(REST.PRODUCT_MODIFICATION.MODIFY, { data: param });
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}
}
