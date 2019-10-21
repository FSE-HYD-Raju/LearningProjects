import { CustomerPaymentMethod, TopUpPaymentMethodsFilter } from "../redux";
import PaymentUtil from "./PaymentUtil";

const CREDIT_CARD_IDENTIFIER = "creditcard";

describe("PaymentUtil", () => {
	describe("filterPaymentMethods()", () => {
		it("Should not filter out credit-card with proper configuration", () => {
			const paymentMethods = [
				{
				  id: "1c6fac62-14f1-43ef-a41d-730bc1cfd85a",
				  type: "credit-card",
				  attributes: {
					role: "primary",
					validFor: {
					  startDate: "2018-09-25T13:32:39.512Z",
					  endDate: "2018-12-31T23:59:59Z"
					},
					name: "Default credit card",
					type: "credit-card",
					creditCard: {
					  type: null,
					  id: null,
					  name: null,
					  cardHolder: null,
					  cardType: "Mastercard",
					  expiryMonth: 12,
					  expiryYear: 18,
					  maskedCardNumber: "**** **** **** 0014",
					  token: "0000995468873142861"
					}
				  },
				  role: "primary",
				  validFor: {
					startDate: "2018-09-25T13:32:39.512Z",
					endDate: "2018-12-31T23:59:59Z"
				  },
				  name: "Default credit card",
				  creditCard: {
					type: null,
					id: null,
					name: null,
					cardHolder: null,
					cardType: "Mastercard",
					expiryMonth: 12,
					expiryYear: 18,
					maskedCardNumber: "**** **** **** 0014",
					token: "0000995468873142861"
				  }
				}
			  ] as any as Array<CustomerPaymentMethod>;
			const paymentMethodsFilters = {
				type: "inclusive",
				matchTo: [
					{
						type: "credit-card"
					}
				]
			} as any as TopUpPaymentMethodsFilter;
			const result = PaymentUtil.filterPaymentMethods(paymentMethods, paymentMethodsFilters);
			expect(!!result).toBeTruthy();
			expect(result.length).toBe(1);
		});
	});
	describe("Get payment method", () => {
		it("payment method for CreditCard", () => {
			const paymentCreditCart = PaymentUtil.PAYMENT_CREDIT_CARD;
			expect(paymentCreditCart).toBe(CREDIT_CARD_IDENTIFIER);
		});
	});
});
