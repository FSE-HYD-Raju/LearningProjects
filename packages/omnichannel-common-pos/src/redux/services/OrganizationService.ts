"use strict";

import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { AxiosResponse } from "axios";
import ErrorContainer from "./ErrorContainer";
import { OrganizationResponse } from "../types";

export default class OrganizationService {
	static async createOrganization(payload: Object): Promise<Object> {
		let resp;
		try {
			resp = await Rest.post(REST.ORGANIZATION, {
				data: {
					...payload
				}
			});
			if (resp instanceof ErrorContainer) {
				throw resp;
			} else {
				return resp.data;
			}
		} catch (e) {
			throw e;
		}
	}

	static getById(organizationId: String): Promise<AxiosResponse<OrganizationResponse>> | ErrorContainer {
	 	return Rest.get(`${REST.ORGANIZATION}/${organizationId}`);
	}
}
