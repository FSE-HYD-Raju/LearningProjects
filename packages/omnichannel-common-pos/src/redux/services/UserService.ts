"use strict";

import { AxiosResponse } from "axios";
import BaseService from "./BaseService";
import { REST } from "../settings/core";
import { Rest } from "./Rest";

import { ChargingBalances, Identification } from "../types";
import isClient from "../../utils/isClient";
import { UserUtils } from "../models/user/user.utils"

const HEADERS = { "Content-Type": "application/json" };

export default class UserService extends BaseService {

	static async getChargingBalances(billingAccountId: string): Promise<AxiosResponse<Array<ChargingBalances>>> {
		let resp;
		try {
			const data = `?filter[billingAccountId]=${billingAccountId}`;
			resp = await Rest.get(REST.USER.CHARGING_BALANCES, data);
			this.validateResp(resp, "Fetching charging balances returned an error");
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async logout(): Promise<AxiosResponse<string>> {
		let resp;
		try {
			resp = await Rest.get(REST.USER.LOGOUT);
			this.validateResp(resp, "Logout returned an error");
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async checkIdentificationExistence(identificationType: string, identificationId: string): Promise<boolean> {
		try {
			const resp = await Rest.get(`${REST.IDENTIFICATION_CHECK}/${identificationType}/${identificationId}`, undefined, HEADERS);
			this.validateResp(resp, "Identification check returned an error");
			return resp;
		} catch (e) {
			throw e;
		}
	}

	static async generateOneTimePassword(personId: string): Promise<{ "password-token": string}> {
		const requestBody = {
			data: {
				type: "one-time-password-message",
				attributes: {
					personId: personId
				}
			}
		};

		try {
			return await Rest.post(
				`${REST.USER.GENERATE_OTP}`,
				requestBody,
				{ "Content-Type": "application/vnd.api+json" }
			);
		} catch (e) {
			throw e;
		}
	}

	static async validateOneTimePassword(password: string, passwordToken: string): Promise<boolean> {
		try {
			return await Rest.post(
				`${REST.USER.VALIDATE_OTP}`,
				{ onetimePassword: password, encryptedOTP: passwordToken },
				HEADERS
			);
		} catch (e) {
			throw e;
		}
	}

	static async authorize(loginHint?: string, anonymousUser?: boolean, isSilentAuth?: boolean): Promise<string> {
		const protocol = window.location.protocol || "http:";
		const path = `${protocol}//${window.location.host}${window.location.pathname}`;
		const postLoginRedirect = (isClient && process.env.NODE_ENV !== "production") ? path : "";

		try {
			const resp = await Rest.getWithHeaders(`${REST.USER.AUTHORIZE}`, {
				anonymous: (anonymousUser && "true") || "false",
				post_login_redirect: postLoginRedirect,
				login_hint: loginHint || "",
				ui_locales: UserUtils.getUiLocalesParam(),
				...(isSilentAuth && {prompt: "none"} || {}),
			}, HEADERS);
			UserService.validateResp(resp, "Authorize returned an error");
			return resp;
		} catch (e) {
			throw e;
		}
	}
}
