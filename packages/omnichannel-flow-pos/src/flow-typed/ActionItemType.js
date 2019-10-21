/* eslint no-undef: 0 */

declare type ActionItemType = {|
	id: string,
	buttonId: string,
	buttonLabel: string,
	buttonAction: (itemId: string) => void
|};

export {
	ActionItemType
};
