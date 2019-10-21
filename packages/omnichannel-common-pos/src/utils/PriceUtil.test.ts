import PriceUtil from "./PriceUtil";
import { PriceTypeEnum } from "../redux/types";

const CURRENCY = "EUR";
const FIRST_ONE_TIME_PRICE = { ...PriceUtil.getOneTimePrice(1, CURRENCY) };
const ONE_TIME_PRICE = { ...PriceUtil.getOneTimePrice(2, CURRENCY) };
const RECURRENT_PRICE = { ...PriceUtil.getRecurrentPrice(6, CURRENCY) };
const SECOND_RECURRENT_PRICE = { ...PriceUtil.getRecurrentPrice(3, CURRENCY) };
describe("PriceUtil", () => {
	describe("getPrice", () => {
		it("should return price with amount and currency", () => {
			expect(PriceUtil.getPrice(5, CURRENCY)).toMatchObject({ taxFreeAmount: 5, currency: CURRENCY });
		});
	});
	describe("getPriceWithTax", () => {
		it("should return price with tax amount and currency", () => {
			expect(PriceUtil.getPriceWithTax(5, 20, CURRENCY)).toMatchObject({
				taxFreeAmount: 5,
				taxAmount: 1,
				taxIncludedAmount: 6,
				taxRate: 20,
				currency: CURRENCY
			});
		});
	});
	describe("getPriceSumInList", () => {
		it("should return sum of prices when found by type", () => {
			expect(PriceUtil.getPriceSumInList([RECURRENT_PRICE, FIRST_ONE_TIME_PRICE, ONE_TIME_PRICE], PriceTypeEnum.ONE_TIME)).toMatchObject({
				taxFreeAmount: 3,
				currency: CURRENCY
			});
		});
		it("should return undefined when price not found by type", () => {
			expect(PriceUtil.getPriceSumInList([RECURRENT_PRICE, FIRST_ONE_TIME_PRICE, ONE_TIME_PRICE], PriceTypeEnum.USAGE)).toBeUndefined();
		});
	});
	describe("getRecurrentPriceSumInList", () => {
		it("should return recurrent prices sum with interval", () => {
			expect(PriceUtil.getRecurrentPriceSumInList([RECURRENT_PRICE, FIRST_ONE_TIME_PRICE, ONE_TIME_PRICE, SECOND_RECURRENT_PRICE])).toMatchObject({
				taxFreeAmount: 9,
				recurringChargePeriod: { count: 1, interval: "MONTH" }
			});
		});
		it("should return recurrent prices sum with interval when one price", () => {
			expect(PriceUtil.getRecurrentPriceSumInList([RECURRENT_PRICE])).toMatchObject({
				taxFreeAmount: 6,
				taxIncludedAmount: 6,
				recurringChargePeriod: { count: 1, interval: "MONTH" }
			});
		});
	});
	describe("getOneTimePriceSumInList", () => {
		it("should return one time prices sum", () => {
			expect(PriceUtil.getOneTimePriceSumInList([RECURRENT_PRICE, FIRST_ONE_TIME_PRICE, ONE_TIME_PRICE, SECOND_RECURRENT_PRICE])).toMatchObject({
				taxFreeAmount: 3,
			});
		});
	});
	describe("sumPrices", () => {
		it("should return sum of prices when no taxes", () => {
			expect(PriceUtil.sumPrices(PriceUtil.getPrice(1, CURRENCY), PriceUtil.getPrice(2, CURRENCY))).toMatchObject({
				taxFreeAmount: 3,
				taxAmount: 0,
				taxRate: 0,
				taxIncludedAmount: 3,
				currency: CURRENCY
			});
		});
		it("should return sum of prices when one price have taxes", () => {
			expect(PriceUtil.sumPrices(PriceUtil.getPriceWithTax(5, 20, CURRENCY), PriceUtil.getPrice(5, CURRENCY))).toMatchObject({
				taxFreeAmount: 10,
				taxAmount: 1,
				taxRate: 10,
				taxIncludedAmount: 11,
				currency: CURRENCY
			});
		});
		it("should return sum of prices when one price have taxes", () => {
			expect(PriceUtil.sumPrices(PriceUtil.getPriceWithTax(5, 20, CURRENCY), PriceUtil.getPriceWithTax(50, 20, CURRENCY))).toMatchObject({
				taxFreeAmount: 55,
				taxAmount: 11,
				taxRate: 20,
				taxIncludedAmount: 66,
				currency: CURRENCY
			});
		});
	});
	describe("getUpfrontPriceSumInList", () => {
		it("should return sum of one time and upfront recurrent prices", () => {
			expect(
				PriceUtil.getUpfrontPriceSumInList([
					PriceUtil.getOneTimePrice(1, CURRENCY),
					PriceUtil.getOneTimePrice(2, CURRENCY),
					PriceUtil.getRecurrentPrice(3, CURRENCY),
					PriceUtil.getRecurrentPrice(4, CURRENCY),
					{ ...PriceUtil.getRecurrentPrice(5, CURRENCY), isUpfront: false }
				])
			).toMatchObject({ taxFreeAmount: 10, taxAmount: 0, taxRate: 0, taxIncludedAmount: 10, currency: CURRENCY });
		});
	});
	describe("sumPricesByType", () => {
		it("should return empty list when no prices", () => {
			expect(PriceUtil.sumPricesByType([])).toHaveLength(0);
		});
		it("should return only one price when one price type is present", () => {
			expect(PriceUtil.sumPricesByType([PriceUtil.getOneTimePrice(1, CURRENCY), PriceUtil.getOneTimePrice(2, CURRENCY)])).toHaveLength(1);
		});
		it("should return accumulated values by price type", () => {
			expect(
				PriceUtil.sumPricesByType([
					PriceUtil.getOneTimePrice(1, CURRENCY),
					PriceUtil.getOneTimePrice(2, CURRENCY),
					PriceUtil.getRecurrentPrice(3, CURRENCY),
					PriceUtil.getRecurrentPrice(4, CURRENCY),
					{ ...PriceUtil.getRecurrentPrice(5, CURRENCY), isUpfront: false }
				])
			).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						taxFreeAmount: 3,
						taxAmount: 0,
						taxRate: 0,
						taxIncludedAmount: 3,
						currency: CURRENCY,
						type: PriceTypeEnum.ONE_TIME
					}),
					expect.objectContaining({
						taxFreeAmount: 7,
						taxAmount: 0,
						taxRate: 0,
						taxIncludedAmount: 7,
						currency: CURRENCY,
						type: PriceTypeEnum.RECURRENT,
						recurringChargePeriod: expect.objectContaining({
							count: 1,
							interval: "MONTH"
						}),
						isUpfront: true
					}),
					expect.objectContaining({
						taxFreeAmount: 5,
						taxAmount: 0,
						taxRate: 0,
						taxIncludedAmount: 5,
						currency: CURRENCY,
						type: PriceTypeEnum.RECURRENT,
						recurringChargePeriod: expect.objectContaining({
							count: 1,
							interval: "MONTH"
						}),
						isUpfront: false
					})
				])
			);
		});
	});
});
