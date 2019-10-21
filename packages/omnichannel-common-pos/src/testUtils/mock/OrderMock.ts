import { Order, OrderAttributes, OrderItem, SalesInfo } from "../../redux/types";
import PriceUtil from "../../utils/PriceUtil";

interface MakeOrderItemConfig {
	name?: string;
	recurringPriceAmount?: number;
	oneTimePriceAmount?: number;
	additionalRecurringPriceAmount?: number;
	additionalOneTimePriceAmount?: number;
	quantity?: number;
}
const CURRENCY = "EUR";
class OrderMock {
	static DEFAULT_ORDER_ITEM_CONFIG: MakeOrderItemConfig = {
		name: "Order item",
		oneTimePriceAmount: 5,
		quantity: 1
	};
	static makeOrder(): Order {
		return ({
			id: "order1",
			type: "orders",
			attributes: ({
				createdAt: "2016-11-14",
				status: "IN_PROGRESS",
				price: 10,
				changeable: true,
				salesInfo: ({
					salesType: "ACQUISITION",
					channel: "channel"
				} as Partial<SalesInfo>) as SalesInfo,
				orderItems: [OrderMock.makeOrderItem()]
			} as Partial<OrderAttributes>) as OrderAttributes
		} as Partial<Order>) as Order;
	}
	static makeOrderItem(config: MakeOrderItemConfig = {}): OrderItem {
		const configWithDefault = { ...OrderMock.DEFAULT_ORDER_ITEM_CONFIG, ...config };
		const prices = [];
		if (configWithDefault.oneTimePriceAmount) {
			prices.push(PriceUtil.getOneTimePrice(configWithDefault.oneTimePriceAmount * (configWithDefault.quantity || 1), CURRENCY));
		}
		if (configWithDefault.additionalOneTimePriceAmount) {
			prices.push(PriceUtil.getOneTimePrice(configWithDefault.additionalOneTimePriceAmount * (configWithDefault.quantity || 1), CURRENCY));
		}
		if (configWithDefault.recurringPriceAmount) {
			prices.push(PriceUtil.getRecurrentPrice(configWithDefault.recurringPriceAmount, CURRENCY));
		}
		if (configWithDefault.additionalRecurringPriceAmount) {
			prices.push(PriceUtil.getRecurrentPrice(configWithDefault.additionalRecurringPriceAmount, CURRENCY));
		}
		const unitPrices = [];
		if (configWithDefault.oneTimePriceAmount) {
			unitPrices.push(PriceUtil.getOneTimePrice(configWithDefault.oneTimePriceAmount, CURRENCY));
		}
		if (configWithDefault.additionalOneTimePriceAmount) {
			unitPrices.push(PriceUtil.getOneTimePrice(configWithDefault.additionalOneTimePriceAmount, CURRENCY));
		}
		return {
			id: "oi",
			type: "order-items",
			quantity: 2,
			name: configWithDefault.name,
			unitPrices,
			customUnitPrices: unitPrices,
			prices,
			customPrices: prices,
		};
	}
}
export default OrderMock;
