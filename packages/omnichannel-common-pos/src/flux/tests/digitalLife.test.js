/* global describe, it, expect, beforeEach, afterEach, test */

import alt from "../flux";
import sinon from "sinon";
import axios from "axios";
import { ReduxTestUtils } from "../../redux";
import apiUrl from "../../utils/urls";

describe("DigitalLifeActions and store", () => {
	let sandbox;
	let flux;

	beforeEach(() => {
		flux = new alt();
		sandbox = sinon.sandbox.create();
		flux.recycle();
		ReduxTestUtils.setupFluxAndReduxTest(flux);
	});

	afterEach(() => {
		sandbox.restore();
	});

	// README: Locally works correctly, but on jenkins fails.
	xit("inits all", async () => {
		const user = {
			type: "persons",
			id: "juanita",
			attributes: {
				firstName: "Juanita",
				lastName: "Solis"
			}
		};
		const agreements = [
			{
				type: "agreements",
				id: "agreement-1",
				attributes: { lifeCycleStatus: "ACTIVE" }
			},
			{
				type: "agreements",
				id: "agreement-2",
				attributes: { lifeCycleStatus: "ACTIVE" }
			}
		];
		const persons = [
			{
				type: "persons",
				id: "salma",
				attributes: {
					firstName: "Salma",
					lastName: "Solis"
				}
			}
		];
		const included = [agreements[0], agreements[1], persons[0]];

		const apiCallStub = sandbox.stub(axios, "get");
		apiCallStub.returns(
			Promise.resolve({ status: 200, data: { data: user, included } })
		);

		await flux.getActions("DigitalLifeActions").initAll(user);

		const { state } = flux.stores.DigitalLifeStore;
		const { digitalLife } = flux.reduxStore.getState();

		console.debug("state.agreements", state.agreements);
		console.debug("digitalLife.agreements", digitalLife.agreements);

		expect(state.agreements).toEqual(agreements);
		expect(state.user).toEqual(user);
		expect(state.people[0].attributes.firstName).toEqual("Juanita");
		expect(state.people[0].attributes.lastName).toEqual("Solis");
		expect(state.people[1].attributes.firstName).toEqual("Salma");
		expect(state.people[1].attributes.lastName).toEqual("Solis");
	});

	test("#fetchCategoryUserProducts", async () => {
		// skipping until we figure out how to make this work with jest

		const catId = 1;
		const userId = 102;

		const categoryUserProductsMock = {
			data: [
				{ id: 1, attributes: { sellableProduct: true } },
				{ id: 2, attributes: { sellableProduct: true } },
				{ id: 3, attributes: { sellableProduct: null } }
			]
		};

		const responseMock = Promise.resolve({
			status: 200,
			data: categoryUserProductsMock
		});

		const APIcall = sandbox.stub(axios, "get");
		APIcall.returns(responseMock);

		await flux
			.getActions("DigitalLifeActions")
			.fetchCategoryUserProducts(catId, userId);
		await flux.resolver.dispatchPendingActions();

		sinon.assert.calledWith(
			APIcall,
			`${apiUrl}/persons/${userId}/products/?filter[category]=${catId}`
		);
		const { state } = flux.getStore("DigitalLifeStore");
		const categoryProducts = state.categoryProducts;
		const found =
			categoryProducts &&
			categoryProducts.find(
				product => product.id === categoryUserProductsMock.data[0].id
			);
		// console.log("CAT PRODS", categoryProducts, state);
		expect(found).toBeTruthy();

		//

		// expect(categoryUserProductsMock.data[0].id === _.get(state, 'categoryProducts[0].id')).toBe(true);
		// expect(categoryUserProductsMock.data[1].id === _.get(state, 'categoryProducts[1].id')).toBe(true);
		// expect(R.contains(categoryUserProductsMock.data[1], state.categoryProducts)).toBe(true);
	});

	it("#addPerson", async () => {
		const dispatchStub = sandbox.stub(flux.dispatcher, "dispatch");
		const APIcall = sandbox.stub(axios, "post");
		const dataMock = { data: "data for response" };

		const responseMock = Promise.resolve({
			status: 200,
			data: dataMock
		});

		APIcall.returns(responseMock);

		const person = {
			firstName: "John",
			lastName: "Mock",
			email: "john.mock@soikea.com",
			phone: "041 123 4567"
		};

		const addEverywhere = true;

		await flux
			.getActions("DigitalLifeActions")
			.addPerson(person, addEverywhere);
		await flux.resolver.dispatchPendingActions();

		// Person is part of the POST call
		expect(APIcall.args[0][1].data.attributes.firstName).toBe("John");

		// addEverywhere adds places
		expect(APIcall.args[0][1].data.attributes.places).toBeTruthy();

		expect(dispatchStub.args[0][0].payload).toBe(dataMock.data);
	});

	it("#disableThing", async () => {
		const presetData = {
			agreements: [
				{
					id: 1,
					attributes: {}
				}
			]
		};

		flux.getActions("DigitalLifeActions").setAgreements(presetData);

		await flux.resolver.dispatchPendingActions();

		const id = 1;

		flux.getActions("DigitalLifeActions").disableThing(id);

		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.DigitalLifeStore;

		expect(state.agreements[0].attributes.productStatus).toEqual({
			status: "DISABLED"
		});
	});

	it("#enableThing", async () => {
		const presetData = {
			agreements: [
				{
					id: 1,
					attributes: {}
				}
			]
		};

		flux.getActions("DigitalLifeActions").setAgreements(presetData);

		await flux.resolver.dispatchPendingActions();

		const id = 1;

		flux.getActions("DigitalLifeActions").enableThing(id);

		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.DigitalLifeStore;

		expect(state.agreements[0].attributes.productStatus).toEqual({
			status: "OK"
		});
	});
});
