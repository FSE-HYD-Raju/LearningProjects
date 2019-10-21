import * as React from "react";
import _CustomerCaseBar from "../../src/components/customerCase/CustomerCaseBar";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import R from "ramda";
const CustomerCaseBar = _CustomerCaseBar.WrappedComponent;

describe("CustomerCaseBar", () => {
	let flux;
	let props;

	beforeEach(() => {
		flux = {
			recycle: () => {}
		};

		props = {
			BasketActions: {
				deleteUIbasket: () => {}
			},
			CustomerCaseActions: {
				endCustomerCase: () => {}
			},
			CustomerCaseStore: {
				getFormattedPhoneAndName: () => "Formatted Phone and Name",
				getFormattedAddress: () => {}
			},
			UserActions: {
				actAsUser: () => {},
				stopActingAsUser: () => {}
			},
			UserStore: {},
		};
	});

	const minProps = {
		CustomerCaseActions: {},
		CustomerCaseStore: {},
		UserStore: {},
		UserActions: {}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CustomerCaseBar {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<CustomerCaseBar {...minProps} />);
	});

	it('if salesRepUser exists "Act as customer" onClick handle function is not called', () => {
		props = R.assocPath(["UserStore", "salesRepUser", "id"], "anders.a")(
			props
		);
		props = R.assocPath(["CustomerCaseStore", "activeCustomerCase"], {})(
			props
		);

		props = R.assocPath(
			[
				"CustomerCaseStore",
				"activeCustomerCase",
				"attributes",
				"activeCustomer",
				"formattedName"
			],
			"John Smith"
		)(props);

		props.UserActions.actAsUser = jest.fn();

		const wrapper = mountWithContext(<CustomerCaseBar {...props} />);

		const customerSessionButton = wrapper
			.find("CustomerCaseBarButton")
			.filterWhere(
				n =>
					n.prop("id") ===
					"CustomerCaseBar-dropdown-button-customer-session"
			);
		customerSessionButton.simulate("click");

		expect(props.UserActions.actAsUser).not.toHaveBeenCalled();
		props.UserActions.actAsUser.mockReset();
	});

	it("Act as customer is disabled if there POS user is already acting as a customer", () => {
		props = R.assocPath(
			[
				"CustomerCaseStore",
				"activeCustomerCase",
				"attributes",
				"activeCustomer",
				"formattedName"
			],
			"John Smith"
		)(props);
		props = R.assocPath(["UserStore", "salesRepUser", "id"], "anders.a")(
			props
		);

		props.UserActions.actAsUser = jest.fn();

		const wrapper = mountWithContext(<CustomerCaseBar {...props} />);

		const customerSessionButton = wrapper
			.find("#CustomerCaseBar-dropdown-button-customer-session")
			.hostNodes();
		customerSessionButton.simulate("click");

		expect(props.UserActions.actAsUser).not.toHaveBeenCalled();

		props.UserActions.actAsUser.mockReset();
	});

	it('Clicking "End customer case" button fires CustomerCaseActions.endCustomerCase()', () => {
		props = R.assocPath(
			[
				"CustomerCaseStore",
				"activeCustomerCase",
				"attributes",
				"activeCustomer",
				"formattedName"
			],
			"John Smith"
		)(props);
		props = R.assocPath(
			["CustomerCaseStore", "activeCustomerCase", "id"],
			"activecustomer-123"
		)(props);
		props = R.assocPath(
			["CustomerCaseActions", "updateCustomerCase"],
			() => {}
		)(props);
		props = R.assocPath(["UserStore", "salesRepUser", "id"], "anders.a")(
			props
		);

		props.CustomerCaseActions.endCustomerCase = jest.fn();

		const context = { flux };

		const wrapper = mountWithContext(<CustomerCaseBar {...props} />, {
			context
		});

		const customerSessionButton = wrapper
			.find("CustomerCaseBarButton")
			.filterWhere(
				n =>
					n.prop("id") ===
					"CustomerCaseBar-dropdown-button-customer-session"
			);
		customerSessionButton.simulate("click");

		const button = wrapper
			.find("#service-desk-end-customer-case-button")
			.hostNodes();
		button.simulate("click");

		expect(props.CustomerCaseActions.endCustomerCase).toHaveBeenCalled();

		props.CustomerCaseActions.endCustomerCase.mockReset();
	});
});
