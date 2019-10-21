import { HasId } from "./HasId";
import { Order } from "./Order";

interface OrderCancelAttributes extends HasId {
	reason?: string;
	order?: Order;
}

interface OrderCancel extends OrderCancelAttributes, HasId {
	attributes?: OrderCancelAttributes;
}

export { OrderCancel, OrderCancelAttributes };
