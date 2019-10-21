import { Price } from "./Price";

interface HasPricesAttributes {
	prices?: Array<Price>;
}

interface HasPrices extends HasPricesAttributes {
	attributes?: HasPricesAttributes;
}

export {
	HasPricesAttributes,
	HasPrices
};
