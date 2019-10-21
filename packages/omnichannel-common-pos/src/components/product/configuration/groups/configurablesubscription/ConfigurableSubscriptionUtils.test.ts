import { ProductOffering, ProductOfferingGroup, ProductOfferingsConfigObject, ProductPath } from "../../../../../redux";
import ConfigurableSubscriptionUtils from "./ConfigurableSubscription.utils";
import SliderUnitMessages from "../../sliderConfiguration/SliderUnits.messages";
import { SliderConfigurationSingleGroupProps } from "../../sliderConfiguration/SliderConfigurationGroup";
import { wind3DataProductOfferingGroup } from "./ConfigurableSubscriptionUtilsTestData";
import SliderMessages from "../../sliderConfiguration/slider.messages";
import actions from "../../../../../redux/actions";
import TestUtils from "../../../../../testUtils";

const selectProductOfferingReal = actions.productOfferingConfiguration.selectProductOffering;

describe("ConfigurableSubscriptionUtils", () => {
	describe("ConfigurableSubscriptionUtils.isDefaultAllowance", () => {
		it("should return false when not valid product", () => {
			expect(ConfigurableSubscriptionUtils.isDefaultAllowance({} as any as ProductOffering)).toBeFalsy();
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({ instanceCharacteristics: {} } as any as ProductOffering)
			).toBeFalsy();
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({
					instanceCharacteristics: { CH_Default_PO: {} }
				} as any as ProductOffering)
			).toBeFalsy();
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({
					instanceCharacteristics: { CH_Default_PO: { values: [] } }
				} as any as ProductOffering)
			).toBeFalsy();
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({
					instanceCharacteristics: {
						CH_Default_PO: { values: [{ value: "" }] }
					}
				} as any as ProductOffering)
			).toBeFalsy();
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({
					instanceCharacteristics: {
						CH_Default_PO: { values: [{ value: "false" }] }
					}
				} as any as ProductOffering)
			).toBeFalsy();
		});
		it("should return true when default characteristic is set to true", () => {
			expect(
				ConfigurableSubscriptionUtils.isDefaultAllowance({
					instanceCharacteristics: {
						CH_Default_PO: { values: [{ value: "true" }] }
					}
				} as any as ProductOffering)
			).toBeTruthy();
		});
	});

	describe("isConfigurableSubscriptionProductOffering", () => {
		it("should return false when no attributes", () => {
			const result = ConfigurableSubscriptionUtils.isConfigurableSubscriptionProductOffering(
				({} as any) as ProductOffering
			);
			expect(result).toBeFalsy();
		});
		it("should return false when no characteristics", () => {
			const result = ConfigurableSubscriptionUtils.isConfigurableSubscriptionProductOffering(({
				attributes: { instanceCharacteristics: {} }
			} as any) as ProductOffering);
			expect(result).toBeFalsy();
		});
		it("should return false when wrong bundle type", () => {
			const result = ConfigurableSubscriptionUtils.isConfigurableSubscriptionProductOffering(({
				attributes: {
					instanceCharacteristics: {
						CH_Bundle_Type: { values: [{ value: "test" }] }
					}
				}
			} as any) as ProductOffering);
			expect(result).toBeFalsy();
		});
		it("should return true when proper bundle type", () => {
			const result = ConfigurableSubscriptionUtils.isConfigurableSubscriptionProductOffering(({
				attributes: {
					instanceCharacteristics: {
						CH_Bundle_Type: { values: [{ value: "configurablesubscription" }] }
					}
				}
			} as any) as ProductOffering);
			expect(result).toBeTruthy();
		});
	});

	describe("ConfigurableSubscriptionUtils.handleSelectAllowance", () => {
		const ROOT_PO_ID = "PO_ConfigurableSubscription_1";
		const TEST_PRODUCT = ({
			id: ROOT_PO_ID,
			attributes: {
				productOfferingGroups: [
					{
						id: "grp_sms",
						productOfferings: [
							{
								id: "po_sms_1",
								instanceCharacteristics: {
									CH_Allowance: {
										values: [{ value: 1 }]
									},
									CH_Slider_Requested: {
										values: [{ value: "sms" }]
									}
								}
							}
						]
					},
					{
						id: "grp_data",
						productOfferings: [
							{
								id: "po_data_100",
								instanceCharacteristics: {
									CH_Allowance: {
										values: [{ value: 100 }]
									},
									CH_Slider_Requested: {
										values: [{ value: "data" }]
									}
								}
							},
							{
								id: "po_data_200",
								instanceCharacteristics: {
									CH_Allowance: {
										values: [{ value: 200 }]
									},
									CH_Slider_Requested: {
										values: [{ value: "data" }]
									}
								}
							}
						]
					}
				]
			}
		} as any) as ProductOffering;
		const TEST_NESTED_GROUPS_PRODUCT = ({
			id: ROOT_PO_ID,
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
												id: "po_sms_1",
												instanceCharacteristics: {
													CH_Allowance: {
														values: [{ value: 1 }]
													},
													CH_Slider_Requested: {
														values: [{ value: "sms" }]
													}
												}
											}
										]
									},
									{
										id: "grp_data",
										productOfferings: [
											{
												id: "po_data_100",
												instanceCharacteristics: {
													CH_Allowance: {
														values: [{ value: 100 }]
													},
													CH_Slider_Requested: {
														values: [{ value: "data" }]
													}
												}
											},
											{
												id: "po_data_200",
												instanceCharacteristics: {
													CH_Allowance: {
														values: [{ value: 200 }]
													},
													CH_Slider_Requested: {
														values: [{ value: "data" }]
													}
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
		} as any) as ProductOffering;

		let selectProductOfferingMockFn: any;
		const PATH: ProductPath = [{ po: ROOT_PO_ID }];
		const NESTED_GROUPS_PATH: ProductPath = [
			{ po: ROOT_PO_ID },
			{ pog: "grp_configurablesubscription" },
			{ po: "po_configurablesubscription_nested" }
		];
		const flux: any = {
			actions: {}
		};
		beforeEach(() => {
			selectProductOfferingMockFn = jest.fn(selectProductOfferingReal);
			flux.reduxStore = TestUtils.mockReduxStore({});
			actions.productOfferingConfiguration.selectProductOffering = selectProductOfferingMockFn;
		});
		it("should do nothing when unknown allowanceValue", () => {
			ConfigurableSubscriptionUtils.handleSelectAllowance(flux, TEST_PRODUCT, PATH)("data", 9999);
			expect(selectProductOfferingMockFn).not.toHaveBeenCalled();
		});
		it("should do nothing when unknown allowanceType", () => {
			ConfigurableSubscriptionUtils.handleSelectAllowance(flux, TEST_PRODUCT, PATH)("other", 1);
			expect(selectProductOfferingMockFn).not.toHaveBeenCalled();
		});
		it("should call selectProductOffering when valid args", () => {
			ConfigurableSubscriptionUtils.handleSelectAllowance(flux, TEST_PRODUCT, PATH)("data", 200);
			expect(selectProductOfferingMockFn).toBeCalledWith(
				[{ po: ROOT_PO_ID }, { pog: "grp_data" }],
				"po_data_200",
				expect.arrayContaining([
					expect.objectContaining({ id: "po_data_100" }),
					expect.objectContaining({ id: "po_data_200" })
				])
			);
		});
		it("should call selectProductOffering when valid args, nested product groups", () => {
			ConfigurableSubscriptionUtils.handleSelectAllowance(
				flux,
				TEST_NESTED_GROUPS_PRODUCT,
				NESTED_GROUPS_PATH
			)("data", 200);
			expect(selectProductOfferingMockFn).toBeCalledWith(
				[
					{ po: ROOT_PO_ID },
					{ pog: "grp_configurablesubscription" },
					{ po: "po_configurablesubscription_nested" },
					{ pog: "grp_data" }
				],
				"po_data_200",
				expect.arrayContaining([
					expect.objectContaining({ id: "po_data_100" }),
					expect.objectContaining({ id: "po_data_200" })
				])
			);
		});
	});

	describe("getSelectedAllowanceProductId", () => {
		it("should return undefined when no configuration", () => {
			expect(ConfigurableSubscriptionUtils.getSelectedAllowanceProductId("test")).toBe(undefined);
		});
		it("should return undefined when wrong configuration", () => {
			expect(ConfigurableSubscriptionUtils.getSelectedAllowanceProductId("test", {} as any as ProductOfferingsConfigObject)).toBe(
				undefined
			);
		});
		it("should return undefined when no products selected", () => {
			expect(
				ConfigurableSubscriptionUtils.getSelectedAllowanceProductId("voice", {
					productOfferingGroups: [
						{
							id: "voice",
							productOfferings: [
								{ id: "v_1" },
								{ id: "v_2", selected: false }
							]
						}
					]
				} as any as ProductOfferingsConfigObject)
			).toBe(undefined);
		});
		it("should return selected PO id when has selected product", () => {
			expect(
				ConfigurableSubscriptionUtils.getSelectedAllowanceProductId("voice", {
					productOfferingGroups: [
						{
							id: "sms",
							productOfferings: [{ id: "sms_1", selected: true }]
						},
						{
							id: "voice",
							productOfferings: [
								{ id: "v_1", selected: false },
								{ id: "v_2", selected: true }
							]
						}
					]
				} as any as ProductOfferingsConfigObject)
			).toBe("v_2");
		});
	});

	describe("isAllowanceProductOfferingGroupForSlider", () => {
		const getInstanceCharacteristics = (value: string) => {
			return {
				CH_Slider_Requested: {
					values: [{ value }]
				}
			};
		};

		it("should return false when empty", () => {
			expect(
				ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider(
					({} as any) as ProductOfferingGroup
				)
			).toBeFalsy();
		});
		it("should return false when not products", () => {
			expect(
				ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider(({
					productOfferings: []
				} as any) as ProductOfferingGroup)
			).toBeFalsy();
		});
		it("should return false when no products with characteristic SliderRequested=true", () => {
			expect(
				ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider(({
					productOfferings: [{}]
				} as any) as ProductOfferingGroup)
			).toBeFalsy();
		});
		it("should return true when has product with characteristic SliderRequested=true", () => {
			expect(
				ConfigurableSubscriptionUtils.isAllowanceProductOfferingGroupForSlider(({
					productOfferings: [
						{},
						{
							instanceCharacteristics: getInstanceCharacteristics(
								"true"
							)
						}
					]
				} as any) as ProductOfferingGroup)
			).toBeTruthy();
		});
	});

	describe("getProductOfferingGroupByAllowanceType", () => {
		const generateProductOfferingGroupByAllowanceType = (
			allowanceType: string
		): any => ({
			id: "group_" + allowanceType,
			productOfferings: [
				{
					id: "product_" + allowanceType,
					instanceCharacteristics: {
						CH_Slider_Requested: {
							values: [{ value: allowanceType }]
						}
					}
				}
			]
		});

		it("should return undefined when no gorups", () => {
			expect(ConfigurableSubscriptionUtils.getProductOfferingGroupByAllowanceType("test", [])).toBe(undefined);
		});
		it("should return undefined when not found by allowanceType", () => {
			expect(
				ConfigurableSubscriptionUtils.getProductOfferingGroupByAllowanceType("test", [
					generateProductOfferingGroupByAllowanceType("other")
				])
			).toBe(undefined);
		});
		it("should return matching by allowanceType group", () => {
			expect(
				ConfigurableSubscriptionUtils.getProductOfferingGroupByAllowanceType("test", [
					generateProductOfferingGroupByAllowanceType("other"),
					generateProductOfferingGroupByAllowanceType("test")
				])
			).toMatchObject({ id: "group_test" });
		});
	});

	describe("getProductOfferingByAllowanceValue", () => {
		const generateProductOfferingByAllowanceValue = (
			allowanceValue: number
		): any => ({
			id: "product_" + allowanceValue,
			instanceCharacteristics: {
				CH_Allowance: {
					values: [{ value: allowanceValue }]
				}
			}
		});

		it("should return undefined when no products", () => {
			expect(ConfigurableSubscriptionUtils.getProductOfferingByAllowanceValue(1, [])).toBe(undefined);
		});
		it("should return undefined when not found", () => {
			expect(
				ConfigurableSubscriptionUtils.getProductOfferingByAllowanceValue(1, [
					generateProductOfferingByAllowanceValue(3)
				])
			).toBe(undefined);
		});
		it("should return undefined when no products", () => {
			expect(
				ConfigurableSubscriptionUtils.getProductOfferingByAllowanceValue(2, [
					generateProductOfferingByAllowanceValue(1),
					generateProductOfferingByAllowanceValue(2)
				])
			).toMatchObject({
				id: "product_2"
			});
		});
	});

	describe("getAllowanceValue", () => {
		const getInstanceCharacteristics = (value: string) => ({
			CH_Allowance: {
				values: [{ value }]
			}
		});

		it("should return undefined when no characterisric", () => {
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({} as any as ProductOffering)).toBe(undefined);
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({ instanceCharacteristics: {} } as any as ProductOffering)).toBe(undefined);
		});
		it("should return undefined when empty characterisric", () => {
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({} as any as ProductOffering)).toBe(undefined);
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({instanceCharacteristics: getInstanceCharacteristics("")} as any as ProductOffering)
			).toBe(undefined);
		});
		it("should return undefined when non numeric characterisric", () => {
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({} as any as ProductOffering)).toBe(undefined);
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({instanceCharacteristics: getInstanceCharacteristics("test")} as any as ProductOffering)
			).toBe(undefined);
		});
		it("should not undefined when numeric characterisric", () => {
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({} as any as ProductOffering)).toBe(undefined);
			expect(ConfigurableSubscriptionUtils.getAllowanceValue({instanceCharacteristics: getInstanceCharacteristics("17")} as any as ProductOffering)
			).toBe(17);
		});
	});

	describe("getAllowanceSliderConfiguration", () => {
		const getProductOfferingGroup: any = (productOfferings: any[]) => ({
			id: "pog-1",
			productOfferings
		});

		it("should return null when no product offerings", () => {
			const configuration = ConfigurableSubscriptionUtils.getAllowanceSliderConfiguration(getProductOfferingGroup([]));
			expect(configuration).toBe(undefined);
		});
		it("should handle valid data package", () => {
			const configuration = ConfigurableSubscriptionUtils.getAllowanceSliderConfiguration(
				wind3DataProductOfferingGroup
			) as SliderConfigurationSingleGroupProps;
			expect(configuration).toMatchObject({
				values: [0, 2, 5, 20, 100, -1],
				selectedValue: 20,
				unit: SliderUnitMessages.data,
				iconClassNames: "fa fa-wifi",
				message: SliderMessages.data
			});
		});
		it("should set selected value from configuration provided", () => {
			const configuration = ConfigurableSubscriptionUtils.getAllowanceSliderConfiguration(
				wind3DataProductOfferingGroup,
				"PO_Data_100GB_wind"
			) as SliderConfigurationSingleGroupProps;
			expect(configuration).toMatchObject({
				selectedValue: 100
			});
		});
	});
});
