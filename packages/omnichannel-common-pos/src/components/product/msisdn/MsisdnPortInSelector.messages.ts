/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface MsisdnPortInSelectorMessagesType {
	customerIsInBlacklist: FormattedMessage.MessageDescriptor;
	errorInRequest: FormattedMessage.MessageDescriptor;
	immediate: FormattedMessage.MessageDescriptor;
	nip: FormattedMessage.MessageDescriptor;
	nipNumberLimit: FormattedMessage.MessageDescriptor;
	nipRequestNotSent: FormattedMessage.MessageDescriptor;
	numberLimit: FormattedMessage.MessageDescriptor;
	portInPhoneNumber: FormattedMessage.MessageDescriptor;
	portingInNumberIsNotValid: FormattedMessage.MessageDescriptor;
	requestNip: FormattedMessage.MessageDescriptor;
	requestedPortInDate: FormattedMessage.MessageDescriptor;
	requestingNipFailed: FormattedMessage.MessageDescriptor;
	selectedDate: FormattedMessage.MessageDescriptor;
	sessionWithValidIdentificationRequired: FormattedMessage.MessageDescriptor;
}
const MsisdnPortInSelectorMessages: MsisdnPortInSelectorMessagesType = defineMessages({
	customerIsInBlacklist: {
		id: "port-in-customer-blaclisted",
		description: "customer is in blacklist",
		defaultMessage: "Customer is in blacklist"
	},
	errorInRequest: {
		id: "port-in-request-error-try-again",
		description: "Result error 2",
		defaultMessage: "Error in the request. Please retry"
	},
	immediate: {
		id: "select-from-the-number-immediate-category",
		description: "Select from the number category",
		defaultMessage: "Immediate {value}"
	},
	nip: {
		id: "port-in-nip",
		description: "Port in NIP",
		defaultMessage: "NIP"
	},
	nipNumberLimit: {
		id: "port-in-nip-validation",
		description: "nip digit max {value} validation",
		defaultMessage: "NIP can have max {value} digits"
	},
	nipRequestNotSent: {
		id: "port-in-request-nip-error-try-again",
		description: "Result errror 0",
		defaultMessage: "NIP request not sent to customer"
	},
	numberLimit: {
		id: "port-in-10-digit-number",
		description: "number must be {value} digits",
		defaultMessage: "Number must contain {value} digits"
	},
	portInPhoneNumber: {
		id: "port-in-phone-number",
		description: "Port in phone number",
		defaultMessage: "Port in Phone Number"
	},
	portingInNumberIsNotValid: {
		id: "port-in-msisdn_not_portable",
		description: "msisdn is a tigo number",
		defaultMessage: "The porting in number is not valid"
	},
	requestNip: {
		id: "port-int-request-nip-button-text",
		description: "Request nip button text",
		defaultMessage: "Request NIP"
	},
	requestedPortInDate: {
		id: "port-in-requested-port-in-date-text",
		description: "Requested port-in date",
		defaultMessage: "Requested port-in date"
	},
	requestingNipFailed: {
		id: "port-in-request-nip-error",
		description: "Error in making portInDecisions call",
		defaultMessage: "Requesting NIP failed"
	},
	selectedDate: {
		id: "port-in-date-time-picker",
		description: "Select port-in date",
		defaultMessage: "Selected date"
	},
	sessionWithValidIdentificationRequired: {
		id: "port-in-identification-error",
		description: "error when user is not logged or user has bad identification",
		defaultMessage: "Customer session with valid identification is required for port-in"
	},
});

export default MsisdnPortInSelectorMessages;
export { MsisdnPortInSelectorMessages, MsisdnPortInSelectorMessagesType };
