import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import CharacteristicsDropdown, {
	CharacteristicsOwnDropdownProps
} from "./CharacteristicsDropdown";
import { Characteristic, HasFlux } from "../../../redux/types";
import mockContext from "./mocks/mockContext";
import actions from "../../../redux/actions";

const setEnhancedCharacteristicsReal = actions.productOfferingConfiguration.setEnhancedCharacteristics;

describe("CharacteristicsDropdown", () => {
	const minProps: CharacteristicsOwnDropdownProps & HasFlux = {
		characteristicKey: "a",
		flux: mockContext.flux as any,
	};

	it("should shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CharacteristicsDropdown {...minProps} />, { context: mockContext });
		expect(wrapper).toMatchSnapshot();
	});

	it("should call setInputtedCharacteristic function with correct path, key and value params when selection is done", done => {
		actions.productOfferingConfiguration.setInputtedCharacteristic = jest.fn(() => ({type: "noop"}));
		const path = [{ po: "1" }];
		const characteristicKey = "awesomness-level";
		const selectValue = "1000";
		const inputCharacteristic = {
			values: [
				{ name: "Super awesome", value: "100" },
				{ name: "Super duper awesome", value: "1000" },
				{ name: "Not so awesome", value: "1" }
			]
		} as any as Characteristic;
		const props = {
			...minProps,
			path,
			characteristicKey,
			inputCharacteristic
		};

		const wrapper = mountWithContext(<CharacteristicsDropdown {...props}/>, { context: mockContext });
		const input = wrapper.find("#icc_select_po-1_awesomness-level");

		input.hostNodes().simulate("change", { target: { value: selectValue } });
		// TODO: remove setTimeout
		setTimeout(() => {
			expect(actions.productOfferingConfiguration.setInputtedCharacteristic).toHaveBeenCalledWith(
				path,
				characteristicKey,
				selectValue
			);
			done();
		}, 1);
	});

	it("should call setEnhancedCharacteristics function with correct path, key and value params when multiple selection is done", done => {
		const setEnhancedCharacteristicsMock = jest.fn(setEnhancedCharacteristicsReal);
		const path = [{ po: "1" }];
		const characteristicKey = "awesomness-level";
		const inputCharacteristic: Characteristic = {
			cardinality: {
				min: 1,
				max: 2
			},
			values: [
				{ name: "Super awesome", value: "100" },
				{ name: "Super duper awesome", value: "1000" },
				{ name: "Not so awesome", value: "1" }
			]
		} as any as Characteristic;
		const props: CharacteristicsOwnDropdownProps & HasFlux = {
			...minProps,
			path,
			characteristicKey,
			inputCharacteristic,
		};
		actions.productOfferingConfiguration.setEnhancedCharacteristics = setEnhancedCharacteristicsMock;
		const wrapper = mountWithContext(<CharacteristicsDropdown {...props}/>, { context: mockContext });
		const input = wrapper.find("#icc_select_po-1_awesomness-level").hostNodes();

		input.simulate("change", { target: { options: [
					{selected: true, value: "1000"},
					{selected: true, value: "100"}
				]}});
		setTimeout(() => {
			expect(setEnhancedCharacteristicsMock).toHaveBeenCalledWith(path, characteristicKey, ["1000", "100"]);
			done();
		}, 1);
	});
});
