"use strict";

import { Action } from "redux";
import { CreateCustomerCasePayload } from "./support.types";

export enum SupportActions {
	GET_CUSTOMER_CASES = "Support_GET_CUSTOMER_CASES",
	GET_CUSTOMER_CASES_COMPLETE = "Support_GET_CUSTOMER_CASES_COMPLETE",
	GET_CUSTOMER_CASES_FAIL = "Support_GET_CUSTOMER_CASES_FAIL",
	POST_CUSTOMER_CASE = "Support_POST_CUSTOMER_CASE",
	POST_CUSTOMER_CASE_FAIL = "Support_POST_CUSTOMER_CASE_FAIL"
}

export interface SupportActionPayload extends Action<SupportActions> {
	error?: string;
	userId?: string;
	cases?: any;
	customerCase?: CreateCustomerCasePayload;
}

export const support = {
	getCustomerCases: (userId: string) => {
		return { type: SupportActions.GET_CUSTOMER_CASES, userId };
	},
	getCustomerCasesComplete: (cases: any) => ({ type: SupportActions.GET_CUSTOMER_CASES_COMPLETE, cases }),
	getCustomerCasesFail: (error: any) => ({ type: SupportActions.GET_CUSTOMER_CASES_FAIL, error }),
	postCustomerCase: (customerCase: CreateCustomerCasePayload) => ({
		type: SupportActions.POST_CUSTOMER_CASE,
		customerCase
	}),
	postCustomerCaseFail: (error: any) => ({ type: SupportActions.POST_CUSTOMER_CASE_FAIL, error })
};
