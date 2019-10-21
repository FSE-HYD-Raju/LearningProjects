"use strict";

import { Basket, User } from "../../../types";
import { basket, BasketActions } from "../basket.actions";
import { basketItem, getIncludeBasketData } from "./basketMockData";

describe("basket.actions", () => {
    describe("checkBaskets()", () => {
        it("returns ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET event with active basket, id of basket to discard, and user", () => {
            const openBaskets: Basket[] = [];
            const currentUser = {
                id: "juanita",
                individualId: "juanita"
            } as User;
            const activeBasket = {
                id: "active-basket-id"
            } as Basket;

            const result = basket.checkBaskets(openBaskets, currentUser, activeBasket);

            expect(result.type).toEqual(BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET);
            expect(result.basket).toEqual(activeBasket);
            expect(result.idOfBasketToDiscard).toEqual(undefined);
            expect(result.owner).toEqual(currentUser);
        });

        const yesterday = new Date(2018, 9, 2, 16, 55, 0, 0);
        const aMomentAgo = new Date(2018, 9, 3, 16, 35, 0, 0);

        it("returns SET_BASKET_AS_ACTIVE_BASKET event with id of an open basket", () => {
            const openBaskets: Basket[] = [
                {
                    id: "foo-1",
                    attributes: {
                        lastModifiedAt: yesterday,
                        lifecycleStatus: "OPEN"
                    }
                } as any as Basket,
                {
                    id: "foo-2",
                    attributes: {
                        lastModifiedAt: aMomentAgo,
                        lifecycleStatus: "OPEN"
                    }
                } as any as Basket
            ];
            const currentUser = {
                id: "juanita"
            } as User;

            const result = basket.checkBaskets(openBaskets, currentUser);

            expect(result.type).toEqual(BasketActions.SET_BASKET_AS_ACTIVE_BASKET);
            expect(result.basketId).toEqual("foo-1");
        });

        describe("Remove Item from basket", () => {
            it("delete item from basket", () => {
                const basketId = "foo-1" as string;
                const basketItemForDelete = basketItem;
                const shippingMethodFromBasket = false as boolean;
                const result = basket.deleteItemFromBasket(basketItem, basketId, shippingMethodFromBasket);
                expect(result.type).toEqual(BasketActions.DELETE_ITEM_FROM_BASKET);
                expect(result.basketId).toEqual("foo-1");
                expect(result.basketItem).toEqual(basketItemForDelete);
                expect(result.shippingMethodFromBasket).toEqual(false);
            });

            it("remove ui item from basket", () => {
                const basketItemForUI = basketItem;
                const result = basket.removeFromUIBasketComplete(basketItemForUI);
                expect(result.type).toEqual(BasketActions.REMOVE_FROM_UI_BASKET_COMPLETE);
                expect(result.basketItem).toEqual(basketItemForUI);
            });

            it("remove shipping methods item from basket", () => {
                const basketItemForShipping = basketItem;
                const result = basket.removeShippingMethodsComplete(basketItemForShipping);
                expect(result.type).toEqual(BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE);
                expect(result.basketItem).toEqual(basketItemForShipping);
            });

            it("get Basket include after deletion failure", () => {
                const basketAndBasketItems = { basket: basketItem, basketItems: getIncludeBasketData } as any;
                const result = basket.getBasketIncludeAfterDeleteComplete(basketAndBasketItems);
                expect(result.type).toEqual(BasketActions.GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE);
                expect(result.basketAndBasketItems).toEqual(basketAndBasketItems);
            });

            it("get Basket after deletion success", () => {
                const activeBasket = ({
                    attributes: {},
                    id: "1234",
                    relationships: {},
                    type: "Baskets",
                } as any) as Basket;
                const result = basket.getBasketAfterDeleteComplete(activeBasket);
                expect(result.type).toEqual(BasketActions.GET_BASKET_AFTER_DELETE_COMPLETE);
                expect(result.activeBasket).toEqual(activeBasket);
            });
        });
    });
});
