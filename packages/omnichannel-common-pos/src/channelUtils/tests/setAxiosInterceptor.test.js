/* eslint-disable prettier/prettier */
import clearSession from "../clearSession";
import setAxiosInterceptor from "../setAxiosInterceptor";
import axios from "axios";
import moxios from "moxios";
import FluxMock from "./utils/FluxMock";
import { TestUtils } from "../../testUtils";
import { SessionKeys, SessionUtils } from "../../utils/SessionUtils";
import ReduxTestUtils  from "../../redux/utils/ReduxTestUtils";
import actions  from "../../redux/actions";
const loadingOverlayReal = actions.loadingOverlay;
const saveAuthTokenOriginal = actions.auth.saveAuthToken;
const loginOriginal = actions.user.aaLogin;

jest.mock("../clearSession");
jest.mock("jwt-decode", () => {
	return jest.fn().mockImplementation(header => {
		return { header };
	});
});

const dummyDomainURL = "https://dummy-domain.com/api/";
const otherDummyDomainURL = "https://other-dummy-domain.com/api/";

const resetAxiosInterceptor = (config) => {

	// import and pass your custom axios instance to this method
	moxios.uninstall(global.context.flux.axios);
	moxios.uninstall(global.context.flux.axiosIndicatorInstance);

	moxios.install((context => {
			const instance = axios.create({
				baseURL: dummyDomainURL,
				data: {
					axios: dummyDomainURL
				}
			});
			context.flux.axios = instance;
			return instance;
		})(global.context)
	);

	moxios.install(
		(context => {
			const instance = axios.create({
				baseURL: otherDummyDomainURL,
				data: {
					axios: otherDummyDomainURL
				}
			});
			context.flux.axiosIndicatorInstance = instance;
			return instance;
		})(global.context)
	);

	setAxiosInterceptor({
		flux: config.flux,
		store: config.flux.reduxStore
	});
};

