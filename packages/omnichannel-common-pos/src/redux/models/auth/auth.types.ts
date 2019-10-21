"use strict";

export type PeriodicTokenRefreshConfig = {
	enabled: boolean;
	timeout?: number;
};

export type JWT = {
	exp?: number;
};

export type AuthState = {
	clientId?: string;
	token?: string;
	openIdConfiguration?: {
		check_session_iframe?: string;
	};
	sessionCheckIntervalSeconds: number;
	sessionCheckEnabled: boolean;
	userRoleClaimKey: string;
	userRoleIdClaimKey: string;
	anonymousUserRole: string;
	rolesToPermissions: Record<string, string>;
	silentAuthenticationEnabled: boolean;
	jwt: JWT;
	anonymousAuthenticationEnabled: boolean;
	settingsLoaded: boolean;
	userRoleId?: string;
	periodicTokenRefresh: PeriodicTokenRefreshConfig;
	jwtFieldNameForUserAccountId: string;
	userAccountId: string;
};
