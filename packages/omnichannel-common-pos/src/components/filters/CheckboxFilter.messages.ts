/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface CheckboxFilterMessagesType {
	"home-zone": FormattedMessage.MessageDescriptor;
	showOnlyPlans: FormattedMessage.MessageDescriptor;
}
const CheckboxFilterMessages: CheckboxFilterMessagesType = defineMessages({
	"home-zone": {
		id: "home-zone-filter-label",
		description: "Home zone filter label",
		defaultMessage: "Home zone"
	},
	showOnlyPlans: {
		id: "show-only-filter-label",
		description: "Show only filter label",
		defaultMessage: "Show only {filterValue} plans"
	},
});

export default CheckboxFilterMessages;
export { CheckboxFilterMessages, CheckboxFilterMessagesType };
