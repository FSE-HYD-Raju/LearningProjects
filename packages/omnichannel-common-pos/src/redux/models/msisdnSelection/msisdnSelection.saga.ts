"use strict";

import { call, put, select, all, takeLatest } from "redux-saga/effects";
import { MsisdnSelectionActionPayload, msisdnSelection, MsisdnSelectionActions } from "./msisdnSelection.actions";
import MsisdnService from "../../services/MsisdnService";
import ProductOfferingService from "../../services/ProductOfferingService";
import { MsisdnReservation, ProductOffering, MsisdnReservationCreate } from "../../types";
import { MsisdnSelectionUseCase } from "./msisdnSelection.types";
import { AppState } from "../../reducers";
import { findStockIdsFromPOs,
		 findStockIdsFromSinglePO,
		 findReservationsByMsisdn,
		 StockData,
		 findMsisdnGroupFromProductOffering
	   } from "./msisdnSelection.utils";
const { v4 } = require("uuid");
import { get } from "lodash";

// TODO: Add support to use "existing" already added MSISDN as preselection, AKA pass it in payload
function* init(action: MsisdnSelectionActionPayload) {
	const { msisdnSelections } = action;
	const { poId } = msisdnSelections;
	try {
		if (poId) {
			// po (PO_new_subscription) -> pog (GRP_msisdn_selection) -> pos (use case PO'S)
			const po: ProductOffering = yield call(() => {
				return ProductOfferingService.getProductOffering(poId);
			});
			const msisdnPOG = findMsisdnGroupFromProductOffering(po);
			const msisdnPoArray = msisdnPOG && msisdnPOG.productOfferings || [];
			yield put(msisdnSelection.initComplete({ poId: poId, msisdnProductOfferings: msisdnPoArray }));
		}
	} catch (e) {
		yield put(msisdnSelection.error(e));
	}
}

function* reserveMsisdns(action: MsisdnSelectionActionPayload) {
	const { msisdnSelections: { msisdnReservationCreate, msisdnSelectionUseCase, reservedFor } } = action;

	try {
		if (
			msisdnSelectionUseCase &&
			msisdnReservationCreate &&
			msisdnReservationCreate.attributes
		) {
			const productOfferings: Array<ProductOffering> = yield select((state: AppState) => state.msisdnSelection.productOfferings);

			// release existing reservations
			const allExistingReservations: Record<MsisdnSelectionUseCase, Array<MsisdnReservation>> = yield select(
				(state: AppState) => state.msisdnSelection.msisdnsReservationsByUseCase
			);
			if (allExistingReservations) {
				const useCaseReservations: Array<MsisdnReservation> = get(allExistingReservations, msisdnSelectionUseCase);
				for (const existingReservation of useCaseReservations) {
					const reservedFor = get(existingReservation, "attributes.reservedFor", existingReservation.reservedFor);
					if (reservedFor) {
						yield call(() => {
							return MsisdnService.releaseMsisdns(reservedFor);
						});
					}
				}
			}
			if (productOfferings) {
				const stockData: Array<StockData> = findStockIdsFromPOs({ pos: productOfferings, useCase: msisdnSelectionUseCase });
				const msisdnReservations: MsisdnReservation[] = [];
				for (const stock of stockData) {
					const createReservation: MsisdnReservationCreate | any = {
						attributes: {
							...msisdnReservationCreate.attributes,
							reservedFor: reservedFor || v4(),
							stock: stock.stockId,
							price: stock.price
						}
					};
					try {
						const msisdnReservation: MsisdnReservation = yield call(() => {
							return MsisdnService.reserveMsisdns({ createReservation });
						});
						msisdnReservations.push({
							...msisdnReservation,
							attributes: {
								...msisdnReservation.attributes,
								stock: stock.stockId,
								price: stock.price,
								poId: stock.poId
							}
						});
					} catch (e) {
						if (e.status !== 404) {
							throw e;
						}
					}
				}
				yield put(msisdnSelection.reserveMsisdnsComplete({ msisdnSelectionUseCase, msisdnReservations }));
			}
		}
	} catch (e) {
		yield put(msisdnSelection.error(e));
	}
}

function* releaseMsisdns(action: MsisdnSelectionActionPayload) {
	try {
		const { msisdnSelections } = action;
		const { reservedFor, msisdnSelectionUseCase } = msisdnSelections;
		if (reservedFor && msisdnSelectionUseCase) {
			yield call(() => {
				return MsisdnService.releaseMsisdns(reservedFor);
			});
			yield put(msisdnSelection.releaseMsisdnsComplete({ reservedFor, msisdnSelectionUseCase }));
		}
	} catch (e) {
		yield put(msisdnSelection.error(e));
	}
}

