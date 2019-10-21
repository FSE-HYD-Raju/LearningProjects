"use strict";

import { REST } from "../settings/core";
import { Rest } from "./Rest";
import BaseService from "./BaseService";

export default class CheckoutService extends BaseService {
	static async sendCheckoutCompleteNotification(basketId: string) {
		let resp;
		const notificationData = {
			data: {
				type: "notification-message",
				attributes: {
					notificationType: "complete-checkout",
						notificationParameters: {
						basketId: basketId
					}
				}
			}
		};
		try {
			resp =  await Rest.post(REST.CHECKOUT.SEND_CHECKOUT_COMPLETE_NOTIFICATION, notificationData);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}

		return resp;
	}
}
