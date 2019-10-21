import {
	contextTypesValidationMap,
	cssns,
	Flex,
	FluidContainer,
	OcInput,
	withProductConfigurations,
	StringUtil,
	ContextType,
	ProductConfigurationInputProps,
	Customer,
	ProductOffering,
	BasketActionAddProductToBasket,
	FormattedMessage, OcButton, OcButtonSize, OcButtonType
} from "omnichannel-common-pos";
import { Link } from "react-router-dom";
import messages from "../ProductTable.messages";
import ProductTableColumn from "../column/ProductTableColumn";
import { TableColumn } from "../column/productTableColumns";
import { FC, ComponentType } from "react";
import ProductDetailsRoute from "../../../routes/ProductDetailsRoute";

const { React } = cssns("ProductTable");

interface ProductTableRowActionProps {
	actions: {
		toggleItem: (product: ProductOffering) => void;
		addProductToBasket: BasketActionAddProductToBasket;
	};
}

interface ProductTableRowProps extends ProductConfigurationInputProps, ProductTableRowActionProps {
	params?: {
		sku?: string
	};
	columns: Array<TableColumn>;
	category: string;
	isItemInComparison: (product: ProductOffering) => boolean;
	customer?: Customer;
}

const ProductTableRow: FC<ProductTableRowProps> = (props: ProductTableRowProps, context: ContextType) => {
	const {
		category,
		columns,
		customer,
		params,
		product
	} = props;
	if (!product) {
		return null;
	}
	const showingDetails = params && params.sku === product.id;
	return (
		<div
			key={"product_table_row" + product.id}
			id={"product_table_row__" + StringUtil.escapeSpecialCharacter(product.id)}
		>
			<div className="table-row-inner">
				<div className="table-row">
					{columns.map((col, index) => {
						const { type } = col;
						const style = { flex: col.flex };

						switch (type) {
							case "COMPARISON":
								return (
									<Flex
										flex={col.flex}
										className="column"
										style={style}
										key={
											"column_comparison" +
											type +
											col.label +
											product.id
										}
									>
										<OcInput
											id={`ProductTableRow-${product.id}-column-${index}-comparison`}
											type="checkbox"
											standalone={true}
											onChange={() => props.actions.toggleItem(product)}
											checked={props.isItemInComparison(product)}
										/>
									</Flex>
								);
							case "SELECT":
								return (
									<Flex
										id={`ProductTableRow-${product.id}-column-${index}-select`}
										flex={col.flex}
										className="column"
										key={
											"column_" +
											product.id +
											"select_button"
										}
									>
										<OcButton
											id={`ProductTableRow-column-${product.id}-column-${index}-add-to-basket-button`}
											buttonSize={OcButtonSize.SMALL}
											block={true}
											buttonType={OcButtonType.LINK}
											onClick={() =>
												props.actions.addProductToBasket({
													product,
													hasCustomer: !!customer
												})}
											style={{ margin: "0 8px" }}
										>
											<FormattedMessage {...messages.selectProduct}/>
										</OcButton>
									</Flex>
								);

							default:
								return (
									<Link
										id={`ProductTableRow-${product.id}-column-${index}-default-column`}
										to={
											showingDetails ? (
												`/servicedesk/shop/${category}`
											) : (
												`/servicedesk/shop/${category}/${product.id}`
											)
										}
										className="column"
										style={style}
										key={
											"column_link" +
											product.id +
											col.label
										}
									>
										{index === 0 && (
											<div className="caret-container">
												{showingDetails ? (
													<i
														className="fa fa-caret-down caret"
														style={{
															color: "#FF6700"
														}}
													/>
												) : (
													<i className="fa fa-caret-right caret" />
												)}
											</div>
										)}

										<ProductTableColumn
											product={product}
											col={col}
										/>
									</Link>
								);
						}
					})}
				</div>
			</div>

			<div style={{ overflow: "hidden" }}>
				<FluidContainer height={showingDetails ? "auto" : 0}>
					<div>
						<ProductDetailsRoute product={product}/>
					</div>
				</FluidContainer>
			</div>
		</div>
	);
};

ProductTableRow.contextTypes = contextTypesValidationMap;
ProductTableRow.displayName = "ProductTableRow";

const ProductTableRowWithProductConfiguration: ComponentType<ProductTableRowProps> = withProductConfigurations<ProductTableRowProps>(ProductTableRow);
export default ProductTableRowWithProductConfiguration;

export {
	ProductTableRowProps,
	ProductTableRowActionProps
};
