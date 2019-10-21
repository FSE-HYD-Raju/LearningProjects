"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum PosCheckoutActions {
    FLUX_SYNC = "PosCheckout_FLUX_SYNC",
	SET_VALUES = "PosCheckout_SET_VALUES",
    CONFIRM_CUSTOMER_DETAILS = "PosCheckout_CONFIRM_CUSTOMER_DETAILS",
    CONFIRM_CUSTOMER_DETAILS_START = "PosCheckout_CONFIRM_CUSTOMER_DETAILS_START",
    CONFIRM_CUSTOMER_DETAILS_COMPLETE = "PosCheckout_CONFIRM_CUSTOMER_DETAILS_COMPLETE",
	CONFIRM_CUSTOMER_DETAILS_FAILED = "PosCheckout_CONFIRM_CUSTOMER_DETAILS_FAILED",
	RESET_CONFIRM_CUSTOMER_DETAILS = "PosCheckout_RESET_CONFIRM_CUSTOMER_DETAILS",
}

export interface PosCheckoutActionPayload extends Action<PosCheckoutActions> {
	individualId?: string;
    fluxState?: any;
    error?: string;
	values?: ConsulValues;
}

export const posCheckout = {
    fluxSync: (fluxState: any) => ({type: PosCheckoutActions.FLUX_SYNC, fluxState}),
	setValues: (values: ConsulValues) => ({type: PosCheckoutActions.SET_VALUES, values}),
    confirmCustomerDetails: (individualId: string) => ({ type: PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS, individualId }),
    confirmCustomerDetailsStart: () => ({ type: PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_START }),
    confirmCustomerDetailsComplete: () => ({ type: PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_COMPLETE }),
	confirmCustomerDetailsFailed: () => ({ type: PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_FAILED }),
	resetConfirmCustomerDetails: () => ({ type: PosCheckoutActions.RESET_CONFIRM_CUSTOMER_DETAILS }),
};
