import BasketUtil from "./BasketUtil";
import { MockDataMaker } from "../testUtils";
import { Basket, BasketItem, Price, PriceTypeEnum, ProductOffering } from "../redux/types";
import { MakeBasketItemConfig } from "../testUtils/mock/BasketMock";
import { OrderItemAttributes, OrderTotalsType } from "../redux/types";
import PriceUtil from "./PriceUtil";
const { basketTestData, basketItemWithChildrenTestData } = require("../../fixtures/BasketUtilTestData");

describe("BasketUtil", () => {
	describe("getBasketItemUpfrontPrice", () => {
		it("should return upfront prices sum when one price type is present", () => {
			expect(BasketUtil.getBasketItemUpfrontPrice(MockDataMaker.basket.makeBasketItem({ oneTimePriceAmount: 2 }))).toMatchObject({
				taxFreeAmount: 2,
			});
		});
		it("should return upfront prices sum when one-time and recurrent price types are present", () => {
			expect(BasketUtil.getBasketItemUpfrontPrice(MockDataMaker.basket.makeBasketItem({ oneTimePriceAmount: 2, recurrentPriceAmount: 3 }))).toMatchObject(
				{
					taxFreeAmount: 5,
				}
			);
		});
		it("should return upfront prices sum not counting childItems", () => {
			expect(
				BasketUtil.getBasketItemUpfrontPrice(
					MockDataMaker.basket.makeBasketItem({
						oneTimePriceAmount: 2,
						recurrentPriceAmount: 3,
						childBasketItems: [{ oneTimePriceAmount: 5 }, { recurrentPriceAmount: 6 }, { childBasketItems: [{ oneTimePriceAmount: 7 }] }],
					})
				)
			).toMatchObject({
				taxFreeAmount: 5,
			});
		});
	});
	describe("getBasketItemRecurrentPrice", () => {
		it("should return undefined when no recurrent prices present", () => {
			expect(BasketUtil.getBasketItemRecurrentPrice(MockDataMaker.basket.makeBasketItem({ oneTimePriceAmount: 2 }))).toBeUndefined();
		});
		it("should return upfront prices sum not counting childItems", () => {
			expect(
				BasketUtil.getBasketItemRecurrentPrice(
					MockDataMaker.basket.makeBasketItem({
						oneTimePriceAmount: 2,
						recurrentPriceAmount: 3,
						childBasketItems: [{ oneTimePriceAmount: 5 }, { recurrentPriceAmount: 6 }, { childBasketItems: [{ oneTimePriceAmount: 7 }] }],
					})
				)
			).toMatchObject({
				taxFreeAmount: 3,
			});
		});
	});
	describe("getBasketUpfrontPrice", () => {
		it("should return undefined when no prices present", () => {
			expect(
				BasketUtil.getBasketUpfrontPrice(
					MockDataMaker.basket.makeBasket({
						basketItemsConfigs: [
							{},
							{
								childBasketItems: [{}],
							},
						],
					})
				)
			).toBeUndefined();
		});
		it("should return total upfront prices sum only by basket.totalPrices, not by items", () => {
			const basket = MockDataMaker.basket.makeBasket({
				basketItemsConfigs: [
					{ oneTimePriceAmount: 2 },
					{ recurrentPriceAmount: 3 },
					{ oneTimePriceAmount: 4, recurrentPriceAmount: 5 },
					{
						childBasketItems: [{ oneTimePriceAmount: 6 }, { recurrentPriceAmount: 7 }],
					},
				],
			});
			const totalOneTimePrice = PriceUtil.findPrice(BasketUtil.getBasketTotalPrices(basket), PriceTypeEnum.ONE_TIME);
			totalOneTimePrice!.taxFreeAmount! += 10;
			expect(BasketUtil.getBasketUpfrontPrice(basket)).toMatchObject({
				taxFreeAmount: 27 + 10,
			});
		});
	});
	describe("getBasketRecurrentPrice", () => {
		it("should return undefined when no prices present", () => {
			expect(
				BasketUtil.getBasketRecurrentPrice(
					MockDataMaker.basket.makeBasket({
						basketItemsConfigs: [
							{},
							{
								childBasketItems: [{}],
							},
						],
					})
				)
			).toBeUndefined();
		});
		it("should return recurrent prices sum including childItem prices", () => {
			expect(
				BasketUtil.getBasketRecurrentPrice(
					MockDataMaker.basket.makeBasket({
						basketItemsConfigs: [
							{ oneTimePriceAmount: 2 },
							{ recurrentPriceAmount: 3 },
							{ oneTimePriceAmount: 4, recurrentPriceAmount: 5 },
							{
								childBasketItems: [{ oneTimePriceAmount: 6 }, { recurrentPriceAmount: 7 }],
							},
						],
					})
				)
			).toMatchObject({
				taxFreeAmount: 15,
				type: PriceTypeEnum.RECURRENT,
				recurringChargePeriod: {
					count: 1,
					interval: "MONTH",
				},
			});
		});
	});

	describe("basketItemToOrderItem", () => {
		const getPrices = (oneTime: number, recurrent: number): Price[] => {
			return [
				{
					taxFreeAmount: oneTime,
					type: PriceTypeEnum.ONE_TIME,
					currency: "EUR",
				},
				{
					taxFreeAmount: recurrent,
					type: PriceTypeEnum.RECURRENT,
					currency: "EUR",
				},
			];
		};
		const getOrderItem = (basketItemConfig: MakeBasketItemConfig): OrderItemAttributes => {
			return {
				id: basketItemConfig.id!,
				type: "order-items",
				name: basketItemConfig.name!,
				quantity: basketItemConfig.quantity,
				unitPrices: getPrices(basketItemConfig.oneTimePriceAmount!, basketItemConfig.recurrentPriceAmount!),
				prices: getPrices(
					basketItemConfig.oneTimePriceAmount! * basketItemConfig.quantity!,
					basketItemConfig.recurrentPriceAmount! * basketItemConfig.quantity!
				),
				productOffering: ({
					id: basketItemConfig.productOfferingId!,
					name: basketItemConfig.name!,
				} as Partial<ProductOffering>) as ProductOffering,
				childOrderItems: (basketItemConfig.childBasketItems || []).map(getOrderItem),
			};
		};
		it("should return order item with prices", () => {
			const basketItemConfig = {
				quantity: 2,
				name: "test name 1",
				id: "basket-item-id",
				productOfferingId: "po-1",
				oneTimePriceAmount: 2,
				recurrentPriceAmount: 3,
				childBasketItems: [
					{
						quantity: 3,
						name: "test name 1-1",
						id: "basket-item-id-child-1",
						productOfferingId: "po-2",
						oneTimePriceAmount: 4,
						recurrentPriceAmount: 5,
						childBasketItems: [
							{
								quantity: 5,
								name: "test name 1-1-1",
								id: "basket-item-id-child-1-1",
								productOfferingId: "po-3",
								oneTimePriceAmount: 8,
								recurrentPriceAmount: 9,
								childBasketItems: [],
							},
						],
					},
					{
						quantity: 4,
						name: "test name 1-2",
						id: "basket-item-id-child-2",
						productOfferingId: "po-4",
						oneTimePriceAmount: 6,
						recurrentPriceAmount: 7,
						childBasketItems: [],
					},
				],
			};
			const basketItem = MockDataMaker.basket.makeBasketItem(basketItemConfig);
			expect(BasketUtil.basketItemToOrderItem(basketItem)).toMatchObject(getOrderItem(basketItemConfig));
		});
	});

	describe("getPrice()", () => {
		it("calculates basket price correctly with multiple different kind of basket items", () => {
			const basket = basketTestData.activeBasket;
			const onetimePrice = BasketUtil.getPrice(basket, PriceTypeEnum.ONE_TIME);
			const recurrentPrice = BasketUtil.getPrice(basket, PriceTypeEnum.RECURRENT);
			expect(onetimePrice.taxFreeAmount).toEqual(99.85);
			expect(onetimePrice.currency).toEqual("EUR");
			expect(recurrentPrice.taxFreeAmount).toEqual(9.95);
			expect(recurrentPrice.currency).toEqual("EUR");
		});
	});

	describe("flattenPrices()", () => {
		it("should flatten prices from a basketItem with childBasketItems to a single list", () => {
			const basketItem = basketItemWithChildrenTestData;
			const onetimePrice = BasketUtil.flattenPrices(basketItem, "ONE_TIME");
			expect(onetimePrice.length).toEqual(3);
		});
	});

	describe("getProductId()", () => {
		it("should get the product id from either basket item or child basket item", () => {
			const basketItem = basketItemWithChildrenTestData;
			const productId = BasketUtil.getProductId(basketItem);
			expect(productId).toEqual("accessory-bundle-po");

			const childBasketItem = basketItemWithChildrenTestData.attributes.childBasketItems[0];
			const childProductId = BasketUtil.getProductId(childBasketItem);
			expect(childProductId).toEqual("earplug1-po");
		});
	});

	describe("getTotalBasketItemPrice()", () => {
		it("calculates basket item total price correctly with childBasketItems", () => {
			const basketItem = basketItemWithChildrenTestData;
			const onetimePrice = BasketUtil.getTotalBasketItemPrices(basketItem, PriceTypeEnum.ONE_TIME);
			expect(onetimePrice[0]!.taxFreeAmount!.toFixed(2)).toEqual("79.85");
		});
	});

	describe("allowedToAddToBasket()", () => {
		const subscriptionProduct = ({
			id: "test",
			attributes: {
				specType: "PRODUCT",
				specSubType: "SUBSCRIPTION",
			},
		} as any) as ProductOffering;
		it("allows adding to basket when no limits", () => {
			const basketItems: Array<BasketItem> = [];
			const result = BasketUtil.allowedToAddToBasket(subscriptionProduct, basketItems, undefined);
			expect(result).toBeTruthy();
		});

		it("allows adding to basket when different limits", () => {
			const basketItems = ([
				{
					id: "item",
					attributes: {
						product: {
							specType: "PRODUCT",
							specSubType: "SUBSCRIPTION",
						},
						quantity: 1,
					},
				},
			] as any) as Array<BasketItem>;
			const limits = [
				{
					specType: "PRODUCT",
					specSubType: "SIM",
					maxItems: 1,
				},
			];
			const result = BasketUtil.allowedToAddToBasket(subscriptionProduct, basketItems, limits);
			expect(result).toBeTruthy();
		});

		it("does not allow adding when limit reached", () => {
			const basketItems = ([
				{
					id: "item",
					attributes: {
						product: {
							specType: "PRODUCT",
							specSubType: "SUBSCRIPTION",
						},
						quantity: 1,
					},
				},
			] as any) as Array<BasketItem>;
			const limits = [
				{
					specType: "PRODUCT",
					specSubType: "SUBSCRIPTION",
					maxItems: 1,
				},
			];
			const result = BasketUtil.allowedToAddToBasket(subscriptionProduct, basketItems, limits);
			expect(result).toBeFalsy();
		});

		it("allows adding when 2 items in basket with limit of 3", () => {
			const basketItems = ([
				{
					id: "item",
					attributes: {
						product: {
							specType: "PRODUCT",
							specSubType: "SUBSCRIPTION",
						},
						quantity: 2,
					},
				},
			] as any) as Array<BasketItem>;
			const limits = [
				{
					specType: "PRODUCT",
					specSubType: "SUBSCRIPTION",
					maxItems: 3,
				},
			];
			const result = BasketUtil.allowedToAddToBasket(subscriptionProduct, basketItems, limits);
			expect(result).toBeTruthy();
		});

		it("does not allow when limit full with multiple basket items", () => {
			const basketItems = ([
				{
					id: "item",
					attributes: {
						product: {
							specType: "PRODUCT",
							specSubType: "SUBSCRIPTION",
						},
						quantity: 1,
					},
				},
				{
					id: "item2",
					attributes: {
						product: {
							specType: "PRODUCT",
							specSubType: "SUBSCRIPTION",
						},
						quantity: 2,
					},
				},
			] as any) as Array<BasketItem>;
			const limits = [
				{
					specType: "PRODUCT",
					specSubType: "SUBSCRIPTION",
					maxItems: 3,
				},
			];
			const result = BasketUtil.allowedToAddToBasket(subscriptionProduct, basketItems, limits);
			expect(result).toBeFalsy();
		});
	});

	describe("getBasketCurrency()", () => {
		it("should return currency from basket", () => {
			const basket = basketTestData.activeBasket;
			const result = BasketUtil.getBasketCurrency(basket);
			expect(result).toEqual("EUR");
		});

		it("should not return currency from basket without prices", () => {
			const basket = ({
				id: "basket",
			} as any) as Basket;
			const result = BasketUtil.getBasketCurrency(basket);
			expect(result).toBeFalsy();
		});
	});

	describe("getBasketItemCurrency()", () => {
		it("should return currency from basket item", () => {
			const basketItem = basketItemWithChildrenTestData;
			const result = BasketUtil.getBasketItemCurrency(basketItem);
			expect(result).toEqual("EUR");
		});

		it("should return not currency from basket item with empty prices", () => {
			const basketItem = ({
				id: "item",
			} as any) as BasketItem;

			const result = BasketUtil.getBasketItemCurrency(basketItem);
			expect(result).toBeFalsy();
		});
	});

	describe("returns only basket items with prices", () => {
		describe("getBasketItemWithChildBasketItemsWithPrices()", () => {
			it("returns basket item without children if none have any prices", () => {
				const basketItemWithChildrenWithNoPrices = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
								"product": {
									"id": "PO_SIM_Standard",
									"prices": [],
									"totalUpfrontPrice": 0,
								},
								"childBasketItems": [],
								"unitPrices": [],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 0,
								"totalUpfrontPriceWithChildren": 0
							}
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithNoPrices) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(0);
			});

			it("returns basket item with the children that have an one-time price of zero", () => {
				const basketItemWithChildrenWithZeroOneTimePrice = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
								"product": {
									"id": "PO_SIM_Standard",
									"prices": [],
									"totalUpfrontPrice": 0,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "ONE_TIME",
										"name": "Upfront cost",
										"chargedUnit": {
											"amount": 0,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 0,
										"taxIncludedAmount": 0,
										"taxRate": 0,
										"currency": "EUR",
										"isUpfront": true,
										"priority": 5
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 0,
								"totalUpfrontPriceWithChildren": 0
							}
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithZeroOneTimePrice) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(1);
			});

			it("returns basket item with the children that have an one-time price greater than zero", () => {
				const basketItemWithChildrenWithZeroOneTimePrice = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
								"product": {
									"id": "PO_SIM_Standard",
									"prices": [],
									"totalUpfrontPrice": 0,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "ONE_TIME",
										"name": "Upfront cost",
										"chargedUnit": {
											"amount": 1,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 1,
										"taxIncludedAmount": 1,
										"taxRate": 0,
										"currency": "EUR",
										"isUpfront": true,
										"priority": 5
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 0,
								"totalUpfrontPriceWithChildren": 0
							}
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithZeroOneTimePrice) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(1);
			});

			it("returns basket item with the children that have a recurring price of zero", () => {
				const basketItemWithChildrenWithZeroRecurringPrice = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "78da0296-5655-4359-b8d2-b5ae2e85005a",
								"product": {
									"id": "PO_YoungDigitalEdition",
									"prices": [],
									"totalUpfrontPrice": 6.9,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "RECURRENT",
										"name": "Wind Young Digital Edition",
										"chargedUnit": {
											"amount": 0,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 0,
										"taxIncludedAmount": 0,
										"taxRate": 0,
										"recurringChargePeriod": {
											"count": 1,
											"interval": "MONTH"
										},
										"currency": "EUR",
										"isUpfront": true,
										"priority": 1
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 6.9,
								"totalUpfrontPriceWithChildren": 6.9
							},
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithZeroRecurringPrice) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(1);
			});

			it("returns basket item with the children that have a recurring price greater than zero", () => {
				const basketItemWithChildrenWithPositiveRecurringPrice = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "78da0296-5655-4359-b8d2-b5ae2e85005a",
								"product": {
									"id": "PO_YoungDigitalEdition",
									"prices": [],
									"totalUpfrontPrice": 6.9,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "RECURRENT",
										"name": "Wind Young Digital Edition",
										"chargedUnit": {
											"amount": 6.9,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 6.9,
										"taxIncludedAmount": 6.9,
										"taxRate": 0,
										"recurringChargePeriod": {
											"count": 1,
											"interval": "MONTH"
										},
										"currency": "EUR",
										"isUpfront": true,
										"priority": 1
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 6.9,
								"totalUpfrontPriceWithChildren": 6.9
							},
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithPositiveRecurringPrice) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(1);
			});

			it("returns basket item with children that have both an one-time and a recurring price", () => {
				const basketItemWithChildrenWithRecurringAndOneTimePrices = {
					"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
					"type": "basketItems",
					"attributes": {
						"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
						"product": {
							"id": "PO_Base",
							"prices": [],
							"totalUpfrontPrice": 0,
						},
						"totalUpfrontPrice": 0,
						"totalPrices": [],
						"childBasketItems": [
							{
								"id": "78da0296-5655-4359-b8d2-b5ae2e85005a",
								"product": {
									"id": "PO_YoungDigitalEdition",
									"prices": [],
									"totalUpfrontPrice": 6.9,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "RECURRENT",
										"name": "Wind Young Digital Edition",
										"chargedUnit": {
											"amount": 6.9,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 6.9,
										"taxIncludedAmount": 6.9,
										"taxRate": 0,
										"recurringChargePeriod": {
											"count": 1,
											"interval": "MONTH"
										},
										"currency": "EUR",
										"isUpfront": true,
										"priority": 1
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 6.9,
								"totalUpfrontPriceWithChildren": 6.9
							},
							{
								"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
								"product": {
									"id": "PO_SIM_Standard",
									"prices": [],
									"totalUpfrontPrice": 0,
								},
								"childBasketItems": [],
								"unitPrices": [
									{
										"type": "ONE_TIME",
										"name": "Upfront cost",
										"chargedUnit": {
											"amount": 1,
											"currency": "EUR",
											"unitOfMeasure": "MONETARY"
										},
										"taxAmount": 0,
										"taxFreeAmount": 1,
										"taxIncludedAmount": 1,
										"taxRate": 0,
										"currency": "EUR",
										"isUpfront": true,
										"priority": 5
									}
								],
								"totalPrices": [],
								"originalUnitPrices": [],
								"originalTotalPrices": [],
								"totalUpfrontPrice": 0,
								"totalUpfrontPriceWithChildren": 0
							}
						],
						"unitPrices": [],
						"totalUpfrontPriceWithChildren": 0,
						"originalTotalPrices": [],
						"originalUnitPrices": []
					}
				} as any as BasketItem;

				const result: BasketItem = BasketUtil.getBasketItemWithChildBasketItemsWithPrices(basketItemWithChildrenWithRecurringAndOneTimePrices) as any as BasketItem;
				expect(result!.attributes!.childBasketItems).toHaveLength(2);
			});
		});

		describe("getBasketItemsWithPrices()", () => {
			it("does not return basket items that have no prices, neither their children", () => {
				const basketItemsWithNoPrices = [
					{
						"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
						"type": "basketItems",
						"attributes": {
							"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
							"product": {
								"id": "PO_Base",
								"prices": [],
								"totalUpfrontPrice": 0,
							},
							"totalUpfrontPrice": 0,
							"totalPrices": [],
							"childBasketItems": [
								{
									"id": "66dc112e-05f8-4927-ab32-b85923db4522",
									"product": {
										"id": "PO_PaymentGateway",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								},
								{
									"id": "78da0296-5655-4359-b8d2-b5ae2e85005a",
									"product": {
										"id": "PO_YoungDigitalEdition",
										"prices": [],
										"totalUpfrontPrice": 6.9,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 6.9,
									"totalUpfrontPriceWithChildren": 6.9
								},
								{
									"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
									"product": {
										"id": "PO_SIM_Standard",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								},
								{
									"id": "faa6cb1a-8b2a-49d2-aa7d-7fbfc0271da0",
									"product": {
										"id": "PO_MCP",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								}
							],
							"unitPrices": [],
							"totalUpfrontPriceWithChildren": 6.9,
							"originalTotalPrices": [],
							"originalUnitPrices": []
						}
					}
				] as any as BasketItem[];

				const result: BasketItem[] = BasketUtil.getBasketItemsWithPrices(basketItemsWithNoPrices) as any as BasketItem[];
				expect(result).toHaveLength(0);
			});

			it("returns basket items that have prices but whose children do not", () => {
				const basketItemsThatHavePricesButWhoseChildrenDoNot = [
					{
						"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
						"type": "basketItems",
						"attributes": {
							"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
							"product": {
								"id": "PO_Base",
								"prices": [],
								"totalUpfrontPrice": 0,
							},
							"totalUpfrontPrice": 0,
							"totalPrices": [
								{
									"type": "ONE_TIME",
									"name": "Costo di attivazione",
									"chargedUnit": {
										"amount": 19,
										"currency": "EUR",
										"unitOfMeasure": "MONETARY"
									},
									"taxAmount": 0,
									"taxFreeAmount": 19,
									"taxIncludedAmount": 19,
									"taxRate": 0,
									"currency": "EUR",
									"isUpfront": true,
									"priority": 5
								},
							],
							"childBasketItems": [
								{
									"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
									"product": {
										"id": "PO_SIM_Standard",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								},
								{
									"id": "faa6cb1a-8b2a-49d2-aa7d-7fbfc0271da0",
									"product": {
										"id": "PO_MCP",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								}
							],
							"unitPrices": [],
							"totalUpfrontPriceWithChildren": 19,
							"originalTotalPrices": [],
							"originalUnitPrices": []
						}
					},
					{
						"id": "a-random-uuid",
						"type": "basketItems",
						"attributes": {
							"basketProductId": "another-random-uuid",
							"product": {
								"id": "PO_foobar",
								"prices": [],
								"totalUpfrontPrice": 0,
							},
							"totalUpfrontPrice": 0,
							"totalPrices": [],
							"childBasketItems": [],
							"unitPrices": [],
							"totalUpfrontPriceWithChildren": 0,
							"originalTotalPrices": [],
							"originalUnitPrices": []
						}
					}
				] as any as BasketItem[];

				const result: BasketItem[] = BasketUtil.getBasketItemsWithPrices(basketItemsThatHavePricesButWhoseChildrenDoNot) as any as BasketItem[];
				expect(result).toHaveLength(1);
				expect(result[0]!.id).toEqual(basketItemsThatHavePricesButWhoseChildrenDoNot[0].id);
				expect(result[0]!.attributes!.childBasketItems).toHaveLength(0);
			});

			it("returns basket items that do not have prices but some of their children do have prices", () => {
				const basketItemsThatDontHavePricesButWhoseChildrenDo = [
					{
						"id": "572f94a3-f5f2-4cc2-ad55-37e6355837fc",
						"type": "basketItems",
						"attributes": {
							"basketProductId": "b555061c-1caa-469e-9a04-baad9cf99bfb",
							"product": {
								"id": "PO_Base",
								"prices": [],
								"totalUpfrontPrice": 0,
							},
							"totalUpfrontPrice": 0,
							"totalPrices": [],
							"childBasketItems": [
								{
									"id": "abbccc9b-d0e6-403a-aca5-72200e4c7a60",
									"product": {
										"id": "PO_SIM_Standard",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [
										{
											"type": "ONE_TIME",
											"name": "Activation cost",
											"chargedUnit": {
												"amount": 19,
												"currency": "EUR",
												"unitOfMeasure": "MONETARY"
											},
											"taxAmount": 0,
											"taxFreeAmount": 19,
											"taxIncludedAmount": 19,
											"taxRate": 0,
											"recurringChargePeriod": {
												"count": 1,
												"interval": "MONTH"
											},
											"currency": "EUR",
											"isUpfront": true,
											"priority": 1
										}
									],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 19
								},
								{
									"id": "faa6cb1a-8b2a-49d2-aa7d-7fbfc0271da0",
									"product": {
										"id": "PO_MCP",
										"prices": [],
										"totalUpfrontPrice": 0,
									},
									"childBasketItems": [],
									"unitPrices": [],
									"totalPrices": [],
									"originalUnitPrices": [],
									"originalTotalPrices": [],
									"totalUpfrontPrice": 0,
									"totalUpfrontPriceWithChildren": 0
								}
							],
							"unitPrices": [],
							"totalUpfrontPriceWithChildren": 19,
							"originalTotalPrices": [],
							"originalUnitPrices": []
						}
					},
					{
						"id": "a-random-uuid",
						"type": "basketItems",
						"attributes": {
							"basketProductId": "another-random-uuid",
							"product": {
								"id": "PO_foobar",
								"prices": [],
								"totalUpfrontPrice": 0,
							},
							"totalUpfrontPrice": 0,
							"totalPrices": [],
							"childBasketItems": [],
							"unitPrices": [],
							"totalUpfrontPriceWithChildren": 0,
							"originalTotalPrices": [],
							"originalUnitPrices": []
						}
					}
				] as any as BasketItem[];

				const result: BasketItem[] = BasketUtil.getBasketItemsWithPrices(basketItemsThatDontHavePricesButWhoseChildrenDo) as any as BasketItem[];
				expect(result).toHaveLength(1);
				expect(result[0]!.id).toEqual(basketItemsThatDontHavePricesButWhoseChildrenDo[0].id);
				expect(result[0]!.attributes!.childBasketItems).toHaveLength(1);
			});
		});
	});

	describe("getBasketItemName()", () => {
		it("returns name from basket item root", () => {
			const basketItemWithNameAtRoot = {
				type: "basketItem",
				name: "Super Plan 9001",
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameAtRoot);
			expect(result).toEqual(basketItemWithNameAtRoot.name);
		});

		it("returns name from basket item attributes", () => {
			const basketItemWithNameInAttributes = {
				type: "basketItem",
				attributes: {
					name: "Super Plan 9001",
				}
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameInAttributes);
			expect(result).toEqual(basketItemWithNameInAttributes.attributes!.name);
		});

		it("returns name from product at basket item root", () => {
			const basketItemWithNameInProductObject = {
				type: "basketItem",
				product: {
					name: "Super Plan 9001",
				},
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameInProductObject);
			expect(result).toEqual(basketItemWithNameInProductObject.product!.name);
		});

		it("returns name from product in basket item attributes", () => {
			const basketItemWithNameInProductObject = {
				type: "basketItem",
				attributes: {
					product: {
						name: "Super Plan 9001",
					},
				}
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameInProductObject);
			expect(result).toEqual(basketItemWithNameInProductObject.attributes!.product!.name);
		});

		it("returns name from commercial enrichments of basket item before anything else", () => {
			const basketItemWithNameInCommercialEnrichment = {
				type: "basketItem",
				name: "Super Plan 9001 at root",
				attributes: {
					name: "Super Plan 9001 in attributes",
					product: {
						name: "Super Plan 9001 in product root",
						commercialEnrichments: [
							{
								conditions: {},
								names: {
									name: "Super Plan 9001 in first commercial enrichment"
								}
							},
							{
								conditions: {},
								language: "ita",
								names: {
									name: "Sottoscrizione Eccellente 9001"
								}
							}
						]
					},
				}
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameInCommercialEnrichment);
			expect(result).toEqual(basketItemWithNameInCommercialEnrichment.attributes!.product!.commercialEnrichments[0].names.name);
		});

		it("returns name from commercial enrichments of basket item for a certain language", () => {
			const basketItemWithNameInCommercialEnrichment = {
				type: "basketItem",
				name: "Super Plan 9001 at root",
				attributes: {
					name: "Super Plan 9001 in attributes",
					product: {
						name: "Super Plan 9001 in product root",
						commercialEnrichments: [
							{
								conditions: {},
								names: {
									name: "Super Plan 9001 in first commercial enrichment"
								}
							},
							{
								conditions: {},
								language: "ita",
								names: {
									name: "Sottoscrizione Eccellente 9001"
								}
							}
						]
					},
				}
			} as any as BasketItem;

			const result = BasketUtil.getBasketItemName(basketItemWithNameInCommercialEnrichment, "ita");
			expect(result).toEqual(basketItemWithNameInCommercialEnrichment.attributes!.product!.commercialEnrichments[1].names.name);
		});
	});
});
