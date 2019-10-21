/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface DeliverySelectionMessagesType {
	addressLabel: FormattedMessage.MessageDescriptor;
	changeAddressButtonLabel: FormattedMessage.MessageDescriptor;
	changeAddressModalCloseButtonLabel: FormattedMessage.MessageDescriptor;
	changeAddressModalSaveButtonLabel: FormattedMessage.MessageDescriptor;
	changeAddressModalTitle: FormattedMessage.MessageDescriptor;
	checkoutStepDeliveryAddressHeaderMessage: FormattedMessage.MessageDescriptor;
	checkoutStepDeliveryHomeAddress: FormattedMessage.MessageDescriptor;
	checkoutStepDeliveryNewAddress: FormattedMessage.MessageDescriptor;
	methodLabel: FormattedMessage.MessageDescriptor;
}
const DeliverySelectionMessages: DeliverySelectionMessagesType = defineMessages({
	addressLabel: {
		id: "delivery-selection-address-label",
		description: "Delivery selection address label",
		defaultMessage: "Delivery address"
	},
	changeAddressButtonLabel: {
		id: "delivery-selection-change-address-button-label",
		description: "Delivery selection change address button label",
		defaultMessage: "Change"
	},
	changeAddressModalCloseButtonLabel: {
		id: "delivery-selection-change-address-modal-close-button-label",
		description: "Delivery selection change address modal close button label",
		defaultMessage: "Cancel"
	},
	changeAddressModalSaveButtonLabel: {
		id: "delivery-selection-change-address-modal-save-button-label",
		description: "Delivery selection change address modal save button label",
		defaultMessage: "Save"
	},
	changeAddressModalTitle: {
		id: "delivery-selection-change-address-modal-title",
		description: "Delivery selection change address modal title",
		defaultMessage: "Residential address"
	},
	checkoutStepDeliveryAddressHeaderMessage: {
		id: "b2c-checkout-steps-delivery-address-header",
		description: "Checkout delivery address section header",
		defaultMessage: "Select your delivery address"
	},
	checkoutStepDeliveryHomeAddress: {
		id: "b2c-checkout-steps-delivery-select-home-address",
		description: "Select delivery to home address",
		defaultMessage: "Delivery to my residential address"
	},
	checkoutStepDeliveryNewAddress: {
		id: "b2c-checkout-steps-delivery-select-new-address",
		description: "Select delivery to a new address",
		defaultMessage: "Delivery to another address"
	},
	methodLabel: {
		id: "delivery-selection-method-label",
		description: "Delivery selection method label",
		defaultMessage: "Delivery method"
	},
});

export default DeliverySelectionMessages;
export { DeliverySelectionMessages, DeliverySelectionMessagesType };
