import * as React from "react";
import { ReactWrapper } from "enzyme";
import {
	mountWithContext,
	shallowWithContext,
	SimpleDataMock,
} from "../../../testUtils";

const withSchema = require("../../../schemas/withSchema");

import PersonDetailsPostalAddressForm, {
	PersonDetailsPostalAddressFormProps,
} from "./PersonDetailsPostalAddressForm";

type PersonDetailsPostalAddressFormPropsWithoutSchema = Pick<
    PersonDetailsPostalAddressFormProps,
	Exclude<keyof PersonDetailsPostalAddressFormProps, "schema">
>;

describe("PersonDetailsPostalAddressForm", () => {
	let context: any;

	const _minimumProps: PersonDetailsPostalAddressFormPropsWithoutSchema = {
		countries: [
			{
				code: "FI",
				locale: "fin",
				name: "Finlandia"
			},
			{
				code: "IT",
				locale: "ita",
				name: "Italia"
			}
		],
		model: {},
		loading: false,
		handleSubmit: jest.fn(),
		handleInputChange: jest.fn(),
	};
	let minimumProps: PersonDetailsPostalAddressFormPropsWithoutSchema;

	beforeEach(() => {
		context = SimpleDataMock.getConsulContextMock();
		minimumProps = _minimumProps;
	});

	it("succeeds at shallow mount with props", () => {
		const WithSchema = withSchema(["postalAddress"])(
			PersonDetailsPostalAddressForm
		);
		const wrapper = shallowWithContext(
			<WithSchema
			 {...minimumProps} />,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with props", () => {
		const WithSchema = withSchema(["postalAddress"])(
			PersonDetailsPostalAddressForm
		);
		mountWithContext(<WithSchema {...minimumProps} />,
			{ context }
		);
	});

    it("calls given handleInputChange() on any input", () => {
		const WithSchema = withSchema(["postalAddress"])(
			PersonDetailsPostalAddressForm
		);
		mountWithContext(<WithSchema {...minimumProps} />,
			{ context }
		);
    });
});
