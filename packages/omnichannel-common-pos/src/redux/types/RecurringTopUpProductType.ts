import { RecurringTopUpCharacteristicsValue } from "./RecurringTopUpCharacteristicsValue";
import { CustomerPaymentMethod } from "./payment/CustomerPaymentMethod";

interface RecurringTopUpProductType {
	characteristicsValue: RecurringTopUpCharacteristicsValue;
	subscription?: string;
	agreementId: string;
	productId: string;
	productOfferingId: string;
	paymentMethod?: CustomerPaymentMethod;
}
export { RecurringTopUpProductType };
