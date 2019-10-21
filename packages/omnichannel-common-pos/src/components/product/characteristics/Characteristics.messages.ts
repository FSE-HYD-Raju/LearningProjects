/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CharacteristicsMessagesType {
	defaultError: FormattedMessage.MessageDescriptor;
	deviceAlreadyRegistered: FormattedMessage.MessageDescriptor;
	deviceAlreadyRegisteredWith: FormattedMessage.MessageDescriptor;
	deviceBlacklisted: FormattedMessage.MessageDescriptor;
	deviceBlacklistedWith: FormattedMessage.MessageDescriptor;
	msisdnDoesNotBelongToOperator: FormattedMessage.MessageDescriptor;
	simCardNotFoundWithGivenICCID: FormattedMessage.MessageDescriptor;
	simCardNotPreactivated: FormattedMessage.MessageDescriptor;
	simCardStateInvalid: FormattedMessage.MessageDescriptor;
}
const CharacteristicsMessages: CharacteristicsMessagesType = defineMessages({
	defaultError: {
		id: "default-characteristic-error",
		description: "Shown when an error happens, but the error code does not have specific localization",
		defaultMessage: "An error has occurred."
	},
	deviceAlreadyRegistered: {
		id: "device-already-registered",
		description: "Shown when imei validation returns device already registered without specification",
		defaultMessage: "Device already registered"
	},
	deviceAlreadyRegisteredWith: {
		id: "device-already-registered-with",
		description: "Shown when imei validation returns device already registered with specification",
		defaultMessage: "Device already registered in {target}"
	},
	deviceBlacklisted: {
		id: "device-blacklisted",
		description: "Shown when imei validation returns device blacklisted without specification",
		defaultMessage: "Device blacklisted"
	},
	deviceBlacklistedWith: {
		id: "device-blacklisted-with",
		description: "Shown when imei validation returns device is blacklisted with specification",
		defaultMessage: "Device blacklisted in {target}"
	},
	msisdnDoesNotBelongToOperator: {
		id: "msisdn-does-not-belong-to-operator",
		description: "Shown when FnF validation returns msisdn does not belong with operator",
		defaultMessage: "Msisdn does not belong to the operator"
	},
	simCardNotFoundWithGivenICCID: {
		id: "sim-card-not-found-with-given-iccid",
		description: "Shown when iccid validation is on and search returns resource not found",
		defaultMessage: "Sim-card with given ICCID was not found."
	},
	simCardNotPreactivated: {
		id: "sim-card-not-pre-activated",
		description: "Shown when iccid preactivation validation is on and search returns sim-card but it has no pre activated msisdn",
		defaultMessage: "Sim-card with given ICCID is not pre-activated or invalid."
	},
	simCardStateInvalid: {
		id: "sim-card-not-state-invalid",
		description: "Shown when iccid validation is on and search returns sim-card but state is not valid",
		defaultMessage: "Sim-card with given ICCID is either already in use or not available."
	},
});

export default CharacteristicsMessages;
export { CharacteristicsMessages, CharacteristicsMessagesType };
