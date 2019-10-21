import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	SimpleDataMock,
	TestUtils
} from "../../testUtils";

import RecurringTopUpConfigurationForm, { RecurringTopUpConfigurationFormProps } from "./RecurringTopUpConfigurationForm";
import { ReactWrapper } from "enzyme";
import { Basket, ProductOffering } from "../../redux/types";

describe("RecurringTopUpConfigurationForm", () => {
	let minProps: RecurringTopUpConfigurationFormProps;
	let getDelayedPromise: any;
	let context: any;
	let basket: Basket;
	let parentBasketItem: Basket;
	let topUpProductOfferingGroup: ProductOffering;

	beforeAll(() => {
		getDelayedPromise = TestUtils.getDelayedPromise;
		context = {
			...SimpleDataMock.getConsulContextMock(),
			store: TestUtils.mockReduxStore({
				feature: {
					checkoutTopUpConfiguration: {
						topUpAmount: "CH_TopUp_Amount",
						thresholdValue: "CH_Threshold_Value",
						monthlyLimit: "CH_Monthly_TopUp_Limit",
					}
				},
				cms: {},
			})
		};
		minProps = {
			schema: {},
			selectedCurrency: "EUR",
			pricesPerRow: 4,
			actions: {
				updateBasketItemConfiguration: jest.fn(),
				addProductToBasket: jest.fn(),
				storeTopupProduct: jest.fn(),
			}
		};

		basket = {
			id: "uuid"
		} as any as Basket;

		parentBasketItem = {
			id: "uber-basket-item-po"
		} as any as Basket;

		topUpProductOfferingGroup = {
			cardinality: {
				max: 1,
				min: 0
			},
			commercialEnrichments: null,
			id: "top-up-pog",
			name: "Choose your Top Up option",
			msisdnGroup: false,
			productOfferings: [
				{
					id: "threshold-top-up-po",
					name: "Threshold Top Up",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {
						CH_Threshold_Value: {
							values: [{
								name: "10",
								value: "10"
							},
							{
								name: "25",
								value: "25"
							},
							{
								name: "50",
								value: "50"
							}]
						},
						CH_TopUp_Amount: {
							values: [{
								name: "15",
								value: "15"
							},
							{
								name: "25",
								value: "25"
							},
							{
								name: "50",
								value: "50"
							},
							{
								name: "75",
								value: "75"
							},
							{
								name: "100",
								value: "100"
							}]
						},
						CH_Monthly_TopUp_Limit: {
							values: [{
								name: "15",
								value: "15"
							},
							{
								name: "25",
								value: "25"
							},
							{
								name: "50",
								value: "50"
							},
							{
								name: "75",
								value: "75"
							},
							{
								name: "100",
								value: "100"
							}]
						},
						CH_Allowed_Payment_Methods: {
							values: []
						},
						CH_TopUp_Type: {
							values: []
						}
					},
					instanceCharacteristics: {
						T_FORM_NAME: {
							values: [
								{
									name: "TOPUP_THRESHOLD",
									value: "TOPUP_THRESHOLD"
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
					prices: [],
					priority: null,
					productOfferingGroups: [],
					productOfferings: [],
					specificationId: null,
					specType: null,
					specSubType: null,
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				},
				{
					id: "time-monthly-top-up-po",
					name: "Monthly Top Up",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {
						CH_TopUp_Amount: {
							values: [{
								name: "15",
								value: "15"
							},
							{
								name: "25",
								value: "25"
							},
							{
								name: "50",
								value: "50"
							},
							{
								name: "75",
								value: "75"
							},
							{
								name: "100",
								value: "100"
							}]
						},
					},
					instanceCharacteristics: {
						T_FORM_NAME: {
							name: "TOPUP_TIME_MONTH",
							values: [
								{
									value: "TOPUP_TIME_MONTH"
								}
							]
						}
					},
					prices: [],
					priority: null,
					productOfferingGroups: [],
					productOfferings: [],
					specificationId: null,
					specType: null,
					specSubType: null,
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				},
			]
		} as any as ProductOffering;
	});

	const clickOnRadio = (wrapper: ReactWrapper, field: string) => {
		wrapper
			.find(`#RecurringTopUpConfigurationForm-${field}-radio`)
			.forEach(node => node.simulate("click"));
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<RecurringTopUpConfigurationForm {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		const wrapper = mountWithContext(<RecurringTopUpConfigurationForm {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	describe("submit", () => {
		let onCancelSpy: any;
		let addProductToBasketSpy: any;
		let storeTopupProductSpy: any;
		let wrapper: ReactWrapper;

		beforeEach(() => {
			onCancelSpy = jest.fn();
			addProductToBasketSpy = jest.fn();
			storeTopupProductSpy = jest.fn();
		});

		afterEach(() => {
			wrapper.unmount();
		});

		const mount = (additionalProps?: any) => {
			wrapper = mountWithContext(
				<RecurringTopUpConfigurationForm
					{...minProps}
					{...additionalProps}
					actions={{
						addProductToBasket: addProductToBasketSpy,
						onCancel: onCancelSpy,
						storeTopupProduct: storeTopupProductSpy,
					}}
					basket={basket}
					basketItemsOfParentProduct={parentBasketItem}
					addToBasket={true}
				/>, { context }
			);
			return wrapper;
		};

		const mountCustom = () => {
			const currency = "EUR";
			wrapper = mountWithContext(
				<RecurringTopUpConfigurationForm
					schema={{}}
					selectedCurrency={currency}
					addToBasket={false}
					actions={{
						onCancel: onCancelSpy,
						addProductToBasket: addProductToBasketSpy,
						storeTopupProduct: storeTopupProductSpy,
					}}
					basket={basket}
					basketItemsOfParentProduct={parentBasketItem}
					topUpProductOfferingGroup={topUpProductOfferingGroup}
				/>,
				{ context }
			);
			return wrapper;
		};

		const checkSimpleRadio = async (value: string, additionalProps?: any) => {
			wrapper = mount(additionalProps);
			await clickOnRadio(wrapper, value);
		};

		it("cancellation", async () => {
			checkSimpleRadio("cancel");

			await getDelayedPromise(100).then(() => {
				expect(onCancelSpy).toHaveBeenCalledTimes(1);
				expect(storeTopupProductSpy).toHaveBeenCalledTimes(1);
				expect(addProductToBasketSpy).not.toHaveBeenCalled();
			});
		});

		it("is not called for clean form", async () => {
			wrapper = mount();

			await getDelayedPromise(100).then(() => {
				expect(onCancelSpy).not.toHaveBeenCalled();
				expect(addProductToBasketSpy).not.toHaveBeenCalled();
			});
		});

		it("threshold", async () => {
			checkSimpleRadio("threshold", { topUpProductOfferingGroup });

			const chThresholdValue = 10;
			wrapper.find("select").at(0).simulate("change", { target: { value: chThresholdValue } });

			const chTopUpAmount = 25;
			wrapper.find("select").at(1).simulate("change", { target: { value: chTopUpAmount } });

			const chMonthlyTopUpLimit = 20;
			wrapper
				.find("select")
				.at(2)
				.simulate("change", {
					target: { value: chMonthlyTopUpLimit }
				});

			await getDelayedPromise(100).then(() => {
				expect(onCancelSpy).not.toHaveBeenCalled();
				expect(addProductToBasketSpy).toHaveBeenCalled();
				expect(addProductToBasketSpy).toHaveBeenCalledWith({
					basketId: basket.id,
					configurations: {
						[topUpProductOfferingGroup.productOfferings[0].id]: {
							id: topUpProductOfferingGroup.productOfferings[0].id,
							inputtedCharacteristics: {
								CH_Threshold_Value: chThresholdValue,
								CH_TopUp_Amount: chTopUpAmount,
								CH_Monthly_TopUp_Limit: chMonthlyTopUpLimit
							},
						}
					},
					hasCustomer: true,
					hasTopUps: false,
					parentBasketItem,
					product: topUpProductOfferingGroup.productOfferings[0]
				});
			});
		});

		it("monthly", async () => {
			checkSimpleRadio("monthly", { topUpProductOfferingGroup });

			const chTopUpAmount = 25;
			wrapper.find("select").at(0).simulate("change", { target: { value: chTopUpAmount } });

			await getDelayedPromise(100).then(() => {
				expect(onCancelSpy).not.toHaveBeenCalled();
				expect(addProductToBasketSpy).toHaveBeenCalled();
				expect(addProductToBasketSpy).toHaveBeenCalledWith({
					basketId: basket.id,
					configurations: {
						[topUpProductOfferingGroup.productOfferings[1].id]: {
							id:
								topUpProductOfferingGroup.productOfferings[1]
									.id,
							inputtedCharacteristics: {
								CH_TopUp_Amount: chTopUpAmount
							}
						}
					},
					hasCustomer: true,
					hasTopUps: false,
					parentBasketItem,
					product: topUpProductOfferingGroup.productOfferings[1]
				});
			});
		});

		it("store instead of submit when addToBasket is false", async () => {
			const customWrapper = mountCustom();
			await clickOnRadio(customWrapper, "monthly");

			const chTopUpAmount = 25;
			wrapper.find("select").at(0).simulate("change", { target: { value: chTopUpAmount } });

			await getDelayedPromise(100).then(() => {
				expect(onCancelSpy).not.toHaveBeenCalled();
				expect(addProductToBasketSpy).not.toHaveBeenCalled();
				expect(storeTopupProductSpy).toHaveBeenCalled();
				expect(storeTopupProductSpy).toHaveBeenCalledWith({
					basketId: basket.id,
					configurations: {
						[topUpProductOfferingGroup.productOfferings[1].id]: {
							id:
								topUpProductOfferingGroup.productOfferings[1]
									.id,
							inputtedCharacteristics: {
								CH_TopUp_Amount: chTopUpAmount
							}
						}
					},
					hasCustomer: true,
					parentBasketItem,
					product: topUpProductOfferingGroup.productOfferings[1]
				});
			});
		});
	});
});
