import {
	Basket,
	BasketItem,
	BasketValidationInformation,
	Characteristic,
	ChargingBalances,
	ContextualPaymentMethod,
	Price,
	PriceType,
	ProductFilter,
	ProductFilterRangeType,
	ProductOffering,
	ProductOfferingType,
	SubCategory,
} from "../../types";
import PaymentInvocation from "../../types/payment/PaymentInvocation";
import { ProductPriceEnum } from "../../../components/product/ProductPriceType";

interface ProductConfigurationSummary {
	characteristics: any;
	product: ProductOffering;
	resultBasket: Basket;
	updatedProduct: ProductOffering;
}

interface ProductConfigurationInitialization {
	resultBasket: Basket;
	basketItem: BasketItem;
	basketValidationErrors: Array<BasketValidationInformation>;
	chargingBalances: Array<ChargingBalances>;
}

interface SalesState {
	showAgreementSelection: boolean;
	activeAgreementId: string;
	priceType: ProductPriceEnum;
	plans: Array<ProductOffering>;
	availableAddons: Array<ProductOffering>;
	activeAddons: Array<ProductOffering>;
	products: Array<ProductOffering>;
	fetchingProducts: boolean;
	productsFetched: boolean;
	productsFetchFailed: boolean;
	product: ProductOffering;
	productCategory?: string;
	productToConfigure?: ProductOffering;
	productConfigurationSummary?: ProductConfigurationSummary;
	productConfigurationErrors?: any;
	productConfigurationInitialization?: ProductConfigurationInitialization;
	currentProductBundles: Array<ProductOfferingType>;
	searchTerm?: string;
	// FIXME: these types are just my guesses - should be reviewed carefully
	paymentInfo?: PaymentInvocation;
	newPlanPaymentInfo?: PaymentInvocation;
	eligiblePaymentMethods?: ContextualPaymentMethodsWithExtraInfo;
	submittedNewPlanBasket?: Basket;
	alternateProductOfferings?: Array<ProductOffering>;
	addonsCategoryIds?: Array<string>;
	plansCategoryId?: string;
	barcode?: string;
	productNotFound: boolean;
	subCategories: Array<SubCategory>;
	activeFilters: Array<ProductFilter>;
	filters: Array<ProductFilter>;
	onlyFilterUpdated: boolean;
	priceRange: {
		upfront: ProductFilterRangeType,
		recurring: ProductFilterRangeType
	};
	showFilterControls: boolean;
	applyIncludedMinutesFilter: boolean;
	minutesFilterValues?: ProductFilterRangeType;
	minutesRange?: ProductFilterRangeType;
	phonesCategoryId?: string;
	targetAgreementId?: number;
	combinedFilters: any;
	focusedProductId?: string;
	submittedNewPlanBasketItems: any;
	newPlanContextualPaymentMethodId: string | null;
}

type UpdatePriceRangeFunc = (products: Array<ProductOffering>, onlyFilterUpdated: boolean) => void;
type GetBoundariesForPriceRangeFunc = (products?: Array<ProductOffering>) => {
	characteristic: string,
	upfront?: ProductFilterRangeType,
	recurring?: ProductFilterRangeType,
	usage?: ProductFilterRangeType,
	allPrices?: ProductFilterRangeType
};

// TODO: this type is temporary - it should be reviewed, it seems now to contain improper fields
interface ContextualPaymentMethodsWithExtraInfo {
	basketId: string;
	initializedBasket: Basket;
	basketItems: BasketItem;
	contextualPaymentMethods: Array<ContextualPaymentMethod>;
	characteristics: Array<Characteristic>;
	totalPrices: Record<PriceType, Array<Price>>;
}

export {
	SalesState,
	UpdatePriceRangeFunc,
	GetBoundariesForPriceRangeFunc,
	ProductConfigurationSummary,
	ContextualPaymentMethodsWithExtraInfo,
	ProductConfigurationInitialization
};
