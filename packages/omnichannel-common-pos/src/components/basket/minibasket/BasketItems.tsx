import { FC } from "react";
import { isEmpty, get } from "lodash";
import cssns from "../../../utils/cssnsConfig";
import { BasketItem, Price } from "../../../redux/types";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import OcCurrency from "../../ocComponents/OcCurrency";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import messages from "./Basket.messages";
const { React } = cssns("BasketItems");

interface BasketItemsProps {
	basketItems: Array<BasketItem>;
	displayRemovalButton: boolean;
	monthlyCost: Price;
	upfrontCost: Price;
	removeBasketItem: (item: BasketItem) => void;
}

const BasketItems: FC<BasketItemsProps> = (props: BasketItemsProps) => {
	const {
		basketItems,
		displayRemovalButton,
		removeBasketItem,
		monthlyCost,
		upfrontCost
	} = props;

	const getChildBasketItemRecurringPrice = (childItem: BasketItem) => {
		const childBasketItemPrice = childItem.product && childItem.product.prices;
		return childBasketItemPrice &&  childBasketItemPrice.find((price: Price) => price.type === "RECURRENT");
	};
	const getChildBasketItemUpFrontPrice = (childItem: BasketItem) => {
		const childBasketItemPrice = childItem.product && childItem.product.prices;
		return childBasketItemPrice &&  childBasketItemPrice.find((price: Price) => price.type === "ONE_TIME");
	};

	const renderChildren = (childBasketItems: Array<any>) => {
		if (childBasketItems.length > 0) {
			return childBasketItems.map(
				(childItem: BasketItem, childIndex: number) => {
					const childBasketItemRecurringPrice = getChildBasketItemRecurringPrice(childItem);
					const childBasketItemUpFrontPrice = getChildBasketItemUpFrontPrice(childItem);
					return (
						<tr
							key={`basket_item_${get(childItem, "id")}_${childIndex}`}
						>
							<td className="child-basket-item-cell">
								{get(childItem, "product.name", "")}
							</td>
							<td className="child-basket-item-cell">
								{childBasketItemRecurringPrice && childBasketItemRecurringPrice.taxFreeAmount !== 0 &&
								(<span>
												<OcCurrency
													cost={childBasketItemRecurringPrice.taxFreeAmount}
													currency={childBasketItemRecurringPrice.currency}
												/>
												<FormattedMessage {...messages.pricePerMonth}/>
											</span>
								)}
							</td>
							<td className="child-basket-item-cell">
								{childBasketItemUpFrontPrice && childBasketItemUpFrontPrice.taxFreeAmount !== 0 && (
									<OcCurrency
										cost={childBasketItemUpFrontPrice.taxFreeAmount}
										currency={childBasketItemUpFrontPrice.currency}
									/>
								)}
							</td>
							<td className="centred-text">
								{" "}
							</td>
						</tr>
					);
				}
			);
		} else {
			return null;
		}
	};

	// TODO: split render into pieces
	return (
		<div className="this">
			<table className="table mini-basket-table">
				<thead>
				<tr>
					<th className="width-50">
						<FormattedMessage {...messages.NAME}/>
					</th>
					<th className="width-20">
						<FormattedMessage {...messages.RECURRING}/>
					</th>
					<th className="width-20">
						<FormattedMessage {...messages.UPFRONT}/>
					</th>
					<th className="width-10"/>
				</tr>
				</thead>
				{!isEmpty(basketItems) && basketItems.map((item: BasketItem, index: number) => {
					const id = get(item, "attributes.product.id");
					const childBasketItems = get(item, "attributes.childBasketItems") || [];
					const productPrice = get(item, "attributes.product.prices", []);
					const productPriceRecurring = productPrice &&  productPrice.find((price: Price) => price.type === "RECURRENT");
					return (
						<tbody
							className="basket-item"
							key={`basket_item_${id}_${index}`}
						>
						<tr>
							<td
								className="product-name"
								id={`MiniBasket-${get(item, "id")}-product-name-${index}`}
							>
								{ item.attributes &&  item.attributes.product && ProductOfferingUtil.getPOName(item.attributes.product)}
							</td>
							<td>
								{ !!productPriceRecurring &&
									productPriceRecurring.taxFreeAmount &&
									productPriceRecurring.taxFreeAmount > 0 && (
									<span>
									 	<OcCurrency
											cost={productPriceRecurring.taxFreeAmount}
											currency={productPriceRecurring.currency}
										/>
										<FormattedMessage {...messages.pricePerMonth} />
									</span>
								)}
							</td>
							<td>
								{upfrontCost && item.attributes &&  (
									<OcCurrency
										cost={ item.attributes.totalUpfrontPrice}
										currency={upfrontCost.currency}
									/>
								)}
							</td>
							<td className="centred-text">
								{displayRemovalButton && (
									<i
										className="remove-basket-item-button fa fa-times"
										onClick={() => removeBasketItem(item)}
										id={`remove_basket_item_${id}`}
									/>
								)}
							</td>
						</tr>
						{renderChildren(childBasketItems)}
						</tbody>
					);
				})}
				<tbody className="total-cost-table">
				<tr>
					<th className="width-50">
						<FormattedMessage {...messages.BASKET_TOTAL}/>
					</th>
					<th className="width-20">
						{monthlyCost && (
							<span className="recurring">
									<span className="prices-by-type"/>
								{!monthlyCost.taxFreeAmount ? (
									<span className="oc-currency">{0}</span>
								) : (
									<OcCurrency
										cost={monthlyCost.taxFreeAmount}
										currency={monthlyCost.currency}
									/>
								)}
								</span>
						)}
					</th>
					<th className="width-20">
						{upfrontCost && (
							<span className="upfront">
								<span className="prices-by-type"/>
									{!upfrontCost.taxFreeAmount ? (<span className="oc-currency">{0}</span>) : (
									<OcCurrency
										cost={upfrontCost.taxFreeAmount}
										currency={upfrontCost.currency}
									/>
								)}
								</span>
						)}
					</th>
					<th className="width-10"/>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

export default BasketItems;
export {
	BasketItemsProps
};
