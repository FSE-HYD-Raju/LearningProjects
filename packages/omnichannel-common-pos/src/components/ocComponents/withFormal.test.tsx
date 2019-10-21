import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import withFormal, { FormalOcInputProps } from "./withFormal";
import OcInput from "./OcInput";

describe("withFormal", () => {
	const MyInput = (props: FormalOcInputProps) => {
		const inputProps = {...props};
		delete inputProps.errorMessage;
		return <input {...inputProps} />;
	};

	const MyFormalInput = withFormal(MyInput);

	const minProps = {
		onChange: (data: any) => {},
		meta: {},
		name: "dummy-name"
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<MyFormalInput {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders a text input as child", () => {
		mountWithContext(<MyFormalInput type="text" {...minProps} />);
	});

	it("passes data in correct format on input", done => {
		minProps.onChange = (data: any) => {
			expect(typeof data).not.toEqual("object");
			expect(data).toEqual("foo");
			done();
		};

		const wrapper = mountWithContext(<MyFormalInput {...minProps} />);
		wrapper
			.find("input")
			.simulate("change", { target: { value: "foo" } });
	});

	it("renders as OcInput of type radio", () => {
		const MyFormalInput = withFormal(OcInput);

		const wrapper = mountWithContext(<MyFormalInput inputType="radio" {...minProps} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find("input").prop("type")).toEqual("radio");
	});
});
