import {
	SimplePrice,
	ProductOfferingGroup,
	PriceTypeEnum
} from "../../../../redux/types";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";

export type SelectedProductOfferingProperties = {
	selectedProductId?: string;
	// TODO: undefined handling for both prices or optional props in POG*.tsx components
	upfrontPrice?: SimplePrice;
	recurringPrice?: SimplePrice;
};

const getSelectedProductOfferingProperties = (pog: ProductOfferingGroup): SelectedProductOfferingProperties => {
	const productOfferings = ProductOfferingUtil.getProductOfferingsSafe(pog);
	const selectedProduct = productOfferings.find(po => Boolean(po.selected));
	const selectedProductId = selectedProduct && selectedProduct.id;

	const upfrontPrice = selectedProduct && ProductOfferingUtil.getPrice(selectedProduct, PriceTypeEnum.ONE_TIME);
	const recurringPrice = selectedProduct && ProductOfferingUtil.getPrice(selectedProduct, PriceTypeEnum.RECURRENT);
	return {
		selectedProductId,
		upfrontPrice,
		recurringPrice
	};
};
export default getSelectedProductOfferingProperties;
