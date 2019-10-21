"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import { SimIccVerificationAttributes, SimIccVerification } from "../models/eCare/activateSim/activateSim.types";

export default class ActivateSimService extends BaseService {
	static async simIccVerification(simIccVerification: SimIccVerificationAttributes): Promise<AxiosResponse<SimIccVerification>> {
		let resp;
		try {
			resp = await Rest.post(REST.MANAGE_SIM_ICC_VERIFICATION_OUTCOME, {
				data: {
					type: "manage-sim-icc-verification-outcome",
					attributes: {
						...simIccVerification
					}
				}
			});
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}
}
