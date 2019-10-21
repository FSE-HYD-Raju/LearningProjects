enum PriceTypeEnum {
	ALLPRICES = "ALLPRICES",
	ONE_TIME = "ONE_TIME",
	RECURRENT = "RECURRENT",
	USAGE = "USAGE"
}

type PriceType = keyof typeof PriceTypeEnum;

export {
	PriceTypeEnum,
	PriceType
};
