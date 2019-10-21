import * as R from "react";
import cssns from "../../../../../../utils/cssnsConfig";
import { SimplePrice } from "../../../../../../redux/types/SimplePrice";
import { connect } from "react-redux";
import { AppState } from "../../../../../../redux/index";

const React = cssns("LargePrice").React as typeof R;

interface LargePriceOwnProps {
	price: SimplePrice;
	description: React.ReactNode;
}
interface LargePriceStateProps {
	selectedCurrency: string;
}
interface LargePriceProps extends LargePriceOwnProps, LargePriceStateProps {}
const LargePrice: React.FC<LargePriceProps> = (props: LargePriceProps) => {
	const { price, description, selectedCurrency } = props;
	const currency = price.currency || selectedCurrency;
	// 1.23 and "$" -> "1,23 $" -> "1" and ",23 $"
	const priceText = new Intl.NumberFormat("de-DE", { style: "currency", currency, minimumFractionDigits: 2 }).format(price.taxIncludedAmount || 0);
	const integer = priceText.split(",")[0];
	const fraction = "," + priceText.split(",")[1];

	return (
		<div className="this">
			<span className="integer">{integer}</span>
			<div className="fraction-and-description">
				<span className="fraction">{fraction}</span>
				<span className="description">{description}</span>
			</div>
		</div>
	);
};
const mapStateToProps = (state: AppState, props: LargePriceOwnProps): LargePriceProps => ({
	...props,
	selectedCurrency: state.currency.selectedCurrency,
});
const LargePriceContainer = connect(mapStateToProps)(LargePrice);
export { LargePriceContainer as LargePrice, LargePriceProps };
