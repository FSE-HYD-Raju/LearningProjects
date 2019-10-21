import { CommonPerson } from "./CommonPerson";
import { Agreement } from "./Agreement";
import { RelatedPerson } from "./RelatedPerson";
import { Basket, BillingBalance, CustomerAccount, Order } from "../types";

interface PersonAttributes extends CommonPerson {
	agreements?: Array<Agreement>;
	relatedPersons?: Array<RelatedPerson>;
	orders?: Array<Order>;
	baskets?: Array<Basket>;
	transactionEvents?: Array<any>; // List<TransactionEvent>
	customerAccountId?: string;
	customerAccount?: CustomerAccount;
	billingBalances?: Array<BillingBalance>;
	additionalNumber?: string;
}

interface Person extends PersonAttributes {
	attributes: PersonAttributes;
}

interface PersonsResponse {
	data: Person;
	included?: Array<any>;
}

export {
	PersonAttributes,
	Person,
	PersonsResponse
};
