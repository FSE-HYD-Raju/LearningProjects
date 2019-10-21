import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import SupportRequestDetails from "../supportRequest/SupportRequestDetails";
import { SupportRequestDetailsProps } from "./SupportRequestDetails";

describe("SupportRequestDetails", () => {
	let minimumProps: SupportRequestDetailsProps;

	beforeAll(() => {
		minimumProps = {
			resolution: "Resolved",
			description: "case is obsolete"
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<SupportRequestDetails {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<SupportRequestDetails {...minimumProps} />);
	});
});
