/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ActivateSimMessagesType {
	activate: FormattedMessage.MessageDescriptor;
	activateSimBannerHeader: FormattedMessage.MessageDescriptor;
	activateSimBannerMessage: FormattedMessage.MessageDescriptor;
	activateSimButton: FormattedMessage.MessageDescriptor;
	activateSimExampleNumber: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	iccidDigitsPlaceholder: FormattedMessage.MessageDescriptor;
	invalidIccidMessage: FormattedMessage.MessageDescriptor;
	lastFiveDigits: FormattedMessage.MessageDescriptor;
	logo: FormattedMessage.MessageDescriptor;
	verificationErrorMessage: FormattedMessage.MessageDescriptor;
}
const ActivateSimMessages: ActivateSimMessagesType = defineMessages({
	activate: {
		id: "activate-sim-activate",
		description: "Activate SIM",
		defaultMessage: "Proceed"
	},
	activateSimBannerHeader: {
		id: "activate-sim-banner-header",
		description: "Activate SIM banner, header text",
		defaultMessage: "Welcome to your eCare account, {name}!"
	},
	activateSimBannerMessage: {
		id: "activate-sim-banner-message",
		description: "Activate SIM banner, message text",
		defaultMessage: "You are about to receive your new SIM card, you only need to activate it!"
	},
	activateSimButton: {
		id: "activate-sim-button-label",
		description: "Activate SIM banner, activate button label",
		defaultMessage: "Activate SIM"
	},
	activateSimExampleNumber: {
		id: "activate-sim-example-number",
		description: "Activate SIM example view, example number",
		defaultMessage: "0U2KO1BB0"
	},
	cancel: {
		id: "activate-sim-cancel",
		description: "Cancel",
		defaultMessage: "Cancel"
	},
	iccidDigitsPlaceholder: {
		id: "activate-sim-iccid-digits-placeholder",
		description: "iccid digits input placeholder",
		defaultMessage: "00025"
	},
	invalidIccidMessage: {
		id: "activate-sim-invalid-iccid-message",
		description: "Activate SIM modal, invalid ICCID message",
		defaultMessage: "Invalid last ICCID's digits"
	},
	lastFiveDigits: {
		id: "activate-sim-last-five-digits-label",
		description: "Activate SIM modal, last five digits of ICCID message",
		defaultMessage: "ICCID last 5 digits"
	},
	logo: {
		id: "activate-sim-logo-message",
		description: "Activate SIM banner, logo message",
		defaultMessage: "Logo"
	},
	verificationErrorMessage: {
		id: "activate-sim-verification-error-message",
		description: "Activate SIM modal, verification error message",
		defaultMessage: "Error during ICCID validation"
	},
});

export default ActivateSimMessages;
export { ActivateSimMessages, ActivateSimMessagesType };
