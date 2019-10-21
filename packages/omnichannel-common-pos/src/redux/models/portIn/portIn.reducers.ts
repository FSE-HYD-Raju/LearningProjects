"use strict";

import { PortInActions, PortInActionPayload } from "./portIn.actions";
import {  PortInState } from "./portIn.types";

export { PortInState } from "./portIn.types";

export const initialState = (): Partial<PortInState> => ({
	portInOldNumber: true,
	portInFormModel: {
		previousContractType: "prepaid",
		transferCredit: true
	},
	portInCHModel: {},
	portInFormIsValid: false,
	portInDecisions: {},
	portInValidity: {}
});

const portInReducer = (state: Partial<PortInState> = initialState(), action: PortInActionPayload): any => {
	const { type, msisdn, portInDecisionResult, error } = action;
	switch (type) {
		case PortInActions.SET_PORT_IN_OLD_NUMBER:
			return {
				...state,
				portInOldNumber: action.portInOldNumber
			};
		case PortInActions.SET_PORT_IN_FORM_MODEL:
			return {
				...state,
				portInFormModel: action.portInFormModel
			};
		case PortInActions.SET_PORT_IN_CH_MODEL:
			return {
				...state,
				portInCHModel: action.portInCHModel
			};
		case PortInActions.SET_PORT_IN_FORM_IS_VALID:
			return {
				...state,
				portInFormIsValid: action.isValid
			};
		case PortInActions.GET_PORTIN_NIP:
			return {
				...state,
				portInDecisions: {
					...state.portInDecisions,
					[msisdn]: {
						queryActive: true
					}
				}
			};
		case PortInActions.GET_PORTIN_NIP_COMPLETE:
			return {
				...state,
				portInDecisions: {
					...state.portInDecisions,
					[msisdn]: {
						queryResult: portInDecisionResult,
						queryActive: false
					}
				}
			};
		case PortInActions.GET_PORTIN_NIP_FAILED:
			return {
				...state,
				portInDecisions: {
					...state.portInDecisions,
					[msisdn]: {
						queryActive: false,
						error
					}
				}
			};
		case PortInActions.CHECK_MSISDN_PORTIN_VALIDITY:
			return {
				...state,
				portInValidity: {
					...state.portInValidity,
					[msisdn]: {
						queryActive: true,
						error: undefined
					}
				}
			};
		case PortInActions.CHECK_MSISDN_PORTIN_VALIDITY_COMPLETE:
			return {
				...state,
				portInValidity: {
					...state.portInValidity,
					[msisdn]: {
						queryActive: false,
						queryResult: true,
						error: undefined
					}
				}
			};
		case PortInActions.CHECK_MSISDN_PORTIN_VALIDITY_FAILED:
			return {
				...state,
				portInValidity: {
					...state.portInValidity,
					[msisdn]: {
						queryActive: false,
						queryResult: false,
						error
					}
				},
				portInFormIsValid: false
			};
		case PortInActions.CLEAR_MSISDN_PORTIN_ELIGIBILITY_ERROR:
			return {
				...state,
				portInValidity: {
					...state.portInValidity,
					[msisdn]: {
						...((state.portInValidity && state.portInValidity[msisdn]) ? state.portInValidity[msisdn] : {}),
						error: undefined
					}
				}
			};
		default:
			return state;
	}
};

export default portInReducer;
