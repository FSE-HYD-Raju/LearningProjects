import UnitOfMeasureUtil from "./UnitOfMeasureUtil";
import { UnitOfMeasureEnum } from "../redux/types";

describe("UnitOfMeasureUtil", () => {

	const decimalMagnitudes = [
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.BYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.KILOBYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.MEGABYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.GIGABYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.TERABYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.PETABYTES
		}
	];

	const binaryMagnitudes = [
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.BITS
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.KIBIBYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.MEBIBYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.GIBIBYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.TEBIBYTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.PEBIBYTES
		}
	];

	const times = [
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.SECONDS
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.MINUTES
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.HOURS
		}
	];

	const messages = [
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.SMS
		},
		{
			amount: 1,
			unitOfMeasure: UnitOfMeasureEnum.MMS
		},
		{
			amount: 3,
			unitOfMeasure: UnitOfMeasureEnum.SMS
		},
		{
			amount: 6,
			unitOfMeasure: UnitOfMeasureEnum.MMS
		},
	];

	describe("sum", () => {
		const decimalMagnitudesSum = {
			amount: 1
				+ Math.pow(10, 3)
				+ Math.pow(10, 6)
				+ Math.pow(10, 9)
				+ Math.pow(10, 12)
				+ Math.pow(10, 15),
			unitOfMeasure: UnitOfMeasureEnum.BYTES
		};

		const binaryMagnitudesSum = {
			amount: 1
				+ Math.pow(2, 13)
				+ Math.pow(2, 23)
				+ Math.pow(2, 33)
				+ Math.pow(2, 43)
				+ Math.pow(2, 53),
			unitOfMeasure: UnitOfMeasureEnum.BITS
		};

		const timesSum = {
			amount: 1 + 60 + 60 * 60,
			unitOfMeasure: UnitOfMeasureEnum.SECONDS
		};

		const smsSum = {
			amount: 4,
			unitOfMeasure: UnitOfMeasureEnum.SMS
		};

		const mmsSum = {
			amount: 7,
			unitOfMeasure: UnitOfMeasureEnum.MMS
		};

		it("should sum units of same type", () => {
			const units = [
				...decimalMagnitudes,
				...binaryMagnitudes,
				...times,
				...messages
			];

			const sum = UnitOfMeasureUtil.sum(units);

			expect(sum).toContainEqual(
				expect.objectContaining(decimalMagnitudesSum));
			expect(sum).toContainEqual(
				expect.objectContaining(binaryMagnitudesSum));
			expect(sum).toContainEqual(
				expect.objectContaining(timesSum));
			expect(sum).toContainEqual(
				expect.objectContaining(smsSum));
			expect(sum).toContainEqual(
				expect.objectContaining(mmsSum));
		});

		it("should convert units", () => {
			const convert = (amount: number, unitOfMeasure: UnitOfMeasureEnum, convertToUnit: UnitOfMeasureEnum) =>
				UnitOfMeasureUtil.convertTo(
					{
						amount,
						unitOfMeasure
					},
					convertToUnit
				);

			expect(convert(40000000000, UnitOfMeasureEnum.BYTES, UnitOfMeasureEnum.GIGABYTES)).toBe(40);
			expect(convert(40000000000, UnitOfMeasureEnum.KILOBYTES, UnitOfMeasureEnum.PETABYTES)).toBe(0.04);
			expect(convert(40000000, UnitOfMeasureEnum.MEGABYTES, UnitOfMeasureEnum.TERABYTES)).toBe(40);
			expect(convert(1, UnitOfMeasureEnum.PETABYTES, UnitOfMeasureEnum.GIGABYTES)).toBe(1000000);

			expect(convert(8192, UnitOfMeasureEnum.BITS, UnitOfMeasureEnum.KIBIBYTES)).toBe(1);
			expect(convert(2097152, UnitOfMeasureEnum.BYTES, UnitOfMeasureEnum.MEBIBYTES)).toBe(2);
			expect(convert(1024, UnitOfMeasureEnum.KIBIBYTES, UnitOfMeasureEnum.MEBIBYTES)).toBe(1);
			expect(convert(1024, UnitOfMeasureEnum.MEBIBYTES, UnitOfMeasureEnum.GIBIBYTES)).toBe(1);
			expect(convert(1024, UnitOfMeasureEnum.GIBIBYTES, UnitOfMeasureEnum.TEBIBYTES)).toBe(1);
			expect(convert(1024, UnitOfMeasureEnum.TEBIBYTES, UnitOfMeasureEnum.PEBIBYTES)).toBe(1);
			expect(convert(1, UnitOfMeasureEnum.GIBIBYTES, UnitOfMeasureEnum.KIBIBYTES)).toBe(1048576);

			expect(convert(60, UnitOfMeasureEnum.SECONDS, UnitOfMeasureEnum.MINUTES)).toBe(1);
			expect(convert(60, UnitOfMeasureEnum.MINUTES, UnitOfMeasureEnum.HOURS)).toBe(1);
			expect(convert(1, UnitOfMeasureEnum.HOURS, UnitOfMeasureEnum.SECONDS)).toBe(3600);
		});
	});
});
