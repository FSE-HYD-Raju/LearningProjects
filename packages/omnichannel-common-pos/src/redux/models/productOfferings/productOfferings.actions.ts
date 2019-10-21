"use strict";

import { Action } from "redux";
import { ProductOffering } from "../../types";

export enum ProductOfferingsActions {
	GET_PRODUCT_OFFERING = "ProductOfferings_GET_PRODUCT_OFFERING",
	GET_PRODUCT_OFFERING_WITH_LOADER = "ProductOfferings_GET_PRODUCT_OFFERING_WITH_LOADER",
	GET_PRODUCT_OFFERING_COMPLETE = "ProductOfferings_GET_PRODUCT_OFFERING_COMPLETE",
	GET_PRODUCT_OFFERING_FAILED = "ProductOfferings_GET_PRODUCT_OFFERING_FAILED",
	GET_OPTIONAL_OFFERINGS = "ProductOfferings_GET_OPTIONAL_OFFERINGS",
	GET_OPTIONAL_OFFERINGS_COMPLETE = "ProductOfferings_GET_OPTIONAL_OFFERINGS_COMPLETE",
	GET_OPTIONAL_OFFERINGS_FAILED = "ProductOfferings_GET_OPTIONAL_OFFERINGS_FAILED",
	ON_ERROR = "ProductOfferings_ON_ERROR"
}

export interface ProductOfferingsActionPayload extends Action<ProductOfferingsActions> {
	productOfferingId: string;
	productOffering?: ProductOffering;
	productOfferings?: Array<ProductOffering>;
	error?: {
		status: number;
		title: string;
		detail: string;
	};
}

export const productOfferings = {
	getProductOffering: (productOfferingId: string) => ({ type: ProductOfferingsActions.GET_PRODUCT_OFFERING, productOfferingId }),
	getProductOfferingWithLoader: (productOfferingId: string) => ({ type: ProductOfferingsActions.GET_PRODUCT_OFFERING_WITH_LOADER, productOfferingId }),
	getProductOfferingComplete: (productOfferingId: string, productOffering: ProductOffering) => ({
		type: ProductOfferingsActions.GET_PRODUCT_OFFERING_COMPLETE,
		productOfferingId,
		productOffering
	}),
	getProductOfferingFailed: (productOfferingId: string) => ({
		type: ProductOfferingsActions.GET_PRODUCT_OFFERING_FAILED,
		productOfferingId
	}),
	getOptionalProductOfferings: (productOfferingId: string) => ({ type: ProductOfferingsActions.GET_OPTIONAL_OFFERINGS, productOfferingId }),
	getOptionalProductOfferingsComplete: (productOfferingId: string, productOfferings: Array<ProductOffering>) => ({
		type: ProductOfferingsActions.GET_OPTIONAL_OFFERINGS_COMPLETE,
		productOfferingId,
		productOfferings
	}),
	getOptionalProductOfferingsFailed: (productOfferingId: string) => ({
		type: ProductOfferingsActions.GET_OPTIONAL_OFFERINGS_FAILED,
		productOfferingId
	})
};
