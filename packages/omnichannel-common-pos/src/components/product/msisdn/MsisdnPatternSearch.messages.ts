/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface MsisdnPatternSearchMessagesType {
	errorInvalidPattern: FormattedMessage.MessageDescriptor;
	errorMaxLength: FormattedMessage.MessageDescriptor;
	patternInputPlaceholder: FormattedMessage.MessageDescriptor;
	refreshNumberPattern: FormattedMessage.MessageDescriptor;
	searchPattern: FormattedMessage.MessageDescriptor;
	specifyPattern: FormattedMessage.MessageDescriptor;
}
const MsisdnPatternSearchMessages: MsisdnPatternSearchMessagesType = defineMessages({
	errorInvalidPattern: {
		id: "common-msisdn-pattern-error-invalid-pattern",
		description: "MsisdnPatternSearch, invalid pattern error message",
		defaultMessage: "Invalid pattern"
	},
	errorMaxLength: {
		id: "common-msisdn-pattern-error-max-length-exceeded",
		description: "MsisdnPatternSearch, max length exceeded error message",
		defaultMessage: "You are not allowed to enter more than {maxLength} digits"
	},
	patternInputPlaceholder: {
		id: "common-msisdn-pattern-search-placeholder",
		description: "MsisdnPatternSearch, placeholder text for pattern search",
		defaultMessage: "Enter pattern"
	},
	refreshNumberPattern: {
		id: "b2c-msisdn-configuration-refresh-bundle",
		description: "Refresh the set of numbers shown to user, button text",
		defaultMessage: "Refresh number set"
	},
	searchPattern: {
		id: "b2c-msisdn-configuration-get-new-bundle",
		description: "Refresh the set of numbers shown to user, button text",
		defaultMessage: "Search"
	},
	specifyPattern: {
		id: "common-msisdn-pattern-search-input-label",
		description: "MsisdnPatternSearch, common pattern search component label",
		defaultMessage: "Specify a pattern (Optional, extra charges may apply)"
	},
});

export default MsisdnPatternSearchMessages;
export { MsisdnPatternSearchMessages, MsisdnPatternSearchMessagesType };
