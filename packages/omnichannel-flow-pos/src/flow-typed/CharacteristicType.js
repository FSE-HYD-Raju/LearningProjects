/* eslint no-undef: 0 */
declare type Characteristic = {
	cardinality?: { min: number, max: number },
	dataType?: string,
	description?: string,
	hidden?: boolean,
	humanReadableId?: string,
	mandatory: boolean,
	maxValue?: string,
	minValue?: string,
	name?: string,
	priority?: number,
	purpose?: string,
	source?: string,
	submitProductConfigurationype?: string,
	unitOfMeasure?:
		| "sms"
		| "mms"
		| "monetary"
		| "pieces"
		| "dozens"
		| "percents"
		| "permilles"
		| "basispoints"
		| "bits"
		| "bytes"
		| "kilobytes"
		| "megabytes"
		| "gigabytes"
		| "terabytes"
		| "petabytes"
		| "kibibytes"
		| "mebibytes"
		| "gibibytes"
		| "tebibytes"
		| "pebibytes"
		| "seconds"
		| "minutes"
		| "hours"
		| "days"
		| "weeks"
		| "months"
		| "service_specific",
	validFor?: {
		startDate: string,
		endDate?: string
	},
	validation?: string,
	valueRegulator?:
		| "SELECTION"
		| "CAN_BE_PERSONALIZED"
		| "MUST_BE_PERSONALIZED"
		| "NO_PERSONALIZATION",
	values: Array<CharacteristicValue>
};

export { Characteristic };
