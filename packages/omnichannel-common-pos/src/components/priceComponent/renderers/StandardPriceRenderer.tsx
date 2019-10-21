import * as React from "react";
import { PriceRendererProps } from "../PriceComponent";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedNumber from "../../../channelUtils/FormattedNumber";
import { PriceComponentPriceType } from "../model/PriceComponentPriceType";

const StandardPriceRenderer: React.FC<PriceRendererProps> = (props) => {
	return (
		<div className="StandardPriceRenderer pr-container">
			<div className="pr-text-block">
				<FormattedMessage {...props.messages.starting}/>
			</div>
			<div className="pr-prices-block">
				{props.prices.map((price: PriceComponentPriceType) => {
					if (!price.integer || !price.fraction || !price.currency) {
						return null;
					}
					return (
						<div className="pr-price-line" key={price.priceType}>
							<div className="pr-integer pr-currency">
								<FormattedNumber
									style="currency"
									currency={price.currency}
									value={parseInt(price.integer, 10)} // due to fraction displayed separately
									minimumFractionDigits={0}
									maximumFractionDigits={0}
								/>
							</div>
							<div className="pr-fraction">
								<div className="pr-currency pr-fraction-currency">
									{price.fraction}
								</div>
								<div className="pr-payment-type-text">
									{price.priceType === "upfront"
										? (<FormattedMessage {...props.messages.now}/>)
										: (<FormattedMessage {...props.messages.mnth}/>)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StandardPriceRenderer;
