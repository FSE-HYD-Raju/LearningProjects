import { Flux } from "omnichannel-common-pos";
import sinon from "sinon";
import CustomerCaseActions from "../../src/actions/CustomerCaseActions";
import CustomerCaseStore from "../../src/stores/CustomerCaseStore";

describe("CustomerCaseActions and store", () => {
	let flux;

	let sandbox;

	let apiCall;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		flux = new Flux.alt();
		flux.addActions("CustomerCaseActions", CustomerCaseActions);
		flux.addStore("CustomerCaseStore", CustomerCaseStore);
	});

	afterEach(() => {
		sandbox.restore();
	});

	//no longer uses API-calls, refactored due to RUBT-117904
	it("create, store and clear a new customer case", async () => {
		const salesRepId = "anders.a";
		let resp = {
			type: "customercases",
			attributes: { salesRepUser: { id: salesRepId }, status: "ONGOING" }
		};

		// add new customer case
		await flux.getActions("CustomerCaseActions").createNewCustomerCase(salesRepId);
		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.CustomerCaseStore;
		expect(state.activeCustomerCase).toEqual(resp);

		resp = {
			type: "customercases",
			id: "foostomercase",
			attributes: {
				status: "ENDED",
				salesRepUser: { id: salesRepId }
			}
		};

		// remove customer case
		await flux.getActions("CustomerCaseActions").updateCustomerCase(resp.id, resp);

		await flux.resolver.dispatchPendingActions();
		const newState = flux.stores.CustomerCaseStore.state;
		expect(newState.activeCustomerCase).toEqual(null);
	});

	it("updates customer case with new customer", async () => {
		let resp = {
			type: "customercases",
			attributes: { salesRepUser: { id: "anders.a" } }
		};

		let responseMock = Promise.resolve({
			status: 200,
			data: { data: resp }
		});

		apiCall = sandbox.stub(flux.apiCalls, "post");
		apiCall.returns(responseMock);

		// add new customer case
		await flux.getActions("CustomerCaseActions").createNewCustomerCase(resp);
		await flux.resolver.dispatchPendingActions();

		resp = {
			type: "customercases",
			id: "foostomercase",
			attributes: {
				salesRepUser: { id: "anders.a" },
				activeCustomer: {
					id: "teppo",
					firstName: "Teppo",
					lastName: "Testaaja"
				}
			}
		};

		responseMock = Promise.resolve({
			status: 200,
			data: { data: resp }
		});

		apiCall = sandbox.stub(flux.apiCalls, "patch");
		apiCall.returns(responseMock);

		//update customer case
		await flux.getActions("CustomerCaseActions").updateCustomerCase(resp.id, resp);
		await flux.resolver.dispatchPendingActions();
		const { state } = flux.stores.CustomerCaseStore;
		expect(state.activeCustomerCase).toEqual(resp);
	});
});
