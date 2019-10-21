import PropTypes from "prop-types";
import React from "react";
import {
	OcCurrency,
	Flex,
	ProductOfferingUtil,
	StringUtil,
	FormattedMessage, OcButton, OcButtonType,
} from "omnichannel-common-pos";
import Sticky from "react-stickynode";
import { get, isNumber } from "lodash";
import messages from "./ProductTable.messages";

const ProductPrice = ({ product, configurations, defaultStockLevel, validIcc, validFnF, nonAddonProductPresentInBasket }) => {
	const configuredProduct = ProductOfferingUtil.mergeConfigurations(
		product,
		configurations
	);
	const upfrontPrice = ProductOfferingUtil.getPrice(
			configuredProduct,
			"ONE_TIME"
		),
		recurringPrice = ProductOfferingUtil.getPrice(
			configuredProduct,
			"RECURRENT"
		);

	const stockLevelObj =
		get(product, "stockLevel") || get(product, "attributes.stockLevel");

	const stockLevel = stockLevelObj ? stockLevelObj.count : defaultStockLevel;

	const shouldShowStockLevel =
		get(product, "attributes.specType") === "PRODUCT" &&
		["HANDSET", "TABLET", "ACCESSORY", "MODEM", "SIM"].some(
			a => a === get(product, "attributes.specSubType")
		);

	return (
		<div id={`product_price_${product.id}`}>
			<Sticky
				top={0}
				bottomBoundary={
					"#product_table_row__" +
					StringUtil.escapeSpecialCharacter(product.id)
				}
			>
				<div
					style={{
						background: "white",
						padding: "10px",
						position: "relative"
					}}
				>
					{isNumber(recurringPrice.taxFreeAmount) && (
						<Flex
							alignItems="center"
							justifyContent="center"
							direction="column"
							style={{ margin: "10px 0" }}
						>
							<span
								style={{
									color: "rgb(174, 174, 174)",
									marginRight: "12px",
									fontSize: "13px"
								}}
							>
								<FormattedMessage {...messages.productTotalRecurringFee} />
							</span>
							<span style={{ fontSize: "1.18em" }}>
								<OcCurrency
									cost={recurringPrice.taxFreeAmount}
									currency={recurringPrice.currency}
									id={`product_recurring_price_${product.id}`}
								/>
							</span>
						</Flex>
					)}

					{isNumber(upfrontPrice.taxFreeAmount) && (
						<Flex
							alignItems="center"
							justifyContent="center"
							direction="column"
							style={{ margin: "10px 0" }}
						>
							<span
								style={{
									color: "rgb(174, 174, 174)",
									marginRight: "12px",
									fontSize: "13px"
								}}
							>
								<FormattedMessage {...messages.productTotalOneTimeFee} />
							</span>
							<span style={{ fontSize: "1.18em" }}>
								<OcCurrency
									cost={upfrontPrice.taxFreeAmount}
									currency={upfrontPrice.currency}
									id={`product_upfront_price_${product.id}`}
								/>
							</span>
						</Flex>
					)}

					<Flex
						alignItems="center"
						justifyContent="center"
						direction="column"
						style={{ margin: "10px 0", position: "relative" }}
					>
						<OcButton
							id={"product-price-add-to-cart-" + product.id}
							buttonType={OcButtonType.SUCCESS}
							htmlBtnType="submit"
							disabled={ nonAddonProductPresentInBasket || (shouldShowStockLevel && stockLevel === 0)  || !validIcc || !validFnF }
						>
							<FormattedMessage {...messages.productSelectProduct} />
						</OcButton>
					</Flex>
					{shouldShowStockLevel && (
						<Flex
							alignItems="center"
							justifyContent="center"
							direction="column"
							style={{ margin: "10px 0", position: "relative" }}
						>
							<FormattedMessage {...messages.productDetailsStockLevel} />
							{stockLevel}
						</Flex>
					)}
				</div>
			</Sticky>
		</div>
	);
};

ProductPrice.propTypes = {
	configurations: PropTypes.object,
	product: PropTypes.object,
	defaultStockLevel: PropTypes.number,
	validIcc: PropTypes.bool,
	validFnF: PropTypes.bool,
	nonAddonProductPresentInBasket: PropTypes.bool,
};

ProductPrice.displayName = "ProductPrice";

export default ProductPrice;
