import { HasId } from "./HasId";

export interface StockLevelAttributes {
	count: number;
	inventoryId: string;
	productOfferingId: string;
	status: Status;
}

export enum Status {
	OUTOFSTOCK = "out-of-stock",
	INSTOCK = "in-stock",
	NOPHYSICALRESOURCES = "no-physical-resources",
}

export interface StockLevel extends StockLevelAttributes, HasId {
	type?: string;
	attributes?: StockLevelAttributes;
}
