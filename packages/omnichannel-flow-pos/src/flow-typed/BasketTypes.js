/* eslint no-undef: 0 */

import type { ProductOffering } from "./ProductTypes";

declare type BasketStoreProductIsInBasket = (product: ProductOffering) => boolean;

declare type BasketStoreType = {
	productIsInBasket: BasketStoreProductIsInBasket,
	activeBasket: BasketType,
	basketItems?: BasketItemsType,
	checkoutSteps?: BasketCheckoutSteps,
	orderBasket?: Object,
	submittedBasket: BasketType,
	submittedBasketItems: Array<Object>,
	getCost: (ItemOrBasket: Object, type: string) => Function,
	checkoutConfiguration?: {
		deliveryConfiguration: Object
	},
	saveDeliveryConfiguration?: Function,
	updatingBasket: boolean,
	portInData: Object|null
};

declare type BasketCheckoutSteps = {
	activeStep?: string,
	SETUP?: boolean,
	SUMMARY?: boolean,
	visited?: [{ [key: string] : boolean }]
};

declare type BasketType = {
	id: string,
	attributes?: {
		rows: Array<{ id: string }>,
		upfrontPrices: any, // TODO Add proper type here. FIX ME
		lifecycleStatus: string,
		referenceNumber: string
	}
};

declare type BasketItemType = { id: string, attributes?: Object };

declare type BasketItemsType = Array<BasketItemType>;

export {
	BasketItemType,
	BasketItemsType,
	BasketStoreType,
	BasketStoreProductIsInBasket,
	BasketCheckoutSteps,
	BasketType
};
