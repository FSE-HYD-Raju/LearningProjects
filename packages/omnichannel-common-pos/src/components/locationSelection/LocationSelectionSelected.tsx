import cssns from "../../utils/cssnsConfig";
import { values } from "lodash";
import { LocationInfo } from "../../redux/models/location/location.types";
import classnames from "classnames";
import messages from "./LocationSelection.messages";
import { PureComponent } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const { React } = cssns("LocationSelectionSelected");

interface LocationSelectionSelectedProps {
	selectedLocation: string;
	showingLocations: boolean;
	locations: Array<LocationInfo>;
	handleLocationClick: () => void;
	getFormattedLocation: (location: LocationInfo) => void;
	selectLocation: (location: LocationInfo) => void;
}

interface LocationSelectionSelectedState {
	breadcrumb: {
		[id: number]: LocationInfo;
	};
	activeLocation?: string;
	showingLocations: boolean;
}

const initialState = {
	breadcrumb: {},
	showingLocations: false
};

class LocationSelectionSelected extends PureComponent<LocationSelectionSelectedProps, LocationSelectionSelectedState> {
	constructor(props: LocationSelectionSelectedProps) {
		super(props);
		this.state = {
			...initialState
		};
	}

	componentWillReceiveProps(newProps: LocationSelectionSelectedProps) {
		if (!newProps.showingLocations && this.state !== initialState) {
			this.setState({
				...initialState
			});
		}
	}

	onLocationClick = (e: any, location: LocationInfo, selectLocation = this.props.selectLocation) => {
		e.preventDefault();
		this.setState({
			breadcrumb: {
				...this.state.breadcrumb,
				[location.attributes.level]: location
			},
			activeLocation: location.id
		});
		setTimeout(() => {
			selectLocation(location);
		}, 500);
	};

	render() {
		const { handleLocationClick, locations, getFormattedLocation } = this.props;

		return (
			<div className="this">
				<div className="LocationSelectionSelected-w-app-b2c-location">
					<div className="LocationSelectionSelected-w-app-b2c-location-city">
						<div className="LocationSelectionSelected-w-box-header">
							<h2>
								<FormattedMessage {...messages.chooseLocation}/>
							</h2>
							<a className="btn btn-link" onClick={handleLocationClick}>
								<i className="fa fa-fw fa-times" />
								<FormattedMessage {...messages.close}/>
							</a>
						</div>
						<div className="LocationSelectionSelected-breadcrumbs">
							{this.state.breadcrumb &&
								values(this.state.breadcrumb).map((b, idx) => {
									return (
										<span
											key={b.id}
											id={`bc-item-${b.id}`}
											onClick={e => {
												this.onLocationClick(e, b);
											}}
										>
											{b.attributes.label}
										</span>
									);
								})}
						</div>
						<ul>
							{locations.map((location, idx) => {
								const listClass = classnames({
									active: location.id === this.state.activeLocation
								});
								return (
									<li
										id={`location-option-${location.id}`}
										key={`location-option-${location.id}-${idx}`}
										onClick={e => {
											this.onLocationClick(e, location);
										}}
										className={listClass}
									>
										<span>
											{/*tslint:disable-next-line:jsx-use-translation-function */}
											{getFormattedLocation(location)}&nbsp;
											<i className="fa fa-check pull-right" />
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default LocationSelectionSelected;
export { LocationSelectionSelectedProps, LocationSelectionSelectedState };
