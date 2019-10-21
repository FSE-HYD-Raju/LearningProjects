import LocationSelectionSelected, { LocationSelectionSelectedProps } from "./LocationSelectionSelected";
import cssns from "../../utils/cssnsConfig";
import classnames from "classnames";

const { React } = cssns("LocationSelectionView");

const LocationSelectionView = (props: LocationSelectionSelectedProps) => {
	return (
		<div className={classnames({ this: true })}>
			<LocationSelectionSelected {...props} />
		</div>
	);
};

export default LocationSelectionView;
