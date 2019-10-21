"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { CustomerAccount } from "../types";

export default class CustomerAccountsService extends BaseService {
	static async create(individualId: string): Promise<AxiosResponse<CustomerAccount>> {
		const data = {
			type: "customerAccounts",
			attributes: {
				individualId
			}
		};
		try {
			const resp = await Rest.post(`${REST.CUSTOMER_ACCOUNTS}`, { data });
			this.validateResp(resp);
			return resp.data;
		} catch (e) {
			throw e;
		}
	}
}
