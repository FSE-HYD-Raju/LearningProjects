import * as React from "react";
import { shallow } from "enzyme";
import {
	NavBarButtonsActionProps,
	NavBarButtonsStateProps,
	NavBarButtonWithClickOutside as NavBarButtons
} from "./NavBarButtons";
import { User } from "../../../redux";
import { RouteComponentProps } from "react-router";
import { mountWithContext, TestUtils, mockRouterProps } from "../../../testUtils";

describe("NavBarButtons", () => {
	const defaultUser = { attributes: { firstName: "Anders", lastName: "Alaviita" } } as User;

	const locales = [
		{
			locale: "en"
		},
		{
			locale: "fi"
		},
		{
			locale: "sv"
		}
	];

	const minimumStoreContents = {
		currency: {
			currencies: [],
			selectedCurrency: ""
		},
		navBar: {
			showLanguageSelect: true,
			showBasket: true
		},
		user: {
			user: defaultUser
		}
	};

	const context = {
		store: TestUtils.mockReduxStore(minimumStoreContents)
	};

	const currencies = [
		{
			code: "EUR"
		},
		{
			code: "USD"
		}
	];

	const minProps: NavBarButtonsStateProps & NavBarButtonsActionProps & RouteComponentProps<any> = {
		...mockRouterProps,
		haveMultipleLanguages: false,
		actions: {
			hideAll: () => {},
			toggleLogin: () => {},
			toggleBasketMenu: () => {},
			toggleMobileNavigation: () => {},
			aaLogin: () => {},
			clear: () => {}
		},
		haveMultipleCurrencies: true
	};

	it("should succeed at shallow mount with minimum props", () => {
		const wrapper = shallow(<NavBarButtons {...minProps} />, {
			disableLifecycleMethods: true
		});
		expect(wrapper).toMatchSnapshot();
	});

	const mockUser = defaultUser;

	const minimumDeepProps: NavBarButtonsStateProps & NavBarButtonsActionProps & RouteComponentProps<any> = {
		...minProps,
		user: mockUser,
		showLogin: false,
		haveMultipleCurrencies: false
	};

	it("should succeed at deep mount", () => {
		mountWithContext(<NavBarButtons {...minimumDeepProps} />, { context });
	});

	it("will not render currency menu when only one currency is available", () => {
		const context = {
			store: TestUtils.mockReduxStore({
				currency: {
					currencies: [ currencies[0] ],
					selectedCurrency: currencies[0].code
				}
			})
		};

		const props = {
			...minimumDeepProps,
			haveMultipleCurrencies: false
		};

		const wrapper = mountWithContext(<NavBarButtons {...props} />, { context });
		expect(wrapper.find("NavBarCurrencySelection")).toHaveLength(0);
	});

	it("renders currency menu when multiple currencies are available", () => {
		const context = {
			store: TestUtils.mockReduxStore({
				currency: {
					currencies,
					selectedCurrency: currencies[0].code
				}
			})
		};

		const props = {
			...minimumDeepProps,
			haveMultipleCurrencies: true
		};

		const wrapper = mountWithContext(<NavBarButtons {...props} />, { context });
		expect(wrapper.find("NavBarCurrencySelection")).toHaveLength(1);
	});

	describe("shows language selection menu", () => {
		let wrapper: any = null;
		const getChooseLanguageMenu = (wrapper: any) => wrapper.find("[data-test-name=\"change-language-menu\"]");

		const storeContents = {
			...minimumStoreContents,
			consul: {
				locales
			}
		};
		const store = TestUtils.mockReduxStore(storeContents);

		const getWrapper = (myContext?: any) => {
			return mountWithContext(<NavBarButtons {...minProps} haveMultipleLanguages={storeContents.consul.locales.length > 1} />, {
				context: {
					...(myContext || context),
					store
				}
			});
		};

		afterEach(() => {
			if (wrapper) {
				wrapper.unmount();
				wrapper = null;
			}
		});

		afterAll(() => {
			delete process.env.omnichannel;
		});

		it("if multiple locales are defined", () => {
			process.env.omnichannel = "b2c";
			wrapper = getWrapper();
			expect(getChooseLanguageMenu(wrapper)).toHaveLength(1);
		});

		it("in B2C", () => {
			process.env.omnichannel = "b2c";
			wrapper = getWrapper();
			expect(getChooseLanguageMenu(wrapper)).toHaveLength(1);
		});

		it("in POS", () => {
			const myContext = {
				...context,
				user: {
					user: defaultUser
				}
			};

			process.env.omnichannel = "pos";
			wrapper = getWrapper();
			expect(getChooseLanguageMenu(wrapper)).toHaveLength(1);
		});

		it("not without defined channel name", () => {
			process.env.omnichannel = undefined;
			wrapper = getWrapper();
			expect(getChooseLanguageMenu(wrapper)).toHaveLength(0);
		});

		it("not in a random channel", () => {
			process.env.omnichannel = "random";
			wrapper = getWrapper();
			expect(getChooseLanguageMenu(wrapper)).toHaveLength(0);
		});
	});

	describe("does not show language selection menu when less than two locales are defined", () => {
		const getChooseLanguageMenu = (wrapper: any) => wrapper.find("[data-test-name=\"change-language-menu\"]");

		const storeContents = {
			...minimumStoreContents,
			consul: {}
		};

		it("zero", () => {
			const storeContents = {
				...minimumStoreContents,
				consul: {
					locales: []
				}
			};
			const store = TestUtils.mockReduxStore(storeContents);

			const wrapper = mountWithContext(<NavBarButtons {...minProps} />, {
				context: {
					...context,
					store
				}
			});

			expect(getChooseLanguageMenu(wrapper)).toHaveLength(0);
		});

		it("one", () => {
			const storeContents = {
				...minimumStoreContents,
				consul: {
					locales: [
						{
							locale: "en"
						}
					]
				}
			};
			const store = TestUtils.mockReduxStore(storeContents);

			const wrapper = mountWithContext(<NavBarButtons {...minProps} />, {
				context: {
					...context,
					store
				}
			});

			expect(getChooseLanguageMenu(wrapper)).toHaveLength(0);
		});
	});
});
