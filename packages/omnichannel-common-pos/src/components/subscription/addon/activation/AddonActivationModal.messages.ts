/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AddonActivationModalMessagesType {
	addonActivationFailed: FormattedMessage.MessageDescriptor;
	addonSuccessfullyActivated: FormattedMessage.MessageDescriptor;
}
const AddonActivationModalMessages: AddonActivationModalMessagesType = defineMessages({
	addonActivationFailed: {
		id: "addon-activation-modal-error-message",
		description: "Message to be shown in toaster in case if addon activation failed",
		defaultMessage: "{addonName} activation has failed"
	},
	addonSuccessfullyActivated: {
		id: "addon-activation-modal-success-message",
		description: "Message to be shown in toaster in case if addon has been successfully activated",
		defaultMessage: "{addonName} has been activated successfully"
	},
});

export default AddonActivationModalMessages;
export { AddonActivationModalMessages, AddonActivationModalMessagesType };
