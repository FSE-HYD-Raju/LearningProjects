import * as React from "react";

import {
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../testUtils";
import { LoginDropdown, LoginDropdownUnwrapped } from "./LoginDropdown";
import { LoginContainer } from "./LoginContainer";
import { ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router";

describe("LoginDropdown", () => {
	let minimumContextNoUser: any;
	let minimumContextUser: any;

	beforeEach(() => {
		minimumContextNoUser = {
			flux: {
				reduxStore: TestUtils.mockReduxStore({ feature: {}, consul: {} }),
				actions: {
					UserActions: {
						login: jest.fn()
					}
				}
			},
			store: TestUtils.mockReduxStore({ feature: {}, consul: {}, user: {} })
		};
		minimumContextUser = {
			flux: {
				reduxStore: TestUtils.mockReduxStore({ feature: {}, consul: {}, user: {id: "1"} }),
				actions: minimumContextNoUser.flux.actions
			},
			store: TestUtils.mockReduxStore({ feature: {userNavDropdownMenuLinksVisibility: {digitalLife: true}}, consul: {}, user: {user: {id: "1"}} })
		};
	});

	afterEach(() => {
		delete process.env.omnichannel;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<LoginDropdownUnwrapped  hasUser={false}/>, {context: minimumContextNoUser});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at shallow mount with a mock user", () => {
		shallowWithContext(<LoginDropdownUnwrapped  hasUser={true}/>, {context: minimumContextUser});
	});

	it("should render with minimum props", () => {
		const wrapper = mountWithContext(<MemoryRouter><LoginDropdown/></MemoryRouter>, {context: minimumContextNoUser});

		const flexLoginDropdown = wrapper.find(".login-dropdown");
		expect(flexLoginDropdown.length).toEqual(1);
		const loginContainer = wrapper.find(LoginContainer);
		expect(loginContainer.length).toEqual(1);
	});

	it("should render with a mock user", () => {
		const wrapper = mountWithContext(<LoginDropdown />, { context: minimumContextUser });
		const bSignOut = wrapper.find("#navbar-sign-out");
		expect(bSignOut.hostNodes()).toHaveLength(1);
	});

	it("should present an error when session has expired", () => {

		const wrapper = mountWithContext(
			<MemoryRouter initialEntries={[{state: {tokenExpired: true}}]}>
				<LoginDropdown/>
			</MemoryRouter>,
			{context: minimumContextNoUser});

		const expirationError = wrapper
			.find(".label-danger")
			.filterWhere(
				(n: ReactWrapper) =>
					n.text() ===
					"Your session has expired. Please sign in again."
			);

		expect(expirationError.length).toEqual(1);
	});


	it("should render edit profile button in b2c channel, with external url", () => {
		const context = {
			flux: {
				actions: minimumContextNoUser.flux.actions
			},
			store: TestUtils.mockReduxStore({ feature: {
					editProfileUrl: "https://password-change.com/edit-profile"					
				}, consul: {}, user: {user: {id: "1"}} })

		};

		process.env.omnichannel = "b2c";
		const wrapper = mountWithContext(<LoginDropdown />, {context: context});

		const bChangePassword = wrapper.find("#navbar-edit-profile-link");
		expect(bChangePassword.hostNodes()).toHaveLength(1);
	});

	it("should not render edit profile button in pos channel, with external url", () => {
		const context = {
			flux: {
				...minimumContextNoUser.flux
			},
			store: TestUtils.mockReduxStore({
				feature: { editProfileUrl: "https://password-change.com/edit-profile"},
				consul: {},
				user: {user: {id: "1"}} }
				)
		};

		process.env.omnichannel = "pos";
		const wrapper = mountWithContext(<LoginDropdown />, {context: context});

		const bChangePassword = wrapper.find("#navbar-edit-profile-link");
		expect(bChangePassword.length).toEqual(0);
	});

	it("should not render edit profile button in b2c channel, if external url is not provided", () => {
		const context = {
			flux: {
				...minimumContextNoUser.flux
			},
			store: TestUtils.mockReduxStore({
				feature: {editProfileUrl: undefined
				},
				consul: {},
				user: {user: {id: "1"}} }
			)
		};

		process.env.omnichannel = "b2c";
		const wrapper = mountWithContext(<LoginDropdown/>, {context: context});

		const bChangePassword = wrapper.hostNodes().find("#navbar-edit-profile-link");
		expect(bChangePassword.length).toEqual(0);
	});

	it("should render change password button in b2c channel, with external url", () => {
		const context = {
			flux: {
				...minimumContextNoUser.flux
			},
			store: TestUtils.mockReduxStore({
				feature: {changePasswordUrl: "https://password-change.com/edit-profile"			},
				consul: {},
				user: {user: {id: "1"}} }
			)
		};

		process.env.omnichannel = "b2c";
		const wrapper = mountWithContext(<LoginDropdown/>, {context: context});

		const bChangePassword = wrapper.find("#navbar-change-password-link");
		expect(bChangePassword.length).toEqual(2);
	});

	it("should not render change password button in pos channel, with external url", () => {
		const context = {
			flux: {
				...minimumContextNoUser.flux
			},
			store: TestUtils.mockReduxStore({
				feature: { hangePasswordUrl: "https://password-change.com/edit-profile"},
				consul: {},
				user: {user: {id: "1"}} }
			)
		};

		process.env.omnichannel = "pos";
		const wrapper = mountWithContext(<LoginDropdown />, {context: context});

		const bChangePassword = wrapper.find("#navbar-change-password-link");
		expect(bChangePassword.length).toEqual(0);
	});

	it("should not render change password button in b2c channel, if external url is not provided", () => {
		const context = {
			flux: {
				...minimumContextNoUser.flux
			},
			store: TestUtils.mockReduxStore({
				feature: {changePasswordUrl: undefined,
				},
				consul: {},
				user: {user: {id: "1"}} }
			)
		};

		process.env.omnichannel = "b2c";
		const wrapper = mountWithContext(<LoginDropdown />, {context: context});

		const bChangePassword = wrapper.find("#navbar-change-password-link");
		expect(bChangePassword.length).toEqual(0);
	});
});
