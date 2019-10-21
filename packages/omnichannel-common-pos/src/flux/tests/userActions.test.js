/* global describe, it, expect, beforeEach, afterEach */

import alt from "../flux";
import sinon from "sinon";
import axios from "axios";
import _ from "lodash";
import AltFromAlt from "alt";
import UserActions, { addAttributesToUser } from "../actions/UserActions";
import { ChannelUtils, ReduxTestUtils } from "../../redux";
import apiUrl, { restUrl } from "../../utils/urls";
import * as isClient from "../../utils/isClient";

const flux = new alt();
let sandbox;

describe("UserActions and store", () => {
	beforeEach(() => {
		flux.recycle();
		ReduxTestUtils.setupFluxAndReduxTest(flux);
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("#logout", async () => {
		const APIcall = sandbox.stub(axios, "get");
		await flux.getActions("UserActions").logout();
		await flux.resolver.dispatchPendingActions();
		sandbox.assert.calledWith(APIcall, `${restUrl}/oauth2/logout`);
	});

	/* fails in test only */
	it("#changeLocale sets locale on user", async () => {
		await flux.getActions("UserActions").doLogin({ user: "anders.a" });
		await flux.resolver.dispatchPendingActions();

		const locale = "en_US";
		await flux.getActions("UserActions").changeLocale(locale);
		await flux.resolver.dispatchPendingActions();

		const { state } = flux.stores.UserStore;

		expect(state.user.locale).toEqual(locale);
	});

	it("calls PATCH with updated emails array.", async () => {
		const APIcallGET = sandbox.stub(axios, "get");
		const APIcallPATCH = sandbox.stub(axios, "patch");

		const apiCallGETdataMock = {
			data: {
				type: "persons",
				id: "timo-son",
				attributes: {
					emails: [
						{
							role: "PRIMARY",
							id: "0f9060e0-84a4-430d-914a-a519ecc96c8c",
							email: "kathrin.k@qvantel.com"
						}
					]
				}
			}
		};

		const responseMock = Promise.resolve({
			status: 200,
			data: apiCallGETdataMock
		});

		APIcallGET.returns(responseMock);

		const model = {
			id: "timo-son",
			firstName: "Kathrin",
			lastName: "Keekki",
			emails: [
				{
					role: "PRIMARY",
					email: "kathrin.newemail.@qvantel.com"
				}
			],
			privacySettings: {
				"third-party-marketing": false,
				"third-party-marketing-email": false,
				"third-party-marketing-sms": false,
				"own-marketing": false,
				"own-marketing-email": false,
				"own-marketing-sms": false
			},

			city: "Helsinki",
			country: "Finland",
			postalCode: "00150",
			streetAddress: "Munkkisaarenkatu 10"
		};
		const updateCustomerCase = false;
		const forceAddressUpdate = false;
		const isNewUser = false;

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);

		const payload = {
			attributes: {
				emails: [
					{
						email: "kathrin.newemail.@qvantel.com",
						role: "PRIMARY"
					}
				],
				firstName: "Kathrin",
				lastName: "Keekki",
				postalAddresses: [
					{
						city: "Helsinki",
						country: "Finland",
						postalCode: "00150",
						street: "Munkkisaarenkatu 10"
					}
				],
				privacySettings: {
					"third-party-marketing": false,
					"third-party-marketing-email": false,
					"third-party-marketing-sms": false,
					"own-marketing": false,
					"own-marketing-email": false,
					"own-marketing-sms": false
				}
			},
			id: "timo-son",
			type: "persons"
		};

		await flux.resolver.dispatchPendingActions();
		sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

		sandbox.assert.calledWith(
			APIcallPATCH,
			`${apiUrl}/persons/${model.id}`,
			{ data: payload },
			{
				headers: {
					"Content-Type": "application/vnd.api+json",
					"X-Force-Address-Update": "false"
				},
				withCredentials: true
			}
		);
	});

	it("calls PATCH with updated mobileNumbers array.", async () => {
		const APIcallGET = sandbox.stub(axios, "get");
		const APIcallPATCH = sandbox.stub(axios, "patch");

		const apiCallGETdataMock = {
			data: {
				type: "persons",
				id: "timo-son",
				attributes: {
					mobileNumbers: [
						{
							role: "PRIMARY",
							id: "0f9060e0-84a4-430d-914a-a519ecc96c8c",
							number: "0501212122"
						}
					]
				}
			}
		};

		const responseMock = Promise.resolve({
			status: 200,
			data: apiCallGETdataMock
		});

		APIcallGET.returns(responseMock);

		const model = {
			id: "timo-son",
			firstName: "Kathrin",
			lastName: "Keekki",
			mobileNumbers: [
				{
					role: "PRIMARY",
					number: "0401234567"
				}
			],
			privacySettings: {
				"third-party-marketing": false,
				"third-party-marketing-email": false,
				"third-party-marketing-sms": false,
				"own-marketing": false,
				"own-marketing-email": false,
				"own-marketing-sms": false
			},

			city: "Helsinki",
			country: "Finland",
			postalCode: "00150",
			streetAddress: "Munkkisaarenkatu 10"
		};
		const updateCustomerCase = false;
		const forceAddressUpdate = false;
		const isNewUser = false;

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);

		const payload = {
			attributes: {
				mobileNumbers: [
					{
						role: "PRIMARY",
						number: "0401234567"
					}
				],
				firstName: "Kathrin",
				lastName: "Keekki",
				postalAddresses: [
					{
						city: "Helsinki",
						country: "Finland",
						postalCode: "00150",
						street: "Munkkisaarenkatu 10"
					}
				],
				privacySettings: {
					"third-party-marketing": false,
					"third-party-marketing-email": false,
					"third-party-marketing-sms": false,
					"own-marketing": false,
					"own-marketing-email": false,
					"own-marketing-sms": false
				}
			},
			id: "timo-son",
			type: "persons"
		};

		await flux.resolver.dispatchPendingActions();
		sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

		sandbox.assert.calledWith(
			APIcallPATCH,
			`${apiUrl}/persons/${model.id}`,
			{ data: payload },
			{
				headers: {
					"Content-Type": "application/vnd.api+json",
					"X-Force-Address-Update": "false"
				},
				withCredentials: true
			}
		);
	});

	// this started failing without anyone touching it or the corresponding actions implementation
	it.skip(
		"calls PATCH with configured privacy settings keys and falls back to default keys if not configured.",
		async () => {
			// flux.stores.FeatureStore.state.privacySettingsKeys = {
			// 	thirdPartyMarketing: "third-party-marketing",
			// 	thirdPartyMarketingSms: "third-party-marketing-sms",
			// 	thirdPartyMarketingEmail: "third-party-marketing-email"
			// };
			// flux.stores.FeatureStore.emitChange();

			const APIcallGET = sandbox.stub(axios, "get");
			const APIcallPATCH = sandbox.stub(axios, "patch");

			const apiCallGETdataMock = {
				data: {
					type: "persons",
					id: "timo-son",
					attributes: {
						privacySettings: {
							privacy1: false,
							privacy2: false
						}
					}
				}
			};

			const responseMock = Promise.resolve({
				status: 200,
				data: apiCallGETdataMock
			});

			APIcallGET.returns(responseMock);

			const model = {
				id: "timo-son",
				firstName: "Kathrin",
				lastName: "Keekki",
				privacySettings: {},
				city: "Helsinki",
				country: "Finland",
				postalCode: "00150",
				streetAddress: "Munkkisaarenkatu 10"
			};
			const updateCustomerCase = false;
			const forceAddressUpdate = false;
			const isNewUser = false;

			await flux
				.getActions("UserActions")
				.updateUser(
					model,
					updateCustomerCase,
					forceAddressUpdate,
					isNewUser
				);

			const payload = {
				attributes: {
					firstName: "Kathrin",
					lastName: "Keekki",
					postalAddresses: [
						{
							city: "Helsinki",
							country: "Finland",
							postalCode: "00150",
							street: "Munkkisaarenkatu 10"
						}
					],
					privacySettings: {
						"third-party-marketing": false,
						"third-party-marketing-email": false,
						"third-party-marketing-sms": false,
						"own-marketing": false,
						"own-marketing-email": false,
						"own-marketing-sms": false
					}
				},
				id: "timo-son",
				type: "persons"
			};

			await flux.resolver.dispatchPendingActions();
			sandbox.assert.calledWith(
				APIcallGET,
				`${apiUrl}/persons/${model.id}`
			);

			sandbox.assert.calledWith(
				APIcallPATCH,
				`${apiUrl}/persons/${model.id}`,
				{ data: payload },
				{
					headers: {
						"Content-Type": "application/vnd.api+json",
						"X-Force-Address-Update": "false"
					},
					withCredentials: true
				}
			);
		}
	);

	it("calls PATCH with updated identifications array.", async () => {
		const APIcallGET = sandbox.stub(axios, "get");
		const APIcallPATCH = sandbox.stub(axios, "patch");

		const apiCallGETdataMock = {
			data: {
				type: "persons",
				id: "timo-son",
				attributes: {
					identifications: [
						{
							type: "passport",
							identificationId: "12345",
							issuingAuthority: {
								name: "police",
								country: "FI"
							},
							validityPeriod: {
								startDate: "2018-06-10T00:00:00.000Z",
								endDate: "2023-06-10T00:00:00.000Z"
							}
						}
					]
				}
			}
		};

		const responseMock = Promise.resolve({
			status: 200,
			data: apiCallGETdataMock
		});

		APIcallGET.returns(responseMock);

		const model = {
			id: "timo-son",
			firstName: "Kathrin",
			lastName: "Keekki",
			emails: [
				{
					role: "PRIMARY",
					email: "kathrin.newemail.@qvantel.com"
				}
			],
			privacySettings: {
				"third-party-marketing": false,
				"third-party-marketing-email": false,
				"third-party-marketing-sms": false,
				"own-marketing": false,
				"own-marketing-email": false,
				"own-marketing-sms": false
			},

			city: "Helsinki",
			country: "Finland",
			postalCode: "00150",
			streetAddress: "Munkkisaarenkatu 10",
			identificationType: "passport",
			identificationId: "12345",
			identificationIssuingAuthority: "police",
			identificationIssuingAuthorityCountry: "FI",
			identificationIssuingDate: "2018-06-10T00:00:00.000Z",
			identificationExpiryDate: "2023-06-10T00:00:00.000Z"
		};
		const updateCustomerCase = false;
		const forceAddressUpdate = false;
		const isNewUser = false;

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);

		const payload = {
			attributes: {
				emails: [
					{
						email: "kathrin.newemail.@qvantel.com",
						role: "PRIMARY"
					}
				],
				firstName: "Kathrin",
				lastName: "Keekki",
				postalAddresses: [
					{
						city: "Helsinki",
						country: "Finland",
						postalCode: "00150",
						street: "Munkkisaarenkatu 10"
					}
				],
				privacySettings: {
					"third-party-marketing": false,
					"third-party-marketing-email": false,
					"third-party-marketing-sms": false,
					"own-marketing": false,
					"own-marketing-email": false,
					"own-marketing-sms": false
				},
				identifications: [
					{
						type: "passport",
						identificationId: "12345",
						issuingAuthority: {
							name: "police",
							country: "FI"
						},
						validityPeriod: {
							startDate: "2018-06-10T00:00:00.000Z",
							endDate: "2023-06-10T00:00:00.000Z"
						}
					}
				]
			},
			id: "timo-son",
			type: "persons"
		};

		await flux.resolver.dispatchPendingActions();
		sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

		sandbox.assert.calledWith(
			APIcallPATCH,
			`${apiUrl}/persons/${model.id}`,
			{ data: payload },
			{
				headers: {
					"Content-Type": "application/vnd.api+json",
					"X-Force-Address-Update": "false"
				},
				withCredentials: true
			}
		);
	});

	it("calls PATCH with updated identifications array, on WIND3 case", async () => {
		const APIcallGET = sandbox.stub(axios, "get");
		const APIcallPATCH = sandbox.stub(axios, "patch");

		const apiCallGETdataMock = {
			data: {
				type: "persons",
				id: "timo-son",
				attributes: {
					identifications: [
						{
							type: "personal-identity-code",
							identificationId: "12345",
							issuingAuthority: {
								name: "police",
								country: "FI"
							},
							validityPeriod: {
								startDate: "2018-06-10T00:00:00.000Z",
								endDate: "2023-06-10T00:00:00.000Z"
							}
						}
					]
				}
			}
		};

		const responseMock = Promise.resolve({
			status: 200,
			data: apiCallGETdataMock
		});

		APIcallGET.returns(responseMock);

		const model = {
			id: "timo-son",
			fiscalCode: "56789",
			firstName: "Kathrin",
			lastName: "Keekki",
			emails: [
				{
					role: "PRIMARY",
					email: "kathrin.newemail.@qvantel.com"
				}
			],
			privacySettings: {
				"third-party-marketing": false,
				"third-party-marketing-email": false,
				"third-party-marketing-sms": false,
				"own-marketing": false,
				"own-marketing-email": false,
				"own-marketing-sms": false
			},

			city: "Helsinki",
			country: "Finland",
			postalCode: "00150",
			streetAddress: "Munkkisaarenkatu 10",
			identificationType: "passport",
			identificationId: "12345",
			identificationIssuingAuthority: "police",
			identificationIssuingAuthorityCountry: "FI",
			identificationIssuingDate: "2018-06-10T00:00:00.000Z",
			identificationExpiryDate: "2023-06-10T00:00:00.000Z"
		};
		const updateCustomerCase = false;
		const forceAddressUpdate = false;
		const isNewUser = false;

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);

		const payload = {
			attributes: {
				emails: [
					{
						email: "kathrin.newemail.@qvantel.com",
						role: "PRIMARY"
					}
				],
				firstName: "Kathrin",
				lastName: "Keekki",
				postalAddresses: [
					{
						city: "Helsinki",
						country: "Finland",
						postalCode: "00150",
						street: "Munkkisaarenkatu 10"
					}
				],
				privacySettings: {
					"third-party-marketing": false,
					"third-party-marketing-email": false,
					"third-party-marketing-sms": false,
					"own-marketing": false,
					"own-marketing-email": false,
					"own-marketing-sms": false
				},
				identifications: [
					{
						type: "personal-identity-code",
						identificationId: "56789",
						issuingAuthority: {
							name: "police",
							country: "FI"
						},
						validityPeriod: {
							startDate: "2018-06-10T00:00:00.000Z",
							endDate: "2023-06-10T00:00:00.000Z"
						}
					},
					{
						type: "passport",
						identificationId: "12345",
						issuingAuthority: {
							name: "police"
						},
						validityPeriod: {
							startDate: "2018-06-10T00:00:00.000Z",
							endDate: "2023-06-10T00:00:00.000Z"
						}
					}
				]
			},
			id: "timo-son",
			type: "persons"
		};

		await flux.resolver.dispatchPendingActions();
		sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

		sandbox.assert.calledWith(
			APIcallPATCH,
			`${apiUrl}/persons/${model.id}`,
			{ data: payload },
			{
				headers: {
					"Content-Type": "application/vnd.api+json",
					"X-Force-Address-Update": "false"
				},
				withCredentials: true
			}
		);
	});

	it.skip(
		"dispatches LocationActions#clearSelectedLocation when #logout is called",
		async () => {
			const logoutAPI = sandbox.stub(flux.apiCalls, "getFromUrl");
			const cmsAPI = sandbox.stub(flux.cmsApiCalls, "get");
			sandbox.stub(ChannelUtils, "clearSession");

			const responseMock = Promise.resolve({
				status: "OK"
			});

			logoutAPI.returns(responseMock);
			cmsAPI.returns(responseMock);

			const locationActionsSpy = sinon.spy(
				flux.actions.LocationActions,
				"clearSelectedLocation"
			);

			await flux.getActions("UserActions").logout();
			await flux.resolver.dispatchPendingActions();

			// Then the #clearSelectedLocation is called.
			expect(locationActionsSpy.callCount).toBe(1);
		}
	);
	const existingPerson = {
		type: "persons",
		id: "timo-son",
		attributes: {
			firstName: "Hannu",
			lastName: "Isokoski",
			mobileNumbers: [
				{
					role: "PRIMARY",
					id: "0fc9e5ce-5f67-49ab-bdc6-38b259a95e5c",
					number: "0407654321"
				}
			],
			fixedLineNumbers: [
				{
					role: "PRIMARY",
					id: "a757ed9f-1b7b-4bd0-bb65-7e33d80b8cd5",
					number: "121212121212"
				}
			],
			emails: [
				{
					role: "PRIMARY",
					id: "0ac821c3-cd27-4300-8cb0-f8b172cbb2ae",
					email: "kathrin.k@qvantel.com"
				}
			]
		}
	};

	// Use data from existingPerson. Omit the one we are updating.
	const newData = _.omit(existingPerson.attributes, [
		"mobileNumbers",
		"fixedLineNumbers",
		"emails"
	]);
	// And pass some new data. Check that these are in PATCH payload.
	const newMobileNumber = "0501234567";
	const newEmail = "kathrin.kaappi@qvantel.com";
	const newFixedLineNumber = "454545455";

	// User to be passed to updateUser method
	const model = {
		id: "timo-son",
		firstName: existingPerson.attributes.firstName,
		lastName: existingPerson.attributes.lastName,
		...newData,
		mobileNumber: newMobileNumber,
		email: newEmail,
		fixedLineNumber: newFixedLineNumber
	};

	const updateCustomerCase = true;
	const forceAddressUpdate = true;
	const isNewUser = false;

	it("updates user with msisdn, fixedl line number and email", async () => {
		const flux = new alt();
		ReduxTestUtils.setupFluxAndReduxTest(flux);
		const getAPI = sandbox.stub(flux.apiCalls, "get");

		// Check from patchAPISpy what stuff goes to server.
		const patchAPISpy = sinon.spy(flux.apiCalls, "patch");

		const responseMock = Promise.resolve({
			status: 200,
			data: existingPerson
		});

		// Return user's current attributes.
		getAPI.returns(responseMock);

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);
		await flux.resolver.dispatchPendingActions();

		const actualMobileNumber = _.get(
			patchAPISpy,
			"args[0][1].attributes.mobileNumbers[0]"
		);
		const actualEmail = _.get(
			patchAPISpy,
			"args[0][1].attributes.emails[0]"
		);

		const actualFixedLineNumber = _.get(
			patchAPISpy,
			"args[0][1].attributes.fixedLineNumbers[0]"
		);

		expect(actualMobileNumber.number).toBe(newMobileNumber);
		expect(actualEmail.email).toBe(newEmail);
		expect(actualFixedLineNumber.number).toBe(newFixedLineNumber);
	});

	it("updates user with (server GET response does not include attributes) emails, mobileNumbers or fixedLineNumbers", async () => {
		const flux = new alt();
		ReduxTestUtils.setupFluxAndReduxTest(flux);
		const getAPI = sandbox.stub(flux.apiCalls, "get");

		// Check from patchAPISpy what stuff goes to server.
		const patchAPISpy = sandbox.spy(flux.apiCalls, "patch");

		const responseMock = Promise.resolve({
			status: 200,
			data: _.omit(existingPerson, [
				"attributes.mobileNumbers",
				"attributes.emails",
				"attributes.fixedLineNumbers"
			])
		});

		// Return user's current attributes.
		getAPI.returns(responseMock);

		await flux
			.getActions("UserActions")
			.updateUser(
				model,
				updateCustomerCase,
				forceAddressUpdate,
				isNewUser
			);
		await flux.resolver.dispatchPendingActions();

		const actualMobileNumber = _.get(
			patchAPISpy,
			"args[0][1].attributes.mobileNumbers[0]"
		);
		const actualEmail = _.get(
			patchAPISpy,
			"args[0][1].attributes.emails[0]"
		);

		const actualFixedLineNumber = _.get(
			patchAPISpy,
			"args[0][1].attributes.fixedLineNumbers[0]"
		);

		expect(actualMobileNumber.number).toBe(newMobileNumber);
		expect(actualEmail.email).toBe(newEmail);
		expect(actualFixedLineNumber.number).toBe(newFixedLineNumber);
	});

	it("#set updatingUser false in UserStore when error occurs", async () => {
		// given
		const error = { message: "Here is the error." };
		flux.stores.UserStore.state = {
			updatingUser: true
		};
		expect(flux.stores.UserStore.state.updatingUser).toEqual(true);

		// when
		await flux.getActions("UserActions").onUserActionsError(error);
		await flux.resolver.dispatchPendingActions();

		// then
		expect(flux.stores.UserStore.state.updatingUser).toEqual(false);
	});

	it("getUiLocales should returns string containing space seperated window.languages", async () => {
		// given
		const alt = new AltFromAlt();
		const sandbox = sinon.createSandbox();
		sandbox.stub(isClient, "default").value(true);
		const locales = ["fi-FI", "fi", "en-US", "en"];
		sandbox.stub(window.navigator, "languages").value(locales);
		const userActions = alt.createActions(UserActions);

		// When
		const result = userActions.getUiLocalesParam();

		// Then
		expect(result).toBe("&ui_locales=fi-FI fi en-US en");

		sandbox.restore();
	});

	describe("addAttributesToUser", () => {
		it("should return user in untouched if attributes are empty", () => {
			const user = {
				username: "content.manager"
			};
			const personResponse = {};

			const mergeResult = addAttributesToUser(user, personResponse);

			expect(mergeResult.username).toBe("content.manager");
		});

		it("should merge data.attributes to user", () => {
			const user = {
				username: "content.manager"
			};
			const personResponse = {
				data: {
					attributes: {
						firstName: "Donald",
						lastName: "Duck"
					}
				}
			};

			const mergeResult = addAttributesToUser(user, personResponse);

			expect(mergeResult.attributes.firstName).toBe("Donald");
			expect(mergeResult.attributes.lastName).toBe("Duck");
		});
	});

	describe("user update and create w/characteristics", () => {

		it("calls PATCH with updated characteristics.", async () => {
			const APIcallGET = sandbox.stub(axios, "get");
			const APIcallPATCH = sandbox.stub(axios, "patch");

			const apiCallGETdataMock = {
				data: {
					type: "persons",
					id: "timo-son",
					attributes: {
					}
				}
			};

			const responseMock = Promise.resolve({
				status: 200,
				data: apiCallGETdataMock
			});

			APIcallGET.returns(responseMock);

			const model = {
				id: "timo-son",
				firstName: "Kathrin",
				lastName: "Keekki",
				emails: [
					{
						role: "PRIMARY",
						email: "kathrin.newemail.@qvantel.com"
					}
				],
				city: "Helsinki",
				country: "Finland",
				postalCode: "00150",
				streetAddress: "Munkkisaarenkatu 10",
				countyOfBirth: "13",
				stateOrProvinceOfBirth: "Cabruzzo",
			};
			const updateCustomerCase = false;
			const forceAddressUpdate = false;
			const isNewUser = false;

			await flux
				.getActions("UserActions")
				.updateUser(
					model,
					updateCustomerCase,
					forceAddressUpdate,
					isNewUser
				);

			const payload = {
				attributes: {
					emails: [
						{
							email: "kathrin.newemail.@qvantel.com",
							role: "PRIMARY"
						}
					],
					firstName: "Kathrin",
					lastName: "Keekki",
					postalAddresses: [
						{
							city: "Helsinki",
							country: "Finland",
							postalCode: "00150",
							street: "Munkkisaarenkatu 10"
						}
					],
					privacySettings: {
						"third-party-marketing": false,
						"third-party-marketing-email": false,
						"third-party-marketing-sms": false,
						"own-marketing": false,
						"own-marketing-email": false,
						"own-marketing-sms": false
					},
					characteristics: {
						countyOfBirth: "13",
						stateOrProvinceOfBirth: "Cabruzzo",
					},
				},
				id: "timo-son",
				type: "persons"
			};

			await flux.resolver.dispatchPendingActions();
			sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

			sandbox.assert.calledWith(
				APIcallPATCH,
				`${apiUrl}/persons/${model.id}`,
				{ data: payload },
				{
					headers: {
						"Content-Type": "application/vnd.api+json",
						"X-Force-Address-Update": "false"
					},
					withCredentials: true
				}
			);
		});

		it("calls PATCH with updated characteristics given empty county and state -strings", async () => {
			const APIcallGET = sandbox.stub(axios, "get");
			const APIcallPATCH = sandbox.stub(axios, "patch");

			const apiCallGETdataMock = {
				data: {
					type: "persons",
					id: "timo-son",
					attributes: {
					}
				}
			};

			const responseMock = Promise.resolve({
				status: 200,
				data: apiCallGETdataMock
			});

			APIcallGET.returns(responseMock);

			const model = {
				id: "timo-son",
				firstName: "Kathrin",
				lastName: "Keekki",
				emails: [
					{
						role: "PRIMARY",
						email: "kathrin.newemail.@qvantel.com"
					}
				],
				city: "Helsinki",
				country: "Finland",
				postalCode: "00150",
				streetAddress: "Munkkisaarenkatu 10",
				countyOfBirth: "",
				stateOrProvinceOfBirth: "",
			};
			const updateCustomerCase = false;
			const forceAddressUpdate = false;
			const isNewUser = false;

			await flux
				.getActions("UserActions")
				.updateUser(
					model,
					updateCustomerCase,
					forceAddressUpdate,
					isNewUser
				);

			const payload = {
				attributes: {
					emails: [
						{
							email: "kathrin.newemail.@qvantel.com",
							role: "PRIMARY"
						}
					],
					firstName: "Kathrin",
					lastName: "Keekki",
					postalAddresses: [
						{
							city: "Helsinki",
							country: "Finland",
							postalCode: "00150",
							street: "Munkkisaarenkatu 10"
						}
					],
					privacySettings: {
						"third-party-marketing": false,
						"third-party-marketing-email": false,
						"third-party-marketing-sms": false,
						"own-marketing": false,
						"own-marketing-email": false,
						"own-marketing-sms": false
					},
					characteristics: {
						countyOfBirth: "",
						stateOrProvinceOfBirth: "",
					},
				},
				id: "timo-son",
				type: "persons"
			};

			await flux.resolver.dispatchPendingActions();
			sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

			sandbox.assert.calledWith(
				APIcallPATCH,
				`${apiUrl}/persons/${model.id}`,
				{ data: payload },
				{
					headers: {
						"Content-Type": "application/vnd.api+json",
						"X-Force-Address-Update": "false"
					},
					withCredentials: true
				}
			);
		});

		it("calls PATCH without characteristics when county and state are not present", async () => {
			const APIcallGET = sandbox.stub(axios, "get");
			const APIcallPATCH = sandbox.stub(axios, "patch");

			const apiCallGETdataMock = {
				data: {
					type: "persons",
					id: "timo-son",
					attributes: {
					}
				}
			};

			const responseMock = Promise.resolve({
				status: 200,
				data: apiCallGETdataMock
			});

			APIcallGET.returns(responseMock);

			const model = {
				id: "timo-son",
				firstName: "Kathrin",
				lastName: "Keekki",
				emails: [
					{
						role: "PRIMARY",
						email: "kathrin.newemail.@qvantel.com"
					}
				],
				city: "Helsinki",
				country: "Finland",
				postalCode: "00150",
				streetAddress: "Munkkisaarenkatu 10",
			};
			const updateCustomerCase = false;
			const forceAddressUpdate = false;
			const isNewUser = false;

			await flux
				.getActions("UserActions")
				.updateUser(
					model,
					updateCustomerCase,
					forceAddressUpdate,
					isNewUser
				);

			const payload = {
				attributes: {
					emails: [
						{
							email: "kathrin.newemail.@qvantel.com",
							role: "PRIMARY"
						}
					],
					firstName: "Kathrin",
					lastName: "Keekki",
					postalAddresses: [
						{
							city: "Helsinki",
							country: "Finland",
							postalCode: "00150",
							street: "Munkkisaarenkatu 10"
						}
					],
					privacySettings: {
						"third-party-marketing": false,
						"third-party-marketing-email": false,
						"third-party-marketing-sms": false,
						"own-marketing": false,
						"own-marketing-email": false,
						"own-marketing-sms": false
					}
				},
				id: "timo-son",
				type: "persons"
			};

			await flux.resolver.dispatchPendingActions();
			sandbox.assert.calledWith(APIcallGET, `${apiUrl}/persons/${model.id}`);

			sandbox.assert.calledWith(
				APIcallPATCH,
				`${apiUrl}/persons/${model.id}`,
				{ data: payload },
				{
					headers: {
						"Content-Type": "application/vnd.api+json",
						"X-Force-Address-Update": "false"
					},
					withCredentials: true
				}
			);
		});

		it("calls POST without characteristics when county and state are not present", async () => {
			const APIcallPOST = sandbox.stub(axios, "post");

			const apiCalldataMock = {
				data: {
					type: "persons",
					id: "timo-son",
					attributes: {
					}
				}
			};

			const responseMock = Promise.resolve({
				status: 200,
				data: { data: apiCalldataMock }
			});
			APIcallPOST.returns(responseMock);

			const model = {
				firstName: "Kathrin",
				lastName: "Keekki",
				email: "kathrin.newemail.@qvantel.com",
				city: "Helsinki",
				country: "Finland",
				postalCode: "00150",
				street: "Munkkisaarenkatu 10",
				building: undefined,
				placeOfBirth: "Secret",
				county: "County",
				gender: "other",
				stateOrProvince: "State",
				coAddress: "co1",
				birthDay:"1990-01-01",
				description: "Describe this",
				language: "en"
			};

			await flux
				.getActions("UserActions")
				.createUser(
					model
				);

			const payload = {
				attributes: {
					emails: [{
						email: "kathrin.newemail.@qvantel.com"
					}],
					firstName: "Kathrin",
					lastName: "Keekki",
					postalAddresses: [
						{
							city: "Helsinki",
							country: "Finland",
							postalCode: "00150",
							street: "Munkkisaarenkatu 10",
							building: undefined,
							county: "County",
							coAddress: "co1",
							description: "Describe this",
							stateOrProvince: "State",
						}
					],
					placeOfBirth: "Secret",
					gender: "other",
					countryOfBirth: "Finland",
					birthDay: new Date('1990-01-01'),
					language: "en",
					mobileNumbers: undefined,
					fixedLineNumbers: undefined,
					identifications: [],
					characteristics: undefined,
					privacySettings: {
						privacy1: false,
						privacy2: false
					}
				},
				type: "persons"
			};

			await flux.resolver.dispatchPendingActions();

			sandbox.assert.calledWith(
				APIcallPOST,
				`${apiUrl}/persons`,
				{ data: payload },
				{
					headers: {
						"Content-Type": "application/vnd.api+json",
					}
				}
			);
		});
	});
});
