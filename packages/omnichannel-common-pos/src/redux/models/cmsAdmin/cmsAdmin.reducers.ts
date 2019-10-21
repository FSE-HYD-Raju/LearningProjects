"use strict";

import { CmsAdminActions, CmsAdminActionPayload } from "./cmsAdmin.actions";

interface DeviceParams {
	width: number;
	widthCSS: string;
	height: number;
	heightCSS: string;
}

interface DeviceTypes {
	iphone: DeviceParams;
	ipad: DeviceParams;
	"android phone": DeviceParams;
	"android tablet": DeviceParams;
	"windows phone": DeviceParams;
}

export type CmsAdminState = {
	selectedLanguage: string|null;
	selectedPublishTarget: any;
	contentSpots: Array<any>;
	contentItemsAndTemplates: Array<any>;
	cmsInitialized: boolean;
	rules: any;
	roles: Array<string>;
	deviceTypes: DeviceTypes;
	segmentConfig: any;
	userId?: string;
	publishTargets: any;
	contentPages: Array<any>;
	allContentSpotRules: Array<any>;
	segments: Array<any>;
	assets: Array<any>;
	siteMenus: Array<any>;
	showContentPageModal: boolean;
	widgets: Array<any>
	segmentTypes: Array<string>;
	spotModalOpen: boolean;
	liveEditEnabled: boolean;
	previewContentInModal: boolean;
};

const initialState = {
	roles: ["contentcreator", "leadcontentcreator", "contentmanager"],
	deviceTypes: {
		iphone: {
			width: 375,
			widthCSS: "375px",
			height: 667,
			heightCSS: "667px"
		},
		ipad: {
			width: 768,
			widthCSS: "768px",
			height: 1024,
			heightCSS: "1024px"
		},
		"android phone": {
			width: 412,
			widthCSS: "412px",
			height: 732,
			heightCSS: "732px"
		},
		"android tablet": {
			width: 800,
			widthCSS: "800px",
			height: 1280,
			heightCSS: "1280px"
		},
		"windows phone": {
			width: 360,
			widthCSS: "360px",
			height: 640,
			heightCSS: "640px"
		}
	},
	segmentTypes: ["PREDEFINED", "DYNAMIC"],
	spotModalOpen: false,
	liveEditEnabled: true,
	previewContentInModal: false,
	cmsInitialized: false,
	showContentPageModal: false,
	contentSpots: [],
	contentItemsAndTemplates: [],
	contentPages: [],
	allContentSpotRules: [],
	segments: [],
	assets: [],
	siteMenus: [],
	widgets: [],
	rules: {},
	selectedLanguage: null,
	selectedPublishTarget: null,
	segmentConfig: null,
	publishTargets: null
};

const cmsAdminReducer = (state: Partial<CmsAdminState> = initialState, action: CmsAdminActionPayload) => {
	const { type } = action;
	switch (type) {
		case CmsAdminActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		default:
			return state;
	}
};

export default cmsAdminReducer;
