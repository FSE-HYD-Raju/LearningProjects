/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ChangeSimMessagesType {
	closeButtonLabel: FormattedMessage.MessageDescriptor;
	confirmationMessage: FormattedMessage.MessageDescriptor;
	feeLabel: FormattedMessage.MessageDescriptor;
	misconfigurationError: FormattedMessage.MessageDescriptor;
	modalTitle: FormattedMessage.MessageDescriptor;
	orderButtonLabel: FormattedMessage.MessageDescriptor;
	reasonLabel: FormattedMessage.MessageDescriptor;
	selectPaymentLabel: FormattedMessage.MessageDescriptor;
	selectReasonPlaceholder: FormattedMessage.MessageDescriptor;
}
const ChangeSimMessages: ChangeSimMessagesType = defineMessages({
	closeButtonLabel: {
		id: "change-sim-modal-close-button-label",
		description: "Change SIM modal close button label",
		defaultMessage: "Close"
	},
	confirmationMessage: {
		id: "change-sim-modal-confirmation-order-description",
		description: "Change SIM confirmation modal body message",
		defaultMessage: "By clicking 'Confirm' you will order new SIM and will be able to track its delivery in the 'Orders' section"
	},
	feeLabel: {
		id: "change-sim-modal-fee-label",
		description: "Change SIM modal fee label",
		defaultMessage: "Fee"
	},
	misconfigurationError: {
		id: "change-sim-modal-misconfiguration-text",
		description: "Change SIM modal misconfiguration text",
		defaultMessage: "Function is not available"
	},
	modalTitle: {
		id: "change-sim-modal-title",
		description: "Change SIM modal title",
		defaultMessage: "Order new SIM"
	},
	orderButtonLabel: {
		id: "change-sim-modal-order-button-label",
		description: "Change SIM modal order button label",
		defaultMessage: "Order"
	},
	reasonLabel: {
		id: "change-sim-modal-reason-dropdown-label",
		description: "Change SIM modal reason dropdown label",
		defaultMessage: "Reason"
	},
	selectPaymentLabel: {
		id: "change-sim-modal-select-payment-method-label",
		description: "Change SIM modal select payment method label",
		defaultMessage: "Payment"
	},
	selectReasonPlaceholder: {
		id: "change-sim-modal-select-reason-placeholder",
		description: "Change SIM modal select reason placeholder",
		defaultMessage: "Select reason"
	},
});

export default ChangeSimMessages;
export { ChangeSimMessages, ChangeSimMessagesType };
