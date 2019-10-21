"use strict";

import BaseService from "./BaseService";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import { AxiosResponse } from "../types";
import ErrorContainer from "./ErrorContainer";

export default class AuthService extends BaseService {
	static async refresh() {
		try {
			Rest.clearCache();
			Rest.get(REST.OAUTH2.REFRESH);
		} catch (e) {
			throw e;
		}
	}

	static async authorize(): Promise<string> {
		const response: AxiosResponse<Array<string>> | ErrorContainer = await Rest.get(`${REST.OAUTH2.LOGIN}?prompt=none`);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response.data;
	}
}
