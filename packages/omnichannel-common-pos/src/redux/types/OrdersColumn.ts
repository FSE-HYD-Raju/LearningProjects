enum OrdersColumnEnum {
	DATE = "DATE",
	ID = "ID",
	ITEMS = "ITEMS",
	RECURRING_FEE = "RECURRING_FEE",
	PAY_NOW = "PAY_NOW",
	STATUS = "STATUS",
}
const DEFAULT_ORDERS_COLUMNS = [
	OrdersColumnEnum.DATE,
	OrdersColumnEnum.ID,
	OrdersColumnEnum.ITEMS,
	OrdersColumnEnum.RECURRING_FEE,
	OrdersColumnEnum.PAY_NOW,
	OrdersColumnEnum.STATUS,
];
type OrdersColumn = keyof typeof OrdersColumnEnum;
export { OrdersColumn, OrdersColumnEnum, DEFAULT_ORDERS_COLUMNS };
