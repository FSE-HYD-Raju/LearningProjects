import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import PortIn from "./PortIn";

describe("PortIn", () => {
	it("Successful initial rendering of component", () => {
		const props = {
			onChange: jest.fn(),
			selected: ""
		};
		const wrapper = shallowWithContext(<PortIn {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Call onChange() method in initial rendering", () => {
		const props = {
			onChange: jest.fn(),
			selected: ""
		};
		mountWithContext(<PortIn {...props} />);
		expect(props.onChange).toBeCalled();
	});

	it("Check that \"keep old number\" selection is checked instead of \"change number\" selection when props \"selected\" is true", () => {
		const props = {
			onChange: jest.fn(),
			selected: true
		};
		const wrapper = mountWithContext(<PortIn {...props} />);
		const inputKeep = wrapper.find("input[id=\"keep\"]");
		expect(inputKeep.prop("checked")).toEqual(true);

		const inputChange = wrapper.find("input[id=\"change\"]");
		expect(inputChange.prop("checked")).toEqual(false);
	});

	it("Check that \"change number\" selection is checked instead of \"keep old number\" selection when props \"selected\" is false", () => {
		const props = {
			onChange: jest.fn(),
			selected: false
		};
		const wrapper = mountWithContext(<PortIn {...props} />);
		const inputKeep = wrapper.find("input[id=\"keep\"]");
		expect(inputKeep.prop("checked")).toEqual(false);

		const inputChange = wrapper.find("input[id=\"change\"]");
		expect(inputChange.prop("checked")).toEqual(true);
	});

	it("Check that \"keep old number\" input click doesn\"t call the onChange function when props \"selected\" is true", () => {
		const props = {
			onChange: jest.fn(),
			selected: true
		};

		const wrapper = shallowWithContext(<PortIn {...props} />);

		wrapper.instance().handleChange({ target: { value: "true" } });

		expect(props.onChange).not.toBeCalled();
	});

	it("Check that \"keep old number\" input click calls the onChange function when props \"selected\" is false", () => {
		const props = {
			onChange: jest.fn(),
			selected: false
		};
		const wrapper = shallowWithContext(<PortIn {...props} />);
		wrapper.instance().handleChange({ target: { value: "true" } });

		expect(props.onChange).toBeCalled();
	});
});
