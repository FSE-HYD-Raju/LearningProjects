import * as React from "react";
import { isNumber } from "lodash";
import { PriceType, SimplePrice } from "../../redux/types";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { PriceTypeEnum, PriceRange } from "../../redux";
import { PriceComponentPriceType, PriceInfo } from "./model/PriceComponentPriceType";
import { Configurations, ProductOffering } from "../../redux/types";
import { withProductConfigurations, ProductConfigurationInputProps } from "../product/withProductConfigurations";
import messages, { PriceComponentMessagesType } from "./PriceComponent.messages";
import { FormattedMessageDescriptor } from "../../channelUtils";

interface PriceComponentProps extends ProductConfigurationInputProps {
	configurations: Configurations;
	renderer: React.ComponentType<PriceRendererProps>;
	product: ProductOffering;
	// defines a function that should be used for calculating price of the offering
	priceExtractor?: (product: ProductOffering, priceType: PriceType, priceAttribute: string) => PriceInfo;
	priceAttribute: string;
}

interface PriceRendererProps {
	configurations: Configurations;
	prices: PriceComponentPriceType[];
	priceValueCalculator: (price: PriceComponentPriceType) => number;
	product: ProductOffering;
	messages: PriceComponentMessagesType;
}

// defines the way the price is transformed before passing to <FormattedNumber> inside renderer
const getPriceValue = (price: PriceComponentPriceType): number => {
	const negativityMultiplicator = +price.integer >= 0 ? 1 : -1;
	return parseInt(price.integer, 10) + negativityMultiplicator * parseInt(price.fraction, 10) * 0.01;
};

	// in case we are dealing with price range - use its "min" value, otherwise use taxFreeAmount

const pickPrice = (price: PriceInfo, priceAttribute: string): number | undefined => {
	const pick = price ? (isNumber((price as PriceRange).min)
		? (price as PriceRange).min
		: (price as SimplePrice)[priceAttribute]) : undefined;
	return pick;
};

/**
 * A component capable of rendering prices with appropriate i18ized messages based on renderer provided to B2CCheckoutDeliveryIdentificationProps
 *
 * Renderer should be a React.Component<PriceRendererProps>
 *
 */
const PriceComponent: React.FC<PriceComponentProps> = (props: PriceComponentProps) => {
	if (!props.renderer) {
		window.console.warn("No Renderer provided to PriceComponent");
		return null;
	}

	// the "extractor" function should be provided via props, defaults to ProductOfferingUtil.getPrice(...)
	// to get price range instead one should use ProductOfferingUtil.getPriceRange(..) but that ignores additional configuration
	const priceExtractor = props.priceExtractor || ProductOfferingUtil.getPrice;

	const { priceAttribute } = props;

	const upFrontPrice: PriceInfo = priceExtractor(props.product, PriceTypeEnum.ONE_TIME, priceAttribute);
	const recurringPrice: PriceInfo = priceExtractor(props.product, PriceTypeEnum.RECURRENT, priceAttribute);

	const upFrontSource = pickPrice(upFrontPrice, priceAttribute);

	const recurringSource = pickPrice(recurringPrice, priceAttribute);

	const prices: PriceComponentPriceType[] = [];

	// TODO: this should probably re-implemented, since we have number formatting in renderers too
	if (upFrontSource) {
		const formattedUpfront = {
			integer: upFrontSource.toFixed(2).split(".")[0],
			fraction: upFrontSource.toFixed(2).split(".")[1],
			currency: upFrontPrice.currency || "",
			priceType: "upfront",
			simplePrice: undefined,
			originalPrice: undefined
		};
		// FIXME: check if there is a need to display price if it is equal to zero or undefined
		prices.push(formattedUpfront);
	}

	if (recurringSource) {
		const formattedRecurring = {
			integer: recurringSource.toFixed(2).split(".")[0],
			fraction: recurringSource.toFixed(2).split(".")[1],
			currency: recurringPrice.currency || "",
			priceType: "recurring",
			simplePrice: undefined,
			originalPrice: undefined
		};
		prices.push(formattedRecurring);
	}

	const Renderer = props.renderer;
	return (
		<Renderer
			configurations={props.configurations}
			prices={prices}
			priceValueCalculator={getPriceValue}
			product={props.product}
			messages={messages}
		/>
	);
};

export default PriceComponent;
const PriceComponentWithProductConfiguration = withProductConfigurations<PriceComponentProps>(PriceComponent);
export { PriceComponentProps, PriceRendererProps, PriceInfo, PriceComponentWithProductConfiguration };
