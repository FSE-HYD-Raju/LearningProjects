"use strict";

import { HttpHeaders, Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

export default class NotificationService extends BaseService {
	static async markNotificationRead(notificationId: string): Promise<string | undefined> {
		let resp;
		try {
			const data = {
				type: "notifications",
				notificationId,
				attributes: {
					isRead: true
				}
			};
			resp = await Rest.patch(`${REST.NOTIFICATION}/${notificationId}`, data);
			if (resp) {
				return notificationId;
			}
		} catch (e) {
			throw e;
		}
		return undefined;
	}
}
