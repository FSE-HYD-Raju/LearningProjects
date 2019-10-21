import { RecurringTopUpType } from "../../../..";

interface ECareRecurringTopUpFeatureType {
	newTopUpProductOfferingsPurpose: string | undefined;
	newTopUpProductOfferingsCategoriesIds: string[];
	TFormNameToRecurringTopUpTypeMap: Record<string, RecurringTopUpType>;
}
export { ECareRecurringTopUpFeatureType };
