import { Price } from "./Price";
import { Person } from "./Person";
import { HasId, HasPrices, HasPricesAttributes, ProductOffering } from "./index";

interface OrderItemAttributes extends HasId, HasPricesAttributes {
	type: string;
	name?: string;
	customUnitPrices?: Array<Price>;
	customPrices?: Array<Price>;
	unitPrices?: Array<Price>;
	person?: Person;
	quantity?: number;
	lifecycleStatus?: string; // OrderLifecycleStatus
	inputtedCharacteristics?: Record<string, string>;
	childOrderItems?: Array<OrderItemAttributes>;
	user?: Person;
	productOffering?: ProductOffering;
	action?: string;
}

interface OrderItem extends OrderItemAttributes, HasPrices {
	attributes?: OrderItemAttributes;
}

export {
	OrderItemAttributes,
	OrderItem
};
