import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../../../testUtils";

import FaFConfirmation from "./FaFConfirmation";

describe("FaFConfirmation", () => {
	const value = "123";
	const price = "100e";

	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(<FaFConfirmation value={value} price={price} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("shows price information if defined", () => {
		const wrapper = mountWithContext(<FaFConfirmation value={value} price={price} />);
		expect(wrapper.find(".FaFNumberModal-confirmModal").text()).toContain(price);
	});
});
