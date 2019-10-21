import * as React from "react";
import {
	shallowWithContext,
	mountWithContext,
} from "../../../testUtils";
import CharacteristicsInputElement from "./CharacteristicsInputElement";
import { Characteristic, NominationCharacteristics, ProductOffering } from "../../../redux";
import mockContext from "./mocks/mockContext";
import { InputTypesEnum } from "./InputTypes";

describe("CharacteristicsInputElement", () => {
	const inputCharacteristic = {
		values: [
			{ name: "Awesome", value: "100" },
			{ name: "Super awesome", value: "1000" },
			{ name: "Not awesome", value: "1" }
		]
	} as any as Characteristic;
	const minProps = {
		clearProductOfferingErrors: jest.fn(),
		setInputtedCharacteristic: jest.fn(),
		inputCharacteristic,
		path: [],
		characteristicKey: "CH",
		inputtedCharacteristics: {},
		icc_display_mode: "aaa",
		product: {} as any as ProductOffering,
		nominationPOCharacteristics: {} as any as NominationCharacteristics,
		isNominationPO: false,
	};

	it("should shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CharacteristicsInputElement {...minProps} />, { context: mockContext });
		expect(wrapper).toMatchSnapshot();
	});

	it("should render dropdown if inputCharacteristic has values", () => {
		const props = {
			...minProps,
			icc_display_mode: InputTypesEnum.DROPDOWN,
		};
		const wrapper = mountWithContext(<CharacteristicsInputElement {...props}/>, { context: mockContext });
		const options = wrapper.find("option");
		expect(options.length).toBe(4);
	});

	it("should render radio if inputCharacteristic has values and sub-type is radio", () => {
		const props = {
			...minProps,
			icc_display_mode: "radio",
		};
		const wrapper = mountWithContext(<CharacteristicsInputElement {...props}/>, { context: mockContext });
		const input = wrapper.find("[type=\"radio\"]");
		expect(input.exists()).toBeTruthy();
	});

	it("should render date time period if inputCharacteristic data type is date-time-period", () => {
		const props = {
			...minProps,
			inputCharacteristic: {
				dataType: InputTypesEnum.DATE_TIME_PERIOD,
			} as any as Characteristic,
		};

		const wrapper = mountWithContext(<CharacteristicsInputElement {...props}/>, { context: mockContext });
		const datePicker = wrapper.find(".OcDatePicker");
		expect(datePicker.exists()).toBeTruthy();
	});
});
