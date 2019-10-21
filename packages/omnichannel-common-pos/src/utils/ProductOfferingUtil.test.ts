import { get } from "lodash";
import {
	ProductOffering,
	Configurations,
	Characteristic,
	ProductOfferingGroup,
	Allowance,
	PriceComponentPriceType,
	ProductOfferingsConfigObject
} from "../redux";
import ProductOfferingUtil from "./ProductOfferingUtil";

const prices = require("./testdata/prices.json");
const priceWithName: PriceComponentPriceType = prices[0];
const priceWithCommercialEnrichment: PriceComponentPriceType = prices[1];
const priceWithoutName: PriceComponentPriceType = prices[2];
const product: ProductOffering = require("./testdata/product.json");
const productWithoutName: ProductOffering = require("./testdata/productWithoutName.json");
const productWithManyLayers = require("./testdata/product_with_many_layers.json");
const productWithPricesAndPos: ProductOffering = require("./testdata/productWithPricesAndPos.json");
const productThatHasNoPriceWithPosThatHavePrices: ProductOffering = require("./testdata/productThatHasNoPriceWithPosThatHavePrices.json");
const productThatHasPriceOnOnePosAndOtherPosChildren: ProductOffering = require("./testdata/productThatHasPriceOnOnePosAndOtherPosChildren.json");
const configurations: Configurations = require("./testdata/configurations.json");
const configurations2: Configurations = require("./testdata/configurations2.json");
const productSuperb: ProductOffering = require("./testdata/productSuperb.json");
const productSuperbModified: ProductOffering = require("./testdata/productSuperbModified.json");
const poTigo: ProductOffering = require("./testdata/poTigoPrepago.json");
const po10mb: ProductOffering = require("./testdata/po10mb4min.json");

const mockProductWithAFewInputCharacteristics: ProductOffering = require("./testdata/mockProductWithAFewInputCharacteristics.json");
const prepaidMaxPlan: ProductOffering = require("./testdata/prepaidMaxPlan.json");

const poBase: any = require("../../fixtures/PO_Base");
const poYoungDigitalEdition: any = require("../../fixtures/PO_YoungDigital");
const allowance: any = require("../../fixtures/Allowance");
const poBaseConfiguration: any = require("../../fixtures/PO_Base_configuration").PO_Base;
const poChangeMsisdn: any = require("../../fixtures/PO_Change_MSISDN");

