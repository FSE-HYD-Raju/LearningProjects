import ProductUtil from "./ProductUtil";
import { basketItems, poMvpBase, agreementWithRecurringTopUps } from "./ProductUtilTestData";
import { BasketItem, ProductOffering, Product, Agreement, ProductLifecycleStatus, AgreementAttributes } from "../../redux";
import { MockDataMaker } from "../../testUtils";

describe("ProductUtil", () => {
	describe("haveProductsInBasketItemsWithTFormName()", () => {
		it("returns true if product contains an item with instanceCharacteristic 'T_FORM_NAME'", () => {
			const product: Array<BasketItem> = basketItems;
			const result1 = ProductUtil.haveProductsInBasketItemsWithTFormName(product);

			expect(result1).toEqual(true);
		});
	});

	describe("getProductOfferingGroupInProductWithTFormName()", () => {
		it("returns correct productOfferingGroup", () => {
			const product: ProductOffering = poMvpBase;
			const result = ProductUtil.getProductOfferingGroupInProductWithTFormName(product, "TOPUP_THRESHOLD");
			expect(Array.isArray(result)).toBeTruthy();
			expect(result).toHaveLength(1);
			const item = result[0];
			expect(item.id).toBe("GRP_Recurring_TopUps");
		});
	});

	describe("getPathToBasketItemWithTFormName()", () => {
		it("returns true if basket items contains an item with instanceCharacteristic 'T_FORM_NAME'", () => {
			const basketItem: BasketItem = ({
				id: "69c358ad-1cdd-4ee2-a8ab-6c3448001b61",
				type: "basketItems",
				attributes: {
					basketProductId: "861d9963-39fa-4adf-87e5-db0eb2ee5a7f",
					product: {
						id: "basic-bundled-agreements-po",
						name: "BASIC Plan with Marketing agreements",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: []
					},
					quantity: 1,
					lastModifiedAt: "2018-03-13T09:37:15.828Z",
					inputtedCharacteristics: {},
					totalPrices: [],
					childBasketItems: [
						{
							id: "b6cc1aa9-c85a-4354-b022-1d44be37536c",
							quantity: 1,
							inputtedCharacteristics: {},
							basketProductId: "f1e71ed9-6b17-4e4b-a0dd-299cee302134",
							product: {
								id: "phone-directory-po",
								name: "Phone directory",
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								inputCharacteristics: {},
								instanceCharacteristics: {
									T_FORM_NAME: {
										values: [
											{
												value: "PHONE_DIRECTORY",
												name: "PHONE_DIRECTORY"
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: false,
										validation: null,
										name: "T_FORM_NAME",
										priority: null,
										valueRegulator: null,
										purpose: null,
										dataType: null,
										cardinality: {
											max: null,
											min: null
										},
										humanReadableId: null,
										hidden: false,
										maxValue: null,
										minValue: null,
										unitOfMeasure: null,
										validFor: {
											startDate: null,
											endDate: null
										}
									}
								},
								bundlingProductOfferings: null,
								alternateProductOfferings: null
							},
							childBasketItems: [],
							createdAt: "2018-03-13T09:37:15.828Z",
							lastModifiedAt: "2018-03-13T09:37:15.828Z",
							unitPrices: [],
							totalPrices: [],
							originalUnitPrices: [],
							originalTotalPrices: []
						}
					]
				}
			} as any) as BasketItem;
			const result1 = ProductUtil.getPathToBasketItemWithTFormName(basketItem);

			expect(result1).toEqual([
				{
					po: "phone-directory-po",
					basketItemId: "b6cc1aa9-c85a-4354-b022-1d44be37536c",
					basketProductId: "f1e71ed9-6b17-4e4b-a0dd-299cee302134"
				}
			]);
		});
	});

	describe("isProductWithTFormName()", () => {
		const product: ProductOffering = ({
			categories: [],
			commercialEnrichments: [],
			id: "accessory-bundle-po",
			inputCharacteristics: {},
			instanceCharacteristics: {
				T_FORM_NAME: {
					values: [{ value: "MARKETING_CONSENT" }]
				}
			},
			name: "A bundle of accessories",
			prices: [],
			productOfferingGroups: []
		} as any) as ProductOffering;

		it("returns true if hideableValues contains product's instanceCharacteristic 'T_FORM_NAME' value", () => {
			const value = ProductUtil.isProductWithTFormName(
				product,
				{
					key: "marketingConsent",
					values: ["MARKETING_CONSENT"]
				},
				{
					key: "mnps",
					values: ["MNP", "MNP_2"]
				},
				{
					key: "phoneDirectory",
					values: ["PHONE_DIRECTORY"]
				}
			);

			// Product contains t_form_name with value MARKETING_CONSENT
			expect(value).toEqual(true);
		});
	});

	describe("hasTopUps()", () => {
		const createProductOfferingGroup = (value: string) => {
			return {
				productOfferings: [
					{
						instanceCharacteristics: {
							T_FORM_NAME: {
								values: [
									{
										value
									}
								]
							}
						}
					}
				]
			};
		};

		const createProduct = (...values: Array<string>): ProductOffering => {
			return ({
				attributes: {
					productOfferingGroups: values.map(createProductOfferingGroup)
				}
			} as any) as ProductOffering;
		};

		const topUpsIdentifier = {
			key: "T_FORM_NAME",
			values: ["TOPUP_THRESHOLD", "TOPUP_SMART", "TOPUP_TIME_WEEK", "TOPUP_TIME_MONTH"]
		};

		it("should return false for product without top-up's 'T_FORM_NAME' value", () => {
			const value = ProductUtil.hasTopUps(createProduct("MARKETING_CONSENT"), topUpsIdentifier);

			expect(value).toBeFalsy();
		});

		it("should return true for product within top-up's 'T_FORM_NAME' value", () => {
			const value = ProductUtil.hasTopUps(createProduct("MARKETING_CONSENT", "TOPUP_TIME_WEEK"), topUpsIdentifier);

			expect(value).toBeTruthy();
		});
	});

	describe("getPhoneNumberFromBasketItems", () => {
		it("should return false no instance characteristic 'resourceSpecificationId' exists on top level item", () => {
			const basketItem = ({
				attributes: {
					product: {
						instanceCharacteristics: {}
					}
				}
			} as any) as BasketItem;

			const result = ProductUtil.getPhoneNumberFromBasketItems([basketItem], "1234");

			expect(result).toBe(false);
		});

		it("should return true if instance characteristic 'resourceSpecificationId' exists on top level item", () => {
			const basketItem = ({
				attributes: {
					product: {
						instanceCharacteristics: {
							resourceSpecificationId: {
								values: [
									{
										value: 1234
									}
								]
							}
						}
					}
				}
			} as any) as BasketItem;

			const result: boolean = ProductUtil.getPhoneNumberFromBasketItems([basketItem], "1234");

			expect(result).toBe(true);
		});
	});

	describe("getProductFromAgreementByCharacteristicKey", () => {
		it("should find correct product with specified parameters from deep hierarchy with multiple matches with different lifecycleStatuses", () => {
			const agreement = agreementWithRecurringTopUps;
			const characteristicKey = "CH_TopUp_Type";
			const characteristicValues = ["Threshold", "Time", "Smart"];
			const productLifecycleStatus = ProductLifecycleStatus.ACTIVE;

			const result: Product[] = ProductUtil.getProductFromAgreementByCharacteristicKey({
				agreement,
				characteristicKey,
				characteristicValues,
				productLifecycleStatus
			});
			expect(result.length).toBe(1);
			expect(result[0].id).toBe("c4c02bb5-906f-4ea3-b3a8-a4a4f90f380e");
		});

		it("should find correct product with specified parameters from deep hierarchy, ignoring lifecycleStatus", () => {
			const agreement = agreementWithRecurringTopUps;
			const characteristicKey = "CH_TopUp_Type";
			const characteristicValues = ["Threshold", "Time", "Smart"];

			const result: Product[] = ProductUtil.getProductFromAgreementByCharacteristicKey({
				agreement,
				characteristicKey,
				characteristicValues
			});
			expect(result.map(r => r.id)).toEqual([
				"dae263f2-2379-49ef-8fb6-2dec5b23bf30",
				"c4c02bb5-906f-4ea3-b3a8-a4a4f90f380e",
				"0b08e3cc-8a14-4ed2-9034-0134e18f07d3"
			]);
		});

		it("should find correct product with specified parameters from deep hierarchy, ignoring lifecycleStatus and characteristicValues", () => {
			const agreement = agreementWithRecurringTopUps;
			const characteristicKey = "CH_TopUp_Type";

			const result: Product[] = ProductUtil.getProductFromAgreementByCharacteristicKey({
				agreement,
				characteristicKey
			});
			expect(result.map(r => r.id)).toEqual([
				"dae263f2-2379-49ef-8fb6-2dec5b23bf30",
				"c4c02bb5-906f-4ea3-b3a8-a4a4f90f380e",
				"0b08e3cc-8a14-4ed2-9034-0134e18f07d3"
			]);
		});

		it("should not find product with made up characteristicValue", () => {
			const agreement = agreementWithRecurringTopUps;
			const characteristicKey = "CH_TopUp_Type";
			const characteristicValues = ["SpurdoHurrDurrDerp"];

			const result: Product[] = ProductUtil.getProductFromAgreementByCharacteristicKey({
				agreement,
				characteristicKey,
				characteristicValues
			});

			expect(result.length).toBe(0);
		});

		it("should not find product if lifecycleStatus filter fails", () => {
			const agreement = agreementWithRecurringTopUps;
			const characteristicKey = "CH_TopUp_Type";
			const characteristicValues = ["Threshold", "Time", "Smart"];
			const productLifecycleStatus = ProductLifecycleStatus.WAITING_FOR_ACTIVATION;

			const result: Product[] = ProductUtil.getProductFromAgreementByCharacteristicKey({
				agreement,
				characteristicKey,
				characteristicValues,
				productLifecycleStatus
			});

			expect(result.length).toBe(0);
		});
	});
	const PRODUCT_WITH_NESTED_CHILDREN = MockDataMaker.product.make({
		id: "level-1",
		childProducts: [
			MockDataMaker.product.make({
				id: "level-1.1",
				childProducts: [MockDataMaker.product.make({ id: "level-1.1.1" }), MockDataMaker.product.make({ id: "level-1.1.2" })]
			}),
			MockDataMaker.product.make({
				id: "level-1.2",
				childProducts: [MockDataMaker.product.make({ id: "level-1.2.1" }), MockDataMaker.product.make({ id: "level-1.2.2" })]
			})
		]
	});

	describe("getChildProductsRecursively", () => {
		it("should return all child products recursively", () => {
			const products = ProductUtil.getChildProductsRecursively(PRODUCT_WITH_NESTED_CHILDREN);
			expect(products).toHaveLength(6);
		});
	});
	describe("getProductsAndChildProductsRecursively", () => {
		it("should return all products and their child products recursively", () => {
			const agreement = ({ products: [PRODUCT_WITH_NESTED_CHILDREN, PRODUCT_WITH_NESTED_CHILDREN] } as Partial<Agreement>) as Agreement;
			const products = ProductUtil.getProductsAndChildProductsRecursively(agreement);
			expect(products).toHaveLength(6 * 2 + 2);
		});
	});

	describe("getProductId()", () => {
		it("returns id for a basket item with product inside attributes", () => {
			const basketItem = {
				attributes: {
					product: {
						id: "foo"
					}
				}
			} as BasketItem;
			const id = ProductUtil.getProductId(basketItem);
			expect(id).toEqual(basketItem.attributes!.product!.id);
		});

		it("returns id for a basket item with product at root", () => {
			const basketItem = {
				product: {
					id: "foo"
				}
			} as BasketItem;
			const id = ProductUtil.getProductId(basketItem);
			expect(id).toEqual(basketItem.product!.id);
		});

		it("returns a product's id in attributes", () => {
			const product = {
				attributes: {
					id: "foo"
				}
			} as Product;
			const id = ProductUtil.getProductId(product);
			expect(id).toEqual(product.attributes!.id);
		});

		it("returns a product's id at root", () => {
			const product = {
				id: "foo"
			} as Product;
			const id = ProductUtil.getProductId(product);
			expect(id).toEqual(product.id);
		});
	});
	describe("getPlanFromAgreement", () => {
		const agreement = ({ products: [MockDataMaker.product.ACTIVE_SUBSCRIPTION_WITH_ADDONS_AND_PLAN] } as Partial<Agreement>) as Agreement;
		const agreementWithSubscriptionAsPlan = ({ products: [MockDataMaker.product.ACTIVE_SUBSCRIPTION_AS_PLAN] } as Partial<Agreement>) as Agreement;
		it("should return plan product which has all categories ids when agreement has hierarchy subscription->addons,plan", () => {
			const plan = ProductUtil.getPlanFromAgreement(agreement, [MockDataMaker.product.PLAN_CATEGORY_ID, MockDataMaker.product.COMMERCIAL_CATEGORY_ID]);
			expect(plan).toBe(MockDataMaker.product.PLAN);
		});
		it("should return product which has all categories ids when subscription product acts like plan", () => {
			const plan = ProductUtil.getPlanFromAgreement(agreementWithSubscriptionAsPlan, [
				MockDataMaker.product.PLAN_CATEGORY_ID,
				MockDataMaker.product.COMMERCIAL_CATEGORY_ID
			]);
			expect(plan).toBe(MockDataMaker.product.ACTIVE_SUBSCRIPTION_AS_PLAN);
		});
		it("should return undefined when product not found by matching all categories", () => {
			const plan = ProductUtil.getPlanFromAgreement(agreement, [MockDataMaker.product.PLAN_CATEGORY_ID, "unknown category"]);
			expect(plan).toBeUndefined();
		});
		it("should return undefined when product not found by matching single category", () => {
			const plan = ProductUtil.getPlanFromAgreement(agreement, ["unknown category"]);
			expect(plan).toBeUndefined();
		});
		it("should return undefined when categories ids list is empty", () => {
			const plan = ProductUtil.getPlanFromAgreement(agreement, []);
			expect(plan).toBeUndefined();
		});
	});
	describe("getPlanFromSubscription", () => {
		const subscription = MockDataMaker.product.ACTIVE_SUBSCRIPTION_WITH_ADDONS_AND_PLAN;
		const subscriptionAsPlan = MockDataMaker.product.ACTIVE_SUBSCRIPTION_AS_PLAN;
		it("should return plan product which has all categories ids when subscription has hierarchy subscription->addons,plan", () => {
			const plan = ProductUtil.getPlanFromSubscription(subscription, [
				MockDataMaker.product.PLAN_CATEGORY_ID,
				MockDataMaker.product.COMMERCIAL_CATEGORY_ID
			]);
			expect(plan).toBe(MockDataMaker.product.PLAN);
		});
		it("should return product which has all categories ids when subscription product acts like plan", () => {
			const plan = ProductUtil.getPlanFromSubscription(subscriptionAsPlan, [
				MockDataMaker.product.PLAN_CATEGORY_ID,
				MockDataMaker.product.COMMERCIAL_CATEGORY_ID
			]);
			expect(plan).toBe(MockDataMaker.product.ACTIVE_SUBSCRIPTION_AS_PLAN);
		});
		it("should return undefined when product not found by matching all categories", () => {
			const plan = ProductUtil.getPlanFromSubscription(subscription, [MockDataMaker.product.PLAN_CATEGORY_ID, "unknown category"]);
			expect(plan).toBeUndefined();
		});
		it("should return undefined when product not found by matching single category", () => {
			const plan = ProductUtil.getPlanFromSubscription(subscription, ["unknown category"]);
			expect(plan).toBeUndefined();
		});
		it("should return undefined when categories ids list is empty", () => {
			const plan = ProductUtil.getPlanFromSubscription(subscription, []);
			expect(plan).toBeUndefined();
		});
	});

	describe("getPhoneNumbersToAgreementsMap", () => {
		it("should return empty map when no agreements", () => {
			const phoneNumberToAgreementMap = ProductUtil.getPhoneNumbersToAgreementsMap([]);
			expect(Object.keys(phoneNumberToAgreementMap)).toHaveLength(0);
		});
		it("should return empty map when no agreements don't have phoneNumbers", () => {
			const phoneNumberToAgreementMap = ProductUtil.getPhoneNumbersToAgreementsMap([
				MockDataMaker.agreement.make({ products: [] }),
				MockDataMaker.agreement.make({ products: [] })
			]);
			expect(Object.keys(phoneNumberToAgreementMap)).toHaveLength(0);
		});
		it("should return map phoneNumber1->agreement1, phoneNumber2->agreement2", () => {
			const agreement1 = MockDataMaker.agreement.make({ products: [MockDataMaker.product.makeSubscription({ phoneNumber: "001", id: "agreement1" })] });
			const agreement2 = MockDataMaker.agreement.make({ products: [MockDataMaker.product.makeSubscription({ phoneNumber: "002", id: "agreement2" })] });
			const phoneNumberToAgreementMap = ProductUtil.getPhoneNumbersToAgreementsMap([agreement1, agreement2]);
			expect(phoneNumberToAgreementMap).toMatchObject({
				"001": agreement1,
				"002": agreement2
			});
		});
	});
});
