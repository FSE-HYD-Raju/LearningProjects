import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcDropdown from "./OcDropdown";

describe("OcDropdown", () => {
	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<OcDropdown dropdownKey="dummy-key" />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<OcDropdown dropdownKey="dummy-key" />);
	});

	it("should set given marginTop for inner-container", () => {
		const marginTop = "10px";

		const wrapper = mountWithContext(
			<OcDropdown dropdownKey="dummy-key" marginTop={marginTop} />
		);
		expect(
			wrapper.find(".OcDropdown-inner-container").prop("style").marginTop
		).toEqual(marginTop);
	});

	it("should use props.triangleColor", () => {
		const triangleColor = "blue";

		const wrapper = mountWithContext(
			<OcDropdown dropdownKey="dummy-key" triangleColor={triangleColor} />
		);

		expect(
			wrapper.find(".OcDropdown-triangle").prop("style").borderColor
		).toMatch(new RegExp("transparent transparent " + triangleColor));

		expect(
			wrapper.find(".OcDropdown-content").prop("style").borderTopColor
		).toEqual(triangleColor);
	});
});
