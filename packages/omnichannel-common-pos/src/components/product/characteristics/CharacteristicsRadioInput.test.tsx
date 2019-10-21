import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import CharacteristicsRadioInput from "./CharacteristicsRadioInput";
import { Characteristic } from "../../../redux/types";
import mockContext from "./mocks/mockContext";
import { productOfferingConfiguration } from "../../../redux/models/productOfferingConfiguration/productOfferingConfiguration.actions";

describe("CharacteristicsRadioInput", () => {
	const minProps = {
		path: [],
		characteristicKey: "any",
		flux: mockContext.flux as any,
	};

	it("should shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CharacteristicsRadioInput {...minProps} />, { context: mockContext });
		expect(wrapper).toMatchSnapshot();
	});

	it("should call setInputtedCharacteristic function with correct path, key and value params when selection is done", done => {
		productOfferingConfiguration.setInputtedCharacteristic = jest.fn(() => ({type: "noop"}));
		const path = [{ po: "1" }];
		const characteristicKey = "awesomness-level";
		const selectedValue = "1000";
		const inputCharacteristic = {
			values: [
				{ name: "Super awesome", value: "100" },
				{ name: "Super duper awesome", value: "1000" },
				{ name: "Not so awesome", value: "1" }
			]
		} as any as Characteristic;
		const wrapper = mountWithContext(
			<CharacteristicsRadioInput
				{...minProps}
				path={path}
				characteristicKey={characteristicKey}
				inputCharacteristic={inputCharacteristic}
			/>, { context: mockContext }
		);
		const input = wrapper.find("#icc_radio_po-1_1000").hostNodes().at(0);
		input.simulate("click", { target: { value: selectedValue } });
		setTimeout(() => {
			expect(productOfferingConfiguration.setInputtedCharacteristic).toHaveBeenCalledWith(
				path,
				characteristicKey,
				selectedValue
			);
			done();
		}, 1);
	});
});
