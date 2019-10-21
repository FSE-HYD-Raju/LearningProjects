/* eslint no-undef: 0 */
declare type CustomerCaseStoreState = {
	activeBasket: BasketType,
	basketItems?: Array<{ id: string, attributes?: Object }>,
	checkoutConfiguration: {
		setupConfiguration: Object
	},
	checkoutSteps?: BasketCheckoutSteps,
	requestedMandatoryConfiguration: ?Object,
	showNoCustomerWarning: boolean,
	showBlacklistedCustomerWarning: boolean,
	unidentifiedCustomerBasket: {
		product: ?Object,
		basketId: string
	},
	msisdns: {},
	addonUpdateInProgress: boolean,
	reason: any,
	selectedDiscount: ?ProductOffering,
	discounts: ?Array<ProductOffering>,
	addonEnableError: ?string,
	submittedBasket: BasketType,
	submittedBasketItems: Array<Object>,
	activeCustomerCase: ?{
		attributes: ?{
			activeCustomer: ?{
				id: ?string,
				customerAccountId: ?string
			}
		}
	}
};

export {
	CustomerCaseStoreState
};
