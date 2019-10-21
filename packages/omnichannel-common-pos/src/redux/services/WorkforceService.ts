"use strict";

import { AxiosResponse } from "axios";
import { REST } from "../settings/core";
import { WorkforceAppointment } from "../types";
import BaseService from "./BaseService";
import { Rest } from "./Rest";

export default class LocationService extends BaseService {
	static async getAvailability(productOfferingId: string, city: string, county: string, workOrderType: string)
			: Promise<AxiosResponse<WorkforceAppointment[]>> {
		try {
			const resp = await Rest.get(REST.WORKFORCE.AVAILABILITY +
				`?productOfferingId=${productOfferingId}&city=${city}&county=${county}&workOrderType=${workOrderType}`);
			this.validateResp(resp);
			return resp;
		} catch (e) {
			throw e;
		}
	}
}
