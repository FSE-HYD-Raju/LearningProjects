interface OrderStatusFilter {
	filterLabel: string;
	displayType: FilterType;
	type: FilterType;
	filterValue: string;
	// looks like values array always contains <string, OrderLifeCycleStatus> pairs (eq to <string, string> in JS)
	values: Record<string, string>;
}

enum FilterTypeEnum {
	collection = "collection"
}

type FilterType = keyof typeof FilterTypeEnum;

enum FilterDisplayTypeEnum {
	checkbox = "checkbox",
	dropdown = "dropdown"
}

type FilterDisplayType = keyof typeof FilterDisplayTypeEnum;

export {
	OrderStatusFilter,
	FilterTypeEnum,
	FilterType,
	FilterDisplayType,
	FilterDisplayTypeEnum
};
