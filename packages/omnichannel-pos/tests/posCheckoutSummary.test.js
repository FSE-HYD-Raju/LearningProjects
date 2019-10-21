import React from "react";

import { mountWithContext, shallowWithContext, TestUtils } from "omnichannel-common-pos";

import POSCheckoutSummary from "../src/checkout/POSCheckoutSummary";

describe("POSCheckoutSummary", () => {

	const flux = {
		actions: {},
		stores: {
			document: {
				documents: {},
			}
		}
	};

	const redux = TestUtils.mockReduxStore({
		document: {
			documents: {},
		},
		feature: {
			showDigitalSignature: true,
			uploadDocumentConfiguration: {
				isEnabled: false,
				acceptedFileFormats: []
			}
		}
	});

	const context = {
		flux,
		store: redux
	};

	const basketActions = {
		activateCheckoutStep: data => {
			const { step } = data;
			const { valid } = data;
			console.log(
				"MOCKED BasketActions.activateCheckoutStep(), data:",
				data,
				step,
				valid
			);
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<POSCheckoutSummary
				BasketActions={basketActions}
				BasketStore={{}}
			/>, { context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		const wrapper = mountWithContext(
			<POSCheckoutSummary
				BasketActions={basketActions}
				BasketStore={{}}
			/>, { context }
		);
		expect(wrapper).toMatchSnapshot();
	});
});
