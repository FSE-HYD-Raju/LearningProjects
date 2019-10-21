"use strict";

import { HttpHeaders, Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { OrderCancel, Reason } from "../types";

export default class OrdersService extends BaseService {
	static async cancelOrder(orderId: string, reasonId: string): Promise<OrderCancel> {
		let resp;
		try {
			const data = {
				type: "orders-cancel",
				attributes: {
					reason: reasonId,
					order: {
						id: orderId
					}
				}
			};
			resp = await Rest.post(`${REST.ORDERS_CANCEL}`, data);
			OrdersService.validateResp(resp);

			return resp.data.data;
		} catch (e) {
			throw e;
		}
	}
}
