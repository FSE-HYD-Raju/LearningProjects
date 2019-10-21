"use strict";
import { cssns } from "omnichannel-common-pos";
import { isEmpty } from "lodash";
import { LocationInfo, LocationSelectionView, FormattedMessage } from "omnichannel-common-pos";
import classnames from "classnames";
import messages from "./TopBarButtons.messages";

const { React } = cssns("TopBarButtons");

interface TopBarButtonsProps {
	selectedLocation: string;
	showingLocations: boolean;
	locations: Array<LocationInfo>;
	handleLocationClick(): void;
	getFormattedLocation(location: LocationInfo): void;
	selectLocation(location: LocationInfo): void;
}

const TopBarButtons: React.FC<TopBarButtonsProps> = (props: TopBarButtonsProps) => {
	const { locations, showingLocations, selectedLocation, handleLocationClick } = props;
	const toggleButtonClass = classnames({
		"TopBarButtons-btn btn w-app-pos-nav-location": true,
		active: showingLocations
	});
	return (
		<div className="this">
			<header className="w-app-pos-header">
				<nav className="w-app-pos-nav">
					<div className="TopBarButtons-btn-group btn-group">
						<span className={toggleButtonClass} onClick={handleLocationClick}>
							{selectedLocation ? (
								<span>{selectedLocation}</span>
							) : (
								<FormattedMessage {...messages.chooseLocation}

								/>
							)}
							<i className="fa fa-angle-down fa-fw" />
							<i className="fa fa-angle-up fa-fw" />
						</span>
					</div>
				</nav>
				{!isEmpty(locations) && showingLocations && (
					<aside className="TopBarButtons-w-app-pos-nav-content">
						<LocationSelectionView {...props} />
					</aside>
				)}
			</header>
		</div>
	);
};

export default TopBarButtons;
export {
	TopBarButtonsProps,
};
