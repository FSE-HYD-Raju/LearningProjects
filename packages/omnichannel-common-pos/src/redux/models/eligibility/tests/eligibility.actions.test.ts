"use strict";

import { invoke } from "lodash";
import { eligibility, EligibilityActions } from "../eligibility.actions";
import { EligibilityDecisionUseCase, RecipeId } from "../../../types";

type Eligibility = typeof eligibility;

describe("Test eligibility.actions: ", () => {

	it("should be an object", () => {
		expect(typeof eligibility).toEqual("object");
	});

	const specs: Array<{
		action: keyof Eligibility;
		type: EligibilityActions;
		data: any;
		expectedData: any
	}> = [{
		action: "getEligibilityDecision",
		type: EligibilityActions.GET_ELIGIBILITY_DECISION,
		data: [EligibilityDecisionUseCase.CHANGE_PLAN, RecipeId.PRODUCT_COMPATIBILITY_VALIDATION, { param1: "value" }],
		expectedData: {
			decisions: {
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
				parameters: { param1: "value" }
			}
		}
	}, {
		action: "getEligibilityDecisionComplete",
		type: EligibilityActions.GET_ELIGIBILITY_DECISION_COMPLETE,
		data: [EligibilityDecisionUseCase.CHANGE_PLAN, RecipeId.PRODUCT_COMPATIBILITY_VALIDATION],
		expectedData: {
			decisions: {
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION
			}
		}
	}, {
		action: "getEligibilityDecisionFailed",
		type: EligibilityActions.GET_ELIGIBILITY_DECISION_FAILED,
		data: [EligibilityDecisionUseCase.CHANGE_PLAN, RecipeId.PRODUCT_COMPATIBILITY_VALIDATION, "some-error"],
		expectedData: {
			decisions: {
				useCase: EligibilityDecisionUseCase.CHANGE_PLAN,
				recipeId: RecipeId.PRODUCT_COMPATIBILITY_VALIDATION,
				error: "some-error"
			}
		}
	}];

	specs.forEach(({ action, type, data, expectedData }: any) => {
		it(`action "${action}" return data with type: ${type}`, () => {
			const result = invoke(eligibility, action, ...data);
			expect(result).toEqual({ type, ...expectedData });
		});

	});

});
