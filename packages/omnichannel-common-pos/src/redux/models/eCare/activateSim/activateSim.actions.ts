"use strict";

import { Action } from "redux";
import { ActivateSimOrderData, SimIccVerificationAttributes, SimIccVerification } from "../../../types";

enum ActivateSimActions {
	FLUX_SYNC = "ActivateSim_FLUX_SYNC",

	GET_IN_PROGRESS_ORDERS = "ActivateSim_GET_IN_PROGRESS_ORDERS",
	GET_IN_PROGRESS_ORDERS_COMPLETE = "ActivateSim_GET_IN_PROGRESS_ORDERS_COMPLETE",
	GET_IN_PROGRESS_ORDERS_FAIL = "ActivateSim_GET_IN_PROGRESS_ORDERS_FAIL",

	SIM_ICC_VERIFICATION = "ActivateSim_SIM_ICC_VERIFICATION",
	SIM_ICC_VERIFICATION_COMPLETE = "ActivateSim_SIM_ICC_VERIFICATION_COMPLETE",
	SIM_ICC_VERIFICATION_FAIL = "ActivateSim_SIM_ICC_VERIFICATION_FAIL",

	ON_CLOSE = "ActivateSim_ON_CLOSE"
}

interface ActivateSimActionPayload extends Action<ActivateSimActions> {
	fluxState?: any;
	activateSimOrderData?: ActivateSimOrderData;
	personId?: string;
	verificationPayload?: SimIccVerificationAttributes;
	verificationResponse?: SimIccVerification;
}

const activateSim = {
	fluxSync: (fluxState: any) => ({ type: ActivateSimActions.FLUX_SYNC, fluxState }),

	getInProgressOrders: (personId: string) => ({
		type: ActivateSimActions.GET_IN_PROGRESS_ORDERS,
		personId
	}),
	getInProgressOrdersComplete: (data: ActivateSimOrderData) => ({
		type: ActivateSimActions.GET_IN_PROGRESS_ORDERS_COMPLETE,
		activateSimOrderData: data
	}),
	getInProgressOrdersFail: () => ({ type: ActivateSimActions.GET_IN_PROGRESS_ORDERS_FAIL }),

	simIccVerification: (verificationPayload: SimIccVerificationAttributes) => ({
		type: ActivateSimActions.SIM_ICC_VERIFICATION,
		verificationPayload
	}),
	simIccVerificationComplete: (data: SimIccVerification) => ({
		type: ActivateSimActions.SIM_ICC_VERIFICATION_COMPLETE,
		verificationResponse: data
	}),
	simIccVerificationFail: () => ({ type: ActivateSimActions.SIM_ICC_VERIFICATION_FAIL }),

	onClose: () => ({ type: ActivateSimActions.ON_CLOSE })
};

export { ActivateSimActions, ActivateSimActionPayload, activateSim };
