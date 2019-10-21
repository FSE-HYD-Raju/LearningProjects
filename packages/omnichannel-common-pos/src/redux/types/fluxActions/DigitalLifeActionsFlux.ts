import { Reason } from "../Reason";
import { ProductOffering } from "../ProductOffering";
import { Resource } from "../Resource";
import { CustomerAccount, Person, User } from "../../types";

interface InitializeChangeMsisdnConfig {
	productId: string;
	reason: Reason;
	numberClass: ProductOffering;
	targetResource: Resource;
	selectedMsisdn: string;
	userId: string;
}

type DigitalLifeActionGetAgreements = (user: Person) => void;
type DigitalLifeActionGetAgreement = (agreementId: string) => void;

interface DigitalLifeActionsFlux {
	getAgreements: DigitalLifeActionGetAgreements;
	getAgreement: DigitalLifeActionGetAgreement;
	fetchNumberTypesForChangeMsisdnModal: (agreementId: string) => void;
	fetchMsisdnsForNumberClass: (numberClassId: string) => void;
	clearChangeMsisdn: (basketId?: string) => void;
	initializeChangeMsisdn: (config: InitializeChangeMsisdnConfig) => void;
	commitMsisdnChange: (paymentMethodId: string, basketId: string) => void;

	// new
	getBaskets: (user?: User) => void;
	getOrders: (user?: User) => void;
	getPersonsOrders: (personId: string, queryParams: string) => void;
	getCustomerAccounts: (customerAccountId: string) => void;
	updateCustomerAccount: (account: CustomerAccount) => void;
	updateSearchTerm: (searchTerm: string) => void;
	getOrderByOrderId: (orderId: string) => void;
	getBasketPaymentReceipts: (basketId: string) => void;
	setActiveOrderStatusFilters: (filters: Array<string>) => void;
	closeFilterControls: () => void;
	openFilterControls: () => void;
	showSearchField: () => void;
	closeSearchField: () => void;
}

export {
	DigitalLifeActionsFlux,
	DigitalLifeActionGetAgreements,
	DigitalLifeActionGetAgreement,
	InitializeChangeMsisdnConfig,
};
