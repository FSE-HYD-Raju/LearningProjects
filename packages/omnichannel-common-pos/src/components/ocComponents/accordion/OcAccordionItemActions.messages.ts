/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface OcAccordionItemActionsMessagesType {
	hide: FormattedMessage.MessageDescriptor;
	showMore: FormattedMessage.MessageDescriptor;
}
const OcAccordionItemActionsMessages: OcAccordionItemActionsMessagesType = defineMessages({
	hide: {
		id: "contracted-product-show-more",
		description: "Contracted product show more",
		defaultMessage: "Hide"
	},
	showMore: {
		id: "contracted-product-show-less",
		description: "Contracted product show less",
		defaultMessage: "Show more"
	},
});

export default OcAccordionItemActionsMessages;
export { OcAccordionItemActionsMessages, OcAccordionItemActionsMessagesType };
