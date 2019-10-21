/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcFileUploadMessagesType {
	documentTypeNotSupport: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFile: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFileFailed: FormattedMessage.MessageDescriptor;
	paymentSummaryUploadFileSuccess: FormattedMessage.MessageDescriptor;
}
const OcFileUploadMessages: OcFileUploadMessagesType = defineMessages({
	documentTypeNotSupport: {
		id: "pos-document-type-not-support",
		description: "POS, document type",
		defaultMessage: "Document type not supported."
	},
	paymentSummaryUploadFile: {
		id: "pos-payment-summary-upload-file",
		description: "payment, summary step, upload files",
		defaultMessage: "Upload scanned documents"
	},
	paymentSummaryUploadFileFailed: {
		id: "pos-payment-summary-upload-file-failed",
		description: "payment, summary step, file uploaded failed",
		defaultMessage: "Document upload failed. Please try again"
	},
	paymentSummaryUploadFileSuccess: {
		id: "pos-payment-summary-upload-file-success",
		description: "payment, summary step, file uploaded successfully",
		defaultMessage: "Document uploaded successfully"
	},
});

export default OcFileUploadMessages;
export { OcFileUploadMessages, OcFileUploadMessagesType };
