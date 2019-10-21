/* eslint no-undef: 0 */
import type { CmsItemType } from "./CmsItemType";

declare type CmsBaseType = {|
	...IdentifiableType,
	itemType: CmsItemType,
	name: string,
	transferred: string,
	modified: string,
	modifiedby: { [string]: string },
	isRemoved: boolean,
	language: string
|};

export {
	CmsBaseType
};
