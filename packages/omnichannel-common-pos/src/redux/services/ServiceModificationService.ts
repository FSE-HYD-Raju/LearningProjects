"use strict";

import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import {
	CallForwardingServiceModify,
	InitializeServiceStateTransitionsParam,
	ServiceModificationInitialization, ServiceModificationResult
} from "../types";
import { ErrorContainer } from "./index";

export default class ServiceModificationService extends BaseService {
	static async initializeServiceStateTransition(param: InitializeServiceStateTransitionsParam): Promise<ServiceModificationInitialization> {
		let resp;

		const { service, agreementId, stateTransition, reason, customerId } = param;

		const specificationId = service.specification ? service.specification.id : undefined;
		const serviceId = service.id;

		const transition = {
			type: "services-modify-initialize",
			attributes: {
				serviceId,
				specificationId,
				agreementId,
				stateTransition: stateTransition.name,
				actionId: stateTransition.id,
				reason
			},
			relationships: {
				owner: {
					data: {
						type: "persons",
						id: customerId
					}
				}
			}
		};

		try {
			resp = await Rest.post(`${REST.SERVICE_MODIFICATION.INITIALIZE}?include=basket.basketItems,owner`, { data: transition });
			this.validateResp(resp);

			resp.data.attributes.serviceName = service.specification ? service.specification.name : "";
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async acceptServiceLifecycleStatusChange(basketId: string): Promise<ServiceModificationResult> {
		let resp;

		const param = {
			type: "services-modify",
			attributes: {},
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
			resp = await Rest.post(REST.SERVICE_MODIFICATION.MODIFY, { data: param });
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async submitCallForwardingConfiguration(configuration: Record<string, any>, individualId: string, agreementId: string):
		Promise<CallForwardingServiceModify | undefined> {
		let resp;

		const values = Object.keys(configuration).map(key => configuration[key]);
		const data = {
			type: "call-forwarding-service-modify",
			attributes: {
				callForwardingServices: values,
				agreementId
			},
			relationships: {
				owner: {
					data: {
						type: "persons",
						id: individualId
					}
				},
				basket: {
					data: null
				}
			}
		};

		try {
			resp = await Rest.post(REST.CALL_FORWARDING_SERVICE, { data });
			this.validateResp(resp);
			return resp.data;
		} catch (e) {
			throw e;
		}

	}
}
