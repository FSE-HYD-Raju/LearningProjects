/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface MsisdnSelectionPickerMessagesType {
	errorNoNumbers: FormattedMessage.MessageDescriptor;
	refreshNumberSet: FormattedMessage.MessageDescriptor;
}
const MsisdnSelectionPickerMessages: MsisdnSelectionPickerMessagesType = defineMessages({
	errorNoNumbers: {
		id: "common-msisdn-selection-picker-no-numbers",
		description: "MsisdnSelectionPicker, no numbers found for pattern",
		defaultMessage: "There are no available numbers matching the entered pattern"
	},
	refreshNumberSet: {
		id: "msisdn-selection-picker-refresh-number-set",
		description: "Refresh the set of numbers shown to user, button text",
		defaultMessage: "Refresh number set"
	},
});

export default MsisdnSelectionPickerMessages;
export { MsisdnSelectionPickerMessages, MsisdnSelectionPickerMessagesType };
