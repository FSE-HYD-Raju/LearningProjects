"use strict";

import { AxiosResponse } from "axios";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { Rest } from "./Rest";

import { ArtifactsInfoResponse } from "../models/versionInformation/versionInformation.types";

export default class InfoService extends BaseService {

	static async getArtifacts(): Promise<AxiosResponse<ArtifactsInfoResponse>> {
		let resp;
		try {
			resp = await Rest.get(REST.INFO.ARTIFACTS);
			this.validateResp(resp, "Fetching values from qartifact-info returned an error");
		} catch (e) {
			throw e;
		}
		return resp;
	}

}
