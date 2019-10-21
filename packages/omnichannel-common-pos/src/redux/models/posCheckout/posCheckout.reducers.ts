"use strict";

import { PosCheckoutActions, PosCheckoutActionPayload } from "./posCheckout.actions";
import { PosCheckoutState } from "./posCheckout.types";
import { ConsulValues } from "../..";
import { extractValues } from "../posCheckout/posCheckout.utils";
export { PosCheckoutActionPayload } from "./posCheckout.actions";
export { PosCheckoutState } from "./posCheckout.types";

const initialState: PosCheckoutState = {
	showPOSDeliveryModal: false,
	POSDeliveryType: "",
	POSDeliveryMethodId: "",
	customerDetailsConfirmationStatus: "NOT_STARTED",
	installationAddressDefaultLocationType: "home",
	privacyConsentId: "PO_MCP",
};

const posCheckoutReducer = (state: Partial<PosCheckoutState> = initialState, action: PosCheckoutActionPayload) => {
    const { type } = action;
    switch (type) {
        case PosCheckoutActions.FLUX_SYNC:
            return {...state, ...action.fluxState};
		case PosCheckoutActions.SET_VALUES:
			return {
				...state,
				...extractValues(action.values as ConsulValues, state)
			};
        case PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_START:
            return { ...state, customerDetailsConfirmationStatus: "IN_PROGRESS" };
        case PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_COMPLETE:
            return { ...state, customerDetailsConfirmationStatus: "SUCCESS" };
        case PosCheckoutActions.CONFIRM_CUSTOMER_DETAILS_FAILED:
			return { ...state, customerDetailsConfirmationStatus: "FAIL" };
		case PosCheckoutActions.RESET_CONFIRM_CUSTOMER_DETAILS:
			return { ...state, customerDetailsConfirmationStatus: initialState.customerDetailsConfirmationStatus };
        default:
            return state;
    }
};

export default posCheckoutReducer;
