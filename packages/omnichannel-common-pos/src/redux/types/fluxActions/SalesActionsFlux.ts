import { ProductOffering } from "../ProductOffering";
import { User } from "../../models/user/user.types";

export type SalesActionGetBundlesForProduct = (productId: string) => void;
export type SalesActionGetProductsFromCategory = (categoryId: string, targetAgreementId?: string, activeInventory?: object) => void;

export type SalesActionSwitchPriceType = (type: string /*TODO: should be type: PriceType*/) => void;
export type SalesActionSelectActiveAgreement = (agreementId: string) => void;
export type SalesActionHandleSearch = (event: any) => void;
export type SalesActionUpdateProductValue = (product: ProductOffering) => void;
export type SalesActionInitializeProductReplace = (indId: string, agrId: string, prodId: string, prodOfferId: string,
												   replaceType: string, configuration: object) => void;
export type SalesActionInitializeNewPlanOrder = (individualId: string | undefined, agreementId: string,
												 product: ProductOffering | undefined, configurations: object) => void;
export type SalesActionSubmitNewPlanOrder = (basketId: string, contextualPaymentMethodId?: string) => void;
export type SalesActionSubmitProductConfiguration = (options: Options) => void;
export type SalesActionInitializeProductConfiguration = (options: Options) => void;
export type SalesActionCancelProductConfiguration = (basketId: string, resetProduct: boolean) => void;
export type SalesActionSubmitInitializedProductConfiguration = (basketId: string) => void;
export type SalesActionCommitProductReplace = (basketId: string, paymentMethodId: string) => void;

export interface Options {
	individualId?: string;
	productId: string;
	inputtedCharacteristics: object;
	enhancedCharacteristics?: object;
}

export interface SalesActionsFlux {
	getBundlesForProduct: SalesActionGetBundlesForProduct;
	getProductsFromCategory: SalesActionGetProductsFromCategory;
	selectActiveAgreement: SalesActionSelectActiveAgreement;
	resetFilters: () => void;
	toggleFilter: (payload: Object) => void;
	toggleCombinedFilter: (payload: Object) => void;
	handlePriceRangeSlider: (value: any) => void;
	updateMinutesFilterValues: (minutesFilterValues: any) => void;
	toggleApplyIncludedMinutesFilter: () => void;
	resetSearch: () => null;
	handleSearch: SalesActionHandleSearch;
	switchPriceType: SalesActionSwitchPriceType;
	updateProductValue: SalesActionUpdateProductValue;
	initializeProductReplace: SalesActionInitializeProductReplace;
	getAvailablePlans: () => void;
	initializeNewPlanOrder: SalesActionInitializeNewPlanOrder;
	submitNewPlanOrder: SalesActionSubmitNewPlanOrder;
	resetNewPlanOrder: () => void;
	getProductById: (id: string) => void;
	getProductsByIds: (ids: Array<string>) => void;
	getAlternateOfferingsForProduct: (productOfferingId: string) => void;
	resetProductChange: () => void;
	commitProductReplace: SalesActionCommitProductReplace;
	submitProductConfiguration: SalesActionSubmitProductConfiguration;
	resetProductConfiguration: () => void;
	getAvailableAddonProducts: (agreementId: string) => void;
	findProduct: (barcode: string, activeCustomer: User, basketId: string) => void;
	saveBarcode: (value: string) => void;
	getProductToConfigure: (id: string) => void;
	initializeProductConfiguration: SalesActionInitializeProductConfiguration;
	cancelProductConfiguration: SalesActionCancelProductConfiguration;
	submitInitializedProductConfiguration: SalesActionSubmitInitializedProductConfiguration;
	endShoppingForSubscription: () => void;
	saveTargetAgreementId: (targetAgreementId?: string) => void;
	getSubCategories: (categoryId: string) => void;
}
