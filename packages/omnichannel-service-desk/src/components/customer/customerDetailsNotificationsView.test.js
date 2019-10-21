import React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import CustomerDetailsNotificationsView from "../../../src/components/customer/CustomerDetailsNotificationsView";

describe("CustomerDetailsNotificationsView", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<CustomerDetailsNotificationsView />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerDetailsNotificationsView />);
	});

	it("does not throw error if header props is not found from messages", () => {
		const props = {
			header: "Derp header"
		};

		mountWithContext(<CustomerDetailsNotificationsView {...props} />);
	});

	it("renders notifications edit mode off", () => {
		const props = {
			header: "notifications",
			editMode: false
		};

		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsView {...props} />
		);

		// get the first span
		const header = wrapper.find(".CustomerDetailsView-header").childAt(0);

		expect(header.text()).toEqual("Notifications");

		const editMode = wrapper.find(".CustomerDetailsView-edit");
		expect(editMode.text()).toEqual("Edit");
	});

	it("renders notifications edit mode on", () => {
		const props = {
			header: "notifications",
			editMode: true
		};

		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsView {...props} />
		);

		// get the first span
		const header = wrapper.find(".CustomerDetailsView-header").childAt(0);

		expect(header.text()).toEqual("Notifications");

		const editMode = wrapper.find(".CustomerDetailsView-cancel");
		expect(editMode.text()).toEqual("Cancel");
	});

	it('calls the #toggleEditMode with props.header when "Edit" is clicked', () => {
		const props = {
			header: "notifications",
			editMode: false,
			toggleEditMode: () => {}
		};

		const clickSpy = jest.spyOn(props, "toggleEditMode");

		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsView {...props} />
		);

		const edit = wrapper.find(".CustomerDetailsView-edit");
		edit.simulate("click");
		expect(clickSpy).toHaveBeenCalledWith("notifications");

		clickSpy.mockRestore();
	});

	it('calls the #toggleEditMode with "none" when "Cancel" is clicked', () => {
		const props = {
			header: "notifications",
			editMode: true,
			toggleEditMode: () => {}
		};

		const clickSpy = jest.spyOn(props, "toggleEditMode");

		const wrapper = mountWithContext(
			<CustomerDetailsNotificationsView {...props} />
		);

		const cancel = wrapper.find(".CustomerDetailsView-cancel");
		cancel.simulate("click");
		expect(clickSpy).toHaveBeenCalledWith("none");

		clickSpy.mockRestore();
	});
});
