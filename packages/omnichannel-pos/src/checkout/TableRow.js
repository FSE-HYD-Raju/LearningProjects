// @flow
import React from "react";
import { ProductUtil,OcCurrency, ProductOfferingUtil } from "omnichannel-common-pos";

declare type priceUnit = {
	taxFreeAmount?: string,
	currency?: string
};

type Props = {
	item: {
		id: string,
		attributes: {
			name: string,
			product: ProductOffering
		}
	},
	depth: number,
	prices: {
		recurrent?: priceUnit,
		onetime?: priceUnit,
		show: boolean
	}
};

const TableRow = (props: Props) => {
	// Show increasingly wide box shadow and padding depending on the depth
	const boxShadowStyle = "inset " + props.depth * 10 + "px 0 0 0 #E1E1E1";
	const paddingStyle = 10 + props.depth * 10 + "px";
	const { show, onetime, recurrent } = props.prices;
	return (
		<tr
			className="basket-item-row"
			key={`pos-order-completed-purchase-summary-table-${props.item.id}`}
		>
			<td
				style={{
					paddingLeft: paddingStyle,
					boxShadow: boxShadowStyle
				}}
			>
				<span className="POSOrderCompleted-product-name">
					{(props.item &&
						props.item.attributes &&
						props.item.attributes.product &&
						ProductOfferingUtil.getPOName(props.item.attributes.product)) ||
						ProductUtil.getProductName(props.item)}
				</span>
			</td>
			<td>
				{show &&
				onetime && (
					<OcCurrency
						cost={onetime.taxFreeAmount}
						currency={onetime.currency}
					/>
				)}
			</td>
			<td>
				{show &&
				recurrent && (
					<OcCurrency
						cost={recurrent.taxFreeAmount}
						currency={recurrent.currency}
					/>
				)}
			</td>
		</tr>
	);
};

export default TableRow;
