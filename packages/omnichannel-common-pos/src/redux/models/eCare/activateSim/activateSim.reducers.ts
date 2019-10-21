"use strict";

import { find, isEmpty } from "lodash";
import { ActivateSimActions, ActivateSimActionPayload } from "./activateSim.actions";
import { ActivateSimState } from "./activateSim.types";
import { getOrders } from "../../digitalLife/digitalLife.utils";

export { ActivateSimState } from "./activateSim.types";

const initialState = {};

const activateSimReducer = (state: Partial<ActivateSimState> = initialState, action: ActivateSimActionPayload) => {
	const { type } = action;
	switch (type) {
		case ActivateSimActions.FLUX_SYNC:
			return { ...state, ...(action as ActivateSimActionPayload).fluxState };

		case ActivateSimActions.GET_IN_PROGRESS_ORDERS_COMPLETE:
			const activateSimOrderData = action.activateSimOrderData;
			if (!activateSimOrderData) {
				return state;
			}
			const { orders, orderItems } = activateSimOrderData;
			return {
				...state,
				activateSimOrderData: { orders: getOrders(orders, orderItems) },
			};

		case ActivateSimActions.GET_IN_PROGRESS_ORDERS_FAIL:
			return {
				...state,
				activateSimOrderData: {
					orders: [],
					orderItems: [],
				},
			};

		case ActivateSimActions.SIM_ICC_VERIFICATION_COMPLETE:
			const verificationResponse = action.verificationResponse;
			return {
				...state,
				verificationResponse: { ...verificationResponse },
				verificationError: false,
			};

		case ActivateSimActions.SIM_ICC_VERIFICATION_FAIL:
			return {
				...state,
				verificationResponse: null,
				verificationError: true,
			};

		case ActivateSimActions.ON_CLOSE:
			return {
				...state,
				verificationResponse: null,
				verificationError: false,
			};

		default:
			return state;
	}
};

export default activateSimReducer;
