/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface MarketingConsentMessagesType {
	customerProfiling: FormattedMessage.MessageDescriptor;
	enrichmentCustomer: FormattedMessage.MessageDescriptor;
	geoLocalization: FormattedMessage.MessageDescriptor;
	geoLocalizationForOffers: FormattedMessage.MessageDescriptor;
	iGiveMyConsent: FormattedMessage.MessageDescriptor;
	marketingCommunications: FormattedMessage.MessageDescriptor;
	marketingCommunicationsFrom3rd: FormattedMessage.MessageDescriptor;
	ownMarketing: FormattedMessage.MessageDescriptor;
	profiling: FormattedMessage.MessageDescriptor;
	save: FormattedMessage.MessageDescriptor;
	thirdPartyEnrichment: FormattedMessage.MessageDescriptor;
	thirdPartyMarketing: FormattedMessage.MessageDescriptor;
	thirdPartyTransfer: FormattedMessage.MessageDescriptor;
	transferOfCustomerData: FormattedMessage.MessageDescriptor;
}
const MarketingConsentMessages: MarketingConsentMessagesType = defineMessages({
	customerProfiling: {
		id: "customer-profiling-description",
		description: "Marketing consent capture, description for Profiling",
		defaultMessage: "Customer profiling through analysis of products/services usage"
	},
	enrichmentCustomer: {
		id: "customer-3rd-party-enrichment-description",
		description: "Marketing consent capture, description for 3rd-party-enrichment",
		defaultMessage: "Enrichment of customer data with information gathered from 3rd parties"
	},
	geoLocalization: {
		id: "customer-geo-localization-label",
		description: "Marketing consent capture, label for Geo localization",
		defaultMessage: "Geo localization"
	},
	geoLocalizationForOffers: {
		id: "customer-geo-localization-description",
		description: "Marketing consent capture, description for Geo localization",
		defaultMessage: "Geo localization for location-based offers, promotions and discounts"
	},
	iGiveMyConsent: {
		id: "customer-overall-acceptance-message",
		description: "Marketing consent, overall acceptance message for checkbox",
		defaultMessage: "I give my consent to processing of my personal data"
	},
	marketingCommunications: {
		id: "customer-own-marketing-description",
		description: "Marketing consent capture, description for Own marketing",
		defaultMessage: "Marketing communications from the operator"
	},
	marketingCommunicationsFrom3rd: {
		id: "customer-third-party-marketing-description",
		description: "Marketing consent capture, description for third-party-marketing",
		defaultMessage: "Marketing communications from 3rd parties"
	},
	ownMarketing: {
		id: "customer-own-marketing-label",
		description: "Marketing consent capture, label for Own marketing",
		defaultMessage: "Own marketing"
	},
	profiling: {
		id: "customer-profiling-label",
		description: "Marketing consent capture, label for Profiling",
		defaultMessage: "Profiling"
	},
	save: {
		id: "customer-save-answers-button-text",
		description: "Marketing consent capture, text for Save answers button",
		defaultMessage: "Save"
	},
	thirdPartyEnrichment: {
		id: "customer-3rd-party-enrichment-label",
		description: "Marketing consent capture, label for 3rd-party-enrichment",
		defaultMessage: "3rd-party-enrichment"
	},
	thirdPartyMarketing: {
		id: "customer-third-party-marketing-label",
		description: "Marketing consent capture, label for third-party-marketing",
		defaultMessage: "third-party-marketing"
	},
	thirdPartyTransfer: {
		id: "customer-3rd-party-transfer-label",
		description: "Marketing consent capture, label for 3rd-party-transfer",
		defaultMessage: "3rd-party-transfer"
	},
	transferOfCustomerData: {
		id: "customer-3rd-party-transfer-description",
		description: "Marketing consent capture, description for 3rd-party-transfer",
		defaultMessage: "Transfer of customer data to trusted partners, for commercial offers"
	},
});

export default MarketingConsentMessages;
export { MarketingConsentMessages, MarketingConsentMessagesType };
