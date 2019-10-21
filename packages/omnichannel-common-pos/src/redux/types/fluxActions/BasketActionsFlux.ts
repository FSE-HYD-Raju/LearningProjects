import {
	Basket,
	BasketItem,
	Configurations,
	InstallationTimeConfig,
	Person,
	ProductOffering,
	ProductOfferingType,
	ProductPath,
	User
} from "../../../index";
import { SalesActionSwitchPriceType } from "./SalesActionsFlux";

export type BasketActionAddProductToBasketOptions = {
	product: ProductOffering;
	configurations?: Configurations;
	parentBasketItem?: BasketItem;
	basketId?: string;
	hasCustomer: boolean;
	targetAgreementId?: string;
	hasTopUps?: boolean;
	salesContext?: object;
};

export type ValidatePreactivatedICCIDParams = {
	iccid: string;
	configuration: object;
	numberOrigin: string;
	path?: ProductPath;
};

export type AddChangePlanBasketItemParams = {
	productOffering: ProductOfferingType,
	basketId: string,
	targetAgreementId: string,
	oldSubscriptionProductId: string
};

export type BasketActionAddProductToBasket = (options: BasketActionAddProductToBasketOptions) => Promise<any>;
export type BasketActionCreateBasket = (personId?: string) => void;
export type BasketActionDiscardBasket = (basketId: string, personId?: string) => void;
export type BasketActionDiscardBackendBasket = (basketId: string, hideErrors?: boolean) => void;
export type BasketActionRemoveFromBasket = (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => void;
export type BasketActionRemoveFromActiveBasket = (basketItem: BasketItem, basketId: string) => void;
export type BasketActionSubmitBasket = (basketId: string, hideLifeCycleStatusChangeModal?: boolean) => Promise<any>;
export type BasketActionValidatePreactivatedICCID = (params: ValidatePreactivatedICCIDParams) => any;
export type BasketActionsCheckPODisability = (user: User, disabilityConfig: any, productOfferingId: string) => void;
export type BasketActionCommitBasket = (basket: Basket, personId: string, redirectTo: string | boolean, organizationId: string | null) => void;
export type BasketActionActivateCheckoutStep = (payload: any) => void;
export type BasketActionGetBasketIncludeBasketItems = (basketId: string) => void;
export type BasketActionGetBasket = (basketId: string) => void;
export type BasketActionUpdateOwnerToBasket = (basket: Basket, owner: Person) => void;
export type BasketActionAddChangePlanBasketItem = (params: AddChangePlanBasketItemParams) => void;

interface InitializeAddonParam {
	basketItem: {
		targetAgreementId: string;
		quantity: number;
		inputtedCharacteristics: Record<string, string>;
		product: { id: string; };
	};
	personId: string;
}

interface BasketActionsFlux {
	getBasketIncludeBasketItems: BasketActionGetBasketIncludeBasketItems;
	getBasket: BasketActionGetBasket;
	updatingBasket: (updatingBasket: boolean) => Promise<boolean>; // ??
	validateImei: (imei: string) => void; // sends CH_IMEI characteristic for validation to the backend
	validateFnF: (FnF: string, msisdn: string) => void; // sends CH_Friend_Number characteristic for validation to the backend
	addProductToBasket: BasketActionAddProductToBasket;
	checkPODisability: BasketActionsCheckPODisability;
	reserveDevice: (id: string, value: string) => void;
	createBasket: BasketActionCreateBasket;
	removeFromActiveBasket: BasketActionRemoveFromActiveBasket;
	removeFromBasket: BasketActionRemoveFromBasket;
	removeFromShippingMethods: (basketItem: BasketItem) => void;
	addBasketItemToActiveBasket: (basketId: string, basketItem: BasketItem) => void;
	enableAddon: (basketId: string, paymentMethod: string) => void;
	updateOwnerToBasket: BasketActionUpdateOwnerToBasket;
	checkoutBasket: (basket: Basket) => Promise<void>;
	updateBasket: (basket: Basket) => Promise<Function>;
	commitBasket: BasketActionCommitBasket;
	storeBasket: (basket: Basket) => void;
	orderBasket: (basketId: string) => void;
	switchPriceType: SalesActionSwitchPriceType;
	submitBasket: BasketActionSubmitBasket;
	discardBasket: BasketActionDiscardBasket;
	getBasketProducts: (basketItemProductId: string) => void;
	cancelAddProduct: () => void;
	updateBasketProduct: (basketProductId: string, productAttributes: any) => void;
	updateBasketProducts: (data: Array<{basketProductId: string, attributes: any}>) => void;
	discardBackendBasket: BasketActionDiscardBackendBasket;
	clearAddonInitializations: () => void;
	initializeAddonEnabling: (params: InitializeAddonParam) => void;
	fetchDiscounts: (basketId: string) => void;
	removeSelectedDiscount: () => void;
	applyDiscountToBasket: (discountProductOffering: ProductOffering) => void;
	activateCheckoutStep: BasketActionActivateCheckoutStep;
	resetCheckoutSteps: () => void;
	addShippingMethodToBasket: () => Promise<boolean>;
	clearOrderBasket: () => void;
	validateICCID: (iccid: string) => any;
	validatePreactivatedICCID: BasketActionValidatePreactivatedICCID;
	triggerICCIDPreactivationValidation: (params: object) => void;
	triggerFnfValidation: (params: object) => void;
	resetValidIcc: () => void;
	resetValidFnF: () => void;
	addChangePlanBasketItem: BasketActionAddChangePlanBasketItem;
	deleteUIbasket: () => null;
	toggleInstallationTimeConfigurationModal: (show: boolean, config?: InstallationTimeConfig | null) => void;
	hideNoCustomerWarning: () => void;
}

interface AddProductToBasketProps {
	onAddToBasket: () => Promise<any>;
}

export {
	InitializeAddonParam,
	BasketActionsFlux,
	AddProductToBasketProps
};
