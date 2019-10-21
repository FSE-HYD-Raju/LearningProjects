import * as React from "react";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	CustomerCase,
	TestUtils,
	mockRouterProps,
	User,
	InstallationTimeConfig,
} from "omnichannel-common-pos";
import ServiceDeskContainer, { ServiceDeskContainerProps } from "./ServiceDeskContainer";
import { ReactWrapper } from "enzyme";

describe("ServiceDeskContainer", () => {

	const redux = TestUtils.mockReduxStore({
		comparison: {},
		category: {
			mainCategories: [],
		},
		productOfferingConfiguration: {
			configurations: {}
		},
		navBar: {
			toolMode: false,
		},
	});

	const context = {
		store: redux,
		flux: {
			actions: {
				CustomerCaseActions: {
					getAgreements: jest.fn(),
				},
				BasketActions: {
					addProductToBasket: jest.fn(),
				},
				UserActions: {
					actAsUser: jest.fn(),
					updateUserDemoGraphicInfo: jest.fn(),
					updateUserAddresses: jest.fn(),
					updateUserPreferences: jest.fn(),
					updateUserPrivacySettings: jest.fn(),
					refreshUser: jest.fn(),
				},
				SalesRepSessionActions: {
					setSelectedOrganization: jest.fn(),
					revertSalesOrganizationAndInventory: jest.fn(),
					getInventories: jest.fn(),
					getOrganizations: jest.fn(),
				}
			},
			stores: {
				ConsulStore: {},
				CustomerStore: {},
				SalesStore: {
					fetchingProducts: false,
				},
				UserStore: {
					user: {
						salesRepUser: {},
					},
					updatingUser: false,
				},
				CustomerCaseStore: {
					activeCustomerCase: {
						attributes: {
							activeCustomer: {
							}
						}
					},
					state: {
						activeCustomerCase: true
					},
					agreements: [],
					getCustomerOffers: [],
					getSidebarNotifications: []
				},
			}
		}
	};

	const minimumProps: ServiceDeskContainerProps = {
		actions: {
			createNewCustomerCase: jest.fn(),
			getCustomerById: jest.fn(),
			showCustomerCreationModal: jest.fn(),
			searchCustomerWithSingleTerm: jest.fn(),
			setCustomer: jest.fn(),
			cancelAddProduct: jest.fn(),
			getAgreements: jest.fn(),
			toggleInstallationTimeConfigurationModal: jest.fn(),
			setInputtedCharacteristic: jest.fn(),
			resetConfigurableInstallationTime: jest.fn(),
			hideNoCustomerWarning: jest.fn(),
			hideBlacklistedCustomerWarning: jest.fn(),
		},
		...mockRouterProps,
		toolmode: false,
		toolmodeIndividualId: "",
		activeCustomerCase: {
			attributes: {
				activeCustomer: {
					id: "asdf"
				}
			}
		} as any as CustomerCase,
		showNoCustomerWarning: false,
		showBlacklistedCustomerWarning: false,
		singleTermCustomers: [],
		showCustomerCreationModal: false,
		showInstallationTimeConfigurationModal: false,
		installationTimeConfig: {} as any as InstallationTimeConfig,
		consulValuesLoaded: false,
		searchConfigs: "",
		enableNavbarInToolmode: false,
	};

	it("succeeds at shallow with minimum props", () => {
		const wrapper = shallowWithContext(<ServiceDeskContainer {...minimumProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props ", () => {
		const wrapper = mountWithContext(<ServiceDeskContainer {...minimumProps} />, { context });
		wrapper.unmount();
	});

	it("renders tool mode tab if activeCustomerCase.attributes.activeCustomer", () => {
		const props = {
			...minimumProps,
			activeCustomerCase: {
				attributes: {
					activeCustomer: {
						id: "foo"
					}
				}
			} as any as CustomerCase,
		};

		const wrapper = attachWithContext(<ServiceDeskContainer {...props} />, { context });
		expect(wrapper.text()).toContain("Tool mode");
		wrapper.detach();
	});

	it("doesn't render tabs when it is opened in tool mode", () => {
		const props = {
			...minimumProps,
			activeCustomerCase: {
				attributes: {
					activeCustomer: {}
				}
			} as any as CustomerCase,
			toolmode: true
		};

		const wrapper = shallowWithContext(<ServiceDeskContainer {...props} />, { context });
		expect(wrapper.find(".Pos-Desk-tabs")).toHaveLength(0);

		wrapper.unmount();
	});

	it("calls initToolMode() when opened with toolmode and individualId", () => {
		const getCustomerById = minimumProps.actions.getCustomerById;
		const props = {
			...minimumProps,
			user: {
				id: "dummy-id"
			} as any as User,
			toolmode: true,
			toolmodeIndividualId: "sanna"
		};

		mountWithContext(<ServiceDeskContainer {...props} />, { context });
		// Enough to check that both toolmode and toolmodeIndividualId are used properly
		expect(getCustomerById).toHaveBeenCalledWith("sanna");
	});

	it("shows Customer search modal and passes search term and criteria to search function", done => {
		const { getModalContents } = TestUtils;

		const name = "Timo Isokoski";

		const props: ServiceDeskContainerProps = {
			...minimumProps,
			actions: {
				...minimumProps.actions,
				searchCustomerWithSingleTerm: (term, criteria) => {
					expect(term).toEqual(name);
					expect(criteria).toEqual("name");
					done();
				},
			},
			showNoCustomerWarning: true,
		};

		const wrapper = attachWithContext(<ServiceDeskContainer {...props} />, { context });

		const unidentifiedCustomerModal = wrapper.find("OcModal")
			.filterWhere((n: ReactWrapper) => (n.props() as any).id === "UnidentifiedCustomerModal");

		expect(unidentifiedCustomerModal.length).toEqual(1);

		const modalContents = getModalContents(unidentifiedCustomerModal);

		const form = modalContents.find("form");
		const customerSearchField = form.find("#customerSearchFieldToAddProductToBasket").hostNodes();

		customerSearchField.simulate("change", { target: { value: name } });
		form.simulate("submit");

		wrapper.detach();
	});
});
