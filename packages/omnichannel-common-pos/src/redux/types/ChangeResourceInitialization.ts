import { BasketItem } from "./BasketItem";
import { Person } from "./Person";
import { Basket, BasketAttributes } from "./Basket";
import { ContextualPaymentMethod } from "./payment/ContextualPaymentMethod";
import { HasId } from "./HasId";

interface ChangeResourceInitializationAttributes extends HasId {
	productId: string;
	basketItem: BasketItem;
	paymentMethods?: Array<ContextualPaymentMethod>;
	paymentUseCase?: string;
	productOfferingId: string;
	specificationId: string;
	agreementId: string;
}

interface ChangeResourceInitialization extends ChangeResourceInitializationAttributes {
	attributes: ChangeResourceInitializationAttributes;
	relationships: {
		owner: { data?: Person };
		basket: { data?: Basket };
	};
	basketItems?: Array<BasketItem>;
}

export { ChangeResourceInitializationAttributes, ChangeResourceInitialization };
