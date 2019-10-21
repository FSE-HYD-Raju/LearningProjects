/* eslint no-undef: 0 */
declare type CmsAdminStoreState = {|
	roles: Array<string>,
	deviceTypes: {| [string]: DeviceType |},
	selectedLanguage: ?string,
	userId: ?string,
	contentSpots: Array<CmsContentSpotType>,
	publishTargets: ?{| [string]: CmsPublishTargetType |},
	selectedPublishTarget: ?CmsPublishTargetType,
	contentItemsAndTemplates: Array<CmsContentItemType>,
	contentPages: Array<CmsContentPageType>,
	showContentPageModal: boolean,
	rules: {| [string]: CmsContentSpotRuleType |},
	segments: Array<CmsSegmentType>,
	segmentTypes: Array<string>,
	segmentConfig: ?CmsSegmentConfigType,
	spotModalOpen: boolean,
	liveEditEnabled: boolean,
	previewContentInModal: boolean,
	assets: Array<AssetItemType>,
	siteMenus: Array<CmsMenuType>,
	cmsInitialized: boolean,
	selectAssetFunction?: ?(item: AssetItemType, size?: string) => void
|};

export {
	CmsAdminStoreState
};
