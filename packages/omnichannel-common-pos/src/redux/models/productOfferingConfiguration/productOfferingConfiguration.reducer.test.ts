import ContextualProductService from "../../services/ContextualProductService";
import MsisdnService from "../../services/MsisdnService";
import SimCardsService from "../../services/SimCardsService";
import { Msisdn, ProductOffering, SimCard } from "../../types";
import {
	productOfferingConfiguration,
	ProductOfferingConfigurationActionPayload,
	ProductOfferingConfigurationActions,
} from "./productOfferingConfiguration.actions";
import productOfferingConfigurationReducer, { productOfferingConfigurationInitialState } from "./productOfferingConfiguration.reducers";
import { productOfferingConfigurationSaga } from "./productOfferingConfiguration.saga";

const SagaTester = require("redux-saga-tester").default;
const searchMsisdnOriginal = MsisdnService.searchMsisdn;
const searchSimCardsOriginal = SimCardsService.searchSimCards;
const getProductOfferingsByChannelCodeOriginal = ContextualProductService.getProductOfferingsByChannelCode;

describe("productOfferingConfiguration.reducer", () => {
	const statePoTarifaSolidaria = {
		configurations: {
			PO_Tarifa_Solidaria: {
				id: "PO_Tarifa_Solidaria",
				inputtedCharacteristics: {
					CH_Activation_model: "direct",
					CH_Parent_ID: "6e574006-a27a-48a6-8a75-b9cf21fe516b"
				},
				enhancedCharacteristics: {},
				productOfferings: [],
				productOfferingGroups: [],
				optionalProductOfferings: []
			}
		},
		configurableInstallationTime: {},
		nominationSubscriptionInformation: {},
		synchronizeEnhancedCharacteristics: false,
		msisdnSoftReservation: undefined
	};

	it("should toggle product-offering inside a product-offering-group", () => {
		const path = [
			{ po: "basic-sub-po" },
			{ pog: "addons-pog" },
			{ po: "basic-hybrid-po" }
		];

		let state = {...productOfferingConfigurationInitialState};

		// select
		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.toggleProductOffering(path));

		expect(state.configurations["basic-sub-po"].productOfferingGroups[0].productOfferings[0].selected).toEqual(true);

		// deselect
		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.toggleProductOffering(path));

		expect(state.configurations["basic-sub-po"].productOfferingGroups[0].productOfferings[0].selected).toEqual(false);
	});

	it("when configured should set enhancedCharacteristics synchronously when setInputtedCharacteristic is called", () => {
		const path = [{ po: "basic-sub-po" }];

		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "CH_key", "value"));

		const valueArray = [{ value: "value" }, ];

		const configuration = state.configurations["basic-sub-po"];
		expect(configuration.inputtedCharacteristics.CH_key).toEqual("value");
		expect(configuration.enhancedCharacteristics.CH_key).toEqual(valueArray);
	});

	it("should set inputtedCharacteristic correctly to top-level product-offering", () => {
		const path = [{ po: "basic-sub-po" }];
		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "CH_key", "value"));

		const configuration = state.configurations["basic-sub-po"];
		expect(configuration.inputtedCharacteristics.CH_key).toEqual("value");
	});

	it("should set inputtedCharacteristic correctly to deeper-level product-offering", () => {
		const path = [{ po: "basic-sub-po" }, { po: "basic-hybrid-po" }];
		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "CH_key", "value"));

		const configuration = state.configurations["basic-sub-po"].productOfferings[0];
		expect(configuration.inputtedCharacteristics!.CH_key).toEqual("value");
	});

	it("should set inputtedCharacteristic correctly to product-offering inside product-offering-group", () => {
		const path = [
			{ po: "basic-sub-po" },
			{ pog: "addons-pog" },
			{ po: "basic-hybrid-po" }
		];
		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "CH_key", "value"));

		const configuration = state.configurations["basic-sub-po"].productOfferingGroups[0].productOfferings[0];
		expect(configuration.inputtedCharacteristics!.CH_key).toEqual("value");
	});

	it("should set multiple inputtedCharacteristics correctly to deeper-level product-offering", () => {
		const path = [{ po: "basic-sub-po" }, { po: "basic-hybrid-po" }];
		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "firstKey", "firstValue"));
		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setInputtedCharacteristic(path, "secondKey", "secondValue"));

		const topLevelConfigObject = state.configurations["basic-sub-po"];

		// config objects in the path should not be duplicated
		expect(topLevelConfigObject.productOfferings.length).toEqual(1);

		const configuration = topLevelConfigObject.productOfferings[0];

		expect(configuration.inputtedCharacteristics!.firstKey).toEqual("firstValue");
		expect(configuration.inputtedCharacteristics!.secondKey).toEqual("secondValue");
	});

	it("should select only a single product-offering inside a product-offering-group", () => {
		const path = [{ po: "adsl-po" }, { pog: "adsl-pog" }];
		let state = {...productOfferingConfigurationInitialState};

		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.selectProductOffering(path, "adsl24-po",
			[
				{ id: "adsl8-po", selected: true },
				{ id: "adsl16-po", selected: false },
				{ id: "adsl24-po", selected: false }
			] as any));

		const groups = state.configurations["adsl-po"].productOfferingGroups[0];

		expect(groups.productOfferings[0].selected).toEqual(false);
		expect(groups.productOfferings[1].selected).toEqual(false);
		expect(groups.productOfferings[2].selected).toEqual(true);
	});

	it("should set enhancedCharacteristics correctly to top-level product-offering", () => {
		const path = [{ po: "data21-po" }];
		const key = "multiple-values-char";
		const valueArray = [
			{ value: "value 1" },
			{ value: "value 2" },
			{ value: "value 3" }
		];

		let state = {...productOfferingConfigurationInitialState};
		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setEnhancedCharacteristics(path, key, valueArray));

		const config = state.configurations;
		expect(config["data21-po"].enhancedCharacteristics["multiple-values-char"]).toEqual(valueArray);
	});

	it("should set enhancedCharacteristics correctly to child product offering", () => {
		const path = [{ po: "surf-sub-po" }, { po: "data21-po" }];
		const key = "multiple-values-char";
		const valueArray = [
			{ value: "value 1" },
			{ value: "value 2" },
			{ value: "value 3" }
		];

		let state = {...productOfferingConfigurationInitialState};
		state = productOfferingConfigurationReducer(state, productOfferingConfiguration.setEnhancedCharacteristics(path, key, valueArray));

		const config = state.configurations;

		expect(config["surf-sub-po"]!.productOfferings[0].enhancedCharacteristics!["multiple-values-char"]).toEqual(valueArray);
	});

	it("should handle nomination search", async () => {
		const sagaTester = new SagaTester({});
		sagaTester.start(productOfferingConfigurationSaga);

		const mockMsisdn = "59177715157";
		const mockSim = { icc: 123123123123, simStatus: "available" };
		const mockPO = { id: "prepago-tigo-tigo", attributes: { name: "Pre Pago Tigo 4g" }} as any as ProductOffering;
		const mockReservedFor = "kopo-kettu";

		const msisdnResponseMock: Promise<Msisdn> = Promise.resolve({
				attributes: {
					number: mockMsisdn,
					lifecycleStatus: "reserved",
					characteristics: {
						["plan-offering-id"]: "prepago-tigo-tigo"
					},
					preactivatedSim: {
						...mockSim
					},
					reservedFor: mockReservedFor
				}
		} as any as Msisdn);
		const simResponseMock: Promise<SimCard | undefined> = Promise.resolve(undefined);
		const poResponseMock: Promise<Array<ProductOffering>> = Promise.resolve([{...mockPO}]);

		MsisdnService.searchMsisdn = () => {
			return msisdnResponseMock;
		};
		SimCardsService.searchSimCards = () => {
			return simResponseMock as Promise<SimCard>;
		};
		ContextualProductService.getProductOfferingsByChannelCode = () => {
			return poResponseMock;
		};

		const searchTerm = "59177715157";
		const path = [{ po: "PO_POS_NOMINATION" }];
		const nominationCharacteristics = { numberKey: "CH_NumberResource", iccKey: "CH_ICC", reservedForKey: "CH_ReservedFor"};

		let state = {...productOfferingConfigurationInitialState};
		sagaTester.dispatch(productOfferingConfiguration.nominationSearch(searchTerm, path, nominationCharacteristics));

		await sagaTester.waitFor(ProductOfferingConfigurationActions.NOMINATION_SEARCH_COMPLETE);

		sagaTester.getCalledActions().forEach((action: ProductOfferingConfigurationActionPayload) => {
			state = productOfferingConfigurationReducer(state, action);
		});

		const sub = state.nominationSubscriptionInformation.PO_POS_NOMINATION;
		expect(sub.msisdn!.number).toEqual(mockMsisdn);
		expect(sub.msisdn!.errorCode).toEqual(undefined);
		expect(sub.sim!.icc).toEqual(mockSim.icc);
		expect(sub.sim!.errorCode).toEqual(undefined);
		expect(sub.productOffering!.attributes!.name).toEqual(mockPO.attributes!.name);
		expect((sub.productOffering as any).errorCode).toEqual(undefined);

		const configurations = state.configurations;
		expect(configurations.PO_POS_NOMINATION.inputtedCharacteristics.CH_NumberResource).toEqual(mockMsisdn);
		expect(configurations.PO_POS_NOMINATION.inputtedCharacteristics.CH_ICC).toEqual(mockSim.icc);
		expect(configurations.PO_POS_NOMINATION.inputtedCharacteristics.CH_ReservedFor).toEqual(mockReservedFor);
	});

	afterAll(() => {
		MsisdnService.searchMsisdn = searchMsisdnOriginal;
		SimCardsService.searchSimCards = searchSimCardsOriginal;
		ContextualProductService.getProductOfferingsByChannelCode = getProductOfferingsByChannelCodeOriginal;
	});


	it("should keep state when reset productOfferingGroups", () => {
		const newstate = productOfferingConfigurationReducer(statePoTarifaSolidaria, productOfferingConfiguration.resetProductOfferingGroups("PO_Tarifa_Solidaria"));
		expect(newstate).toEqual(statePoTarifaSolidaria);
	});

	it("should reset productOfferingGroups state", () => {

		const state = {
			"configurations": {
				"PO_Tarifa_Solidaria": {
					"id": "PO_Tarifa_Solidaria",
					"inputtedCharacteristics": {
						"CH_Activation_model": "direct",
						"CH_Parent_ID": "6e574006-a27a-48a6-8a75-b9cf21fe516b"
					},
					"enhancedCharacteristics": {},
					"productOfferings": [],
					"productOfferingGroups": [{
						"id": "GRP_PO_Select_MSISDN",
						"inputtedCharacteristics": {},
						"enhancedCharacteristics": {},
						"productOfferings": [{
							"id": "PO_Platinum_Numbers",
							"name": "Super Faciles",
							"categories": [],
							"categoriesIds": [],
							"commercialEnrichments": [],
							"featureCharacteristics": [],
							"inputCharacteristics": {},
							"instanceCharacteristics": {
								"CH_SKU": {
									"values": [{
										"name": "Super Faciles",
										"value": "Super Faciles"
									}],
									"description": "CH_SKU",
									"mandatory": true,
									"name": "CH_SKU",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"number-type": {
									"values": [{ "name": "Super Faciles", "value": "Super Faciles" }],
									"description": "number-type",
									"mandatory": true,
									"name": "number-type",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								}
							},
							"prices": [{
								"type": "ONE_TIME",
								"name": "Platinum Numbers",
								"chargedUnit": { "amount": 22, "currency": "BOB", "unitOfMeasure": "MONETARY" },
								"taxAmount": 0,
								"taxFreeAmount": 22,
								"taxIncludedAmount": 22,
								"taxRate": 0,
								"currency": "BOB",
								"isUpfront": true
							}],
							"productOfferingGroups": [],
							"productOfferings": [],
							"specificationId": "PS_Platinum_Numbers",
							"specType": "PRODUCT",
							"specSubType": "RESOURCE",
							"discounts": [],
							"allowances": [],
							"totalUpfrontPrice": 22,
							"commercial": true,
							"deliveryMethod": false,
							"selected": false
						}, {
							"id": "PO_NumberPortIn",
							"name": "Number Port In",
							"categories": [],
							"categoriesIds": [],
							"commercialEnrichments": [],
							"featureCharacteristics": [],
							"inputCharacteristics": {
								"CH_MNPRequestId": {
									"values": [],
									"description": "CH_MNPRequestId",
									"source": "Internal",
									"mandatory": false,
									"name": "CH_MNPRequestId",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": true,
									"validFor": { "expired": false }
								},
								"CH_PortInNumberResource": {
									"values": [],
									"description": "CH_PortInNumberResource",
									"source": "user",
									"mandatory": true,
									"validation": "^[0-9]{11}$",
									"name": "CH_PortInNumberResource",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"CH_DonorId": {
									"values": [{ "name": "VIVA", "value": "VIVA" }, {
										"name": "ENTEL",
										"value": "ENTEL"
									}],
									"description": "CH_DonorId",
									"source": "user",
									"mandatory": true,
									"validation": "^(VIVA|ENTEL)$",
									"name": "CH_DonorId",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"CH_DocSigned": {
									"values": [],
									"description": "CH_DocSigned",
									"source": "user",
									"mandatory": false,
									"name": "CH_DocSigned",
									"dataType": "BOOLEAN",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								}
							},
							"instanceCharacteristics": {
								"CH_Ported_In_Flag": {
									"values": [{
										"name": "TRUE",
										"value": "TRUE"
									}],
									"description": "To identify if MSISDN was ported in",
									"mandatory": true,
									"name": "CH_Ported_In_Flag",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"CH_MNP_Code": {
									"values": [{ "name": "800", "value": "800" }],
									"description": "CH_MNP_Code",
									"mandatory": true,
									"name": "CH_MNP_Code",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"number-type": {
									"values": [{ "name": "PortIn", "value": "PortIn" }],
									"description": "number-type",
									"mandatory": true,
									"name": "number-type",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								},
								"CH_ProductOfferingId_Cease": {
									"values": [{
										"name": "PO_Suspend_Portin_InProgress",
										"value": "PO_Suspend_Portin_InProgress"
									}],
									"description": "CH_ProductOfferingId_Cease",
									"mandatory": false,
									"name": "CH_ProductOfferingId_Cease",
									"dataType": "STRING",
									"cardinality": {},
									"hidden": false,
									"validFor": { "expired": false }
								}
							},
							"prices": [],
							"productOfferingGroups": [],
							"productOfferings": [],
							"specificationId": "PS_Port_In",
							"specType": "PRODUCT",
							"specSubType": "SERVICE",
							"discounts": [],
							"allowances": [],
							"totalUpfrontPrice": 0,
							"commercial": true,
							"deliveryMethod": false,
							"inputtedCharacteristics": {
								"CH_DonorId": "VIVA",
								"CH_PortInNumberResource": "1234567890"
							},
							"selected": true
						}],
						"productOfferingGroups": [],
						"optionalProductOfferings": []
					}],
					"optionalProductOfferings": []
				}
			},
			"configurableInstallationTime": {},
			"nominationSubscriptionInformation": {},
			"synchronizeEnhancedCharacteristics": false
		} as any;
		const newstate = productOfferingConfigurationReducer(state, productOfferingConfiguration.resetProductOfferingGroups("PO_Tarifa_Solidaria"));
		expect(newstate).toEqual(statePoTarifaSolidaria);
	});
});
