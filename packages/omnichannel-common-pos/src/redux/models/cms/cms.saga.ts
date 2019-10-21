"use strict";

import { all, call, takeEvery, put, takeLatest, select } from "redux-saga/effects";
import { cms, CmsActions, CmsActionPayload } from "./cms.actions";
import CmsService from "../../services/CmsService";
import { error } from "../error/error.actions";
import { AppState } from "../../reducers";

const getSkipCmsRequest = (state: AppState): boolean => {
	return state.consul.skipCmsRequests;
};

function* getStyles(action: CmsActionPayload) {
	try {
		const response = yield call(() => {
			return CmsService.getStyles();
		});
		yield put(cms.getStylesComplete(response));

	} catch (e) {
		yield put(cms.getStylesFailed(e));
	}
}

function* getCurrentContent(action: CmsActionPayload) {
	const skipCmsRequest: boolean = yield select(getSkipCmsRequest);

	if (skipCmsRequest) {
		return;
	}
	const { publishTarget, fragment, previewData, metaData } = action;
	if (!publishTarget || !fragment) {
		window.console.log("CMS saga - getCurrentContent - publishTarget or fragment is not provided!");
		return;
	}
	try {
		const response = yield call(() => {
			return CmsService.getCurrentContent(publishTarget, fragment, previewData, metaData);
		});
		yield put(cms.getCurrentContentCompleted(publishTarget + "|" + fragment, response));

	} catch (e) {
		yield put(error.showErrorModal(e));
	}
}

function* getContentPageWithContent(action: CmsActionPayload) {
	const skipCmsRequest: boolean = yield select(getSkipCmsRequest);

	if (skipCmsRequest) {
		return;
	}

	const { publishTarget, url } = action;
	if (!publishTarget || !url) {
		window.console.log("CMS saga - getContentPageWithContent - publishTarget or url is not provided!");
		return;
	}
	try {
		const response = yield call(() => {
			return CmsService.getContentPageWithContent(publishTarget, url);
		});
		yield put(cms.getContentPageWithContentComplete(response));

	} catch (e) {
		yield put(error.showErrorModal(e));
	}
}

export function* cmsSaga(): any {
	yield all([
		takeLatest(CmsActions.GET_STYLES, getStyles),
		takeLatest(CmsActions.GET_CONTENT_PAGE_WITH_CONTENT, getContentPageWithContent),
		takeEvery(CmsActions.GET_CURRENT_CONTENT, getCurrentContent),
	]);
}
