"use strict";

import { Action } from "redux";
import { EligibilityDecisionUseCase, RecipeId, EligibilityParameters, OptionContentArray } from "./eligibility.types";

export enum EligibilityActions {
	RESET = "RESET",
    GET_ELIGIBILITY_DECISION = "Eligibility_GET_ELIGIBILITY_DECISION",
    GET_ELIGIBILITY_DECISION_COMPLETE = "Eligibility_GET_ELIGIBILITY_DECISION_COMPLETE",
    GET_ELIGIBILITY_DECISION_FAILED = "Eligibility_GET_ELIGIBILITY_DECISION_FAILED",

    GET_ELIGIBILITY_OPTIONS = "Eligibility_GET_ELIGIBILITY_OPTIONS",
    GET_ELIGIBILITY_OPTIONS_COMPLETE = "Eligibility_GET_ELIGIBILITY_OPTIONS_COMPLETE",
    GET_ELIGIBILITY_OPTIONS_FAILED = "Eligibility_GET_ELIGIBILITY_OPTIONS_FAILED",

    GET_ELIGIBILITIES_FOR_CHANGE_PLAN = "Eligibility_GET_ELIGIBILITIES_FOR_CHANGE_PLAN",
    GET_ELIGIBILITIES_FOR_CHANGE_PLAN_COMPLETE = "Eligibility_GET_ELIGIBILITIES_FOR_CHANGE_PLAN_COMPLETE",

    GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN = "Eligibility_GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN",
    GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN_COMPLETE = "Eligibility_GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN_COMPLETE",

    ON_ERROR = "Eligibility_ON_ERROR"
}

export interface EligibilityActionPayload extends Action<EligibilityActions> {
    decisions: {
        useCase: EligibilityDecisionUseCase;
        recipeId: RecipeId;
        parameters: EligibilityParameters;
        options?: OptionContentArray;
        id: string;
        addonIds?: Array<string>;
        error?: {
            status: number;
            title: string;
            detail: string;
        }
    };
}

export const eligibility = {
    getEligibilityDecision: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, parameters: EligibilityParameters) =>
        ({ type: EligibilityActions.GET_ELIGIBILITY_DECISION, decisions: { useCase, recipeId, parameters } }),
    getEligibilityDecisionComplete: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, parameters: EligibilityParameters) =>
        ({ type: EligibilityActions.GET_ELIGIBILITY_DECISION_COMPLETE, decisions: { useCase, recipeId, parameters } }),
    getEligibilityDecisionFailed: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, error: string, parameters: EligibilityParameters) =>
        ({
            type: EligibilityActions.GET_ELIGIBILITY_DECISION_FAILED,
            decisions: {
                useCase, error, recipeId, parameters
            }
        }),
    getEligibilityOptions: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, parameters: EligibilityParameters) =>
        ({ type: EligibilityActions.GET_ELIGIBILITY_OPTIONS, decisions: { useCase, recipeId, parameters } }),
    getEligibilityOptionsComplete:
        (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, availableOptions: OptionContentArray, parameters: EligibilityParameters) =>
            ({ type: EligibilityActions.GET_ELIGIBILITY_OPTIONS_COMPLETE, decisions: { useCase, recipeId, options: availableOptions, parameters } }),
    getEligibilityOptionsFailed: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, error: string, parameters: EligibilityParameters) =>
        ({
            type: EligibilityActions.GET_ELIGIBILITY_OPTIONS_FAILED,
            decisions: {
                useCase, error, recipeId, parameters
            }
        }),
	reset: () => ({type: EligibilityActions.RESET}),
    getEligibilitiesForChangePlan: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, parameters: EligibilityParameters) =>
        ({ type: EligibilityActions.GET_ELIGIBILITIES_FOR_CHANGE_PLAN, decisions: { useCase, recipeId, parameters } }),

    getEligibilitiesForChangePlanComplete: (useCase: EligibilityDecisionUseCase) =>
        ({ type: EligibilityActions.GET_ELIGIBILITIES_FOR_CHANGE_PLAN_COMPLETE, decisions: { useCase } }),

    getAddonCompatibilitiesForChangePlan: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId, id: string, addonIds: string[]) =>
        ({ type: EligibilityActions.GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN, decisions: { useCase, recipeId, id, addonIds } }),

    getAddonCompatibilitiesForChangePlanComplete: (useCase: EligibilityDecisionUseCase, recipeId: RecipeId) =>
        ({ type: EligibilityActions.GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN_COMPLETE, decisions: { useCase, recipeId } })
};
