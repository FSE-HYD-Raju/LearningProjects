"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import { PostalAddress, SupportState } from "../types";

export default class AddressValidationService extends BaseService {

	static async validateAddress(address: Partial<PostalAddress>): Promise<AxiosResponse<SupportState[]>> {
		let resp;
		const headers = {
			"Content-Type": "application/json"
		};

		try {
			resp = await Rest.post(REST.LOCATION.VALIDATE_ADDRESS, address, headers);
			this.validateResp(resp);
		} catch (errorResponse) {
			throw errorResponse;
		}
		return resp.data;
	}
}
