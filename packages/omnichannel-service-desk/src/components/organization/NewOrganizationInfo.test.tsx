import * as React from "react";
import { shallowWithContext, mountWithContext } from "omnichannel-common-pos";
import NewOrganizationInfo from "./NewOrganizationInfo";

describe("NewOrganizationInfo", () => {
	const minProps = {
		actions: {},
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<NewOrganizationInfo {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders with minimum props", () => {
		const wrapper = mountWithContext(<NewOrganizationInfo {...minProps} />);
		const newOrganizationInfo = wrapper.find(".organization-creation-success");
		expect(newOrganizationInfo.hostNodes()).toHaveLength(1);

		expect(wrapper.find("#organization-creation-success-ok-button").hostNodes()).toHaveLength(1);
	});
});
