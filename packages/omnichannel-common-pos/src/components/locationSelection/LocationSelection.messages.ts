/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface LocationSelectionMessagesType {
	chooseLocation: FormattedMessage.MessageDescriptor;
	close: FormattedMessage.MessageDescriptor;
	noAnotherArea: FormattedMessage.MessageDescriptor;
	yesRight: FormattedMessage.MessageDescriptor;
	youAreHere: FormattedMessage.MessageDescriptor;
}
const LocationSelectionMessages: LocationSelectionMessagesType = defineMessages({
	chooseLocation: {
		id: "location-selection-selected-choose-location",
		description: "LocationSelectionSelected, choose location title",
		defaultMessage: "Choose location"
	},
	close: {
		id: "location-selection-selected-close-link",
		description: "LocationSelectionSelected, close",
		defaultMessage: "Close"
	},
	noAnotherArea: {
		id: "location-selection-no-another-area-message",
		description: "Location selection no another area message",
		defaultMessage: "No, another area"
	},
	yesRight: {
		id: "location-selection-yes-right-button-message",
		description: "Location selection yes right button message",
		defaultMessage: "Yes, Right!"
	},
	youAreHere: {
		id: "language-selection-you-are-here-message",
		description: "Language selection you are here message",
		defaultMessage: "`You are here: {selectedLocation}?`"
	},
});

export default LocationSelectionMessages;
export { LocationSelectionMessages, LocationSelectionMessagesType };
