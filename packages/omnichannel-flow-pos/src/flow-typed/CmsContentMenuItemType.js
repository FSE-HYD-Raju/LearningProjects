/* eslint no-undef: 0 */

declare type CmsContentMenuItemType = {
	id: string,
	title: string,
	link: LinkType,
	childItems: Array<CmsContentMenuItemType>
};

export {
	CmsContentMenuItemType
};
