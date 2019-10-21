import ComparisonSelectors from "./ComparisonSelectors";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";

const product = ProductOfferingUtil.castAsProductOffering({ id: "test" });
const otherProduct = ProductOfferingUtil.castAsProductOffering({ id: "other" });

describe("isItemInComparison", () => {
	it("should return false when no items", () => {
		expect(ComparisonSelectors.isItemInComparison(product, [])).toBeFalsy();
	});
	it("should return false when no items defined", () => {
		expect(ComparisonSelectors.isItemInComparison(product, undefined)).toBeFalsy();
	});
	it("should return false when product not found in items", () => {
		expect(ComparisonSelectors.isItemInComparison(product, [otherProduct])).toBeFalsy();
	});
	it("should return true when product is found in items", () => {
		expect(ComparisonSelectors.isItemInComparison(product, [otherProduct, ProductOfferingUtil.castAsProductOffering({ id: "test" })])).toBeTruthy();
	});
});
