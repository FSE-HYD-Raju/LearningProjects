"use strict";

import { EligibilityDecisionUseCase, RecipeId } from "../../types";
import { AppState } from "../../reducers";

export const getEligible = (eligibilityUseCase: EligibilityDecisionUseCase, recipeId: RecipeId, msisdn: string) => {
	return (state: AppState): boolean => {
		if (state.eligibility &&
			state.eligibility[eligibilityUseCase] &&
			state.eligibility[eligibilityUseCase].recipes[recipeId] &&
			state.eligibility[eligibilityUseCase].recipes[recipeId][msisdn]
		) {
			return Boolean(state.eligibility[eligibilityUseCase].recipes[recipeId][msisdn].eligible);
		}
		return false;
	};
};
