import * as React from "react";
import { shallowWithContext } from "../../../../../testUtils";

import FaFNumberList from "./FaFNumberList";

describe("FaFNumberList", () => {
	const addNumber = jest.fn();
	const removeNumber = jest.fn();

	const maximumNumbers = 10;

	const descriptionText = "Lorem ipsum and so on, we don't know what is stated here.";

	const numbers = ["099 938 1835", "099 938 1836", "099 938 1837"];

	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={numbers}
				descriptionText={descriptionText}
				maximumNumbers={maximumNumbers}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("opens input field when add button is pressed", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={numbers}
				descriptionText={descriptionText}
				maximumNumbers={maximumNumbers}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		expect(wrapper.find("FaFNumberModalAddNumber").length).toBe(0);
		wrapper.find("#buttonAddFaFNumber").simulate("click");
		expect(wrapper.find("FaFNumberModalAddNumber").length).toBe(1);
	});
	it("disables remove buttons when add field is active", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={numbers}
				descriptionText={descriptionText}
				maximumNumbers={maximumNumbers}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		expect(wrapper.find(".FaFNumberModal-removeButton").length).toBe(3);
		wrapper.find("#buttonAddFaFNumber").simulate("click");
		expect(wrapper.find(".FaFNumberModal-removeButton").length).toBe(0);
	});

	it("calls removeNumber when remove is clicked", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={numbers}
				descriptionText={descriptionText}
				maximumNumbers={maximumNumbers}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		const removeButtons = wrapper.find(".FaFNumberModal-removeButton");
		expect(removeButtons.length).toBe(3);
		removeButtons.first().simulate("click");
		expect(removeNumber).toHaveBeenCalledWith(numbers[0]);
	});

	it("calls addNumber when save is clicked", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={numbers}
				descriptionText={descriptionText}
				maximumNumbers={maximumNumbers}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		const value = "667";
		wrapper.find("#buttonAddFaFNumber").simulate("click");
		const addComponent = wrapper.find("FaFNumberModalAddNumber");
		addComponent.prop("onChange")({ target: { value: value } });
		addComponent.prop("save")();
		expect(addNumber).toHaveBeenCalledWith(value);
	});

	it("disables add button if maximum numbers is reached", () => {
		const wrapper = shallowWithContext(
			<FaFNumberList
				numbers={["1", "2"]}
				descriptionText={descriptionText}
				maximumNumbers={2}
				addNumber={addNumber}
				removeNumber={removeNumber}
			/>
		);
		expect(wrapper.find("#buttonAddFaFNumber").prop("disabled")).toBe(true);
	});
});
