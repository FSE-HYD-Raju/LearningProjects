import { Basket, ProductOffering, CharacteristicValue, EnhancedCharacteristic, Price, TargetLifecycleStatus, HasId } from "./index";

interface BasketItemAttributes extends HasId {
	basket: Basket;
	quantity?: number;
	inputtedCharacteristics: Record<string, string>;
	targetAgreementId?: string;
	basketProductId?: string;
	basketServiceId?: string;
	product?: ProductOffering;
	name?: string;
	childBasketItems: Array<BasketItem>;
	targetLifecycleStatus?: TargetLifecycleStatus;
	unitPrices: Array<Price>;
	totalPrices: Array<Price>;
	reasonForAction?: CharacteristicValue;
	originalUnitPrices: Array<Price>;
	originalTotalPrices: Array<Price>;
	enhancedCharacteristics?: Record<string, EnhancedCharacteristic>;
	parentBasketItem?: BasketItem;
	totalUpfrontPrice: number;
	totalUpfrontPriceWithChildren: number;
	createdAt?: string;
}

interface BasketItem extends BasketItemAttributes {
	attributes?: BasketItemAttributes;
}

export {
	BasketItemAttributes,
	BasketItem
};
