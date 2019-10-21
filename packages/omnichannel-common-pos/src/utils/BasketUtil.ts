import { cloneDeep, get, omit, find, pick, head, isEqual, values, flatten, isEmpty, set } from "lodash";
import {
	Basket,
	BasketItem,
	Price,
	PriceType,
	BasketItemLimitArray,
	ProductOffering,
	SimplePrice,
	OrderItem,
	BasketItemAttributes,
	BasketAttributes,
	PriceTypeEnum,
	Order,
	OrderAttributes,
	ShippingMethod,
} from "../redux/types";
import ProductUtil from "./product/ProductUtil";
import PriceUtil from "./PriceUtil";
import ProductOfferingUtil from "./ProductOfferingUtil";
import { OrderTotalsType } from "../redux";
import { TargetLifecycleStatusEnum } from "../redux/types/index";

export default class BasketUtil {
	/* Remove all unnecessary data from basket for storing, patching, etc.
     * as API calls will fail if the basket data contains fields that are not present in API model basket / basketrow
     */
	static sanitizeBasket(basketToSanitize: Basket): Basket {
		const basket = cloneDeep(basketToSanitize);

		const storeBasket = ({
			id: get(basket, "id"),
			type: get(basket, "type") || "baskets",
			relationships: {
				...omit(get(basket, "relationships"), "links", "basketItems"),
			},
			attributes: {
				...pick(get(basket, "attributes"), "sales-context"),
			},
		} as any) as Basket;

		return storeBasket;
	}

	/* TODO types for parameters */
	static getPrice(itemOrBasket: any, type: string) {
		return find(get(itemOrBasket, "attributes.totalPrices") || get(itemOrBasket, "totalPrices"), prices => get(prices, "type") === type) || {};
	}

	static hasPrice(basketItem: BasketItem): boolean {
		if (
			(basketItem.unitPrices && basketItem.unitPrices.length) ||
			(basketItem.attributes && basketItem.attributes.unitPrices && basketItem.attributes.unitPrices.length)
		) {
			return true;
		}

		if (
			(basketItem.totalPrices && basketItem.totalPrices.length) ||
			(basketItem.attributes && basketItem.attributes.totalPrices && basketItem.attributes.totalPrices.length)
		) {
			return true;
		}

		if (
			(basketItem.originalUnitPrices && basketItem.originalUnitPrices.length) ||
			(basketItem.attributes && basketItem.attributes.originalUnitPrices && basketItem.attributes.originalUnitPrices.length)
		) {
			return true;
		}

		if (
			(basketItem.originalTotalPrices && basketItem.originalTotalPrices.length) ||
			(basketItem.attributes && basketItem.attributes.originalTotalPrices && basketItem.attributes.originalTotalPrices.length)
		) {
			return true;
		}

		return false;
	}

	static getBasketItemWithChildBasketItemsWithPrices(basketItem: BasketItem): BasketItem {
		const childrenInAttributes = get(basketItem, "attributes.childBasketItems", []);
		const childrenAtRoot = get(basketItem, "childBasketItems", []) as any;

		if (childrenInAttributes && childrenInAttributes.length) {
			set(basketItem, "attributes", {
				...basketItem.attributes,
				childBasketItems: childrenInAttributes.filter((cbi: BasketItem) => BasketUtil.hasPrice(cbi)),
			});
		} else if (childrenAtRoot && childrenAtRoot.length) {
			basketItem.childBasketItems = childrenAtRoot.filter((cbi: BasketItem) => BasketUtil.hasPrice(cbi));
		}

		return basketItem;
	}

