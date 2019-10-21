import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	Basket,
	BasketCheckoutSteps,
	mockRouterProps
} from "omnichannel-common-pos";
import CheckoutContainer, { CheckoutContainerProps } from "./CheckoutContainer";
import { RouteComponentProps } from "react-router";

describe("CheckoutContainer", () => {
	const minProps: CheckoutContainerProps & RouteComponentProps<any> = {
		activeBasket: {} as any as Basket,
		orderBasket: {} as any as Basket,
		viewportSize: "desktop",
		checkoutSteps: {} as any as BasketCheckoutSteps,
		selectedCurrency: "EUR",
		actions: {
			clearOrderBasket: () => {},
			getBasketIncludeBasketItems: jest.fn(),
			removeFromBasket: jest.fn(),
		},
		history: mockRouterProps.history,
		location: mockRouterProps.location,
		match: mockRouterProps.match,
		staticContext: mockRouterProps.staticContext
	};

	const context = {
		flux: {
			actions: {
				BasketActions: {
					clearOrderBasket: jest.fn(),
					getBasketIncludeBasketItems: jest.fn(),
					removeFromBasket: jest.fn(),
				},
				CustomerCaseActions: {
					changeCustomerActiveAgreement: jest.fn(),
				},
				DigitalLifeActions: {
					getAgreements: jest.fn(),
				}
			}
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CheckoutContainer {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CheckoutContainer {...minProps} />, { context });
	});

	it("renders minimum content", () => {
		const props = {
			...minProps,
		};
		mountWithContext(<CheckoutContainer {...props} />,  { context });
	});
});