function* selectMsisdn(action: MsisdnSelectionActionPayload) {
	try {
		const { msisdnSelections } = action;
		const { selectedMsisdn, msisdnSelectionUseCase, poId } = msisdnSelections;
		if (selectedMsisdn && selectedMsisdn.msisdn && msisdnSelectionUseCase && poId) {
			const allReservations: Record<MsisdnSelectionUseCase, Array<MsisdnReservation>> = yield select(
				(state: AppState) => state.msisdnSelection.msisdnsReservationsByUseCase
			);
			const useCaseReservations: Array<MsisdnReservation> = allReservations[msisdnSelectionUseCase];
			const filteredReservations: Array<MsisdnReservation> = findReservationsByMsisdn({
				reservations: useCaseReservations,
				msisdn: selectedMsisdn.msisdn,
				isIncluded: false
			});
			for (const existingReservation of filteredReservations) {
				const reservedFor = get(existingReservation, "attributes.reservedFor", existingReservation.reservedFor);
				if (reservedFor) {
					yield call(() => {
						return MsisdnService.releaseMsisdns(reservedFor);
					});
				}
			}
			const reservationWithSelectedMsisdn: Array<MsisdnReservation> = findReservationsByMsisdn({
				reservations: useCaseReservations,
				msisdn: selectedMsisdn.msisdn,
				isIncluded: true
			});
			yield put(
				msisdnSelection.selectMsisdnComplete({
					selectedMsisdn,
					poId,
					msisdnSelectionUseCase,
					msisdnReservations: reservationWithSelectedMsisdn
				})
			);
		}
	} catch (e) {
		yield put(msisdnSelection.error(e));
	}
}

function* reserveMsisdnsByStock(action: MsisdnSelectionActionPayload) {
	const { msisdnSelections: { msisdnReservationCreate, msisdnSelectionUseCase, reservedFor, msisdnPoCategoryId } } = action;

	try {
		if (
			msisdnSelectionUseCase &&
			msisdnReservationCreate &&
			msisdnReservationCreate.attributes &&
			msisdnPoCategoryId
		) {
			const productOfferings: Array<ProductOffering> = yield select((state: AppState) => state.msisdnSelection.productOfferings);

			// release existing reservations
			const allExistingReservations: Record<MsisdnSelectionUseCase, Array<MsisdnReservation>> = yield select(
				(state: AppState) => state.msisdnSelection.msisdnsReservationsByUseCase
			);
			if (allExistingReservations) {
				const useCaseReservations: Array<MsisdnReservation> = get(allExistingReservations, msisdnSelectionUseCase);
				for (const existingReservation of useCaseReservations) {
					const reservedFor = get(existingReservation, "attributes.reservedFor", existingReservation.reservedFor);
					if (reservedFor) {
						yield call(() => {
							return MsisdnService.releaseMsisdns(reservedFor);
						});
					}
				}
			}
			const po = productOfferings && productOfferings.find(po => po.id === msisdnPoCategoryId);
			const stockData: StockData | undefined = po && findStockIdsFromSinglePO({ po, useCase: msisdnSelectionUseCase });
			if (stockData) {
				const msisdnReservations: MsisdnReservation[] = [];
				const createReservation: MsisdnReservationCreate | any = {
					attributes: {
						...msisdnReservationCreate.attributes,
						reservedFor: reservedFor || v4(),
						stock: stockData.stockId,
						price: stockData.price
					}
				};
				try {
					const msisdnReservation: MsisdnReservation = yield call(() => {
						return MsisdnService.reserveMsisdns({ createReservation });
					});
					msisdnReservations.push({
						...msisdnReservation,
						attributes: {
							...msisdnReservation.attributes,
							stock: stockData.stockId,
							price: stockData.price,
							poId: stockData.poId
						}
					});
				} catch (e) {
					if (e.status !== 404) {
						throw e;
					}
				}
				yield put(msisdnSelection.reserveMsisdnsComplete({ msisdnSelectionUseCase, msisdnReservations }));
			}
		}
	} catch (e) {
		yield put(msisdnSelection.error(e));
	}
}

export function* msisdnSelectionSaga(): any {
	yield all([
		takeLatest(MsisdnSelectionActions.INIT, init),
		takeLatest(MsisdnSelectionActions.RESERVE_MSISDNS, reserveMsisdns),
		takeLatest(MsisdnSelectionActions.RESERVE_MSISDNS_BY_STOCK, reserveMsisdnsByStock),
		takeLatest(MsisdnSelectionActions.RELEASE_MSISDNS, releaseMsisdns),
		takeLatest(MsisdnSelectionActions.SELECT_MSISDN, selectMsisdn)
	]);
}
