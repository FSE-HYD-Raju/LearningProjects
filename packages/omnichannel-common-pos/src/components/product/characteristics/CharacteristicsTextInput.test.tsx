import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import CharacteristicsTextInput from "./CharacteristicsTextInput";

describe("CharacteristicsTextInput", () => {
	const minProps = {
		characteristicKey: "key",
		characteristicValue: "none",
		onChange: jest.fn(),
		index: 0,
		styles: {},
	};

	it("should shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CharacteristicsTextInput {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should call onChange function with correct path, key and value params when input is changed", done => {
		const onChangeMock = minProps.onChange;
		const path = [{ po: "1" }];
		const characteristicKey = "awesomness-level";
		const props = {
			...minProps,
			path,
			characteristicKey,
		};
		const wrapper = mountWithContext(<CharacteristicsTextInput {...props}/>);

		const input = wrapper.find("#icc_input_po-1_awesomness-level-0");

		const inputValue = "Uber awesome";
		const index = 0;
		input.hostNodes().simulate("change", { target: { value: inputValue } });
		setTimeout(() => {
			expect(onChangeMock).toHaveBeenCalledWith(
				path,
				characteristicKey,
				inputValue,
				index
			);
			done();
		}, 1);
	});
});
