interface RecurringTopUpCharacteristicsValue {
	type?: string;
	thresholdValue?: string;
	amount?: string;
	monthlyLimit?: string;
	interval?: string;
	intervalCount?: string;
	customerPaymentMethod?: string;
}
type RecurringTopUpCharacteristicsValueName = keyof RecurringTopUpCharacteristicsValue;
type ExtendedRecurringTopUpCharacteristicsValue = RecurringTopUpCharacteristicsValue & Record<string, string>;

export { RecurringTopUpCharacteristicsValue, ExtendedRecurringTopUpCharacteristicsValue, RecurringTopUpCharacteristicsValueName };
