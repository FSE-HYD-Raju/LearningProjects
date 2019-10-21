import alt from "../flux";
import sinon from "sinon";
import R from "ramda";
import axios from "axios";
import BasketUtil from "../../utils/BasketUtil";
import apiUrl from "../../utils/urls";
import { ErrorContainer } from "../../redux";
import BasketActions from "./BasketActions";
import BasketStore from "../stores/BasketStore";
import PaymentActions from "./PaymentActions";
import SalesActions from "./SalesActions";
import DigitalLifeActions from "./DigitalLifeActions";
import altFromAlt from "alt";
import exampleProduct from "../tests/basketActionsTestData";
import MockResponse from "../tests/test-utils/MockResponse";
import TestUtils from "../../testUtils/TestUtils";
import {
	expectErrorHandled,
	setUpBaseActionOnErrorMock
} from "../tests/test-utils/apiErrorMock";
import BasketValidationUtil from "../../utils/BasketValidationUtil";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };

let basketActions;
let dispatcherSpy;

describe("All Basket Actions", () => {
	describe("BasketActions#deleteUIbasket", () => {
		// Using plain old alt just with the components we are testing
		const flux = new altFromAlt();
		flux.reduxStore = TestUtils.mockReduxStore({
			feature: {}
		});

		beforeEach(() => {
			basketActions = flux.createActions(BasketActions);

			// use sinon to create a spy on the dispatch function
			dispatcherSpy = sinon.spy(flux.dispatcher, "dispatch");
			sinon.spy(basketActions, "deleteUIbasket");
		});

		afterEach(function() {
			// clean up our sinon spy so we do not affect other tests
			flux.dispatcher.dispatch.restore();

			basketActions.deleteUIbasket.restore();
		});

		it("dispatches correct action", () => {
			// fire the action
			basketActions.deleteUIbasket();

			//should be this one
			const action = basketActions.DELETE_UIBASKET;

			// use  spy to see what payload the dispatcher was called with
			const dispatcherArgs = dispatcherSpy.args[0];
			const firstArg = dispatcherArgs[0];
			expect(firstArg.action).toBe(action);
		});
	});

	describe("BasketActions#productToBasketItem", () => {
		const flux = new altFromAlt();
		const basketActions = flux.createActions(BasketActions);
		flux.createActions(PaymentActions);
		flux.createActions(DigitalLifeActions);
		flux.createActions(SalesActions);
		flux.createStore(BasketStore);

		it("sets configuration correctly in nested basket-item case", () => {
			const result = basketActions.productToBasketItem(
				exampleProduct,
				null,
				"basketId",
				undefined,
				flux
			);

			// verify that configured values are in place
			expect(result.attributes.inputtedCharacteristics["CH_ICC"]).toEqual(
				"234"
			);
			expect(
				result.attributes.childBasketItems[0].inputtedCharacteristics[
					"CH_NumberResource"
					]
			).toEqual("23411");

			// verify that no unexpected configs exist
			expect(
				Object.keys(
					result.attributes.childBasketItems[1].inputtedCharacteristics ||
					{}
				).length
			).toEqual(0);
			expect(
				Object.keys(
					result.attributes.childBasketItems[2].inputtedCharacteristics ||
					{}
				).length
			).toEqual(0);
			expect(
				Object.keys(
					result.attributes.childBasketItems[3].inputtedCharacteristics ||
					{}
				).length
			).toEqual(0);
		});
	});

	describe("BasketStore#deleteUIbasket", () => {
		const flux = new altFromAlt();

		flux.createActions(PaymentActions); // eslint-disable-line
		flux.createActions(SalesActions); // eslint-disable-line
		flux.createActions(DigitalLifeActions); // eslint-disable-line

		const basketActions = flux.createActions(BasketActions);

		it("listens #deleteUIbasket action", async () => {
			flux.createStore(BasketStore);

			// add stuff to basket with other action

			// create action to be dispatched. This way we dont need to mock the API calls in actions.
			let data = {
				basket: {
					id: 42
				},
				basketItems: [{ name: "HooPhone 2000" }]
			};

			// create new active basket
			let action = basketActions.GET_BASKET;
			flux.dispatcher.dispatch({ action, data });

			action = basketActions.GET_BASKET_INCLUDE_BASKET_ITEMS;

			// dispatch action (store is listening for action)
			flux.dispatcher.dispatch({ action, data });

			// assertions
			expect(flux.stores.BasketStore.state.activeBasket).toEqual(data.basket);
			expect(flux.stores.BasketStore.state.basketItems).toEqual(
				data.basketItems
			);

			// and finally test the delete method

			data = null;
			action = basketActions.DELETE_UIBASKET;
			flux.dispatcher.dispatch({ action, data });

			// and assert again

			expect(flux.stores.BasketStore.state.activeBasket).toEqual(null);
			expect(flux.stores.BasketStore.state.basketItems).toEqual([]);
		});
	});

	describe("BasketActions#storeBasket", () => {
		const flux = new alt();
		let sandbox, responseMock, sanitizeBasket_method, APIcall, basketMock;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			sanitizeBasket_method = sandbox.stub(BasketUtil, "sanitizeBasket");
			//refreshAllBaskets_method = sandbox.stub(flux.actions.BasketActions, 'refreshAllBaskets');
		});

		afterEach(() => {
			sandbox.restore();
		});

		it("dispatches the response from POST api call when no basket id exists", async () => {
			basketMock = getBasketMock(3);

			basketMock = R.assocPath(["id"], null, basketMock);

			responseMock = Promise.resolve({
				status: 200,
				data: { data: basketMock }
			});

			sanitizeBasket_method.returns(basketMock);

			APIcall = sandbox.stub(axios, "post");
			APIcall.returns(responseMock);

			flux.getActions("BasketActions").storeBasket(basketMock);

			await flux.resolver.dispatchPendingActions();

			sandbox.assert.calledWith(
				APIcall,
				`${apiUrl}/baskets`,
				{ data: basketMock },
				{ headers: commonHeaders }
			);
		});

		it("dispatches the response from PATCH api call when basket id exists", async () => {
			basketMock = getBasketMock(5);

			basketMock = R.assocPath(["attributes", "ownerId"], null, basketMock);

			responseMock = Promise.resolve({
				status: 200,
				data: { data: basketMock }
			});

			sanitizeBasket_method.returns(basketMock);

			APIcall = sandbox.stub(axios, "patch");
			APIcall.returns(responseMock);

			flux.getActions("BasketActions").storeBasket(basketMock);

			await flux.resolver.dispatchPendingActions();

			sandbox.assert.calledWith(
				APIcall,
				`${apiUrl}/baskets/${5}`,
				{ data: basketMock },
				{ withCredentials: true, headers: commonHeaders }
			);
		});
	});

	describe("BasketActions#refreshActiveBasket", () => {
		const flux = new alt();

		beforeEach(() => {});

		afterEach(() => {});

		it("refreshes active basket", () => {
			const basketMock = getBasketMock(3);

			flux.getActions("BasketActions").refreshActiveBasket(basketMock);

			const { state } = flux.stores.BasketStore;

			expect(state.activeBasket).toEqual(basketMock);
		});
	});

	describe("BasketActions#checkForCharacteristic", () => {
		const flux = new alt();
		const mockProduct = {
			id: "PO_1_NroAmigo_x_30_Dias_x_Bs_10",
			inputtedCharacteristics: {
				CH_Friend_Number: "86868867868",
				CH_SMS_Dialogue: "mock",
				CH_Parent_ID: "mock",
				CH_Payment_Method: "mock",
				CH_Already_Paid: "mock"
			},
			enhancedCharacteristics: {},
			productOfferings: [],
			productOfferingGroups: []
		};

		it("should find a characteristic from a product and return its value", () => {
			const returnValue = flux
				.getActions("BasketActions")
				.checkForCharacteristic(mockProduct, "CH_Friend_Number");
			expect(returnValue).toEqual("86868867868");
		});

		it("should return null if the product does not contain a specific character", () => {
			const returnValue = flux
				.getActions("BasketActions")
				.checkForCharacteristic(mockProduct, "CH_MOCK_NOT_FOUND");
			expect(returnValue).toBeNull();
		});
	});

	describe("BasketActions#validateInputtedCharacteristics", () => {
		let flux;
		let sandbox;

		const mockProduct = {
			id: "PO_LTE_MIFI_PREPAGO",
			inputCharacteristic: {
				CH_ICC: {}
			},
			inputtedCharacteristics: {
				CH_ICC: "1234"
			},
			enhancedCharacteristics: {},
			productOfferings: [],
			productOfferingGroups: []
		};

		const mockConfigurations = {
			PO_LTE_MIFI_PREPAGO: {
				id: "PO_LTE_MIFI_PREPAGO",
				inputtedCharacteristics: {
					CH_ICC: "1234"
				}
			}
		};

		const mockConsulConfigs = {
			POSErrorMessagesMap: {
				ErrorMessages: [
					{
						errCode: "apiErrorSimCardNotFound",
						messageId: "simCardNotFoundWithGivenICCID",
						target: "",
						characteristic: "CH_ICC"
					},
					{
						errCode: "simCardStateInvalid",
						messageId: "simCardStateInvalid",
						target: "",
						characteristic: "CH_ICC"
					},
					{
						errCode: "simCardNotPreactivated",
						messageId: "simCardNotPreactivated",
						target: "",
						characteristic: "CH_ICC"
					}
				]
			},
			characteristicsAliases: {
				imei: "CH_IMEI",
				friendNumber: "CH_Friend_Number",
				icc: "CH_ICC",
				numberOrigin: "CH_NumberOrigin"
			},
			ICCIDValidationConditions: {
				resourceStockName: "TIGO-DUMMY",
				simStatus: ["in-use", "available"]
			},
			ICCIDValidationPOs: ["PO_LTE_MIFI_PREPAGO"],
			ICCIDPreactivationValidationPOs: ["PO_Plan_1_x_1"]
		};

		beforeEach(() => {
			flux = new alt({});
			flux.reduxStore = TestUtils.mockReduxStore({
				feature: mockConsulConfigs,
				consul: mockConsulConfigs,
			});
			flux.history = { push: () => {} };
			flux.stores.ConsulStore.state = mockConsulConfigs;
			sandbox = sinon.sandbox.create();
		});

		afterEach(() => {
			sandbox.restore();
		});

		it("should return false if simcard is not found", async () => {
			const APIcall = sandbox.stub(axios, "get");
			const responseMock = ErrorContainer.composeErrorContainerWithSingleError(
				null,
				"apiErrorSimCardNotFound"
			);

			APIcall.rejects(responseMock);

			const isValid = await flux.actions.BasketActions.validateInputtedCharacteristics({
				product: mockProduct,
				configurations: mockConfigurations
			});

			await flux.resolver.dispatchPendingActions();

			expect(isValid).toBe(false);
		});

		it("should return true if iccid validation is set but not matching with PO id", async () => {
			mockConsulConfigs.ICCIDValidationPOs = ["KOPO_PO"];

			const isValid = await flux
				.getActions("BasketActions")
				.validateInputtedCharacteristics({
					product: mockProduct,
					configurations: mockConfigurations
				});

			await flux.resolver.dispatchPendingActions();
			expect(isValid).toBe(true);
		});

		it("should return true if simcard is available with given iccid", async () => {
			const APIcall = sandbox.stub(axios, "get");
			const responseMock = Promise.resolve({
				status: 200,
				data: { data: { attributes: {} } }
			});
			APIcall.returns(responseMock);

			const isValid = await flux.actions.BasketActions.validateInputtedCharacteristics({
				product: mockProduct,
				configurations: mockConfigurations
			});

			await flux.resolver.dispatchPendingActions();

			expect(isValid).toBe(true);
		});

		it("should return false if simcard is available but imei validation fails", async () => {
			mockProduct.inputCharacteristic.CH_IMEI = {};
			mockProduct.inputtedCharacteristics.CH_IMEI = "4321";
			mockConfigurations.PO_LTE_MIFI_PREPAGO.inputtedCharacteristics.CH_IMEI =
				"4321";

			const APIcall = sandbox.stub(axios, "get");
			const successResponseMock = Promise.resolve({
				status: 200,
				data: { data: { attributes: {} } }
			});
			APIcall.returns(successResponseMock);

			const errorResponseMock = ErrorContainer.composeErrorContainerWithSingleError(
				null,
				"apiUndefinedError"
			);
			APIcall.rejects(errorResponseMock);

			const isValid = await flux.getActions("BasketActions")
				.validateInputtedCharacteristics({
					product: mockProduct,
					configurations: mockConfigurations
				});

			await flux.resolver.dispatchPendingActions();
			expect(isValid).toBe(false);
		});

		describe("Preactivation", () => {

			const mockPreactivationProduct = {
				id: "PO_Plan_1_x_1",
				inputCharacteristic: {
					CH_ICC: {}
				},
				inputtedCharacteristics: {
					CH_ICC: "1234"
				},
				enhancedCharacteristics: {},
				productOfferings: [],
				productOfferingGroups: []
			};

			const mockPreactivationConfigurations = {
				PO_Plan_1_x_1: {
					id: "PO_Plan_1_x_1",
					inputtedCharacteristics: {
						CH_ICC: "1234"
					}
				}
			};

			it("should return false if simcard has no preactivated msisdn", async () => {

				const APIcall = sandbox.stub(axios, "get");
				const responseMock = ErrorContainer.composeErrorContainerWithSingleError(
					null,
					"simCardNotPreactivated"
				);

				APIcall.rejects(responseMock);

				const isValid = await flux.actions.BasketActions.validateInputtedCharacteristics({
					product: mockPreactivationProduct,
					configurations: mockPreactivationConfigurations
				});

				await flux.resolver.dispatchPendingActions();

				expect(isValid).toBe(false);
			});

			xit("should return true if simcard is preactivated with given iccid", async () => {
				const APIcall = sandbox.stub(axios, "get");
				const responseMock = Promise.resolve({
					status: 200,
					data: {
						data: {
							attributes: {
								simStatus: "in-use",
								msisdn: {
									number: 12345,
									resourceStocks: {
										name: "TIGO-DUMMY"
									}
								}
							}
						}
					}
				});
				APIcall.returns(responseMock);

				const isValid = await flux.actions.BasketActions.validateInputtedCharacteristics({
					product: mockPreactivationProduct,
					configurations: mockPreactivationConfigurations
				});

				await flux.resolver.dispatchPendingActions();

				expect(isValid).toBe(true);
			});

		});

	});

	describe("BasketActions#validatePreactivatedICCID", () => {

		const flux = new alt({});
		let sandbox;

		const mockParams = {
			iccid: "1234",
			configuration: {
				id: "PO_Plan_1_x_1",
				inputtedCharacteristics: {
					CH_ICC: "1234"
				}
			},
			conditions: {
				resourceStockName: "TIGO-DUMMY",
				simStatus: ["in-use", "available"]
			},
			numberOrigin: "CH_NumberOrigin",
			alt: {
				reduxStore:{
					dispatch:()=> {}
				}
			}
		};

		beforeEach(() => {
			flux.history = { push: () => {} };
			sandbox = sinon.sandbox.create();
		});

		afterEach(() => {
			sandbox.restore();
		});

		it("should populate NumberOrigin when configuration is set and simcard is preactivated with given iccid", async () => {
			const APIcall = sandbox.stub(axios, "get");
			const number = "54321";
			const responseMock = Promise.resolve({
				status: 200,
				data: {
					data: {
						attributes: {
							simStatus: "in-use",
							icc: "666",
							msisdn: {
								number,
								resourceStocks: {
									name: "TIGO-DUMMY"
								}
							}
						}
					}
				}
			});
			APIcall.returns(responseMock);

			await BasketValidationUtil
				.validatePreactivatedICCID(mockParams);

			await flux.resolver.dispatchPendingActions();

			/*
			TODO: uncomment when moved to redux
			const configStore = flux.stores.ProductOfferingConfigurationStore.state;
			const configuration = configStore.configurations[mockParams.configuration.id];

			expect(configuration.inputtedCharacteristics["CH_NumberOrigin"])
				.toEqual(number);
			*/
		});

		it("should set validICC state to false if iccid validation fails", async () => {
			const APIcall = sandbox.stub(axios, "get");
			const number = "54321";
			const responseMock = Promise.resolve({
				status: 200,
				data: {
					data: {
						attributes: {
							simStatus: "in-use",
							icc: "666",
							msisdn: {
								number,
								resourceStocks: {
									name: "FAIL"
								}
							}
						}
					}
				}
			});
			APIcall.returns(responseMock);

			await BasketValidationUtil
				.validatePreactivatedICCID(mockParams);

			await flux.resolver.dispatchPendingActions();

			const basketStore = flux.stores.BasketStore.state;

			const validIcc = basketStore.validIcc;

			expect(validIcc)
				.toEqual(false);
		});

	});

	describe("BasketActions#mapErrors", () => {
		const flux = new alt();
		it("should return an error object if the error code is matched in the error map", () => {
			const mockedErrors = [
				{
					characteristic: "CH_Friend_Number",
					errCode: "ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR"
				}
			];

			const mockedErrorMessageMap = {
				ErrorMessages: [
					{
						errCode: "ERR_DEVICE_ALREADY_REGISTERED",
						messageId: "deviceAlreadyRegistered",
						target: "",
						characteristic: "CH_IMEI"
					},
					{
						errCode: "ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR",
						messageId: "msisdnDoesNotBelongToOperator",
						target: "",
						characteristic: "CH_Friend_Number"
					}
				]
			};

			const returnValue = flux
				.getActions("BasketActions")
				.mapErrors(mockedErrors, mockedErrorMessageMap);
			expect(returnValue.length).toEqual(1);
			expect(returnValue[0].errCode).toEqual(
				"ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR"
			);
		});
	});

	describe("Update ErrorStore", () => {
		const flux = new alt({});
		// TODO paka where to get errorStore?
		xit("#onProductOfferingError should set productOfferingErrors to ErrorStore state", () => {
			const mockError = [
				{
					characteristic: "CH_Friend_Number",
					errCode: "ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR"
				}
			];

			flux.getActions("BasketActions").onProductOfferingError(mockError);
			flux.resolver.dispatchPendingActions();

			// const productOfferingErrorsInStore = flux.stores.ErrorStore.state.productOfferingErrors;
			//
			// expect(productOfferingErrorsInStore.length).toEqual(1);
			// expect(productOfferingErrorsInStore[0].errCode).toEqual(
			// 	"ERR_MSISDN_DOES_NOT_BELONG_TO_OPERATOR"
			// );
		});

		// TODO paka where to get errorStore?
		it("#showErrorOnProductTable should set errorToBeShownOnProductTable to ErrorStore state", () => {
			const mockError = { code: "unmapped-error" };

			flux.getActions("BasketActions").showErrorOnProductTable(mockError);
			flux.resolver.dispatchPendingActions();

			// const errorToBeShownOnProductTableInStore =
			// 	flux.stores.ErrorStore.state.errorToBeShownOnProductTable;
			//
			// expect(errorToBeShownOnProductTableInStore.code).toEqual(
			// 	"unmapped-error"
			// );
		});
	});

	describe("BasketActions and BasketStore", () => {
		let flux;
		let mocker;
		let sandbox;

		beforeEach(() => {
			flux = new alt({});
			flux.history = { push: () => {} };
			sandbox = sinon.sandbox.create();
			mocker = new MockResponse(flux);
		});

		afterEach(() => {
			mocker.rejectInterceptors();
			flux.recycle();
			sandbox.restore();
		});

		it("sets basket for checkout, calls history#pushState with /setup", async () => {
			sandbox.restore();
			let basketMock = {};

			basketMock = R.assocPath(["attributes", "phase"], "SETUP")(basketMock);

			const storeBasketStub = sandbox.stub(
				flux.actions.BasketActions,
				"storeBasket"
			);
			const routerStub = sandbox.stub(flux.history, "push");

			flux.getActions("BasketActions").checkoutBasket(basketMock);

			await flux.resolver.dispatchPendingActions();

			sinon.assert.calledOnce(storeBasketStub);
			sinon.assert.calledWith(routerStub, "/servicedesk/checkout/setup");
		});

		it("adds submittedBasket and submittedBasketItems to store after basket submit", async () => {
			const APIcall = sandbox.stub(axios, "post");
			const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
			const responseMockData = {};
			const basketInclusions = [
				{
					type: "baskets",
					id: "basketId",
					attributes: {
						lifecycleStatus: "SUBMITTED"
					}
				},
				{
					type: "basketItems",
					id: "item-1"
				}
			];

			const responseMock = Promise.resolve({
				data: { data: responseMockData, included: basketInclusions }
			});
			APIcall.returns(responseMock);

			await flux.getActions("BasketActions").submitBasket(mockBasketId);
			await flux.resolver.dispatchPendingActions();

			const basketStoreState = flux.stores.BasketStore.state;

			expect(basketStoreState.submittedBasket.id).toEqual("basketId");
			expect(basketStoreState.submittedBasketItems.length).toEqual(1);
		});

		// TODO: switch to redux mocks
		xit("when submitBasket error should handle error", async () => {
			const APIcall = sandbox.stub(axios, "post");
			const mockBasketId = "f70dcf14-d682-4fba-a012-bd77b8878d11";
			setUpBaseActionOnErrorMock(flux, APIcall);

			await flux.getActions("BasketActions").submitBasket(mockBasketId);
			await flux.resolver.dispatchPendingActions();

			const basketStoreState = flux.stores.BasketStore.state;

			expect(basketStoreState.submittedBasket).toBeNull();
			expectErrorHandled(flux);
		});

		it("adds sales context to basket", async () => {
			const APIcall = sandbox.stub(axios, "patch");
			const salesContext = {
				"dealer-id": "pickle-rick",
				"sales-person-id": "birdman"
			};
			const responseMock = Promise.resolve({
				data: { data: { attributes: { "sales-context": salesContext } } }
			});
			APIcall.returns(responseMock);

			await flux
				.getActions("BasketActions")
				.updateSalesContextToBasket(salesContext);
			await flux.resolver.dispatchPendingActions();

			const activeBasket = flux.stores.BasketStore.state.activeBasket;

			expect(activeBasket.attributes["sales-context"]).toEqual(salesContext);
		});
	});

	describe("RND-20797", () => {
		const flux = alt();
		let sandbox;
		const basketActions = flux.createActions(BasketActions);

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
		});

		afterEach(() => {
			sandbox.verifyAndRestore();
		});

		const disabilityConfig = {
			poId: "PO_Tarifa_Solidaria",
			identificationType: "DB",
			eligibility: {
				recipeId: "customer-eligible-tarifa-plan",
				disabilityId: null
			}
		};

		const user = {
			identifications: [
				{
					type: "pickle",
					identificationId: "111111112MCC"
				},
				{
					type: "DB",
					identificationId: "20090422MCP"
				}
			]
		};

		it("checks that user is eligible to buy PO with disability eligibility check", async () => {
			const APIcall = sandbox.stub(axios, "post");
			const responseMock = Promise.resolve({
				data: { data: { attributes: {} } }
			});
			APIcall.returns(responseMock);

			const error = await basketActions.checkPODisability(
				user,
				disabilityConfig,
				"PO_Tarifa_Solidaria"
			);

			await flux.resolver.dispatchPendingActions();

			expect(error).toBeUndefined();

			sandbox.assert.calledWith(
				APIcall,
				`${apiUrl}/eligibility-decisions`,
				{
					data: {
						type: "eligibility-decisions",
						attributes: {
							recipeId: "customer-eligible-tarifa-plan",
							parameters: {
								"disability-id": "20090422MCP"
							}
						}
					}
				},
				{ headers: commonHeaders }
			);
		});

		it("displays error if user is ineligible to buy PO", async () => {
			const APIcall = sandbox.stub(axios, "post");

			const responseMock = ErrorContainer.composeErrorContainerWithSingleError(
				null,
				"ERR_CUSTOMER_TARIFA_INELIGIBLE"
			);
			APIcall.rejects(responseMock);

			const error = await basketActions.checkPODisability(
				user,
				disabilityConfig,
				"PO_Tarifa_Solidaria"
			);

			await flux.resolver.dispatchPendingActions();

			// TODO: why does not the error code ERR_CUSTOMER_TARIFA_INELIGIBLE map here?
			expect(error.code).toEqual("apiUndefinedError");

			sandbox.assert.calledWith(
				APIcall,
				`${apiUrl}/eligibility-decisions`,
				{
					data: {
						type: "eligibility-decisions",
						attributes: {
							recipeId: "customer-eligible-tarifa-plan",
							parameters: {
								"disability-id": "20090422MCP"
							}
						}
					}
				},
				{ headers: commonHeaders }
			);
		});

		it("displays error if user does not have disability identification", async () => {
			const error = await basketActions.checkPODisability(
				{
					identifications: [
						{
							type: "pickle",
							identificationId: "111111112MCC"
						}
					]
				},
				disabilityConfig,
				"PO_Tarifa_Solidaria"
			);

			await flux.resolver.dispatchPendingActions();

			expect(error.code).toEqual("no-disability-identification");
		});
	});

	describe("BasketActions#checkForCharacteristic", () => {
		const flux = new alt();

		beforeEach(() => {});

		afterEach(() => {});

		it("check object when property is null no error", () => {
			const characteristic = {
				prop: null
			};
			const label = "CH_EMEI";

			const result = flux
				.getActions("BasketActions")
				.checkForCharacteristic(characteristic, label);

			expect(result).toEqual(null);
		});

		it("check object when property exists", () => {
			const value = "data";
			const characteristic = {
				CH: {
					CH_EM: {
						CH_EMEI: value
					}
				}
			};
			const label = "CH_EMEI";

			const result = flux
				.getActions("BasketActions")
				.checkForCharacteristic(characteristic, label);

			expect(result).toBe(value);
		});
	});
});

function getBasketMock(id = 1) {
	return {
		id,
		type: "basketMock",
		attributes: {
			ownerId: 102
		}
	};
}
