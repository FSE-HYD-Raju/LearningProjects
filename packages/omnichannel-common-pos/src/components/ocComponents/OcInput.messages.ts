/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcInputMessagesType {
	hidePassword: FormattedMessage.MessageDescriptor;
	showPassword: FormattedMessage.MessageDescriptor;
}
const OcInputMessages: OcInputMessagesType = defineMessages({
	hidePassword: {
		id: "ocinput-hide-password",
		description: "Hide password",
		defaultMessage: "Hide password"
	},
	showPassword: {
		id: "ocinput-show-password-in-plain-text",
		description: "Show password in plain text tooltip label",
		defaultMessage: "Show password"
	},
});

export default OcInputMessages;
export { OcInputMessages, OcInputMessagesType };
