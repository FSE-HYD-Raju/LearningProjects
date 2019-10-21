"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import { CmsMetaData, ContentItem } from "./cms.types";

export enum CmsActions {
	GET_STYLES = "Cms_GET_STYLES",
	GET_STYLES_COMPLETE = "Cms_GET_STYLES_COMPLETE",
	GET_STYLES_FAILED = "Cms_GET_STYLES_FAILED",
	GET_CURRENT_CONTENT = "Cms_GET_CURRENT_CONTENT",
	GET_CURRENT_CONTENT_COMPLETED = "Cms_GET_CURRENT_CONTENT_COMPLETED",
	GET_CONTENT_PAGE_WITH_CONTENT = "Cms_GET_CONTENT_PAGE_WITH_CONTENT",
	GET_CONTENT_PAGE_WITH_CONTENT_COMPLETED = "Cms_GET_CONTENT_PAGE_WITH_COMPLETED",
	UPDATE_ON_CMS_ADMIN_SAVE_STYLES = "Cms_UPDATE_ON_CMS_ADMIN_SAVE_STYLES",
}

export interface CmsActionPayload extends Action<CmsActions> {
	error?: string;
	styles?: Array<any>;
	publishTarget?: string;
	url?: string;
	item?: ContentItem;
	contentItemKey?: string;
	fragment?: string;
	previewData?: object;
	metaData?: CmsMetaData;
}

export const cms = {
	getStyles: (values: ConsulValues) => {
		if (values.skip_cms_requests === true || values.skip_cms_requests === "true") {
			return ({type: CmsActions.GET_STYLES_COMPLETE, styles: {}});
		} else {
			return ({type: CmsActions.GET_STYLES});
		}
	},
	getStylesComplete: (styles: Array<any>) => ({type: CmsActions.GET_STYLES_COMPLETE, styles}),
	getStylesFailed: (error: string) => ({type: CmsActions.GET_STYLES_FAILED, error}),
	getCurrentContent: (publishTarget: string, fragment: string | undefined, previewData: object | null, metaData: CmsMetaData) => ({
		type: CmsActions.GET_CURRENT_CONTENT,
		publishTarget,
		fragment,
		previewData,
		metaData,
	}),
	getCurrentContentCompleted: (contentItemKey: string, item: ContentItem) => ({
		type: CmsActions.GET_CURRENT_CONTENT_COMPLETED,
		contentItemKey,
		item
	}),
	getContentPageWithContent: (publishTarget: string, url: string) => ({
		type: CmsActions.GET_CONTENT_PAGE_WITH_CONTENT,
		publishTarget,
		url
	}),
	getContentPageWithContentComplete: (resp: any) => ({
		type: CmsActions.GET_CONTENT_PAGE_WITH_CONTENT_COMPLETED,
		resp
	}),
	updateOnCmsAdminActionSaveStyles: (styles: any) => ({
		type: CmsActions.UPDATE_ON_CMS_ADMIN_SAVE_STYLES,
		styles,
	})
};