describe("Test axios interceptor: setAxiosInterceptor.js", () => {
	const UUID_REG = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
	const EUR = "EUR";
	const USD = "USD";
	const UAH = "UAH";
	const authHeader = "Auth header";
	const individualId = "444-444-444";
	const ConsulStore = { state: { brand: "" } };
	const CMSAdminStore = {
		state: {
			selectedLanguage: "",
			selectedPublishTarget: { key: "" }
		}
	};
	const UserStore = {
		state: {},
		user: {
			firstName: "Hans Christian",
			lastName: "Andersen",
			individualId
		}
	};

	const UserActions = {
		logout: jest.fn(),
		aaLogin: jest.fn()
	};
	const CustomerStore = {
		state: { activeCustomerAccount: { id: "" } }
	}
	const CustomerCaseStore = {
		state: { customerAccountId: "" }
	}

	const storeContent = {
		currency: {},
		category: {},
		consul: { state: { brand: "" } },
		user: { user: { ...UserStore.user } },
		cmsAdmin: { ...CMSAdminStore.state },
		customer: { ...CustomerStore.state },
		customerCase: { ...CustomerCaseStore.state },
	};


	let fluxMock;

	function mockSessionUtils() {
		jest.spyOn(SessionUtils, "getItem").mockImplementation(key => {
			switch (key) {
				case SessionKeys.auth:
					return authHeader;
				case SessionKeys.user:
					return JSON.stringify(UserStore.user);
				default:
					return null;
			}
		});
	}

	beforeAll(() => {
		mockSessionUtils();

		fluxMock = new FluxMock({
				ConsulStore,
				CMSAdminStore,
				UserStore,
				CustomerStore,
				CustomerCaseStore,
			},
			{ UserActions }
		);
		ReduxTestUtils.setupFluxAndReduxTest(fluxMock.flux);
		setupGlobal(fluxMock);

		moxios.install((context => {
				const instance = axios.create({
					baseURL: dummyDomainURL,
					data: {
						axios: dummyDomainURL
					}
				});
				context.flux.axios = instance;
				return instance;
			})(global.context)
		);

		moxios.install(
			(context => {
				const instance = axios.create({
					baseURL: otherDummyDomainURL,
					data: {
						axios: otherDummyDomainURL
					}
				});
				context.flux.axiosIndicatorInstance = instance;
				return instance;
			})(global.context)
		);

		global.clearSession = clearSession;
		setAxiosInterceptor({
			flux: fluxMock.flux,
			store: fluxMock.flux.reduxStore
		});
	});

	afterAll(() => {
		// import and pass your custom axios instance to this method
		moxios.uninstall(global.context.flux.axios);
		moxios.uninstall(global.context.flux.axiosIndicatorInstance);

		jest.resetModules();
		setupGlobal();
		global.clearSession = undefined;
		global.context = undefined;
	});

	afterEach(() => {
		//set default
		delete process.env.omnichannel;
		UserStore.state.impersonatedIndividualId = "";
		fluxMock.flux.reduxStore.dispatch(actions.currency.changeCurrency(""));
		ConsulStore.state.locale = "";
		ConsulStore.state.iso6392 = "";
		// global.context.flux.stores.ShoppingCartStore.state.activeBasket.id = "";
		global.context.flux.stores.CMSAdminStore.state.selectedLanguage = "";
		global.context.flux.stores.CMSAdminStore.state.selectedPublishTarget.key = "";
		global.context.flux.stores.ConsulStore.state.brand = "";
		global.context.flux.stores.CustomerStore.state.activeCustomerAccount.id = "";
		global.context.flux.stores.CustomerCaseStore.state.customerAccountId = "";
	});

	const setupGlobal = (context) => {
		global.clearSession = jest.fn();
		global.context = context;
	};

	function moxiosGetRequest(axios, handleResult) {
		moxios.withMock(function() {
			axios.get(dummyDomainURL);
			moxios.wait(handleResult);
		});
	}

	function expectInRequest(done, axios, header, expectedValue) {
		moxiosGetRequest(axios, () => {
			const request = moxios.requests.mostRecent();
			expect(request.headers[header]).toBe(expectedValue);
			done();
		});
	}

	function moxiosGetReject(axios, url, handleCatch) {
		moxios.withMock(() => {
			moxios.wait(() => {
				const request = moxios.requests.mostRecent();
				request.reject({
					status: 401,
					response: {
						message: "problem",
						data: {
							axios: url
						}
					}
				});
			});
			axios.get(url).catch(handleCatch);
		});
	}

	function moxiosGetResponse(axios, url, respondObj, handleResponce) {
		moxios.withMock(() => {
			moxios.wait(() => {
				const request = moxios.requests.mostRecent();
				request.respondWith(respondObj);
			});
			axios.get(url).then(handleResponce);
		});
	}

	describe("test request header: setRequestHeaders", () => {
		const setCurrency = (value) => {
			fluxMock.flux.reduxStore.dispatch(actions.currency.changeCurrency(value));
		};
		const setLocale = (value) => fluxMock.flux.stores.ConsulStore.setState({ locale: value });
		const setIso6392 = (value) => fluxMock.flux.stores.ConsulStore.setState({ iso6392: value });
		const setBrand = (brand) => fluxMock.flux.stores.ConsulStore.setState({ brand });
		const setIndividualId = (id) => fluxMock.flux.stores.UserStore.setState({ impersonatedIndividualId: id });
		const setLanguage = (lang) => fluxMock.flux.stores.CMSAdminStore.setState({ selectedLanguage: lang });
		const setTargetKey = (key) => fluxMock.flux.stores.CMSAdminStore.setState({
			selectedPublishTarget: {
				...fluxMock.flux.stores.CMSAdminStore.getState().selectedPublishTarget,
				key
			}
		});

		it("X-Currency request header eq EUR ", done => {
			setCurrency(EUR);
			expectInRequest(done, global.context.flux.axios, "X-Currency", EUR);
		});

		it("X-Currency request header eq USD ", done => {
			setCurrency(USD);
			expectInRequest(done, global.context.flux.axios, "X-Currency", USD);
		});

		it("Accept-Language request header eq default(en)", done => {
			setLocale(undefined);
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Accept-Language"]).toBe("en");
				done();
			});
		});

		//TODO is it expected behavior in case of null have null in request header???
		it("Accept-Language request header eq null", done => {
			setLocale(null);
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Accept-Language"]).toBe(null);
				done();
			});
		});

		it("Accept-Language request header eq de", done => {
			const language = "de";
			setLocale(language);
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Accept-Language"]).toBe(language);
				done();
			});
		});

		it("Locale request header eq default(eng)", done => {
			setIso6392(undefined);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Locale"]).toBe("eng");
				done();
			});
		});

		//TODO is it expected behavior???
		it("Locale request header eq null", done => {
			setIso6392(null);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Locale"]).toBe(null);
				done();
			});
		});

		it("Locale request header eq locale", done => {
			const locale = "ukr";
			setIso6392(locale);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Locale"]).toBe(locale);
				done();
			});
		});

		it("X-Impersonated-Individual-Id request header eq 444-444-444", done => {
			setIndividualId(individualId);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Impersonated-Individual-Id"]).toBe(
					individualId
				);
				done();
			});
		});

		//TODO is it expected behaviour???
		it("X-Impersonated-Individual-Id request header eq null", done => {
			setIndividualId(null);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Impersonated-Individual-Id"]).toBe(
					undefined
				);
				done();
			});
		});

		//TODO is it expected behaviour???
		it("X-Impersonated-Individual-Id request header eq undefined", done => {
			setIndividualId(undefined);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Impersonated-Individual-Id"]).toBe(
					undefined
				);
				done();
			});
		});

		it("Is User true - Authorization request header eq authHeader", done => {
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Authorization"]).toBe(authHeader);
				done();
			});
		});

		it("Not User - Authorization request header eq authHeader", done => {
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Authorization"]).toBe(authHeader);
				done();
			});
		});

		it("User - Authorization request header eq isClient", done => {
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Authorization"]).toBe(authHeader);
				done();
			});
		});

		it("X-Channel request header eq undefined", done => {
			process.env.omnichannel = undefined;

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Channel"]).toBe("undefined");
				done();
			});
		});

		it("X-Channel request header eq omnichannel", done => {
			const omnichannel = "pos";
			process.env.omnichannel = omnichannel;

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Channel"]).toBe(omnichannel);
				done();
			});
		});

		it("should have X-Channel-Service-Name request header equal to omnichannel-pos", done => {
			const serviceName = "omnichannel-pos";
			process.env.SERVICE_NAME = serviceName;

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Channel-Service-Name"]).toBe(
					serviceName
				);
				done();
			});
		});

		it("X-Trace-Token request header eq mocked value", done => {
			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["X-Trace-Token"]).toMatch(UUID_REG);
				done();
			});
		});

		it("Cms-Language request header eq selectedLanguage", done => {
			const lang = "ukr";
			setLanguage(lang);

			expectInRequest(
				done,
				global.context.flux.axios,
				"Cms-Language",
				lang
			);
		});

		it("Cms-Language request header eq undefined", done => {
			setLanguage(null);

			expectInRequest(done, global.context.flux.axios, "Cms-Language");
		});

		it("Cms-PublishTarget request header eq key", done => {
			const key = "newKey2";
			setTargetKey(key);

			expectInRequest(
				done,
				global.context.flux.axios,
				"Cms-PublishTarget",
				key
			);
		});

		it("Cms-PublishTarget request header eq newKey", done => {
			const key = "newKey";
			setTargetKey(key);

			expectInRequest(
				done,
				global.context.flux.axios,
				"Cms-PublishTarget",
				key
			);
		});

		it("Cms-PublishTarget request header eq undefined", done => {
			setTargetKey(null);

			expectInRequest(
				done,
				global.context.flux.axios,
				"Cms-PublishTarget"
			);
		});

		it("X-Brand request header eq brand", done => {
			const brand = "Ericson";
			setBrand(brand);

			expectInRequest(done, global.context.flux.axios, "X-Brand", brand);
		});

		it("X-Brand request header eq null", done => {
			setBrand(null);

			expectInRequest(done, global.context.flux.axios, "X-Brand");
		});

		it("X-Brand request header eq undefined", done => {
			setBrand(undefined);

			expectInRequest(done, global.context.flux.axios, "X-Brand");
		});

		it("check All request headers modified by setRequestHeaders", done => {
			const omnichannel = "b2c";
			const serviceName = "omnichannel-b2c";
			process.env.omnichannel = omnichannel;
			process.env.SERVICE_NAME = serviceName;
			const lang = "de";
			const iso6392 = "ukr";
			const selectedLanguage = "ukr";
			const key = "newKey";
			const brand = "Ericson2";

			setIndividualId(individualId);
			setCurrency(UAH);
			setLocale(lang);
			setIso6392(iso6392);
			setLanguage(selectedLanguage);
			setTargetKey(key);
			setBrand(brand);

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers["Accept-Language"]).toBe(lang);
				expect(request.headers["Authorization"]).toBe(authHeader);
				expect(request.headers["Locale"]).toBe(iso6392);
				expect(request.headers["X-Trace-Token"]).toMatch(UUID_REG);
				expect(request.headers["X-Channel"]).toBe(omnichannel);
				expect(request.headers["X-Channel-Service-Name"]).toBe(
					serviceName
				);
				expect(request.headers["X-Currency"]).toBe(UAH);
				// expect(request.headers["X-User-Account"]).toBe(individualId); TODO: fix me later.
				expect(request.headers["X-Impersonated-Individual-Id"]).toBe(
					individualId
				);
				expect(request.headers["Cms-Language"]).toBe(selectedLanguage);
				expect(request.headers["Cms-PublishTarget"]).toBe(key);
				expect(request.headers["X-Brand"]).toBe(brand);
				done();
			});
		});
	});

	describe("Test axiosIndicatorInstance ", () => {
		beforeEach(() => {
			actions.loadingOverlay.showLoadingOverlay = jest.fn(loadingOverlayReal.showLoadingOverlay);
			actions.loadingOverlay.hideLoadingOverlay = jest.fn(loadingOverlayReal.hideLoadingOverlay);
			actions.loadingOverlay.resetLoadingOverlay = jest.fn(loadingOverlayReal.resetLoadingOverlay);
		});
		afterEach(() => {
			//set default
			// global.context.flux.stores.UserStore.state.user = undefined;
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				auth: {
					anonymousUserRole: undefined,
					userRoleClaimKey: undefined,
				},
				user: { user: undefined },
			});

			actions.user.aaLogin = jest.fn(() => loginOriginal());
			//global.context.flux.stores.UserStore.state.user = undefined;
			//global.context.flux.actions.UserActions.logout.mockReset();
		});

		it("Test axiosIndicatorInstance intercept request, generateActionKeyFromConfig generate key using data", done => {
			moxiosGetRequest(global.context.flux.axiosIndicatorInstance, () => {
				expect(actions.loadingOverlay.showLoadingOverlay)
					.toHaveBeenCalledWith(dummyDomainURL + "get" + JSON.stringify({ axios: otherDummyDomainURL })
				);
				done();
			});
		});

		it("Test axiosIndicatorInstance intercept response, generateActionKeyFromConfig generate key using data", done => {
			const respondObj = {
				status: 200,
				response: {}
			};
			moxiosGetResponse(
				global.context.flux.axiosIndicatorInstance,
				otherDummyDomainURL,
				respondObj,
				() => {
					expect(actions.loadingOverlay.hideLoadingOverlay)
						.toHaveBeenCalledWith(otherDummyDomainURL + "get" + JSON.stringify({ axios: otherDummyDomainURL })
					);
					done();
				}
			);
		});

		it("Test axiosIndicatorInstance intercept on responce, refresh Response Auth Token UserStore user exist, logout not performed", done => {
			global.context.flux.stores.UserStore.state.user = "user";
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				auth: {
					anonymousUserRole: undefined,
					userRoleClaimKey: undefined,
				},
				user: { user: { firstName: "Test" } },
			});

			actions.auth.saveAuthToken = jest.fn(() => saveAuthTokenOriginal());

			const respondObj = {
				status: 200,
				headers: {
					authorization: authHeader
				},
				response: {}
			};
			moxiosGetResponse(
				global.context.flux.axiosIndicatorInstance,
				otherDummyDomainURL,
				respondObj,
				() => {
					expect(actions.auth.saveAuthToken).toHaveBeenCalledWith(authHeader);
					expect(global.context.flux.actions.UserActions.logout).not.toHaveBeenCalled();
					done();
				}
			);
		});

		it("Test axiosIndicatorInstance intercept on response, anonymousUserRole not eq userRoleClaimKey logout not performed", done => {
			const header = "header";
			global.context.flux.stores.UserStore.state.user = "user";
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				auth: {
					anonymousUserRole: "notEqToHeader",
					userRoleClaimKey: header,
				},
				user: { user: { firstName: "user" } },
			});
			const respondObj = {
				status: 200,
				headers: {
					authorization: authHeader
				},
				response: {}
			};
			actions.auth.saveAuthToken = jest.fn(() => saveAuthTokenOriginal());
			moxiosGetResponse(
				global.context.flux.axiosIndicatorInstance,
				otherDummyDomainURL,
				respondObj,
				() => {
					expect(actions.auth.saveAuthToken).toHaveBeenCalledWith(authHeader);
					expect(global.context.flux.actions.UserActions.logout).not.toHaveBeenCalled();
					done();
				}
			);
		});
	});

	describe("test on Authorization Header ", () => {
		it("should not set Authorization header", done => {
			jest.spyOn(SessionUtils, "getItem").mockImplementation(() => {
				return null;
			});

			moxiosGetRequest(global.context.flux.axios, () => {
				const request = moxios.requests.mostRecent();
				expect(request.headers).not.toHaveProperty("Authorization");
				done();
			});
		});
	});

	describe("Test on Request Error", () => {
		beforeEach(() => {
			actions.loadingOverlay.resetLoadingOverlay = jest.fn(loadingOverlayReal.resetLoadingOverlay);
		});
		afterEach(() => {
			//set default
			process.env.omnichannel = undefined;
			UserStore.state.impersonatedIndividualId = "";
			fluxMock.flux.reduxStore.dispatch(actions.currency.changeCurrency(""));
			ConsulStore.state.locale = "";
			ConsulStore.state.iso6392 = "";
			global.context.flux.stores.CMSAdminStore.state.selectedLanguage = "";
			global.context.flux.stores.CMSAdminStore.state.selectedPublishTarget.key = "";
			global.context.flux.stores.ConsulStore.state.brand = "";
			global.context.flux.stores.UserStore.state.user = "";
			global.context.flux.stores.CustomerStore.state.activeCustomerAccount.id = "";
			global.context.flux.stores.CustomerCaseStore.state.customerAccountId = "";
		});

		it("Silent authentication enabled: execute login using silent auth", done => {
			fluxMock.flux.stores.UserStore.setState({ user: true });
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				...storeContent,
				auth: {
					silentAuthenticationEnabled: true,
				},
				user: { user: { firstName: "user" } },
			});

			actions.user.aaLogin = jest.fn(() => loginOriginal());

			resetAxiosInterceptor(fluxMock);

			moxiosGetReject(global.context.flux.axios, dummyDomainURL, () => {
				expect(actions.user.aaLogin).toHaveBeenCalledWith({ isSilentAuth: true });
				expect(clearSession).not.toHaveBeenCalled();
				done();
			});
		});

		it("Silent authentication not enabled as result: execute login and clear session", done => {
			fluxMock.flux.stores.UserStore.setState({ user: true });
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				...storeContent,
				auth: {
					silentAuthenticationEnabled: false,
				},
				user: { user: { firstName: "user" } },
			});

			actions.user.aaLogin = jest.fn(() => loginOriginal());
			global.clearSession = jest.fn().mockImplementation(context => context);

			resetAxiosInterceptor(fluxMock);

			moxiosGetReject(global.context.flux.axios, dummyDomainURL, () => {
				expect(actions.user.aaLogin).toHaveBeenCalledWith({});
				expect(clearSession).toHaveBeenCalledWith();
				done();
			});
		});

		it("axiosIndicatorInstance error response handler as result: resetLoadingOverlay  ", done => {
			fluxMock.flux.stores.UserStore.setState({ user: true });

			// fluxMock.flux.stores.AuthStore.setState({ silentAuthenticationEnabled: false, silentAuthInProgress: true });
			global.context.flux.reduxStore = TestUtils.mockReduxStore({
				...storeContent,
				auth: {
					silentAuthenticationEnabled: false,
					silentAuthInProgress: true,
				},
				user: { user: { firstName: "user" } },
			});
			actions.user.aaLogin = jest.fn(() => loginOriginal());
			global.clearSession = jest.fn().mockImplementation(context => context);
			moxiosGetReject(
				global.context.flux.axiosIndicatorInstance,
				otherDummyDomainURL,
				() => {
					expect(actions.user.aaLogin).toHaveBeenCalled();
					expect(clearSession).toHaveBeenCalledWith();
					expect(actions.loadingOverlay.resetLoadingOverlay).toHaveBeenCalled();
					done();
				}
			);
		});
	});
});
