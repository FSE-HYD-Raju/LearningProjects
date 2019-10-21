"use strict";

import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { Reason } from "../types";

export default class ReasonsService extends BaseService {
	static async fetchReasons(id: string | undefined, type: string): Promise<Array<Reason>> {
		let resp;

		let url = `${REST.REASONS}?filter[type]=${type}`;
		if (id) {
			url += `&filter[id]=${id}`;
		}

		try {
			resp = await Rest.get(url);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}
}
