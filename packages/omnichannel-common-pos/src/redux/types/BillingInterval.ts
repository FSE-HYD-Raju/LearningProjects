enum IntervalTypeEnum {
	HOUR = "HOUR",
	DAY = "DAY",
	WEEK = "WEEK",
	HALF_MONTH = "HALF_MONTH",
	MONTH = "MONTH",
	QUARTER = "QUARTER",
	HALF_YEAR = "HALF_YEAR",
	YEAR = "YEAR"
}

type IntervalType = keyof typeof IntervalTypeEnum;

interface BillingInterval {
	count: number;
	interval: IntervalType;
}

export {
	BillingInterval,
	IntervalTypeEnum,
	IntervalType
};
