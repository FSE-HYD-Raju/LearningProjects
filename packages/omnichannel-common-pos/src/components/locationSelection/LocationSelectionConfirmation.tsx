import cssns from "../../utils/cssnsConfig";
import { FormattedMessage } from "../../channelUtils";
import messages from "./LocationSelection.messages";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const { React } = cssns("LocationSelectionConfirmation");

export interface LocationSelectionConfirmationProps {
	showingLocations: boolean;
	selectedLocation: string;
	confirmLocation(): void;
	handleNoAnotherArea(): void;
}

const LocationSelectionConfirmation = (props: LocationSelectionConfirmationProps) => {
	const { showingLocations, selectedLocation, confirmLocation, handleNoAnotherArea } = props;

	return (
		<div className="container">
			<span className="suggestion" id="you-are-here-message">
				<span className="map-marker">
					<i className="fa fa-map-marker" />
				</span>
				<FormattedMessage
					{...messages.youAreHere}
					values={{ selectedLocation }} // check if this works
				/>
			</span>
			<OcButton onClick={confirmLocation} buttonType={OcButtonType.LINK} className="accept" id="yes-right-button">
				<i className="fas fa-check-circle" />
				<FormattedMessage {...messages.yesRight} />
			</OcButton>
			{!showingLocations && (
				<OcButton
					onClick={handleNoAnotherArea}
					buttonType={OcButtonType.LINK}
					className="decline"
					id="no-another-area-message"
				>
					<i className="fas fa-times" />
					<FormattedMessage {...messages.noAnotherArea} />
				</OcButton>
			)}
		</div>
	);
};

export default LocationSelectionConfirmation;
