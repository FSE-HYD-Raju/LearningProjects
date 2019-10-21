"use strict";

import { mapValues } from "lodash";

import { SalesActions, SalesActionPayload } from "./sales.actions";
import {
	ConsulValues,
	SalesState,
	PriceRange,
	ProductOffering,
	FilterLabelEnum,
	PriceRangeBoundaries,
	ProductFilter,
	ProductFilterTypeEnum,
} from "../../types";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";

export { SalesState };

import { extractValues, splitAddonsByType } from "./sales.utils";
import { ProductPriceEnum } from "../../../components/product/ProductPriceType";

const initialState: Partial<SalesState> = {
	currentProductBundles: [],
	products: [],
	availableAddons: [],
	activeAddons: [],
	priceType: ProductPriceEnum.ALL_PRICES,
	fetchingProducts: false,
	addonsCategoryIds: undefined,
	plansCategoryId: undefined,
	productsFetchFailed: false,
	searchTerm: "",
	barcode: "",
	phonesCategoryId: "",
	productCategory: "",
	focusedProductId: "",
	subCategories: [],
	activeFilters: [],
	filters: [],
	productNotFound: false,
	productsFetched: false,
	onlyFilterUpdated: false,
	showFilterControls: false,
	applyIncludedMinutesFilter: false,
	showAgreementSelection: false,
	combinedFilters: {},
	priceRange: {
		upfront: {
			min: 0,
			max: 0
		},
		recurring: {
			min: 0,
			max: 0
		}
	},
	submittedNewPlanBasketItems: {},
	newPlanContextualPaymentMethodId: null,
};

/* move to selector? */
const getMinutesRange = (filters: ProductFilter[]): PriceRange | undefined => {
	const voiceRange: PriceRange | undefined = filters && filters.find(filter =>
		/* TODO find out where the filter labels come from */
		filter.filterLabel === FilterLabelEnum.VOICE
	);

	if (voiceRange) {
		const min = typeof voiceRange.min !== "undefined" && voiceRange.min;
		const max = typeof voiceRange.max !== "undefined" && voiceRange.max;

		const minutesRange: PriceRange = {};
		if (min && max) {
			minutesRange.min = min < max ? min : 0;
		}
		if (max) {
			minutesRange.max = max;
		}

		return minutesRange;

	} else {
		return undefined;
	}
};

const augmentPriceRanges = (origin: Partial<PriceRange>, destination: Partial<PriceRange>): void => {
	if (typeof destination.min !== "undefined" &&
		typeof origin.min !== "undefined" &&
		destination.min > origin.min) {
		destination.min = Math.floor(origin.min);
	}
	if (typeof destination.max !== "undefined" &&
		typeof origin.max !== "undefined" &&
		destination.max < origin.max) {
		destination.max = Math.ceil(origin.max);
	}
};

