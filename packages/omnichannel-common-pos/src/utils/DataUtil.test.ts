import { DataUtil } from "./DataUtil";
import { UnitOfMeasureEnum } from "../redux/types";

describe("DataUtil", () => {
	describe("format", () => {
		it("throws Error in case of invalid unit of duration", () => {
			try {
				DataUtil.format(20, UnitOfMeasureEnum.MINUTES);
				fail("Should throw error");
			} catch (e) {
				expect(e.message).toContain(UnitOfMeasureEnum.MINUTES);
			}
		});

		it("present BYTES amount according to default template", () => {
			expect(DataUtil.format(20, UnitOfMeasureEnum.BYTES)).toBe("20 B");
			expect(DataUtil.format(20 * Math.pow(10, 3) + 2, UnitOfMeasureEnum.BYTES)).toBe("20 kB");
			expect(DataUtil.format(20 * Math.pow(10, 6) + 2, UnitOfMeasureEnum.BYTES)).toBe("20 MB");
			expect(DataUtil.format(20 * Math.pow(10, 9) + 200 * Math.pow(10, 6) + 2, UnitOfMeasureEnum.BYTES)).toBe("20.20 GB");
		});

		it("present KILOBYTES amount according to default template", () => {
			expect(DataUtil.format(20, UnitOfMeasureEnum.KILOBYTES)).toBe("20 kB");
			expect(DataUtil.format(20 * Math.pow(10, 3) + 2, UnitOfMeasureEnum.KILOBYTES)).toBe("20 MB");
		});

		it("present MEGABYTES amount according to default template", () => {
			expect(DataUtil.format(20, UnitOfMeasureEnum.MEGABYTES)).toBe("20 MB");
			expect(DataUtil.format(20 * Math.pow(10, 3) + 202, UnitOfMeasureEnum.MEGABYTES)).toBe("20.20 GB");
		});

		it("present GIGABYTES amount according to default template", () => {
			expect(DataUtil.format(1, UnitOfMeasureEnum.GIGABYTES)).toBe("1.00 GB");
		});

		it("present TERABYTES amount according to default template", () => {
			expect(DataUtil.format(1, UnitOfMeasureEnum.TERABYTES)).toBe("1.00 TB");
		});

		it("present PETABYTES amount according to default template", () => {
			expect(DataUtil.format(1, UnitOfMeasureEnum.PETABYTES)).toBe("1.00 PB");
		});
	});
});
