import * as React from "react";
import OrganizationSelect, { OrganizationSelectProps } from "./OrganizationSelect";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import { ReactWrapper, ShallowWrapper } from "enzyme";

describe("OrganizationSelect", () => {
	let wrapper: ShallowWrapper | ReactWrapper;
	let props: OrganizationSelectProps;
	const onOrganizationSelectChange = jest.fn();
	const onOrganizationSelectCheckboxChange = jest.fn();
	beforeEach(() => {
		props = {
			organizations: [
				{
					relatedPersonId: "123"
				}
			],
			showOrganizationSelect: false,
			selectedOrganizationId: "",
			getOrganizationById: jest.fn(),
			onOrganizationSelectChange: onOrganizationSelectChange,
			onOrganizationCheckboxChange: onOrganizationSelectCheckboxChange
		};
	});

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	it("succeeds at shallow mount with min props", () => {
		wrapper = shallowWithContext(<OrganizationSelect {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should show organization select dropdown when show organizationSelect checkbox is clicked", () => {
		props.showOrganizationSelect = true;
		const wrapper = mountWithContext(<OrganizationSelect {...props} />);
		wrapper.setState({ organizations: [{ id: "1", formattedName: "1. Company" }, { id: "2", formattedName: "2. Company" }] });
		wrapper.update();
		expect(onOrganizationSelectChange.mock.calls.length).toBe(1);
		const select = wrapper.find("#organization-select").at(0);
		select.simulate("change", {target: { value : "1"}});
		wrapper.update();
		expect(onOrganizationSelectChange.mock.calls.length).toBe(2);
	});
});
