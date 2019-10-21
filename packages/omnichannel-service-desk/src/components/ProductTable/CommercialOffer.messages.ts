/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CommercialOfferMessagesType {
	commercialOffer: FormattedMessage.MessageDescriptor;
	viewPlanDetails: FormattedMessage.MessageDescriptor;
}
const CommercialOfferMessages: CommercialOfferMessagesType = defineMessages({
	commercialOffer: {
		id: "product-commercial-offers",
		description: "Commercial Offers",
		defaultMessage: "Commercial Offers"
	},
	viewPlanDetails: {
		id: "view-commercial-offer-plan-details",
		description: "view plan details",
		defaultMessage: "View plan details"
	},
});

export default CommercialOfferMessages;
export { CommercialOfferMessages, CommercialOfferMessagesType };
