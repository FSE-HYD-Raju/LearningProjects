"use strict";

import { AuthActionPayload, AuthActions } from "./auth.actions";
import { AuthState } from "./auth.types";
import { extractValues } from "./auth.utils";
import { ConsulValues } from "../consul/consul.types";

const jwt_decode: (token: string) => any = require("jwt-decode");

export { AuthActionPayload } from "./auth.actions";

export { AuthState } from "./auth.types";

const initialState: AuthState = {
	sessionCheckIntervalSeconds: 60,
	sessionCheckEnabled: false,
	rolesToPermissions: {},
	silentAuthenticationEnabled: false,
	jwt: {},
	anonymousAuthenticationEnabled: false,
	settingsLoaded: false,
	userRoleClaimKey: "",
	userRoleIdClaimKey: "",
	anonymousUserRole: "",
	periodicTokenRefresh: {enabled: false},
	jwtFieldNameForUserAccountId: "sub",
	userAccountId: "",
};

const authReducer = (state: AuthState = initialState, action: AuthActionPayload) => {
	const { type } = action;
	switch (type) {
		case AuthActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues, state)};
		case AuthActions.SAVE_AUTH_TOKEN: {
			const token = action.token!;
			sessionStorage && sessionStorage.setItem("auth", token);
			if (token !== state.token) {
				const jwt = jwt_decode(token);
				const userRoleId = jwt[state.userRoleIdClaimKey];
				const userAccountId = jwt[state.jwtFieldNameForUserAccountId];
				return { ...state, token, jwt, userRoleId, userAccountId, };
			}
			return state;
		}
		default:
			return state;
	}
};

export default authReducer;
export {
	initialState as authInitialState
};
