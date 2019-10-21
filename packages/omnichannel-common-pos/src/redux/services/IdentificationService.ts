"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import { ID_DATA_MISSED, StoredCustomerType, SupportState } from "../types";

export default class IdentificationService extends BaseService {

	static async validateIdentification(storedCustomer: Partial<StoredCustomerType>): Promise<AxiosResponse<SupportState[]>> {
		let resp;
		const { identifications } = storedCustomer;
		if (identifications) {
			try {
				resp = await Rest.get(`${REST.IDENTIFICATION_CHECK}/${identifications.identificationType}/${identifications.identificationId}`);
				this.validateResp(resp);
			} catch (errorResponse) {
				throw errorResponse;
			}
			return resp;
		} else {
			throw ID_DATA_MISSED;
		}
	}
}
