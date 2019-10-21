import { isMatch } from "lodash";
import { BALANCE_METHOD_ID, ChargingBalances, ContextualPaymentMethod, CustomerPaymentMethod, TopUpPaymentMethodsFilter } from "../redux";
import { CreditCard, CustomerPaymentMethodType, CREDIT_CARD_IDENTIFIER } from "../redux/types";

type AnyPaymentMethod = ContextualPaymentMethod | CustomerPaymentMethod;
interface CreditCardPresentation {
	id: string;
	cardType: string;
	cardEnding: string;
}
class PaymentUtil {
	static PAYMENT_CREDIT_CARD: string = CREDIT_CARD_IDENTIFIER;
	static filterPaymentMethods(paymentMethods: Array<AnyPaymentMethod>, paymentMethodsFilters: TopUpPaymentMethodsFilter) {
		const makeIncludeOrExcludeFunction = (filterType: string) => {
			return (isFilterMatch: boolean) => Boolean((isFilterMatch && filterType === "inclusive") || (!isFilterMatch && filterType === "exclusive"));
		};

		const includeOrExclude = makeIncludeOrExcludeFunction(paymentMethodsFilters.type);

		const isMatchFunction = (paymentMethod: CustomerPaymentMethod | ContextualPaymentMethod): boolean =>
			paymentMethodsFilters.matchTo!.some((matcherObject: any) => isMatch(paymentMethod, matcherObject));

		return paymentMethods.filter((paymentMethod: AnyPaymentMethod) => includeOrExclude(isMatchFunction(paymentMethod)));
	}

	static getActiveCustomerPaymentMethods(paymentMethods?: Array<CustomerPaymentMethod>): Array<CustomerPaymentMethod> {
		return !Array.isArray(paymentMethods)
			? []
			: paymentMethods.filter(method => method.attributes && (!method.attributes.validFor || !method.attributes.validFor.expired));
	}
	static isCreditCard(customerPaymentMethod: CustomerPaymentMethod): boolean {
		return Boolean(customerPaymentMethod.attributes && customerPaymentMethod.attributes.type === CustomerPaymentMethodType.CREDIT_CARD);
	}
	static getCreditCardPresentation(customerPaymentMethod: CustomerPaymentMethod): CreditCardPresentation {
		const creditCard: CreditCard | undefined = customerPaymentMethod.attributes && customerPaymentMethod.attributes.creditCard;
		return {
			id: customerPaymentMethod.id,
			cardType: (creditCard && creditCard.cardType) || "",
			cardEnding: (creditCard && creditCard.maskedCardNumber.slice(-4)) || "",
		};
	}
	static getCreditCardsPresentation(customerPaymentMethods: CustomerPaymentMethod[]): CreditCardPresentation[] {
		return customerPaymentMethods.filter(PaymentUtil.isCreditCard).map(PaymentUtil.getCreditCardPresentation);
	}
	private static formatExpiryYear(expiryYear: number): string {
		return String(expiryYear <= 99 ? expiryYear + 2000 : expiryYear);
	}
	static formatCreditCardExpireDate(creditCard: CreditCard): string {
		const { expiryMonth, expiryYear } = creditCard;
		return `${expiryMonth} / ${PaymentUtil.formatExpiryYear(expiryYear)}`;
	}
	static isBalancePaymentMethodId(paymentMethodId: string): boolean {
		return paymentMethodId === BALANCE_METHOD_ID;
	}
	static isBalancePaymentMethod(paymentMethod: ContextualPaymentMethod): boolean {
		return PaymentUtil.isBalancePaymentMethodId(paymentMethod.id);
	}

	/**
	 * Create ChargingBalances object from one contextual payment method with id "balance"
	 * Note: currency will be undefined, because payment method has only balance value
	 */
	static getBalanceFromPaymentMethods(paymentMethods: ContextualPaymentMethod[]): ChargingBalances | undefined {
		const balancePaymentMethod = paymentMethods.find(PaymentUtil.isBalancePaymentMethod);
		return (
			balancePaymentMethod && {
				id: balancePaymentMethod.id,
				name: balancePaymentMethod.label,
				value: balancePaymentMethod.balance,
			}
		);
	}
}

export { AnyPaymentMethod, CreditCardPresentation };
export default PaymentUtil;
