/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SchemaInvalidityMessagesType {
	buildingIsTooLong: FormattedMessage.MessageDescriptor;
	default: FormattedMessage.MessageDescriptor;
	email: FormattedMessage.MessageDescriptor;
	fixedLineNumber: FormattedMessage.MessageDescriptor;
	identificationExpiryDate: FormattedMessage.MessageDescriptor;
	identificationIssuingDate: FormattedMessage.MessageDescriptor;
	maritalStatus: FormattedMessage.MessageDescriptor;
	mobileNumber: FormattedMessage.MessageDescriptor;
	passwordConfirmation: FormattedMessage.MessageDescriptor;
	streetNameIsTooLong: FormattedMessage.MessageDescriptor;
}
const SchemaInvalidityMessages: SchemaInvalidityMessagesType = defineMessages({
	buildingIsTooLong: {
		id: "building-value-is-too-long",
		description: "Used when building length too long",
		defaultMessage: "Street number can be max ${max} characters long"
	},
	default: {
		id: "input-is-invalid",
		description: "Any field, error shown when input is invalid",
		defaultMessage: "This value is invalid for this field"
	},
	email: {
		id: "email-is-invalid",
		description: "Error shown when email is invalid",
		defaultMessage: "Not a valid email address"
	},
	fixedLineNumber: {
		id: "fixedLineNumber-is-invalid",
		description: "Error shown when fixed line number is invalid",
		defaultMessage: "Not a valid fixed line number"
	},
	identificationExpiryDate: {
		id: "identification-expiry-date-in-the-past",
		description: "Used when ID issuing date in the past",
		defaultMessage: "Expiry date should be in the future"
	},
	identificationIssuingDate: {
		id: "identification-issuing-date-in-the-future",
		description: "Used when ID issuing date in the future",
		defaultMessage: "Issuing date should be in the past"
	},
	maritalStatus: {
		id: "maritalStatus-is-invalid",
		description: "Error shown when marital status is invalid",
		defaultMessage: "Not a valid marital status"
	},
	mobileNumber: {
		id: "mobileNumber-is-invalid",
		description: "Error shown when mobile number is invalid",
		defaultMessage: "Not a valid mobile number"
	},
	passwordConfirmation: {
		id: "form-passwords-do-not-match",
		description: "Used when passwords do not match",
		defaultMessage: "Passwords do not match"
	},
	streetNameIsTooLong: {
		id: "street-name-value-is-too-long",
		description: "Used when street length too long",
		defaultMessage: "Street name can be max ${max} characters long"
	},
});

export default SchemaInvalidityMessages;
export { SchemaInvalidityMessages, SchemaInvalidityMessagesType };
