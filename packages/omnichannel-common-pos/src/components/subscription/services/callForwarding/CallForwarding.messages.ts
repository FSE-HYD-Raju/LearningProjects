/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CallForwardingMessagesType {
	busyPhoneNumber: FormattedMessage.MessageDescriptor;
	confirmButtonLabel: FormattedMessage.MessageDescriptor;
	forwardAllCalls: FormattedMessage.MessageDescriptor;
	forwardIfBusy: FormattedMessage.MessageDescriptor;
	ifBusySelect: FormattedMessage.MessageDescriptor;
	ifNoAnswer: FormattedMessage.MessageDescriptor;
	ifNoAnswerPhoneNumber: FormattedMessage.MessageDescriptor;
	ifOutOfReach: FormattedMessage.MessageDescriptor;
	ifOutOfReachPhoneNumber: FormattedMessage.MessageDescriptor;
	phoneNumber: FormattedMessage.MessageDescriptor;
	submitErrors: FormattedMessage.MessageDescriptor;
	title: FormattedMessage.MessageDescriptor;
	toggleOff: FormattedMessage.MessageDescriptor;
	toggleOn: FormattedMessage.MessageDescriptor;
}
const CallForwardingMessages: CallForwardingMessagesType = defineMessages({
	busyPhoneNumber: {
		id: "call-forward-if-busy-phone-number",
		description: "In digital life, CallForwardingConfigurationForm, if busy phone number placeholder",
		defaultMessage: "Phone number"
	},
	confirmButtonLabel: {
		id: "call-forward-confirm-changes",
		description: "Call forwarding modal, confirm changes, button label",
		defaultMessage: "Confirm changes"
	},
	forwardAllCalls: {
		id: "call-forward-radio-forward-all-calls-label",
		description: "Call forwarding, Forward all calls radio button, label",
		defaultMessage: "Forward all calls"
	},
	forwardIfBusy: {
		id: "call-forward-radio-forward-if-busy-label",
		description: "Call forwarding, Forward if busy radio button, label",
		defaultMessage: "Forward if busy"
	},
	ifBusySelect: {
		id: "call-forward-if-busy-if-no-answer-opt",
		description: "Select option",
		defaultMessage: "Select"
	},
	ifNoAnswer: {
		id: "call-forwarding-forward-if-no-answer",
		description: "In digital life, CallForwardingConfigurationForm, if no answer phone number label",
		defaultMessage: "if no answer"
	},
	ifNoAnswerPhoneNumber: {
		id: "call-forward-if-busy-if-no-answer-phone-number",
		description: "In digital life, CallForwardingConfigurationForm, if busy, no answer phone number",
		defaultMessage: "Phone number"
	},
	ifOutOfReach: {
		id: "call-forwarding-forward-if-out-of-reach",
		description: "In digital life, CallForwardingConfigurationForm, if busy out of reach phone number label",
		defaultMessage: "if out of reach"
	},
	ifOutOfReachPhoneNumber: {
		id: "call-forward-if-busy-out-of-reach-phone-number",
		description: "In digital life, CallForwardingConfigurationForm, if busy, out of reach phone number",
		defaultMessage: "Phone number"
	},
	phoneNumber: {
		id: "call-forward-all-phone-number",
		description: "In digital life, CallForwardingConfigurationForm, all calls phone number",
		defaultMessage: "Phone number"
	},
	submitErrors: {
		id: "call-forwarding-configuration-error",
		description: "Call forwarding configuration submit failed, error message",
		defaultMessage: "Call forwarding configuration update failed"
	},
	title: {
		id: "call-forwarding-modal-title",
		description: "Call forwarding modal, title message",
		defaultMessage: "Call forwarding"
	},
	toggleOff: {
		id: "call-forward-toggler-off-text",
		description: "Toggle off position",
		defaultMessage: "Off"
	},
	toggleOn: {
		id: "call-forward-toggler-on-text",
		description: "Toggle on position",
		defaultMessage: "On"
	},
});

export default CallForwardingMessages;
export { CallForwardingMessages, CallForwardingMessagesType };
