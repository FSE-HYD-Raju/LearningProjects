/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { shallow, mount } from "enzyme";

import { FluidContainer, FluidContainerProps } from "./FluidContainer";

describe("FluidContainer", () => {
	const content = <div>{"content"}</div>;

	const minimumProps: FluidContainerProps = {
		children: content,
		height: "auto"
	};

	it("shallow mount with minimum props", () => {
		const wrapper = shallow(<FluidContainer {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("deep mount with minimum props", () => {
		mount(<FluidContainer {...minimumProps} />);
	});

	it("uses Collapse as animator", () => {
		const wrapper = mount(<FluidContainer height={0}>{content}</FluidContainer>);
		expect(wrapper.find("Collapse").length).toEqual(1);
	});

	it("renders with children", () => {
		const wrapper = mount(<FluidContainer height={0}>{content}</FluidContainer>);
		expect(wrapper.text()).toContain("content");
	});

	it("is opened when height is 'auto'", () => {
		const wrapper = mount(
			<FluidContainer height="auto">{content}</FluidContainer>
		);
		expect((wrapper.find("Collapse").props() as any).isOpened).toEqual(true);
	});

	it("is closed when height is not equal to 'auto'", () => {
		const wrapper = mount(
			<FluidContainer height="5px">{content}</FluidContainer>
		);
		expect((wrapper.find("Collapse").props() as any).isOpened).toEqual(false);
	});

	it("passes other params to Collapse", () => {
		const wrapper = mount(
			<FluidContainer height="auto" hasNestedCollapse={true}>
				{content}
			</FluidContainer>
		);
		expect((wrapper.find("Collapse").props() as any).hasNestedCollapse).toEqual(
			true
		);
	});
});
