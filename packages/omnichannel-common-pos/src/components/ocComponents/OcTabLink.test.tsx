import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import OcTabLink from "./OcTabLink";

describe("OcTabLink", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcTabLink to="/" />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount without props", () => {
		mountWithContext(<OcTabLink to="/" />);
	});
});
