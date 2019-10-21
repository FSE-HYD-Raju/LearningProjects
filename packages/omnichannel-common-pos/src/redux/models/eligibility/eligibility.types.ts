"use strict";

export enum EligibilityDecisionUseCase {
    CHANGE_PLAN = "CHANGE_PLAN",
    SERVICE_PLAN_VIEW = "SERVICE_PLAN_VIEW",
    VALIDATE_PORTIN = "VALIDATE_PORTIN"
}

export enum RecipeId {
    SUBSCRIPTION_VALIDATION = "subscription-validation",
    SUBSCRIPTION_PLAN_CHANGE = "subscription-plan-change",
    PRODUCT_COMPATIBILITY_VALIDATION = "product-compatibility-validation",
    PORT_IN_VALIDATION = "port-in-validation"
}

export enum EligibilityParameterKey {
    MSISDN = "msisdn",
    SUPPLEMENTARY_OFFER_ID = "supplementary-offer-id"
}

export type EligibilityParameters = Record<string, string>;

export type EligibilityDecision = {
    attributes: {
        recipeId: RecipeId;
        parameters: EligibilityParameters;
    };
};

export type EligibilityOptions = {
    attributes: {
        "available-options": OptionContentArray;
        parameters: EligibilityParameters;
    };
};

export type OptionContentArray = Array<OptionContent>;

export type OptionContent = {
    characteristics: EligibilityParameters;
    "product-offering-id": string;
};

export type Eligibilities = {
	[id: string]: {
		eligibilityDecisionsQueryActive: boolean;
		eligibilityOptionsQueryActive: boolean;
		eligible?: boolean;
		error?: string;
		eligibilityOptions?: OptionContentArray;
	}
};

export type EligibilityState = {
    [useCase: string]: {
        changePlanQueryActive?: boolean;
        addonCompatibilityQueryActive?: boolean;
        recipes: Record<string, Eligibilities>;
    };
};
