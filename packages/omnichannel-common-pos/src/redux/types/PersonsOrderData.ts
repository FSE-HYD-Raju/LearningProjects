import { Order, OrderItem, Shipment } from "./index";
import { PaginationData } from "./PaginationData";
import { OrderStatusFilter } from "./OrderStatusFilter";

export interface PersonsOrderData {
	orders: Array<Order>;
	orderItems: Array<OrderItem>;
	orderFilters: Array<OrderStatusFilter>;
	paginationData: PaginationData;
	shipments: Array<Shipment>;
	loadingOrders?: boolean;
}
