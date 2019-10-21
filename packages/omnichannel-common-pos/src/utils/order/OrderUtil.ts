import { get } from "lodash";
import { Order, OrderItem, Price, Shipment, SimplePrice, OrderTotalsType, ProductOffering, OrderItemAttributes, PriceTypeEnum } from "../../redux";
import PriceUtil from "../PriceUtil";
import { flatMapDeep } from "lodash";
/*

Flattens orderItems.childOrderItems.childOrderItems tree to an array

  - juanita-order1-item1
      - juanita-order-item1-child-item1
          - juanita-order-item1-child-item1-child-item1
      - juanita-order-item1-child-item2
*/

function getChildOrderItems(item: OrderItem): Array<OrderItem> | undefined {
	if (item.attributes && item.attributes.childOrderItems) {
		return item.attributes.childOrderItems;
	} else if (item.childOrderItems) {
		return item.childOrderItems;
	} else {
		return undefined;
	}
}

export default class OrderUtil {
	static getChildOrderItems(orderItems: Array<OrderItem> = [], result: Array<OrderItem> = []): Array<OrderItem> {
		orderItems.forEach((orderItem: OrderItem) => {
			result.push(orderItem);
			const childOrderItems = getChildOrderItems(orderItem);
			if (childOrderItems) {
				OrderUtil.getChildOrderItems(childOrderItems, result);
			}
		});
		return result;
	}

	static getShipmentsRelationships(order: Order, shipments: Array<Shipment>): Array<Shipment> | undefined {
		const shipmentRelationships: Array<Shipment> | undefined = get(order, "relationships.shipments.data", []);

		if (shipmentRelationships) {
			return shipmentRelationships.reduce<Array<Shipment>>((result: Array<Shipment>, shipmentRelation: Shipment): Array<Shipment> => {
				const shipment = shipments.find(
					(shipment: Shipment): boolean => {
						return shipment.id === shipmentRelation.id;
					}
				);
				if (shipment) {
					result.push(shipment);
				}
				return result;
			}, []);
		}

		return undefined;
	}
	static getOrderItemChildItems(orderItem: OrderItem): OrderItem[] {
		return orderItem.childOrderItems || (orderItem.attributes && orderItem.attributes.childOrderItems) || [];
	}
	static getAllOrderItems(order: Order): Array<OrderItem> {
		return OrderUtil.getChildOrderItems(OrderUtil.getOrderItems(order));
	}
	static getOrderItems(order: Order): Array<OrderItem> {
		return order.orderItems || (order.attributes && order.attributes.orderItems) || [];
	}

	static getOrderPrices(order: Order): Price[] {
		return (order.attributes && order.attributes.prices) || order.prices || [];
	}

	static getOrderUpfrontPrice(order: Order): SimplePrice | undefined {
		return PriceUtil.getUpfrontPriceSumInList(OrderUtil.getOrderPrices(order));
	}
	static getOrderRecurrentPrice(order: Order): Price | undefined {
		return PriceUtil.getRecurrentPriceSumInList(OrderUtil.getOrderPrices(order));
	}

	static getOrderItemAttributes(orderItem: OrderItem): OrderItemAttributes {
		return orderItem.attributes || orderItem;
	}
	static getProductOfferingsFromOrderItemsAndChildrenRecursively(orderItems: OrderItem[]): ProductOffering[] {
		const productOfferings = flatMapDeep(orderItems, (orderItem: OrderItem) => [
			OrderUtil.getOrderItemAttributes(orderItem).productOffering,
			(OrderUtil.getOrderItemAttributes(orderItem).childOrderItems || []).map(
				childOrderItem => OrderUtil.getOrderItemAttributes(childOrderItem).productOffering
			),
		]) as Array<ProductOffering | undefined>;
		return productOfferings.filter(productOffering => productOffering) as ProductOffering[];
	}
	static getOrderItemPrices(orderItem: OrderItem): Price[] {
		return OrderUtil.getOrderItemAttributes(orderItem).customPrices || [];
	}
	static getOrderItemUnitPrices(orderItem: OrderItem): Price[] {
		return OrderUtil.getOrderItemAttributes(orderItem).customUnitPrices || [];
	}
	static getOrderItemUpfrontPrice(orderItem: OrderItem): SimplePrice | undefined {
		return PriceUtil.getUpfrontPriceSumInList(OrderUtil.getOrderItemPrices(orderItem));
	}
	static getOrderItemRecurrentPrice(orderItem: OrderItem): SimplePrice | undefined {
		return PriceUtil.getRecurrentPriceSumInList(OrderUtil.getOrderItemPrices(orderItem));
	}
	static getOrderItemOneTimePrice(orderItem: OrderItem): SimplePrice | undefined {
		return PriceUtil.getPriceSumInList(OrderUtil.getOrderItemPrices(orderItem), PriceTypeEnum.ONE_TIME);
	}
	static getOrderItemUnitOneTimePrice(orderItem: OrderItem): SimplePrice | undefined {
		return PriceUtil.getPriceSumInList(OrderUtil.getOrderItemUnitPrices(orderItem), PriceTypeEnum.ONE_TIME);
	}
}
