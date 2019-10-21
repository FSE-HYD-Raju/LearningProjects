import React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import _CheckoutPayment from "../src/checkout/CheckoutPayment";
const CheckoutPayment = _CheckoutPayment.WrappedComponent;

describe("CheckoutPayment in POS", () => {
	let wrapper;

	const ACTIVE_BASKET_ID = "ACTIVE_BASKET_ID";

	const getProps = (props = {}) =>
		Object.assign(
			{
				BasketActions: {
					activateCheckoutStep: () => {},
					getBasketIncludeBasketItems: () => {}
				},
				PaymentStore: {
					contextualPaymentMethods: []
				},
				BasketStore: {
					activeBasket: {
						id: ACTIVE_BASKET_ID
					}
				},
				PaymentActions: {
					selectPaymentMethod: jest.fn(),
					getEligiblePaymentMethods: jest.fn()
				},
				selectedCurrency: "",
			},
			props
		);

	it("succeeds at shallow mount with minimum props", () => {
		wrapper = shallowWithContext(<CheckoutPayment {...getProps()} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props ", () => {
		mountWithContext(<CheckoutPayment {...getProps()} />);
	});

	describe("On balance payment", () => {
		const PaymentStoreProps = {
			contextualPaymentMethods: [
				{
					attributes: {
						balance: 20,
						label: "Balance"
					},
					id: "balance",
					type: "contextualPaymentMethods"
				}
			],
			paymentCancel: false
		};

		const BasketStoreProp = {
			activeBasket: {
				id: ACTIVE_BASKET_ID,
				attributes: {
					lifecycleStatus: "COMMITTED"
				}
			},
			submittedBasket: true,
			getCost: jest.fn()
		};

		it("should render balance and price values and refresh button in error message", () => {
			const paymentInfo = {
				paymentErrorCode: "balance-limit-surpassed"
			};

			const cost = 30;

			BasketStoreProp.getCost.mockReturnValue({ cost });

			const errorMessage = `Total fee (30 EUR) cannot be deducted from MainBalance (20 EUR), Please perform the top up and press Refresh`;

			const props = getProps({
				BasketStore: BasketStoreProp,
				PaymentStore: { ...PaymentStoreProps, paymentInfo },
				selectedCurrency: "EUR",
			});

			wrapper = mountWithContext(<CheckoutPayment {...props} />);

			const renderedError = wrapper.find(
				'[data-test-name="CheckoutPayment-errors"]'
			);
			const renderedRefreshButton = wrapper.find(
				"#balance-limit-surpassed-refresh-button"
			);

			expect(renderedError.text()).toEqual(errorMessage);
			expect(renderedRefreshButton.length).toEqual(1);
		});
	});
});
