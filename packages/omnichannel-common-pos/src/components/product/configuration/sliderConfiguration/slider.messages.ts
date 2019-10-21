/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SliderMessagesType {
	data: FormattedMessage.MessageDescriptor;
	sms: FormattedMessage.MessageDescriptor;
	unlimited: FormattedMessage.MessageDescriptor;
	voice: FormattedMessage.MessageDescriptor;
}
const SliderMessages: SliderMessagesType = defineMessages({
	data: {
		id: "slider-configuration-container-data-label",
		description: "Slider configuration container data label",
		defaultMessage: "Data"
	},
	sms: {
		id: "slider-configuration-container-messages-label",
		description: "Slider configuration container messages label",
		defaultMessage: "Messages"
	},
	unlimited: {
		id: "slider-configuration-container-unlimited-value-label",
		description: "Unlimited configuration unlimited value label",
		defaultMessage: "Unlimited"
	},
	voice: {
		id: "slider-configuration-container-voice-label",
		description: "Slider configuration container voice label",
		defaultMessage: "Voice"
	},
});

export default SliderMessages;
export { SliderMessages, SliderMessagesType };
