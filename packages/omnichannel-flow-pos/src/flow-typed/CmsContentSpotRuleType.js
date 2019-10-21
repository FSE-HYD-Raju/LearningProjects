/* eslint no-undef: 0 */
import type { CmsItemState } from "./CmsItemState";

declare type CmsContentSpotRuleType = {
	type: string,
	priority: number,
	contentItemId: string,
	begintime: number,
	endtime: number,
	key: CmsContentSpotKeyType,
	requiresSignInUser: boolean,
	state: CmsItemState,
	publishTarget: string,
	language: string,
	fragment: string,
	segmentId: string
};

export {
	CmsContentSpotRuleType
};
