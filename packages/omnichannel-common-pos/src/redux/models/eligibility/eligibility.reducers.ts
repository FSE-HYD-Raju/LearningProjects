"use strict";

import { EligibilityState } from "./eligibility.types";
export { EligibilityState };
import { EligibilityActions, EligibilityActionPayload } from "./eligibility.actions";
import { EligibilityParameters, EligibilityParameterKey } from "./eligibility.types";
import { merge, get } from "lodash";

export const initialState = (): Partial<EligibilityState> => ({});

const getIdFromParams = (parameters: EligibilityParameters = {}): string => {
    return parameters[EligibilityParameterKey.MSISDN] || parameters[EligibilityParameterKey.SUPPLEMENTARY_OFFER_ID] || "";
};

const eligibilityReducer = (state: Partial<EligibilityState> = initialState(), action: EligibilityActionPayload): any => {
    const { type, decisions } = action;
    const id = getIdFromParams(decisions && decisions.parameters || {});

    switch (type) {
		case EligibilityActions.RESET:
			return {
				...initialState()
			};
        case EligibilityActions.GET_ELIGIBILITY_DECISION:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes: {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                eligibilityDecisionsQueryActive: true
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITY_DECISION_COMPLETE:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes:
                    {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                eligible: true,
                                eligibilityDecisionsQueryActive: false
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITY_DECISION_FAILED:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes:
                    {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                eligible: false,
                                error: decisions.error,
                                eligibilityDecisionsQueryActive: false
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITY_OPTIONS:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes:
                    {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                eligibilityOptionsQueryActive: true
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITY_OPTIONS_COMPLETE:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes:
                    {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                eligibilityOptions: decisions.options,
                                eligibilityOptionsQueryActive: false
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITY_OPTIONS_FAILED:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    recipes:
                    {
                        ...get(state, `${decisions.useCase}.recipes`, {}),
                        [decisions.recipeId]: {
                            [id]: {
                                error: decisions.error,
                                eligibilityOptionsQueryActive: false
                            }
                        }
                    }
                }
            };
        case EligibilityActions.GET_ELIGIBILITIES_FOR_CHANGE_PLAN:
            return {
                ...initialState(),
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    changePlanQueryActive: true
                }
            };
        case EligibilityActions.GET_ELIGIBILITIES_FOR_CHANGE_PLAN_COMPLETE:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    changePlanQueryActive: false
                }
            };
        case EligibilityActions.GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN:
            return {
                ...initialState(),
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    addonCompatibilityQueryActive: true
                }
            };
        case EligibilityActions.GET_ADDON_COMPATIBILITIES_FOR_CHANGE_PLAN_COMPLETE:
            return {
                ...state,
                [decisions.useCase]: {
                    ...((state[decisions.useCase]) || {}),
                    addonCompatibilityQueryActive: false
                }
            };
        default:
            return state;
    }
};

export default eligibilityReducer;
