import { Allowance, AllowanceInfo, Product, ProductOffering } from "../redux/types";
import { UnitOfMeasureEnum } from "../redux/types/UnitOfMeasure";
import ProductOfferingUtil from "./ProductOfferingUtil";

export default class AllowanceUtil {
	static getAllowances(productOffering: ProductOffering | Product): Allowance[] {
		return (productOffering.attributes && productOffering.attributes.allowances) || productOffering.allowances || [];
	}
	static getFirstAllowance(productOffering: ProductOffering | Product, group: string, unitOfMeasure: UnitOfMeasureEnum): Allowance | undefined {
		return AllowanceUtil.getAllowances(productOffering).find(allowance => allowance.group === group && allowance.unitOfMeasure === unitOfMeasure);
	}
	static getAllowanceInfo(allowance: Allowance): AllowanceInfo {
		return {
			value: allowance.value,
			unitOfMeasure: allowance.unitOfMeasure,
			isUnlimited: allowance.value < 0,
			name: ProductOfferingUtil.getCommercialEnrichmentValueFromAllowance(allowance, "names", "name") || "",
		};
	}
}
