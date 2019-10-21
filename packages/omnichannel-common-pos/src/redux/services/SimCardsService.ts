"use strict";

import { AxiosResponse, Msisdn, SimCard } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import ErrorContainer from "./ErrorContainer";
import BaseService from "./BaseService";

export default class SimCardsService extends BaseService {

	static async searchSimCards(searchTerm: string): Promise<SimCard> {
		const response: AxiosResponse<Array<SimCard>> | ErrorContainer = await Rest.get(`${REST.SIM_CARDS}/${searchTerm}`);

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response.data;
	}
}
