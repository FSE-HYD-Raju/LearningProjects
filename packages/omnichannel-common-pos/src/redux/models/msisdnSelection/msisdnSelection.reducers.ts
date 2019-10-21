"use strict";

import { MsisdnSelectionState } from "./msisdnSelection.types";
export { MsisdnSelectionState } from "./msisdnSelection.types";
import { MsisdnSelectionActions, MsisdnSelectionActionPayload } from "./msisdnSelection.actions";
export const initialState = (): Partial<MsisdnSelectionState> => ({
	productOfferings: []
});

const msisdnSelectionReducer = (
	state: Partial<MsisdnSelectionState> = initialState(),
	action: MsisdnSelectionActionPayload
) => {
	const { type, msisdnSelections } = action;
	switch (type) {
		case MsisdnSelectionActions.INIT: // TODO: This should probably clear whole state, not just set queryActive = true
			return {
				...state,
				queryActive: true
			};
		case MsisdnSelectionActions.INIT_COMPLETE:
			return {
				...state,
				productOfferings: msisdnSelections.msisdnProductOfferings,
				queryActive: false
			};
		case MsisdnSelectionActions.RESERVE_MSISDNS:
			return {
				...state,
				queryActive: true
			};
		case MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE:
			return {
				...state,
				queryActive: false,
				msisdnsReservationsByUseCase: {
					...state.msisdnsReservationsByUseCase,
					[msisdnSelections.msisdnSelectionUseCase]: msisdnSelections.msisdnReservations
				}
			};
		case MsisdnSelectionActions.RELEASE_MSISDNS:
			return {
				...state,
				queryActive: true
			};
		case MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE:
			return {
				...state,
				queryActive: false,
				msisdnsReservationsByUseCase: {
					...state.msisdnsReservationsByUseCase,
					[msisdnSelections.msisdnSelectionUseCase]: []
				}
			};
		case MsisdnSelectionActions.RELEASE_MSISDNS:
			return {
				...state,
				queryActive: true
			};
		case MsisdnSelectionActions.SELECT_MSISDN_COMPLETE:
			return {
				...state,
				queryActive: false,
				selectedMsisdn: msisdnSelections.selectedMsisdn,
				selectedMsisdnPoId: msisdnSelections.poId,
				msisdnsReservationsByUseCase: {
					...state.msisdnsReservationsByUseCase,
					[msisdnSelections.msisdnSelectionUseCase]: msisdnSelections.msisdnReservations
				}
			};
		case MsisdnSelectionActions.UPDATE_MSISDN:
			return {
				...state,
				selectedMsisdn: msisdnSelections.selectedMsisdn
			};
		case MsisdnSelectionActions.ERROR:
			return {
				...state,
				queryActive: false,
				error: msisdnSelections.error
			};
		case MsisdnSelectionActions.FLUX_SYNC:
			return {
				...state,
				...msisdnSelections.fluxState
			};
		default:
			return state;
	}
};

export default msisdnSelectionReducer;
