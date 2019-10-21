/* eslint no-undef: 0 */
declare type CmsMenuType = {|
	...CmsBaseType,
	items: Array<Object>,
	publishTarget: string
|};

export {
	CmsMenuType
};
