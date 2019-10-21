declare type ProductFilterType = {
	type: "collection" | "price-range",
	matchers: ?Array<{
		type: "instanceCharacteristic" | "inputCharacteristic",
		operator: string,
		characteristic: string
	}>,
	values: ?{
		[FilterValue: string]: string
	},
	filterLabel: string,
	id: string,
	displayType?: string
};

export {
	ProductFilterType
};
