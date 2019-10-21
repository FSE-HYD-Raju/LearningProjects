/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CheckableAddonMessagesType {
	priceFree: FormattedMessage.MessageDescriptor;
	viewMore: FormattedMessage.MessageDescriptor;
}
const CheckableAddonMessages: CheckableAddonMessagesType = defineMessages({
	priceFree: {
		id: "checkable-addon-price-free",
		description: "when no price, the addon is free",
		defaultMessage: "Free"
	},
	viewMore: {
		id: "checkable-addon-bottom-button-view-more",
		description: "checkable addon, bottom, view more button",
		defaultMessage: "View more"
	},
});

export default CheckableAddonMessages;
export { CheckableAddonMessages, CheckableAddonMessagesType };
