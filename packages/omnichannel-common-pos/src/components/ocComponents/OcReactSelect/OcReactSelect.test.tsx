import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import OcReactSelect, { OcReactSelectProps } from "./OcReactSelect";

describe("OcReactSelect", () => {
	const minProps: OcReactSelectProps = {
		onChange: jest.fn(),
		name: "name",
		id: "id",
		options: [],
		required: false,
		valueKey: "valueKey",
		labelKey: "labelKey",
		labelPosition: undefined,
		addonRight: "",
		label: "",
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<OcReactSelect {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<OcReactSelect {...minProps} />);
	});
});
