import { all, takeEvery, select } from "redux-saga/effects";
import { SessionActions } from "./session.actions";
import sessionSelector from "./session.selectors";
import { SessionKeys, SessionUtils } from "../../../utils/SessionUtils";

function* persistState(): any {
	const state = yield select();
	SessionUtils.setItem(SessionKeys.app, JSON.stringify(sessionSelector(state)));
}

export function* sessionSaga(): any {
	yield all([
		takeEvery(SessionActions.PERSIST_STATE_TO_STORAGE, persistState),
	]);
}
