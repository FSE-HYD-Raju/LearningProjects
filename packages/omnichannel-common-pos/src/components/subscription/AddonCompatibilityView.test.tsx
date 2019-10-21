import * as React from "react";
import { mountWithContext } from "../../testUtils";
import AddonCompatibilityView, { AddonCompatibilityViewProps } from "./AddonCompatibilityView";

describe("AddonCompatibilityView", () => {
	const simpleProps = {
		addons: {
			compatible: [
				{
					id: "compatible-addon-id-1",
					name: "compatible-addon-1-name"
				},
				{
					id: "compatible-addon-id-2",
					name: "compatible-addon-2-name"
				},
				{
					id: "compatible-addon-id-3",
					name: "compatible-addon-3-name"
				},
				{
					id: "compatible-addon-id-4",
					name: "compatible-addon-4-name"
				}
			],
			incompatible: [
				{
					id: "incompatible-addon-id-1",
					name: "incompatible-addon-1-name"
				},
				{
					id: "incompatible-addon-id-2",
					name: "incompatible-addon-2-name"
				},
				{
					id: "incompatible-addon-id-3",
					name: "incompatible-addon-3-name"
				}
			]
		}
	} as AddonCompatibilityViewProps;

	it("succeeds at deep mount with simple props", () => {
		mountWithContext(<AddonCompatibilityView {...simpleProps} />);
	});

	it("succeeds at shallow mount with simple props", () => {
		const wrapper = mountWithContext(<AddonCompatibilityView {...simpleProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders message if there are no compatibility notes to mention about", () => {
		const props = {
			addons: {
				compatible: [],
				incompatible: []
			}
		} as AddonCompatibilityViewProps;

		const wrapper = mountWithContext(<AddonCompatibilityView {...props} />);

		expect(wrapper.find("#addon-compatibility-no-compatibility-issues").length).toBe(2); // one for wrapper one for message itself
	});

	it("renders 'more' link if more than 3 addons are rendered and hides additional ones", () => {
		const wrapper = mountWithContext(<AddonCompatibilityView {...simpleProps} />);

		// compatible (should have 4 items, one of them hidden and also showing the link)
		expect(wrapper.find(".compatible .compatibility-items .show-all-items").length).toBe(1);
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item").length).toBe(4);
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item.hide").length).toBe(1);

		// incompatible (should have 3 items, none of them hidden and also not showing the link)
		expect(wrapper.find(".incompatible .compatibility-items .show-all-items").length).toBe(0);
		expect(wrapper.find(".incompatible .compatibility-items .compatibility-item").length).toBe(3);
		expect(wrapper.find(".incompatible .compatibility-items .compatibility-item.hide").length).toBe(0);

		// shouldn't render note about no addon information to show
		expect(wrapper.find("#addon-compatibility-no-compatibility-issues").length).toBe(0);
	});

	it("renders all addons when 'more' link is clicked and hides the link", () => {
		const wrapper = mountWithContext(<AddonCompatibilityView {...simpleProps} />);

		// compatible (should have 4 items, one of them hidden and also showing the link)
		expect(wrapper.find(".compatible .compatibility-items .show-all-items").length).toBe(1);
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item").length).toBe(4);
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item.hide").length).toBe(1);

		wrapper
			.find(".compatible .compatibility-items .show-all-items")
			.hostNodes()
			.simulate("click");

		// compatible (should have 4 items visible and 'more' link hidden)
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item").length).toBe(4);
		expect(wrapper.find(".compatible .compatibility-items .compatibility-item.hide").length).toBe(0);
		expect(wrapper.find(".compatible .compatibility-items .show-all-items").length).toBe(0);

		// shouldn't render note about no addon information to show
		expect(wrapper.find("#addon-compatibility-no-compatibility-issues").length).toBe(0);
	});
});
