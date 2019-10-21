import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import AALoginCallback from "./AALoginCallback";

describe("AALoginCallback", () => {
	const aaLoginCallback = jest.fn().mockImplementation(() => Promise.resolve());
	const aaLogin = jest.fn();
	const setSilentAuthProgress = jest.fn();
	const historyPush = jest.fn();

	beforeEach(() => {
		aaLoginCallback.mockClear();
		aaLogin.mockClear();
	});

	it("should mounts with minimum props", () => {
		const wrapper = shallowWithContext(
			<AALoginCallback
				actions={{
					aaLoginCallback,
					aaLogin,
					historyPush,
				}}
				query=""
				path=""
				loginCallbackQuery=""
			/>);
		expect(wrapper).toMatchSnapshot();
	});

	it("should call aaLoginCallback", () => {
		const codevalue = "?code=codevalue";

		mountWithContext(
			<AALoginCallback
				actions={{
					aaLoginCallback,
					aaLogin,
					historyPush
				}}
				query="?test=test&test2=test2"
				path="/example-path"
				loginCallbackQuery={codevalue}
			/>
		);
		expect(aaLoginCallback.mock.calls[0][0]).toBe(codevalue);
		expect(aaLoginCallback.mock.calls[0][1]).toBe(
			"/example-path?test=test&test2=test2"
		);
		expect(aaLogin.mock.calls.length).toBe(0);
	});

	it("should call aaLogin on error", () => {
		mountWithContext(
			<AALoginCallback
				actions={{
					aaLoginCallback,
					aaLogin,
					historyPush
				}}
				query=""
				path=""
				loginCallbackQuery="?error=login_required"
			/>
		);
		expect(aaLoginCallback.mock.calls.length).toBe(0);
		expect(aaLogin.mock.calls.length).toBe(1);
	});
});
