import {
	BasketItem,
	ProductOfferingType,
} from "../../redux/types";

const isProductInBasket = (product: ProductOfferingType, basketItems: BasketItem[] | undefined): boolean => {
	if (!product || !basketItems || basketItems.length === 0) {
		return false;
	}
	return Boolean(
		basketItems.find(item =>
			Boolean(item && item.attributes && item.attributes.product && item.attributes.product.id === product.id)
		)
	);
};
export default isProductInBasket;
