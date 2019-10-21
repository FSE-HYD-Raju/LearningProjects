import * as React from "react";
import AuthenticationProvider, { AuthenticationProviderProps } from "./AuthenticationProvider";
import { mountWithContext } from "../testUtils";
import { ReactWrapper, ShallowWrapper } from "enzyme";
jest.mock("./setAxiosInterceptor");
jest.mock("../components/auth/AALoginCallbackContainer", () => {return { default: () => "MockCallbackContainer"}; });

describe("AuthenticationProvider", () => {
	let loginCalled = false,
		loginAnonymous: boolean | undefined,
		loginHint: string | undefined;
	const baseProps = ({
		flux: {},
		store: {},
		isAnonymousAuthenticationEnabled: false,
		isAuthenticated: false,
		location: {
			pathname: "",
			search: ""
		},
		securedRoutes: ["/digilife"],
		login: (anon: boolean, hint: string) => {
			loginCalled = true;
			loginAnonymous = anon;
			loginHint = hint;
		},
		loaderComponent: () => <div id="loader" />
	} as any) as AuthenticationProviderProps;

	beforeEach(() => {
		loginCalled = false;
		loginAnonymous = undefined;
		loginHint = undefined;
	});

	describe("when anonymous authentication is disabled", () => {
		const topLevelProps = { ...baseProps, isAnonymousAuthenticationEnabled: false };
		it("and user is unauthenticated an in login callback route, should not render nested element and not call login", () => {
			const props = { ...topLevelProps, isAuthenticated: false, location: { pathname: "/aalogin/callback" } } as any as AuthenticationProviderProps;

			const wrapper: ReactWrapper = mountWithContext(
				<AuthenticationProvider {...props}>
					<div id="app" />
				</AuthenticationProvider>,
				{},
				true
			);

			expect(wrapper.find("#app").length).toBe(0);
			expect(loginCalled).toBe(false);
		});

		describe("and user is in secured route", () => {
			const useCaseProps = { ...topLevelProps, location: { pathname: "/digilife" } };
			it("if user is authenticated, should render nested element and not call login", () => {
				const props = { ...useCaseProps, isAuthenticated: true } as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(1);
				expect(loginCalled).toBe(false);

			});

			it("if user is authenticated, should call login regularly with correct login hint and not render nested element", () => {
				const expectedLoginHint = "1234";
				const props = {
					...useCaseProps,
					isAuthenticated: false,
					location: { pathname: "/digilife", search: `?login_hint=${expectedLoginHint}` }
				} as any as AuthenticationProviderProps;
				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(0);
				expect(loginAnonymous).toBe(false);
				expect(loginCalled).toBe(true);
			});
		});

		describe("and user is in non-secured route", () => {
			const useCaseProps = { ...baseProps, location: { pathname: "/" } };
			it("if user is authenticated, should render nested element and not call login", () => {
				const props = { ...useCaseProps, isAuthenticated: true } as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(1);
				expect(loginCalled).toBe(false);
			});

			it("if user is not authenticated, should render nested element and not call login", () => {
				const props = { ...useCaseProps, isAuthenticated: false } as any as AuthenticationProviderProps;
				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(1);
				expect(loginCalled).toBe(false);
			});
		});
	});

	describe("when anonymous authentication is enabled", () => {
		const topLevelProps = { ...baseProps, isAnonymousAuthenticationEnabled: true };

		it("and user is unauthenticated an in login callback route, should not render nested element and not call login", () => {
			const props = { ...topLevelProps, isAuthenticated: false, location: { pathname: "/aalogin/callback" } } as any as AuthenticationProviderProps;

			const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
				<AuthenticationProvider {...props}>
					<div id="app" />
				</AuthenticationProvider>,
				{},
				true
			);

			expect(wrapper.find("#app").length).toBe(0);
			expect(loginCalled).toBe(false);
		});

		describe("and user is in secured route", () => {
			const useCaseProps = { ...topLevelProps, location: { pathname: "/digilife" } };
			it("if user is authenticated, should render nested element if user is authenticated", () => {
				const props = { ...useCaseProps, isAuthenticated: true } as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(1);
				expect(loginCalled).toBe(false);
			});

			it("if user is not authenticated, should perform regular login with expected login hint and not render element", () => {
				const expectedLoginHint = "1234";
				const props = {
					...useCaseProps,
					isAuthenticated: false,
					location: { pathname: "/digilife", search: `?login_hint=${expectedLoginHint}` }
				} as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(0);
				expect(loginHint).toBe(expectedLoginHint);
				expect(loginAnonymous).toBe(false);
				expect(loginCalled).toBe(true);
			});

			it("if app redirected to secured route", () => {
				const props = {
					...useCaseProps,
					isAuthenticated: false,
					location: { pathname: "/" },
					login: jest.fn()
				} as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(props.login).toHaveBeenCalledTimes(1);

				(wrapper as any).setProps({location: { pathname: "/digilife" }});
				expect(props.login).toHaveBeenCalledTimes(2);
			});
		});

		describe("and user is in non-secured route", () => {
			const useCaseProps = { ...topLevelProps, location: { pathname: "/" } };
			it("if user is authenticated, should render nested element if user is authenticated", () => {
				const props = { ...useCaseProps, isAuthenticated: true } as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				) ;

				expect(wrapper.find("#app").length).toBe(1);
				expect(loginCalled).toBe(false);
			});

			it("if user is not authenticated, should call login as anonymous and use expected login hint and not render nested element", () => {
				const expectedLoginHint = "1234";
				const props = {
					...useCaseProps,
					isAuthenticated: false,
					location: { pathname: "/", search: `?login_hint=${expectedLoginHint}` }
				} as any as AuthenticationProviderProps;

				const wrapper: ShallowWrapper | ReactWrapper = mountWithContext(
					<AuthenticationProvider {...props}>
						<div id="app" />
					</AuthenticationProvider>,
					{},
					true
				);

				expect(wrapper.find("#app").length).toBe(0);
				expect(loginHint).toBe(expectedLoginHint);
				expect(loginAnonymous).toBe(true);
				expect(loginCalled).toBe(true);
			});
		});
	});
});
