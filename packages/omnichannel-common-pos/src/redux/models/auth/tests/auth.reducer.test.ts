/* tslint:disable:max-line-length */
import authReducer, { authInitialState } from "../auth.reducers";
import { auth } from "../auth.actions";
import { AuthUtils } from "../../../utils";
import { AppState } from "../../../reducers";

const jwt_decode = require("jwt-decode");

describe("auth.reducer", () => {

	beforeEach(() => {
		(global as any).sessionStorage = jest.fn();
		(global as any).sessionStorage.setItem = jest.fn();
		(global as any).sessionStorage.getItem = jest.fn();
	});

	it("gets relevant configs from Consul", () => {
		const responseData = {
			"auth/anonymous_user_role": "anon",
			"auth/claims/user_role_claim_key":
				"x_dbss.role_characteristics_value",
			"auth/permissions/contentmanager": '["cms", "contentmanager"]',
			"auth/client_id": "clientId"
		};

		const state = authReducer({...authInitialState}, auth.setValues(responseData));

		expect(state.anonymousUserRole).toEqual(responseData["auth/anonymous_user_role"]);
		expect(state.userRoleClaimKey).toEqual(responseData["auth/claims/user_role_claim_key"]);
		// assert that roles matches to expected permissions
		expect(state.rolesToPermissions["contentmanager"][0]).toEqual("cms");
		expect(state.rolesToPermissions["contentmanager"][1]).toEqual("contentmanager");
	});

	it("stores encoded and decoded JWT", async () => {
		const token =
			"eyJraWQiOiJlMWZhMTdmNS1kYWM3LTQ4ZjItODg3My01YmRmYzNkYzkyYzMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjb250ZW50Lm1hbmFnZXJAcXZhbnRlbC5jb20iLCJhdWQiOiJjb250ZW50bWdtdCIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo3MDAwIiwieF9kYnNzIjp7InVzZXJuYW1lIjoiY29udGVudC5tYW5hZ2VyQHF2YW50ZWwuY29tIiwidG9rZW5pZCI6ImU4Y2U5Y2Y1LWI1MWUtNGQwNC1hYTE1LTVkMzE1MzM2ZGU1MyIsIkF1dGh6UHJvZmlsZUlkIjoiNzI5YjJkY2MtODhmYS00YWI0LWIzNmUtMmJiYzFhY2JkNDZhIiwiQXV0aHpQcm9maWxlVmVyc2lvbiI6IjEiLCJyb2xlX2NoYXJhY3RlcmlzdGljc192YWx1ZSI6ImNvbnRlbnRtYW5hZ2VyIiwicGFydHlpZCI6ImNvbnRlbnQubSIsImxhbmd1YWdlIjoiZW4iLCJwYXJ0eVJvbGUiOiI2NDM1ZDkxOS0yNjQxLTQ3NWItYTVlNi1jYWU1YzI2ODhiNGQifSwiZXhwIjoxNTA1NjM0MjA2LCJpYXQiOjE1MDU2MzI0MDZ9.qWbDFzcNdzTQccy1bZBZVJFZfNCbq-W_bOPh8snCfr24fpU6olZqjkaqu0oexExWoVhNa_qvQR6h1AgF6mqsDxwbA_e-YbOBCCN_i-_vpfvArRtkY3p96XeA9THjlhRuxZMuhpwFXjrljpo9udBWgsvDWyssy-KytZB35EmOTVpvZlmOcPNZTCWvo1mwiHvNhTzbUYJUxfoa-zj62glSkpvX_Ox4pp1XSSKN67Ikz9TR05YCw02QRhVzzoAH-XUkEBXQS9xYqAGWpgTJS5u4MVAX7O_FjgOTuzaeelvEqQe5W_3975ag5R95Aby70UASLHBQSQQIw3l-1-EZrwCxzw";

		const state = authReducer({...authInitialState}, auth.saveAuthToken(token));

		expect(state.jwt).toEqual(jwt_decode(token));
		expect(state.token).toEqual(token);
	});

	it("should check for permissions according to consul role to permission mapping configuration", async () => {
		const responseData = {
			"auth/anonymous_user_role": "anon",
			"auth/claims/user_role_claim_key":
				"x_dbss.role_characteristics_value",
			"auth/permissions/contentmanager": '["cms", "contentmanager"]',
			"auth/client_id": "clientId"
		};

		let state = authReducer({...authInitialState}, auth.setValues(responseData));
		const fakeUserStore = {user: { firstName: "Test"}};

		const token =
			"AyJraWQiOiJlMWZhMTdmNS1kYWM3LTQ4ZjItODg3My01YmRmYzNkYzkyYzMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjb250ZW50Lm1hbmFnZXJAcXZhbnRlbC5jb20iLCJhdWQiOiJjb250ZW50bWdtdCIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo3MDAwIiwieF9kYnNzIjp7InVzZXJuYW1lIjoiY29udGVudC5tYW5hZ2VyQHF2YW50ZWwuY29tIiwidG9rZW5pZCI6ImU4Y2U5Y2Y1LWI1MWUtNGQwNC1hYTE1LTVkMzE1MzM2ZGU1MyIsIkF1dGh6UHJvZmlsZUlkIjoiNzI5YjJkY2MtODhmYS00YWI0LWIzNmUtMmJiYzFhY2JkNDZhIiwiQXV0aHpQcm9maWxlVmVyc2lvbiI6IjEiLCJyb2xlX2NoYXJhY3RlcmlzdGljc192YWx1ZSI6ImNvbnRlbnRtYW5hZ2VyIiwicGFydHlpZCI6ImNvbnRlbnQubSIsImxhbmd1YWdlIjoiZW4iLCJwYXJ0eVJvbGUiOiI2NDM1ZDkxOS0yNjQxLTQ3NWItYTVlNi1jYWU1YzI2ODhiNGQifSwiZXhwIjoxNTA1NjM0MjA2LCJpYXQiOjE1MDU2MzI0MDZ9.qWbDFzcNdzTQccy1bZBZVJFZfNCbq-W_bOPh8snCfr24fpU6olZqjkaqu0oexExWoVhNa_qvQR6h1AgF6mqsDxwbA_e-YbOBCCN_i-_vpfvArRtkY3p96XeA9THjlhRuxZMuhpwFXjrljpo9udBWgsvDWyssy-KytZB35EmOTVpvZlmOcPNZTCWvo1mwiHvNhTzbUYJUxfoa-zj62glSkpvX_Ox4pp1XSSKN67Ikz9TR05YCw02QRhVzzoAH-XUkEBXQS9xYqAGWpgTJS5u4MVAX7O_FjgOTuzaeelvEqQe5W_3975ag5R95Aby70UASLHBQSQQIw3l-1-EZrwCxzw";
		state = authReducer(state, auth.saveAuthToken(token));

		// jwt only has role "contentmanager" which should match to these permissions
		expect(AuthUtils.isCmsUser({auth: state, user: fakeUserStore} as AppState)).toEqual(true);
		// but not this one
		expect(AuthUtils.doesUserHavePermission("pos", {auth: state, user: fakeUserStore} as AppState)).toEqual(false);
	});
});
