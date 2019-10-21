import { FilterLabelEnum } from "./FilterLabel";
import { PriceRange } from "./PriceRange";

enum ProductFilterTypeEnum {
	COLLECTION = "collection",
	PRICE_RANGE = "price-range",
}

type ProductFilterType = keyof typeof ProductFilterTypeEnum;

enum ProductFilterMatcherTypeEnum {
	INSTANCE_CHARACTERISTIC = "instanceCharacteristic",
	INPUT_CHARACTERISTIC = "inputCharacteristic",
}

type ProductFilterMatcherType = keyof typeof ProductFilterMatcherTypeEnum;

interface ProductFilterRangeType {
	min: number;
	max: number;
}

interface ProductFilterMatcher {
	type: ProductFilterMatcherType;
	operator: "contains" | string;
	characteristic: string;
}

enum DisplayTypeEnum {
	SLIDER = "slider",
	COMBINED_CHECKBOX = "combined-checkbox",
	DROPDOWN = "dropdown",
}

type DisplayTypeEnumType = keyof typeof DisplayTypeEnum;

interface ProductFilter extends PriceRange {
	id: string;
	type: ProductFilterTypeEnum;
	displayType?: DisplayTypeEnum | null;
	filterLabel: FilterLabelEnum;
	matchers?: ProductFilterMatcher[] | null;
	values?: Record<string, boolean>;
}

export {
	ProductFilterTypeEnum,
	ProductFilterType,
	DisplayTypeEnum,
	DisplayTypeEnumType,
	ProductFilterMatcher,
	ProductFilterMatcherTypeEnum,
	ProductFilterMatcherType,
	ProductFilter,
	ProductFilterRangeType,
};
