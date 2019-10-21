import { ProductOfferingGroup } from "./ProductOfferingGroup";
import { ProductOffering } from "./ProductOffering";
import { HasId } from "./index";

enum ShippingMethodType {
	HOME_DELIVERY = "HOME_DELIVERY"
}
// TODO: leave one common type
// used in checkout delivery
interface ShippingMethod extends HasId {
	data: ProductOfferingGroup;
}
// used in eCare delivery
interface ProductOfferingShippingMethod extends HasId {
	type: ShippingMethodType;
	productOffering: ProductOffering;
}

interface BasketShippingMethod extends HasId {
	attributes: {
		productOffering: ProductOffering;
	};
}

export {
	ShippingMethodType,
	ShippingMethod,
	ProductOfferingShippingMethod,
	BasketShippingMethod,
};
