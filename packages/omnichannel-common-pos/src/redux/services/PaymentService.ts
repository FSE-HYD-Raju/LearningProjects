"use strict";

import { AxiosResponse } from "axios";

import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { ContextualPaymentMethod, CustomerPaymentMethod, ContextualPaymentValidation } from "../types";

export default class PaymentService extends BaseService {
	static async getContextualPaymentMethods(
		paymentUseCase: string,
		basketId?: string
	): Promise<AxiosResponse<ContextualPaymentMethod[]>> {
		let resp;
		try {
			const basketFilter = basketId ? `&filter[contextualPaymentMethods][basketId]=${basketId}` : "";
			const data = `?filter[contextualPaymentMethods][paymentUseCase]=${paymentUseCase}${basketFilter}`;
			resp = await Rest.get(REST.PAYMENT.GET_CONTEXTUAL_PAYMENT_METHODS, data);
			PaymentService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async getPaymentMethodById(paymentId: string): Promise<ContextualPaymentMethod> {
		let resp;
		try {
			resp = await Rest.get(`${REST.PAYMENT.CUSTOMER_PAYMENT_METHODS}/${paymentId}`);
			PaymentService.validateResp(resp);
		}
		catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async selectContextualPaymentMethod(data: Object): Promise<AxiosResponse<Object>> {
		let resp;
		try {
			resp = await Rest.post(REST.PAYMENT.SELECT_CONTEXTUAL_PAYMENT_METHODS, data);
			PaymentService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async validatePaymentResultAfterReturningFromTheSIA(data: Object): Promise<ContextualPaymentValidation> {
		let resp;
		try {
			resp = await Rest.post(REST.PAYMENT.VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA, data);
			PaymentService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data.attributes;
	}

	static async validatePaymentWithoutBasket(data: Object): Promise<AxiosResponse<Object>> {
		let resp;
		try {
			resp = await Rest.post(REST.PAYMENT.VALIDATE_PAYMENT_RESULT_AFTER_RETURNING_FROM_THE_SIA, data);
			this.validateResp(resp);
		} catch (e) {

		}
		return resp;
	}

	static async getCustomerPaymentMethods(customerAccountId: string): Promise<CustomerPaymentMethod[]> {
		let resp;
		try {
			resp = await Rest.get(
				`${REST.PAYMENT.CUSTOMER_PAYMENT_METHODS}?filter[customerAccountId]=${String(customerAccountId)}`
			);
			PaymentService.validateResp(resp);
			return resp.data.map((o: any) => {
				return {
					...o,
					...o.attributes
				};
			});
		} catch (e) {
			throw e;
		}
	}
}
