import * as React from "react";

import BasketDiscountContainer from "./BasketDiscountContainer";
import { Basket, BasketItem } from "../../../redux/types";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

describe("BasketDiscountContainer", () => {
	const minimumProps = {
		activeBasket: {} as any as Basket,
		basketItems: [] as any as Array<BasketItem>,
		selectedCurrency: "EUR",
		actions: {
			fetchDiscounts: jest.fn(),
			removeSelectedDiscount: jest.fn(),
			applyDiscountToBasket: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<BasketDiscountContainer {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<BasketDiscountContainer {...minimumProps} />);
	});
});
