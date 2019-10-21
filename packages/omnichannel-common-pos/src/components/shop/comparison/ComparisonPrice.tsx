import cssns from "../../../utils/cssnsConfig";
import OcCurrency from "../../ocComponents/OcCurrency";
import { FC } from "react";
import { FormattedMessage } from "../../../channelUtils";
import { Price } from "../../../redux/types";
import messages from "./ShopComparison.messages";

const { React } = cssns("ComparisonPrice");

interface ComparisonPriceProps {
	prices?: Array<Price>;
}

const ComparisonPrice: FC<ComparisonPriceProps> = (props: ComparisonPriceProps) => {
	const prices = props.prices;

	if (!prices || prices.length === 0) {
		return (<span />);
	}

	const renderPriceConditions = (price: Price, idx: number) => {
		if (price && price.conditions) {
			return Object.keys(price.conditions).map((key, conditionIdx) => {
				return (
					<span className="condition" key={`ComparisonPrice-${idx}-${conditionIdx}`}>
					{`${key} ${price.conditions![key]}`}
				</span>
				);
			});
		}
		return null;
	};

	return (
		<div className="container">
			<div className="price-message">
				<FormattedMessage {...messages.price} />
			</div>
			<div>
				{prices && prices.map((price, idx) => {
					return (
						<div key={`ComparisonPrice-${idx}`} className="prices">
							<OcCurrency
								cost={price.taxFreeAmount}
								currency={price.currency}
							/>
							{renderPriceConditions(price, idx)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ComparisonPrice;
