"use strict";

import { get, mapValues, mapKeys, pickBy, replace, isString, has, includes, isEmpty } from "lodash";
import { AuthState } from "./auth.types";
import { ConsulValues } from "../consul/consul.types";
import { getParsedValue } from "../../utils";
import { AppState } from "../../reducers";
import TraceUtil from "../../../utils/TraceUtil";

export function extractValues(data: ConsulValues, state: Partial<AuthState>): Partial<AuthState> {

	const PERMISSIONS_KEY = "auth/permissions/";
	const DEFAULT_TIME = state.sessionCheckIntervalSeconds;

	const getCheckSessionIframeURL = (payload: ConsulValues) => {
		const service = get(payload, "aa_solution_service_name") as any;
		const path = get(payload, "auth/oauth/session_check_iframe_path");
		const protocol = window.location.protocol;
		if (service && service.address && service.port && path) {
			return `${protocol}//${service.address}:${service.port}${path}`;
		} else {
			console.warn(
				`Unable to resolve check session iframe URL [service="${JSON.stringify(service)}, path="${path}"]`
			);
		}

		return null;
	};

	return {
		openIdConfiguration: {
			check_session_iframe: getCheckSessionIframeURL(data)
		},
		clientId: get(data, "auth/oauth/client_id") as string,
		sessionCheckIntervalSeconds: get(data, "auth/oauth/session_check_interval_seconds", DEFAULT_TIME),
		silentAuthenticationEnabled: get(data, "auth/silent_authentication_enabled") === "true",
		sessionCheckEnabled: get(data, "auth/oauth/session_check_enabled") === "true",
		anonymousUserRole: get(data, "auth/anonymous_user_role"),
		userRoleClaimKey: get(data, "auth/claims/user_role_claim_key"),
		userRoleIdClaimKey: get(data, "auth/claims/user_role_id_claim_key"),
		periodicTokenRefresh: getParsedValue(get(data, "auth/periodic_token_refresh"), { enabled: false }),

		rolesToPermissions: mapValues(
			mapKeys(
				pickBy(data, (value, key) => key.startsWith(PERMISSIONS_KEY)),
				(value, key) => replace(key, PERMISSIONS_KEY, "")
			),
			value => getParsedValue(value, [])
		),
		anonymousAuthenticationEnabled: get(data, "features/anonymous_authentication") === "true",

		settingsLoaded: true,
		jwtFieldNameForUserAccountId: data["auth/jwt/user_id_field_name"] || state.jwtFieldNameForUserAccountId,
	} as any;
}

export function doesUserHavePermission(permission: string, state: AppState): boolean {
	if (isEmpty(state.user.user)) {
		return false;
	}

	const roleClaim = get(state.auth.jwt, state.auth.userRoleClaimKey);
	let roleArray: string[] = [];

	// Role claim in AA may be a string or an array of strings. Convert to array here, if needed.
	if (isString(roleClaim)) {
		roleArray.push(roleClaim);
	} else if (Array.isArray(roleClaim)) {
		roleArray = roleClaim;
	} else if (roleClaim) {
		TraceUtil.logOnce(`Unsupported role type: ${roleClaim}`);
	}

	// Loop through all AA roles. For the first role found in map rolesToPermissions,
	// compare the requested permission to role permissions from map.
	for (let i = 0; i < roleArray.length; i++) {
		const role = roleArray[i];
		if (has(state.auth.rolesToPermissions, role)) {
			const permissions: string = state.auth.rolesToPermissions[role];
			return includes(permissions, permission);
		}
	}

	return false;
}

export function isCmsUser(state: AppState): boolean {
	return doesUserHavePermission("contentmanager", state);
}
