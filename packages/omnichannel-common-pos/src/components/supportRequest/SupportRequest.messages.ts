/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SupportRequestMessagesType {
	asteriskSign: FormattedMessage.MessageDescriptor;
	chooseRequestCategory: FormattedMessage.MessageDescriptor;
	newSupportRequest: FormattedMessage.MessageDescriptor;
	supportCancelButton: FormattedMessage.MessageDescriptor;
	supportCategory: FormattedMessage.MessageDescriptor;
	supportDescriptionRequest: FormattedMessage.MessageDescriptor;
	supportSendButton: FormattedMessage.MessageDescriptor;
}
const SupportRequestMessages: SupportRequestMessagesType = defineMessages({
	asteriskSign: {
		id: "digital-life-support-request-asterisk-sign",
		description: "digital-life support modal, asterisk sign",
		defaultMessage: "*"
	},
	chooseRequestCategory: {
		id: "digital-life-support-request-modal-category",
		description: "digital-life support modal selector",
		defaultMessage: "Choose category"
	},
	newSupportRequest: {
		id: "digital-life-new-support-requests-header",
		description: "Digital life new support request header",
		defaultMessage: "New Support Request"
	},
	supportCancelButton: {
		id: "cancel-new-support-request",
		description: "Cancel button in new support request modal",
		defaultMessage: "Cancel"
	},
	supportCategory: {
		id: "new-support-request-category",
		description: "Category field in new support request modal",
		defaultMessage: "Category"
	},
	supportDescriptionRequest: {
		id: "digital-life-support-request-description",
		description: "Digital life support request descr",
		defaultMessage: "Description"
	},
	supportSendButton: {
		id: "send-new-support-request",
		description: "Send button in new support request modal",
		defaultMessage: "Send"
	},
});

export default SupportRequestMessages;
export { SupportRequestMessages, SupportRequestMessagesType };
