import { HasId } from "../index";

const BALANCE_METHOD_ID = "balance";
const CREDIT_CARD_IDENTIFIER = "creditcard";
const CASH_ON_DELIVERY_IDENTIFIER = "cashOnDelivery";

interface ContextualPaymentMethodAttributes extends HasId {
	label: string;
	balance: number;
}

/**
 * This interface is an exact copy of ContextualPaymentMethod.java class and is a JsonApiResource
 * This confusing name should be changed in both FE and BE
 */
interface ContextualPaymentMethod extends ContextualPaymentMethodAttributes, HasId {
	attributes?: ContextualPaymentMethodAttributes;
}

export {
	ContextualPaymentMethod,
	ContextualPaymentMethodAttributes,
	BALANCE_METHOD_ID,
	CREDIT_CARD_IDENTIFIER,
	CASH_ON_DELIVERY_IDENTIFIER
};
