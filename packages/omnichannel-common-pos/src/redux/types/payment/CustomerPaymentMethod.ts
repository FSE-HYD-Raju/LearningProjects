import { CreditCard } from "./CreditCard";
import { ValidityPeriod } from "../ValidityPeriod";
import { CustomerPaymentMethodType } from "./CustomerPaymentMethodType";
import { Role } from "./Role";
import { HasId } from "../HasId";

interface CustomerPaymentMethodAttributes extends HasId {
	name: string;
	type: CustomerPaymentMethodType;
	creditCard: CreditCard;
	validFor: ValidityPeriod;
	role: Role;
}

interface CustomerPaymentMethod extends CustomerPaymentMethodAttributes {
	attributes?: CustomerPaymentMethodAttributes;
}

interface ValidCreditCard {
	type: string;
	id: string;
	name: string;
	cardHolder: string;
	cardType: string;
	expiryMonth: number;
	expiryYear: number;
	maskedCardNumber: string;
	token: string;
}

interface ValidatedPaymentMethod {
	id: string;
	name: string;
	type: string;
	creditCard: ValidCreditCard;
	validFor: {
		startDate: Date
		endDate: Date
	};
	role: string;
}

export {
	ValidCreditCard,
	ValidatedPaymentMethod,
	CustomerPaymentMethod,
	CustomerPaymentMethodAttributes
};
