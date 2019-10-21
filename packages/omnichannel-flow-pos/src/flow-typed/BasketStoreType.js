/* eslint no-undef: 0 */
import type {ProductOffering} from "./ProductTypes";

declare type BasketStoreType = {
	productIsInBasket: BasketStoreProductIsInBasket
}
declare type BasketStoreProductIsInBasket = (product: ProductOffering) => boolean

export type {
	BasketStoreProductIsInBasket,
	BasketStoreType
}
