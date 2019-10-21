interface MonetaryAmount {
	amount: number;
	currency: string;
}
const BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_CREDIT_CARD = "credit-card";
const BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_BALANCE = "balance";
const BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_CASH = "cash";
const BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_RESIDUAL_CREDIT = "residual-credit";

enum BasketPaymentsPaymentStatusEnum {
	COMMITTED = "COMMITTED",
	DEFERRED = "DEFERRED"
}
type BasketPaymentsPaymentStatus = keyof typeof BasketPaymentsPaymentStatusEnum;

interface BasketPaymentReceiptAttributes {
	paymentStatus?: BasketPaymentsPaymentStatus;
	paymentMethod: string;
	returnStatus: string;
	paymentSource: string;
	referenceNumber: string;
	amount: MonetaryAmount;
	characteristics: Map<string, string>;
	createdAt: string;
}

interface BasketPaymentReceipt extends BasketPaymentReceiptAttributes {
	id: string;
	attributes: BasketPaymentReceiptAttributes;
}

export {
	MonetaryAmount,
	BasketPaymentReceipt,
	BasketPaymentReceiptAttributes,
	BasketPaymentsPaymentStatus,
	BasketPaymentsPaymentStatusEnum,
	BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_CREDIT_CARD,
	BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_BALANCE,
	BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_CASH,
	BASKET_PAYMENT_RECEIPT_PAYMENT_METHOD_RESIDUAL_CREDIT
};
