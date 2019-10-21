import { FC } from "react";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { ProductOffering, PriceTypeEnum, SimplePrice } from "../../../redux/types";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedNumber from "../../../channelUtils/FormattedNumber";
import cssns from "../../../utils/cssnsConfig";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { ComplexPriceRendererProps, ProductToPriceMap } from "../ComplexPriceComponent";
import { PriceComponentPriceType } from "../model/PriceComponentPriceType";
import { ComplexPriceComponentMessagesType } from "../ComplexPriceComponent.messages";
import CmsPopoverContainer from "../../cms/popover/CmsPopoverContainer";

const { React } = cssns("SimpleSubscriptionPriceRenderer");

export interface PriceLineComponentProps {
	product: ProductOffering;
	price: PriceComponentPriceType;
	priceValueCalculator: (price: PriceComponentPriceType) => number;
	messages: ComplexPriceComponentMessagesType;
}

const PriceLine: FC<PriceLineComponentProps> = (props, context: ContextType) => {
	const { product, price } = props;
	const { formatNumber } = context.intl;

	const isValidPrice = Boolean(price && price.integer && price.fraction && price.currency);
	if (!isValidPrice) {
		return null;
	}

	const isOneTimePrice = price && price.priceType === PriceTypeEnum.ONE_TIME;
	const priceTitle = ProductOfferingUtil.getPriceName(product, price);
	const decimals = Number(price.fraction) === 0 ? 0 : 2;

	return (
		<div className="price-line" key={product.id}>
			<div className="price-title">
				{priceTitle}
			</div>
			{isValidPrice && (<div className="price-container">
				<div className={"price-value" + (isOneTimePrice ? " upfront" : "")} data-test-name="amount">
					{formatNumber(Number((price.simplePrice as SimplePrice).taxIncludedAmount), {
						style: "currency",
						currency: price.currency,
						minimumFractionDigits: decimals,
						maximumFractionDigits: 2
					})}
				</div>
				{!isOneTimePrice && (<div className="payment-type-text">
						<FormattedMessage
							{...props.messages.monthShorthand}
						/>
					</div>
				)}
			</div>)}
		</div>
	);
};

PriceLine.contextTypes = contextTypesValidationMap;

const SimpleSubscriptionPriceRenderer: FC<ComplexPriceRendererProps> = (props: ComplexPriceRendererProps, context: ContextType) => {
	const { upfrontPricesTotal, productsToSortedPrices, recurringPricesTotal } = props;
	const hasPrice = productsToSortedPrices && productsToSortedPrices.length;
	return (
		<div className="this">
			<div className="pricelines-container" data-test-name="pricelines-container">
				{hasPrice && productsToSortedPrices.map((entry: ProductToPriceMap, index: number) => {
					const {price} = entry;
					return <PriceLine
						key={`${entry.product.id}-${index}`}
						product={entry.product}
						price={price}
						priceValueCalculator={props.priceValueCalculator}
						messages={props.messages}
					/>;
				})}
			</div>
			<div className="priceSum-container" data-test-name="priceSum-container">
				{recurringPricesTotal && <div className="price-block" data-test-name="recurring-price-block">
					<div className="tooltip-icon">
						<CmsPopoverContainer
							flux={context.flux}
							id="oneTimePricePopover"
							fragmentId="product_common_description_PriceBannerMonthlyFee"
							publishTarget="b2c"
						/>
					</div>
					<div className="price-sum-header">
						<div className="price-type">
							<FormattedMessage {...props.messages.monthlyFees} />
						</div>
						<div className="price-type-additional">
							<FormattedMessage {...props.messages.monthlyFeesAdditionalText} />
						</div>
					</div>
					<div className="price-amount" data-test-name="recurring-sum">
						<FormattedNumber
							style="currency"
							currency={recurringPricesTotal!.currency}
							value={Number(recurringPricesTotal!.integer) + (Number(recurringPricesTotal!.fraction) / 100)}
							minimumFractionDigits={2}
							maximumFractionDigits={2}
						/>
					</div>
				</div>}
				{upfrontPricesTotal && <div className="price-block" data-test-name="one-time-price-block">
					<div className="tooltip-icon">
						<CmsPopoverContainer
							flux={context.flux}
							id="oneTimePricePopover"
							fragmentId="product_common_description_PriceBannerPayNow"
							publishTarget="b2c"
						/>
					</div>
					<div className="price-sum-header">
						<div className="price-type">
							<FormattedMessage {...props.messages.payNow} />
						</div>
						<div className="price-type-additional">
							<FormattedMessage {...props.messages.payNowAdditionalText} />
						</div>
					</div>
					<div className="price-amount pay-now" data-test-name="one-time-sum">
						<FormattedNumber
							style="currency"
							currency={upfrontPricesTotal!.currency}
							value={Number(upfrontPricesTotal!.integer) + (Number(upfrontPricesTotal!.fraction) / 100)}
							minimumFractionDigits={2}
							maximumFractionDigits={2}
						/>
					</div>
				</div>}
			</div>
		</div>
	);
};
SimpleSubscriptionPriceRenderer.contextTypes = contextTypesValidationMap;

export default SimpleSubscriptionPriceRenderer;
