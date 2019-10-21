"use strict";

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import { PeriodicTokenRefreshConfig } from "./auth.types";
import { auth, AuthActions } from "./auth.actions";
import { AppState } from "../../reducers";
import AuthService from "../../services/AuthService";
import { isLoggedIn } from "../user/user.selectors";
import { SessionUtils, SessionKeys } from "../../../utils/SessionUtils";
const DEFAULT_TIMEOUT_MILLISECONDS = 30000;

const getTokenRefreshConfig = (state: AppState): PeriodicTokenRefreshConfig => {
	return state.auth.periodicTokenRefresh;
};

/**
 * Refresh should only be invoked if
 * - refresh loop is configured as enabled
 * - user is logged in
 * - there is an existing JWT
 * - token would expire before the next timeout period ends (expiration time - current time < refresh timeout)
 */
const shouldInvokeRefresh = (state: AppState): boolean => {
	const tokenRefreshConfig = getTokenRefreshConfig(state);
	if (!tokenRefreshConfig.enabled) {
		return false;
	}

	const isLogged = isLoggedIn()(state);
	const jwt = state.auth.jwt;
	const activeJwt = SessionUtils.getItem(SessionKeys.auth);

	if (!isLogged || !activeJwt || !(jwt && jwt.exp)) {
		return false;
	}

	const refreshTimeoutInSeconds = (tokenRefreshConfig.timeout || DEFAULT_TIMEOUT_MILLISECONDS) / 1000;
	const expirationInSeconds = jwt.exp - Date.now() / 1000;
	return expirationInSeconds <= refreshTimeoutInSeconds;
};

// Triggers refresh process if configured to do so
function* onSetValues() {
	const config: PeriodicTokenRefreshConfig = yield select(getTokenRefreshConfig);
	if (!config.enabled) {
		return;
	}
	yield put(auth.refresh());
}

// Infinitely looping refresh process, which only executes API calls if required conditions are met
function* onRefresh() {
	const config: PeriodicTokenRefreshConfig = yield select(getTokenRefreshConfig);
	yield delay(config.timeout || DEFAULT_TIMEOUT_MILLISECONDS);
	const shouldRefresh = yield select(shouldInvokeRefresh);
	if (shouldRefresh) {
		yield call(() => {
			return AuthService.refresh();
		});
	}
	yield put(auth.refresh());
}

export { shouldInvokeRefresh };

export function* authSaga(): any {
	yield all([
		takeLatest(AuthActions.SET_VALUES, onSetValues),
		takeLatest(AuthActions.REFRESH, onRefresh),
	]);
}
