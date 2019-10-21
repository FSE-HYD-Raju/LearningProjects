import { DurationUtil } from "./DurationUtil";
import { UnitOfMeasureEnum } from "../redux/types";

describe("DurationUtil", () => {
	describe("format", () => {
		it("throws Error in case of invalid unit of duration", () => {
			try {
				DurationUtil.format(20, UnitOfMeasureEnum.GIGABYTES);
				fail("Should throw error");
			} catch (e) {
				expect(e.message).toContain(UnitOfMeasureEnum.GIGABYTES);
			}
		});

		it("present SECONDS duration according to default template", () => {
			expect(DurationUtil.format(20, UnitOfMeasureEnum.SECONDS)).toBe("20 secs");
			expect(DurationUtil.format(85, UnitOfMeasureEnum.SECONDS)).toBe("1 min 25 secs");
			expect(DurationUtil.format(3 * 60 * 60 + 120 + 33 , UnitOfMeasureEnum.SECONDS)).toBe("3 hrs 2 mins 33 secs");
		});

		it("present MINUTES duration according to default template", () => {
			expect(DurationUtil.format(20, UnitOfMeasureEnum.MINUTES)).toBe("20 mins 0 secs");
		});

		it("present HOURS duration according to default template", () => {
			expect(DurationUtil.format(20, UnitOfMeasureEnum.HOURS)).toBe("20 hrs 0 mins 0 secs");
			expect(DurationUtil.format(1, UnitOfMeasureEnum.HOURS)).toBe("1 hr 0 mins 0 secs");
		});

		it("present DAYS duration according to default template", () => {
			expect(DurationUtil.format(1, UnitOfMeasureEnum.DAYS)).toBe("24 hrs 0 mins 0 secs");
		});

		it("present WEEKS duration according to default template", () => {
			expect(DurationUtil.format(1, UnitOfMeasureEnum.WEEKS)).toBe("168 hrs 0 mins 0 secs");
		});

		it("present MONTHS duration according to default template", () => {
			try {
				DurationUtil.format(1, UnitOfMeasureEnum.MONTHS);
			} catch (e) {
				fail(e.message);
			}
		});

		it("present WEEKS duration according to custom template", () => {
			expect(DurationUtil.format(1, UnitOfMeasureEnum.WEEKS, "d [day]")).toBe("7 days");
		});
	});
});
