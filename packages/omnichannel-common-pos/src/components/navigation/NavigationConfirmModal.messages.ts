/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface NavigationConfirmModalMessagesType {
	confirmNavigation: FormattedMessage.MessageDescriptor;
	navigationCancel: FormattedMessage.MessageDescriptor;
	navigationOk: FormattedMessage.MessageDescriptor;
}
const NavigationConfirmModalMessages: NavigationConfirmModalMessagesType = defineMessages({
	confirmNavigation: {
		id: "navigation-confirm-modal-title",
		description: "Title of the navigation confirm modal",
		defaultMessage: "Please confirm navigation"
	},
	navigationCancel: {
		id: "navigation-confirm-modal-cancel-button-default-text",
		description: "Navigation confirm modal, Cancel button",
		defaultMessage: "Cancel"
	},
	navigationOk: {
		id: "navigation-confirm-modal-ok-button-default-text",
		description: "Navigation confirm modal, OK button",
		defaultMessage: "OK"
	},
});

export default NavigationConfirmModalMessages;
export { NavigationConfirmModalMessages, NavigationConfirmModalMessagesType };
