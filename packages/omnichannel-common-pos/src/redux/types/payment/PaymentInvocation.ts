import { PaymentStatus } from "./PaymentStatus";

/**
 * This interface is an exact copy of PaymentInvocation.java class
 */
export default interface PaymentInvocation {
	paymentForm: string;
	paymentCompletedCode: string;
	paymentErrorCode: string;
	paymentCompleted: boolean;
	paymentStatus: PaymentStatus;
}
