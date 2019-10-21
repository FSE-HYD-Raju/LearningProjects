import * as React from "react";
import TopBar, { TopBarProps } from "./TopBar";
import { mountWithContext, shallowWithContext, TestUtils, LocationInfo } from "omnichannel-common-pos";
import { ReactWrapper, ShallowWrapper } from "enzyme";

describe("TopBar", () => {
	let wrapper: ShallowWrapper<TopBarProps> | ReactWrapper<TopBarProps>;
	let props: TopBarProps;

	const { makeStore } = TestUtils;

	const context = {
		flux: {
			actions: {},
			stores: {
				CmsAdminStore: {
					...makeStore("context.flux.stores.CmsAdminStore"),
					previewData: () => true
				},
				UserStore: {
					...makeStore("context.flux.stores.UserStore"),
					isLoggedIn: () => true
				}
			}
		},
		store: TestUtils.mockReduxStore({
			auth: {},
			user: { user: { firstName: "Test"}},
			category: {},
		})
	};

	beforeEach(() => {
		process.env.omnichannel = "pos";

		props = {
			shouldCallDefaultLocation: true /* part of a temporary fix, see RUBT-128269 */,
			customerAddress: undefined,
			fetchingLocations: false,
			fetchingDefaultLocation: false,
			locationListVisible: false,
			locations: [],
			activeCustomerId: undefined,
			locationSelectionEnabled: true,
			actions: {
				getLocations: jest.fn(),
				getDefaultLocation: jest.fn(),
				setLocationListVisible: jest.fn(),
				setDefault: jest.fn(),
				setLocation: jest.fn(),
				toggleLocationList: jest.fn(),
				resetLocations: jest.fn()
			}
		};
	});

	afterEach(() => {
		delete process.env.omnichannel;

		if (wrapper) {
			wrapper.unmount();
		}
	});

	const defaultLocationAddresses = [
		{
			postalCode: "01101",
			city: "San Salvador"
		},
		{
			postalCode: "00100",
			city: "Helsinki"
		},
		{
			postalCode: "69121",
			city: "Joensuu"
		}
	];

	const defaultCustomerAddress = {
		postalCode: "01101",
		city: "San Salvador"
	};

	it("succeeds at shallow mount with min props", () => {
		wrapper = shallowWithContext(<TopBar {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("fetches default location for an anonymous user", () => {
		const mockProps: TopBarProps = {
			...props,
			activeCustomerId: undefined,
			fetchingDefaultLocation: false,
			selectedLocation: undefined,
			defaultLocationAddress: defaultLocationAddresses[0]
		};

		let wrapper = mountWithContext(<TopBar {...mockProps} />, { context }, true);
		expect(mockProps.actions.getDefaultLocation).not.toHaveBeenCalled();

		wrapper.setProps(mockProps);
		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledWith(mockProps.defaultLocationAddress, false);
	});

	it("fetches default location for a known customer", () => {
		const mockProps: TopBarProps = {
			...props,
			activeCustomerId: "juanita",
			fetchingDefaultLocation: false,
			selectedLocation: undefined,
			customerAddress: defaultCustomerAddress
		};

		let wrapper = mountWithContext(<TopBar {...mockProps} />, { context }, true);
		expect(mockProps.actions.getDefaultLocation).not.toHaveBeenCalled();

		wrapper.setProps(mockProps);
		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledWith(mockProps.customerAddress, true);
	});

	it("uses address of default location when fetching it for a known customer that has no postal address set", () => {
		const mockProps: TopBarProps = {
			...props,
			customerAddress: undefined,
			activeCustomerId: "juanita",
			fetchingDefaultLocation: false,
			selectedLocation: undefined,
			defaultLocationAddress: defaultLocationAddresses[0]
		};

		let wrapper = mountWithContext(<TopBar {...mockProps} />, { context }, true);

		wrapper.setProps(mockProps);

		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledWith(mockProps.defaultLocationAddress, true);
	});

	it("default location is fetched only once per page load for anonymous user (location found)", () => {
		const mockProps: TopBarProps = {
			...props,
			activeCustomerId: undefined,
			fetchingDefaultLocation: false,
			selectedLocation: undefined
		};

		let wrapper = mountWithContext(<TopBar {...mockProps} />, { context }, true);

		wrapper.setProps({
			...mockProps,
			defaultLocationAddress: defaultLocationAddresses[1]
		});
		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledWith(defaultLocationAddresses[1], false);
		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledTimes(1);
	});

	it("when no location was found, default location query will not be executed again (for anonymous user)", () => {
		const mockProps: TopBarProps = {
			...props,
			activeCustomerId: undefined,
			fetchingDefaultLocation: false,
			selectedLocation: undefined,
			defaultLocationAddress: defaultLocationAddresses[1]
		};

		let wrapper = mountWithContext(<TopBar {...mockProps} />, { context }, true);

		wrapper = wrapper.update();

		wrapper.setProps({
			...mockProps,
			selectedLocation: null /* the 'not found' value. */
		});

		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledTimes(0);
	});

	it("default location is fetched again when user logs in (a location is already set)", () => {
		const initialProps: TopBarProps = {
			...props,
			activeCustomerId: undefined,
			fetchingDefaultLocation: false,
			defaultLocationAddress: defaultLocationAddresses[2]
		};

		let wrapper = mountWithContext(<TopBar {...initialProps} />, { context }, true);

		expect(initialProps.actions.getDefaultLocation).toHaveBeenCalledTimes(0);

		wrapper = wrapper.setProps(initialProps);
		expect(initialProps.actions.getDefaultLocation).toHaveBeenCalledTimes(1);

		const locationSetProps = {
			...initialProps,
			selectedLocation: ({
				id: 2
			} as any) as LocationInfo
		};
		wrapper = wrapper.setProps(locationSetProps);

		expect(initialProps.actions.getDefaultLocation).toHaveBeenCalledTimes(1);

		const userLogsInProps = {
			...initialProps,
			activeCustomerId: "juanita",
			customerAddress: defaultCustomerAddress
		};
		wrapper.setProps(userLogsInProps);

		expect(userLogsInProps.actions.getDefaultLocation).toHaveBeenCalledWith(userLogsInProps.customerAddress, true);
		expect(userLogsInProps.actions.getDefaultLocation).toHaveBeenCalledTimes(2);
	});

	it("disables location selection, if location selection is not enabled", () => {
		const mockProps: TopBarProps = {
			...props,
			locationSelectionEnabled: false
		};
		expect(mockProps.actions.getDefaultLocation).toHaveBeenCalledTimes(0);
		expect(mockProps.actions.getLocations).toHaveBeenCalledTimes(0);
	});

	it("resets locations on unmount", () => {
		const wrapper = shallowWithContext(<TopBar {...props} />);
		wrapper.instance().componentWillUnmount();
		expect(props.actions.resetLocations).toHaveBeenCalledTimes(1);
	});
});
