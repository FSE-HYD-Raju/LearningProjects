import React from "react";
import toJson from "enzyme-to-json";

import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import POSCheckoutWizard from "../src/checkout/POSCheckoutWizard";

describe("POSCheckoutWizard", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<POSCheckoutWizard />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<POSCheckoutWizard />);
	});
});
