import alt from "../flux";
import sinon from "sinon";

let flux;
let baseActions;
let errorActions;
let dispatcherSpy;
describe("BaseActions", () => {
	flux = new alt();

	beforeEach(() => {
		baseActions = flux.getActions("BaseActions");
		dispatcherSpy = sinon.spy(flux.dispatcher, "dispatch");
		sinon.spy(baseActions, "onError");
	});
	afterEach(() => {
		flux.dispatcher.dispatch.restore();
		baseActions.onError.restore();
	});

	// TODO paka change to redux mocks
	xit("onError calls ErrorActions.showErrorModal with given error object", async () => {
		const error = { message: "Here is the error." };

		await baseActions.onError(error);
		await flux.resolver.dispatchPendingActions();
		const dispatcherArgs = dispatcherSpy.args[0];
		const firstArg = dispatcherArgs[0];

		// showErrorModal was called
		expect(firstArg.action).toBe(errorActions.SHOW_ERROR_MODAL);

		// with given error
		expect(firstArg.payload).toBe(error);
	});
});
