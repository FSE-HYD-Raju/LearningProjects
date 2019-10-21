import React from "react";

import {
	mountWithContext,
	shallowWithContext,
	SimpleDataMock,
	TestUtils,
} from "omnichannel-common-pos";

import CheckoutSetup from "../src/checkout/CheckoutSetup";

const BasketActions = {
	activateCheckoutStep: ({ step, valid }) => {
		console.log(
			"MOCKED BasketActions.activateCheckoutStep(), step, valid:",
			step,
			valid
		);
	}
};

const BasketStore = {
	checkoutSteps: {
		SETUP: false
	}
};

const UserActions = {
	updateUser: (model, updateCustomerCase) => {
		console.log(
			"MOCKED UserActions.updateUser(), model, updateCustomerCase:",
			model,
			updateCustomerCase
		);
	}
};

const fullRenderingProps = {
	CustomerCaseStore: {
		activeCustomerCase: {
			attributes: {
				activeCustomer: {}
			}
		}
	},
	UserStore: {
		updatingUser: false
	},
	UserActions,
	BasketStore,
	BasketActions,
};

describe("CheckoutSetup", () => {
	const context = SimpleDataMock.getConsulContextMock();
	context.store = TestUtils.mockReduxStore({
		error: {
			error: {}
		},
		feature: {
			hideIdentificationAtCheckoutPage: true,
		},
		cms: {},
		schema: {},
		consul: {},
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<CheckoutSetup {...fullRenderingProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount without props", () => {
		mountWithContext(<CheckoutSetup />, { context });
	});
});
