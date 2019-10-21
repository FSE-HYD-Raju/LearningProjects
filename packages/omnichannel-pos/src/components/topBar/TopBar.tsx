"use strict";

import * as React from "react";
import { isEmpty } from "lodash";
import { LOCATIONS_ROOT_LEVEL_QUERY } from "omnichannel-common-pos";
import TopBarButtons from "./TopBarButtons";

import {
	contextTypesValidationMap,
	LocationItem,
	LocationInfo,
	LocationUtil,
	isChannelPos,
	B2CComponentCustomizationPoints,
	withCustomization,
	PostalAddress
} from "omnichannel-common-pos";

interface TopBarStateProps {
	defaultLocationAddress?: PostalAddress;
	customerAddress?: PostalAddress;
	fetchingLocations: boolean;
	fetchingDefaultLocation: boolean;
	activeCustomerId?: string;
	locationListVisible: boolean;
	selectedLocation?: LocationInfo;
	locations: Array<LocationInfo>;
	locationSelectionEnabled?: boolean;
	shouldCallDefaultLocation?: boolean;
}

interface TopBarActionProps {
	actions: {
		getLocations(address?: PostalAddress, additionalParameters?: string, additionalPath?: string): void;
		getDefaultLocation(address: PostalAddress, activeCustomerId: boolean): void;
		setLocationListVisible(value: boolean): void;
		setLocation(location: LocationInfo): void;
		toggleLocationList(): void;
		setDefault(): void;
		resetLocations(): void;
	};
}

type TopBarProps = TopBarStateProps & TopBarActionProps;

const LOCATION_NOT_FOUND = null;

type State = {
	activeCustomerId?: string;
};

class TopBar extends React.Component<TopBarProps, State> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: TopBarProps) {
		super(props);

		this.state = {
			activeCustomerId: undefined
		};
	}

	getLocations(props: Partial<TopBarProps>) {
		if (!props.fetchingLocations && isEmpty(props.locations) && props.actions) {
			props.actions.getLocations(undefined, LOCATIONS_ROOT_LEVEL_QUERY);
		}
	}

	fetchDefaultLocation(props: Partial<TopBarProps>) {
		let address = props.defaultLocationAddress;

		if (props.activeCustomerId && props.customerAddress) {
			address = props.customerAddress;
		}

		if (address && props.actions && props.shouldCallDefaultLocation) {
			props.actions.getDefaultLocation(address, Boolean(props.activeCustomerId));
		}
	}

	componentDidMount() {
		if (isChannelPos() && this.props.locationSelectionEnabled) {
			this.getLocations(this.props);
		}
	}

	componentWillUnmount() {
		this.props.actions.resetLocations();
	}

	isLocationValid = (location?: LocationInfo | LocationItem | null): boolean => {
		return !isEmpty(location);
	};

	shouldFetchDefaultLocation = (props: TopBarProps, loggedInStatusChanged: boolean): boolean => {
		if (!props.locationSelectionEnabled) {
			return false;
		}

		if (!props.fetchingDefaultLocation) {
			if (this.isLocationValid(props.selectedLocation) && props.selectedLocation !== LOCATION_NOT_FOUND) {
				return loggedInStatusChanged;
			} else {
				return props.selectedLocation !== LOCATION_NOT_FOUND;
			}
		}

		return false;
	};

	componentDidUpdate() {
		const loggedInStatusChanged = this.state.activeCustomerId !== this.props.activeCustomerId;
		if (this.shouldFetchDefaultLocation(this.props, loggedInStatusChanged)) {
			this.fetchDefaultLocation(this.props);
		}

		if (this.props.activeCustomerId !== this.state.activeCustomerId) {
			this.setState({ activeCustomerId: this.props.activeCustomerId });
		}
	}

	// Open or close location list.
	toggleLocationOptions = () => this.props.actions.toggleLocationList();

	/*
		User selected new location.
		If there is no more children on the selectedLocation close the list view.
		If there is no more children confirm current selection as selected location.
	*/
	selectLocation = (selectedLocation: LocationInfo) => {
		if (selectedLocation) {
			this.props.actions.setLocation(selectedLocation);
		}
	};

	openLocationList = () => this.props.actions.setLocationListVisible(true);
	closeLocationList = () => this.props.actions.setLocationListVisible(false);

	render() {
		const { selectedLocation, locationListVisible } = this.props;

		const { locations } = this.props;
		const locationLabel = !isEmpty(selectedLocation) ? LocationUtil.getLocationLabel(selectedLocation!) : "";

		return (
			<div id="TopBar" className="TopBar-container">
				{
					<TopBarButtons
						selectedLocation={locationLabel}
						handleLocationClick={this.toggleLocationOptions}
						showingLocations={locationListVisible}
						locations={locations}
						getFormattedLocation={LocationUtil.getLocationLabel}
						selectLocation={this.selectLocation}
					/>
				}
			</div>
		);
	}
}

// TODO: Create some map of default customizations
export default withCustomization(B2CComponentCustomizationPoints.APP_HEADER_TOP_BAR, TopBar);

export { TopBarProps, TopBarActionProps, TopBarStateProps };
