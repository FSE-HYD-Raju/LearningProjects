import * as React from "react";
import { shallow } from "enzyme";
import {
	mountWithContext,
	attachWithContext,
	TestUtils
} from "../../../testUtils";

import AddNewPlanContainer, { AddNewPlanContainerProps } from "./AddNewPlanContainer";
import {
	Agreement, Basket, ContextualPaymentMethodsWithExtraInfo, Product,
	ProductOffering,
} from "../../../redux/types";
import PaymentInvocation from "../../../redux/types/payment/PaymentInvocation";

const { makeStore } = TestUtils;

const context = {
	flux: {
		stores: {
			ConsulStore: makeStore("flux.stores.ConsulStore"),
		}
	},
	store: TestUtils.mockReduxStore({
		feature: {}
	}),
};

const { getModalContents } = TestUtils;
const minProps: AddNewPlanContainerProps = {
	alternatePlans: [] as any as Array<ProductOffering>,
	configurations: {},
	actions: {
		discardBasket: jest.fn(),
		submitBasket: jest.fn(),
		resetNewPlanOrder: jest.fn(),
		resetConfigurations: jest.fn(),
		submitNewPlanOrder: jest.fn(),
		setInputtedCharacteristic: jest.fn(),
		selectProductOffering: jest.fn(),
		toggleProductOffering: jest.fn(),
		initializeNewPlanOrder: jest.fn(),
		getAvailablePlans: jest.fn(),
	}
};

const props = {
	agreement: {
		id: "juanita-agreement1",
		type: "agreements",
		attributes: {
			validFor: {
				startDate: "2016-11-03T00:00:00Z",
				endDate: null
			},
			referenceNumber: "5373K5",
			lifeCycleStatus: "ACTIVE",
			products: [
				{
					id: "juanita-agreement1-sub",
					name: "Hybrid BASIC Plan",
					productOfferingId: "basic-hybrid-po",
					lifeCycleStatus: "ACTIVE",
					usageCounters: [{}, {}, {}, {}],
					realizingResources: [{}, {}, {}, {}],
					realizingServices: [{}, {}, {}, {}, {}, {}, {}],
					characteristics: {
						"subscription-type": "HYBASIC",
						name: "Hybrid BASIC Plan"
					},
					commercialEnrichments: [{}],
					childProducts: [{}, {}],
					categories: [
						"postpaid",
						"prepaid",
						"plan-level-affordable"
					],
					parentProducts: [],
					specType: null,
					specSubType: null,
					user: {
						id: "juanita",
						displayName: "Juanita"
					},
					owner: null,
					payer: {
						id: "juanita",
						displayName: "Juanita"
					},
					validFor: {
						startDate: "2016-11-03T00:00:00Z",
						endDate: null
					},
					prices: [],
					simCards: [{}, {}],
					billingAccountIds: [
						"juanita-billingaccount-postpaid",
						"juanita-billingaccount-prepaid"
					],
					chargingBalances: [{}, {}, {}],
					allowedTransitions: [{}, {}, {}, {}],
					agreementId: "juanita-agreement1",
					instanceCharacteristics: {},
					enhancedCharacteristics: {},
					isPlan: false,
					hasAlternateOfferings: false
				}
			],
		},
		relationships: {},
		links: {}
	} as any as Agreement,
	subscription: {
		id: "juanita-agreement1-sub",
		name: "Hybrid BASIC Plan",
		productOfferingId: "basic-hybrid-po",
		lifeCycleStatus: "ACTIVE",
		usageCounters: {},
		realizingResources: [
			{
				primaryId: "0123006349",
				validFor: {
					startDate: "2016-11-03T00:00:00Z",
					endDate: null
				},
				lifeCycleStatus: "ACTIVE",
				type: "MSISDN",
				subType: null,
				specification: {
					name: "msisdn",
					id: "silver-numbers-spec",
					specSubType: "MSISDN",
					specType: "RESOURCE",
					instanceCharacteristics: {
						"number-type": {},
						"lookup-href": {}
					},
					inputCharacteristics: {
						number: {}
					},
					featureCharacteristics: []
				},
				characteristics: {
					resourceSelectionRule: "mandatory"
				},
				id: "juanita-agreement1-msisdn"
			}
		],
		realizingServices: {},
		characteristics: {},
		commercialEnrichments: [],
		childProducts: [],
		categories: {},
		parentProducts: {},
		specType: null,
		specSubType: null,
		user: {},
		owner: null,
		payer: {},
		validFor: {},
		prices: {},
		simCards: {},
		billingAccountIds: {},
		chargingBalances: {},
		allowedTransitions: {},
		agreementId: "juanita-agreement1",
		instanceCharacteristics: {},
		enhancedCharacteristics: {},
		isPlan: false,
		hasAlternateOfferings: false
	} as any as Product,
	alternatePlans: [
		{
			id: "bronzeline-voice-217-po",
			type: "contextualProducts",
			attributes: {
				specificationId: "bronzeline-voice",
				specType: "PRODUCT",
				instanceCharacteristics: {},
				priority: null,
				productOfferingGroups: [],
				stockLevel: null,
				commercialEnrichments: [],
				featureCharacteristics: [],
				specSubType: "ADDITIONAL",
				productOfferings: [],
				name: "Bronze Line Voice 217",
				categories: [],
				inputCharacteristics: {},
				prices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {},
						taxAmount: null,
						taxFreeAmount: 6.95,
						taxRate: 0,
						recurringChargePeriod: {},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				]
			}
		}
	] as any as Array<ProductOffering>,
	configurations: {},
	paymentInfo: {} as any as PaymentInvocation,
	individualId: "juanita",
	submittedBasket: {
		id: "327fed3c-fadf-4e87-97e2-390be7a8f23b",
		type: "baskets",
		attributes: {
			lifecycleStatus: "SUBMITTED",
			referenceNumber: "530c8573-db4e-40d7-846f-f5c8ffac1ff6"
		},
		relationships: {
			owner: {
				data: {
					id: "juanita",
					type: "persons"
				}
			},
			basketItems: {
				data: [
					{
						id: "b2a7b47c-bd83-4fab-84aa-b27721aa409d",
						type: "basketItems"
					}
				]
			},
			payer: {
				data: {
					id: "juanita",
					type: "persons"
				}
			}
		}
	} as any as Basket,
	contextualPaymentMethodsWithExtraInfo: {
		basketId: "b3f49d6c-3f15-4d5a-8065-35a293795e9f",
		initializedBasket: {
			id: "b3f49d6c-3f15-4d5a-8065-35a293795e9f",
			type: "baskets",
			attributes: {
				createdAt: "2018-04-04T13:43:10.095Z",
				upfrontPrices: false,
				deliveryContactMediumId: "juanita-phone",
				lastModifiedAt: null,
				lifecycleStatus: "OPEN",
				referenceNumber: "77da63d1-5cb2-486d-a66f-0f0943a2552c",
				created: null,
				totalPrices: [],
				modified: null,
				billingAddress: null,
				expiresAt: null
			},
			relationships: {}
		},
		basketItems: {
			id: "05b120ad-9ac9-4893-b2f6-5b19b6d0c250",
			type: "basketItems",
			attributes: {
				basketProductId: "7a2c5c86-6f19-471f-bd33-caf52b8e9829",
				product: {
					id: "bronzeline-voice-217-po",
					name: "Bronze Line Voice 217",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {},
					prices: [],
					priority: null,
					productOfferingGroups: [],
					productOfferings: [],
					specificationId: "bronzeline-voice",
					specType: "PRODUCT",
					specSubType: "ADDITIONAL",
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				},
				quantity: 1,
				lastModifiedAt: "2018-04-04T13:43:13.092Z",
				inputtedCharacteristics: {},
				totalPrices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {},
						taxAmount: null,
						taxFreeAmount: 6.95,
						taxRate: 0,
						recurringChargePeriod: {},
						currency: "EUR"
					}
				],
				childBasketItems: [],
				unitPrices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {},
						taxAmount: null,
						taxFreeAmount: 6.95,
						taxRate: 0,
						recurringChargePeriod: {},
						currency: "EUR"
					}
				],
				basketServiceId: null,
				reasonForAction: null,
				targetLifecycleStatus: null,
				createdAt: "2018-04-04T13:43:13.092Z",
				targetAgreementId: "juanita-agreement1",
				originalTotalPrices: [],
				action: null,
				originalUnitPrices: []
			},
			relationships: {}
		},
		contextualPaymentMethods: [
			{
				id: "balance",
				type: "contextualPaymentMethods",
				attributes: {
					balance: 100,
					label: "Balance"
				}
			}
		],
		characteristics: {},
		totalPrices: {
			RECURRENT: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					taxAmount: null,
					taxFreeAmount: 6.95,
					taxRate: 0,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					currency: "EUR"
				}
			]
		}
	} as any as ContextualPaymentMethodsWithExtraInfo,
};

