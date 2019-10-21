import * as React from "react";
import { PriceRendererProps } from "../PriceComponent";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedNumber from "../../../channelUtils/FormattedNumber";
import { PriceComponentPriceType } from "../model/PriceComponentPriceType";

const ProductPriceRenderer: React.FC<PriceRendererProps> = props => {
	return (
		<div className="ProductPriceRenderer container">
			{props.prices.map((price: PriceComponentPriceType) => {
				if (!price.integer || !price.fraction || !price.currency) {
					return null;
				}
				const isUpfront = price.priceType === "upfront";
				return (
					<div className="ProductPriceRenderer-price-line" key={price.priceType}>
						<div className="pr-price-title">
							{isUpfront ?
								<FormattedMessage{...props.messages.payNow}/> :
								<FormattedMessage{...props.messages.recurring}/>}
						</div>
						<div className={"pr-price-value" + (isUpfront ? " upfront" : "")}>
							<FormattedNumber
								style="currency"
								currency={price.currency}
								value={props.priceValueCalculator(price)}
								minimumFractionDigits={2}
								maximumFractionDigits={2}
							/>
						</div>
						<div className="ProductPriceRenderer-payment-type-text">
							{!isUpfront && <FormattedMessage{...props.messages.monthly}/>}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ProductPriceRenderer;
