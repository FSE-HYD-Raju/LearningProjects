import { OrderLifeCycleStatus } from "./OrderLifeCycleStatus";
import { Price } from "./Price";
import { BasketPaymentReceipt } from "./BasketPaymentReceipt";
import { OrderItem } from "./OrderItem";
import { SalesInfo } from "./SalesInfo";
import { Basket } from "./Basket";
import { HasId, HasPrices } from "./index";

interface OrderAttributes extends HasId, HasPrices {
	createdAt?: string;
	status?: OrderLifeCycleStatus;
	price: number; // TODO: how it can be mandatory if it can be included into order and order.attributes at the same time?
	changeable: boolean;
	cancelable: boolean;
	orderItems?: Array<OrderItem>;
	ownerId?: string;
	salesInfo: SalesInfo;
	basketPaymentReceipts: Array<BasketPaymentReceipt>;
	referenceNumber?: string;
	relationships?: {
		orderItems?: { data: Array<OrderItem> };
		basket?: { data: Basket };
	};
	orderDetails?: ActivateSimOrderDetails;
}

interface Order extends OrderAttributes, HasPrices {
	type: string;
	attributes?: OrderAttributes;
}

interface ActivateSimOrderDetails {
	msisdnIccid: [
		{
			msisdn?: string;
			iccid: string;
		}
	];
	token?: string;
	result?: string;
	description?: string;
}

export { OrderAttributes, Order, ActivateSimOrderDetails };
