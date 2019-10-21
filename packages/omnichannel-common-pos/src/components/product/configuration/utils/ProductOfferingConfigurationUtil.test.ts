
import { ProductOffering } from "../../../../redux";
import ProductOfferingConfigurationUtil from "./ProductOfferingConfigurationUtil";

describe("ProductOfferingConfigurationUtil", () => {
	it("should return true when no instance characteristics", () => {
		expect(ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics({} as any as ProductOffering)).toBeTruthy();
		expect(
			ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics({
				instanceCharacteristics: {}
			} as any as ProductOffering)
		).toBeTruthy();
	});
	it("should return false when T_FORM_NAME instance characteristics is MNP", () => {
		expect(
			ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics({
				instanceCharacteristics: {
					T_FORM_NAME: { values: [{ value: "MNP" }] }
				}
			} as any as ProductOffering)
		).toBeFalsy();
	});
	it("should return true when T_FORM_NAME instance characteristics is not MNP", () => {
		expect(
			ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics({
				instanceCharacteristics: {
					T_FORM_NAME: { values: [{ value: "test" }] }
				}
			} as any as ProductOffering)
		).toBeTruthy();
	});
});
