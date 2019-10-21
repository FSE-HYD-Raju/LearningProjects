import * as React from "react";
import yup from "yup";
import {
	attachWithContext,
	detach,
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../testUtils";
import OcSelectCountry from "./OcSelectCountry";

const Form = require("react-formal");

describe("OcSelectCountry", () => {
	const countries = [
		{
			code: "AL",
			name: "Albania"
		},
		{
			code: "FI",
			name: "Finland"
		},
		{
			code: "GB",
			name: "United Kingdom"
		},
		{
			code: "US",
			name: "United States of America"
		},
		{
			code: "RU",
			name: "Russia"
		},
		{
			code: "SE",
			name: "Sweden"
		}
	];

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<OcSelectCountry countries={[]} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount minimum props", () => {
		mountWithContext(<OcSelectCountry countries={[]} />);
	});

	/* RND-11179 */
	it("should fail if no countries given", () => {
		expect(() => {
			// @ts-ignore
			mountWithContext(<OcSelectCountry/>);
		}).toThrow();
	});

	it("presents countries given via props", () => {
		const { getValueAndTextFromSelectOptions } = TestUtils;

		const wrapper = mountWithContext(
			<OcSelectCountry countries={countries} />
		);

		const rCountries = getValueAndTextFromSelectOptions(
			wrapper.find("select"),
			true
		).map((entry: {value: string, text: string}) => {
			return {
				code: entry.value,
				name: entry.text
			};
		});
		expect(rCountries.length).toEqual(countries.length);

		rCountries.forEach((country: {code: string, name: string}, idx: number) => {
			expect(country).toEqual(countries[idx]);
		});
	});

	it("placeholder should be a disabled option", () => {
		const wrapper = mountWithContext(
			<OcSelectCountry countries={countries} />
		);

		const label = wrapper.find("select option").filterWhere((n: any) => {
			return n.prop("disabled");
		});
		expect(label.length).toEqual(1);
		expect(label.text().toLowerCase()).toEqual(
			"Pick your country".toLowerCase()
		);
	});

	it("shows an error message", () => {
		const errorMessage = "Berzerkistan is a fake country";

		const wrapper = mountWithContext(
			<OcSelectCountry
				countries={countries}
				errorMessage={errorMessage}
			/>
		);

		const invalidFeedback = wrapper.find(".invalid-feedback");
		expect(invalidFeedback.length).toEqual(1);
		expect(invalidFeedback.text()).toEqual(errorMessage);
	});

	it("presents given countries when in a Form", () => {
		const { getValueAndTextFromSelectOptions } = TestUtils;
		const placeholder: string = "Country";

		const wrapper = attachWithContext(
			<Form
				value={{
					country: "United Kingdom"
				}}
				onChange={() => {}}
				schema={yup.object({
					country: yup.string()
				})}
			>
				<Form.Field
					name="country"
					placeholder={placeholder}
					type={OcSelectCountry}
					countries={countries}
				/>
			</Form>
		);

		const rCountries = getValueAndTextFromSelectOptions(
			wrapper.find("select"),
			true
		);
		expect(rCountries.length).toEqual(countries.length);

		detach(wrapper);
	});
});
