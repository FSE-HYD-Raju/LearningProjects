import {
	EnhancedCharacteristic,
} from "../models/basket/basket.types";
import {
	BasketItem,
	ProductOffering,
	TargetLifecycleStatus,
	HasId,
	Specification,
	HasPricesAttributes,
	HasPrices
} from "./index";

interface BasketProductAttributes extends HasId, HasPricesAttributes {
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<EnhancedCharacteristic>>;
	targetLifecycleStatus?: TargetLifecycleStatus;
	targetProductId?: string;
	basketItem?: BasketItem;
	productOffering?: ProductOffering;
	specification?: Specification;
}

interface BasketProductsUpdateAttributes {
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<EnhancedCharacteristic>>;
}

interface BasketProduct extends BasketProductAttributes, HasPrices {
	attributes: BasketProductAttributes;
}

interface BasketProductsUpdate extends BasketProductsUpdateAttributes {
	attributes: BasketProductsUpdateAttributes;
}

export {
	BasketProductAttributes,
	BasketProduct,
	BasketProductsUpdate
};
