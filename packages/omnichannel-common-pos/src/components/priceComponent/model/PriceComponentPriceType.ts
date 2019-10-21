import { Price, PriceType, SimplePrice, PriceRange } from "../../../redux/types";

type PriceInfo = SimplePrice | PriceRange;

interface PriceComponentPriceType {
	integer: string;
	fraction: string;
	currency: string;
	priceType: string;
    simplePrice?: SimplePrice | PriceRange;
    originalPrice?: Price;
}

interface PriceParts extends PriceComponentPriceType {
	integer: string;
	fraction: string;
	currency: string;
	priority?: number;
	priceType: PriceType;
	simplePrice?: PriceInfo;
	originalPrice?: Price;
}

export {
	PriceParts,
	PriceInfo,
	PriceComponentPriceType,
};
