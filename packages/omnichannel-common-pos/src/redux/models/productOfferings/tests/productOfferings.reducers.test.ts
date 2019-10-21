"use strict";

import { omit } from "lodash";
import { default as reducer, initialState } from "../productOfferings.reducers";
import { ProductOfferingsActions, ProductOfferingsActionPayload } from "../productOfferings.actions";
import { ProductOfferingsState } from "../productOfferings.types";

const productOfferingId = "poId123456";

const productOffering = {
	id: productOfferingId,
	attributes: {
		name: "TestOffering"
	}
};

describe("Test eligibility.reducers: ", () => {
	const defaultState = initialState();
	const getInitialState = (state = {}) => ({ ...defaultState, ...state });
	let state;

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: ProductOfferingsActionPayload | any;
		newState: Partial<ProductOfferingsState> | any;
	}> = [
		{
			description: "do nothing for unexpected action type",
			action: { type: "SOME_ACTION", value: 1 },
			newState: { ...defaultState }
		}
	];

	specs.forEach(({ action, newState, description }) => {
		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});
	});

	describe(ProductOfferingsActions.GET_PRODUCT_OFFERING, () => {
		const action = (productOfferingId: string) => ({ type: ProductOfferingsActions.GET_PRODUCT_OFFERING, productOfferingId });
		const setState = (state = {}) => omit(getInitialState({ ...state }));

		it("should set correct values by default", () => {
			state = reducer(setState(), action(productOfferingId));
			expect(state).toEqual({
				productOfferings: {},
				queryStates: {
					[productOfferingId]: {productOfferingQuery: true}
				}
			});
		});
	});

	describe(ProductOfferingsActions.GET_PRODUCT_OFFERING_COMPLETE, () => {
		const action = (productOfferingId: string, productOffering: any) => ({
			type: ProductOfferingsActions.GET_PRODUCT_OFFERING_COMPLETE,
			productOfferingId,
			productOffering
		});
		const setState = (state = {}) => omit(getInitialState({ ...state }));

		it("should set correct values by default", () => {
			state = reducer(setState(), action(productOfferingId, productOffering));
			expect(state).toEqual({
				queryStates: {
					[productOfferingId]: {productOfferingQuery: false}
				},
				productOfferings: {
					[productOfferingId]: productOffering
				}
			});
		});
	});

	describe(ProductOfferingsActions.GET_PRODUCT_OFFERING_FAILED, () => {
		const action = (productOfferingId: string) => ({ type: ProductOfferingsActions.GET_PRODUCT_OFFERING_FAILED, productOfferingId });
		const setState = (state = {}) => omit(getInitialState({ ...state }));

		it("should set correct values by default", () => {
			state = reducer(setState(), action(productOfferingId));
			expect(state).toEqual({
				productOfferings: {},
				queryStates: {
					[productOfferingId]: {productOfferingQuery: false}
				}
			});
		});
	});
});
