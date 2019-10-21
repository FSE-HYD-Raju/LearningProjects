enum OrderItemsColumnEnum {
	NAME = "NAME",
	QUANTITY = "QUANTITY",
	UNIT_PRICE = "UNIT_PRICE",
	TOTAL_COST = "TOTAL_COST",
	RECURRING_FEE = "RECURRING_FEE",
	PAY_NOW = "PAY_NOW"
}
const DEFAULT_ORDER_ITEMS_COLUMNS = [
	OrderItemsColumnEnum.NAME,
	OrderItemsColumnEnum.RECURRING_FEE,
	OrderItemsColumnEnum.PAY_NOW,
];
type OrderItemsColumn = keyof typeof OrderItemsColumnEnum;
export { OrderItemsColumn, OrderItemsColumnEnum, DEFAULT_ORDER_ITEMS_COLUMNS };
