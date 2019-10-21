import { BasketItem } from "./BasketItem";
import { Person } from "./Person";
import { Basket } from "./Basket";
import PaymentInvocation from "./payment/PaymentInvocation";

interface ChangeResourceAttributes {
	id: string;
	basket?: Basket;
	paymentMethodId: string;
	paymentInfo?: PaymentInvocation;
	paymentUseCase?: string;
}

interface ChangeResource extends ChangeResourceAttributes {
	id: string;
	attributes: ChangeResourceAttributes;
	relationships: {
		owner: {data?: Person};
		basket: {data?: Basket};
	};
	basketItems?: Array<BasketItem>;
}

export {
	ChangeResourceAttributes,
	ChangeResource
};
