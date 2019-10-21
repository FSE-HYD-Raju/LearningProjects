"use strict";

import { AxiosResponse } from "axios";
import { Rest, SIMPLE_JSON_CONTENT_TYPE_HEADER } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { CmsMetaData } from "..";

/*
TODO bind this when cms admin actions are ready
* this.bindAction(
			this.alt.actions.CMSAdminActions.saveStyles,
			this.updateOnCmsAdminActionSaveStyles
		);
* */
export default class CmsService extends BaseService {
	static async getStyles(): Promise<AxiosResponse<Array<any>>> {
		let resp;
		try {
			resp = await Rest.get(REST.CMS.STYLES);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static getContentItems() {
		return Rest.get(REST.CMS.GET_CONTENT_ITEMS_FOR_LANGUAGE);
	}

	static async saveStyles(styles: any) {
		let resp;
		try {
			resp = await Rest.post(REST.CMS.POST_SAVE_STYLES, styles, SIMPLE_JSON_CONTENT_TYPE_HEADER);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async getContentPageWithContent(publishTarget: string, url: string): Promise<AxiosResponse<any>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.CMS.GET_CONTENT_PAGE_WITH_CONTENT}?publishTarget=${publishTarget}%url=${url}`);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async getCurrentContent(publishTarget: string, fragment: string | undefined, previewData?: object, metaData?: CmsMetaData): Promise<AxiosResponse<any>> {
		let resp;
		try {
			resp = await Rest.post(REST.CMS.POST_CONTENT_SPOT, 	{ publishTarget, fragment, previewData, metaData }, SIMPLE_JSON_CONTENT_TYPE_HEADER);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}
}
