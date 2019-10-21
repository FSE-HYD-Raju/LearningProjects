"use strict";

import { all, call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { msisdn, MsisdnActionPayload, MsisdnActions } from "./msisdn.actions";
import MsisdnService from "../../services/MsisdnService";
import PersonService from "../../services/PersonService";
import { Basket, MsisdnReservation } from "../../types";
import { digitalLife } from "../digitalLife/digitalLife.actions";
import { AppState } from "../../reducers";
import { feature } from "./msisdn.selectors";
import actions from "../../../redux/actions";

function* performChangeMsisdn(action: MsisdnActionPayload) {
	const  { changeMsisdnPo, selectionPo, personId, newMsisdn, productId, selectedPaymentMethod, agreementId } = action;
	if (changeMsisdnPo && selectionPo && personId && newMsisdn && productId && selectedPaymentMethod && agreementId) {
		try {
			const response: Basket = yield call(() => {
				return MsisdnService.performChangeMsisdn({
					personId, newMsisdn, productId, changeMsisdnPo,
					selectionPo, selectedPaymentMethod, agreementId
				});
			});
			yield put(msisdn.performChangeMsisdnComplete(productId, response));
			const agreements = yield call(() => {
				return PersonService.getAgreements(personId);
			});
			yield put(digitalLife.getAgreementsComplete(agreements));
		} catch (e) {
			yield put(msisdn.performChangeMsisdnFailed(productId, e.message));
		}
	}
}

function* validatePortInMSISDNForBasket(action: MsisdnActionPayload) {
	const validLifecycleStatuses = yield select((state: AppState): any => state.feature.validPortInLifecycleStatus);

	try {
		const validatePortInMsisdn = yield call(() => {
			return MsisdnService.searchMsisdn(action.MSISDN as string);
		});

		const isMSISDNPortable = !!validLifecycleStatuses.includes(validatePortInMsisdn.attributes.lifecycleStatus);

		yield put(msisdn.validatePortInMSISDNForBasketComplete(validatePortInMsisdn, isMSISDNPortable));
	} catch (e) {
		yield put(msisdn.validatePortInMSISDNForBasketFail(e));
	}
}

function* getResourceInventories() {
	try {
		const response = yield call(() => {
			return MsisdnService.getResourcesInventories();
		});

		yield put(msisdn.getResourceInventoriesCompleted(response.data, response.included));
	} catch (e) {
		yield put(msisdn.getResourceInventoriesFailed(e));
	}
}

function* reserveMsisdn(action: MsisdnActionPayload) {
	const { pattern, releaseId, reservedFor, stock, limit, numberType, product } = action;
	let consulEndTime: Date;
	const featureDetails = yield select(feature);

	if (featureDetails && featureDetails.msisdnReservationMinutes) {
		consulEndTime = new Date();
		consulEndTime.setMinutes(consulEndTime.getMinutes() +
		featureDetails.msisdnReservationMinutes);
	}
	try {
		const response: MsisdnReservation = yield call(() => {
			return MsisdnService.reserveMsisdn(
				pattern, reservedFor, stock , limit, numberType, consulEndTime
			);
		});
		yield put(msisdn.reserveMsisdnComplete(response, reservedFor, stock, pattern));

		if (product) {
			const path = [{po : product.id}];
			yield put(actions.productOfferingConfiguration.setInputtedCharacteristic(path, "CH_ReservedFor", reservedFor as string));
		}
		if (releaseId) {
			yield put(msisdn.releaseMsisdn(releaseId, reservedFor as string));
		}
	} catch (e) {
		yield put(msisdn.error(e));
	}
}

function* releaseMsisdn(action: MsisdnActionPayload) {
	const { releaseId, reservedFor } = action;
	try {
		if (releaseId !== reservedFor) {
			yield call(() => {
				return MsisdnService.releaseMsisdn(releaseId);
			});
		}
		yield put(msisdn.releaseMsisdnComplete(releaseId as string));
	} catch (e) {
		yield put(msisdn.error(e));
	}
}

export function* msisdnSaga(): any {
	yield all([
		takeLatest(MsisdnActions.RESOURCE_INVENTORIES, getResourceInventories),
		takeLatest(MsisdnActions.PERFORM_CHANGE_MSISDN, performChangeMsisdn),
		takeLatest(MsisdnActions.VALIDATE_PORT_IN_MSISDN, validatePortInMSISDNForBasket),
		takeLatest(MsisdnActions.RESERVE_MSISDN, reserveMsisdn),
		takeLatest(MsisdnActions.RELEASE_MSISDN, releaseMsisdn),
	]);
}
