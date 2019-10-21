import * as React from "react";
import SalesBasket, { SalesBasketProps } from "./SalesBasket";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

describe("SalesBasket", () => {
	const minProps: SalesBasketProps = {
		selectedCurrency: "EUR",
		locale: "en",
		activeBasketId: "id",
		actions: {
			getBasketIncludeBasketItems: jest.fn(),
			removeFromBasket: jest.fn(),
		}
	};

	const context = {
		flux: {
			actions: {
				BasketActions: {
					getBasketIncludeBasketItems: jest.fn(),
					removeFromBasket: jest.fn(),
				},
				CustomerCaseActions: {
					changeCustomerActiveAgreement: jest.fn(),
				},
				DigitalLifeActions: {
					getAgreements: jest.fn(),
				},
			}
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		shallowWithContext(<SalesBasket {...minProps} />);
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<SalesBasket {...minProps} />, { context });
	});

	it("should update basket when language is changed", () => {
		const props = {
			...minProps,
			activeBasketId: "basket-123",
		};

		const wrapper = shallowWithContext(<SalesBasket {...props} />);
		const newProps = {...props, locale: "fi"};

		wrapper.setProps(newProps);
		wrapper.update();

		expect(minProps.actions.getBasketIncludeBasketItems).toHaveBeenCalledWith("basket-123");
	});
});
