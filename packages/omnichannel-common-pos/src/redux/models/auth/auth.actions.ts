"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum AuthActions {
	SET_VALUES = "Auth_SET_VALUES",
	REFRESH = "Auth_REFRESH",
	POST_LOGIN_CLEANUP = "Common_POST_LOGIN_CLEANUP",
	SAVE_AUTH_TOKEN = "Auth_SET_AUTH_TOKEN",
}

export interface AuthActionPayload extends Action<AuthActions> {
	values?: ConsulValues;
	error?: string;
	token?: string;
	progress?: boolean;
}

export const auth = {
	setValues: (values: ConsulValues) => ({type: AuthActions.SET_VALUES, values}),
	refresh: () => ({type: AuthActions.REFRESH}),
	postLoginCleanup: () => ({ type: AuthActions.POST_LOGIN_CLEANUP }),
	saveAuthToken: (token: string) => ({type: AuthActions.SAVE_AUTH_TOKEN, token}),
};
