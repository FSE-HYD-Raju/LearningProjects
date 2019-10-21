import extractQueryParamsFromUrl from "./extractQueryParamsFromUrl";

describe("AALoginCallbackUtils", () => {
	it("should extract search string from url correctly", () => {
		const code = "code_value";
		const state = "state_value";
		const sessionState = "session_state_value";

		const windowLocationSearch = `?code=${code}&state=${state}&session_state=${sessionState}`;

		expect(extractQueryParamsFromUrl(windowLocationSearch)).toEqual({
			code,
			session_state: sessionState,
			state
		});
	});
});
