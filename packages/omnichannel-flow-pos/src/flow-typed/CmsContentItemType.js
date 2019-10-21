/* eslint no-undef: 0 */
declare type CmsContentItemType = {|
	...CmsBaseType,
	content: string,
	isTemplate: boolean,
	isReadOnly: boolean
|};

export {
	CmsContentItemType
};
