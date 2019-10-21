/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface SalesMessagesType {
	barcodeInput: FormattedMessage.MessageDescriptor;
}
const SalesMessages: SalesMessagesType = defineMessages({
	barcodeInput: {
		id: "service-desk-enter-barcode-sku",
		description: "Placeholder for service desk barcode/sku input field",
		defaultMessage: "Enter barcode..."
	},
});

export default SalesMessages;
export { SalesMessages, SalesMessagesType };
