import { ResourceInventories } from "../ResourceInventories";
import { ResourceStocks } from "../ResourceStocks";

interface ReserveMsisdnConfig {
	pattern?: string;
	releaseId?: string;
	numberType?: string;
	reservedFor: string;
	stock?: string;
	limit: number;
	endTime?: any;
	product?: any;
}

interface MsisdnActionsFlux {
	reserveMsisdn: (config: ReserveMsisdnConfig) => void;
	releaseMsisdn: (config: {releaseId: string}) => void;
	checkEligibility: (config: {msisdn: string}) => void;
	fetchCustomChangePO: (customPOId?: string) => void;
	getResourceInventories: () => void;
	changeInventory: (selectedInventory: ResourceInventories, stocks: Array<ResourceStocks>) => void;
}

export {
	MsisdnActionsFlux,
	ReserveMsisdnConfig,
};
