

import { omit } from "lodash";
import { BasketActions, BasketActionPayload } from "../basket.actions";
import { default as reducer, initialState } from "../basket.reducers";
import { basketItem, basketItems, filteredBasketItems, getIncludeBasketData, activeBasketInit, activeBasketUp } from "./basketMockData";
import { BasketItem, Basket } from "../../../types";

describe("Test basket.reducers: ", () => {
	const defaultState = initialState();
	const getInitialState = (state = {}) => ({ ...defaultState, ...state });
	let state;
	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});
	const specs: Array<{
		description: string;
		action: BasketActionPayload | any;
		newState: BasketActionPayload | any;
	}> = [
			{
				description: "do nothing for unexpected action type",
				action: { type: "SOME_ACTION", value: 1 },
				newState: { ...defaultState },
			},
		];
	specs.forEach(({ action, newState, description }) => {
		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});
	});

	describe(BasketActions.DELETE_ITEM_FROM_BASKET, () => {
		const action = (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => ({
			type: BasketActions.DELETE_ITEM_FROM_BASKET,
			basketItem,
			basketId,
			shippingMethodFromBasket,
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action(basketItem, "test1", false));
			expect(state).toEqual({
				...defaultState,
				updatingBasket: true,
			});
		});
	});

	describe(BasketActions.REMOVE_FROM_UI_BASKET_COMPLETE, () => {
		const action = (basketItem: BasketItem) => ({
			type: BasketActions.REMOVE_FROM_UI_BASKET_COMPLETE,
			basketItem,
		});
		const setState = (state = {}) => omit(getInitialState({ ...state, basketItems }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action(basketItem));
			expect(state).toEqual({
				...defaultState,
				basketItems: filteredBasketItems,
			});
		});
	});

	describe(BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE, () => {
		const action = (basketItem: BasketItem) => ({
			type: BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE,
			basketItem,
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action(basketItem));
			expect(state).toEqual({
				...defaultState,
				shippingMethods: [],
			});
		});
	});

	describe(BasketActions.GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE, () => {
		const action = (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) => ({
			type: BasketActions.GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE,
			basketAndBasketItems,
		});
		const setState = (state = {}) =>
			omit(getInitialState({ ...state }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action(getIncludeBasketData));
			expect(state).toEqual({
				...defaultState,
				working: false,
				updatingBasket: false,
				activeBasket: getIncludeBasketData.basket,
				basketItems: getIncludeBasketData.basketItems,
			});
		});
	});


	describe(BasketActions.GET_BASKET_AFTER_DELETE_COMPLETE, () => {
		const action = (activeBasket?: Basket) => ({
			type: BasketActions.GET_BASKET_AFTER_DELETE_COMPLETE,
			activeBasket,
		});
		const setState = (state = {}) => omit(getInitialState({ ...state, activeBasket: activeBasketInit }));
		it("should set correct values by default", () => {
			state = reducer(setState(), action(activeBasketUp));
			expect(state).toEqual({
				...defaultState,
				activeBasket: activeBasketUp,
			});
		});
	});
});
