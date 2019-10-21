import alt from "../flux";
import sinon from "sinon";
import axios from "axios";
import {
	expectErrorHandled,
	setUpBaseActionOnErrorMock
} from "../tests/test-utils/apiErrorMock";
import actions from "../../redux/actions";

describe("SalesActions and SalesStore", () => {
	const flux = new alt();
	const context = {
		flux
	};
	let sandbox;

	beforeEach(() => {
		flux.recycle();
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	const getSalesActions = () => flux.getActions("SalesActions");

	// TODO: re-write these tests according to latest error actions changes
	xit("given contextualPaymentMethodId when submitNewPlanOrder error should handle error", async () => {
		const mockDispatch = jest.fn();
		context.flux.reduxStore.dispatch = mockDispatch;

		await getSalesActions().submitNewPlanOrder(
			"basketIdTest",
			"contextualPaymentMethodIdTest"
		);
		await flux.resolver.dispatchPendingActions();

		expect(mockDispatch).toHaveBeenCalledWith(actions.error.showError());
	});

	xit("given no contextualPaymentMethodId when submitNewPlanOrder error should handle error", async () => {
		const APIcall = sandbox.stub(axios, "post");
		setUpBaseActionOnErrorMock(flux, APIcall);

		await getSalesActions().submitNewPlanOrder("basketIdTest", null);
		await flux.resolver.dispatchPendingActions();

		expectErrorHandled(flux);
	});
});
