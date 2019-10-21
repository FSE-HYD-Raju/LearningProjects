import { MsisdnReservationAttributes, ProductOffering, Basket, ResourceInventories, ResourceStocks } from "../../types";

export type MsisdnChange = {
	queryActive: boolean;
	basket?: Basket;
	error?: string;
};

export type MsisdnState = {
	stocks: Array<ResourceStocks>;
	inventories: Array<ResourceInventories>;
	selectionStocks: Array<ResourceStocks>;
	reservationAttributes: MsisdnReservationAttributes;
	activeReservationId?: string;
	reservationError: boolean;
	selectedInventory?: ResourceInventories;
	selectedCategory?: string;
	inputtedPattern?: string;
	eligibleMsisdn?: boolean;
	customChangePO?: ProductOffering;
	msisdnChanges: {[key: string]: MsisdnChange};
	portInData?: string;
	isMSISDNPortable: boolean;
};
