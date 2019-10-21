/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SliderUnitsMessagesType {
	data: FormattedMessage.MessageDescriptor;
	sms: FormattedMessage.MessageDescriptor;
	voice: FormattedMessage.MessageDescriptor;
}
const SliderUnitsMessages: SliderUnitsMessagesType = defineMessages({
	data: {
		id: "slider-configuration-container-data-unit-default",
		description: "Slider configuration container data unit GB label",
		defaultMessage: "GB"
	},
	sms: {
		id: "slider-configuration-container-sms-unit-default",
		description: "Slider configuration container sms unit SMS label",
		defaultMessage: "SMS"
	},
	voice: {
		id: "slider-configuration-container-voice-unit-default",
		description: "Slider configuration container voice unit min label",
		defaultMessage: "min"
	},
});

export default SliderUnitsMessages;
export { SliderUnitsMessages, SliderUnitsMessagesType };
