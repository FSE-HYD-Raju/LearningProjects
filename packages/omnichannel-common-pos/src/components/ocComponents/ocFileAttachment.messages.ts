/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcFileAttachmentMessagesType {
	fileAttachmentAttachFileBtnLabel: FormattedMessage.MessageDescriptor;
	fileAttachmentHintMessage: FormattedMessage.MessageDescriptor;
	fileAttachmentInputLabel: FormattedMessage.MessageDescriptor;
}
const OcFileAttachmentMessages: OcFileAttachmentMessagesType = defineMessages({
	fileAttachmentAttachFileBtnLabel: {
		id: "oc-file-attachment-attach-file-btn-label",
		description: "File attachment, label for attach button",
		defaultMessage: "Attach file"
	},
	fileAttachmentHintMessage: {
		id: "oc-file-attachment-hint-message",
		description: "File uploader, attachment hint message",
		defaultMessage: "{maxFiles, plural, one {# attachment} other {# attachments}} max. File size shouldn't exceed 20Mb."
	},
	fileAttachmentInputLabel: {
		id: "oc-file-attachment-input-label",
		description: "File attachment, label for file attachment input",
		defaultMessage: "Attachment"
	},
});

export default OcFileAttachmentMessages;
export { OcFileAttachmentMessages, OcFileAttachmentMessagesType };
