import { ContextualPaymentMethod } from "../payment/ContextualPaymentMethod";

export type PaymentActionValidatePayment = (basketId: string, contextualPaymentMethodId: string, paymentParams: any, customerAccountId: string) => void;
export type PaymentActionSelectContextualPaymentMethod = (paymentUseCase: string, contextualPaymentMethod: any,
														   reservationAmountForCreditcardTokenization: number) => Promise<any>;
export type PaymentActionSelectPaymentMethod = (basketId: string, contextualPaymentMethodId?: string | undefined,
												 customerPaymentMethodId?: string | undefined) => Promise<any>;
export type PaymentActionUpdatePaymentMethodName = (methodId?: string, name?: string) => void;
export type PaymentActionValidateResultSIA = (contextualPaymentMethodId: string, paymentParams: any, customerId?: string) => void;
export type PaymentActionHandleProductTopUp = (msisdn: string, alias: string | undefined, amount: number, currency: string,
											   stream: string | undefined, originRequestCode: string, substream: string | undefined) => void;

// think about extracting all function types to types like the one above to ease usage in redux containers
export interface PaymentActionsFlux {
	handleProductTopUp: PaymentActionHandleProductTopUp;
	resetTopUp: () => void;
	getPaymentMethods: (customerAccountId?: string) => void;
	getContextualPaymentMethods: (paymentUseCase: string) => Promise<Array<ContextualPaymentMethod>>;
	terminatePaymentMethod: (methodId?: string | null) => void;
	selectContextualPaymentMethod: PaymentActionSelectContextualPaymentMethod;
	selectPaymentMethod: PaymentActionSelectPaymentMethod;
	updatePaymentMethodName: PaymentActionUpdatePaymentMethodName;
	validatePaymentResultAfterReturningFromTheSIA: PaymentActionValidateResultSIA;
	validatePayment: PaymentActionValidatePayment;
	handlePaymentReject: () => void;
	resetPaymentStore: () => void;
	getEligiblePaymentMethods: (activeBasketId: string) => void;
}
