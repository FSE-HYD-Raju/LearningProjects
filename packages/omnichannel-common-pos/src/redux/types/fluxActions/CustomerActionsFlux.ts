import { Customer, User } from "../../../../src/redux/types";

type CustomerActionsCreateCustomer = (
	payload: { customer: Customer, user: User, redirect: () => {} },
	forceAddressUpdate: boolean,
	additionalFields: Array<{ name: string, label: string }>
) => void;

interface CustomerActionsFlux {
	getCustomerById: (customerId: string) => void;
	createCustomer: CustomerActionsCreateCustomer;
	searchCustomerWithSingleTerm: (term: string, criteria: string) => void;
	searchCustomers: (firstName: string, lastName: string) => void;
	validateIdentification: (idType: string, idNumber: number, familyName: string) => void;
	saveSearchTerms: (model: any) => void;
	setSingleTerm: (term: string) => void;
	clearSingleTermSearch: () => void;
	clearSearch: () => void;
	ignoreDuplicates: () => void;
}

export {
	CustomerActionsFlux,
	CustomerActionsCreateCustomer,
};
