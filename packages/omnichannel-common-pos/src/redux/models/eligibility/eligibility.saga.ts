"use strict";

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { eligibility, EligibilityActions, EligibilityActionPayload } from "./eligibility.actions";
import {
	EligibilityDecision,
	RecipeId,
	EligibilityDecisionUseCase,
	EligibilityParameterKey,
	EligibilityOptions,
	EligibilityParameters,
	OptionContent
} from "./eligibility.types";
import { productOfferings } from "../productOfferings/productOfferings.actions";
import { AxiosResponse } from "axios";
import EligibilityService from "../../services/EligibilityService";
import ProductOfferingService from "../../services/ProductOfferingService";
import { get } from "lodash";
import { AppState } from "../../reducers";

const GENERIC_FAILURE = "generic-eligibility-check-failure";

function* getEligibilityDecision(action: EligibilityActionPayload) {
	const { recipeId, parameters, useCase } = action.decisions;
	try {
		const response: AxiosResponse<EligibilityDecision> = yield call(() => {
			return EligibilityService.getEligibilityDecision(recipeId, parameters || {});
		});
		yield put(eligibility.getEligibilityDecisionComplete(useCase, recipeId, parameters));
	} catch (e) {
		yield put(eligibility.getEligibilityDecisionFailed(useCase, recipeId, e.message || GENERIC_FAILURE, parameters));
	}
}

function* getEligibilityOptions(action: EligibilityActionPayload) {
	const { recipeId, parameters, useCase } = action.decisions;
	try {
		const response: AxiosResponse<EligibilityDecision> = yield call(() => {
			return EligibilityService.getEligibilityOptions(recipeId, parameters || {});
		});
		const availableOptions = get(response, "data.attributes.available-options", []);
		yield put(eligibility.getEligibilityOptionsComplete(useCase, recipeId, availableOptions, parameters));
	} catch (e) {
		yield put(eligibility.getEligibilityOptionsFailed(useCase, recipeId, e.message || GENERIC_FAILURE, parameters));
	}
}

function* getEligibilitiesForChangePlan(action: EligibilityActionPayload) {
	const parameters = action.decisions.parameters;
	const useCase = EligibilityDecisionUseCase.CHANGE_PLAN;

	let decisions: EligibilityDecision | undefined;
	let options: OptionContent[] | undefined;

	// Fetch eligiblity decision
	try {
		const id = get(parameters, "msisdn") ||
			get(parameters, `${EligibilityParameterKey.SUPPLEMENTARY_OFFER_ID}`) ||
			"";
		decisions = yield call(() => {
			return EligibilityService.getEligibilityDecision(RecipeId.SUBSCRIPTION_VALIDATION, parameters || {});
		});
		yield put(eligibility.getEligibilityDecisionComplete(EligibilityDecisionUseCase.CHANGE_PLAN, RecipeId.SUBSCRIPTION_VALIDATION, parameters));
	} catch (e) {
		yield put(eligibility.getEligibilityDecisionFailed(useCase, RecipeId.SUBSCRIPTION_VALIDATION, e.message || GENERIC_FAILURE, parameters));
	}

	// Fetch eligibility options (list of PO IDs )
	if (decisions) {
		try {
			const response: AxiosResponse<EligibilityOptions> = yield call(() => {
				return EligibilityService.getEligibilityOptions(RecipeId.SUBSCRIPTION_PLAN_CHANGE, parameters || {});
			});
			options = response.data.attributes["available-options"];
			yield put(eligibility.getEligibilityOptionsComplete(useCase, RecipeId.SUBSCRIPTION_PLAN_CHANGE, options, parameters));
		} catch (e) {
			yield put(eligibility.getEligibilityOptionsFailed(useCase, RecipeId.SUBSCRIPTION_PLAN_CHANGE, e.message || GENERIC_FAILURE, parameters));
		}
	}

	// Fetch actual POs for all the IDs
	if (Array.isArray(options) && options.length) {
		const existingProductOfferings = yield select((state: AppState) => state.productOfferings.productOfferings);
		for (let i = 0; i < options.length; i++) {
			const singleOption = options[i];
			const productOfferingId = singleOption["product-offering-id"];

			// Fetch only POs that are not already found in the state
			if (productOfferingId && !Object.keys(existingProductOfferings).includes(productOfferingId)) {
				try {
					const productOffering = yield call(() => {
						return ProductOfferingService.getProductOffering(productOfferingId);
					});
					yield put(productOfferings.getProductOfferingComplete(productOfferingId, productOffering));
				} catch (e) {
					yield put(productOfferings.getProductOfferingFailed(productOfferingId));
				}
			}
		}
	}

	yield put(eligibility.getEligibilitiesForChangePlanComplete(useCase));
}

function* getAddonCompatibilitiesForChangePlan(action: EligibilityActionPayload) {
	const recipeId = action.decisions.recipeId;
	const useCase = action.decisions.useCase;
	const newPlanId = action.decisions.id;
	const addonIds = action.decisions.addonIds;

	if (newPlanId && Array.isArray(addonIds) && addonIds.length) {
		for (let i = 0; i < addonIds.length; i++) {
			const addonId = addonIds[i];
			const parameters = {
				[EligibilityParameterKey.SUPPLEMENTARY_OFFER_ID]: addonId,
				"primary-offer-id": newPlanId
			};

			try {
				const response: AxiosResponse<EligibilityDecision> = yield call(() => {
					return EligibilityService.getEligibilityDecision(recipeId, parameters || {});
				});
				yield put(eligibility.getEligibilityDecisionComplete(useCase, recipeId, parameters));
			} catch (e) {
				yield put(eligibility.getEligibilityDecisionFailed(useCase, recipeId, e.message || GENERIC_FAILURE, parameters));
			}
		}
	}

	yield put(eligibility.getAddonCompatibilitiesForChangePlanComplete(useCase, recipeId));
}

export function* eligibilitySaga(): any {
	yield all([
		takeLatest(EligibilityActions.GET_ELIGIBILITY_DECISION, getEligibilityDecision),
		takeLatest(EligibilityActions.GET_ELIGIBILITY_OPTIONS, getEligibilityOptions),
		takeLatest(EligibilityActions.GET_ELIGIBILITIES_FOR_CHANGE_PLAN, getEligibilitiesForChangePlan),
		takeLatest(EligibilityActions.GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN, getAddonCompatibilitiesForChangePlan)
	]);
}
