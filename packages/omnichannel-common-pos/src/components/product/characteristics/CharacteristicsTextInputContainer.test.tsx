import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import {
	CharacteristicsTextInputContainer,
	CharacteristicsTextInputContainerProps
} from "./CharacteristicsTextInputContainer";
import { Characteristic, ProductOffering, NominationCharacteristics } from "../../../redux/types";
import mockContext from "./mocks/mockContext";

describe("CharacteristicsTextInputContainer", () => {
	const minProps: CharacteristicsTextInputContainerProps = {
		path: [],
		product: {} as any as ProductOffering,
		nominationPOCharacteristics: {} as any as NominationCharacteristics,
		actions: {
			setInputtedCharacteristic: jest.fn(),
			setEnhancedCharacteristics: jest.fn(),
			resetConfigurations: jest.fn(),
			...mockContext.flux.actions.BasketActions,
		},
		characteristicsAliases: {},
		characteristicKey: "any",
		ICCIDPreactivationValidationPOs: [],
		msisdnConfiguration: {
			countryCode: 591
		},
	};

	const path = [{ po: "1" }];
	const characteristicKey = "favorite-foods";

	it("should shallow mount without props", () => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });
		expect(wrapper).toMatchSnapshot();
	});

	it("canConfigureMore should return true if given inputCharacteristic.cardinality.max is greater current characteristics array size", () => {
		const inputCharacteristic = {
			cardinality: {
				max: 2
			}
		} as any as Characteristic;
		const wrapper = mountWithContext(
			<CharacteristicsTextInputContainer
				{...minProps}
				inputCharacteristic={inputCharacteristic}
			/>
		);

		const canConfigureMore = wrapper.instance().canConfigureMore();
		expect(canConfigureMore).toBeTruthy();
	});

	it("canConfigureMore should return false if given inputCharacteristic.cardinality.max is equal to current characteristics array size", done => {
		const inputCharacteristic = {
			cardinality: {
				max: 2
			}
		} as any as Characteristic;
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} inputCharacteristic={inputCharacteristic}/>, { context: mockContext });
		// When
		const characteristics = [{ value: "value 1" }, { value: "value 2" }];
		wrapper.instance().setState({ characteristics });
		wrapper.update();
		setTimeout(() => {
			// Then
			const canConfigureMore = wrapper.instance().canConfigureMore();
			expect(canConfigureMore).toBeFalsy();
			done();
		}, 1);
	});

	it("removeTextInput should move characteristics from correct array index", () => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });
		const characteristics = [
			{ value: "value 1" },
			{ value: "value 2" },
			{ value: "value 3" }
		];
		wrapper.instance().setState({ characteristics });
		wrapper.update();

		wrapper.instance().removeTextInput(1);

		const newCharacteristicsState = wrapper.instance().state.characteristics;
		expect(newCharacteristicsState[1]).toEqual(characteristics[2]);
	});

	it("onChange should update value to correct index characteristics array", done => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });

		const characteristics = [
			{ value: "Burger" },
			{ value: "Pizza" },
			{ value: "Bacon" }
		];
		const newValue = "Back to Bacon";
		const index = 2;
		wrapper.instance().setState({ characteristics });
		wrapper.update();

		wrapper.instance().onChange(path, characteristicKey, newValue, index);

		setTimeout(() => {
			const newCharacteristicsState = wrapper.instance().state.characteristics;
			expect(newCharacteristicsState[2].value).toEqual(newValue);
			done();
		}, 1);
	});

	it("onChange should call setEnhancedCharacteristics when indexToUpdate is greater than 0", done => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });

		const setEnhancedCharacteristicsMock = jest.fn();
		wrapper.instance().setEnhancedCharacteristics = setEnhancedCharacteristicsMock;
		const newValue = "new Value";
		const index = 1;
		wrapper.instance().onChange(path, characteristicKey, newValue, index);
		setTimeout(() => {
			expect(setEnhancedCharacteristicsMock).toHaveBeenCalled();
			done();
		}, 1);
	});

	it("onChange should call setInputtedCharacteristics when indexToUpdate is 0", done => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });
		const setInputtedCharacteristicMock = jest.fn();
		wrapper.instance().setInputtedCharacteristic = setInputtedCharacteristicMock;
		const newValue = "new Value";
		const index = 0;
		wrapper.instance().onChange(path, characteristicKey, newValue, index);
		setTimeout(() => {
			expect(setInputtedCharacteristicMock).toHaveBeenCalled();
			done();
		}, 1);
	});

	it("updateCharacteristics should call setInputtedCharacteristic", done => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputContainer {...minProps} />, { context: mockContext });
		const setInputtedCharacteristicMock = jest.fn();
		wrapper.instance().setInputtedCharacteristic = setInputtedCharacteristicMock;

		wrapper.instance().updateCharacteristics();

		setTimeout(() => {
			expect(setInputtedCharacteristicMock).toHaveBeenCalled();
			done();
		}, 1);
	});

	it("updateCharacteristics should call setEnhancedCharacteristics", () => {
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputContainer {...minProps} />
		);
		const setEnhancedCharacteristicsMock = jest.fn();
		wrapper.instance().setEnhancedCharacteristics = setEnhancedCharacteristicsMock;
		wrapper.instance().updateCharacteristics();
		expect(setEnhancedCharacteristicsMock).toHaveBeenCalled();
	});

	it("setInputtedCharacteristic should call given function with correct path, characteristicKey and value", done => {
		const setInputtedCharacteristicMock = minProps.actions.setInputtedCharacteristic;
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputContainer
				{...minProps}
				path={path}
				characteristicKey={characteristicKey}
			/>, { context: mockContext }
		);

		const characteristics = [
			{ value: "Burger" },
			{ value: "Pizza" },
			{ value: "Bacon" }
		];
		wrapper.instance().setState({ characteristics });
		wrapper.update();
		wrapper.instance().setInputtedCharacteristic();
		setTimeout(() => {
			expect(setInputtedCharacteristicMock).toHaveBeenCalledWith(path, characteristicKey, "Burger");
			done();
		}, 800);
	});

	it("setEnhancedCharacteristics should call given function with correct path, characteristicKey and values", done => {
		const setEnhancedCharacteristicsMock = minProps.actions.setEnhancedCharacteristics;
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputContainer
				{...minProps}
				path={path}
				characteristicKey={characteristicKey}
			/>, { context: mockContext }
		);

		const characteristics = [
			{ value: "Burger" },
			{ value: "Pizza" },
			{ value: "Bacon" }
		];
		wrapper.instance().setState({ characteristics });
		wrapper.update();

		wrapper.instance().setEnhancedCharacteristics();
		setTimeout(() => {
			expect(setEnhancedCharacteristicsMock).toHaveBeenCalledWith(path, characteristicKey, [
				{ value: "Pizza" },
				{ value: "Bacon" }
			]);
			done();
		}, 600);
	});
});
