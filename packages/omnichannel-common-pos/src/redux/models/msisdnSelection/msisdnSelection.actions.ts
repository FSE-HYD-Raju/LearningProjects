"use strict";

import { Action } from "redux";
import { MsisdnReservation, MsisdnReservationCreate, ProductOffering } from "../../types";
import { MsisdnSelectionUseCase, MsisdnWithCost } from "./msisdnSelection.types";

export enum MsisdnSelectionActions {
	INIT = "MsisdnSelection_INIT",
	INIT_COMPLETE = "MsisdnSelection_COMPLETE",
	RESERVE_MSISDNS = "MsisdnSelection_RESERVE_MSISDNS",
	RESERVE_MSISDNS_BY_STOCK = "MsisdnSelection_RESERVE_MSISDNS_BY_STOCK",
	RESERVE_MSISDNS_COMPLETE = "MsisdnSelection_RESERVE_MSISDNS_COMPLETE",
	RELEASE_MSISDNS = "MsisdnSelection_RELEASE_MSISDNS",
	RELEASE_MSISDNS_COMPLETE = "MsisdnSelection_RELEASE_MSISDNS_COMPLETE",
	SELECT_MSISDN = "MsisdnSelection_SELECT_MSISDN",
	SELECT_MSISDN_COMPLETE = "MsisdnSelection_SELECT_MSISDN_COMPLETE",
	UPDATE_MSISDN = "MsisdnSelection_UPDATE_MSISDN",
	ERROR = "MsisdnSelection_ERROR",
	FLUX_SYNC = "MsisdnSelection_FLUX_SYNC"
}

export interface MsisdnSelectionActionPayload extends Action<MsisdnSelectionActions> {
	msisdnSelections: {
		msisdnReservationCreate?: MsisdnReservationCreate;
		msisdnSelectionUseCase: MsisdnSelectionUseCase;
		msisdnReservations?: Array<MsisdnReservation>;
		msisdnProductOfferings?: Array<ProductOffering>;
		poId?: string;
		po?: ProductOffering;
		reservedFor?: string;
		selectedMsisdn?: MsisdnWithCost;
		error?: string;
		fluxState?: any;
		msisdnPoCategoryId?: string;
	};
}

export interface ReserveMsisdns {
	msisdnSelectionUseCase: MsisdnSelectionUseCase;
	msisdnReservationCreate: MsisdnReservationCreate;
	reservedFor?: string;
	msisdnPoCategoryId?: string;
}

export const msisdnSelection = {
	fluxSync: (fluxState: any) => ({ type: MsisdnSelectionActions.FLUX_SYNC, fluxState }),
	init: ({ poId }: { poId: string }) => ({
		type: MsisdnSelectionActions.INIT,
		msisdnSelections: {
			poId
		}
	}),
	initComplete: ({ poId, msisdnProductOfferings }: { poId: string, msisdnProductOfferings: Array<ProductOffering> }) => ({
		type: MsisdnSelectionActions.INIT_COMPLETE,
		msisdnSelections: {
			poId, msisdnProductOfferings
		}
	}),
	reserveMsisdns: ({
		msisdnSelectionUseCase,
		msisdnReservationCreate,
		reservedFor,
	}: ReserveMsisdns) => ({
			type: MsisdnSelectionActions.RESERVE_MSISDNS,
			msisdnSelections: {
				msisdnSelectionUseCase,
				msisdnReservationCreate,
				reservedFor
			}
		}),
	reserveMsisdnsByStock: ({
		msisdnSelectionUseCase,
		msisdnReservationCreate,
		reservedFor,
		msisdnPoCategoryId
	}: ReserveMsisdns) => ({
			type: MsisdnSelectionActions.RESERVE_MSISDNS_BY_STOCK,
			msisdnSelections: {
				msisdnSelectionUseCase,
				msisdnReservationCreate,
				reservedFor,
				msisdnPoCategoryId
			}
		}),
	reserveMsisdnsComplete: ({
		msisdnSelectionUseCase,
		msisdnReservations
	}: {
			msisdnSelectionUseCase: MsisdnSelectionUseCase;
			msisdnReservations: Array<MsisdnReservation>;
		}) => ({
			type: MsisdnSelectionActions.RESERVE_MSISDNS_COMPLETE,
			msisdnSelections: {
				msisdnSelectionUseCase,
				msisdnReservations
			}
		}),
	releaseMsisdns: ({
		msisdnSelectionUseCase,
		reservedFor
	}: {
			msisdnSelectionUseCase: MsisdnSelectionUseCase;
			reservedFor: string;
		}) => ({
			type: MsisdnSelectionActions.RELEASE_MSISDNS,
			msisdnSelections: {
				msisdnSelectionUseCase,
				reservedFor
			}
		}),
	releaseMsisdnsComplete: ({
		msisdnSelectionUseCase,
		reservedFor,
		msisdnPoCategoryId
	}: {
			msisdnSelectionUseCase: MsisdnSelectionUseCase;
			reservedFor: string;
		msisdnPoCategoryId?: string;
		}) => ({
			type: MsisdnSelectionActions.RELEASE_MSISDNS_COMPLETE,
			msisdnSelections: {
				msisdnSelectionUseCase,
				reservedFor,
				msisdnPoCategoryId
			}
		}),
	selectMsisdn: ({
		msisdnSelectionUseCase,
		selectedMsisdn,
		poId
	}: {
			msisdnSelectionUseCase: MsisdnSelectionUseCase;
			selectedMsisdn: MsisdnWithCost;
			poId: string;
		}) => ({
			type: MsisdnSelectionActions.SELECT_MSISDN,
			msisdnSelections: {
				selectedMsisdn,
				poId,
				msisdnSelectionUseCase
			}
		}),
	selectMsisdnComplete: ({
		selectedMsisdn,
		poId,
		msisdnSelectionUseCase,
		msisdnReservations
	}: {
			selectedMsisdn: MsisdnWithCost;
			poId: string;
			msisdnSelectionUseCase: MsisdnSelectionUseCase;
			msisdnReservations: Array<MsisdnReservation>;
		}) => ({
			type: MsisdnSelectionActions.SELECT_MSISDN_COMPLETE,
			msisdnSelections: {
				selectedMsisdn,
				poId,
				msisdnSelectionUseCase,
				msisdnReservations
			}
		}),
	updateMsisdn: ({
		selectedMsisdn
	}: {
			selectedMsisdn: MsisdnWithCost
		}) => ({
			type: MsisdnSelectionActions.UPDATE_MSISDN,
			msisdnSelections: {
				selectedMsisdn
			}
		}),
	error: ({ error }: { error: any }) => ({
		type: MsisdnSelectionActions.ERROR,
		msisdnSelections: {
			error
		}
	})
};
