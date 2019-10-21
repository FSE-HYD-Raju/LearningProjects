import { Customer } from "../../types";

interface CustomerCaseActionsFlux {
	getAgreements: (customerId: string) => void;
	getAgreement: (agreementId: string) => void;
	createNewCustomerCase: (salesRepId?: string) => void;
	updateCustomerCase: () => void;
	setCustomer: (customer: Customer, fetchUserBaskets?: boolean) => void;
	endCustomerCase: (location?: Location) => void;
	setCustomerOpenBaskets: (baskets: any) => void;
	clearCustomerBasketsData: () => void;
	changeCustomerActiveAgreement: (activeAgreementId?: string | null, discardBasket?: boolean) => void;
}

export {
	CustomerCaseActionsFlux,
};
