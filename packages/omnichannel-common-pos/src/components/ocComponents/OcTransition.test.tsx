/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { mount, shallow } from "enzyme";

import OcTransition from "./OcTransition";

describe("OcTransition", () => {
	it("succeeds at shallow mount with min props and with child", () => {
		const wrapper = shallow(
			<OcTransition>
				<span />
			</OcTransition>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props and with exactly one child", () => {
		const wrapper = mount(
			<OcTransition>
				<span />
			</OcTransition>
		);

		expect(wrapper.find("span").length).toEqual(1);
	});

	it("should render children", () => {
		const wrapper = mount(
			<OcTransition>
				<span>{"hello"}</span>
			</OcTransition>
		);

		expect(wrapper.find("span").length).toEqual(1);
		expect(wrapper.text()).toEqual("hello");
	});

	it("should have a FluidContainer with height 'auto' when expanded", () => {
		const wrapper = mount(
			<OcTransition expanded={true}>
				<span>{"hello"}</span>
			</OcTransition>
		);

		expect(wrapper.find("FluidContainer").prop("height")).toEqual("auto");
	});

	it("should have height '0' when minimized", () => {
		const wrapper = mount(
			<OcTransition expanded={false}>
				<span>{"hello"}</span>
			</OcTransition>
		);

		expect("" + wrapper.find("FluidContainer").prop("height")).toEqual("0");
	});
});