describe("ProductOfferingUtil", () => {
	describe("makeDefaultSelections()", () => {
		it("sets default selections also into attributes inputtedCharacteristics", () => {
			ProductOfferingUtil.makeDefaultSelections([product]);

			expect(get(product, "attributes.inputtedCharacteristics.color")).toEqual("black");
			expect(get(product, "attributes.inputtedCharacteristics.memory")).toEqual("32Gb");
		});
	});

	describe("mergeConfigurations()", () => {
		it("merges configurations into product-offerings", () => {
			const mergedConfigurations = ProductOfferingUtil.mergeConfigurations(
				product,
				configurations
			) as ProductOffering;

			const firstPogPos = get(mergedConfigurations, "attributes.productOfferingGroups[0].productOfferings");
			expect(firstPogPos.length).toEqual(3);

			const voice = firstPogPos.find((po: ProductOffering) => po.id === "voicemail-po");

			expect(voice.id).toEqual("voicemail-po");
			expect(voice.selected).toEqual(true);

			const debt = firstPogPos.find((po: ProductOffering) => po.id === "debt-barring-po");

			expect(debt.id).toEqual("debt-barring-po");
			expect(debt.selected).toEqual(false);

			const temp = firstPogPos.find((po: ProductOffering) => po.id === "temp-barring-po");

			expect(temp.id).toEqual("temp-barring-po");
			expect(temp.selected).toEqual(false);

			const directPos = get(mergedConfigurations, "attributes.productOfferings");
			expect(directPos.length).toEqual(3);

			const msisdn = directPos.find((po: ProductOffering) => po.specificationId === "msisdn");
			expect(msisdn.specificationId).toEqual("msisdn");
		});

		it("isConfigurable returns TRUE IF SOME of products attributes.productOfferings.inputCharacteristics contains NONE EMPTY object", () => {
			const isConfigurable = ProductOfferingUtil.isConfigurable(mockProductWithAFewInputCharacteristics);
			expect(isConfigurable).toBe(true);
		});

		it("isConfigurable returns FALSE IF ALL products attributes.productOfferings contains EMPTY inputCharacteristics", () => {
			const mockProduct = {
				attributes: {
					productOfferings: [
						{
							inputCharacteristics: {}
						},
						{
							inputCharacteristics: {}
						},
						{
							inputCharacteristics: {}
						}
					]
				}
			} as ProductOffering;

			const isConfigurable = ProductOfferingUtil.isConfigurable(mockProduct);
			expect(isConfigurable).toBe(false);
		});

		it("isConfigurable returns TRUE IF products contains at least ONE productOfferingGroups", () => {
			const mockProduct = {
				attributes: {
					productOfferings: [
						{
							inputCharacteristics: {}
						},
						{
							inputCharacteristics: {}
						},
						{
							inputCharacteristics: {}
						}
					],
					productOfferingGroups: [
						{
							cardinality: {
								max: 1,
								min: 1
							},
							productOfferings: [{ inputCharacteristics: {} }]
						}
					]
				}
			} as ProductOffering;

			const isConfigurable = ProductOfferingUtil.isConfigurable(mockProduct);
			expect(isConfigurable).toBe(true);
		});

		/* RUBT-69501, RUBT-69835 */
		it("places a productOffering configuration to correct PO (by matching the id)", () => {
			const numberValue = "0123006285";
			const iccValue = "9000";

			const configuredPlan = ProductOfferingUtil.mergeConfigurations(prepaidMaxPlan, configurations2);

			const productOfferings = get(configuredPlan, "attributes.productOfferings");
			const configuredProductOfferings = productOfferings.filter(
				(po: ProductOffering) => po.id === "msisdn-sim-po"
			)[0].productOfferings;

			const posInputtedCharacteristics = configuredProductOfferings.reduce((stack: any, value: any) => {
				if ("number" in value.inputtedCharacteristics) {
					stack.number = value.inputtedCharacteristics.number;
				}
				if ("icc" in value.inputtedCharacteristics) {
					stack.icc = value.inputtedCharacteristics.icc;
				}
				return stack;
			}, {});
			expect(posInputtedCharacteristics.number).toEqual(numberValue);
			expect(posInputtedCharacteristics.icc).toEqual(iccValue);
		});
	});

	describe("getPriceName()", () => {
		it("return price name if price has name", () => {
			const priceName = ProductOfferingUtil.getPriceName(productWithoutName, priceWithName);
			expect(priceName).toEqual(priceWithName.originalPrice && priceWithName.originalPrice.name);
		});

		it("return price commercialEnrichment name if price has commercialEnrichment", () => {
			const priceName = ProductOfferingUtil.getPriceName(product, priceWithCommercialEnrichment);
			expect(priceName).toEqual(
				priceWithCommercialEnrichment.originalPrice &&
				priceWithCommercialEnrichment.originalPrice.commercialEnrichment &&
				priceWithCommercialEnrichment.originalPrice.commercialEnrichment.names.name
			);
		});

		it("return price product name if price doesn't have name and commercialEnrichment", () => {
			const priceName = ProductOfferingUtil.getPriceName(product, priceWithoutName);
			expect(priceName).toEqual(ProductOfferingUtil.getPOName(product));
		});
	});

	describe("getCommercialEnrichmentValueFromPrice()", () => {
		it("return commercialEnrichment field value, if it exist", () => {
			const fieldValue =
				ProductOfferingUtil.getCommercialEnrichmentValueFromPrice(priceWithCommercialEnrichment, "names", "name");
			expect(fieldValue).toEqual(
				priceWithCommercialEnrichment.originalPrice &&
				priceWithCommercialEnrichment.originalPrice.commercialEnrichment &&
				priceWithCommercialEnrichment.originalPrice.commercialEnrichment.names.name);
		});

		it("return undefined if there is no commercialEnrichment", () => {
			const fieldValue =
				ProductOfferingUtil.getCommercialEnrichmentValueFromPrice(priceWithoutName, "names", "name");
			expect(fieldValue).toEqual(undefined);
		});
	});

	describe("getPrice()", () => {
		it("counts bundle price correct when price is set on main product and has no pos", () => {
			const oneTimePrice = ProductOfferingUtil.getPrice(product, "ONE_TIME");
			const recurringPrice = ProductOfferingUtil.getPrice(product, "RECURRENT");

			expect(oneTimePrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 1 }));
			expect(recurringPrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 9.95 }));
		});

		it("counts bundle price correct when price is set on main product and has pos", () => {
			const oneTimePrice = ProductOfferingUtil.getPrice(productWithPricesAndPos, "ONE_TIME");
			const recurringPrice = ProductOfferingUtil.getPrice(productWithPricesAndPos, "RECURRENT");

			expect(oneTimePrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 1 }));
			expect(recurringPrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 9.95 }));
		});

		it("counts bundle price correct when no price on main product but has price on pos", () => {
			const oneTimePrice = ProductOfferingUtil.getPrice(productThatHasNoPriceWithPosThatHavePrices, "ONE_TIME");
			const recurringPrice = ProductOfferingUtil.getPrice(
				productThatHasNoPriceWithPosThatHavePrices,
				"RECURRENT"
			);

			expect(oneTimePrice).toEqual(expect.objectContaining({
				currency: "EUR",
				taxFreeAmount: 30
			}));

			expect(recurringPrice).toEqual({});
		});

		it(
			"counts bundle price correct when no price on main product but has price on one po, " +
			"and prices on children of another po and some pogs under that po",
			() => {
				const oneTimePrice = ProductOfferingUtil.getPrice(
					productThatHasPriceOnOnePosAndOtherPosChildren,
					"ONE_TIME"
				);
				const recurringPrice = ProductOfferingUtil.getPrice(
					productThatHasPriceOnOnePosAndOtherPosChildren,
					"RECURRENT"
				);

				expect(oneTimePrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 90 }));
				expect(recurringPrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 15 }));
			}
		);

		it("counts bundle price correct when no price on main product but has price on one po, and prices on children of another po", () => {
			const oneTimePrice = ProductOfferingUtil.getPrice(productSuperbModified, "ONE_TIME");
			const recurringPrice = ProductOfferingUtil.getPrice(productSuperbModified, "RECURRENT");

			expect(oneTimePrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 6 }));
			expect(recurringPrice).toEqual(expect.objectContaining({ currency: "EUR", taxFreeAmount: 23.95 }));
		});
	});

	describe("getPriceRange()", () => {
		it("counts bundle priceRange correct when price is set on main product and has no pos", () => {
			const oneTimePriceRange = ProductOfferingUtil.getPriceRange(product, "ONE_TIME");
			const recurringPriceRange = ProductOfferingUtil.getPriceRange(product, "RECURRENT");

			expect(oneTimePriceRange).toEqual({ currency: "EUR", min: 1, max: 1 });
			expect(recurringPriceRange).toEqual({ currency: "EUR", min: 9.95, max: 9.95 });
		});

		it("counts bundle priceRange correct with bunch of pos and pogs", () => {
			const oneTimePriceRange = ProductOfferingUtil.getPriceRange(productSuperb, "ONE_TIME");
			const recurringPriceRange = ProductOfferingUtil.getPriceRange(productSuperb, "RECURRENT");

			expect(oneTimePriceRange).toEqual({ currency: "EUR", min: 1, max: 508 });
			expect(recurringPriceRange).toEqual({ currency: "EUR", min: 19.45, max: 42.45 });
		});

		it("counts bundle priceRange correct when pogs are under po", () => {
			const oneTimePriceRange = ProductOfferingUtil.getPriceRange(productSuperbModified, "ONE_TIME");
			const recurringPriceRange = ProductOfferingUtil.getPriceRange(productSuperbModified, "RECURRENT");

			expect(oneTimePriceRange).toEqual({ currency: "EUR", min: 1, max: 508 });
			expect(recurringPriceRange).toEqual({ currency: "EUR", min: 19.45, max: 42.45 });
		});
	});

	describe("getSimplePrice()", () => {
		it("does not count child items even when parent has no price", () => {
			const oneTimePrice = ProductOfferingUtil.getSimplePrice(
				productThatHasNoPriceWithPosThatHavePrices,
				"ONE_TIME"
			);
			expect(oneTimePrice).toEqual({});
		});

		it("counts price properly from parent, ignoring children", () => {
			const oneTimePrice = ProductOfferingUtil.getSimplePrice(productWithPricesAndPos, "ONE_TIME");
			const recurrentPrice = ProductOfferingUtil.getSimplePrice(productWithPricesAndPos, "RECURRENT");

			expect(oneTimePrice.taxFreeAmount).toEqual(1);
			expect(oneTimePrice.currency).toEqual("EUR");
			expect(recurrentPrice.taxFreeAmount).toEqual(9.95);
			expect(recurrentPrice.currency).toEqual("EUR");
		});

		// it("counts price properly when inputterCharacteristics are used to filter it", () => {
		// 	const oneTimePrice = ProductOfferingUtil.getSimplePrice(basketItemsWithInputtedCharacteristicsToDeterminePrice, PriceTypeEnum.ONE_TIME);
		// 	expect(oneTimePrice.taxFreeAmount).toEqual(495);
		// 	expect(oneTimePrice.currency).toEqual("EUR");
		// });

		it("returns all instanceCharacteristics from product and child POs", () => {
			const result = ProductOfferingUtil.getAllInstanceCharacteristics(productWithPricesAndPos);
			expect(result.length).toEqual(5);
		});

		it("returns all inputCharacteristics from product and child POs", () => {
			const result = ProductOfferingUtil.getAllInputCharacteristics(productSuperb);
			expect(result.length).toEqual(4);
		});

		it("returns true if product or some child PO include given instanceCharacteristics", () => {
			const product = productWithPricesAndPos;

			const result1 = ProductOfferingUtil.hasInstanceCharacteristic("brand", product);
			const result2 = ProductOfferingUtil.hasInstanceCharacteristic("foo", product);

			expect(result1).toEqual(true);
			expect(result2).toEqual(false);
		});

		it("returns true if product or some child PO include given inputCharacteristics", () => {
			const product = productSuperb;

			const result1 = ProductOfferingUtil.hasInputCharacteristic("number", product);
			const result2 = ProductOfferingUtil.hasInputCharacteristic("number-type", product);
			const result3 = ProductOfferingUtil.hasInputCharacteristic("bar", product);

			expect(result1).toEqual(true);
			expect(result2).toEqual(true);
			expect(result3).toEqual(false);
		});
	});

	describe("RND-25025", () => {
		const config = {
			config: [
				{
					source: "Internal",
					hidden: true,
					mandatory: true,
					characteristics: {
						CH_NumberResource: {
							valueFrom: "MSISDN_OF_SUBSCRIPTION"
						},
						CH_ReservedFor: {
							valueFrom: "RESERVED_FOR"
						},
						CH_Activation_model: {
							valueFrom: "FLOW_BASED"
						},
						CH_Parent_ID: {
							valueFrom: "SUBSCRIPTION_PRODUCT_UUID"
						},
						CH_Payment_Method: {
							exactValue: null
						}
					}
				},
				{
					source: "Internal",
					hidden: true,
					mandatory: false,
					characteristics: {
						CH_Already_Paid: {
							exactValue: null
						},
						CH_SMS_Dialogue: {
							exactValue: "true"
						}
					}
				}
			]
		};
		it("should set value true for CH_SMS_Dialogue", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(po10mb.attributes && po10mb.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_SMS_Dialogue"),
				inputCharacteristicKey: "CH_SMS_Dialogue"
			});
			expect(value.value).toBe("true");
			expect(value.hidden).toBe(true);
		});
		it("should set ignore value for CH_Already_Paid", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(po10mb.attributes && po10mb.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_Already_Paid"),
				inputCharacteristicKey: "CH_Already_Paid"
			});
			expect(value.value).toBeNull();
			expect(value.hidden).toBe(true);
		});
		it("should set msisdn as value for CH_NumberResource", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(po10mb.attributes && po10mb.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_NumberResource"),
				inputCharacteristicKey: "CH_NumberResource",
				msisdn: "123123123"
			});
			expect(value.value).toBe("123123123");
			expect(value.hidden).toBe(true);
		});
		it("should set subscription product id as value for CH_Parent_ID", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(po10mb.attributes && po10mb.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_Parent_ID"),
				inputCharacteristicKey: "CH_Parent_ID",
				parentId: "parent_id"
			});
			expect(value.value).toBe("parent_id");
			expect(value.hidden).toBe(true);
		});
		it("should set nomination as value for CH_Activation_model in nomination purchase flow", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(poTigo.attributes && poTigo.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_Activation_model"),
				inputCharacteristicKey: "CH_Activation_model",
				flow: "nomination"
			});
			expect(value.value).toBe("nomination");
			expect(value.hidden).toBe(true);
		});
		it("should set direct as value for CH_Activation_model in nomination purchase flow", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(poTigo.attributes && poTigo.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_Activation_model"),
				inputCharacteristicKey: "CH_Activation_model",
				flow: "direct"
			});
			expect(value.value).toBe("direct");
			expect(value.hidden).toBe(true);
		});
		it("should set msisdns.reserved-for as value for CH_ReservedFor", () => {
			const inputCharacteristics: Record<string, Characteristic> =
				(poTigo.attributes && poTigo.attributes.inputCharacteristics) || {};
			const value: any = ProductOfferingUtil.getValueForCharacteristic({
				config,
				inputCharacteristic: get(inputCharacteristics, "CH_ReservedFor"),
				inputCharacteristicKey: "CH_ReservedFor",
				reservedFor: "11111"
			});
			expect(value.value).toBe("11111");
			expect(value.hidden).toBe(true);
		});
	});

	describe("RUBT-104269 Merge function not returning merged object when left object is empty", () => {
		it("should return right object when left object is empty", () => {
			const left = {};
			const right: any = { CH_Tax_Payer_Name: "test" };
			const key = "inputtedCharacteristics";
			const result = ProductOfferingUtil.mergeFunction(left, right, key);

			Object.keys(right).forEach(function (k: string) {
				expect(result[k]).toBe(right[k]);
			});
		});
		it("should merge left and right objects when both have values", () => {
			const left: any = { CH_Activation_model: "kopo" };
			const right: any = { CH_Tax_Payer_Name: "test" };
			const key = "inputtedCharacteristics";
			const result = ProductOfferingUtil.mergeFunction(left, right, key);

			Object.keys(right).forEach(function (k: string) {
				expect(result[k]).toBe(right[k]);
			});
			Object.keys(left).forEach(function (k: string) {
				expect(result[k]).toBe(left[k]);
			});
		});
		it("should merge left and right objects when both have values and patch the attribute that has same key with new value", () => {
			const left: any = { CH_Activation_model: "kopo" };
			const right: any = { CH_Activation_model: "new kopo", CH_Tax_Payer_Name: "test" };
			const key = "inputtedCharacteristics";
			const result = ProductOfferingUtil.mergeFunction(left, right, key);

			expect(Object.keys(result).length).toEqual(2);
			Object.keys(right).forEach(function (k: string) {
				expect(result[k]).toBe(right[k]);
			});
		});
	});

	describe("getPoFromProductOfferingByPath()", () => {
		it("should find PO itself with path length of 1", () => {
			const path = [
				{ po: "base" }
			];
			const result = ProductOfferingUtil.getPoFromProductOfferingByPath(productWithManyLayers, path) as ProductOffering;
			expect(result).toBeDefined();
			expect(result && result.id).toBe("base");
		});

		it("should find PO with path", () => {
			const path = [
				{ po: "base" },
				{ pog: "cool-group-with-sub-products" },
				{ po: "sub-product" }
			];
			const result = ProductOfferingUtil.getPoFromProductOfferingByPath(productWithManyLayers, path) as ProductOffering;
			expect(result).toBeDefined();
			expect(result && result.id).toBe("sub-product");
		});

		it("should find PO with very long path", () => {
			const path = [
				{ po: "base" },
				{ pog: "cool-group-with-sub-products" },
				{ po: "sub-product" },
				{ pog: "mega-pog" },
				{ po: "yet-another-po" },
				{ pog: "final-group" },
				{ po: "final-po" }
			];
			const result = ProductOfferingUtil.getPoFromProductOfferingByPath(productWithManyLayers, path) as ProductOffering;
			expect(result).toBeDefined();
			expect(result && result.id).toBe("final-po");
		});

		it("should find POG with path", () => {
			const path = [
				{ po: "base" },
				{ pog: "cool-group-with-sub-products" }
			];
			const result = ProductOfferingUtil.getPoFromProductOfferingByPath(productWithManyLayers, path) as ProductOfferingGroup;
			expect(result).toBeDefined();
			expect(result && result.id).toBe("cool-group-with-sub-products");
		});

		it("should find PO-PO with path", () => {
			const path = [
				{ po: "base" },
				{ po: "child-po" }
			];
			const result = ProductOfferingUtil.getPoFromProductOfferingByPath(productWithManyLayers, path) as ProductOfferingGroup;
			expect(result).toBeDefined();
			expect(result && result.id).toBe("child-po");
		});
	});

	describe("getPathToProductOfferingById()", () => {
		it("returns only id of topmost PO when that is looked for", () => {
			const seekedProductId = "base";
			const path = ProductOfferingUtil.getPathToProductOfferingById(productWithManyLayers, seekedProductId);
			expect(path).toHaveLength(1);
			expect(path && Object.keys(path[0])).toContain("po");
			expect(path && path[0].po).toEqual(seekedProductId);
		});

		it("returns po-po when that is looked for", () => {
			const seekedProductId = "child-po";
			const path = ProductOfferingUtil.getPathToProductOfferingById(productWithManyLayers, seekedProductId);
			expect(path).toHaveLength(2);
			expect(path && Object.keys(path[0])).toContain("po");
			expect(path && Object.keys(path[1])).toContain("po");
			expect(path && path[0].po).toEqual("base");
			expect(path && path[1].po).toEqual(seekedProductId);
		});

		it("returns path where id of topmost PO is the first element when a product found at 3rd level is found", () => {
			const seekedProductId = "wrong-sub-product";
			const path = ProductOfferingUtil.getPathToProductOfferingById(productWithManyLayers, seekedProductId);
			expect(path).toHaveLength(3);
			expect(path && Object.keys(path[0])).toContain("po");
			expect(path && Object.keys(path[1])).toContain("pog");
			expect(path && Object.keys(path[2])).toContain("po");
			expect(path && path[0].po).toEqual("base");
			expect(path && path[1].pog).toEqual("cool-group-with-sub-products");
			expect(path && path[2].po).toEqual(seekedProductId);
		});

		it("returns path where id of topmost PO is the first element when a product found at 7th level is found", () => {
			const seekedProductId = "final-po";
			const path = ProductOfferingUtil.getPathToProductOfferingById(productWithManyLayers, seekedProductId);
			expect(path).toHaveLength(7);
			expect(path && Object.keys(path[0])).toContain("po");
			expect(path && Object.keys(path[1])).toContain("pog");
			expect(path && Object.keys(path[2])).toContain("po");
			expect(path && Object.keys(path[3])).toContain("pog");
			expect(path && Object.keys(path[4])).toContain("po");
			expect(path && Object.keys(path[5])).toContain("pog");
			expect(path && Object.keys(path[6])).toContain("po");
			expect(path && path[0].po).toEqual("base");
			expect(path && path[1].pog).toEqual("cool-group-with-sub-products");
			expect(path && path[2].po).toEqual("sub-product");
			expect(path && path[3].pog).toEqual("mega-pog");
			expect(path && path[4].po).toEqual("yet-another-po");
			expect(path && path[5].pog).toEqual("final-group");
			expect(path && path[6].po).toEqual(seekedProductId);
		});
	});

	describe("getProductOfferingByPath", () => {
		const TEST_PRODUCT: any = {
			id: "ConfigurableSubscription_1",
			attributes: {
				productOfferingGroups: [
					{
						id: "grp_configurablesubscription",
						productOfferings: [
							{
								id: "po_configurablesubscription_nested",
								productOfferingGroups: [
									{
										id: "grp_sms",
										productOfferings: [
											{
												id: "po_sms_1"
											}
										]
									},
									{
										id: "grp_data",
										productOfferings: [
											{
												id: "po_data_100"
											},
											{
												id: "po_data_200"
											}
										]
									}
								]
							}
						]
					}
				]
			}
		};

		it("should return undefined when wrong path", () => {
			expect(ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [{}])).toBe(undefined);
			expect(ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [{ po: "wrong" }])).toBe(
				undefined
			);
			expect(ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [{ pog: "wrong" }])).toBe(
				undefined
			);
			expect(
				ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [{ po: "ConfigurableSubscription_1" }, {}])
			).toBe(undefined);
			expect(
				ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [
					{ po: "ConfigurableSubscription_1" },
					{ pog: "wrong" }
				])
			).toBe(undefined);
		});
		it("should return same product when no path", () => {
			expect(ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [])).toBe(TEST_PRODUCT);
			expect(ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, undefined)).toBe(TEST_PRODUCT);
		});
		it("should return same product when path points to root product", () => {
			expect(
				ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [{ po: "ConfigurableSubscription_1" }])
			).toBe(TEST_PRODUCT);
		});
		it("should return product when valid path", () => {
			expect(
				ProductOfferingUtil.getProductOfferingByPath(TEST_PRODUCT, [
					{ po: "ConfigurableSubscription_1" },
					{ pog: "grp_configurablesubscription" },
					{ po: "po_configurablesubscription_nested" }
				])
			).toMatchObject({
				id: "po_configurablesubscription_nested"
			});
		});
	});

	describe("finds selected POs", () => {
		const po1 = {
			id: "PO1",
			productOfferings: []
		} as any as ProductOffering;

		const po1selected = {
			...po1,
			selected: true
		} as ProductOffering;

		const poOptional = {
			id: "PO_Optional",
			productOfferings: []
		} as any as ProductOffering;

		const po3 = {
			id: "PO3",
			productOfferings: []
		} as any as ProductOffering;

		const po4 = {
			id: "PO4",
			productOfferings: [],
			optionalProductOfferings: [
				poOptional
			]
		} as any as ProductOffering;

		const pos1: Array<ProductOffering> = [
			po1,
			{
				id: "PO2",
				productOfferings: []
			} as any as ProductOffering
		];
		const pos2: Array<ProductOffering> = [
			po3,
			{
				id: "PO4",
				productOfferings: [],
				optionalProductOfferings: []
			} as any as ProductOffering
		];
		const pos3: Array<ProductOffering> = [
			{
				id: "PO5",
				productOfferings: [],
				optionalProductOfferings: [
					poOptional
				]
			} as any as ProductOffering,
			{
				id: "PO6",
				productOfferings: [],
				optionalProductOfferings: []
			} as any as ProductOffering
		];

		const pog1 = {
			id: "POG1",
			name: "mock-pog-1",
			msisdnGroup: false,
			productOfferings: pos1,
			productOfferingGroups: [],
			optionalProductOfferings: []
		} as ProductOfferingGroup;

		const pog2 = {
			id: "POG2",
			name: "mock-pog-2",
			msisdnGroup: false,
			productOfferings: pos2,
			productOfferingGroups: [],
			optionalProductOfferings: []
		} as ProductOfferingGroup;

		const pog3 = {
			id: "POG3",
			name: "mock-pog-3",
			msisdnGroup: false,
			productOfferings: pos3,
			productOfferingGroups: [],
			optionalProductOfferings: []
		} as ProductOfferingGroup;

		const pogs = [
			pog1,
			pog2
		];

		const topPO = {
			id: "top-po",
			attributes: {
				productOfferings: pos1,
				productOfferingGroups: [pog2],
				optionalProductOfferings: []
			}
		} as any as ProductOffering;

		describe("#isPOMarkedSelected()", () => {
			it("returns true when PO is marked selected", () => {
				const result = ProductOfferingUtil.isPOMarkedSelected(po1selected);
				expect(!result).toEqual(false);
			});

			it("returns false when PO is not marked selected", () => {
				const result = ProductOfferingUtil.isPOMarkedSelected(po1);
				expect(!result).toEqual(true);
			});
		});

		describe("#isPOSelectedInConfiguration()", () => {
			it("returns true when PO is selected in configuration", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelectedInConfiguration(configuration);
				expect(!result).toEqual(false);
			});

			it("returns true when PO is _not_ selected in configuration", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelectedInConfiguration(configuration);
				expect(!result).toEqual(false);
			});
		});

		describe("#isOptionalPOSelectedInConfiguration()", () => {
			it("returns true when PO is selected in configuration", () => {
				const result = ProductOfferingUtil.isOptionalPOSelectedInConfiguration({
					selected: true
				});
				expect(!result).toEqual(false);
			});

			it("returns false when PO is not selected in configuration", () => {
				const result = ProductOfferingUtil.isOptionalPOSelectedInConfiguration({
					selected: false
				});
				expect(!result).toEqual(true);
			});
		});

		describe("#isPOSelected()", () => {
			const poOptionalSelected = {
				...poOptional,
				selected: true
			};

			it("returns true when mandatory PO is selected in configuration and it is under a POG", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, true);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO is selected in configuration and it is _not_ under a POG", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, false);
				expect(!result).toEqual(false);
			});

			it("returns false when mandatory PO is _not_ selected in configuration and it is under a POG", () => {
				const configuration = {
					selected: false
				};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, true);
				expect(!result).toEqual(true);
			});

			it("returns false when mandatory PO is _not_ selected in configuration and it is _not_ under a POG", () => {
				const configuration = {
					selected: false
				};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, false);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO not under POG is marked selected", () => {
				const configuration = {};

				const result = ProductOfferingUtil.isPOSelected(po1selected, configuration, false, false);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO not under POG is configured selected", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, false);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO under POG is marked selected", () => {
				const configuration = {};

				const result = ProductOfferingUtil.isPOSelected(poOptionalSelected, configuration, false, true);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO under POG is configured selected", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(poOptional, configuration, false, true);
				expect(!result).toEqual(false);
			});

			it("returns true when mandatory PO not under POG is both marked and configured selected", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(poOptionalSelected, configuration, false, false);
				expect(!result).toEqual(false);
			});

			it("returns false when mandatory PO under POG is not marked selected nor configured selected", () => {
				const configuration = {};

				const result = ProductOfferingUtil.isPOSelected(po1, configuration, false, true);
				expect(!result).toEqual(true);
			});

			it("returns true when optional PO is both marked and configured selected", () => {
				const configuration = {
					selected: true
				};

				const result = ProductOfferingUtil.isPOSelected(poOptionalSelected, configuration, true);
				expect(!result).toEqual(false);
			});

			it("returns false when optional PO is not marked selected nor configured selected", () => {
				const configuration = {};

				const result = ProductOfferingUtil.isPOSelected(poOptional, configuration, true);
				expect(!result).toEqual(true);
			});
		});

		/* TODO add test(s) with optional POs too. */
		describe("#findSelectedPOs()", () => {
			it("returns both selected POs from an array of two POs, _not_ under a POG", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
						// PO1: {
						// 	selected: false
						// }
					},
					{
						id: "PO2",
						selected: true
						// PO2: {
						// 	selected: true
						// }
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, false, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(2);
			});

			it("returns one selected PO from an array of two POs, under a POG", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					},
					{
						id: "PO2",
						selected: true
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, true, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(1);
				expect(selected[0].id).toEqual("PO2");
			});

			it("returns no selected PO from an array of two, under a POG", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					},
					{
						id: "PO2",
						selected: false
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, true, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(0);
			});

			it("returns both selected POs from an array of two, _not_ under a POG", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					},
					{
						id: "PO2",
						selected: false
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, false, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(2);
			});

			it("when there is no configuration for one PO, both POs _not_ under a POG are returned", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, false, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(2);
			});

			xit("when there is no configuration for one PO, only the one marked selected is returned from an array of two, _not_ under a POG", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos1, configurations, false, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(1);
				expect(selected[0].id).toEqual("PO1");
			});

			/* This test makes no sense for findSelectedPOs(). */
			xit("finds optional PO selected in configurations, and a mandatory PO", () => {
				const configurations = [
					{
						id: "PO1",
						selected: false
					},
					{
						id: "PO4",
						optionalProductOfferings: [
							{
								id: "PO_Optional",
								selected: true
							}
						],
						selected: true
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOs(pos3, configurations, false, false);
				expect(selected).toBeTruthy();

				const idsOfSelected = selected.map(po => po.id);
				expect(idsOfSelected.sort()).toContain("PO_Optional");
				expect(selected).toHaveLength(1);
				expect(selected[0].id).toEqual("PO1");
			});
		});

		describe("#findSelectedPOsInPOGs()", () => {
			it("returns all POs from an array of two POGs, both containing two POs", () => {
				const configuration = [
					{
						id: "PO-with-two-POGs",
						productOfferingGroups: [
							{
								id: "POG1",
								productOfferings: [
									{
										id: "PO1",
										selected: true
									},
									{
										id: "PO2",
										selected: true
									}
								]
							},
							{
								id: "POG2",
								productOfferings: [
									{
										id: "PO3",
										selected: true
									},
									{
										id: "PO4",
										selected: true
									}
								]
							}
						]
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOsInPOGs(pogs, configuration[0].productOfferingGroups, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(4);
			});

			it("returns the two selected POs from an array of two POs, under a POG", () => {
				const configuration = [
					{
						id: "PO-with-two-POGs",
						productOfferingGroups: [
							{
								id: "POG1",
								productOfferings: [
									{
										id: "PO1",
										selected: false
									},
									{
										id: "PO2",
										selected: true
									}
								]
							},
							{
								id: "POG2",
								productOfferings: [
									{
										id: "PO3",
										selected: true
									},
									{
										id: "PO4",
										selected: false
									}
								]
							}
						]
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOsInPOGs(pogs, configuration[0].productOfferingGroups, false, false);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(2);

				const idsOfSelected = selected.map(po => po.id);
				expect(idsOfSelected.sort()).toEqual(["PO2", "PO3"].sort());
			});

			it("when there is no configuration for one POG, only the POs under the selected one are returned from an array of two POGs", () => {
				const configuration = [
					{
						id: "PO-with-two-POGs",
						productOfferingGroups: [
							{
								id: "POG2",
								productOfferings: [
									{
										id: "PO3",
										selected: true
									},
									{
										id: "PO4",
										selected: false
									}
								]
							}
						]
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOsInPOGs(pogs, configuration[0].productOfferingGroups, false);
				expect(selected).toBeTruthy();

				const idsOfSelected = selected.map(po => po.id);
				expect(selected).toHaveLength(1);

				expect(idsOfSelected).toEqual(["PO3"]);
			});

			it("returns no POs (as none selected) from an array of two POs, under a POG", () => {
				const configuration = [
					{
						id: "PO-with-two-POGs",
						productOfferingGroups: [
							{
								id: "POG1",
								productOfferings: [
									{
										id: "PO1",
										selected: false
									},
									{
										id: "PO2",
										selected: false
									}
								]
							},
							{
								id: "POG2",
								productOfferings: [
									{
										id: "PO3",
										selected: false
									},
									{
										id: "PO4",
										selected: false
									}
								]
							}
						]
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOsInPOGs(pogs, configuration[0].productOfferingGroups, true, true);
				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(0);
			});

			it("finds optional PO selected in configuration", () => {
				const configuration = [
					{
						id: "PO-with-two-POGs",
						productOfferingGroups: [
							{
								id: "POG3",
								productOfferings: [
									{
										id: "PO5",
										selected: true,
										optionalProductOfferings: [
											{
												id: "PO_Optional",
												selected: true
											}
										]
									}
								]
							}
						]
					}
				];

				const selected = ProductOfferingUtil.findSelectedPOsInPOGs([pog3], configuration[0].productOfferingGroups, false, true);
				expect(selected).toBeTruthy();

				const idsOfSelected = selected.map(po => po.id);
				expect(idsOfSelected.sort()).toEqual(["PO5", "PO_Optional"].sort());
			});
		});

		describe("#getSelectedPOsInProduct()", () => {
			it("returns the root product even if it's not selected", () => {
				const selected = ProductOfferingUtil.getSelectedPOsInProduct(poBase, poBaseConfiguration, false);
				expect(selected).toBeTruthy();

				const idsOfSelectedPOs = selected.map(po => po.id);
				expect(idsOfSelectedPOs).toContain(poBase.id);
			});

			it("returns the two selected POs from a POG and one selected from a PO", () => {
				const configuration = {
					id: "top-po",
					name: "Top PO",
					productOfferings: [{
						id: "PO1",
						selected: true
					}],
					productOfferingGroups: [
						{
							id: "POG2",
							productOfferings: [
								{
									id: "PO3",
									selected: false
								},
								{
									id: "PO4",
									selected: true
								}
							]
						} as Record<string, any>
					],
					optionalProductOfferings: []
				} as any as ProductOfferingsConfigObject;

				const selected = ProductOfferingUtil.getSelectedPOsInProduct(topPO, configuration, false);
				expect(selected).toBeTruthy();

				const idsOfSelectedPOs = selected.map(po => po.id);
				expect(selected).toHaveLength(4);

				expect(idsOfSelectedPOs.sort()).toEqual(["top-po", "PO1", "PO2", "PO4"].sort());
			});

			it("returns PO_Base, PO_ConfigurableSubscription_1, PO_YoungDigitalEdition, PO_NumberPortIn, PO_SIM_Standard", () => {
				const selected = ProductOfferingUtil.getSelectedPOsInProduct(poBase, poBaseConfiguration, false);

				expect(selected).toBeTruthy();
				expect(selected).toHaveLength(5);

				const idsOfSelectedPOs = selected.map(po => po.id);
				expect(idsOfSelectedPOs.sort()).toEqual([
					"PO_Base",
					"PO_ConfigurableSubscription_1",
					"PO_YoungDigitalEdition",
					"PO_NumberPortIn",
					"PO_SIM_Standard"
				].sort());
			});

			it("finds an optional PO selected in configuration among other POs", () => {
				const configuration = {
					...poBaseConfiguration
				};
				configuration.productOfferingGroups[0].productOfferings[1].optionalProductOfferings = [
					{
						id: "PO_Travel_Weekly",
						productOfferingGroups: [],
						productOfferings: [],
						selected: true
					}
				];

				const selected = ProductOfferingUtil.getSelectedPOsInProduct(poBase, configuration, false);
				expect(selected).toBeTruthy();

				const idsOfSelectedPOs = selected.map(po => po.id);
				expect(idsOfSelectedPOs).toContain("PO_Travel_Weekly");
				expect(selected.length).toBeGreaterThan(5);
			});
		});
	});

	describe("mergeSubProductToMainProduct", () => {
		const subProductId = "sub-1";
		const mainProduct = {
			id: "main",
			attributes: {
				productOfferings: [
					{
						id: "msisdn-po",
						optionalProductOfferings: [
							{
								id: "1337-sim",
								name: "unmerged"
							}
						]
					}
				],
				productOfferingGroups: [
					{
						id: "addon-group",
						productOfferings: [
							{
								id: subProductId,
								name: "subuTuote",
								productOfferings: [],
								productOfferingGroups: [],
								optionalProductOfferings: []
							}
						]
					}
				]
			}
		} as any as ProductOffering;
		const subProduct = {
			id: subProductId,
			name: "subuTuote",
			productOfferings: [],
			productOfferingGroups: [],
			optionalProductOfferings: [{
				id: "Addon-1",
				name: "Sick addon man"
			},
			{
				id: "Addon-2",
				name: "Sicker addon man"
			}]
		} as any as ProductOffering;
		const simProduct = {
			id: "1337-sim",
			name: "merged"
		} as any as ProductOffering;
		it("should merge subProduct properly", () => {

			const result: ProductOffering | undefined = ProductOfferingUtil.mergeSubProductToMainProduct(mainProduct, subProduct);
			const mergedSubProduct: ProductOffering = get(result, "attributes.productOfferingGroups[0].productOfferings[0]");

			expect(mergedSubProduct).toBeTruthy();
			expect(mergedSubProduct && mergedSubProduct.optionalProductOfferings && mergedSubProduct.optionalProductOfferings.length).toBe(2);
		});
		it("should merge subProduct properly under po -> optional", () => {

			const result: ProductOffering | undefined = ProductOfferingUtil.mergeSubProductToMainProduct(mainProduct, simProduct);
			const mergedSubProduct: ProductOffering = get(result, "attributes.productOfferings[0].optionalProductOfferings[0]");

			expect(mergedSubProduct).toBeTruthy();
			expect(mergedSubProduct && mergedSubProduct.name).toBe("merged");
		});
	});

	describe("getProductOfferingFromProductOfferingById", () => {
		const productOffering = {
			id: "main",
			attributes: {
				productOfferings: [
					{
						id: "subPo"
					}
				],
				optionalProductOfferings: [
					{
						id: "optPo"
					}
				],
				productOfferingGroups: [
					{
						id: "pog",
						productOfferings: [
							{
								id: "pogPo"
							}
						]
					}
				],
				optionalProductOfferingGroups: [
					{
						id: "optPog",
						productOfferings: [
							{
								id: "optPogPo",
								productOfferingGroups: [
									{
										id: "deeper-group",
										productOfferings: [
											{
												id: "deeper-po",
												attributes: {
													optionalProductOfferingGroups: [
														{
															id: "super-deep-optional-pog",
															productOfferings: [
																{
																	id: "deepest-po"
																}
															]
														}
													]
												}
											}
										]
									}
								]
							}
						]
					}
				]
			}
		} as any as ProductOffering;
		it("returns inputted PO if id matches", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "main");
			expect(result && result.id).toBe("main");
		});
		it("returns lvl1 child PO matches", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "subPo");
			expect(result && result.id).toBe("subPo");
		});
		it("returns lvl1 child optional PO", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "optPo");
			expect(result && result.id).toBe("optPo");
		});
		it("returns lvl2 child PO under POG", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "pogPo");
			expect(result && result.id).toBe("pogPo");
		});
		it("returns lvl2 child PO under optional POG", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "optPogPo");
			expect(result && result.id).toBe("optPogPo");
		});
		it("returns PO from super deep hierarchy", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(productOffering, "deepest-po");
			expect(result && result.id).toBe("deepest-po");
		});

		it("get custom number from real change number PO", () => {
			const result = ProductOfferingUtil.getProductOfferingFromProductOfferingById(poChangeMsisdn, "PO_SelectCustomNumber");
			expect(result && result.id).toBe("PO_SelectCustomNumber");
		});
	});

	describe("getPathToProductOfferingWithTFormName", () => {
		it("gets path with TFormName select properly", () => {
			const result = ProductOfferingUtil.getPathToProductOfferingWithTFormName(poChangeMsisdn, "select");
			expect(Array.isArray(result)).toBeTruthy();
			expect(result).toEqual(
				[{ po: "PO_change_msisdn" }, { pog: "GRP_MSISDN_Selection" }, { po: "PO_SelectTerminatedNumber" }]
			);
		});
		it("gets path with TFormName 'pattern search' properly", () => {
			const result = ProductOfferingUtil.getPathToProductOfferingWithTFormName(poChangeMsisdn, "pattern search");
			expect(Array.isArray(result)).toBeTruthy();
			expect(result).toEqual(
				[{ po: "PO_change_msisdn" }, { pog: "GRP_MSISDN_Selection" }, { po: "PO_SelectCustomNumber" }]
			);
		});
	});

	describe("getCommercialEnrichmentValueFromPO", () => {
		it("gets commercial enrichment from PO properly", () => {
			const po = poYoungDigitalEdition as any as ProductOffering;
			const result = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(po, "names", "name");
			expect(result && result).toEqual("Wind Young - Digital Edition");
		});
	});

	describe("getCommercialEnrichmentValueFromAllowance", () => {
		it("gets commercial enrichment from allowance properly", () => {
			const a = allowance as any as Allowance;
			const result = ProductOfferingUtil.getCommercialEnrichmentValueFromAllowance(a, "names", "name");
			expect(result && result).toEqual("1000 Minutes");
		});
	});

	describe("T_FORM_NAME checkers", () => {
		const poWithTFormName = {
			attributes: {
				instanceCharacteristics: {
					T_FORM_NAME: {
						values: [
							{
								value: "foo"
							}
						]
					}
				}
			}
		} as any as ProductOffering;

		const poWithoutTFormName = {
			attributes: {
				instanceCharacteristics: {
					FOO: {}
				}
			}
		} as any as ProductOffering;

		const pos = [poWithTFormName, poWithoutTFormName];

		describe("productOfferingContainsTFormName", () => {
			it("PO", () => {
				const result = ProductOfferingUtil.productOfferingContainsTFormName(poWithTFormName);
				expect(!result).toEqual(false);
			});

			it("PO-POG-PO", () => {
				const tFormNamePo = {
					id: "zxcv",
					attributes: {
						instanceCharacteristics: {
							T_FORM_NAME: {
								values: [
									{
										value: "MNP"
									}
								]
							}
						}
					}
				} as any as ProductOffering;

				const mainPo = {
					id: "qwer-po",
					productOfferingGroups: [
						{
							id: "asdf-pog",
							productOfferings: [ tFormNamePo ],
						} as any as ProductOfferingGroup
					],
				} as any as ProductOffering;

				const result = ProductOfferingUtil.productOfferingContainsTFormName(mainPo);
				expect(!result).toEqual(false);
			});
		});

		describe("productOfferingsContainTFormName", () => {
			it("array of two POs, one contains T_FORM_NAME", () => {
				const result = ProductOfferingUtil.productOfferingsContainTFormName(pos);
				expect(!result).toEqual(false);
			});

			it("array of two POs, none contain T_FORM_NAME", () => {
				const result = ProductOfferingUtil.productOfferingsContainTFormName([poWithoutTFormName, poWithoutTFormName]);
				expect(!result).toEqual(true);
			});
		});

		describe("productOfferingGroupContainsTFormName", () => {
			const pog = {
				id: "asdf-pog",
				productOfferings: [ poWithTFormName ],
			} as any as ProductOfferingGroup;

			it("POG", () => {
				const result = ProductOfferingUtil.productOfferingGroupContainsTFormName(pog);
				expect(!result).toEqual(false);
			});
		});
	});
});
