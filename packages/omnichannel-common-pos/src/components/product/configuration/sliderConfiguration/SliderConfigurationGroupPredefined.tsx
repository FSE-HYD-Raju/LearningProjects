import * as React from "react";
import {
	SliderConfigurationGroup,
	SliderConfigurationGroupProps
} from "./SliderConfigurationGroup";
import SliderMessages from "./slider.messages";

/**
 * Example component. Does not require any props. Can be inserted in any file (js or ts or tsx)
 *
 */
const exampleData: SliderConfigurationGroupProps = {
	handleChange: (key: string, value: number) => {
		window.console.log(`handleChange key=${key} value=${value}`);
	},
	configurations: {
		voice: {
			values: [10, 20, 30],
			unit: { id: "min", defaultMessage: "min", description: "min" },
			iconClassNames: "fa fa-phone",
			selectedValue: 20,
			message: SliderMessages.voice
		},
		message: {
			values: [1, 2, 5],
			unit: { id: "sms", defaultMessage: "sms", description: "sms" },
			iconClassNames: "fa fa-envelope",
			message: SliderMessages.sms
		},
		data: {
			values: [5, 10, 20],
			unit: { id: "GB", defaultMessage: "GB", description: "GB" },
			iconClassNames: "fa fa-wifi",
			message: SliderMessages.data
		}
	},
	unlimitedMessage: SliderMessages.unlimited
};

const SliderConfigurationGroupPredefined: React.FC<{}> = () => {
	return <SliderConfigurationGroup {...exampleData} />;
};

export default SliderConfigurationGroupPredefined;
