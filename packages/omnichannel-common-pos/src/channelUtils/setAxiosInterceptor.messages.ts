/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SetAxiosInterceptorMessagesType {
	connectionTimeout: FormattedMessage.MessageDescriptor;
	networkError: FormattedMessage.MessageDescriptor;
	unidentifiedMessage: FormattedMessage.MessageDescriptor;
}
const SetAxiosInterceptorMessages: SetAxiosInterceptorMessagesType = defineMessages({
	connectionTimeout: {
		id: "request-error-connection-timeout",
		description: "Request error connection timeout",
		defaultMessage: "Connection timeout. Please ensure your network connection"
	},
	networkError: {
		id: "request-error-network",
		description: "Request error network down",
		defaultMessage: "Couldn't perform request. Please ensure your network connection"
	},
	unidentifiedMessage: {
		id: "request-error-unidentified",
		description: "Request error unidentified",
		defaultMessage: "Couldn't perform request. An unidentified system error occurred!"
	},
});

export default SetAxiosInterceptorMessages;
export { SetAxiosInterceptorMessages, SetAxiosInterceptorMessagesType };
