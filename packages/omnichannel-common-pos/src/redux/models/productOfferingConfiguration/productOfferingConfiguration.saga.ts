"use strict";

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { get } from "lodash";
import {
	productOfferingConfiguration,
	ProductOfferingConfigurationActionPayload,
	ProductOfferingConfigurationActions
} from "./productOfferingConfiguration.actions";
import {
	Msisdn,
	MsisdnSofReservationResult,
	NominationSearchResult,
	ProductOffering,
	ProductPath,
	SimCard
} from "../../types";
import MsisdnService from "../../services/MsisdnService";
import SimCardsService from "../../services/SimCardsService";
import { exctractValuesFromNominationSearch } from "./productOfferingConfiguration.utils";
import ProductOfferingService from "../../services/ProductOfferingService";
import ContextualProductService from "../../services/ContextualProductService";

function* onMakeMsisdnSoftReservation(action: ProductOfferingConfigurationActionPayload) {
	try {
		const result: MsisdnSofReservationResult = yield call(() => {
				return MsisdnService.makeMsisdnSoftReservation(action.path!, action.key!, action.value!, action.id!);
			}
		);
		yield put(productOfferingConfiguration.makeMsisdnSoftReservationComplete(result));
	} catch (e) {
		yield put(productOfferingConfiguration.makeMsisdnSoftReservationComplete());
	}
}

function* onUpdateMsisdnSoftReservation(action: ProductOfferingConfigurationActionPayload) {
	try {
		const result: MsisdnSofReservationResult = yield call(() => {
				return MsisdnService.updateMsisdnSoftReservation(action.path!, action.key!, action.value!, action.id!);
			}
		);
		yield put(productOfferingConfiguration.updateMsisdnSoftReservationComplete(result));
	} catch (e) {
		yield put(productOfferingConfiguration.updateMsisdnSoftReservationComplete());
	}
}

function* onNominationSearch(action: ProductOfferingConfigurationActionPayload) {
	const { searchTerm, path, nominationCharacteristics } = action;
	try {
		yield put(productOfferingConfiguration.nominationSearchStart(searchTerm!, path!, nominationCharacteristics!));
		try {
			const searchInfo: [ Msisdn | null, SimCard | null ] = yield call(() => {
				return Promise.all(
					[MsisdnService.searchMsisdn(searchTerm || ""),
						SimCardsService.searchSimCards(searchTerm || "")]
				);
			});
			if (searchInfo[0] === null && searchInfo[1] === null) {
				yield put(productOfferingConfiguration.nominationSearchComplete(path!, nominationCharacteristics!));
				return false;
			}
			const searchResult = exctractValuesFromNominationSearch(searchInfo);
			if (searchResult) {
				const channelCode = get(searchResult, "productOfferingId");
				let productOffering: ProductOffering | undefined;
				let productOfferingResult: Array<ProductOffering> | null = null;
				if (channelCode) {
					 productOfferingResult = yield call(() => {
							return ContextualProductService.getProductOfferingsByChannelCode(channelCode);
						}
					);
					productOffering = productOfferingResult && productOfferingResult.length > 0 ? productOfferingResult[0] : undefined;
				}
				if (!channelCode || productOfferingResult) {
					yield put(productOfferingConfiguration.nominationSearchComplete(action.path!, action.nominationCharacteristics!, searchResult, productOffering));
				}
			}
		} catch (e) {
			yield put(productOfferingConfiguration.nominationSearchComplete(action.path!, action.nominationCharacteristics!));
		}
	} catch (e) {
		yield put(productOfferingConfiguration.nominationSearchComplete(action.path!, action.nominationCharacteristics!));
	}
}

export function* productOfferingConfigurationSaga(): Iterable<any> {
	yield all([
		takeLatest(ProductOfferingConfigurationActions.MAKE_MSISDN_SOFT_RESERVATION, onMakeMsisdnSoftReservation),
		takeLatest(ProductOfferingConfigurationActions.UPDATE_MSISDN_SOFT_RESERVATION, onUpdateMsisdnSoftReservation),
		takeLatest(ProductOfferingConfigurationActions.NOMINATION_SEARCH, onNominationSearch),
	]);
}
