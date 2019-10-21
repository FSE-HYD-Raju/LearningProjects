/* eslint no-undef: 0 */

import type { CmsItemState } from "./CmsItemState";

declare type AssetItemType = {|
	...CmsBaseType,
	description: string,
	mimetype: string,
	assettype: string,
	uploadfilename: string,
	uploadfileextension: string,
	size: number,
	originalresourceid: string,
	scaledresources: { [string]: string },
	scaledmimetype: string,
	scaledextension: string,
	state: CmsItemState
|};

export {
	AssetItemType
};
