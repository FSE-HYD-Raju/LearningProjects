import actions, { BasketActions } from "../../../actions";
import { Basket, BasketItem, User, } from "../../../types";
import BasketService from "../../../services/BasketService";
import { basketSaga } from "../basket.saga";
import { getBasketResp } from "./basketMockData";
import { AppState } from "../../../index";
const SagaTester = require("redux-saga-tester").default;

describe("basket.saga", () => {
	describe("basket assignment and discard", () => {
		let sagaTester: any = null;
		const originalDelete = BasketService.delete;
		const originalDiscardBasket = BasketService.discardBasket;
		const originalGetBasketIncludeBasketItems = BasketService.getBasketIncludeBasketItems;
		const originalUpdateOwnerToBasket = BasketService.updateOwnerToBasket;

		beforeEach(() => {
			BasketService.delete = jest.fn();
			BasketService.discardBasket = jest.fn();
			BasketService.getBasketIncludeBasketItems = jest.fn();
			BasketService.updateOwnerToBasket = jest.fn().mockReturnValue({});
			sagaTester = new SagaTester({});
			sagaTester.start(basketSaga);
		});

		afterEach(() => {
			BasketService.delete = originalDelete;
			BasketService.discardBasket = originalDiscardBasket;
			BasketService.getBasketIncludeBasketItems = originalGetBasketIncludeBasketItems;
			BasketService.updateOwnerToBasket = originalUpdateOwnerToBasket;
		});

		it("basket is assigned to specified user and its basket items are fetched", async () => {
			const basketToAssign = ({
				id: "foo-1",
			} as any) as Basket;
			const user = {
				id: "juanita",
			} as User;
			const basketItems = [
				({
					trol: "lol",
				} as any) as BasketItem,
			];

			const assignedBasket = {
				...basketToAssign,
				relationships: {
					owner: {
						data: {
							id: "juanita",
							type: "persons",
						},
					},
					payer: {
						data: {
							id: "juanita",
							type: "persons",
						},
					},
				},
			};

			BasketService.updateOwnerToBasket = jest.fn().mockReturnValue(assignedBasket);
			BasketService.getBasketIncludeBasketItems = jest.fn().mockReturnValue({
				basket: basketToAssign,
				basketItems,
			});

			sagaTester.dispatch(actions.basket.assignBasketToUserAndDiscardAnotherBasket(basketToAssign, user));

			await sagaTester.waitFor(BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				basket: basketToAssign,
				basketItems,
			};

			expect(calledAction).toEqual(actions.basket.assignBasketToUserAndDiscardAnotherBasketComplete(expected));
			expect(BasketService.updateOwnerToBasket).toHaveBeenCalledTimes(1);
			expect(BasketService.updateOwnerToBasket).toHaveBeenCalledWith(basketToAssign, user);
			expect(BasketService.discardBasket).toHaveBeenCalledTimes(0);
		});

		it("basket is assigned to specified user and another is discarded, and the basket items of assigned are fetched", async () => {
			const basketToAssign = {
				id: "foo-1",
			} as Basket;
			const basketItems = [
				({
					trol: "lol",
				} as any) as BasketItem,
			];
			const user = {
				id: "juanita",
			} as User;
			const basketToDiscard = {
				id: "foo-2",
			} as Basket;

			BasketService.getBasketIncludeBasketItems = jest.fn().mockReturnValue({
				basket: basketToAssign,
				basketItems,
			});

			sagaTester.dispatch(actions.basket.assignBasketToUserAndDiscardAnotherBasket(basketToAssign, user, basketToDiscard));

			await sagaTester.waitFor(BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				basket: basketToAssign,
				basketItems,
			};

			expect(calledAction).toEqual(actions.basket.assignBasketToUserAndDiscardAnotherBasketComplete(expected));
			expect(BasketService.updateOwnerToBasket).toHaveBeenCalledTimes(1);
			expect(BasketService.updateOwnerToBasket).toHaveBeenCalledWith(basketToAssign, user);

			expect(BasketService.delete).toHaveBeenCalledTimes(1);
			expect(BasketService.delete).toHaveBeenCalledWith(basketToDiscard.id);
		});

		it("sets given basket as active basket and fetches its basket items", async () => {
			const basket = {
				id: "foo-1",
			};
			const basketItems = [
				({
					trol: "lol",
				} as any) as BasketItem,
			];

			sagaTester.dispatch(actions.basket.setBasketAsActiveBasket(basket.id));

			await sagaTester.waitFor(BasketActions.SET_BASKET_AS_ACTIVE_BASKET_COMPLETE);

			const calledAction = sagaTester.getLatestCalledAction();
			const expected = {
				basketAndBasketItems: {
					basket: basket,
					basketItems,
				},
			};

            expect(BasketService.getBasketIncludeBasketItems).toHaveBeenCalledTimes(1);
            expect(BasketService.getBasketIncludeBasketItems).toHaveBeenCalledWith(basket.id);
        });
    });
    describe("Remove Item from Basket", () => {
        let sagaTester: any = null;
		const initialState = ({
			basket: {
				basketItemIdToAddressEntries: [],
			},
		} as any) as AppState;
        beforeEach(() => {
            sagaTester = new SagaTester({ initialState });
            sagaTester.start(basketSaga);
        });
        it("deletes the item from the basket without shipping Methods", async () => {
            const basketId = "foo-1" as string;
            const basketItem = ({ id: "aa1", type: "basketItems" } as any) as BasketItem;
            const shippingMethodFromBasket = true as boolean;
            let response;
            BasketService.deleteBasketItemFromBasket = jest.fn().mockReturnValue(response);
            BasketService.getBasket = jest.fn().mockReturnValue(getBasketResp)
            sagaTester.dispatch(actions.basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket));
			await sagaTester.waitFor(BasketActions.UPDATE_BASKET_ITEMID_TO_ADDRESS_ENTRIES);
            const calledAction = sagaTester.getLatestCalledAction();
			expect(calledAction).toEqual(actions.basket.updateBasketItemIdToAddressEntries([]));
            expect(BasketService.deleteBasketItemFromBasket).toHaveBeenCalledWith(basketItem.id);
            expect(BasketService.deleteBasketItemFromBasket).toHaveBeenCalledTimes(1);
            expect(BasketService.getBasket).toHaveBeenCalledTimes(1);
            expect(BasketService.getBasket).toHaveBeenCalledWith(basketId);
        });

        it("deletes the item from the basket with shipping Methods", async () => {
            const basketId = "foo-1" as string;
            const basketItem = ({ id: "aa1", type: "basketItems" } as any) as BasketItem;
            const shippingMethodFromBasket = false as boolean;
            let response;
            BasketService.deleteBasketItemFromBasket = jest.fn().mockReturnValue(response);
            BasketService.getBasket = jest.fn().mockReturnValue(getBasketResp)
            sagaTester.dispatch(actions.basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket));
            await sagaTester.waitFor(BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE);
            const calledAction = sagaTester.getLatestCalledAction();
            expect(calledAction).toEqual(actions.basket.removeShippingMethodsComplete(basketItem));
            expect(BasketService.deleteBasketItemFromBasket).toHaveBeenCalledWith(basketItem.id);
            expect(BasketService.deleteBasketItemFromBasket).toHaveBeenCalledTimes(1);
            expect(BasketService.getBasket).toHaveBeenCalledTimes(1);
            expect(BasketService.getBasket).toHaveBeenCalledWith(basketId);
        });
    });
});
