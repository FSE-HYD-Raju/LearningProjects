import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../../testUtils";
import { SliderConfigurationGroup, SliderConfigurationGroupProps } from "./SliderConfigurationGroup";
import sliderMessages from "./slider.messages";
import SliderUnitMessages from "./SliderUnits.messages";
import { FormattedMessageDescriptor } from "../../../../channelUtils";

const minProps: SliderConfigurationGroupProps = {
	handleChange:  jest.fn(),
	configurations: {},
	unlimitedMessage: sliderMessages.unlimited
};

const voiceMessage: FormattedMessageDescriptor = {
	id: "slider-configuration-container-voice-label",
	description: "Slider configuration container voice label",
	defaultMessage: "Voice",
};

describe("SliderConfigurationGroup", () => {

	it("should mount with minimal props", () => {
		const wrapper = shallowWithContext(<SliderConfigurationGroup {...minProps} />, {});
		expect(wrapper).toMatchSnapshot();
	});

	it("on onChange in Slider component should call given prop handleChange function with correct message value", () => {
		const props = { ...minProps };
		props.configurations.voice = {
			values: [200, 500, 750, 0],
			unit: SliderUnitMessages.voice,
			iconClassNames: "fa fa-phone",
			message: voiceMessage,
		};

		const wrapper = mountWithContext(
			<SliderConfigurationGroup {...props} />, {}
		);

		wrapper.find("SliderConfigurationView").props().onChange(2);
		wrapper.update();
		expect(minProps.handleChange).toHaveBeenCalledWith("voice", 750);
	});
});
