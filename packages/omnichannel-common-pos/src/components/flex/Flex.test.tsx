import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils/index";

import Flex from "./Flex";

describe("Flex", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<Flex />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<Flex />);
	});

	it("should render as an empty container without props", () => {
		const wrapper = mountWithContext(<Flex />);
		const node = wrapper.at(0);
		expect(node.text()).toEqual("");
		expect(wrapper.children().children().length).toEqual(0);
	});

	it("should apply default props when no props given", () => {
		const wrapper = mountWithContext(<Flex />);
		const flex = wrapper.find(".Flex");

		const props = wrapper.props();
		expect(props.alignItems).toEqual("");
		expect(props.justifyContent).toEqual("");
		expect(props.alignSelf).toEqual("");
		expect(props.wrap).toEqual("wrap");

		expect(flex.props().style.flex).toEqual("initial");
		expect(flex.instance().classList.length).toEqual(2);
		expect(flex.instance().classList).toContain("Flex");
		expect(flex.instance().classList).toContain("Flex-wrap");
	});

	it("should use given className", () => {
		const className = "my-custom-class";

		const wrapper = mountWithContext(<Flex className={className} />);

		expect(wrapper.find(".Flex-" + className).length).toEqual(1);
	});

	it("should use given flex number", () => {
		const flexValue = 0.6;

		const wrapper = mountWithContext(<Flex flex={flexValue} />);

		const style = wrapper.find(".Flex").instance().style;
		expect(style.flex.split(" ")).toContain("" + flexValue);
	});

	describe("should apply align-* classes", () => {
		[
			{
				prop: "flex-start",
				className: "Flex-align-start"
			},
			{
				prop: "center",
				className: "Flex-align-center"
			},
			{
				prop: "flex-end",
				className: "Flex-align-end"
			},
			{
				prop: "start",
				className: "Flex-align-start"
			},
			{
				prop: "end",
				className: "Flex-align-end"
			}
		].forEach((argv: any) => {
			it('applies alignItems="' + argv.prop + '"', () => {
				const wrapper = mountWithContext(
					<Flex alignItems={argv.prop} />
				);

				expect(wrapper.find(".Flex." + argv.className).length).toEqual(1);
			});
		});
	});

	describe("should apply justify-* classes", () => {
		[
			{
				prop: "flex-start",
				className: "Flex-justify-start"
			},
			{
				prop: "center",
				className: "Flex-justify-center"
			},
			{
				prop: "flex-end",
				className: "Flex-justify-end"
			},
			{
				prop: "space-around",
				className: "Flex-justify-space-around"
			},
			{
				prop: "space-between",
				className: "Flex-justify-space-between"
			},
			{
				prop: "start",
				className: "Flex-justify-start"
			},
			{
				prop: "end",
				className: "Flex-justify-end"
			},
			{
				prop: "around",
				className: "Flex-justify-space-around"
			},
			{
				prop: "between",
				className: "Flex-justify-space-between"
			}
		].forEach((argv: any) => {
			it('applies justifyContent="' + argv.prop + '"', () => {
				const wrapper = mountWithContext(
					<Flex justifyContent={argv.prop} />
				);

				expect(wrapper.find(".Flex." + argv.className).length).toEqual(
					1
				);
			});
		});
	});

	describe("should apply align-self-* classes", () => {
		[
			{
				prop: "start",
				className: "align-self-start"
			},
			{
				prop: "center",
				className: "align-self-center"
			},
			{
				prop: "end",
				className: "align-self-end"
			}
		].forEach((argv: any) => {
			it('applies alignSelf="' + argv.prop + '"', () => {
				const wrapper = mountWithContext(
					<Flex alignSelf={argv.prop} />
				);

				expect(wrapper.find(".Flex." + argv.className).length).toEqual(1);
			});
		});
	});

	describe("should apply wrap* classes", () => {
		[
			{
				prop: "wrap",
				className: "Flex-wrap"
			},
			{
				prop: "wrap-reverse",
				className: "Flex-wrap-reverse"
			}
		].forEach((argv: any) => {
			it('applies wrap="' + argv.prop + '"', () => {
				const wrapper = mountWithContext(<Flex wrap={argv.prop} />);

				expect(wrapper.find(".Flex." + argv.className).length).toEqual(1);
			});
		});
	});
});
