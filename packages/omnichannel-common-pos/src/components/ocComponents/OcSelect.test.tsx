import * as React from "react";
import { mount } from "enzyme";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import { map } from "lodash";

import OcSelect from "./OcSelect";

describe("OcSelect", () => {
	const countries = [
		{
			id: "FI",
			name: "Finland"
		},
		{
			id: "IS",
			name: "Iceland"
		}
	];

	it("succeeds a shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcSelect />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds a full mount without props", () => {
		mountWithContext(<OcSelect />);
	});

	/* NOTE this doesn't actually check if placeholder is visible -- it can't be checked with these tools.
     * Thus the point of this test is just to act as a guide, or as "documentation", or to say "yes we've covered this case".
     * This really relies on the browser. If you attach the component to document.body, you can see it with your own eyes.
     */
	it("displays placeholder when defaultValue is not set", () => {
		const placeholder = "Pick a country";
		const props = {
			placeholder
		};

		mount(
			<OcSelect {...props}>
				{countries.map((country, index) => {
					return (
						<option key={`country_${index}`} value={country.id}>
							{country.name}
						</option>
					);
				})}
			</OcSelect>
		);
	});

	/* NOTE this doesn't actually check if defaultValue is visible over placeholder -- it can't be checked with these tools.
     * Thus the point of this test is just to act as a guide, or as "documentation", or to say "yes we've covered this case".
     * This really relies on the browser. If you attach the component to document.body, you can see it with your own eyes.
     */
	it("displays defaultValue even if placeholder is set", () => {
		const placeholder = "Pick a country";
		const props = {
			placeholder,
			defaultValue: countries[0].id
		};

		mount(
			<OcSelect {...props}>
				{countries.map((country, index) => {
					return (
						<option key={`country_${index}`} value={country.id}>
							{country.name}
						</option>
					);
				})}
			</OcSelect>
		);
	});

	/* NOTE this doesn't actually check if defaultValue is initially visible -- it can't be checked with these tools.
     * Thus the point of this test is just to act as a guide, or as "documentation", or to say "yes we've covered this case".
     * This really relies on the browser. If you attach the component to document.body, you can see it with your own eyes.
     */
	it("presents defaultValue as the initially selected value", () => {
		const values = ["foo", "bar", "aybabtu"];

		const wrapper = mountWithContext(
			<OcSelect defaultValue={values[1]}>
				{map(values, (a, idx) => {
					return (
						<option key={idx} value={a}>
							{a}
						</option>
					);
				})}
			</OcSelect>
			// , {attachTo: document.body}
		);

		expect(wrapper.props().defaultValue).toEqual(values[1]);
	});

	it("renders value for prop 'id' when both 'id' and 'name' given", () => {
		const id = "my_id";
		const name = "my_name";
		const wrapper = mount(<OcSelect id={id} name={name} />);

		const select = wrapper.find("select");

		const rId = select.prop("id");
		const rName = select.prop("name");

		expect(rId).toEqual(id);
		expect(rName).toEqual(name);
	});
});
