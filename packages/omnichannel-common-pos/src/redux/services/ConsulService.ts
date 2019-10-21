"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import { ConsulValues } from "../models/consul/consul.types";

export default class ConsulService extends BaseService {

	static async getValues(): Promise<AxiosResponse<ConsulValues>> {
		let all;
		try {
			all = await Rest.get(REST.CONSUL.ALL);
			this.validateResp(all);
		} catch (e) {
			throw e;
		}
		return all;
	}

	static async getServiceLocations(): Promise<AxiosResponse<ConsulValues>> {
		let all;
		try {
			all = await Rest.get(REST.CONSUL.SERVICES);
			this.validateResp(all);
		} catch (e) {
			throw e;
		}
		return all;
	}
}
