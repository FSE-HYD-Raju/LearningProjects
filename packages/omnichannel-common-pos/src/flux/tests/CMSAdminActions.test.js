/* global describe, it, expect, beforeEach, afterEach */

import alt from "../flux";
import sinon from "sinon";
import axios from "axios";

let sandbox;

const flux = new alt();

describe("CMSAdminActions and store", () => {
	beforeEach(() => {
		flux.recycle();
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("#getContentItemsAndTemplates", async () => {
		const APIcall = sandbox.stub(axios, "get");

		const _items = [];

		const responseMock = Promise.resolve({
			status: 200,
			data: _items
		});

		APIcall.returns(responseMock);

		await flux.getActions("CMSAdminActions").getContentItemsAndTemplates();
		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.CMSAdminStore;

		expect(state.contentItemsAndTemplates).toEqual(_items);
	});

	it("#togglePreviewContentInModal", async () => {
		const APIcall = sandbox.stub(axios, "get");

		const previewStatus = true;

		const responseMock = Promise.resolve({
			status: 200,
			data: previewStatus
		});

		APIcall.returns(responseMock);

		await flux
			.getActions("CMSAdminActions")
			.togglePreviewContentInModal(true);
		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.CMSAdminStore;

		expect(state.previewContentInModal).toEqual(previewStatus);
	});
});
