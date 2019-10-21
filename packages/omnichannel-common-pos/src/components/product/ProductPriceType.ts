enum ProductPriceEnum {
	ALL_PRICES = "allPrices",
	UPFRONT = "upfront",
	RECURRING = "recurring",
	USAGE = "usage"
}

type ProductPriceType = keyof typeof ProductPriceEnum;

export {
	ProductPriceEnum,
	ProductPriceType
};
