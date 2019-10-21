import * as React from "react";
import TestUtils, { mountWithContext, shallowWithContext, SimpleDataMock } from "../../../testUtils";
import { BasketItem } from "../../../redux/types";
import { ProductOffering } from "../../../redux/types";

import CheckoutRecurringTopUpConfiguration, {
	Props
} from "./CheckoutRecurringTopUpConfiguration";

const basicPlanWithMarketingAgreements: ProductOffering = require("./testData/basic-plan-with-marketing-agreements");

describe("CheckoutRecurringTopUpConfiguration", () => {
	let minProps: Props;
	let context: any;

	beforeAll(() => {
		context = SimpleDataMock.getConsulContextMock();
		context.flux.actions = {
			BasketActions: {
				addProductToBasket: jest.fn()
			}
		};

		minProps = {
			productsWithTopUps: [],
			basketItems: [],
			actions: {
				handleStoreCustomerPaymentMethodSelection: () => {},
			},
		};
		context.store = TestUtils.mockReduxStore({
			currency: {selectedCurreny: ""},
			cms: {},
			feature: {},
			consul: {}
		});
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CheckoutRecurringTopUpConfiguration {...minProps} />, {context});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CheckoutRecurringTopUpConfiguration {...minProps} />, {context});
	});

	it("renders RecurringTopUpConfigurationForm when basketItems contains a plan product that contains a top-up product", () => {
		const updatedProps = {
			...minProps,
			basketItems: [{
				id: "dummy-basket-id",
				basket: {
					id: "dummy-basket-id",
					attributes: {}
				},
				attributes: {
					id: "dummy-basket-id",
					product: {
						id: "dummy-product-id"
					}
				}
			} as any as BasketItem],
			productsWithTopUps: [basicPlanWithMarketingAgreements]
		};

		const wrapper = mountWithContext(<CheckoutRecurringTopUpConfiguration {...updatedProps} />, {context});
		expect(wrapper.find("RecurringTopUpConfigurationForm").length).toBe(1);
	});

	it("does not render RecurringTopUpConfigurationForm when basketItems does not contain top-up product at any depth", () => {
		const updatedProps = {
			...minProps,
			basketItems: [
				{
					id: "dummy-basket-id",
					attributes: {
						product: {
							id: "dummy-product-id"
						}
					}
				} as any as BasketItem
			],
			productsWithTopUps: [
				{ id: "another-dummy-product-id" } as ProductOffering
			]
		};
		const wrapper = mountWithContext(
			<CheckoutRecurringTopUpConfiguration {...updatedProps} />, {context});

		expect(wrapper.find("RecurringTopUpConfigurationForm").length).toBe(0);
	});

	it("renders a succesful recurring top up message instead of configuration after succesful save", () => {
		const updatedProps = {
			...minProps,
			basketItems: [{
				id: "dummy-basketitem-id",
				attributes: {
					basketProductId: "dummy-basket-id",
					product: {
						id: "basic-bundled-agreements-po",
						name: "BASIC Plan with Marketing agreements"
					},
					childBasketItems: [
						{
							id: "threshold-top-up-po",
							product: {
								id: "threshold-top-up-po",
								name: "Threshold top up",
								instanceCharacteristics: {
									T_FORM_NAME: {
										values: [
											{
												name: "TOPUP_THRESHOLD",
												value: "TOPUP_THRESHOLD"
											}
										]
									}
								}
							}
						}
					]
				}
			} as any as BasketItem],
			productsWithTopUps: [basicPlanWithMarketingAgreements]
		};

		const wrapper = mountWithContext(<CheckoutRecurringTopUpConfiguration {...updatedProps} />, {context});
		const alertSuccess = wrapper.find(".alert-success");
		expect(alertSuccess.length).toBe(1);
		expect(alertSuccess.text()).toContain("You can modify top-ups later in");

	});
});
