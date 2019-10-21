import isProductInBasket from "./isProductInBasket";
import { BasketItem } from "../../redux";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";

const makeBasketItemById = (productId: string): BasketItem =>
	({
		id: "basketItemId" + productId,
		attributes: {
			product: {
				id: productId
			}
		}
	} as any);

describe("isProductInBasket", () => {
	it("should return false when no basket items", () => {
		expect(isProductInBasket(ProductOfferingUtil.castAsProductOffering({}), [])).toBeFalsy();
	});
	it("should return false when basket items are not defined", () => {
		expect(isProductInBasket(ProductOfferingUtil.castAsProductOffering({}), undefined)).toBeFalsy();
	});
	it("should return false when product not found in basket items", () => {
		expect(isProductInBasket(ProductOfferingUtil.castAsProductOffering({ id: "test" }), [makeBasketItemById("other")])).toBeFalsy();
	});
	it("should return true when product found in basket items", () => {
		expect(
			isProductInBasket(ProductOfferingUtil.castAsProductOffering({ id: "test" }), [
				makeBasketItemById("other"),
				makeBasketItemById("test")
			])
		).toBeTruthy();
	});
});
