import {
	ProductOfferingUtil
} from "omnichannel-common-pos";

interface TableColumn {
	label?: string;
	valueGetter?: (...args: any[]) => any;
	sortValueGetter?: (...args: any[]) => any;
	component?: any;
	flex: number;
	type: string;
	attribute?: any;
}

const productTableColumns: Array<TableColumn> = [
	{
		label: "name",
		valueGetter: ProductOfferingUtil.getPOName,
		sortValueGetter: ProductOfferingUtil.getPONameForSort,
		component: null,
		flex: 1.25,
		type: "PRODUCT"
	},
	{
		label: "contains",
		valueGetter: ProductOfferingUtil.getPOContainedNames,
		sortValueGetter:
		ProductOfferingUtil.getPOContainedNamesForSort,
		component: null,
		flex: 0.75,
		type: "CONTAINEDPRODUCTS"
	},
	{
		label: "compare",
		flex: 0.2,
		type: "COMPARISON"
	},
	{
		label: "recurringPrice",
		flex: 0.75,
		valueGetter: ProductOfferingUtil.getRecurringPriceRange,
		sortValueGetter:
		ProductOfferingUtil.getRecurringPriceForSort,
		type: "PRICE-RANGE"
	},
	{
		label: "stock",
		flex: 0.75,
		type: "PRODUCT",
		attribute: "attributes.stockLevel"
	},
	{
		label: "oneTimePrice",
		flex: 1,
		valueGetter: ProductOfferingUtil.getUpfrontPriceRange,
		sortValueGetter: ProductOfferingUtil.getUpfrontPriceForSort,
		type: "PRICE-RANGE"
	}
];

export default productTableColumns;

export {
	TableColumn
};
