import * as React from "react";
import { ReactWrapper } from "enzyme";
import BasketItems, { BasketItemsProps } from "./BasketItems";
import { BasketItem, Price } from "../../../redux/types";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

describe("BasketItems", () => {
	const props: BasketItemsProps = {
		basketItems: [] as any as Array<BasketItem>,
		displayRemovalButton: false,
		upfrontCost: {} as any as Price,
		monthlyCost: {} as any as Price,
		removeBasketItem: jest.fn(),
	};

	const context = {
		flux: {
			stores: {
				UserStore: {
					getState: () => {},
					listen: () => {
						return function () {};
					}
				},
				BasketStore: {
					getState: () => {},
					listen: () => {
						return function () {};
					}
				},
				DigitalLifeStore: {
					getState: () => {},
					listen: () => {
						return function () {};
					}
				},
				POSCheckoutStore: {
					getState: () => {},
					listen: () => {
						return function () {};
					}
				}
			},
			actions: {
				BasketActions: {},
				POSCheckoutActions: {
					setPOSDeliveryType: {
						defer: (data: any) => {
							window.console.log("MOCKED POSCheckoutActions.setPOSDeliveryType():", data);
						}
					}
				},
				CustomerCaseActions: {
					changeCustomerActiveAgreement: jest.fn(),
				},
				DigitalLifeActions: {
					getAgreement: jest.fn(),
				}
			}
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<BasketItems {...props} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount with minimal props", () => {
		mountWithContext(<BasketItems {...props} />, { context });
	});

	it("renders basket items (reference number not required)", () => {
		const basketItems = [
			{
				id: "foo",
				attributes: {
					product: {
						id: "foo",
						name: "Zamzung Anarchy 6",
						price2: 100,
						currency: "EUR"
					},
					unitPrices: [
						{
							type: "RECURRENT",
							taxFreeAmount: 14.9,
							currency: "EUR",
							taxRate: 0
						}
					]
				}
			},
			{
				id: "bar",
				attributes: {
					product: {
						id: "bar",
						name: "Pear yPhone 7",
						price1: 700,
						// price2: 150,
						currency: "EUR"
					},
					totalPrices: [
						{
							type: "ONE_TIME",
							taxFreeAmount: 1.9,
							currency: "EUR",
							taxRate: 0
						}
					]
				}
			}
		] as any as Array<BasketItem>;

		const wrapper = mountWithContext(<BasketItems {...props} basketItems={basketItems}/>, { context });

		const basketItemsWrapper = wrapper.find(".BasketItems");
		expect(basketItemsWrapper.hostNodes()).toHaveLength(1);

		const rBasketItems = basketItemsWrapper.find(".BasketItems-basket-item");
		expect(rBasketItems.length).toEqual(basketItems.length);

		const productNameNodes = rBasketItems.find(".BasketItems-product-name");

		const productNames = basketItems.map((item: any) => {
			return item.attributes.product.name.toLowerCase();
		});
		const rProductNames = productNameNodes.map((n: ReactWrapper) => {
			return n.text().toLowerCase();
		});

		expect(rProductNames.sort()).toEqual(productNames.sort());
	});
});
