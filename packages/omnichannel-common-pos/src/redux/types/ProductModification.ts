import { Basket } from "./Basket";
import { HasId } from "./HasId";
import { BasketItem } from "./BasketItem";
import { ContextualPaymentMethod, Person, Product, ProductOffering, Service, ServiceAttributes } from "./index";
import { LifecycleChangeAction } from "./LifecycleChangeAction";
import PaymentInvocation from "./payment/PaymentInvocation";

interface ProductModificationAttributes {
	paymentMethodId: string;
	paymentInfo: PaymentInvocation;
	paymentUseCase: string;
}

interface ProductModification extends HasId {
	attributes?: ProductModificationAttributes;
}

interface ProductModificationCombined {
	resource: ProductModification;
	basket?: Basket;
	products: Array<ProductOffering>;
	basketItems: Array<BasketItem>;
}

interface ProductModificationResult {
	data: ProductModification;
	included: Array<any>;
}

export {
	ProductModification,
	ProductModificationAttributes,
	ProductModificationCombined,
	ProductModificationResult
};
