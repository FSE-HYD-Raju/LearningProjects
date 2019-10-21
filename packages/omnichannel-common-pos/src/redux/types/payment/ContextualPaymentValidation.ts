import { HasId } from "../index";
import { PaymentStatus } from "./PaymentStatus";

/**
 * This interface is an exact copy of ContextualPaymentValidation.java class and is a JsonApiResource
 * This confusing name should be changed in both FE and BE
 */
export interface ContextualPaymentValidation extends HasId {
	contextualPaymentMethodId: string;
	paymentUseCase: string;
	paymentResponse: Object;
	paymentStatus: PaymentStatus;
	customerAccountId: string;
	storeCreditCard: boolean;
	creditCardAlias: string;
}
