import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import ActivateSimBanner, { ActivateSimBannerProps } from "./ActivateSimBanner";

describe("ActivateSimBanner", () => {
	let props: ActivateSimBannerProps;
	beforeEach(() => {
		props = ({
			name: "Anna"
		} as any) as ActivateSimBannerProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ActivateSimBanner {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ActivateSimBanner {...props} />);
	});

	it("displays user's name passed via props", () => {
		const wrapper = mountWithContext(<ActivateSimBanner {...props} />);
		const headerText = wrapper.find(".ActivateSimBanner-header").at(0);
		const expectedText = new RegExp(props.name);
		expect(headerText.text()).toMatch(expectedText);
	});

	it("calls action when Activate button is clicked", () => {
		const wrapper = mountWithContext(<ActivateSimBanner {...props} />);
		expect(wrapper.find("ActivateSimModal").props().show).toBeFalsy();

		const activateBtn = wrapper.find("#activate-sim-button").at(0);
		activateBtn.simulate("click");

		expect(wrapper.find("ActivateSimModal").props().show).toBeTruthy();
	});
});
