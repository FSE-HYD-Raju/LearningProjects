/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcRouteAuthMessagesType {
	youNeedToAuthenticate: FormattedMessage.MessageDescriptor;
}
const OcRouteAuthMessages: OcRouteAuthMessagesType = defineMessages({
	youNeedToAuthenticate: {
		id: "oc-route-auth-form.you-need-to-authenticate",
		description: "You need to authenticate login form",
		defaultMessage: "You need to authenticate to proceed"
	},
});

export default OcRouteAuthMessages;
export { OcRouteAuthMessages, OcRouteAuthMessagesType };
