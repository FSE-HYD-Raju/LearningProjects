/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SubscriptionMessagesType {
	GIBIBYTES: FormattedMessage.MessageDescriptor;
	KIBIBYTES: FormattedMessage.MessageDescriptor;
	MEBIBYTES: FormattedMessage.MessageDescriptor;
	PEBIBYTES: FormattedMessage.MessageDescriptor;
	SMS: FormattedMessage.MessageDescriptor;
	TEBIBYTES: FormattedMessage.MessageDescriptor;
	stateDeactivate: FormattedMessage.MessageDescriptor;
	stateDeactivated: FormattedMessage.MessageDescriptor;
	stateDisable: FormattedMessage.MessageDescriptor;
	stateDisabled: FormattedMessage.MessageDescriptor;
	stateEnable: FormattedMessage.MessageDescriptor;
	stateEnabled: FormattedMessage.MessageDescriptor;
	stateReactivate: FormattedMessage.MessageDescriptor;
	stateReactivated: FormattedMessage.MessageDescriptor;
	stateResume: FormattedMessage.MessageDescriptor;
	stateResumed: FormattedMessage.MessageDescriptor;
	stateSuspend: FormattedMessage.MessageDescriptor;
	stateSuspended: FormattedMessage.MessageDescriptor;
}
const SubscriptionMessages: SubscriptionMessagesType = defineMessages({
	GIBIBYTES: {
		id: "graph-highlights-consumptions-view-gibibytes-text",
		description: "Consumptions, gibibytes text",
		defaultMessage: "{value} GB"
	},
	KIBIBYTES: {
		id: "graph-highlights-consumptions-view-kibibytes-text",
		description: "Consumptions, kibibytes text",
		defaultMessage: "{value} kB"
	},
	MEBIBYTES: {
		id: "graph-highlights-consumptions-view-mebibytes-text",
		description: "Consumptions, mebibytes text",
		defaultMessage: "{value} MB"
	},
	PEBIBYTES: {
		id: "graph-highlights-consumptions-view-pebibytes-text",
		description: "Consumptions, pebibytes text",
		defaultMessage: "{value} PB"
	},
	SMS: {
		id: "graph-highlights-consumptions-view-sms-text",
		description: "Consumptions, sms text",
		defaultMessage: "{value} SMS"
	},
	TEBIBYTES: {
		id: "graph-highlights-consumptions-view-tebibytes-text",
		description: "Consumptions, tebibytes text",
		defaultMessage: "{value} TB"
	},
	stateDeactivate: {
		id: "active-addons-deactivate-button-message",
		description: "Active addons lifecycle status deactivate button message",
		defaultMessage: "Deactivate"
	},
	stateDeactivated: {
		id: "active-addons-deactivate-button-message-past",
		description: "Active addons lifecycle status deactivate button message, past tense",
		defaultMessage: "Deactivated"
	},
	stateDisable: {
		id: "active-addons-disable-button-message",
		description: "Active addons lifecycle status disable button message",
		defaultMessage: "Disable"
	},
	stateDisabled: {
		id: "active-addons-disable-button-message-past",
		description: "Active addons lifecycle status disable button message, past tense",
		defaultMessage: "Disabled"
	},
	stateEnable: {
		id: "active-addons-enable-button-message",
		description: "Active addons lifecycle status enable button message",
		defaultMessage: "Enable"
	},
	stateEnabled: {
		id: "active-addons-enable-button-message-past",
		description: "Active addons lifecycle status enable button message, past tense",
		defaultMessage: "Enabled"
	},
	stateReactivate: {
		id: "active-addons-reactivate-button-message",
		description: "Active addons lifecycle status reactivate button message",
		defaultMessage: "Reactivate"
	},
	stateReactivated: {
		id: "active-addons-reactivate-button-message-past",
		description: "Active addons lifecycle status reactivate button message, past tense",
		defaultMessage: "Reactivated"
	},
	stateResume: {
		id: "active-addons-resume-button-message",
		description: "Active addons lifecycle status resume button message",
		defaultMessage: "Resume"
	},
	stateResumed: {
		id: "active-addons-resume-button-message-past",
		description: "Active addons lifecycle status resume button message, past tense",
		defaultMessage: "Resumed"
	},
	stateSuspend: {
		id: "active-addons-suspend-button-message",
		description: "Active addons lifecycle status suspend button message",
		defaultMessage: "Suspend"
	},
	stateSuspended: {
		id: "active-addons-suspend-button-message-past",
		description: "Active addons lifecycle status suspend button message, past tense",
		defaultMessage: "Suspended"
	},
});

export default SubscriptionMessages;
export { SubscriptionMessages, SubscriptionMessagesType };
