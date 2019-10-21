enum FilterLabelEnum {
	VOICE = "voice",
	PRICE_RANGE = "price-range",
	HOME_ZONE = "home-zone",
}

type FilterLabel = keyof typeof FilterLabelEnum;

export {
	FilterLabelEnum,
	FilterLabel
};
