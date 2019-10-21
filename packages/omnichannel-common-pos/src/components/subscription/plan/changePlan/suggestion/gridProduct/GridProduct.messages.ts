/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface GridProductMessagesType {
	activationPriceDescription: FormattedMessage.MessageDescriptor;
	recurrentPriceDescription: FormattedMessage.MessageDescriptor;
	selectPlanButton: FormattedMessage.MessageDescriptor;
	viewDetails: FormattedMessage.MessageDescriptor;
}
const GridProductMessages: GridProductMessagesType = defineMessages({
	activationPriceDescription: {
		id: "grid-product-plan-activation-price-description",
		description: "grid product, activation price description",
		defaultMessage: "activation"
	},
	recurrentPriceDescription: {
		id: "grid-product-plan-recurrent-price-description",
		description: "grid product, recurrent price description",
		defaultMessage: "monthly"
	},
	selectPlanButton: {
		id: "grid-product-select-plan-button",
		description: "grid product, select plan button",
		defaultMessage: "Select plan"
	},
	viewDetails: {
		id: "grid-product-plan-details-link",
		description: "grid product, plan details link",
		defaultMessage: "View details"
	},
});

export default GridProductMessages;
export { GridProductMessages, GridProductMessagesType };