	static getBasketItemsWithPrices(basketItems: BasketItem[]): BasketItem[] {
		return basketItems.reduce((stack: BasketItem[], basketItem: BasketItem) => {
			let basketItemWithPriceyChildrenMaybe = { ...basketItem };
			basketItemWithPriceyChildrenMaybe = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithPriceyChildrenMaybe);

			const someChildrenHavePrices = BasketUtil.getBasketItemChildBasketItems(basketItemWithPriceyChildrenMaybe);

			const hasPrices = BasketUtil.hasPrice(basketItemWithPriceyChildrenMaybe) || Boolean(someChildrenHavePrices && someChildrenHavePrices.length);

			return hasPrices ? stack.concat(basketItemWithPriceyChildrenMaybe) : stack;
		}, []);
	}

	/**
	 * Returns a list of summed prices of given type for each tax rate found from the basketItem and it's childBasketItems.
	 * @param {*} basketItem the basket item to examine
	 * @param {*} type priceType to filter with
	 */
	static getTotalBasketItemPrices(basketItem: BasketItem, type: PriceType): Array<Price> {
		const flattenedPrices = BasketUtil.flattenPrices(basketItem, type);
		return values(
			flattenedPrices.reduce((total, price) => {
				const priceSelector = price.taxRate || "default";
				const priceObject = (total as any)[priceSelector] || {
					type,
					currency: undefined,
					taxRate: undefined,
					taxFreeAmount: 0,
				};
				return {
					...total,
					[priceSelector]: {
						type,
						currency: priceObject.currency || price.currency,
						taxRate: priceObject.taxRate || price.taxRate,
						taxFreeAmount: priceObject.taxFreeAmount + (price.taxFreeAmount || 0),
					},
				};
			}, {})
		);
	}

	/**
	 * Returns a flattened list of prices of the given type found from the given basketItem and it's childBasketItems
	 * @param {*} basketItem the basket item to examine
	 * @param {*} type priceType to filter with
	 */
	static flattenPrices(basketItem: BasketItem, type?: PriceType): Array<Price> {
		const childBasketItems = basketItem.childBasketItems || (basketItem.attributes && basketItem.attributes.childBasketItems) || [];
		const prices = (basketItem.attributes && basketItem.attributes.totalPrices) || basketItem.totalPrices || [];
		return childBasketItems.reduce(
			(total, child) => {
				total.push(...BasketUtil.flattenPrices(child, type));
				return total;
			},
			[
				...prices.filter(price => {
					return type === undefined || price.type === type;
				}),
			]
		);
	}

	/**
	 * Gets basket item product id, from either main basket item or child basket item (different structures)
	 * @param {*} basketItem or childbasketitem to examine
	 */
	static getProductId = (basketItem?: BasketItem) => {
		return get(basketItem, "attributes.product.id") || get(basketItem, "product.id", "");
	};

	static allowedToAddToBasket = (productOffering: ProductOffering, basketItems?: Array<BasketItem>, itemLimits?: BasketItemLimitArray): boolean => {
		// If no PO, not allowed
		if (!productOffering) {
			return false;
		}

		// If no configurations found, or they are empty, allow
		if (!itemLimits || !itemLimits.length) {
			return true;
		}

		const productTypes = {
			specType: get(productOffering, "attributes.specType", productOffering.specType),
			specSubType: get(productOffering, "attributes.specSubType", productOffering.specSubType),
		};

		const limit = head(
			itemLimits
				.filter(itemLimit => itemLimit.specType === productTypes.specType && itemLimit.specSubType === productTypes.specSubType)
				.map(itemLimit => itemLimit.maxItems)
		);

		// If no limit found for supplied PO, allow
		if (isNaN(limit!)) {
			return true;
		}

		if (limit === 0) {
			return false;
		}

		if (!basketItems) {
			return true;
		}

		const amountOfItems = basketItems.reduce((total, basketItem) => {
			const basketProductTypes = {
				specType: get(basketItem, "attributes.product.specType", productOffering.specType),
				specSubType: get(basketItem, "attributes.product.specSubType", productOffering.specSubType),
			};

			if (isEqual(productTypes, basketProductTypes)) {
				return total + get(basketItem, "attributes.quantity", basketItem.quantity);
			}

			return total;
		}, 0);

		return amountOfItems < limit!;
	};

	static hasPortIn = (basketItems: Array<BasketItem>) => {
		return basketItems.some((basketItem: BasketItem) => {
			const mnpPath = ProductUtil.getPathToBasketItemWithTFormName(basketItem, "MNP");
			return mnpPath && mnpPath.length > 0;
		});
	};

	static getLastModifiedAt(basket: Basket): string | undefined {
		return get(basket, "attributes.lastModifiedAt") || get(basket, "lastModifiedAt");
	}

	static getCreatedAt(basket: Basket): string {
		return get(basket, "attributes.createdAt") || get(basket, "createdAt");
	}

	static getBasketOwner(basket: Basket) {
		return get(basket, "relationships.owner.data") || get(basket, "relationships.owner");
	}

	static getBasketOwnerId(basket: Basket): string {
		const owner = BasketUtil.getBasketOwner(basket);
		return get(owner, "data.id") || get(owner, "id");
	}
	static getBasketCurrency(basket: Basket) {
		return get(basket, "attributes.totalPrices[0].currency");
	}
	static getBasketItems(basket: Basket): BasketItem[] {
		return (basket.attributes && basket.attributes.basketItems) || basket.basketItems || [];
	}
	static getBasketItemTotalPrices(basketItem: BasketItem): Price[] {
		return (basketItem.attributes && basketItem.attributes.totalPrices) || basketItem.totalPrices || [];
	}
	static getChildBasketItems(basketItem: BasketItem): BasketItem[] {
		return get(basketItem, "attributes.childBasketItems") || get(basketItem, "childBasketItems", []);
	}
	static getBasketItemTotalPricesIncludingChildren(basketItem: BasketItem): Price[] {
		const childBasketItems = BasketUtil.getChildBasketItems(basketItem);
		const thisPrices = BasketUtil.getBasketItemTotalPrices(basketItem);
		const childBasketItemPrices = childBasketItems.reduce((stack: Price[], cbi: BasketItem) => {
			return stack.concat(BasketUtil.getBasketItemTotalPricesIncludingChildren(cbi));
		}, []);
		return thisPrices.concat(childBasketItemPrices);
	}
	static getBasketTotalPrices(basket: Basket): Price[] {
		return (basket.attributes && basket.attributes.totalPrices) || basket.totalPrices || [];
	}
	static getBasketUpfrontPrice(basket: Basket): SimplePrice | undefined {
		return PriceUtil.getUpfrontPriceSumInList(BasketUtil.getBasketTotalPrices(basket));
	}
	static getBasketRecurrentPrice(basket: Basket): Price | undefined {
		return PriceUtil.getRecurrentPriceSumInList(BasketUtil.getBasketTotalPrices(basket));
	}
	static getBasketItemUpfrontPrice(basketItem: BasketItem): SimplePrice | undefined {
		return PriceUtil.getUpfrontPriceSumInList(BasketUtil.getBasketItemTotalPrices(basketItem));
	}
	static getBasketItemRecurrentPrice(basketItem: BasketItem): Price | undefined {
		return PriceUtil.getRecurrentPriceSumInList(BasketUtil.getBasketItemTotalPrices(basketItem));
	}

	static getBasketItemsUpfrontPrice(basketItems: BasketItem[]): SimplePrice | undefined {
		/* TODO minimize */
		const prices = basketItems.reduce((stack: Price[], basketItem: BasketItem) => {
			const biPrices = BasketUtil.getBasketItemTotalPricesIncludingChildren(basketItem);
			return stack.concat(biPrices);
		}, []);

		return PriceUtil.getUpfrontPriceSumInList(prices);
	}
	static getBasketItemsRecurrentPrice(basketItems: BasketItem[]): Price | undefined {
		/* TODO minimize */
		const prices = basketItems.reduce((stack: Price[], basketItem: BasketItem) => {
			const biPrices = BasketUtil.getBasketItemTotalPricesIncludingChildren(basketItem);
			return stack.concat(biPrices);
		}, []);

		return PriceUtil.getRecurrentPriceSumInList(prices);
	}

	static getBasketItemName(basketItem: BasketItem, language?: string): string | undefined {
		const product = BasketUtil.getProductOfferingInBasketItem(basketItem);
		const nameInCE = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(product, "names", "name", undefined, language);

		if (nameInCE) {
			return nameInCE;
		}

		const attributes = BasketUtil.getBasketItemAttributes(basketItem);
		const name = attributes.name || (product && product.name);

		return name;
	}

	static getBasketItemOneTimePrice(basketItem: BasketItem): Price | undefined {
		return PriceUtil.getOneTimePriceSumInList(BasketUtil.getBasketItemTotalPrices(basketItem));
	}
	static getBasketAttributes(basket: Basket): BasketAttributes {
		return basket.attributes || basket;
	}
	static getBasketItemAttributes(basketItem: BasketItem): BasketItemAttributes {
		return basketItem.attributes || basketItem;
	}

	static getProductOfferingInBasketItem(basketItem: BasketItem): ProductOffering | undefined {
		const attributes = BasketUtil.getBasketItemAttributes(basketItem);
		return attributes.product;
	}

	static basketToOrder(basket: Basket): Order {
		return ({
			type: "orders",
			id: basket.id,
			orderItems: BasketUtil.getBasketItems(basket).map(BasketUtil.basketItemToOrderItem),
			prices: BasketUtil.getBasketTotalPrices(basket),
		} as Partial<Order>) as Order;
	}
	static basketItemToOrderItem(basketItem: BasketItem): OrderItem {
		const product = BasketUtil.getBasketItemAttributes(basketItem).product;
		return {
			id: basketItem.id,
			type: "order-items",
			name: product && ProductOfferingUtil.getPOName(product),
			quantity: BasketUtil.getBasketItemAttributes(basketItem).quantity,
			unitPrices: BasketUtil.getBasketItemAttributes(basketItem).unitPrices,
			prices: BasketUtil.getBasketItemAttributes(basketItem).totalPrices,
			productOffering: BasketUtil.getBasketItemAttributes(basketItem).product,
			childOrderItems: (BasketUtil.getBasketItemAttributes(basketItem).childBasketItems || []).map(BasketUtil.basketItemToOrderItem),
		};
	}

	/**
	 * Pick first price found from basket item or it's childBasketItems and return it's currency
	 * @param {*} basketItem
	 */
	static getBasketItemCurrency(basketItem: BasketItem) {
		let flattenedPrices = BasketUtil.flattenPrices(basketItem, PriceTypeEnum.ONE_TIME);
		if (isEmpty(flattenedPrices)) {
			flattenedPrices = BasketUtil.flattenPrices(basketItem, PriceTypeEnum.RECURRENT);
		}
		return get(flattenedPrices, "[0].currency");
	}

	static getBasketItemChildBasketItems(basketItem: BasketItem): BasketItem[] | undefined {
		if (!basketItem) {
			return undefined;
		}

		const childBasketItems = get(basketItem, "attributes.childBasketItems") || get(basketItem, "childBasketItems");
		return childBasketItems;
	}

	static getBasketItemWithChildrenRecursively(basketItem: BasketItem): BasketItem[] {
		return [basketItem, ...BasketUtil.getBasketItemsWithChildrenRecursively(BasketUtil.getChildBasketItems(basketItem))];
	}
	static getBasketItemsWithChildrenRecursively(basketItems: BasketItem[]): BasketItem[] {
		return basketItems
			.map(BasketUtil.getBasketItemWithChildrenRecursively)
			.reduce((items: BasketItem[], result: BasketItem[]) => [...result, ...items], []);
	}

	/**
	 *
	 * @param basketItem   basket item to traverse and mutate
	 * @param productId
	 * @return BasketItem  the removed child basket item.
	 */
	static removeChildBasketItemByProductId(basketItem: BasketItem, productId: string): BasketItem | undefined {
		const childrenInAttributes = get(basketItem, "attributes.childBasketItems", []);
		const childFoundInAttributes = childrenInAttributes.find((cbi: BasketItem) => BasketUtil.getProductId(cbi) === productId);

		const childrenAtRoot = get(basketItem, "childBasketItems", []) as any;
		const childFoundAtRoot = childrenAtRoot.find((cbi: BasketItem) => BasketUtil.getProductId(cbi) === productId);

		if (childFoundInAttributes) {
			set(basketItem, "attributes", {
				...basketItem.attributes,
				childBasketItems: childrenInAttributes.filter((cbi: BasketItem) => BasketUtil.getProductId(cbi) !== productId) as BasketItem[],
			});
			return childFoundInAttributes;
		} else if (childFoundAtRoot) {
			basketItem.childBasketItems = childrenAtRoot.filter((cbi: BasketItem) => BasketUtil.getProductId(cbi) !== productId) as BasketItem[];
			return childFoundAtRoot;
		}

		return undefined;
	}

	static getBasketItemTotalUpfrontPrice(basketItem: BasketItem): number | undefined {
		return (basketItem.attributes && basketItem.attributes.totalUpfrontPrice) || basketItem.totalUpfrontPrice;
	}

	static getCalculatedBasketItemTotalUpfrontPriceWithChildren(basketItem: BasketItem): number {
		const thisUpfrontPrice = Number(BasketUtil.getBasketItemTotalUpfrontPrice(basketItem)) || 0;
		const childBasketItems = BasketUtil.getBasketItemChildBasketItems(basketItem) || [];
		const childrenUpfrontSum = Number(BasketUtil.getBasketItemsTotalPrice(childBasketItems));
		return thisUpfrontPrice + childrenUpfrontSum;
	}

	static getBasketItemsTotalPrice(basketItems: BasketItem[]): number {
		const total = basketItems.reduce((sum: number, basketItem: BasketItem) => {
			return sum + BasketUtil.getCalculatedBasketItemTotalUpfrontPriceWithChildren(basketItem);
		}, 0);

		return total;
	}

	static excludeBasketItemsByIds(basketItems: BasketItem[], ids: string[], newBasketItemSet: BasketItem[], removedBasketItems?: BasketItem[]): void {
		if (ids && ids.length) {
			basketItems
				.filter((bi: BasketItem) => ids.includes(BasketUtil.getProductId(bi)))
				.forEach((bi: BasketItem) => removedBasketItems && removedBasketItems.push(bi));

			basketItems.filter((bi: BasketItem) => !ids.includes(BasketUtil.getProductId(bi))).forEach((bi: BasketItem) => {
				const reducedBasketItem = { ...bi };

				ids.forEach((id: string) => {
					const removedBasketItem = BasketUtil.removeChildBasketItemByProductId(reducedBasketItem, id);

					if (removedBasketItem && removedBasketItems) {
						removedBasketItems.push(removedBasketItem);
					}
				});

				return newBasketItemSet.push(reducedBasketItem);
			});
		} else if (basketItems) {
			basketItems.forEach((bi: BasketItem) => newBasketItemSet.push(bi));
		}
	}
	static isBasketItemTerminated(basketItem: BasketItem): boolean {
		return BasketUtil.getBasketItemAttributes(basketItem).targetLifecycleStatus === TargetLifecycleStatusEnum.terminated;
	}
	static isBasketItemActive(basketItem: BasketItem): boolean {
		return BasketUtil.getBasketItemAttributes(basketItem).targetLifecycleStatus === TargetLifecycleStatusEnum.active;
	}
	static removeShippingMethods(basketItem: BasketItem, shippingMethods: Array<ShippingMethod>): Array<ShippingMethod> {
		const id =
			basketItem &&
			basketItem.attributes &&
			basketItem.attributes.product &&
			basketItem.attributes.product.id;
		return [...shippingMethods].filter((o) => o.id !== id);
	}
}
