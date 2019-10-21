import * as React from "react";
import { CustomerSelectionProps, CustomerSelectionUnwrapped as CustomerSelection } from "./CustomerSelection";
import { User } from "../../../redux";
import { RouteComponentProps } from "react-router";
import { ReactWrapper } from "enzyme";
import { CustomerListDropdownProps } from "../CustomerListDropdown/CustomerListDropdown";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils,
	SimpleDataMock,
	mountWithContextAndRouterProps
} from "../../../testUtils";
const { makeStore } = TestUtils;

describe("CustomerSelection", () => {
	let minProps: CustomerSelectionProps;
	let user: User;
	let context: any;
	let store: any;
	let consulStore: any;

	beforeEach(() => {
		consulStore = {
			searchConfigs:
				"{\"POSSearchConfigs\":[{\"id\": \"name\", \"enabled\": true}," +
				"{\"id\": \"phone-number\",\"enabled\": true}," +
				"{\"id\": \"passport\",\"identificationType\": \"passport\",\"enabled\": true}," +
				"{\"id\": \"minor-ID\",\"identificationType\": \"minor-ID\",\"enabled\": true}," +
				"{\"id\": \"ID-card\",\"identificationType\": \"identification-card\",\"enabled\": true}," +
				"{\"id\": \"military-ID\",\"identificationType\": \"military-ID\",\"enabled\": true}," +
				"{\"id\": \"foreign-document\",\"identificationType\": \"foreign-document\",\"enabled\": true}," +
				"{\"id\": \"diplomatic-carnet\",\"identificationType\": \"diplomatic-carnet\",\"enabled\": true}," +
				"{\"id\": \"student-ID\",\"identificationType\": \"student-ID\",\"enabled\": true}," +
				"{\"id\": \"tax-ID\",\"identificationType\": \"tax-ID\",\"enabled\": true}," +
				"{\"id\": \"drivers-licence\",\"identificationType\": \"drivers-licence\",\"enabled\": true}," +
				"{\"id\": \"residence-number\",\"identificationType\": \"residence-number\",\"enabled\": true}," +
				"{\"id\": \"work-permit\",\"identificationType\": \"work-permit\",\"enabled\": true}," +
				"{\"id\": \"disability-cell\",\"identificationType\": \"disability-cell\",\"enabled\": true}," +
				"{\"id\": \"facebook\",\"identificationType\": \"facebook\",\"enabled\": true}," +
				"{\"id\": \"twitter\",\"identificationType\": \"twitter\",\"enabled\": true}," +
				"{\"id\": \"instagram\",\"identificationType\": \"instagram\",\"enabled\": true}," +
				"{\"id\": \"tigold\",\"identificationType\": \"tigold\",\"enabled\": true}," +
				"{\"id\": \"national-electorial-court\",\"identificationType\": \"national-electorial-court\",\"enabled\": true}," +
				"{\"id\": \"other\",\"identificationType\": \"other\",\"enabled\": true}]}"
		};
		user = { attributes: { firstName: "Keke", lastName: "Roseberg" } } as User;

		const singleTermCustomers = SimpleDataMock.getSingleTermCustomersMock();

		const location: RouteComponentProps<any>["location"] = {
			hash: "",
			key: "",
			pathname: "",
			search: "",
			state: {}
		};
		const history: RouteComponentProps<any>["history"] = {
			length: 2,
			action: "POP",
			location: location,
			push: jest.fn(),
			replace: jest.fn(),
			go: jest.fn(),
			goBack: jest.fn(),
			goForward: jest.fn(),
			block: jest.fn(),
			createHref: jest.fn(),
			listen: jest.fn()
		};
		const routerProps: RouteComponentProps<any> = {
			match: {
				isExact: true,
				params: {},
				path: "",
				url: ""
			},
			location: location,
			history: history,
			staticContext: {}
		};

		minProps = {
			...routerProps,
			user: user,
			searchConfigs: consulStore.searchConfigs,
			singleTerm: "Timo Isokoski",
			singleTermCustomers: singleTermCustomers,
			searchingForSingleCustomer: true,
			hasActiveCustomerCase: true,
			actions: {
				clearSingleTermSearch: (...args: any[]) => {},
				searchCustomerWithSingleTerm: (...args: any[]) => {},
				setSingleTerm: (...args: any[]) => {},
				showCustomerCreationModal: (...args: any[]) => {},
				setCustomer: (...args: any[]) => {},
				createNewCustomerCase: (...args: any[]) => {},
				deleteUIbasket: (...args: any[]) => {},
				cancelAddProduct: (...args: any[]) => {},
				resetConfigurations: (...args: any[]) => {},
				resetAddressWithBasketItemIdEntries: () => {},
				resetLocations: () => {},
			}
		};

		store = TestUtils.mockReduxStore({
			currency: {
				currencies: [],
				selectedCurrency: ""
			},
			basket: {},
			consul: consulStore,
			customerCase: {
				activeCustomerCase: {}
			},
			navBar: {
				showLanguageSelect: true,
				showBasket: true
			},
			user: {
				user: user
			},
			feature: {}
		});

		context = {
			flux: {
				stores: {
					BasketStore: makeStore("context.flux.stores.BasketStore"),
					ConsulStore: makeStore("context.flux.stores.ConsulStore", consulStore),
					CurrencyStore: makeStore("context.flux.stores.CurrencyStore"),
					SalesRepSessionStore: makeStore("context.flux.stores.SalesRepSessionStore"),
					UserStore: makeStore("context.flux.stores.UserStore", { user: user })
				},
				actions: {
					BasketActions: {},
					UserActions: {
						aaLogin: () => {}
					}
				}
			},
			store: store
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CustomerSelection {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CustomerSelection {...minProps} />, { context });
	});

	it("renders with minimum props", () => {
		// const { getValueAndTextFromSelectOptions } = TestUtils;

		const wrapper: ReactWrapper = mountWithContext(<CustomerSelection {...minProps} />, {
			context
		});

		expect(
			wrapper
				.find("#navbar-search")
				.hostNodes()
				.prop("value")
		).toEqual(minProps.singleTerm);
	});

	/* Phone number came with RND-11721 */
	/* Config from consul with additional fields came with RND-213617
	/* apps/omnichannel-pos/1/properties/features/pos_search_configuration */
	it("presents Customer, Phone number, Passport, Identification-Card and Identification-Number as Search criteria", () => {
		const wrapper = mountWithContext(<CustomerSelection {...minProps} />, {
			context
		});
		wrapper.find("#navbar_select_menu").hostNodes().simulate("click");

		const searchCriteriaDropdown = wrapper.find("#navbar_select_menu_dropdown").hostNodes();

		expect(searchCriteriaDropdown
				.find("button")
				.map((node: any) => node.text())
				.sort()
		).toEqual(
			[
				"Customer",
				"Diplomatic Carnet",
				"Disability Cell",
				"Driver's Licence",
				"Facebook",
				"Foreign Document",
				"ID-Card",
				"Instagram",
				"Military ID-card",
				"Minor ID-card",
				"National Electorial Court",
				"Other",
				"Passport",
				"Subscription Phone Number",
				"Residence Number",
				"Student ID",
				"Tax ID",
				"Temporary Work Permit",
				"Tigold",
				"Twitter"
			].sort()
		);
	});

	it("allows searching for a Customer by Phone number", done => {
		let wrapper: ReactWrapper;
		let props: CustomerSelectionProps;

		const { findNodesWithOnClickAttribute } = TestUtils;

		const searchTerm = "1239487";

		const CustomerStore = {
			singleTermCustomers: [],
			searchingForSingleCustomer: false,
			singleTerm: ""
		};

		props = {
			...minProps,
			singleTermCustomers: CustomerStore.singleTermCustomers,
			searchingForSingleCustomer: CustomerStore.searchingForSingleCustomer,
			singleTerm: CustomerStore.singleTerm
		};
		props.actions.setSingleTerm = (value: string) => {
			if (wrapper && props) {
				props.singleTerm = value;
				wrapper.setProps(props);
			}
		};

		props.actions.searchCustomerWithSingleTerm = (value: string, criteria: string) => {
			expect(value).toEqual(searchTerm);
			expect(criteria).toEqual("number");
			done();
		};

		context.flux.CustomerStore = CustomerStore;

		wrapper = mountWithContext(<CustomerSelection {...props} />, {
			context
		});
		wrapper.find("#navbar_select_menu").hostNodes().simulate("click");

		const searchCriteriaDropdown = wrapper.find("#navbar_select_menu_dropdown");
		const phoneNumberOption = searchCriteriaDropdown
			.find("button")
			.filterWhere((n: any) => n.text().toLowerCase() === "Subscription Phone Number".toLowerCase());
		findNodesWithOnClickAttribute(phoneNumberOption).simulate("click");

		const searchForm = wrapper.find("form");
		searchForm.find("#navbar-search").simulate("change", { target: { value: searchTerm } });
		wrapper.update();
		searchForm.find("#navbar_search_button").find("button").simulate("click");
	});

	it("passes search term to CustomerListDropdown", done => {
		let props: CustomerSelectionProps;
		let wrapper: ReactWrapper;

		const searchTerm = "Timo Isokoski";
		const actions: CustomerSelectionProps["actions"] = {
			...minProps.actions,
			setSingleTerm: (value: string) => {
				if (props && wrapper) {
					props.singleTerm = value;
					wrapper.setProps(props);
				}
			},
			searchCustomerWithSingleTerm: (value: string, criteria: string) => {
				expect(value).toEqual(searchTerm);
				expect(criteria).toEqual("name");
				done();
			}
		};

		props = {
			...minProps,
			singleTerm: searchTerm,
			actions
		};

		wrapper = mountWithContext(<CustomerSelection {...props} />, {
			context
		});

		const searchForm = wrapper.find("#w-app-search");
		searchForm.find("#navbar-search").simulate("change", { target: { value: searchTerm } });
		wrapper.update();
		searchForm.find("#navbar_search_button").find("button").simulate("click");
		wrapper.update();
		expect((wrapper.find("CustomerListDropdown").props() as CustomerListDropdownProps).searchTerm).toEqual(
			searchTerm
		);
	});

	describe("RUBT-58895", () => {
		let newContext: any;
		let wrapper: ReactWrapper;
		let props: CustomerSelectionProps;

		const singleTermCustomers = SimpleDataMock.getSingleTermCustomersMock();

		store = TestUtils.mockReduxStore({
			currency: {
				currencies: [],
				selectedCurrency: ""
			},
			basket: {},
			consul: consulStore,
			customer: {
				singleTermCustomers,
				searchingForSingleCustomer: true,
				singleTerm: singleTermCustomers[0].attributes.formattedName
			},
			customerCase: {
				activeCustomerCase: {}
			},
			navBar: {
				showLanguageSelect: true,
				showBasket: true
			},
			user: {
				salesRepUser: undefined,
				user: { firstName: "Keke", lastName: "Roseberg" } as User
			},
			feature: {}
		});

		beforeEach(() => {
			newContext = {
				...context,
				store,
				flux: {
					store: {
						CustomerStore: {
							singleTermCustomers,
							searchingForSingleCustomer: true,
							singleTerm: singleTermCustomers[0].attributes.formattedName
						},
						CustomerCaseStore: {
							activeCustomerCase: {}
						},
						UserStore: {
							salesRepUser: null,
							user: { firstName: "Keke", lastName: "Roseberg" }
						},
						ConsulStore: consulStore
					},
					actions: {
						UserActions: {
							aaLogin: () => {}
						}
					}
				}
			};
			const actions: CustomerSelectionProps["actions"] = {
				...minProps.actions,
				setSingleTerm: (value: string) => {
					if (!value && wrapper && props) {
						wrapper.setProps({
							...props,
							singleTermCustomers: [],
							searchingForSingleCustomer: false,
							singleTerm: ""
						});
					}
				},
				searchCustomerWithSingleTerm: (value: string, criteria: string) => {
					window.console.log(value);
					// 	expect(value).toEqual(searchTerm);
					// 	expect(criteria).toEqual("number");
					// 	done();
				}
			};

			props = {
				...minProps,
				actions: actions,
				singleTermCustomers,
				searchingForSingleCustomer: true,
				singleTerm: singleTermCustomers[0].attributes.formattedName,
				user: { firstName: "Keke", lastName: "Roseberg" } as User
			};
		});

		afterEach(() => {
			wrapper.unmount();
		});

		/* RUBT-58895 */
		it("must not clear search terms no matter how many times the search is executed", () => {
			const { getRandomIntBetweenZeroAndN } = TestUtils;

			wrapper = mountWithContext(<CustomerSelection {...props} />, { context: newContext });

			const minimumTrialsCount = 3;
			const trials = getRandomIntBetweenZeroAndN(4) + minimumTrialsCount;

			const searchForm = wrapper.find("form");
			const searchInput = wrapper.find("#navbar-search").hostNodes();
			searchInput.simulate("change", {
				target: {
					value: singleTermCustomers[0].attributes.formattedName
				}
			});

			const doSearch = (trialNumber: string) => {
				const propValue = searchInput.prop("value");
				const expectedValue = singleTermCustomers[0].attributes.formattedName;

				expect(propValue).toEqual(expectedValue);

				searchForm.simulate("submit");

				const results = wrapper.find("CustomerListDropdown");
				const customerList = results.find(".CustomerListDropdown-customer-list-dropdown");
				const customerItems = customerList
					.find(".CustomerListDropdown-dropdown-body")
					.filterWhere((node: any) => !node.hasClass("CustomerListDropdown-tile-wrapper"));

				expect(customerItems.length).toBeGreaterThan(0);
			};
			for (let i = 1; i <= trials; ++i) {
				doSearch(`${i}`);
			}
		});

		/* RUBT-58895 */
		it.skip("should clear search results and terms when customer is chosen", () => {
			const { findNodesWithOnClickAttribute } = TestUtils;

			wrapper = mountWithContextAndRouterProps(<CustomerSelection {...props} />, {
				context: newContext
			});

			const searchForm = wrapper.find("form");
			const searchInput = wrapper.find("#navbar-search").hostNodes();
			searchInput.simulate("change", {
				target: {
					value: singleTermCustomers[0].attributes.formattedName
				}
			});
			searchForm.simulate("submit");

			const results = wrapper.find("CustomerListDropdown");
			let customerList = results.find(".CustomerListDropdown-customer-list-dropdown");
			const customerItems0 = customerList
				.find(".CustomerListDropdown-tile-wrapper")
				.filterWhere(node => !node.hasClass("CustomerListDropdown-customer-dropdown-header"));
			expect(customerItems0.length).toBeGreaterThan(0);

			findNodesWithOnClickAttribute(customerItems0)
				.hostNodes()
				.simulate("click");
			customerList = wrapper.find("CustomerListDropdown").find(".CustomerListDropdown-customer-list-dropdown");
			const customerItems1 = customerList
				.find(".CustomerListDropdown-tile-wrapper")
				.hostNodes()
				.filterWhere(node => !node.hasClass("CustomerListDropdown-customer-dropdown-header"));
			expect(customerItems1.length).toEqual(0);
		});

		/* RUBT-58895 */
		it("hides search results for the time that focus is outside the search elements", () => {
			wrapper = mountWithContext(<CustomerSelection {...props} />, { context: newContext });

			const searchForm = wrapper.find("form");
			const searchInput = wrapper.find("#navbar-search").hostNodes();
			searchInput.simulate("change", {
				target: {
					value: singleTermCustomers[0].attributes.formattedName
				}
			});
			searchForm.simulate("submit");

			const results0 = wrapper.find("CustomerListDropdown");
			const customerList0 = results0.find(".CustomerListDropdown-customer-list-dropdown");
			const customerItems0 = customerList0
				.find(".CustomerListDropdown-dropdown-body")
				.filterWhere(node => !node.hasClass("CustomerListDropdown-tile-wrapper"));
			expect(customerItems0.length).toBeGreaterThan(0);

			TestUtils.clickOnDocumentBody(() => {
				(results0.instance() as any).handleClickOutside();
			});
			wrapper.update();
			const results1 = wrapper.find("CustomerListDropdown");
			const customerList1 = results1.find(".CustomerListDropdown-customer-list-dropdown");
			expect(customerList1.length).toEqual(0);

			wrapper.find("form").simulate("submit");
			wrapper.update();

			const results2 = wrapper.find("CustomerListDropdown");
			const customerList2 = results2.find(".CustomerListDropdown-customer-list-dropdown");

			const customerItems2 = customerList2
				.find(".CustomerListDropdown-dropdown-body")
				.filterWhere(node => !node.hasClass("CustomerListDropdown-tile-wrapper"));
			expect(customerItems2.length).toBeGreaterThan(0);
		});
	});
});
