import * as React from "react";
import { MemoryRouter } from "react-router";
import { NavBarProps, NavBarUnwrapped as NavBar } from "./NavBar";
import { User } from "../../redux";
import { mockRouterProps, mountWithContext, shallowWithContext, TestUtils } from "../../testUtils";
import { ReactWrapper } from "enzyme";
import { Link } from "react-router-dom";

const { makeStore } = TestUtils;

const checkSameLength = (predicate: string, wrapper: ReactWrapper, locality: ReactWrapper) => {
	const globalAppearances: ReactWrapper = wrapper.find(predicate);
	const localAppearances: ReactWrapper = locality.find(predicate);

	expect(localAppearances.length).toBeGreaterThan(0);
	expect(globalAppearances.length).toEqual(localAppearances.length);
};

describe("NavBar", () => {
	let minProps: NavBarProps;
	const user: any = null;
	let context: any;
	let store: any;
	const consulStore = {};
	const customerStore = {};

	const defaultUser = { attributes: { firstName: "Keke", lastName: "Roseberg" } } as User;

	const minimumStoreContents = {
		auth: {},
		basket: {
			unidentifiedCustomerBasket: {
				product: {}
			}
		},
		consul: consulStore,
		currency: {
			currencies: [],
			selectedCurrency: ""
		},
		customer: customerStore,
		customerCase: {
			activeCustomerCase: {
				activeCustomer: {
					id: "id",
				}
			},
			customerBasketSelectData: {
				customerBaskets: []
			}
		},
		feature: {},
		navBar: {
			showLanguageSelect: true,
			showBasket: true
		},
		salesRepSession: {
			terminals: []
		},
		user: {
			user
		},
		category: {},
	};

	beforeEach(() => {
		process.env.omnichannel = undefined;

		const user = defaultUser;

		minProps = {
			...mockRouterProps,
			user: user as User,
			logo: "",
			hasUserPOSPermission: true,
			showMobileNavigation: false,
			brandLink: "http://goo.gl",
			showStartSessionButton: false,
		};

		const storeContents = {
			...minimumStoreContents,
			user: {
				user: defaultUser
			}
		};

		store = TestUtils.mockReduxStore(storeContents);

		context = {
			flux: {
				stores: {
					BasketStore: makeStore("context.flux.stores.BasketStore"),
					ConsulStore: makeStore("context.flux.stores.ConsulStore", consulStore),
					CustomerCaseStore: makeStore("context.flux.stores.CustomerCaseStore", {
						state: {
							activeCustomerCase: true
						}
					}),
					NavBarStore: makeStore("context.flux.stores.NavBarStore", {
						showLanguageSelect: true,
						showBasket: true
					}),
					SalesRepSessionStore: makeStore("context.flux.stores.SalesRepSessionStore"),
					UserStore: makeStore("context.flux.stores.UserStore", { user: user })
				},
				actions: {
					BasketActions: {},
					UserActions: {
						aaLogin: () => {}
					},
					CustomerActions: {},
					CustomerCaseActions: {},
					SalesRepSessionActions: {},
				}
			},
			store
		};
	});

	afterAll(() => {
		delete process.env.omnichannel;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<NavBar {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<NavBar {...minProps} />, { context });
	});

	it("renders the brand link with <a> if the link is external and <Link> when the link is internal", () => {
		const produce = (uri: string) => {
			const props = {...minProps, brandLink: uri };
			return shallowWithContext(<NavBar {...props} />, { context }).find("#navbar-link-to-cold");
		};

		expect(produce("http://example.org").shallow().type()).toEqual("a");
		expect(produce("/servicedesk/foo/bar").shallow().type()).toEqual(Link);
	});

	/* TODO remove unnecessary assertions from this test
	 * TODO write an equivalent for B2C
	 */
	it("renders with minimum props in POS", () => {
		process.env.omnichannel = "pos";
		const user = defaultUser;
		context.flux.stores.CustomerCaseStore.setState({ activeCustomerCase: true });
		context.flux.stores.UserStore.setState({ user });

		const wrapper: ReactWrapper = mountWithContext(
			<MemoryRouter>
				<NavBar {...minProps} />
			</MemoryRouter>,
			{
				context
			}
		);

		wrapper.find("NavBarSearchMenu button").simulate("click");

		const navBar: ReactWrapper = wrapper.find(".NavBar");

		// NavBar not found or there were more than one
		expect(navBar.length).toEqual(1);
		checkSameLength("#navbar-link-to-cold", wrapper, navBar);
		checkSameLength("#navbar_select_menu", wrapper, navBar);

		checkSameLength("#navbar-search", wrapper, navBar);

		checkSameLength("#navbarbutton-show-login", wrapper, navBar);

		expect(
			navBar
				.find("#navbarbutton-show-login")
				.hostNodes()
				.text()
				.toLowerCase()
		).toContain("You".toLowerCase());

		const nameInLoginButton = user.attributes.firstName + " " + user.attributes.lastName.charAt(0);
		const loginText = navBar
			.find("#navbarbutton-show-login")
			.hostNodes()
			.text()
			.toLowerCase();

		expect(loginText).toContain(nameInLoginButton.toLowerCase());

		checkSameLength("#navbar-basket-button-label", wrapper, navBar);
	});

	describe("RND-18009", () => {
		it("hides basket component from NavBar if visibility is not set to true", () => {
			const navBarState = context.store.getState().navBar;
			navBarState.showBasket = false;
			const newStore = TestUtils.mockReduxStore({
				...context.store.getState(),
				navBar: navBarState
			});

			const wrapper = mountWithContext(<NavBar {...minProps} />, {
				context: {
					...context,
					store: newStore
				}
			});
			expect(wrapper.find("#navbar-basket-button-label")).toHaveLength(0);
		});
	});
});
