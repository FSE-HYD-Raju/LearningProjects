"use strict";

import { ProductOfferingGroup } from "./ProductOfferingGroup";
import { ProductOffering } from "./ProductOffering";
import { ProductOfferingsConfigObject } from "..";

export type ProductOfferingType = ProductOffering | ProductOfferingGroup;

export interface PathType {
	po?: ProductOfferingType;
	pogId?: string;
}

export type ProductPathElement = {
	po?: string; // product offering id
	pog?: string; // product offering group id
	optionalPo?: string;
};

export type ProductPath = ProductPathElement[];

export type Configurations = Record<string, ProductOfferingsConfigObject>;
