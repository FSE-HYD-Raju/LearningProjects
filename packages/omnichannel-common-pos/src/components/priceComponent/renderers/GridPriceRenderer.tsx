import * as React from "react";
import { PriceRendererProps } from "../PriceComponent";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedNumber from "../../../channelUtils/FormattedNumber";
import { PriceComponentPriceType } from "../model/PriceComponentPriceType";

const GridPriceRenderer: React.FC<PriceRendererProps> = (props) => {
	return (
		<div className="GridPriceRenderer">
			{props.prices.map((price: PriceComponentPriceType) => {
				if (!price.integer || !price.fraction || !price.currency) {
					return null;
				}
				const isUpfront = price.priceType === "upfront";
				return (
					<div className="GridPriceRenderer-price-line" key={price.priceType}>
						<div className="GridPriceRenderer-price-value">
							<FormattedNumber
								style="currency"
								currency={price.currency}
								value={props.priceValueCalculator(price)}
								minimumFractionDigits={2}
								maximumFractionDigits={2}
							/>
						</div>
						<div className="GridPriceRenderer-payment-type-text">
							{!isUpfront && <FormattedMessage {...props.messages.monthly}/>}
							{isUpfront && <FormattedMessage {...props.messages.now}/>}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default GridPriceRenderer;
