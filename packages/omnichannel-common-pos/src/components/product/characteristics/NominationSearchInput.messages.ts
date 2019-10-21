/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface NominationSearchInputMessagesType {
	nominationSearchInputICC: FormattedMessage.MessageDescriptor;
	nominationSearchInputLabel: FormattedMessage.MessageDescriptor;
	nominationSearchInputMsisdn: FormattedMessage.MessageDescriptor;
	nominationSearchInputPlaceHolder: FormattedMessage.MessageDescriptor;
	nominationSearchInputSubscriptionInformation: FormattedMessage.MessageDescriptor;
	nominationSearchInputTariffPlan: FormattedMessage.MessageDescriptor;
	notFound: FormattedMessage.MessageDescriptor;
	numberNotReserved: FormattedMessage.MessageDescriptor;
	simNotAvailable: FormattedMessage.MessageDescriptor;
}
const NominationSearchInputMessages: NominationSearchInputMessagesType = defineMessages({
	nominationSearchInputICC: {
		id: "nomination-search-input-sim-icc",
		description: "NominationSeachInput, subscription information, SIM ICC header",
		defaultMessage: "SIM ICC"
	},
	nominationSearchInputLabel: {
		id: "nomination-search-input-label",
		description: "NominationSeachInput, search field label",
		defaultMessage: "Enter MSISDN or SIM ICC to see detailed information about the subscription that will be activated for the customer"
	},
	nominationSearchInputMsisdn: {
		id: "nomination-search-input-msisdn",
		description: "NominationSeachInput, subscription information, MSISDN header",
		defaultMessage: "MSISDN"
	},
	nominationSearchInputPlaceHolder: {
		id: "nomination-search-input-placeholder",
		description: "NominationSeachInput, search field placeholder",
		defaultMessage: "MSISDN or SIM ICC"
	},
	nominationSearchInputSubscriptionInformation: {
		id: "nomination-search-subscription-information-title",
		description: "NominationSeachInput, subscription information, title",
		defaultMessage: "Subscription information"
	},
	nominationSearchInputTariffPlan: {
		id: "nomination-search-input-tariff-plan",
		description: "NominationSeachInput, subscription information, Tariff plan header",
		defaultMessage: "Tariff plan"
	},
	notFound: {
		id: "nomination-search-input-not-found",
		description: "NominationSeachInput, subscription information, Not found",
		defaultMessage: "Not found"
	},
	numberNotReserved: {
		id: "nomination-search-input-number-not-reserved",
		description: "NominationSeachInput, subscription information, number not reserved",
		defaultMessage: "Number is not in correct status to be activated"
	},
	simNotAvailable: {
		id: "nomination-search-input-sim-not-available",
		description: "NominationSeachInput, subscription information, Sim not available",
		defaultMessage: "SIM card is not in correct status to be activated"
	},
});

export default NominationSearchInputMessages;
export { NominationSearchInputMessages, NominationSearchInputMessagesType };
