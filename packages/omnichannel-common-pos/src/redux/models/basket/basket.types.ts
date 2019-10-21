import {
	Basket,
	BasketItem,
	ProductOffering,
	BasketProduct,
	ValidityPeriod,
	ShippingMethod,
	Configurations,
	ContextualPaymentMethod,
	ProductPath,
	PostalAddress,
} from "../../types";

import { BasketSelectionActionEnum } from "../../types/BasketSelectionAction";

interface TopupType {
	product: ProductOffering;
	configurations: Configurations;
	parentBasketItem: BasketItem;
	basketId: string;
	hasCustomer: boolean;
}

interface BasketCheckoutSteps {
	activeStep?: string;
	SETUP?: boolean;
	SUMMARY?: boolean;
	visited: {[key: string]: boolean};
}

interface EnhancedCharacteristic {
	value: string;
	validFor?: ValidityPeriod;
}

interface MessagePack {
	errorMessage?: string;
	successMessage?: string;
}

declare type BasketItems = Array<BasketItem>;

interface InitializedAddon {
	id?: string;
	basketId: string;
	paymentUseCase?: string;
	basketItems: Array<BasketItem>;
	paymentMethods?: Array<ContextualPaymentMethod>;
}

interface InstallationTimeConfig {
	path: ProductPath;
	key: string;
}

interface ReasonForAction {
	value: string;
}

interface BasketItemIdToAddress {
	basketItemId: string;
	address: PostalAddress;
}

type BasketState = {
	activeBasket: Basket,
	basketItems: Array<BasketItem>,
	checkoutConfiguration?: {
		setupConfiguration: object
	},
	checkoutSteps?: BasketCheckoutSteps,
	requestedMandatoryConfiguration?: object,
	showNoCustomerWarning: boolean,
	unidentifiedCustomerBasket: {
		product?: ProductOffering,
		basketId: string
	},
	orderBasket?: Basket,
	msisdns: Record<string, Array<string>>,
	initializedAddon?: InitializedAddon;
	addonUpdateInProgress: boolean,
	addonSuccessfullyUpdated?: boolean;
	reason: any,
	selectedDiscount?: ProductOffering,
	discounts?: Array<ProductOffering>,
	addonEnableError?: string,
	submittedBasket?: Basket,
	submittedBasketItems?: Array<BasketItem>,
	committedBasket?: Basket,
	committedBasketItems?: Array<BasketItem>,
	basketProducts?: Array<BasketProduct>;
	productsWithTopUps: Array<ProductOffering>,
	shippingMethods: Array<ShippingMethod>,
	selectedShippingMethod?: ProductOffering,
	showInstallationTimeConfigurationModal: boolean,
	installationTimeConfig?: InstallationTimeConfig;

	updatingBasket: boolean,
	showBasketMenuNotification: boolean,
	sharedBaskets?: Array<Basket>,
	portInData: Object|null,
	validIcc?: boolean,
	validFnF?: boolean,

	openBaskets: Array<Basket>,

	createBasketError?: string,
	discardBasketError?: string,
	storedTopupProduct?: TopupType,
	addonInitializeInProgress?: boolean;
	working?: boolean;
	showBlacklistedCustomerWarning: boolean;
	reasonForAction: ReasonForAction;
	basketItemIdToAddressEntries: Array<BasketItemIdToAddress>;
	isValidIccid?: boolean;
	isPreactivatedIccid?: boolean;
};

export {
	BasketItems,
	BasketCheckoutSteps,
	EnhancedCharacteristic,
	BasketState,
	TopupType,
	BasketSelectionActionEnum,
	InitializedAddon,
	MessagePack,
	InstallationTimeConfig,
	BasketItemIdToAddress,
};
