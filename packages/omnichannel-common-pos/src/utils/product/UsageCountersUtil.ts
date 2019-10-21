import { Product, UnitOfMeasureEnum, UsageCounters } from "../../redux/types";

export default class UsageCountersUtil {
	static getUsageCounters(
		product: Product,
		category: string,
		unitOfMeasure: UnitOfMeasureEnum
	): UsageCounters | undefined {
		return (
			product.usageCounters &&
			product.usageCounters.find(
				usageCounters => usageCounters.category === category && usageCounters.unitOfMeasure === unitOfMeasure
			)
		);
	}
}
