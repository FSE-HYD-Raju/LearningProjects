/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AddressValidationMessagesType {
	addressNotFound: FormattedMessage.MessageDescriptor;
	addressNotFoundFor: FormattedMessage.MessageDescriptor;
	addressNotFoundSaveAnyway: FormattedMessage.MessageDescriptor;
	addressNotFoundSaveAnywayConfirmCheckbox: FormattedMessage.MessageDescriptor;
	addressNotFoundWithAddressItself: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	insertAddress: FormattedMessage.MessageDescriptor;
	invalidAddress: FormattedMessage.MessageDescriptor;
	myAddressIsNotOnTheListConfirmItIsValid: FormattedMessage.MessageDescriptor;
	nextSuggestion: FormattedMessage.MessageDescriptor;
	perhapsYouMeant: FormattedMessage.MessageDescriptor;
	perhapsYouMeantSome: FormattedMessage.MessageDescriptor;
	prevSuggestion: FormattedMessage.MessageDescriptor;
	saveAddress: FormattedMessage.MessageDescriptor;
	saveAnyway: FormattedMessage.MessageDescriptor;
}
const AddressValidationMessages: AddressValidationMessagesType = defineMessages({
	addressNotFound: {
		id: "address-validation-handler-address-not-found-title",
		description: "Address validation handler address not found title",
		defaultMessage: "Address not found"
	},
	addressNotFoundFor: {
		id: "Address-validation-handler-proposals-address-not-found2",
		description: "Address validation handler proposals address not found",
		defaultMessage: "Address <b>{address}</b> is invalid. Please insert another address."
	},
	addressNotFoundSaveAnyway: {
		id: "address-validation-handler-address-not-found-save-anyway-message",
		description: "Address validation handler address not found save anyway message",
		defaultMessage: "Address <b>{address}</b> not found. Do you want to save it anyway?"
	},
	addressNotFoundSaveAnywayConfirmCheckbox: {
		id: "address-validation-handler-address-not-found-save-anyway-confirm-checkbox-message",
		description: "Address validation handler address not found save anyway confirm message",
		defaultMessage: "I confirm this address is valid"
	},
	addressNotFoundWithAddressItself: {
		id: "Address-validation-handler-proposals-address-not-found",
		description: "Address validation handler proposals address not found",
		defaultMessage: "Address <b>{address}</b> not found."
	},
	cancel: {
		id: "cancel",
		description: "Cancel",
		defaultMessage: "Cancel"
	},
	insertAddress: {
		id: "address-validation-handler-insert-address",
		description: "Address validation handler insert address title",
		defaultMessage: "Insert address"
	},
	invalidAddress: {
		id: "address-validation-handler-invalid-address-title",
		description: "Address validation handler invalid address title",
		defaultMessage: "Invalid address"
	},
	myAddressIsNotOnTheListConfirmItIsValid: {
		id: "address-validation-handler-confirm-entered-address-is-valid",
		description: "Address validation handler, address not found, confirm entered is valid",
		defaultMessage: "My address is not on the list, I confirm this address is valid"
	},
	nextSuggestion: {
		id: "address-validation-handler-form-show-next-button-proposals",
		description: "Address validation proposals, show next 3 link",
		defaultMessage: "Next"
	},
	perhapsYouMeant: {
		id: "address-validation-handler-perhaps-you-meant-some-of-these",
		description: "Address validation handler, address not found, address proposals",
		defaultMessage: "Perhaps you meant some of these?"
	},
	perhapsYouMeantSome: {
		id: "Address-validation-handler-proposals-address-not-found-proposals-validation-mandatory",
		description: "Address validation handler proposals address not found, validation mandatory",
		defaultMessage: "Perhaps you meant some of these?"
	},
	prevSuggestion: {
		id: "address-validation-handler-form-show-previous-proposals",
		description: "Address validation proposals, show previous 3 link",
		defaultMessage: "Previous"
	},
	saveAddress: {
		id: "address-validation-handler-okay-address",
		description: "Address validation handler okay address button message",
		defaultMessage: "Okay"
	},
	saveAnyway: {
		id: "address-validation-handler-save-anyway-button-message",
		description: "Address validation handler save anyway button message",
		defaultMessage: "Save anyway"
	},
});

export default AddressValidationMessages;
export { AddressValidationMessages, AddressValidationMessagesType };
