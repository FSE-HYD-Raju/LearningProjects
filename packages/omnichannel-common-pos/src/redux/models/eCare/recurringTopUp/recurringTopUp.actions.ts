"use strict";

import { Action } from "redux";
import { ProductOffering } from "../../../types";
import { RecurringTopUpModelType } from "../../../types/RecurringTopUpModelType";

export enum RecurringTopUpActions {
	RESET_NEW_TOP_UP_PRODUCT_OFFERINGS = "RecurringTopUp_RESET_NEW_TOP_UP_PRODUCT_OFFERINGS",
	GET_NEW_TOP_UP_PRODUCT_OFFERINGS = "RecurringTopUp_GET_NEW_TOP_UP_PRODUCT_OFFERINGS",
	GET_NEW_TOP_UP_PRODUCT_OFFERINGS_COMPLETE = "RecurringTopUp_GET_NEW_TOP_UP_PRODUCT_OFFERINGS_COMPLETE",
	SUBMIT_NEW_TOP_UP = "RecurringTopUp_SUBMIT_NEW_TOP_UP",
	SUBMIT_EXISTING_TOP_UP = "RecurringTopUp_SUBMIT_EXISTING_TOP_UP",
	SUBMIT_TOP_UP_COMPLETE = "RecurringTopUp_SUBMIT_TOP_UP_COMPLETE",
	RESET_IS_BASKET_SUBMIT = "RecurringTopUp_RESET_IS_BASKET_SUBMIT",
	REMOVE_TOP_UP = "RecurringTopUp_REMOVE_TOP_UP",
}

export interface RecurringTopUpActionPayload extends Action<RecurringTopUpActions> {
	agreementId?: string;
	productOfferings?: ProductOffering[];
	model?: RecurringTopUpModelType;
	productId?: string;
}

export const recurringTopUp = {
	resetNewTopUpProductOfferings: () => ({
		type: RecurringTopUpActions.RESET_NEW_TOP_UP_PRODUCT_OFFERINGS,
	}),
	getNewTopUpProductOfferings: (agreementId: string) => ({
		type: RecurringTopUpActions.GET_NEW_TOP_UP_PRODUCT_OFFERINGS,
		agreementId,
	}),
	getNewTopUpProductOfferingsComplete: (agreementId: string, productOfferings: ProductOffering[]) => ({
		type: RecurringTopUpActions.GET_NEW_TOP_UP_PRODUCT_OFFERINGS_COMPLETE,
		agreementId,
		productOfferings,
	}),
	submitNewTopUp: (model: RecurringTopUpModelType) => ({
		type: RecurringTopUpActions.SUBMIT_NEW_TOP_UP,
		model,
	}),
	submitExistingTopUp: (model: RecurringTopUpModelType) => ({
		type: RecurringTopUpActions.SUBMIT_EXISTING_TOP_UP,
		model,
	}),
	submitTopUpComplete: () => ({
		type: RecurringTopUpActions.SUBMIT_TOP_UP_COMPLETE,
	}),
	resetIsBasketSubmit: () => ({
		type: RecurringTopUpActions.RESET_IS_BASKET_SUBMIT,
	}),
	removeTopUp: (productId: string) => ({
		type: RecurringTopUpActions.REMOVE_TOP_UP,
		productId,
	}),
};
