export enum CmsItemType {
	CONTENT_PAGE,
	CONTENT_ITEM,
	ASSET_ITEM,
	ASSET_RESOURCE,
	PUBLISH_TARGET,
	CONTENT_SPOT,
	CONTENT_SPOT_RULE,
	WIDGET,
	MENU,
	SEGMENT,
}

export interface CmsMetaData {
	userId: string;
	userBirthDay: string;
	selectedProductId: string;
}

export interface ModifiedBy {
	username: string;
	firstname: string;
	lastname: string;
}

export interface CmsBase {
	id: string;
	itemType: CmsItemType;
	name: string;
	transferred: string;
	modified: string;
	modifiedby: ModifiedBy;
	isRemoved: boolean;
	language: string;
}

export interface ContentItem extends CmsBase {
	content: string;
	isTemplate: boolean;
	isReadOnly: boolean;
}