/* in flux, this.state.products was given as default value to products */
const getBoundariesForPriceRange = (products?: Array<ProductOffering>):
  PriceRangeBoundaries | null => {
	if (products) {
		const allPricesRanges: PriceRange[] = products.map(product =>
			ProductOfferingUtil.getAllPricesRange(product as ProductOffering)
		);

		const allPricesRange = allPricesRanges.reduce(
			(acc: PriceRange, range: PriceRange) => {
				augmentPriceRanges(range, acc);
				return acc;
			},
			{ min: Number.MAX_SAFE_INTEGER, max: 0 }
		);

		const upfrontRanges = products.map(product =>
			ProductOfferingUtil.getUpfrontPriceRange(product)
		);
		const upfrontRange = upfrontRanges.reduce(
			(acc, range) => {
				augmentPriceRanges(range, acc);
				return acc;
			},
			{ min: Number.MAX_SAFE_INTEGER, max: 0 }
		);

		const recurringRanges = products.map(product =>
			ProductOfferingUtil.getRecurringPriceRange(product)
		);

		const recurringRange = recurringRanges.reduce(
			(acc, range) => {
				augmentPriceRanges(range, acc);
				return acc;
			},
			{ min: Number.MAX_SAFE_INTEGER, max: 0 }
		);

		const usageRanges = products.map(product =>
			ProductOfferingUtil.getUsagePriceRange(product)
		);

		const usageRange = usageRanges.reduce(
			(acc, range) => {
				augmentPriceRanges(range, acc);
				return acc;
			},
			{ min: Number.MAX_SAFE_INTEGER, max: 0 }
		);

		return {
			characteristic: ProductFilterTypeEnum.PRICE_RANGE, /* TODO define as type */
			allPrices: /* TODO change to: [PriceTypeEnum.ALLPRICES]: */
				allPricesRange.min !== Number.MAX_SAFE_INTEGER
					? allPricesRange
					: undefined,
			upfront: /* TODO change to: [PriceTypeEnum.ONE_TIME]: */
				upfrontRange.min !== Number.MAX_SAFE_INTEGER
					? upfrontRange
					: undefined,
			recurring: /* TODO change to: [PriceTypeEnum.RECURRENT]: */
				recurringRange.min !== Number.MAX_SAFE_INTEGER
					? recurringRange
					: undefined,
			usage: /* TODO change to: [PriceTypeEnum.USAGE]: */
				usageRange.min !== Number.MAX_SAFE_INTEGER
					? usageRange
					: undefined
		};
	} else {
		return null;
	}
};

const salesReducer = (state: Partial<SalesState> = initialState, action: SalesActionPayload) => {
	const { type } = action;

	switch (type) {
		case SalesActions.FLUX_SYNC:
			return { ...state, ...action.fluxState };
		case SalesActions.SET_VALUES:
			return {
				...state,
				...extractValues(action.values as ConsulValues)
			};
		case SalesActions.GET_PRODUCTS_FROM_CATEGORY:
			return {
				...state,
				fetchingProducts: true,
				skipFilters: false,
				productsFetched: false,
				productsFetchFailed: false,
			};
		case SalesActions.GET_PRODUCTS_FROM_CATEGORY_COMPLETE:
			const { filters, products } = action;

			const activeFilters =
				filters &&
				filters.filter((filter: ProductFilter) => filter.values)
					.map((filter: ProductFilter) => {
						return {
							...filter,
							values: {
								...mapValues(filter.values, () => false)
							}
						};
					});
			const minutesRange = filters && getMinutesRange(filters);

			return {
				...state,
				fetchingProducts: false,
				productsFetched: true,
				skipFilters: false,
				products: products && ProductOfferingUtil.makeDefaultSelections(products as Array<ProductOffering>),
				activeFilters,
				filters,
				minutesRange,
				minutesFilterValues: minutesRange,
				searchTerm: "",
				applyIncludedMinutesFilter: false,
				combinedFilters: {},
				priceRange: getBoundariesForPriceRange(products as Array<ProductOffering>), /* TODO find out the data in real life */
				productCategory: action.categoryId,
			};
		case SalesActions.GET_PRODUCTS_FROM_CATEGORY_FAILED:
			return {
				...state,
				fetchingProducts: false,
				productsFetched: false,
				productsFetchFailed: true,
				skipFilters: true,
				products: [],
				filters: [],
			};
		case SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE:
			return {
				...state,
				...splitAddonsByType(action.products ? ProductOfferingUtil.makeDefaultSelections(action.products as Array<ProductOffering>) : []),
			};
		case SalesActions.GET_AVAILABLE_PLANS_COMPLETE:
			return {
				...state,
				plans: action.products
			};
		case SalesActions.QUERY_PRODUCTS_VIA_ADDRESS_ID_COMPLETE:
			return {
				...state,
				products: action.products,
				skipFilters: true
			};
		default:
			return state;
	}
};

export default salesReducer;
export {
	initialState as salesInitialState
};
