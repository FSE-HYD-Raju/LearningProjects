enum BasketsColumnEnum {
	DATE = "DATE",
	ID = "ID",
	ITEMS = "ITEMS",
	RECURRING_FEE = "RECURRING_FEE",
	PAY_NOW = "PAY_NOW",
	STATUS = "STATUS",
}
const DEFAULT_BASKETS_COLUMNS = [
	BasketsColumnEnum.DATE,
	BasketsColumnEnum.ID,
	BasketsColumnEnum.ITEMS,
	BasketsColumnEnum.RECURRING_FEE,
	BasketsColumnEnum.PAY_NOW,
	BasketsColumnEnum.STATUS,
];
type BasketsColumn = keyof typeof BasketsColumnEnum;
export { BasketsColumn, BasketsColumnEnum, DEFAULT_BASKETS_COLUMNS };
