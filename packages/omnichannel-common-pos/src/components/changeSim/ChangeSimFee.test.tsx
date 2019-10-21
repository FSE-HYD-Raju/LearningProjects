import * as React from "react";
import ChangeSimFee from "./ChangeSimFee";
import { shallowWithContext } from "../../testUtils";

describe("ChangeSimFee", () => {
	const minProps = {
		feeAmount: { taxFreeAmount: 1, currency: "EUR" },
		feeTitle: "test"
	};

	it("should render null when no data", () => {
		const wrapper = shallowWithContext(<ChangeSimFee />);
		expect(wrapper.type()).toBeNull();
	});

	it("succeeds at shallow mount with minimal props ", () => {
		const wrapper = shallowWithContext(<ChangeSimFee {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
