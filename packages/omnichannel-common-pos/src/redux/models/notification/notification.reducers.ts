"use strict";

import { NotificationActionPayload, NotificationActions } from "./notification.actions";
import { Notification } from "../../types";

export type NotificationState = {
	notifications: Array<Notification>
};

const initialState = {
	notifications: []
};

const notificationReducer = (state: NotificationState = initialState, action: NotificationActionPayload) => {
	const { type } = action;
	switch (type) {
		case NotificationActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case NotificationActions.HIDE_NOTIFICATION_COMPLETE: {
			const notifications = state.notifications.filter((notification: Notification) => notification.id !== action.notificationId);
			return {notifications};
		}
		default:
			return state;
	}
};

export default notificationReducer;
