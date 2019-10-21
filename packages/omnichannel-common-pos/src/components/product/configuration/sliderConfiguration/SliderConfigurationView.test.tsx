/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../../testUtils";
import SliderConfigurationView, { SliderConfigurationProps } from "./SliderConfigurationView";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";

const unlimitedMessage = (
	<FormattedMessage
		id="test"
		description="test"
		defaultMessage="Test unlimited"
	/>
);

const minProps: SliderConfigurationProps = {
	unlimitedMessage,
	values: [0, 10, 50, 100],
	unit: "min",
	selectionMessage: (<div>Selection</div>),
	iconClassName: "icon",
	onChange: jest.fn(),
};

describe("SliderConfigurationView", () => {
	it("should mount with out props", () => {
		const wrapper = shallowWithContext(<SliderConfigurationView {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should render given value and unit as selection", () => {
		const props = {
			...minProps,
			selectedValue: 100,
			unit: "min"
		};
		const wrapper = shallowWithContext(
			<SliderConfigurationView {...props} />
		);
		const selectionElement = wrapper.find(
			".SliderConfigurationView-selection-value"
		);
		expect(selectionElement.text()).toEqual("100 min");
	});

	it("should render given selection message", () => {
		const selectionMessage = (
			<FormattedMessage
				id="test-message"
				description="test message"
				defaultMessage="Voices"
			/>
		);
		const props = {
			...minProps,
			selectionMessage
		};
		const wrapper = mountWithContext(
			<SliderConfigurationView {...props} />
		);
		const message = wrapper.find(
			".SliderConfigurationView-selection-message"
		);
		expect(message.text()).toEqual("Voices");
	});

	it("should render given iconClassName", () => {
		const props = {
			...minProps,
			iconClassName: "fa fa-phone"
		};
		const wrapper = mountWithContext(
			<SliderConfigurationView {...props} />
		);
		const iconClass = wrapper.find(".fa-phone");
		expect(iconClass).toBeDefined();
	});

	it("should render slider with correct amount marks", () => {
		const props = {
			...minProps,
			values: [100, 200, 300, 500],
			selectedValue: 300,
			unit: "SMS"
		};
		const wrapper = mountWithContext(
			<SliderConfigurationView {...props} />
		);

		const dots = wrapper.find(".rc-slider-dot");
		expect(dots.length).toEqual(4);
	});
});
