/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface TopUpBannerMessagesType {
	header: FormattedMessage.MessageDescriptor;
	text: FormattedMessage.MessageDescriptor;
}
const TopUpBannerMessages: TopUpBannerMessagesType = defineMessages({
	header: {
		id: "top-up-with-active-loan-banner-header",
		description: "Top-up with active loan banner header",
		defaultMessage: "You have active loan"
	},
	text: {
		id: "top-up-with-active-loan-banner-text",
		description: "Top-up with active loan banner text",
		defaultMessage: "Loan amount {amount}will take priority in execution to other refill activity"
	},
});

export default TopUpBannerMessages;
export { TopUpBannerMessages, TopUpBannerMessagesType };
