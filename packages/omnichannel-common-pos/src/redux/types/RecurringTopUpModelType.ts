enum RecurringTopUpType {
	THRESHOLD = "threshold",
	WEEKLY = "weekly",
	MONTHLY = "monthly",
	SMART = "smart",
	REMOVE = "remove",
	CANCEL = "cancel",
}

interface RecurringTopUpModelType {
	recurringTopUp?: RecurringTopUpType;
	thresholdValue?: number;
	topUpAmount?: number;
	limitInMonth?: number;
	topUpAmountWeekly?: number;
	topUpAmountMonthly?: number;
	paymentMethodType?: string;
	paymentMethod?: string;
	subscription?: string;
	productOfferingId?: string;
	productId?: string;
}

export { RecurringTopUpModelType, RecurringTopUpType };
