import * as React from "react";
import { AffectedAddonsList, AffectedAddonsListProps } from "./AffectedAddonsList";
import { shallowWithContext, mountWithContext } from "../../../../../testUtils";

describe("AffectedAddonsList", () => {
	const minProps: AffectedAddonsListProps = {
		titleMessage: {
			id: "mid",
			defaultMessage: "here,{count},addons",
		},
		iconClassName: "fa-test",
		maxInitialCountToShow: 3,
		addonsNames: ["one", "two"],
		className: "custom",
	};

	it("snapshot with minimal props", () => {
		const wrapper = shallowWithContext(<AffectedAddonsList {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("should not render anything when no addons", () => {
		const wrapper = mountWithContext(<AffectedAddonsList {...minProps} addonsNames={[]} />);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});
	it("should not render 'view all' button when addons count is less than max", () => {
		const wrapper = mountWithContext(<AffectedAddonsList {...minProps} maxInitialCountToShow={10} />);
		expect(wrapper.find('[data-test-name="view-all-button"]').exists()).toBeFalsy();
	});
	it("should expand and collapse after clicking 'view all'/'show less' buttons", () => {
		const wrapper = mountWithContext(<AffectedAddonsList {...minProps} maxInitialCountToShow={2} addonsNames={["one", "two", "three"]} />);
		const viewAllButton = wrapper.find('[data-test-name="view-all-button"]');

		expect(wrapper.text()).not.toContain("three");
		expect(wrapper.find('[data-test-name="show-less-button"]').exists()).toBeFalsy();

		viewAllButton.simulate("click");

		expect(wrapper.find('[data-test-name="view-all-button"]').exists()).toBeFalsy();
		expect(wrapper.text()).toContain("three");

		const showLessButton = wrapper.find('[data-test-name="show-less-button"]');
		showLessButton.simulate("click");

		expect(wrapper.text()).not.toContain("three");
		expect(wrapper.find('[data-test-name="view-all-button"]').exists()).toBeTruthy();
		expect(wrapper.find('[data-test-name="show-less-button"]').exists()).toBeFalsy();
	});
});
