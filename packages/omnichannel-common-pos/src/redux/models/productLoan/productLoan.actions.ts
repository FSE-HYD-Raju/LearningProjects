"use strict";

import { Action } from "redux";
import { ProductOffering } from "../../types";
import { InitializeAddonConfig } from "../../services/AddonService";

export enum ProductLoanActions {
	GET_AVAILABLE_LOANS = "ProductLoan_GET_AVAILABLE_LOANS",
	GET_AVAILABLE_LOANS_COMPLETE = "ProductLoan_GET_AVAILABLE_LOANS_COMPLETE",
	SHOW_LOAN_ACTIVATION_MODAL = "ProductLoan_SHOW_LOAN_ACTIVATION_MODAL",
	HIDE_LOAN_ACTIVATION_MODAL = "ProductLoan_HIDE_LOAN_ACTIVATION_MODAL",
	CONFIRM_LOAN_ACTIVATION = "ProductLoan_CONFIRM_LOAN_ACTIVATION_MODAL"
}

export interface ProductLoanActionPayload extends Action<ProductLoanActions> {
	loans?: ProductOffering[];
	agreementId?: string;
	selectedLoan?: ProductOffering;
	initializeAddonConfig?: InitializeAddonConfig;
}

export const productLoan = {
	getAvailableLoans: (agreementId: string) => ({
		type: ProductLoanActions.GET_AVAILABLE_LOANS,
		agreementId
	}),
	getAvailableLoansComplete: (loans: ProductOffering[]) => ({
		type: ProductLoanActions.GET_AVAILABLE_LOANS_COMPLETE,
		loans
	}),
	showLoanActivationModal: (selectedLoan: ProductOffering) => ({
		type: ProductLoanActions.SHOW_LOAN_ACTIVATION_MODAL,
		selectedLoan
	}),
	hideLoanActivationModal: () => ({
		type: ProductLoanActions.HIDE_LOAN_ACTIVATION_MODAL
	}),
	confirmLoanActivation: (initializeAddonConfig: InitializeAddonConfig) => ({
		type: ProductLoanActions.CONFIRM_LOAN_ACTIVATION,
		initializeAddonConfig
	})
};
