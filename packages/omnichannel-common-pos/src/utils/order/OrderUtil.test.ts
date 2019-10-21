import OrderUtil from "./OrderUtil";
import { order } from "./orderData";
import { Order, OrderItem, SimplePrice } from "../../redux/types";
import PriceUtil from "../PriceUtil";

const CURRENCY = "EUR";
const PRICES_WITHOUT_TAXES = [PriceUtil.getOneTimePrice(3, CURRENCY), PriceUtil.getOneTimePrice(4, CURRENCY), PriceUtil.getRecurrentPrice(4, CURRENCY)];
const PRICES_WITH_TAXES = [
	PriceUtil.getOneTimePriceWithTax(5, 20, CURRENCY),
	PriceUtil.getOneTimePriceWithTax(10, 20, CURRENCY),
	PriceUtil.getRecurrentPriceWithTax(100, 20, CURRENCY),
];

const getOrderByPrices = (prices: SimplePrice[]): Order => (({ prices } as Partial<Order>) as Order);

describe("OrderUtil", () => {
	it("getOrderItems", () => {
		const resultArray = OrderUtil.getAllOrderItems(order);
		expect(resultArray.length).toEqual(4);
	});
	describe("getOrderUpfrontPrice", () => {
		it("should return undefined when no order prices", () => {
			expect(OrderUtil.getOrderUpfrontPrice(getOrderByPrices([]))).toBeUndefined();
		});
		it("should handle multiple order prices", () => {
			expect(OrderUtil.getOrderUpfrontPrice(getOrderByPrices(PRICES_WITH_TAXES))).toMatchObject({
				currency: CURRENCY,
				taxFreeAmount: 115,
				taxIncludedAmount: 138,
			});
		});
	});
	describe("getOrderItemPrices", () => {
		const customPrices = [PriceUtil.getOneTimePrice(3, CURRENCY)];
		const prices = [PriceUtil.getOneTimePrice(99, CURRENCY)];
		it("should return customPrices if both customPrices and prices present", () => {
			expect(OrderUtil.getOrderItemPrices(({ customPrices, prices } as Partial<OrderItem>) as OrderItem)).toBe(customPrices);
		});
		it("should return empty array if customPrices is undefined and prices present", () => {
			expect(OrderUtil.getOrderItemPrices(({ prices } as Partial<OrderItem>) as OrderItem)).toEqual([]);
		});
	});
	describe("getOrderItemUnitPrices", () => {
		const customUnitPrices = [PriceUtil.getOneTimePrice(3, CURRENCY)];
		const unitPrices = [PriceUtil.getOneTimePrice(99, CURRENCY)];
		it("should return customPrices if both customUnitPrices and unitPrices present", () => {
			expect(OrderUtil.getOrderItemUnitPrices(({ customUnitPrices, unitPrices } as Partial<OrderItem>) as OrderItem)).toBe(customUnitPrices);
		});
		it("should return empty array if customUnitPrices is undefined and unitPrices present", () => {
			expect(OrderUtil.getOrderItemUnitPrices(({ unitPrices } as Partial<OrderItem>) as OrderItem)).toEqual([]);
		});
	});
});
