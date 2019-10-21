import { TableColumn } from "../../src/components/ProductTable/column/productTableColumns";

const headerColumns: TableColumn[] = [
	{
		label: "name",
		valueGetter: () => {
			return "Pro Duct 2000";
		},
		sortValueGetter: () => {
			return "Pro Duct 2000";
		},
		flex: 2,
		type: "PRODUCT"
	},
	{
		label: "contains",
		valueGetter: () => {
			return "1,2,3";
		},
		sortValueGetter: () => {
			return "1,2,3";
		},
		flex: 2,
		type: "CONTAINEDPRODUCTS"
	},
	{
		label: "recurringPrice",
		flex: 0.35,
		valueGetter: () => {
			return { min: 1, max: 2, currency: "EUR" };
		},
		sortValueGetter: () => {
			return 1;
		},
		type: "PRICE-RANGE"
	},
	{
		label: "oneTimePrice",
		flex: 0.35,
		valueGetter: () => {
			return { min: 3, max: 4, currency: "EUR" };
		},
		sortValueGetter: () => {
			return 3;
		},
		type: "PRICE-RANGE"
	},
	{
		label: "compare",
		flex: 0.4,
		type: "COMPARISON"
	},
	{
		label: "",
		flex: 0.5,
		type: "SELECT"
	}
];

export default headerColumns;
