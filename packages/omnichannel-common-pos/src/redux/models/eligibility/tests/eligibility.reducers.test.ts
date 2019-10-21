"use strict";

import { omit } from "lodash";
import { default as reducer, initialState } from "../eligibility.reducers";
import { EligibilityActions, EligibilityActionPayload } from "../eligibility.actions";
import { EligibilityState, EligibilityDecisionUseCase, RecipeId } from "../eligibility.types";

describe("Test eligibility.reducers: ", () => {

	const defaultState = initialState();
	const getInitialState = (state = {}) => ({ ...defaultState, ...state });
	let state;

	it("should be a function", () => {
		expect(typeof reducer).toEqual("function");
	});

	const specs: Array<{
		description: string;
		action: EligibilityActionPayload | any;
		newState: Partial<EligibilityState> | any;
	}> = [{
		description: "do nothing for unexpected action type",
		action: { type: "SOME_ACTION", value: 1 },
		newState: { ...defaultState }
	}];

	specs.forEach(({ action, newState, description }) => {

		it(`${action.type} ${description}`, () => {
			state = reducer(getInitialState(), action);
			expect(state).toEqual(newState);
		});

	});

	describe(EligibilityActions.GET_ELIGIBILITY_DECISION, () => {
		const action = (decisions: any) => ({ type: EligibilityActions.GET_ELIGIBILITY_DECISION, decisions });
		const setState = (state = {}) => omit(
			getInitialState({ ...state })
		);

		const id = "whatever";

		it("should set correct values by default", () => {
			state = reducer(setState(), action({
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
				parameters: {
					msisdn: id
				}
			}));
			expect(state).toEqual({
				CHANGE_PLAN: {
					recipes: {
						[RecipeId.PRODUCT_COMPATIBILITY_VALIDATION]: {
							[id]: {
							 eligibilityDecisionsQueryActive: true
							}
						}
					}
				}
			});
		});
	});

	describe(EligibilityActions.GET_ELIGIBILITY_DECISION_COMPLETE, () => {
		const action = (decisions: any) => ({ type: EligibilityActions.GET_ELIGIBILITY_DECISION_COMPLETE, decisions });
		const setState = (state = {}) => omit(
			getInitialState({ ...state })
		);

		const id = "whatever";

		it("should set correct values by default", () => {
			state = reducer(setState(), action({
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
				parameters: {
					msisdn: id
				}
			}));
			expect(state).toEqual({
				CHANGE_PLAN: {
					recipes: {
						[RecipeId.PRODUCT_COMPATIBILITY_VALIDATION]: {
							[id]: {
								eligibilityDecisionsQueryActive: false,
								eligible: true
							}
						}
					}
				}
			});
		});
	});

	describe(EligibilityActions.GET_ELIGIBILITY_DECISION_FAILED, () => {
		const action = (decisions: any) => ({ type: EligibilityActions.GET_ELIGIBILITY_DECISION_FAILED, decisions });
		const setState = (state = {}) => omit(
			getInitialState({ ...state })
		);

		const id = "whatever";

		it("should set correct values by default", () => {
			state = reducer(setState(), action({
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
				error: "eligibility-check-failed",
				parameters: {
					msisdn: id
				}
			}));
			expect(state).toEqual({
				CHANGE_PLAN: {
					recipes: {
						[RecipeId.PRODUCT_COMPATIBILITY_VALIDATION]: {
							[id]: {
								eligibilityDecisionsQueryActive: false,
								eligible: false,
								error: "eligibility-check-failed"
							}
						}
					}
				}
			});
		});
	});
});
