import { FC } from "react";
import classnames from "classnames";
import cssns from "../../utils/cssnsConfig";
import { ReactNode } from "react";
import OcCurrency from "../ocComponents/OcCurrency";

const { React } = cssns("PriceHolder");

interface PriceHolderProps {
	prices: Array<number>;
	currency?: string;
	onClick: (price: number) => void;
	twoRowsView?: boolean;
}

const PriceHolder: FC<PriceHolderProps> = (props: PriceHolderProps) => {
	const priceHolderClasses = classnames({
		container: true,
		oneRow: !props.twoRowsView
	});

	const getRowPrices = (prices: Array<number>): ReactNode => {
		return (
			<div className="PriceHolder-row">
				{prices.map((price: number, idx: number) => {
					return (
						<div
							key={`price-container-${idx}`}
							className={priceHolderClasses}
							onClick={() => props.onClick(price)}
						>
							<OcCurrency
								allowUndefined={true}
								cost={price}
								currency={props.currency}
								round={true}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	const getHalfLength = (prices: Array<number>): number => {
		const { length } = prices;
		return length % 2 ? length / 2 + 1 : length / 2;
	};

	return (
		<div className="this">
			{props.twoRowsView && (
				<div className="column">
					{getRowPrices(props.prices.slice(0, getHalfLength(props.prices)))}
					{getRowPrices(props.prices.slice(getHalfLength(props.prices)))}
				</div>
			)}
			{!props.twoRowsView && getRowPrices(props.prices)}
		</div>
	);
};

export default PriceHolder;
export {
	PriceHolderProps
};
