/* eslint no-undef: 0 */

declare type ProductOfferingGroup = {
	cardinality: ?{
		min: number,
		max: number
	},
	commercialEnrichments: ?{},
	id: string,
	name: string,
	productOfferings: Array<ProductOffering>,
	msisdnGroup?: boolean,
	productId: ?string
};

declare type ProductOffering = {
	id: string,
	type?: string,
	attributes: ?ProductOfferingAttributes,
	...ProductOfferingAttributes
};

declare type ProductOfferingAttributes = {
	commercialEnrichments: ?Array<*>,
	featureCharacteristics: ?Array<*>,
	specificationId: ?string,
	instanceCharacteristics: ?{
		[InstanceCharacteristicName: string]: InputCharacteristic
	},
	productOfferings: ?Array<ProductOffering>,
	name: string,
	categories: ?Array<string>,
	inputCharacteristics: {
		[InputCharacteristicName: string]: InputCharacteristic
	},
	prices: ?Array<Price>,
	priority: ?string,
	childBasketItems?: Array<ProductOffering>,
	productOfferingGroups: ?Array<ProductOfferingGroup>,
	msisdns: ?{},
	selected: boolean,
	inputtedCharacteristics: ?InputtedCharacteristic,
	relationships: ?{
		[relationshipName: string]: {
			links: Links
		}
	},
	productId: ?string
};

declare type Links = {
	self: ?string,
	relatated: ?string
};

declare type InputCharacteristic = {
	values: ?Array<*>,
	description: ?string,
	source: ?string,
	subType: ?string,
	mandatory: boolean,
	validation: ?string,
	name: string,
	priority: ?string
};

declare type Price = {
	type: "ONE_TIME" | "RECURRENT",
	name: ?string,
	unitOfMeasure: ?string,
	taxAmount: ?string,
	taxFreeAmount: ?number,
	taxRate: ?number,
	recurringChargePeriod: ?number,
	currency: string,
	conditions: ?{},
	originalPrice: ?number
};

declare type InputtedCharacteristic = {
	[inputtedCharacteristicName: string]: string
};

declare type ProductOfferingType = ProductOffering | ProductOfferingGroup;
declare type PriceTypeType = "ALLPRICES" | "ONE_TIME" | "RECURRENT" | "USAGE";

export {
	ProductOffering,
	ProductOfferingGroup,
	ProductOfferingAttributes,
	ProductOfferingType,
	Price,
	PriceTypeType,
	Links,
	InputCharacteristic,
	InputtedCharacteristic
};
