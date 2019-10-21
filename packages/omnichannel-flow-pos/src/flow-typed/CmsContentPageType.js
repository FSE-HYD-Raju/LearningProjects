/* eslint no-undef: 0 */
import type { CmsItemState } from "./CmsItemState";

declare type CmsContentPageType = {|
	...CmsBaseType,
	publishTarget: string,
	contentItemId: string,
	title: string,
	metaDescription: string,
	path: string,
	requiresSignInUser: boolean,
	contentItemDto: CmsContentItemType,
	state: CmsItemState
|};

export {
	CmsContentPageType
};
