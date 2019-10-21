import { AxiosResponse } from "axios";
import BaseService from "./BaseService";
import { AttachedDocument,  CreateDocumentPayload, Document } from "../types";
import { REST } from "../settings/core";
import { HttpHeaders, Rest } from "./Rest";
import { getB2cSubChannelGuess } from "../utils/channel";
import { B2C_SUB_CHANNEL_HEADER } from "../../channelUtils/setAxiosInterceptor";

export default class DocumentService extends BaseService {
	static async uploadDocument(file: File, caseId?: string): Promise<AttachedDocument> {
		try {
			const formData = new FormData();
			formData.append("file", new Blob([file], { type: file.type }), file.name);
			const headers: HttpHeaders = {
				"Content-Type": "multipart/form-data",
			};
			const subChannel = getB2cSubChannelGuess();
			if (subChannel) {
				headers[B2C_SUB_CHANNEL_HEADER] = subChannel;
			}
			const queryParam = caseId ? `?customerAccountId=${caseId}` : "";
			const resp = await Rest.post(REST.DOCUMENTS.UPLOAD + queryParam, formData, headers);
			DocumentService.validateResp(resp);
			return resp as AttachedDocument;
		} catch (e) {
			throw e;
		}
	}

	static async generateDocument(data: CreateDocumentPayload): Promise<AxiosResponse<Object>>  {
		const header = { "Content-Type": "application/json" };
		try {
			const resp = await Rest.post(REST.DOCUMENTS.CREATE_FROM_TEMPLATE, data, header);
			DocumentService.validateResp(resp);
			return resp;
		 }
		 catch (e) {
			throw e;
		}
	}

	static async getStatusSigned(id: string): Promise<AxiosResponse<Object>>  {
		try {
			const resp = await Rest.get(`${REST.DOCUMENTS.GET}/${id}`);
			DocumentService.validateResp(resp);
			return resp.data;
		 }
		 catch (e) {
			throw e;
		}
	}
}
