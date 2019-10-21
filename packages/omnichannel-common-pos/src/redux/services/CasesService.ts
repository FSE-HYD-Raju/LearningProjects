"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import { ChangeSimActionInitializeRequest, ProductOffering } from "../types";
import { CreateCustomerCasePayload, SupportState } from "../models/support/support.types";
import DocumentService from "./DocumentService";

export default class CasesService extends BaseService {
	//
	static async getCustomerCases(userId: string): Promise<AxiosResponse<SupportState[]>> {
		let resp;
		try {
			const data = `?filter[customerAccountId]=${userId}`;
			resp = await Rest.get(REST.SUPPORT_CASES.CASES, data);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async addCustomerCase(customerCasePayload: CreateCustomerCasePayload) {
		const { actorId, description, formattedName, categoryId, attachments } = customerCasePayload;
		let resp;
		try {
			resp = await Rest.post(REST.SUPPORT_CASES.CASES, {
				data: {
					type: "cases",
					attributes: {
						description,
						createdBy: {
							actorId,
							formattedName
						},
						lifecycleStatus: "New",
						creationChannel: "eCare",
						caseCategories: {
							id: categoryId
						}
					}
				}
			});
			this.validateResp(resp);
			const createdCaseId = resp.data.id;
			for (const file of attachments) {
				await DocumentService.uploadDocument(file, createdCaseId);
			}
		} catch (e) {
			// TODO: delete case if failed to upload document or skip upload document error
			throw e;
		}
		return resp;
	}
}
