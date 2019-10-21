import { AppState } from "../../../reducers";
import { SessionUtils, SessionKeys } from "../../../../utils/SessionUtils";
import { shouldInvokeRefresh } from "../auth.saga";
import { PeriodicTokenRefreshConfig, JWT, AuthState } from "../auth.types";
import { UserState } from "../../../types";
const SagaTester = require("redux-saga-tester").default;
const BASE_DATE = new Date(1551045600000);

describe("auth.saga", () => {
	beforeEach(() => {
		SessionUtils.setItem(SessionKeys.auth, "some-fake-token");
		const dateNowStub = jest.fn(() => BASE_DATE.getTime());
		global.Date.now = dateNowStub;
	});

	afterEach(() => {
		SessionUtils.removeItem(SessionKeys.auth);
	});

	describe("should not invoke refresh", () => {
		it("if refresh functionality is toggled off", () => {
			const appState = ({
				auth: {
					periodicTokenRefresh: {
						enabled: false
					}
				}
			} as any) as AppState;

			expect(shouldInvokeRefresh(appState)).toBe(false);
		});

		it("if user is not logged in", () => {
			const appState = ({
				user: {},
				auth: {
					periodicTokenRefresh: {
						enabled: true,
						timeout: 10000
					}
				}
			} as any) as AppState;

			expect(shouldInvokeRefresh(appState)).toBe(false);
		});

		it("if user is logged in but token is still valid for longer than the timeout period", () => {
			const appState = ({
				user: {
					user: {
						id: "something"
					}
				},
				auth: {
					periodicTokenRefresh: {
						enabled: true,
						timeout: 4000
					},
					jwt: {
						exp: 1551045610 // 10 seconds 'in future'
					}
				}
			} as any) as AppState;

			expect(shouldInvokeRefresh(appState)).toBe(false);
		});
	});

	describe("should invoke refresh", () => {
		it("if user is logged in and token is still valid for less time than the timeout period", () => {
			const appState = ({
				user: {
					user: {
						id: "something"
					}
				} as UserState,
				auth: {
					periodicTokenRefresh: {
						enabled: true,
						timeout: 14000
					},
					jwt: {
						exp: 1551045610 // 10 seconds 'in future'
					}
				}
			} as any) as AppState;

			expect(shouldInvokeRefresh(appState)).toBe(true);
		});
	});
});