describe("AddNewPlanContainer", () => {

	it("should succeed at shallow mount with min props", () => {
		const wrapper = shallow(<AddNewPlanContainer {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount with min props", () => {
		mountWithContext(<AddNewPlanContainer {...minProps} />);
	});

	it("Should perform full new plan purchase", () => {
		const getAvailablePlansSpy = jest.fn();
		const initSpy = minProps.actions.initializeNewPlanOrder;
		const fullProps = {
			...props,
			actions: {
				...minProps.actions,
				getAvailablePlans: getAvailablePlansSpy
			}
		};
		const wrapper = attachWithContext(<AddNewPlanContainer {...fullProps} />, { context });

		// Should fetch available plans during mount using action
		expect(getAvailablePlansSpy).toHaveBeenCalledTimes(1);

		const addNewPlanButton = wrapper.find("#ecare-buttonChangePlan-add-new-plan");
		addNewPlanButton.hostNodes().simulate("click");

		let modalContents = getModalContents(wrapper, context);

		// Should contain phone number in the title
		expect(modalContents.find(".OcModal-header-container").text()).toContain("0123006349");

		// Plan list item should be rendered
		expect(modalContents.find("#OcAccordionList-change-plan-list-bronzeline-voice-217-po")).toBeTruthy();

		const buyButton = modalContents.find("#change-plan-buttonSelectAlternatePlan-bronzeline-voice-217-po");
		buyButton.hostNodes().simulate("click");
		wrapper.update();
		modalContents = getModalContents(wrapper, context);

		// Configuration modal should be rendered
		expect(modalContents.find(".PlanConfigurationModal-configuration")).toHaveLength(1);

		const proceedToPaymentButton = modalContents.find("#buttonProceedToPayment");

		// Do manual submit because react-formal is crap. Test will fail earlier already if the actual button can not be clicked anyway.
		proceedToPaymentButton.hostNodes().simulate("click");
		modalContents.find("form").simulate("submit");
		wrapper.update();
		// Should have initiated the new plan order using action
		expect(initSpy).toHaveBeenCalledTimes(1);

		// TODO: revert this test when last step modal is back to life
		// modalContents = getModalContents(wrapper);
		// const confirmButton = modalContents.find("#buttonPay-no-payment"); // Check that confirm button exists to assert that the modal changed properly
		// expect(confirmButton).toBeTruthy();
		// confirmButton.hostNodes().simulate("click");
		//
		// // Should have submitted the new plan order using action
		// expect(submitOrderSpy).toHaveBeenCalledTimes(1);

		wrapper.detach();
	});
});
