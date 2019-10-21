import { Msisdn } from "./Msisdn";
import { Characteristic } from "./Characteristic";
import { CommercialEnrichments } from "./CommercialEnrichments";
import { ProductOfferingGroup } from "./ProductOfferingGroup";
import { CharacteristicValue } from "./CharacteristicValue";
import { Price } from "./Price";
import { HasLinks } from "./Links";
import { Discount } from "./Discount";
import { Allowance } from "./Allowance";
import { HasId } from "./HasId";
import { HasPrices, HasPricesAttributes } from "./HasPrices";
import { OfferingType } from "./AlternateProductOffering";
import { StockLevel } from "./StockLevel";

export interface ProductOfferingAttributes extends HasPricesAttributes {
	name: string;
	categories: Array<string>;
	featureCharacteristics: Array<CharacteristicValue>;
	inputCharacteristics: Record<string, Characteristic>;
	instanceCharacteristics: Record<string, Characteristic>;
	prices?: Array<Price>;
	priority?: string | null;
	commercialEnrichments: Array<CommercialEnrichments>;
	productOfferingGroups: ProductOfferingGroup[];
	productOfferings: ProductOffering[];
	specificationId?: string;
	productId?: string | null;
	parentOfferingId?: string;
	msisdns?: Array<Msisdn> | null;
	selected?: boolean;
	relationships?: Record<string, HasLinks>;
	childBasketItems?: Array<ProductOffering>;
	inputtedCharacteristics?: Record<string, string>;
	allowances?: Array<Allowance>;
	specSubType?: string;
	specType?: string;
	stockLevel?: StockLevel;
	enhancedCharacteristics?: Record<string, Array<any>>;
	bundlingProductOfferings?: Array<ProductOffering> | null;
	alternateProductOfferings?: Array<ProductOffering> | null;
	discounts?: Array<Discount>;
	optionalProductOfferings?: Array<ProductOffering>;
	offeringType?: OfferingType;
	optionalProductOfferingGroups?: Array<ProductOfferingGroup>;
	commercial?: boolean;
	deliveryMethod?: boolean;
}

export interface ProductOffering extends ProductOfferingAttributes, HasId, HasPrices {
	type?: string;
	attributes?: ProductOfferingAttributes;
}
