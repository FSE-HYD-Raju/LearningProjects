/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcGridMessagesType {
	showingXOutOfY: FormattedMessage.MessageDescriptor;
}
const OcGridMessages: OcGridMessagesType = defineMessages({
	showingXOutOfY: {
		id: "oc-grid-items-info",
		description: "Table with pagination items info",
		defaultMessage: "Showing {total, plural, one {{from} item} other {{from} to {to} items of {total}}}"
	},
});

export default OcGridMessages;
export { OcGridMessages, OcGridMessagesType };
