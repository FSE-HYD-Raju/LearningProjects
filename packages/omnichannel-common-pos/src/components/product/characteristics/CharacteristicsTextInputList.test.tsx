import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import CharacteristicsTextInputList from "./CharacteristicsTextInputList";
import { NominationCharacteristics } from "../../../redux/types";

describe("CharacteristicsTextInputList", () => {
	const minProps = {
		canAddMoreInputElements: false,
		removeTextInput: jest.fn(),
		addTextInput: jest.fn(),
		characteristicKey: "a",
		characteristics: [{value: "a"}, {value: "b"}],
		characteristicsAliases: {},
		characteristicValidations: [],
		onChange: jest.fn(),
		nominationPOCharacteristics: {} as any as NominationCharacteristics,
	};
	const characteristicKey = "favorite-foods";

	it("should shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputList {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should render at least one CharacteristicsTextInput", () => {
		const wrapper = shallowWithContext(<CharacteristicsTextInputList {...minProps} characteristicKey={characteristicKey}/>);
		const textInput = wrapper.find(`#CharacteristicsTextInputList-${characteristicKey}-0`);
		expect(textInput.exists()).toBeTruthy();
	});

	it("should render all given characteristics as CharacteristicsTextInput", () => {
		const characteristics = [
			{ value: "value 1" },
			{ value: "value 2" },
			{ value: "value 3" }
		];

		const wrapper = shallowWithContext(
			<CharacteristicsTextInputList
				{...minProps}
				characteristics={characteristics}
				characteristicKey={characteristicKey}
			/>
		);
		const thirdInput = wrapper.find("#CharacteristicsTextInputList-favorite-foods-2");
		expect(thirdInput.exists()).toBeTruthy();
	});

	it("should render 'add more' icon when canAddMoreInputElements true", () => {
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputList
				{...minProps}
				canAddMoreInputElements={true}
				characteristicKey={characteristicKey}
			/>
		);

		const addIcon = wrapper.find("#CharacteristicsTextInputList-add-more");
		expect(addIcon.exists()).toBeTruthy();
	});

	it("should not render 'add more' icon when canAddMoreInputElements false", () => {
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputList
				{...minProps}
				canAddMoreInputElements={false}
				characteristicKey={characteristicKey}
			/>
		);

		const addIcon = wrapper.find("#CharacteristicsTextInputList-add-more");
		expect(addIcon.exists()).toBeFalsy();
	});

	it("should call removeTextInput with correct index when 'close' icon is clicked", () => {
		const removeTextInputMock = minProps.removeTextInput;

		const idx = 1;
		const characteristics = [{ value: "value 1" }, { value: "value 2" }];

		const wrapper = shallowWithContext(
			<CharacteristicsTextInputList
				{...minProps}
				characteristics={characteristics}
				removeTextInput={removeTextInputMock}
				characteristicKey={characteristicKey}
			/>
		);
		const input = wrapper.find(
			`#CharacteristicsTextInputList-${characteristicKey}-close-${idx}`
		);
		input.simulate("click");
		expect(removeTextInputMock).toHaveBeenCalledWith(idx);
	});

	it("should call addTextInput when 'add more' icon is clicked", () => {
		const addTextInputMock = minProps.addTextInput;
		const wrapper = shallowWithContext(
			<CharacteristicsTextInputList
				{...minProps}
				canAddMoreInputElements={true}
				addTextInput={addTextInputMock}
			/>
		);

		const addIcon = wrapper.find("#CharacteristicsTextInputList-add-more");
		addIcon.simulate("click");
		expect(addTextInputMock).toHaveBeenCalled();
	});
});
