import * as React from "react";
import { shallow } from "enzyme";

import { mountWithContext } from "../../testUtils";

import OcNotFound from "./OcNotFound";

describe("OcNotFound", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<OcNotFound />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcNotFound />);
	});

	it("should display the default 'Not found 404' message", () => {
		const wrapper = mountWithContext(<OcNotFound />);
		expect(wrapper.find("OcNotFound").text()).toEqual("Not found 404");
	});
});
