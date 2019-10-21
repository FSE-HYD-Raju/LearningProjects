"use strict";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { notification, NotificationActionPayload, NotificationActions } from "./notification.actions";
import NotificationService from "../../services/NotificationService";

function* hideNotification(action: NotificationActionPayload) {
	try {
		const readNotificationId = yield call(() => {
			return NotificationService.markNotificationRead(action.notificationId!);
		});
		yield put(notification.hideNotificationComplete(readNotificationId));
	} catch (error) {}
}

function* hideAll(action: NotificationActionPayload) {
	for (let i = 0; i < action.notificationIds!.length; i++) {
		yield put(notification.hideNotification(action.notificationIds![i]));
	}

}

export function* notificationSaga(): any {
	yield all([
		takeLatest(NotificationActions.HIDE_NOTIFICATION, hideNotification),
		takeLatest(NotificationActions.HIDE_ALL, hideAll),
	]);
}
