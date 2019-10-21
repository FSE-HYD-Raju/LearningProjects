import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../../testUtils";
import { LocationInfo, LocationItem, LocationRelationships, PostalAddress } from "../../../index";
import NavBarMobile, { NavBarMobileStateProps, NavBarMobileActionProps } from "./NavBarMobile";
import { MemoryRouter } from "react-router-dom";

const actionProps: NavBarMobileActionProps = {
	actions: {
		aaLogin: () => {},
		logout: () => {},
		toggleMobileNavigation: () => {},
		getLocations: (address?: PostalAddress, additionalParameters?: string, additionalPath?: string) => {},
		getDefaultLocation: (address: PostalAddress, isUserLoggedIn: boolean) => {},
		setLocationListVisible: (value: boolean) => {},
		setLocation: jest.fn(),
		toggleLocationList: jest.fn(),
		setDefault: () => {}
	}
};

const stateProps: NavBarMobileStateProps = {
	fetchingLocations: false,
	fetchingDefaultLocation: false,
	isUserLoggedIn: false,
	locationListVisible: true,
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
	mainCategories: []
};

const minProps = { ...actionProps, ...stateProps };

describe("NavBarMobile", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<MemoryRouter keyLength={0}>
				<NavBarMobile {...minProps} />
			</MemoryRouter>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it("succeeds at deep mount without props", () => {
		mountWithContext(<NavBarMobile {...minProps} />);
	});
	it("toggles location selection, when locations are open", () => {
		const wrapper = mountWithContext(
			<MemoryRouter>
				<NavBarMobile {...minProps} />
			</MemoryRouter>
		);
		wrapper.find("#toggle-locations-menu-open").simulate("click");
		expect(minProps.actions.toggleLocationList).toBeCalled();
	});
	it("toggles location selection, when locations are initially closed", () => {
		const testProps = { locationListVisible: false };
		const props = { ...minProps, ...testProps };
		const wrapper = mountWithContext(
			<MemoryRouter>
				<NavBarMobile {...props} />
			</MemoryRouter>
		);
		wrapper.find("#toggle-locations").simulate("click");
		expect(minProps.actions.toggleLocationList).toBeCalled();
	});
	it("selects location", () => {
		const wrapper = mountWithContext(
			<MemoryRouter>
				<NavBarMobile {...minProps} />
			</MemoryRouter>
		);
		wrapper.find("#location-option-1").simulate("click");
		expect(minProps.actions.setLocation).toBeCalled();
	});
});
