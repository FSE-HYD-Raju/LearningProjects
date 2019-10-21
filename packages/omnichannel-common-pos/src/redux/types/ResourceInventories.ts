import { HasId, ResourceStocks } from "./index";

interface ResourceInventoriesAttributes {
	characteristics: Record<string, string>;
	name: string;
	extReferenceId: string;
	inventoryType: string;
	stocks: Array<ResourceStocks>;
}

interface ResourceInventories extends ResourceInventoriesAttributes, HasId {
	attributes?: ResourceInventoriesAttributes;
}

export {
	ResourceInventoriesAttributes,
	ResourceInventories,
};
