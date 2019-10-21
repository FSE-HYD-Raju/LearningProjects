"use strict";
import { ProductOffering } from "../../types";

export type QueryStates = Record<string, {productOfferingQuery: boolean, optionalOfferingsQuery: boolean}>;

export type ProductOfferings = Record<string, ProductOffering>;

export type ProductOfferingsState = {
    productOfferings: ProductOfferings,
    queryStates: QueryStates
};
