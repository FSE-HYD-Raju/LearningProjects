import alt from "../flux";
import sinon from "sinon";
import axios from "axios";

import { TestUtils } from "../../testUtils";

describe("PaymentActions and PaymentStore", () => {
	const flux = new alt();
	const paymentMethods = [
		{
			id: "balance",
			attributes: {
				className:
					"com.soikea.omnichannel.payment.paymentmethod.PaymentMethodBalance",
				label: "Balance",
				balance: "100"
			},
			className:
				"com.soikea.omnichannel.payment.paymentmethod.PaymentMethodBalance",
			label: "Balance",
			balance: "100"
		},
		{
			id: "mock-bank",
			attributes: {
				className:
					"com.soikea.omnichannel.payment.paymentmethod.PaymentMethodMockBank",
				label: "Mock Bank",
				balance: "100"
			},
			className:
				"com.soikea.omnichannel.payment.paymentmethod.PaymentMethodMockBank",
			label: "Mock Bank",
			balance: "100"
		}
	];

	const reduxStore = TestUtils.mockReduxStore({
		payment: {
			storeCustomerPaymentMethod: false
		}
	});
	flux.reduxStore = reduxStore;

	let sandbox;

	beforeEach(() => {
		flux.recycle();
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	const getPaymentStoreState = () => flux.stores.PaymentStore.state;
	const getPaymentActions = () => flux.getActions("PaymentActions");

	it("gets eligible payment methods for basket", async () => {
		const APIcall = sandbox.stub(axios, "get");
		const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
		const responseMock = Promise.resolve({
			data: { data: paymentMethods }
		});
		APIcall.returns(responseMock);

		await getPaymentActions().getEligiblePaymentMethods(mockBasketId);
		await flux.resolver.dispatchPendingActions();

		expect(getPaymentStoreState().contextualPaymentMethods).toEqual(
			paymentMethods
		);
	});

	it("gets success message after successful balance payment", async () => {
		const APIcall = sandbox.stub(axios, "post");
		const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
		const mockPaymentMethodId = "balance";
		const responseMockData = {
			attributes: {
				paymentInfo: {
					paymentForm: null,
					paymentCompletedCode: "payment-success",
					paymentErrorCode: null,
					paymentCompleted: true
				}
			}
		};
		const basketInclusions = [
			{
				type: "baskets",
				id: "basketId",
				attributes: {
					lifecycleStatus: "SUBMITTED"
				}
			},
			{
				type: "basketItems",
				id: "item-1"
			}
		];

		const responseMock = Promise.resolve({
			data: { data: responseMockData, included: basketInclusions }
		});
		APIcall.returns(responseMock);

		await getPaymentActions().selectPaymentMethod(
			mockBasketId,
			mockPaymentMethodId
		);
		await flux.resolver.dispatchPendingActions();

		const basketStoreState = flux.stores.BasketStore.state;

		expect(getPaymentStoreState().contextualPaymentMethodId).toEqual(
			"balance"
		);
		expect(getPaymentStoreState().paymentInfo.paymentCompletedCode).toEqual(
			"payment-success"
		);
		expect(getPaymentStoreState().paymentInfo.paymentCompleted).toEqual(
			true
		);
		expect(basketStoreState.submittedBasket.id).toEqual("basketId");
		expect(basketStoreState.submittedBasketItems.length).toEqual(1);
	});

	it("gets error message after trying to pay with depleted balance", async () => {
		const APIcall = sandbox.stub(axios, "post");
		const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
		const mockPaymentMethodId = "balance";

		const responseMockData = {
			attributes: {
				paymentInfo: {
					paymentForm: null,
					paymentCompletedCode: null,
					paymentErrorCode: "balance-limit-surpassed",
					paymentCompleted: false
				}
			}
		};
		const responseMock = Promise.resolve({
			data: { data: responseMockData }
		});
		APIcall.returns(responseMock);

		await getPaymentActions().selectPaymentMethod(
			mockBasketId,
			mockPaymentMethodId
		);
		await flux.resolver.dispatchPendingActions();

		expect(getPaymentStoreState().paymentInfo.paymentErrorCode).toEqual(
			"balance-limit-surpassed"
		);
		expect(getPaymentStoreState().paymentInfo.paymentCompleted).toEqual(
			false
		);
	});

	it("validates payment", async () => {
		const APIcall = sandbox.stub(axios, "post");
		const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
		const mockPaymentMethodId = "balance";
		const paymentParams = {
			PAID: "1",
			METHOD: "MAN"
		};

		const responseMockData = {
			attributes: {
				paymentStatus: "SUCCESS"
			}
		};
		const responseMock = Promise.resolve({
			data: { data: responseMockData }
		});
		APIcall.returns(responseMock);

		await getPaymentActions().validatePayment(
			mockBasketId,
			mockPaymentMethodId,
			paymentParams
		);
		await flux.resolver.dispatchPendingActions();

		expect(getPaymentStoreState().paymentStatus).toEqual("SUCCESS");
	});
});
