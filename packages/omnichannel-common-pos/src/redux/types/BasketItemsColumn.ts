enum BasketItemsColumnEnum {
	NAME = "NAME",
	QUANTITY = "QUANTITY",
	UNIT_PRICE = "UNIT_PRICE",
	TOTAL_COST = "TOTAL_COST",
	RECURRING_FEE = "RECURRING_FEE",
	PAY_NOW = "PAY_NOW"
}
const DEFAULT_BASKET_ITEMS_COLUMNS = [
	BasketItemsColumnEnum.NAME,
	BasketItemsColumnEnum.RECURRING_FEE,
	BasketItemsColumnEnum.PAY_NOW
];
type BasketItemsColumn = keyof typeof BasketItemsColumnEnum;
export { BasketItemsColumn, BasketItemsColumnEnum, DEFAULT_BASKET_ITEMS_COLUMNS };
