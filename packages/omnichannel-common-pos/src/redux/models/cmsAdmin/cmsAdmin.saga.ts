"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import CmsService from "../../services/CmsService";
import { CmsAdminActionPayload, CmsAdminActions } from "./cmsAdmin.actions";
import { toaster } from "../toaster/toaster.actions";
import { cms } from "../cms/cms.actions";

function* saveStyles(action: CmsAdminActionPayload) {
	const { styles } = action;
	try {
		const response = yield call(() => {
			return CmsService.saveStyles(styles);
		});
		yield put(toaster.showSuccess(action.successMessage));
		yield put(cms.updateOnCmsAdminActionSaveStyles(response));
	} catch (e) {
		yield put(toaster.showError(action.errorMessage));
	}
}

export function* cmsAdminSaga(): any {
	yield all([
		takeLatest(CmsAdminActions.SAVE_STYLES, saveStyles),
	]);
}
