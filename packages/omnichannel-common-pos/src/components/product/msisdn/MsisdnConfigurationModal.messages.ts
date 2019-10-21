/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface MsisdnConfigurationModalMessagesType {
	msisdnMonthlyPriceSuffix: FormattedMessage.MessageDescriptor;
	planConfigurationModalActivationFee: FormattedMessage.MessageDescriptor;
	planConfigurationModalRecurringFee: FormattedMessage.MessageDescriptor;
	selectNumber: FormattedMessage.MessageDescriptor;
	selectNumberAndAddToBasket: FormattedMessage.MessageDescriptor;
}
const MsisdnConfigurationModalMessages: MsisdnConfigurationModalMessagesType = defineMessages({
	msisdnMonthlyPriceSuffix: {
		id: "product-offering-msisdn-config-price-mth",
		description: "Recurring fee per month suffix",
		defaultMessage: " / month"
	},
	planConfigurationModalActivationFee: {
		id: "plan-configuration-modal-label-activation-fee",
		description: "Plan configuration modal, activation fee label text",
		defaultMessage: "Activation fee"
	},
	planConfigurationModalRecurringFee: {
		id: "plan-configuration-modal-label-recurring-fee",
		description: "Plan configuration modal, recurring fee label text",
		defaultMessage: "Recurring fee"
	},
	selectNumber: {
		id: "plan-config-modal-select-number-button",
		description: "Select number button in plan config modal",
		defaultMessage: "Select number"
	},
	selectNumberAndAddToBasket: {
		id: "plan-config-modal-select-number-and-add-to-basket-button",
		description: "Select number and add to basket button in plan config modal",
		defaultMessage: "Select number and add to basket"
	},
});

export default MsisdnConfigurationModalMessages;
export { MsisdnConfigurationModalMessages, MsisdnConfigurationModalMessagesType };
