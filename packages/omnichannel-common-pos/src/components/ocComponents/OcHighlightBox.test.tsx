import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcHighlightBox from "./OcHighlightBox";
import FormattedMessage from "../../channelUtils/FormattedMessage";

describe("OcHighlightBox", () => {
	it("succeeds at shallow mount without props", () => {
		// @ts-ignore
		const wrapper = shallowWithContext(<OcHighlightBox />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		// @ts-ignore
		const wrapper = mountWithContext(<OcHighlightBox />);
		expect(wrapper).toMatchSnapshot();
	});

	const highlightBorder = (border: "top" | "right" | "bottom" | "left") =>
		mountWithContext(<OcHighlightBox position={border} />);

	it("should highlight the top border", () => {
		expect(
			highlightBorder("top").find(".OcHighlightBox-top").length
		).toEqual(1);
	});

	it("should highlight the right border", () => {
		expect(
			highlightBorder("right").find(".OcHighlightBox-right").length
		).toEqual(1);
	});

	it("should highlight the bottom border", () => {
		expect(
			highlightBorder("bottom").find(".OcHighlightBox-bottom").length
		).toEqual(1);
	});

	it("should highlight the left border", () => {
		expect(
			highlightBorder("left").find(".OcHighlightBox-left").length
		).toEqual(1);
	});

	it("should apply classes from props", () => {
		const props = {
			className:
				"OcHighlightBox-are-belong-to-us OcHighlightBox-foo-bar OcHighlightBox-all-your-base"
		};

		const wrapper = mountWithContext(<OcHighlightBox {...props} />);

		props.className.split(" ").forEach(className => {
			expect(wrapper.find("." + className).length).toBeGreaterThan(0);
		});
	});

	it("should apply styles from props", () => {
		const props = {
			style: {
				borderWidth: "3px 0 0 0",
				borderColor: "#E1E1E1" /* same as rgb(225, 225, 225) */
			}
		};

		const wrapper = mountWithContext(<OcHighlightBox {...props} />);

		const element = wrapper.find(".OcHighlightBox");
		const styles = element.prop("style");
		expect(styles).toBeDefined();
		// @ts-ignore
		expect(styles.borderWidth).toMatch(/^3px 0 0/);
		// @ts-ignore
		expect(styles.borderColor).toBeDefined();
		// @ts-ignore
		expect(styles.borderColor.toLowerCase()).toEqual("#e1e1e1");
	});

	it("should render with children", () => {
		const props = {
			children: (
				<React.Fragment>
					<FormattedMessage
						key="1"
						id="child-1"
						description="OcHighlightBox child 1"
						defaultMessage="Child 1"
					/>
					<FormattedMessage
						key="2"
						id="child-2"
						description="OcHighlightBox child 2"
						defaultMessage="Child 2"
					/>
				</React.Fragment>
			)
		};

		const wrapper = mountWithContext(<OcHighlightBox {...props} />);

		const children = wrapper
			.childAt(0)
			.children()
			.children();
		expect(children.length).toEqual(2);
		expect(children.at(0).text()).toEqual("Child 1");
		expect(children.at(1).text()).toEqual("Child 2");
	});
});
