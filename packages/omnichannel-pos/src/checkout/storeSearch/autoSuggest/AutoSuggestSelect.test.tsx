import * as React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import AutoSuggestSelect from "./AutoSuggestSelect";

describe("AutoSuggestSelect", () => {
	const testData = {
		options: [
			{ value: "1", label: "Label 1" },
			{ value: "2", label: "Label 2" },
			{ value: "3", label: "Label 3" },
			{ value: "4", label: "Label 4" }
		]
	};

	const minProps = {
		labelField: "label",
		idField: "value",
		onSuggestionSelected: jest.fn(),
		loadOptions: jest.fn(),
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<AutoSuggestSelect {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should mount without props", () => {
		mountWithContext(<AutoSuggestSelect {...minProps} />);
	});

	it("placeholder is shown when input is empty", () => {
		const props = { ...minProps, placeholder: "Test" };

		const wrapper = mountWithContext(<AutoSuggestSelect {...props} />);

		const placelholderLabel = wrapper.find("OcInput label");
		expect(placelholderLabel.text()).toMatch("Test");
	});

	it("selected item displayed if provided", () => {
		const props = { ...minProps, value: "Default selected value" };

		const wrapper = mountWithContext(<AutoSuggestSelect {...props} />);

		const input = wrapper.find("OcInput input");
		expect(input.instance().value).toMatch("Default selected value");
	});

	it("loadData called after specified count of symbols in input", () => {
		const props = { ...minProps, minimalLength: 2 };
		const loadOptions = minProps.loadOptions;
		const wrapper = mountWithContext(<AutoSuggestSelect {...props} />);
		wrapper
			.find("OcInput input")
			.simulate("change", { target: { value: "te" } });
		expect(loadOptions).toHaveBeenCalled();
	});

	// TODO: this is quite strange but wrapper.update() called on AutoSuggestSelect leads to rendering empty string instead
	// TODO: of real component, this should be investigated additionally
	xit("loaded data stored in selectComponent", async () => {
		const loadDataMock = jest.fn((): Promise<any> => {
			return Promise.resolve(testData);
		});
		const props = { ...minProps, loadOptions: loadDataMock };
		const wrapper = mountWithContext(<AutoSuggestSelect {...props} />);

		await expect(loadDataMock).toHaveBeenCalled();

		expect(wrapper.instance().selectComponent.state.isLoading).toBeFalsy();
		expect(wrapper.instance().selectComponent.state.options).not.toBeNull();
		expect(wrapper.instance().selectComponent.state.options.length).toBe(4);
	});
});
