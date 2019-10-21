import React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import CustomerDetailsView from "../../../src/components/customer/CustomerDetailsView";

describe("CustomerDetailsView", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CustomerDetailsView />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<CustomerDetailsView />);
	});
});
