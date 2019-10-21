enum RecurringTopUpIntervalTypeEnum {
	hour = "hour",
	day = "day",
	week = "week",
	month = "month",
	quarter = "quarter",
	year = "year",
	threshold = "threshold",
}

type RecurringTopUpIntervalType = keyof typeof RecurringTopUpIntervalTypeEnum;

export { RecurringTopUpIntervalType, RecurringTopUpIntervalTypeEnum };
