"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import { ProductFilter, ProductOffering, ProductOfferingGroup } from "../../types";

export enum SalesActions {
	FLUX_SYNC = "Sales_FLUX_SYNC",
	SET_VALUES = "Sales_SET_VALUES",

	GET_PRODUCTS_FROM_CATEGORY = "Sales_GET_PRODUCTS_FROM_CATEGORY",
	GET_PRODUCTS_FROM_CATEGORY_COMPLETE = "Sales_GET_PRODUCTS_FROM_CATEGORY_COMPLETE",
	GET_PRODUCTS_FROM_CATEGORY_FAILED = "Sales_GET_PRODUCTS_FROM_CATEGORY_FAILED",

	GET_AVAILABLE_ADDON_PRODUCTS = "Sales_GET_AVAILABLE_ADDON_PRODUCTS",
	GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE = "Sales_GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE",
	GET_AVAILABLE_ADDON_PRODUCTS_FAILED = "Sales_GET_AVAILABLE_ADDON_PRODUCTS_FAILED",

	GET_AVAILABLE_PLANS = "Sales_GET_AVAILABLE_PLANS",
	GET_AVAILABLE_PLANS_COMPLETE = "Sales_GET_AVAILABLE_PLANS_COMPLETE",
	GET_AVAILABLE_PLANS_FAILED = "Sales_GET_AVAILABLE_PLANS_FAILED",

	QUERY_PRODUCTS_VIA_ADDRESS_ID = "Sales_QUERY_PRODUCTS_VIA_ADDRESS_ID",
	QUERY_PRODUCTS_VIA_ADDRESS_ID_COMPLETE = "Sales_QUERY_PRODUCTS_VIA_ADDRESS_ID_COMPLETE",
	QUERY_PRODUCTS_VIA_ADDRESS_ID_FAILED = "Sales_QUERY_PRODUCTS_VIA_ADDRESS_ID_FAILED",
}

export interface SalesActionPayload<T = {}> extends Action<T & SalesActions> {
	fluxState?: any;
	values?: ConsulValues;
	proposalAddressRegistryId?: string;
	additionalCategory?: string;
	products?: Array<ProductOffering | ProductOfferingGroup>;
	error?: string;
	categoryId?: string;
	targetAgreementId?: string;
	activeInventory?: object /* TODO define a type and use it ! */;
	filters?: Array<ProductFilter>;
}

export const sales = {
	fluxSync: (fluxState: any) => ({ type: SalesActions.FLUX_SYNC, fluxState }),
	setValues: (values: any) => ({ type: SalesActions.SET_VALUES, values }),

	getProductsFromCategory: (
		categoryId: string,
		targetAgreementId?: string,
		activeInventory?: object /* TODO define a type and use it ! */
	): SalesActionPayload => ({ type: SalesActions.GET_PRODUCTS_FROM_CATEGORY, categoryId, targetAgreementId, activeInventory }),

	getProductsFromCategoryComplete: (
		products: Array<ProductOffering | ProductOfferingGroup>,
		filters: Array<ProductFilter>,
		categoryId: string
	): SalesActionPayload => ({
		type: SalesActions.GET_PRODUCTS_FROM_CATEGORY_COMPLETE,
		products,
		filters,
		categoryId,
	}),
	getProductsFromCategoryFailed: (error: any): SalesActionPayload => ({
		type: SalesActions.GET_PRODUCTS_FROM_CATEGORY_FAILED,
		error,
	}),

	getAvailableAddonProducts: (targetAgreementId: string): SalesActionPayload => ({
		type: SalesActions.GET_AVAILABLE_ADDON_PRODUCTS,
		targetAgreementId,
	}),
	getAvailableAddonProductsComplete: (addons: Array<ProductOffering | ProductOfferingGroup>): SalesActionPayload => ({
		type: SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_COMPLETE,
		products: addons,
	}),
	getAvailableAddonProductsFailed: (error: any): SalesActionPayload => ({
		type: SalesActions.GET_AVAILABLE_ADDON_PRODUCTS_FAILED,
		error,
	}),

	getAvailablePlans: () => ({
		type: SalesActions.GET_AVAILABLE_PLANS,
	}),
	getAvailablePlansComplete: (plans: Array<ProductOffering | ProductOfferingGroup>): SalesActionPayload => ({
		type: SalesActions.GET_AVAILABLE_PLANS_COMPLETE,
		products: plans,
	}),
	getAvailablePlansFailed: (error: any): SalesActionPayload => ({
		type: SalesActions.GET_AVAILABLE_PLANS_FAILED,
		error,
	}),

	queryProductOfferingsViaAddressRegistryId: (proposalAddressRegistryId: string, additionalCategory: string): SalesActionPayload => ({
		type: SalesActions.QUERY_PRODUCTS_VIA_ADDRESS_ID,
		proposalAddressRegistryId,
		additionalCategory,
	}),

	queryProductOfferingsViaAddressRegistryIdComplete: (products: Array<ProductOffering>): SalesActionPayload => ({
		type: SalesActions.QUERY_PRODUCTS_VIA_ADDRESS_ID_COMPLETE,
		products,
	}),
	queryProductOfferingsViaAddressRegistryIdFailed: (error: any): SalesActionPayload => ({
		type: SalesActions.QUERY_PRODUCTS_VIA_ADDRESS_ID_FAILED,
		error,
	}),
};
