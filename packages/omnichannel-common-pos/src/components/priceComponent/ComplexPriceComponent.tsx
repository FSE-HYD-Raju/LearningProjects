import { get, isNumber, isNil } from "lodash";

import * as React from "react";
import { PriceComponentPriceType, PriceParts, PriceInfo } from "./model/PriceComponentPriceType";
import SimpleSubscriptionPriceRenderer from "./renderers/SimpleSubscriptionPriceRenderer";
import { withProductConfigurations, ProductConfigurationInputProps } from "../product/withProductConfigurations";
import { Price, PriceType, PriceRange, ProductOfferingsConfigObject } from "../../redux/types";

import { SimplePrice } from "../../redux";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { PriceTypeEnum, ProductOffering, Configurations } from "../../redux";
import messages, { ComplexPriceComponentMessagesType } from "./ComplexPriceComponent.messages";

const pickPrice = (price: PriceInfo, priceAttribute: string): number | undefined => {
	return price ? (isNumber((price as PriceRange).min)
		? (price as PriceRange).min
		: (price as SimplePrice)[priceAttribute]) : undefined;
};

const breakPrice = (args: {
	amount: number;
	currency: string;
	priceType: PriceType;
	originalPrice?: Price;
	simplePrice?: PriceInfo;
	priority?: number;
}): PriceParts => {
	const {amount, currency, priceType, originalPrice, simplePrice, priority} = args;
	const parts = amount.toFixed(2).split(".");
	return {
		integer: parts[0],
		fraction: parts[1],
		priority,
		currency,
		priceType,
		simplePrice,
		originalPrice
	};
};

export interface ProductToPriceMap {
	product: ProductOffering;
	price: PriceParts;
}

export interface ComplexPriceRendererProps {
	priceValueCalculator: (price: PriceComponentPriceType) => number;
	product: ProductOffering;
	productsToSortedPrices: ProductToPriceMap[];
	upfrontPricesTotal: PriceParts | null;
	recurringPricesTotal: PriceParts | null;
	messages: ComplexPriceComponentMessagesType;
}

export type PriceExtractorFunctionType = (product: ProductOffering, priceType: PriceType) => PriceInfo;

export interface ComplexPriceComponentProps extends ProductConfigurationInputProps {
	product: ProductOffering;
	configurations: Configurations;
	// defines a function that should be used for calculating price of the offering
	priceExtractor?: PriceExtractorFunctionType;
	priceAttribute: string;
}

// defines the way the price is transformed before passing to <FormattedNumber> inside renderer
const getPriceValue = (price: PriceComponentPriceType): number => {
	return parseInt(price.integer, 10) + parseInt(price.fraction, 10) * 0.01;
};

const pricePriorityAscComparator = (product1: ProductToPriceMap, product2: ProductToPriceMap): number => {
	const priority1 = !product1.price || isNil(product1.price.priority) ? Infinity : product1.price.priority;
	const priority2 = !product2.price || isNil(product2.price.priority) ? Infinity : product2.price.priority;

	if (priority1 < priority2) {
		return -1;
	} else if (priority1 > priority2) {
		return 1;
	}
	return 0;
};

const getPricesSortedByPriority = (
	products: ProductOffering[],
	priceExtractor: PriceExtractorFunctionType,
	priceAttribute: string,
): ProductToPriceMap[] => {
	return products.reduce(
		(stack: ProductToPriceMap[], po: ProductOffering) => {
			const copyOfPo = {...po};
			const filteredPrices = po.prices ? po.prices : null;
			if (!filteredPrices) {
				return stack;
			}
			const resultPrices = filteredPrices.map((filteredPrice: Price) => {
				copyOfPo.prices = [filteredPrice];
				const priceType = filteredPrice.type;
				// otherwise it's always will be 1t price
				const simplePrice: PriceInfo = priceExtractor(copyOfPo, priceType);
				const priceAmount = pickPrice(simplePrice, priceAttribute);

				if (priceAmount) {
					return {
						product: po,
						price: breakPrice({
							amount: priceAmount,
							priority: filteredPrice.priority,
							currency: filteredPrice.currency!,
							priceType, simplePrice,
							originalPrice: filteredPrice
						})
					};
				} else {
					return null;
				}
			});
			const filteredResulPrices: Array<ProductToPriceMap> =
				resultPrices.filter(price => price !== null) as Array<ProductToPriceMap>;
			if (filteredResulPrices.length === 0) {
				return stack;
			}
			return stack.concat(filteredResulPrices);
		}, [])
		.sort(pricePriorityAscComparator);
};

