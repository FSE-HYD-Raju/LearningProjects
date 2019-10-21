import * as React from "react";

import BasketDiscountModal, { BasketDiscountModalProps } from "./BasketDiscountModal";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import { ProductOffering } from "../../redux/types";

describe("BasketDiscountModal", () => {
	const minimumProps: BasketDiscountModalProps = {
		discounts: {} as any as ProductOffering[],
		selectedDiscount: {} as any as ProductOffering,
		actions: {
			selectDiscount: jest.fn(),
			applyDiscountToBasket: jest.fn(),
			toggleDiscountModal: jest.fn(),
			closeModal: jest.fn(),
		},
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<BasketDiscountModal {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<BasketDiscountModal {...minimumProps} />);
	});
});
