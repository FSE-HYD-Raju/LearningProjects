import UsageCountersUtil from "./UsageCountersUtil";
import { PRODUCT_WITH_USAGE_COUNTERS } from "./UsageCountersUtil.testData";
import { UnitOfMeasureEnum } from "../../redux/types";

describe("UsageCountersUtil", () => {
	describe("getUsageCounters", () => {
		it("should return undefined when counters not found", () => {
			expect(
				UsageCountersUtil.getUsageCounters(PRODUCT_WITH_USAGE_COUNTERS, "Credit", UnitOfMeasureEnum.SMS)
			).toBeUndefined();
			expect(
				UsageCountersUtil.getUsageCounters(PRODUCT_WITH_USAGE_COUNTERS, "unknown", UnitOfMeasureEnum.MONETARY)
			).toBeUndefined();
		});
		it("should return usageCounters when found", () => {
			expect(
				UsageCountersUtil.getUsageCounters(PRODUCT_WITH_USAGE_COUNTERS, "Credit", UnitOfMeasureEnum.MONETARY)
			).toMatchObject({ value: 1.7 });
		});
	});
});
