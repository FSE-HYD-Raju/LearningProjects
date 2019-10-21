import * as React from "react";
import RefreshButton from "./RefreshButton";
import { mountWithContext, shallowWithContext } from "../../testUtils";

describe("RefreshButton", () => {
	const minProps = {
		refresh: jest.fn(),
		updating: false,
		buttonId: "buttonId",
	};
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<RefreshButton {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<RefreshButton {...minProps}/>);
	});

	it("renders refresh link with minimum props", () => {
		const wrapper = mountWithContext(<RefreshButton {...minProps} />);
		expect(wrapper.text()).toContain("Refresh");
		const icon = wrapper.find("i");
		expect(icon.length).toBe(1);
		expect(icon.hasClass("fa-sync-alt")).toBeTruthy();
		expect(icon.hasClass("fa-spin")).toBeFalsy();
	});

	it("renders refresh link, with spinning icon", () => {
		const wrapper = mountWithContext(<RefreshButton {...minProps} updating={true} />);
		const icon = wrapper.find("i");
		expect(icon.length).toBe(1);
		expect(icon.hasClass("fa-sync-alt")).toBeTruthy();
		expect(icon.hasClass("fa-spin")).toBeTruthy();
	});
});
