/* eslint no-undef: 0 */

const CmsItemStates = {
	LIVE: "LIVE",
	DRAFT: "DRAFT"
};

declare type CmsItemState = $Keys<typeof CmsItemStates>;

export {
	CmsItemState
};
