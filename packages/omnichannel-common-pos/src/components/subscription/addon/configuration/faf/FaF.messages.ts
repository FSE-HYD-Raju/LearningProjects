/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface FaFMessagesType {
	addNewNumber: FormattedMessage.MessageDescriptor;
	addNumber: FormattedMessage.MessageDescriptor;
	addingNumberToFaF: FormattedMessage.MessageDescriptor;
	areYouSureAddToFaF: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	cancelAndReturnToList: FormattedMessage.MessageDescriptor;
	configureFaF: FormattedMessage.MessageDescriptor;
	confirm: FormattedMessage.MessageDescriptor;
	feeWillBeDeducted: FormattedMessage.MessageDescriptor;
	newNumberIsNotAccepted: FormattedMessage.MessageDescriptor;
	number: FormattedMessage.MessageDescriptor;
	okay: FormattedMessage.MessageDescriptor;
	remove: FormattedMessage.MessageDescriptor;
	removeNumber: FormattedMessage.MessageDescriptor;
	removeNumberTitle: FormattedMessage.MessageDescriptor;
	save: FormattedMessage.MessageDescriptor;
	youCanHaveMaximumNumbers: FormattedMessage.MessageDescriptor;
}
const FaFMessages: FaFMessagesType = defineMessages({
	addNewNumber: {
		id: "fafAddNumber",
		description: "Add new number to Friends And Family list",
		defaultMessage: "Add new number"
	},
	addNumber: {
		id: "addon-configuration-friends-and-family-add-number-title",
		description: "Title of Friends and Family configuration modal - Add number",
		defaultMessage: "Add number"
	},
	addingNumberToFaF: {
		id: "friends-and-family-confirm-add-balance-error",
		description: "Error message for removing number from friends and family list",
		defaultMessage: "Adding {number} to Friends & Family costs {price}. The balance on your subscription is too low to add this number to your Friends & Family."
	},
	areYouSureAddToFaF: {
		id: "friends-and-family-confirm-add",
		description: "Confirm message for removing number from friends and family list",
		defaultMessage: "Are you sure you want to add {number} to friends & family?"
	},
	cancel: {
		id: "FaFCancelButton",
		description: "Cancel adding new number to Friends And Family list",
		defaultMessage: "Cancel"
	},
	cancelAndReturnToList: {
		id: "FaF-cancel-return-to-list",
		description: "Button to return back to Friends And Family list from add or remove number",
		defaultMessage: "Cancel"
	},
	configureFaF: {
		id: "addon-configuration-friends-and-family-title",
		description: "Title of Friends and Family configuration modal",
		defaultMessage: "Configure Friends & Family"
	},
	confirm: {
		id: "FaFConfirmationButton",
		description: "Button to confirm removal of number from Friends And Family list",
		defaultMessage: "Confirm"
	},
	feeWillBeDeducted: {
		id: "friends-and-family-confirm-add-price-info",
		description: "Message describing the possible fee for adding new FaF number",
		defaultMessage: "Fee of {price} will be deducted from you balance on confirmation."
	},
	newNumberIsNotAccepted: {
		id: "friends-and-family-confirm-add-error",
		description: "Error message for removing number from friends and family list",
		defaultMessage: "New number is not accepted: {number}"
	},
	number: {
		id: "fafNumberLabel",
		description: "Label next to add number input field",
		defaultMessage: "Number"
	},
	okay: {
		id: "FaF-okay-return-to-list",
		description: "Button to return back to Friends And Family list",
		defaultMessage: "Okay"
	},
	remove: {
		id: "fafRemoveNumber",
		description: "Remove number from Friends And Family list",
		defaultMessage: "Remove"
	},
	removeNumber: {
		id: "friends-and-family-confirm-remove",
		description: "Confirm message for removing number from friends and family list",
		defaultMessage: "Are you sure you want to remove {number}?"
	},
	removeNumberTitle: {
		id: "addon-configuration-friends-and-family-remove-number-title",
		description: "Title of Friends and Family configuration modal - Remove number",
		defaultMessage: "Remove number"
	},
	save: {
		id: "FaFAddNumberButton",
		description: "Add new number to Friends And Family list",
		defaultMessage: "Save"
	},
	youCanHaveMaximumNumbers: {
		id: "fafMaxNumbersMessage",
		description: "Info text about maximum number of faf numbers",
		defaultMessage: "You can have a maximum of {maximum} numbers."
	},
});

export default FaFMessages;
export { FaFMessages, FaFMessagesType };
