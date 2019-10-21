import * as React from "react";
import { shallow } from "enzyme";
import { mountWithContext } from "omnichannel-common-pos";

import TechnicalDetails from "./TechnicalDetails";

describe("TechnicalDetails", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<TechnicalDetails />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<TechnicalDetails />);
	});

	it("renders provided featureCharacteristics and instanceCharacteristics", () => {
		const props = {
			featureCharacteristics: [
				{ value: "water resistant", name: "Water Resistant" },
				{ value: "multitouch", name: "Multitouch" }
			],
			instanceCharacteristics: {
				os: {
					values: [{ value: "Android v4", name: "Android v4" }],
					mandatory: false,
					name: "OS"
				}
			}
		};

		const wrapper = mountWithContext(<TechnicalDetails {...props} />);

		expect(wrapper.text()).toContain("Water Resistant");
		expect(wrapper.text()).toContain("Multitouch");
		expect(wrapper.text()).toContain("OS");
		expect(wrapper.text()).toContain("Android v4");
	});
});
