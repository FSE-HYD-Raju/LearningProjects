import * as React from "react";
import BasketMenu, { BasketMenuProps } from "./BasketMenu";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import { Basket, BasketItem } from "../../redux/types";

describe("BasketMenu", () => {
	const toggleNotification = jest.fn();
	const toggleBasketMenu = jest.fn();

	it("succeeds at shallow mount with minimum props", () => {
		const minProps = {
			basketItems: [],
			showBasketMenuNotification: false,
			activeBasket: {} as any as Basket,
			isUser: false,
			actions: {
				toggleNotification,
				toggleBasketMenu
			}
		} as BasketMenuProps;
		const wrapper = shallowWithContext(
			<BasketMenu {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	describe("buttons", () => {
		const minProps = {
			basketItems: [
				{
					attributes: {
						name: "test product 1",
						quantity: 1,
						totalPrices: [],
						unitPrices: []
					}
				},
				{
					attributes: {
						name: "test product 2",
						quantity: 1,
						totalPrices: [],
						unitPrices: []
					}
				},
			] as any as Array<BasketItem>,
			showBasketMenuNotification: false,
			activeBasket: {} as any as Basket,
			isUser: false,
			actions: {
				toggleNotification,
				toggleBasketMenu
			}
		} as BasketMenuProps;

		it("call toggleBasketMenu function when basket-menu-go-to-basket was clicked", () => {

			const wrapper = mountWithContext(
				<BasketMenu {...minProps} />
			);

			wrapper.find("a#basket-menu-go-to-basket").simulate("click");
			expect(toggleBasketMenu).toHaveBeenCalled();
		});

		it("call toggleBasketMenu function when goToCheckoutFromBasketMenu was clicked", () => {

			const wrapper = mountWithContext(
				<BasketMenu {...minProps} />
			);

			wrapper.find("a#goToCheckoutFromBasketMenu").simulate("click");
			expect(toggleBasketMenu).toHaveBeenCalled();
		});
	});
});
