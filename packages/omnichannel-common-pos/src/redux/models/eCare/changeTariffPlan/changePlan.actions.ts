"use strict";

import { Action } from "redux";
import { Product, ProductOffering } from "../../../types";
import { InitializedAddon } from "../../../index";

export enum ChangePlanActions {
	RESET_AVAILABLE_PLAN_PRODUCT_OFFERINGS = "ChangePlan_RESET_AVAILABLE_PLAN_PRODUCT_OFFERINGS",
	GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS = "ChangePlan_GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS",
	GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS_COMPLETE = "ChangePlan_GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS_COMPLETE",
	SHOW_CHANGE_PLAN_SUMMARY_MODAL = "ChangePlan_SHOW_CHANGE_PLAN_SUMMARY_MODAL",
	HIDE_CHANGE_PLAN_SUMMARY_MODAL = "ChangePlan_HIDE_CHANGE_PLAN_SUMMARY_MODAL",
	INIT_CHANGE_PLAN = "ChangePlan_SELECT_CURRENT_PLAN",
	SELECT_NEW_PLAN = "ChangePlan_SELECT_NEW_PLAN",
	SELECT_NEW_PLAN_COMPLETE = "ChangePlan_SELECT_NEW_PLAN_COMPLETE",
	CANCEL_CHANGE_PLAN = "ChangePlan_CANCEL_CHANGE_PLAN",
	PROCEED_CHANGE_PLAN = "ChangePlan_PROCEED_CHANGE_PLAN",
	SET_CURRENT_PLAN = "ChangePlan_SET_CURRENT_PLAN",
}

export interface ChangePlanActionPayload extends Action<ChangePlanActions> {
	agreementId?: string;
	currentPlanProductOfferingId?: string;
	currentPlan?: ProductOffering;
	availablePlans?: ProductOffering[];
	selectedPlan?: ProductOffering;
	initializationResult?: InitializedAddon;
	redirectUrl?: string;
}

export const changePlan = {
	proceedChangePlan: (redirectUrl: string) => ({
		type: ChangePlanActions.PROCEED_CHANGE_PLAN,
		redirectUrl,
	}),
	cancelChangePlan: () => ({
		type: ChangePlanActions.CANCEL_CHANGE_PLAN,
	}),
	initChangePlan: (agreementId: string, currentPlanProductOfferingId: string, redirectUrl: string) => ({
		type: ChangePlanActions.INIT_CHANGE_PLAN,
		agreementId,
		currentPlanProductOfferingId,
		redirectUrl,
	}),
	setCurrentPlan: (currentPlan: ProductOffering) => ({
		type: ChangePlanActions.SET_CURRENT_PLAN,
		currentPlan,
	}),
	selectNewPlan: (selectedPlan: ProductOffering) => ({
		type: ChangePlanActions.SELECT_NEW_PLAN,
		selectedPlan,
	}),
	selectNewPlanComplete: (initializationResult: InitializedAddon) => ({
		type: ChangePlanActions.SELECT_NEW_PLAN_COMPLETE,
		initializationResult,
	}),
	showChangePlanSummaryModal: () => ({
		type: ChangePlanActions.SHOW_CHANGE_PLAN_SUMMARY_MODAL,
	}),
	hideChangePlanSummaryModal: () => ({
		type: ChangePlanActions.HIDE_CHANGE_PLAN_SUMMARY_MODAL,
	}),
	resetAvailablePlanProductOfferings: () => ({
		type: ChangePlanActions.RESET_AVAILABLE_PLAN_PRODUCT_OFFERINGS,
	}),
	getAvailablePlanProductOfferings: (agreementId: string) => ({
		type: ChangePlanActions.GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS,
		agreementId,
	}),
	getAvailablePlanProductOfferingsComplete: (agreementId: string, availablePlans: ProductOffering[]) => ({
		type: ChangePlanActions.GET_AVAILABLE_PLAN_PRODUCT_OFFERINGS_COMPLETE,
		agreementId,
		availablePlans,
	}),
};
