import { CustomerPaymentMethod } from "./CustomerPaymentMethod";

export interface CreditCard extends CustomerPaymentMethod {
	cardHolder: string;
	cardType: string; // visa, mastercard, etc.
	expiryMonth: number; // 1 - 12
	expiryYear: number; // 00 - 99
	maskedCardNumber: string; // "XXXX XXXX XXXX 1234"
	token: string; // token is used to "bind" a real credit card to an appropriate payment option inside payment provider (e.g. SIA)
}
