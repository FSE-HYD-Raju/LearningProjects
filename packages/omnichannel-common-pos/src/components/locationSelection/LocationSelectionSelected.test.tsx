import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import { LocationInfo, LocationItem, LocationRelationships } from "../../index";
import LocationSelectionSelected, { LocationSelectionSelectedProps } from "./LocationSelectionSelected";

describe("LocationSelectionSelected", () => {
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
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<LocationSelectionSelected {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("succeeds at deep mount without props", () => {
		mountWithContext(<LocationSelectionSelected {...minProps} />);
	});
	it("closes location selection when close link is pressed", () => {
		const wrapper = mountWithContext(<LocationSelectionSelected {...minProps} />);
		wrapper.find(".btn-link").simulate("click");
		expect(minProps.handleLocationClick).toBeCalled();
	});
	it("selects location", () => {
		const wrapper = mountWithContext(<LocationSelectionSelected {...minProps} />);
		wrapper.find("#location-option-1").simulate("click");
		setTimeout(() => {
			expect(minProps.selectLocation).toBeCalled();
		}, 1000);
	});
});
