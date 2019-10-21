"use strict";

import { AxiosResponse } from "axios";
import { Rest } from "./Rest";
import { REST } from "../settings/core";

import { RecipeId, EligibilityDecision, EligibilityParameters, EligibilityOptions, OptionContent } from "../types";
import ErrorContainer from "./ErrorContainer";

export default class EligibilityService {
	static async getEligibilityDecision(recipeId: RecipeId, parameters: EligibilityParameters): Promise<AxiosResponse<EligibilityDecision>> {
		const response: AxiosResponse<EligibilityDecision> | ErrorContainer = await Rest.post(REST.ELIGIBILITY.ELIGIBILITY_DECISIONS, {
			data: {
				type: "eligibility-decisions",
				attributes: {
					recipeId,
					parameters
				}
			}
		});

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response;
	}

	static async getEligibilityOptions(recipeId: RecipeId, parameters: EligibilityParameters): Promise<AxiosResponse<EligibilityOptions>> {
		const response: AxiosResponse<EligibilityOptions> | ErrorContainer = await Rest.post(REST.ELIGIBILITY.ELIGIBILITY_OPTIONS, {
			data: {
				type: "eligibility-options",
				attributes: {
					"recipe-id": recipeId,
					parameters
				}
			}
		});

		if (response instanceof ErrorContainer) {
			throw new Error(response.errors && response.errors.length > 0 && response.errors[0].code);
		}

		return response;

	}
}
