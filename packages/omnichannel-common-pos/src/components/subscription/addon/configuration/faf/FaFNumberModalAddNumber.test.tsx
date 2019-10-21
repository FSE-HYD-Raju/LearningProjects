import * as React from "react";
import { shallowWithContext } from "../../../../../testUtils";

import FaFNumberModalAddNumber from "./FaFNumberModalAddNumber";

describe("FaFNumberModalAddNumber", () => {
	const save = jest.fn();
	const onChange = jest.fn();
	const close = jest.fn();

	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(<FaFNumberModalAddNumber save={save} close={close} onChange={onChange} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("calls close when cancel is clicked", () => {
		const wrapper = shallowWithContext(<FaFNumberModalAddNumber save={save} close={close} onChange={onChange} />);
		wrapper.find("#buttonCloseAddField").simulate("click");
		expect(close).toHaveBeenCalled();
	});
});
