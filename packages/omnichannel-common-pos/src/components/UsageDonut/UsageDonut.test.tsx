import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import UsageDonut, { UsageDonutProps } from "./UsageDonut";

describe("UsageDonut", () => {
	let minProps: UsageDonutProps;
	beforeAll(() => {
		minProps = {
			percentage: 85
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<UsageDonut {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<UsageDonut {...minProps} />);
	});

	it("doesn't render title when 'title' property isn't passed", () => {
		const wrapper = mountWithContext(<UsageDonut {...minProps} />);
		const titleBlock = wrapper.find("#UsageDonut-title").at(0);
		expect(titleBlock.length).toBe(0);
	});

	it("renders icon when 'icon' property is passed", () => {
		minProps.icon = "&#xf1eb;";
		const wrapper = mountWithContext(<UsageDonut {...minProps} />);
		const iconBlock = wrapper.find(".UsageDonut-icon").at(0);
		expect(iconBlock).toBeTruthy();
	});

	it("doesn't render primary text when this property isn't passed", () => {
		const wrapper = mountWithContext(<UsageDonut {...minProps} />);
		const primaryTextBlock = wrapper.find(".UsageDonut-text-primary").at(0);
		expect(primaryTextBlock.length).toBe(0);
	});

	it("renders secondary text when this property is passed", () => {
		minProps.secondaryText = "Left of 1000";
		const wrapper = mountWithContext(<UsageDonut {...minProps} />);
		const secondaryTextBlock = wrapper.find(".UsageDonut-text-secondary").at(0);
		expect(secondaryTextBlock).toBeTruthy();
	});

	it("renders graph with a 'graph-danger' className only when percentage left is less than 10", () => {
		minProps.percentage = 18;
		const wrapper = mountWithContext(<UsageDonut {...minProps} />);
		expect(wrapper.find(".UsageDonut-graph-danger").at(0).length).toBe(0);
	});
});
