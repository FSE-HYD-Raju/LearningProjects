import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import LocationSelectionView from "./LocationSelectionView";
import { LocationSelectionSelectedProps } from "./LocationSelectionSelected";
import { LocationInfo, LocationItem, LocationRelationships } from "../../index";

describe("LocationSelectionView", () => {
	const minProps: LocationSelectionSelectedProps = {
		selectedLocation: "loc",
		handleLocationClick: jest.fn(),
		showingLocations: false,
		locations: [
			{
				id: "1",
				type: "geolocations",
				attributes: ({
					city: "null",
					externalId: "external_id_1",
					label: "Western Finland",
					level: 0,
					postalCode: "null"
				} as any) as LocationItem,
				relationships: ({
					parent: null /* NOTE this is not necessarily standard, just for these tests! */
				} as any) as LocationRelationships
			} as LocationInfo
		],
		getFormattedLocation: jest.fn(),
		selectLocation: jest.fn()
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<LocationSelectionView {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<LocationSelectionView {...minProps} />);
	});
});
