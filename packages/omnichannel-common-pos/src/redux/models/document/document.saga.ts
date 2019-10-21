"use strict";

import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { BasketItems } from "../../types";
import { AppState } from "../../reducers";
import DocumentService from "../../services/DocumentService";
import { document, DocumentActionPayload, DocumentActions } from "./document.actions";
import { loadingOverlay } from "../loadingOverlay/loadingOverlay.actions";

const getBasketItems = (state: AppState): BasketItems | undefined => {
	return state.basket.basketItems;
};
const getShowDigitalSignature = (state: AppState): boolean => {
	return state.feature.showDigitalSignature;
};

function* generateDocument(action: DocumentActionPayload ) {
    const { digitalSignatureTemplateId, activeBasketId, userIndividualId, customerCaseId, activeBasketReference } = action.createDocumentData;
    const data = {
        digitalSignatureTemplateId,
        activeBasketId,
        userIndividualId,
        customerCaseId,
        activeBasketReference
    };
    try {
        const response = yield call(DocumentService.generateDocument, data);
        yield put(document.generateDocumentComplete(response));
    }
    catch (error) {
        yield put(document.generateDocumentFailed(error));
    }
}

function* getStatusSigned(action: DocumentActionPayload) {
    const { uuid } = action;
    try {
        const response = yield call(DocumentService.getStatusSigned, uuid);
		const basketItems = yield select(getBasketItems);
		const showDigitalSignature = yield select(getShowDigitalSignature);
        yield put(document.generateDocumentSignedStatusComplete(response, basketItems, showDigitalSignature));
    }
    catch (error){
        yield put(document.generateDocumentFailed(error));
    }
}
function* uploadDocument(action: DocumentActionPayload) {
    const { uploadDocumentFile, customerCaseId } = action;
    try {
        yield put(loadingOverlay.showLoadingOverlay(DocumentActions.UPLOAD_DOCUMENT));
        const response = yield call(DocumentService.uploadDocument, uploadDocumentFile, customerCaseId);
        yield put(document.uploadDocumentComplete(response));
    }
    catch (error) {
        yield put(document.uploadDocumentFailed(error));
        console.log(error);
    } finally {
		yield put(loadingOverlay.hideLoadingOverlay(DocumentActions.UPLOAD_DOCUMENT));
	}
}

export function* documentSaga(): any {
    yield all([
        takeEvery(DocumentActions.GENERATE_DOCUMENT, generateDocument),
        takeEvery(DocumentActions.GENERATE_DOCUMENT_SIGNED_STATUS, getStatusSigned),
        takeEvery(DocumentActions.UPLOAD_DOCUMENT, uploadDocument),
	]);
}
