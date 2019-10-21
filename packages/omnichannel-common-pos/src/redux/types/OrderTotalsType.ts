import { Price } from "./Price";

interface OrderTotalsType {
	subtotal: number;
	taxes: number;
	total: number;
	deliveryCost: number;
	deliveryDescription?: string;
	currency?: string;
	totalRecurringFee?: Price;
}

export { OrderTotalsType };
