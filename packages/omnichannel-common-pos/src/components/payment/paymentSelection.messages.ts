/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface PaymentSelectionMessagesType {
	paymentOnDeliveryChangeMobileNumber: FormattedMessage.MessageDescriptor;
	paymentOnDeliveryCustomerInfoStep: FormattedMessage.MessageDescriptor;
	paymentOnDeliveryOnTimePasscode: FormattedMessage.MessageDescriptor;
}
const PaymentSelectionMessages: PaymentSelectionMessagesType = defineMessages({
	paymentOnDeliveryChangeMobileNumber: {
		id: "payment-on-delivery-change-mobile-number",
		description: "Description for changing earlier mobile",
		defaultMessage: "You can change the mobile number you entered in the first step of checkout"
	},
	paymentOnDeliveryCustomerInfoStep: {
		id: "payment-on-delivery-customer-info-step",
		description: "return to customer information step",
		defaultMessage: "Customer info step"
	},
	paymentOnDeliveryOnTimePasscode: {
		id: "payment-on-delivery-one-time-passcode",
		description: "Description when one time pass",
		defaultMessage: "If you choose to pay on delivery, then you receive a one-time passcode to phone number"
	},
});

export default PaymentSelectionMessages;
export { PaymentSelectionMessages, PaymentSelectionMessagesType };
