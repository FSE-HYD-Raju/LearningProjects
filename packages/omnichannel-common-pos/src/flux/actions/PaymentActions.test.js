import alt from "../flux";
import sinon from "sinon";
import axios from "axios";
import { ReduxTestUtils } from "../../redux";
import TestUtils from "../../testUtils";

describe("PaymentActions and PaymentStore", () => {
	const flux = new alt();
	ReduxTestUtils.setupFluxAndReduxTest(flux);
	flux.reduxStore = TestUtils.mockReduxStore({
		feature: {
			cashPaymentIdentifiers: ["cash"]
		}
	});
	flux.history = { push: () => {} };
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("It should perform cash payment", async () => {
		sandbox.stub(axios, "get").returns(
			Promise.resolve({
				status: 200,
				data: {
					data: [
						{
							attributes: {
								"created-at": "2018-06-19T06:05:02.773Z",
								amount: {
									amount: 249.95,
									currency: "EUR",
									meta: {
										type: "monetary-amount"
									}
								},
								"payment-method": {
									"payment-type": "cash",
									meta: {
										type: "generic-payment-method"
									}
								},
								"payment-status": "deferred",
								"reference-number": "test-reference-number-123",
								"payment-source": "cash"
							},
							id: "b73b530a-7855-450b-904d-603a77048607",
							type: "basket-payments"
						}
					]
				}
			})
		);

		const routerStub = sandbox.stub(flux.history, "push");
		await flux.getActions("PaymentActions").fetchReferenceNumberForCashPayment("basketIdTest", "cash");

		expect(flux.stores.PaymentStore.state.referenceNumber).toEqual("test-reference-number-123");
		sinon.assert.calledWith(routerStub, "/payment/cash_success");
	});
});
