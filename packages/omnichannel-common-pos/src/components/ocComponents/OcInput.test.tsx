import * as React from "react";
import { has } from "lodash";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcInput from "./OcInput";

class Dictator extends React.Component<any, any> {

	static defaultProps = {
		onChange: (event: React.ChangeEvent<any>) => { return event; }
	};

	constructor(props: any) {
		super(props);
		this.state = {
			value: null
		};
		this.setValue = this.setValue.bind(this);
	}

	setValue(event: React.ChangeEvent<any>) {
		this.setState({
			value: event.target.value
		});
	}

	render() {
		return (
			<div>
				<OcInput
					id="test-apples"
					className="apples"
					name="fruitChoice"
					defaultValue="apples"
					onChange={this.setValue}
					label="Apples"
					type="radio"
					checked={this.state.value === "apples"}
				/>

				<OcInput
					id="test-oranges"
					className="oranges"
					name="fruitChoice"
					defaultValue="oranges"
					onChange={this.setValue}
					label="Oranges"
					type="radio"
					checked={this.state.value === "oranges"}
				/>
			</div>
		);
	}
}

describe("OcInput", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<OcInput />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcInput />);
	});

	it("renders a radio input when type == 'radio'", () => {
		const type = "radio";
		const wrapper = mountWithContext(<OcInput type={type} />);

		const input = wrapper.find("input");
		expect(input.instance().type).toEqual(type);
	});

	it("lets parent dictate which radio in a group is checked (radioButtonGroupValue not used)", () => {
		const wrapper = mountWithContext(<Dictator />);

		const eApples = wrapper.find("OcInput").at(0);
		const eOranges = wrapper.find("OcInput").at(1);

		expect(has(eApples.props(), "radioButtonGroupValue")).toEqual(false);
		expect(has(eOranges.props(), "radioButtonGroupValue")).toEqual(false);

		const ocInputs = wrapper.find(".OcInput");
		let iApples = ocInputs.find(".OcInput.OcInput-apples");
		let iOranges = ocInputs.find(".OcInput.OcInput-oranges");
		expect(
			ocInputs.find(".OcInput input").find({ checked: true }).length
		).toEqual(0);
		iOranges.find("input").simulate("click");
		wrapper.update();
		iOranges = wrapper.find(".OcInput").find(".OcInput.OcInput-oranges");
		expect(iOranges.find(".OcInput [checked]").length).toEqual(1);
		expect(iOranges.find("input").instance().checked).toEqual(true);

		iApples.find("input").simulate("click");
		wrapper.update();
		iApples = wrapper.find(".OcInput").find(".OcInput.OcInput-apples");
		expect(iApples.find(".OcInput [checked]").length).toEqual(1);
		expect(iApples.find("input").instance().checked).toEqual(true);
		iOranges = wrapper.find(".OcInput").find(".OcInput.OcInput-oranges");
		expect(iOranges.find(".OcInput [checked='checked']").length).toEqual(0);
		expect(iOranges.find("input").instance().checked).toEqual(false);
	});

	it("renders an input element with type checkbox", () => {
		const wrapper = mountWithContext(<OcInput type="checkbox" />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders a checkbox that is checked by default and can be unchecked", () => {
		const type = "checkbox";
		const wrapper = mountWithContext(<OcInput type={type} checked={true} />);
		expect(wrapper).toMatchSnapshot();

		const input = wrapper.find(".OcInput input");
		expect(input.instance().type).toEqual(type);

		expect(wrapper.state().checked).toEqual(true);

		input.simulate("click");
		wrapper.update();
		expect(wrapper.state().checked).toEqual(false);
	});

	it("renders an input element with type password", () => {
		const type = "password";
		const wrapper = mountWithContext(<OcInput type={type} />);

		const input = wrapper.find("input");
		expect(input.instance().type).toEqual(type);
	});

	it("renders an input element with type text when no props given", () => {
		const wrapper = mountWithContext(<OcInput />);

		const input = wrapper.find("input");
		expect(input.instance().type).toEqual("text");
	});

	it("renders a placeholder for single line text input", () => {
		const placeholder = "Type something";
		const wrapper = mountWithContext(<OcInput placeholder={placeholder} />);

		expect(wrapper.find("label").text()).toEqual(placeholder);
	});

	it("renders as single line text input when type == \"text\"", () => {
		const type = "text";
		const wrapper = mountWithContext(<OcInput type={type} />);

		const input = wrapper.find("input");
		expect(input.prop("type")).toEqual(type);
	});

	it("renders as single line text input when type == \"email\"", () => {
		const type = "email";
		const wrapper = mountWithContext(<OcInput type={type} />);

		const input = wrapper.find("input");
		expect(input.prop("type")).toEqual(type);
	});

	it("renders a text input with a given value", () => {
		const wrapper = mountWithContext(
			<OcInput value="kikkels" />
		);

		const input = wrapper.find("input");
		expect(input.instance().value).toEqual("kikkels");
		expect(input.instance().type).toEqual("text");
	});

	it("renders a textarea when type == \"textarea\"", () => {
		const wrapper = mountWithContext(<OcInput type="textarea" />);

		expect(wrapper.find("textarea").length).toEqual(1);
	});

	it("shows an error message", () => {
		const errorMessage = "This email is registered already";

		const wrapper = mountWithContext(
			<OcInput
				type="email"
				value="john_smith@qvantel.com"
				errorMessage={errorMessage}
			/>
		);

		const invalidFeedback = wrapper.find(".invalid-feedback");
		expect(invalidFeedback.length).toEqual(1);
		expect(invalidFeedback.text().toLowerCase()).toEqual(
			errorMessage.toLowerCase()
		);
	});

	it("passes data in correct format on input", done => {
		const inputData = "foo";

		function defOnChange(event: React.ChangeEvent<any>) {
			expect(event.target.value).toEqual(inputData);
			done();
		}

		const wrapper = mountWithContext(<OcInput onChange={defOnChange} />);

		wrapper
			.find("input")
			.simulate("change", { target: { value: inputData } });
	});

	it("passes the native event objects to onBlur and onFocus handlers that triggered on a text input field", done => {
		const onFocusSpy = jest.fn();
		const onBlurSpy = jest.fn();

		const wrapper = mountWithContext(
			<OcInput type="text" onBlur={onBlurSpy} onFocus={onFocusSpy} />
		);

		wrapper.find("input").simulate("focus");

		wrapper.find("input").simulate("blur");

		setTimeout(() => {
			expect(onFocusSpy).toHaveBeenCalledWith(expect.any(Object));
			expect(onBlurSpy).toHaveBeenCalledWith(expect.any(Object));
			done();
		}, 500);
	});

	it("toggles the classname 'focused' on label of a text input by blur/focus event", done => {
		const onFocusSpy = jest.fn();
		const onBlurSpy = jest.fn();

		const wrapper = mountWithContext(
			<OcInput type="text" onBlur={onBlurSpy} onFocus={onFocusSpy} />
		);

		wrapper.find("input").simulate("focus");
		setTimeout(() => {
			expect(wrapper.find("label.OcInput-focused")).not.toHaveLength(0);
		}, 100);

		setTimeout(() => {
			wrapper.find("input").simulate("blur");
			expect(wrapper.find("label.OcInput-focused")).toHaveLength(0);
			done();
		}, 200);
	});
});
