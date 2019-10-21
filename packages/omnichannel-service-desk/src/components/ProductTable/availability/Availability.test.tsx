import * as React from "react";
import { shallowWithContext } from "omnichannel-common-pos";
import Availability, { AvailabilityProps } from "./Availability";

describe("Availability", () => {
	const minProps: AvailabilityProps = {
		actions: {
			getOrgsAndItsInventories: jest.fn(),
		},
		salesOrgs: [],
		orgIdToInventories: {},
		sku: ""
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<Availability {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
