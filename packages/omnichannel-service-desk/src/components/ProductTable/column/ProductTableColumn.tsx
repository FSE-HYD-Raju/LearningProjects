import * as React from "react";
import { OcCurrency, ProductOffering, PriceRange, FormattedMessage } from "omnichannel-common-pos";
import messages from "../ProductTable.messages";
import { get } from "lodash";
import { TableColumn } from "./productTableColumns";

export interface ProductTableColumnProps {
	col: TableColumn;
	product: ProductOffering;
}

function PriceRenderer(range: PriceRange): React.ReactElement<void> {
	const min = range.min;
	const max = range.max;
	const currency = range.currency;

	if (max && max !== min) {
		return (
			<FormattedMessage
				{...messages.fromCurrency}
				values={{
					currency: (
						<OcCurrency
							cost={min}
							currency={currency}
							style={{
								color: "#89ba17",
								fontWeight: 500
							}}
						/>
					)
				}}
			/>
		);
	}
	if (min && currency) {
		return (
			<OcCurrency
				cost={min}
				currency={currency}
				className="ProductTableColumn-currency"
				replaceNonBreakingSpace={true}
			/>
		);
	}
	return (<span/>);
}

const ProductTableColumn: React.FC<ProductTableColumnProps> = (props: ProductTableColumnProps) => {
	const { col, product } = props;

	switch (col && col.type) {
		case "PRICE-RANGE": {
			const range: PriceRange = col.valueGetter ? col.valueGetter(product) : {};
			return (
				<div className="ProductTableColumn row">
					{PriceRenderer(range)}
				</div>
			);
		}

		default: {
			const columnValue =
				col && col.valueGetter
					? col.valueGetter(product)
					: get(product, col && col.attribute);

			return <span className="ProductTableColumn">{columnValue}</span>;
		}
	}
};

export default ProductTableColumn;
