import { HasId } from "./index";

interface ResourceStocksAttributes {
	characteristics: Record<string, string>;
	stockType: string;
	stockClassification: string;
	name: string;
	extReferenceId: string;
	description: string;
	resourceSKU: string;
	resourceType: ResourceStocksType;
}

interface ResourceStocks extends ResourceStocksAttributes, HasId {
	attributes?: ResourceStocksAttributes;
}

type ResourceStocksTypeEnum = {
	MSISDN: "msisdn",
	SIM_CARDS: "sim-cards",
	DEVICES: "devices",
};

type ResourceStocksType = keyof ResourceStocksTypeEnum;

export {
	ResourceStocksAttributes,
	ResourceStocks,
	ResourceStocksType,
	ResourceStocksTypeEnum,
};
