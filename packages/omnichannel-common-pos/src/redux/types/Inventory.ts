import { HasId } from "./HasId";

/**
 * This type corresponds to Inventory.java on the BE
 */
interface InventoryAttributes {
	statuses: Array<string>;
	type?: string;
	"place-name": string; // don't ask about these keys
	"place-id": string;
}

interface Inventory extends InventoryAttributes, HasId {
	attributes?: InventoryAttributes;
}

export {
	Inventory,
	InventoryAttributes
};
