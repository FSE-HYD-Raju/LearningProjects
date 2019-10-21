import { Agreement, Basket, BasketItem, CustomerCase, Product } from "../../types";

const GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY = "customer_cases_initialize_loading";

// a compound container that contains both Basket and BasketItem
interface CustomerCaseBasket {
	basket: Basket;
	basketItems: Array<BasketItem>;
}

interface CustomerCaseState {
	activeCustomerCase: CustomerCase;
	customerBasketSelectData: {
		customerBaskets: Array<CustomerCaseBasket>;
	};
	agreements?: Array<Agreement>;
	activeAgreementId: string;
	activeAddons: Array<Product>;
	customerAccountId: string;
	customerAccountNumber: string;
}

export { CustomerCaseState, CustomerCaseBasket, GET_CUSTOMER_CASES_INITIALIZE_LOADING_KEY };
