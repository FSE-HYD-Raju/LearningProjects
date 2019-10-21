"use strict";

import { AxiosResponse, PortInDecision } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";

import ErrorContainer from "./ErrorContainer";
import BaseService from "./BaseService";

export default class PortInService extends BaseService {
	static async getPortInDecision(msisdn: string): Promise<string> {
		const response: AxiosResponse<PortInDecision> | ErrorContainer = await Rest.get(
			`${REST.PORT_IN_DECISIONS}/${msisdn}`
		);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response.data;
	}

	static async checkMsisdnPortInValidity(msisdn: string): Promise<any> {
		let response;

		try {
			response = await Rest.post(REST.ELIGIBILITY.ELIGIBILITY_DECISIONS, {
				data: {
					type: "eligibility-decisions",
					attributes: {
						"recipeId": "port-in-validation",
						"parameters": {
							msisdn
						}
					}
				}
			});
			this.validateResp(response);
		} catch (errorResponse) {
			throw errorResponse;
		}

		return response.data;
	}
}
