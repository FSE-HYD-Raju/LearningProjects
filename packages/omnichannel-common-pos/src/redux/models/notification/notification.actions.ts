"use strict";

import { Action } from "redux";

export enum NotificationActions {
    FLUX_SYNC = "Notification_FLUX_SYNC",
	ACCEPT_CONNECTION_REQUEST = "Notification_ACCEPT_CONNECTION_REQUEST",
	REJECT_CONNECTION_REQUEST = "Notification_REJECT_CONNECTION_REQUEST",
	HIDE_NOTIFICATION = "Notification_HIDE_NOTIFICATION",
	HIDE_NOTIFICATION_COMPLETE = "Notification_HIDE_NOTIFICATION_COMPLETE",
	HIDE_ALL = "Notification_HIDE_ALL",
}

export interface NotificationActionPayload extends Action<NotificationActions> {
    fluxState?: any;
    error?: string;
	requestId?: string;
	notificationId?: string;
	notificationIds?: Array<string>;
}

export const notification = {
    fluxSync: (fluxState: any) => ({type: NotificationActions.FLUX_SYNC, fluxState}),
	rejectConnectionRequest: (requestId: string, notificationId: string) =>
		({type: NotificationActions.REJECT_CONNECTION_REQUEST, requestId, notificationId}),
	hideNotification: (notificationId: string) => ({type: NotificationActions.HIDE_NOTIFICATION, notificationId}),
	hideNotificationComplete: (notificationId: string) => ({type: NotificationActions.HIDE_NOTIFICATION_COMPLETE, notificationId}),
	hideAll: (notificationIds: Array<string>) => ({type: NotificationActions.HIDE_ALL, notificationIds}),
};
