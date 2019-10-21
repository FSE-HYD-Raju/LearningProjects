"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { VersionInformationActions, versionInformation } from "./versionInformation.actions";
import InfoService from "../../services/InfoService";

function* onGetArtifacts() {
	try {
		const response = yield call(() => {
			return InfoService.getArtifacts();
		});

		yield put(versionInformation.getQArtifactInfoComplete(response));

	} catch (e) {
		yield put(versionInformation.getQArtifactInfoFail(e));
	}
}

export function* versionInformationSaga(): any {
	yield all([
		takeLatest(VersionInformationActions.GET_ARTIFACTS_INFO, onGetArtifacts)
	]);
}
