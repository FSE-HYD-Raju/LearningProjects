/* eslint no-undef: 0 */
declare type CharacteristicValue = {
	isDefault?: boolean,
	language?: string, // ISO 639-2/T
	name?: string,
	validFor?: {
		startDate: string,
		endDate?: string
	},
	value: string
};

export {
	CharacteristicValue
};
