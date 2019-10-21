import { cssns, Flex, contextTypesValidationMap, ContextType, ProductOffering } from "omnichannel-common-pos";
import classnames from "classnames";
import messages, { ProductTableMessagesType } from "./ProductTable.messages";
const { React } = cssns("ProductTable");
import { TableColumn } from "./column/productTableColumns";

interface ProductTableHeaderBuilderProps {
	columns: Array<TableColumn>;
	category: string;
	direction: string;
	handleSort: (...args: any[]) => any;
	selectedSortCriteria: string;
}

const ProductTableHeaderBuilder: React.FC<ProductTableHeaderBuilderProps> = (props: ProductTableHeaderBuilderProps, context: ContextType) => {
	const { formatMessage } = context.intl;
	return (
		<div className="header">
			{props.columns.map((col, idx) => {
				const active = col.label === props.selectedSortCriteria;
				return (
					<div
						id={`ProductTableHeader-${col.label}`}
						className={classnames({
							"header-cell": true,
							"active-header-cell": active
						})}
						onClick={() =>
							col.sortValueGetter &&
							props.handleSort(col.sortValueGetter, col.label)}
						style={{ flex: col.flex }}
						key={col.label ? col.label : "col_label__" + idx}
					>
						<Flex alignItems="center" flex={1} wrap="nowrap">
							{col.label ? (
								formatMessage(messages[col.label as keyof ProductTableMessagesType])
							) : null}
							{active && (
								<i
									className={classnames({
										fa: true,
										"fa-chevron-down":
											props.direction === "asc",
										"fa-chevron-up":
											props.direction !== "asc"
									})}
									style={{ paddingLeft: "6px" }}
								/>
							)}
						</Flex>
					</div>
				);
			})}
		</div>
	);
};

ProductTableHeaderBuilder.contextTypes = contextTypesValidationMap;

export default ProductTableHeaderBuilder;
