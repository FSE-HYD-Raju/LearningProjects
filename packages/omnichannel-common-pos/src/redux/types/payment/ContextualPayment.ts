import PaymentInvocation from "./PaymentInvocation";
import { HasId } from "../HasId";

/**
 * This interface is an exact copy of ContextualPayment.java class
 * This confusing name should be changed in both FE and BE
 */
interface ContextualPaymentAttributes extends HasId {
	contextualPaymentMethodId: string;
	paymentUseCase: string;
	paymentInfo: PaymentInvocation;
	totalAmount: number;
	customerPaymentMethodId: string;
}

interface ContextualPayment extends ContextualPaymentAttributes {
	attributes?: ContextualPaymentAttributes;
}

export {
	ContextualPayment,
	ContextualPaymentAttributes
};