const add = (a: number, b: number): number => {
	const sum = a + b;
	return Number(sum.toFixed(2));
};

/**
 * A component capable of rendering prices with appropriate i18ized messages based on renderer provided to B2CCheckoutDeliveryIdentificationProps
 *
 * Renderer should be a React.Component<ComplexPriceComponentProps>
 *
 */
const ComplexPriceComponent: React.FC<ComplexPriceComponentProps> = (props: ComplexPriceComponentProps) => {
	// the "extractor" function should be provided via props, defaults to ProductOfferingUtil.getPrice(...)
	// to get price range instead one should use ProductOfferingUtil.getPriceRange(..) but that ignores additional configuration
	const priceExtractor = props.priceExtractor || ProductOfferingUtil.getSimplePrice;
	const { configurations, product, priceAttribute } = props;

	const productConfiguration: ProductOfferingsConfigObject = configurations[product.id] || ({} as ProductOfferingsConfigObject);
	const selectedPOsInProduct = ProductOfferingUtil
		.getSelectedPOsInProduct(product, productConfiguration, false)
		.filter((po: ProductOffering) => po.id !== product.id);

	const productsToSortedPrices = getPricesSortedByPriority(selectedPOsInProduct, priceExtractor, priceAttribute);

	const upfrontPricesTotalAmount = selectedPOsInProduct.reduce((totalAcc: number, po: ProductOffering) => {
		const prices = po.prices ? po.prices : [];
		const upfrontPrices = prices.filter(price => {
			return price.isUpfront === true;
		}).reduce((priceAcc: number, price: Price) => {
			return add(priceAcc, price[priceAttribute]);
		}, 0);
		return add(totalAcc, upfrontPrices);
	}, 0);

	const currency = get(productsToSortedPrices[0], "price.originalPrice.currency", "");

	const upfrontPricesTotal = upfrontPricesTotalAmount !== null ? breakPrice({
		amount: upfrontPricesTotalAmount,
		currency,
		priceType: PriceTypeEnum.ALLPRICES
	}) : null;

	const recurringPricesTotalAmount = selectedPOsInProduct.reduce((totalAcc: number, po: ProductOffering) => {
		const prices = po.prices ? po.prices : [];
		const recurringPrices = prices.filter(price => {
			return price.type === PriceTypeEnum.RECURRENT;
		}).reduce((priceAcc: number, price: Price) => {
			return add(priceAcc, price[priceAttribute]);
		}, 0);
		return add(totalAcc, recurringPrices);
	}, 0);

	const recurringPricesTotal = recurringPricesTotalAmount !== null ? breakPrice({
		amount: recurringPricesTotalAmount,
		currency,
		priceType: PriceTypeEnum.RECURRENT
	}) : null;

	return (
		<SimpleSubscriptionPriceRenderer
			priceValueCalculator={getPriceValue}
			product={product}
			productsToSortedPrices={productsToSortedPrices}
			upfrontPricesTotal={upfrontPricesTotal}
			recurringPricesTotal={recurringPricesTotal}
			messages={messages}
		/>
	);
};

export default ComplexPriceComponent;

export const ComplexPriceComponentWithProductConfiguration = withProductConfigurations<ComplexPriceComponentProps>(ComplexPriceComponent);
