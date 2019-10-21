"use strict";

import { Action } from "redux";
import { ProductOfferingShippingMethod, BasketShippingMethod } from "../../types/ShippingMethod";

export enum DeliveryActions {
	GET_SHIPPING_METHODS_FOR_PO = "Delivery_GET_SHIPPING_METHODS_FOR_PO",
	GET_SHIPPING_METHODS_FOR_PO_COMPLETE = "Delivery_GET_SHIPPING_METHODS_FOR_PO_COMPLETE",
	GET_SHIPPING_METHODS_FOR_PO_FAIL = "Delivery_GET_SHIPPING_METHODS_FOR_PO_FAIL",
	GET_SHIPPING_METHODS_FOR_BASKET = "Delivery_GET_SHIPPING_METHODS_FOR_BASKET",
	GET_SHIPPING_METHODS_FOR_BASKET_COMPLETE = "Delivery_GET_SHIPPING_METHODS_FOR_BASKET_COMPLETE",
	GET_SHIPPING_METHODS_FOR_BASKET_FAIL = "Delivery_GET_SHIPPING_METHODS_FOR_BASKET_FAIL",
}

export interface DeliveryActionPayload extends Action<DeliveryActions> {
	poId?: string;
	basketId?: string;
	postalCode?: string;
	shippingMethods?: ProductOfferingShippingMethod[];
	basketShippingMethods?: BasketShippingMethod[];
}

export const delivery = {
	getShippingMethodsForPO: (poId: string) => ({ type: DeliveryActions.GET_SHIPPING_METHODS_FOR_PO, poId }),
	getShippingMethodsForPOComplete: (poId: string, shippingMethods: ProductOfferingShippingMethod[]) => ({
		type: DeliveryActions.GET_SHIPPING_METHODS_FOR_PO_COMPLETE,
		poId,
		shippingMethods
	}),
	getShippingMethodsForPOFail: (poId: string, error: any) => ({
		type: DeliveryActions.GET_SHIPPING_METHODS_FOR_PO_FAIL,
		error
	}),
	getShippingMethodsForBasket: (basketId: string, postalCode: string) => ({
		type: DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET,
		basketId,
		postalCode
	}),
	getShippingMethodsForBasketComplete: (basketId: string, basketShippingMethods: BasketShippingMethod[]) => ({
		type: DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET_COMPLETE,
		basketId,
		basketShippingMethods,
	}),
	getShippingMethodsForBasketFail: (basketId: string, error: any) => ({
		type: DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET_FAIL,
		basketId,
		error,
	}),
};
