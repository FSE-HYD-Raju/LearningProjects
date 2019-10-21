enum ProductUsageColumnEnum {
	DATE = "DATE",
	EVENT = "EVENT",
	DETAILS = "DETAILS",
	USAGE = "USAGE",
	MONETARY_IMPACT = "MONETARY_IMPACT",
}
const DEFAULT_PRODUCT_USAGE_COLUMNS = [
	ProductUsageColumnEnum.DATE,
	ProductUsageColumnEnum.EVENT,
	ProductUsageColumnEnum.DETAILS,
	ProductUsageColumnEnum.USAGE,
	ProductUsageColumnEnum.MONETARY_IMPACT,
];
type ProductUsageColumn = keyof typeof ProductUsageColumnEnum;
export { ProductUsageColumn, ProductUsageColumnEnum, DEFAULT_PRODUCT_USAGE_COLUMNS };
