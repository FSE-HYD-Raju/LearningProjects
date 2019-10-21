import * as React from "react";
import Plans from "./Plans";

import {
	attachWithContext,
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../../testUtils";
import {
	Agreement,
	Configurations,
	ContextualPaymentMethodsWithExtraInfo,
	Product,
	ProductOffering,
} from "../../../redux/types";
import { ReactWrapper } from "enzyme";
import PaymentInvocation from "../../../redux/types/payment/PaymentInvocation";

jest.mock("../../product/ProductOfferingConfigurationContainer", () => {
	return {default: () => <div id="ProductOfferingConfigurationContainer"/>};
});

const subscription = {
	id: "juanita-agreement4-sub",
	agreementId: "juanita-agreement4",
	name: "Postpaid SUPERB Plan",
	productOfferingId: "superb-po",
	lifeCycleStatus: "ACTIVE",
	isPlan: true,
	hasAlternateOfferings: true,
	childProducts: [
		{
			id: "non-existent-mms-sub",
			name: "Lots of MMS",
			isPlan: false,
			hasAlternateOfferings: true
		},
		{
			id: "juanita-agreement4-sub-data",
			name: "Data 21Mb/s",
			isPlan: true,
			lifeCycleStatus: "ACTIVE",
			hasAlternateOfferings: true,
			inputCharacteristics: {
				mockkey: "dummydata"
			},
			productOfferingId: "data21-po",
			prices: [
				{
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					conditions: null,
					currency: "EUR",
					name: null,
					originalPrice: null,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					taxAmount: null,
					taxFreeAmount: 4.5,
					taxRate: 0,
					type: "RECURRENT"
				}
			]
		},
		{
			id: "juanita-agreement4-sub-voice",
			name: "Voice 500min SMS 100pc package",
			hasAlternateOfferings: false,
			lifeCycleStatus: "ACTIVE",
			isPlan: true,
			productOfferingId: "voicesms-1-po",
			prices: [
				{
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					conditions: null,
					currency: "EUR",
					name: null,
					originalPrice: null,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					taxAmount: null,
					taxFreeAmount: 3,
					taxRate: 0,
					type: "RECURRENT"
				}
			]
		}
	]
} as any as Product;

const agreements = [
	{
		id: subscription.agreementId,
		attributes: {
			products: [subscription]
		}
	}
] as any as Array<Agreement>;

const context = {
	flux: {
		actions: {
			BasketActions: {
				discardBasket: jest.fn(),
			},
		},
		stores: {

		}
	}
};

const alternateDataOfferings = [
	{
		id: "data21-po",
		type: "productOfferings",
		attributes: {
			specificationId: "data21",
			specType: "PRODUCT",
			instanceCharacteristics: {
				data: {
					values: [
						{
							value: "21Mbps",
							name: "21Mbps"
						}
					],
					description: null,
					source: null,
					subType: null,
					mandatory: false,
					validation: null,
					name: null,
					priority: null
				}
			},
			priority: null,
			productOfferingGroups: [],
			commercialEnrichments: [],
			featureCharacteristics: [],
			specSubType: "DATA",
			productOfferings: [],
			name: "Data 21Mb/s",
			categories: [],
			inputCharacteristics: {
				mockkey: "dummydata"
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					taxAmount: null,
					taxFreeAmount: 14.45,
					taxRate: 0,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					currency: "EUR",
					conditions: null,
					originalPrice: null
				},
				{
					type: "ONE_TIME",
					name: "Migration fee",
					currency: "EUR",
					taxFreeAmount: 3.0
				}
			]
		}
	},
	{
		id: "data50-po",
		type: "alternateProductOfferings",
		attributes: {
			specificationId: "data50",
			specType: "PRODUCT",
			instanceCharacteristics: {
				data: {
					values: [
						{
							value: "50Mbps",
							name: "50Mbps"
						}
					],
					description: null,
					source: null,
					subType: null,
					mandatory: false,
					validation: null,
					name: null,
					priority: null
				}
			},
			offeringType: "UPGRADE",
			priority: null,
			productOfferingGroups: [],
			commercialEnrichments: [],
			featureCharacteristics: [],
			specSubType: "DATA",
			productOfferings: [],
			name: "Data 50Mb/s",
			categories: [],
			inputCharacteristics: {
				icc: {
					values: [],
					description: "SIM card serial number",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "ICC",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: null,
					cardinality: {
						max: null,
						min: null
					},
					humanReadableId: null,
					hidden: false,
					maxValue: null,
					minValue: null,
					unitOfMeasure: null,
					validFor: {
						startDate: null,
						endDate: null
					}
				}
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					taxAmount: null,
					taxFreeAmount: 19.95,
					taxRate: 0,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					currency: "EUR",
					conditions: null,
					originalPrice: null
				},
				{
					type: "ONE_TIME",
					name: "Migration fee",
					currency: "EUR",
					taxFreeAmount: 3.0
				}
			]
		}
	},
	{
		id: "data2-po",
		type: "alternateProductOfferings",
		attributes: {
			specificationId: "data2",
			specType: "PRODUCT",
			instanceCharacteristics: {
				data: {
					values: [
						{
							value: "2Mbps",
							name: "2Mbps"
						}
					],
					description: null,
					source: null,
					subType: null,
					mandatory: false,
					validation: null,
					name: null,
					priority: null
				}
			},
			offeringType: "DOWNGRADE",
			priority: null,
			productOfferingGroups: [],
			commercialEnrichments: [],
			featureCharacteristics: [],
			specSubType: "DATA",
			productOfferings: [],
			name: "Data 2Mb/s",
			categories: [],
			inputCharacteristics: {
				mockkey: "dummydata"
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					taxAmount: null,
					taxFreeAmount: 9.95,
					taxRate: 0,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					currency: "EUR",
					conditions: null,
					originalPrice: null
				},
				{
					type: "ONE_TIME",
					name: "Migration fee",
					currency: "EUR",
					taxFreeAmount: 3.0
				}
			]
		}
	}
] as any as Array<ProductOffering>;

const props = {
	actions: {
		commitProductReplace: jest.fn(),
		resetProductConfiguration: jest.fn(),
		submitProductConfiguration: jest.fn(),
		resetProductChange: jest.fn(),
		initializeProductReplace: jest.fn(),
		getProductById: jest.fn(),
		getProductsByIds: jest.fn(),
		getProductsFromCategory: jest.fn(),
		discardBasket: jest.fn(),
		submitBasket: jest.fn(),
		setInputtedCharacteristic: jest.fn(),
		toggleProductOffering: jest.fn(),
		selectProductOffering: jest.fn(),
		onChangePlan: jest.fn(),
	},
	focusedProductId: "",
	hideListing: false,
	productConfigurationErrors: {},
	configurations: {} as any as Configurations,
	productOfferings: [] as Array<ProductOffering>,
	fullWidth: false,
	subscription,
	agreements,
	showChangePlanAction: () => true,
	showConfigurePlanAction: () => true,
};

// TODO: uncomment and update tests when Plans migrate to OcAccordion
describe("Plans", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<Plans {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<Plans {...props} />);
	});

	describe("RND-15268", () => {
		xit("renders plans", () => {
			const wrapper = mountWithContext(<Plans {...props} />);

			const rows = wrapper.find(".OcListWidget-table-row");

			const dataPlan = subscription.childProducts.find((p: Product) => p.name === "Data 21Mb/s");

			const dataPlanRow = rows
				.filterWhere((n: ReactWrapper) => {
					return (n.find(".OcListWidget-column").at(0).text().toLowerCase() === dataPlan!.name.toLowerCase());
				}).find(".OcListWidget-column").hostNodes();

			expect(dataPlanRow.at(1).text()).toMatch(new RegExp(".*" + dataPlan!.prices![0].taxFreeAmount + ".* / \\w+"));

			const voicePlan = subscription.childProducts.find(p => p.name === "Voice 500min SMS 100pc package");

			const voicePlanRow = rows.filterWhere((n: ReactWrapper) => {
					return (n.find(".OcListWidget-column").at(0).text().toLowerCase() === voicePlan!.name.toLowerCase());
				}).find(".OcListWidget-column").hostNodes();

			expect(voicePlanRow.at(1).text()).toMatch(new RegExp(".*" + voicePlan!.prices![0].taxFreeAmount + ".* / \\w+"));

			const mmsPlanRow = rows.filterWhere((n: ReactWrapper) => {
				return (n.find(".OcListWidget-column").at(0).text().toLowerCase() === "Lots of MMS".toLowerCase());
			});

			expect(mmsPlanRow.length).toEqual(0);
			expect(rows.length).toEqual(subscription.childProducts.filter(p => p.isPlan).length + 1);
		});

		xit("renders correct buttons for plans", () => {
			const wrapper = mountWithContext(<Plans {...props} />);

			const rows = wrapper.find(".OcListWidget-table-row");

			const rowsPerPlan = Array.from(Array(rows.length).keys()).map(i =>
				rows.at(i).find(".OcListWidget-column")
			);

			const planProducts = subscription.childProducts.filter(p => p.isPlan);
			expect(rowsPerPlan.length).toEqual(planProducts.length + 1);

			const plansWithoutAlternateOfferings = planProducts.filter(p => !p.hasAlternateOfferings);

			const renderedPlansWithoutAlternateOfferings = rowsPerPlan.filter(
				r =>
					plansWithoutAlternateOfferings.filter(p => p.name.toLowerCase() === r.at(0).text().toLowerCase()).length > 0);

			const plansWithAlternateOfferings = planProducts.filter(p => p.hasAlternateOfferings);

			const renderedPlansWithAlternateOfferings = rowsPerPlan.filter(
				r => plansWithAlternateOfferings.filter(p => p.name.toLowerCase() === r.at(0).text().toLowerCase()).length > 0);

			/* Change plan button should _not_ be rendered for plans with hasAlternateOfferings: false */
			renderedPlansWithoutAlternateOfferings.forEach(p =>
				expect(p.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonChangePlan")).length).toEqual(0));

			/* Change plan button _should_ be rendered for plans with hasAlternateOfferings: true */
			renderedPlansWithAlternateOfferings.forEach(p =>
				expect(p.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonChangePlan")).length).toEqual(1));
		});
	});

	describe("RND-15300", () => {
		xit("fetches product offering details when the Configure button is clicked", () => {
			const getProductByIdSpy = jest.fn();

			const wrapper = mountWithContext(
				<Plans {...props} />
			);

			/* find all Configure plan buttons */
			const configurationButtons = wrapper
				.find("OcButton")
				.filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonConfigurePlan"));

			wrapper.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonConfigurePlan")).at(0).simulate("click");

			wrapper.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonConfigurePlan")).at(1).simulate("click");

			wrapper.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonConfigurePlan")).at(2).simulate("click");

			const planProducts = subscription.childProducts.filter(p => p.isPlan).concat(subscription);

			expect(configurationButtons.length).toEqual(
				planProducts.length // RUBT-85945: removed isConfigurable check, so all plans are shown configure button
			);

			/* assert getProductById() was called with the productOfferingId of each plan */
			// RUBT-85945: changed this to assert that all plans, for some reason before only first PO id was asserted (._head was used)
			expect(getProductByIdSpy).toHaveBeenCalledWith("superb-po");
			expect(getProductByIdSpy).toHaveBeenCalledWith("data21-po");
			expect(getProductByIdSpy).toHaveBeenCalledWith("voicesms-1-po");
		});

		xit("presents configuration modal", () => {

			const context = {
				flux: {
					stores: {
						ProductOfferingConfigurationStore: {
							configurations: {}
						},
						ConsulStore: {
							msisdnReservationRequired: true
						},
					}
				},
				store: TestUtils.mockReduxStore({
					productOfferingConfiguration: {
						configurations: {}
					},
					feature: {}
				})
			};

			const wrapper = attachWithContext(<Plans {...props} />, { context });

			const existingPlanConfigurationModal = wrapper.find("ExistingPlanConfigurationModal");
			expect(existingPlanConfigurationModal.length).toEqual(1);

			wrapper.detach();
		});
	});

	const { getModalContents } = TestUtils;

	describe("RND-15270", () => {
		xit("renders PlanListModal when Change plan button is clicked", () => {
			const onChangePlanSpy = props.actions.onChangePlan;
			const wrapper = attachWithContext(
				<Plans
					{...props}
					subscription={subscription}
					agreements={agreements}
					showActions={true}
				/>
			);

			const plans = subscription.childProducts.filter(p => p.isPlan);

			const plansWithAlternateOfferings = plans.filter(
				p => p.hasAlternateOfferings
			);

			const rows = wrapper.find(".OcListWidget-table-row");

			/* map the .OcListWidget-column elements in a ReactWrapper into an array: [ ReactWrapper<.OcListWidget-column>* ] */
			const rowsPerPlan = Array.from(Array(rows.length).keys()).map(i =>
				rows.at(i).find(".OcListWidget-column")
			);

			const renderedPlansWithAlternateOfferings = rowsPerPlan.filter(
				r => plansWithAlternateOfferings.filter(p => p.name.toLowerCase() === r.at(0).text().toLowerCase()).length > 0);

			const changePlanButtons = renderedPlansWithAlternateOfferings.map(
				p => {
					return p.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonChangePlan"));
				}
			);
			changePlanButtons[0].simulate("click");
			expect(onChangePlanSpy).toHaveBeenCalledWith(plansWithAlternateOfferings[0].productOfferingId);

			wrapper.setProps({
				alternatePlans: alternateDataOfferings
			});

			wrapper.instance().componentWillReceiveProps({
				alternatePlans: alternateDataOfferings
			});

			const planListModal = wrapper.find("PlanListModal");
			expect(planListModal.length).toEqual(1);

			wrapper.detach();
		});

		xit("goes through the Change plan flow when an alternate offering is chosen for comparison", () => {
			const individualId = "juanita";
			const initializeProductReplaceSpy = jest.fn();
			const commitProductReplaceSpy = jest.fn();
			const characteristics = { mockkey: "dummydata" };

			const totalPrices = alternateDataOfferings.find(o => o.id === "data50-po")!.attributes!.prices!.reduce((stack: any, elem) => {
					const { type } = elem;

					if (stack[type]) {
						stack[type].push(elem);
					} else {
						stack[type] = [elem];
					}

					return stack;
				}, {});

			const contextualPaymentMethodsWithExtraInfo = {
				basketItems: {
					id: "my-little-pink-basket",
					type: "basketItems",
					attributes: {}
				},
				contextualPaymentMethods: [
					{
						balance: 100,
						id: "balance",
						label: "Balance"
					}
				],
				characteristics,
				totalPrices,
				initializedBasket: {
					attributes: {
						upfrontPrices: true
					}
				}
			} as any as ContextualPaymentMethodsWithExtraInfo;

			const paymentInfo = {
				paymentCompletedCode: "balance-charged",
				paymentErrorCode: null,
				paymentCompleted: true
			} as any as PaymentInvocation;

			const configurations = {
				"data50-po": {
					mockkey: "dummydata"
				}
			} as any as Configurations;

			const wrapper = attachWithContext(
				<Plans
					{...props}
					individualId={individualId}
					alternatePlans={alternateDataOfferings}
					contextualPaymentMethodsWithExtraInfo={contextualPaymentMethodsWithExtraInfo}
					paymentInfo={paymentInfo}
					configurations={configurations}
					actions={{
						...props.actions,
						commitProductReplace: commitProductReplaceSpy,
						initializeProductReplace: initializeProductReplaceSpy,
						setInputtedCharacteristic: () => {},
					}}
				/>,
				{ context }
			);

			const plans = subscription.childProducts
				.filter(p => p.isPlan)
				.concat(subscription);
			const plansWithAlternateOfferings = plans.filter(p => p.hasAlternateOfferings);

			/* click Change plan on a Plan */
			wrapper.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonChangePlan")).at(1).simulate("click");
			wrapper.instance().showPlanList(plansWithAlternateOfferings[0]);
			wrapper.update();

			const planListModal = wrapper.find("PlanListModal");
			const planListModalContents = getModalContents(planListModal, context);

			const planListItems = planListModalContents
				.find("[data-test-name=\"PlanListItem\"]")
				.hostNodes();

			const selectedPlanListItem = planListItems.at(0);
			const selectedOfferingName = selectedPlanListItem.childAt(1).text();

			const selectedOffering = alternateDataOfferings.find(o => o.attributes!.name === selectedOfferingName);

			/* Select an offering to configuration phase */
			const selectToComparisonButtons = planListModalContents.find("OcButton")
				.filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonSelectToComparison"));
			selectToComparisonButtons.at(1).simulate("click");

			wrapper.instance().showPlanComparison(selectedOffering);
			wrapper.update();

			/* assert the comparison modal is presented */
			expect(wrapper.find("PlanComparisonModal").length).toEqual(1);

			const comparisonModalContents = getModalContents(wrapper.find("PlanComparisonModal"), context);

			comparisonModalContents.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonSelectOffering")).simulate("click");

			wrapper.instance().showPlanConfiguration(selectedOffering);
			wrapper.update();

			const planConfigurationModal = wrapper.find("PlanConfigurationModal");

			expect(planConfigurationModal.length).toEqual(1);

			const configurationModalContents = getModalContents(planConfigurationModal, context);

			expect(configurationModalContents.find("[data-test-name=\"selected-offering-name\"]")
				.hostNodes().text().toLowerCase()).toEqual(selectedOffering!.attributes!.name.toLowerCase());
			expect(configurationModalContents.find("#ProductOfferingConfigurationContainer").length).toEqual(1);

			configurationModalContents.find("form").simulate("submit");

			expect(initializeProductReplaceSpy).toHaveBeenCalledWith(
				individualId,
				subscription.agreementId,
				plansWithAlternateOfferings[0].id,
				selectedOffering!.id,
				selectedOffering!.attributes!.offeringType,
				characteristics
			);

			wrapper.update();
			const planChangeConfirmationModal = wrapper.find("PlanChangeConfirmationModal");

			expect(planChangeConfirmationModal.length).toEqual(1);

			const confirmationModalContents = getModalContents(planChangeConfirmationModal, context);

			const paymentButtons = confirmationModalContents.find("OcButton")
				.filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonPay"));

			paymentButtons.at(0).simulate("click");

			const selectedPaymentMethod = paymentButtons.at(0).prop("data-test-payment-method-id");

			expect(commitProductReplaceSpy).toHaveBeenCalledWith(contextualPaymentMethodsWithExtraInfo.basketId,
				contextualPaymentMethodsWithExtraInfo.contextualPaymentMethods.find((m: any) => m.id === selectedPaymentMethod)!.id
			);

			wrapper.instance().componentWillReceiveProps({
				paymentInfo,
				contextualPaymentMethodsWithExtraInfo
			});

			wrapper.update();
			const planChangeResultModal = wrapper.find("PlanChangeResultModal");

			expect(planChangeResultModal.length).toEqual(1);

			const planChangeResultModalContents = getModalContents(planChangeResultModal, context);
			expect(planChangeResultModalContents.text().toLowerCase()).toContain("Purchase successful".toLowerCase());

			wrapper.detach();
		});

		it("switches PlanListModal to PlanConfigurationModal when an alternate offering is chosen to configuration, skipping comparison", () => {
			const wrapper = attachWithContext(
				<Plans {...props} alternatePlans={alternateDataOfferings} />, { context });

			const plans = subscription.childProducts.filter(p => p.isPlan).concat(subscription);
			const plansWithAlternateOfferings = plans.filter(
				p => p.hasAlternateOfferings
			);

			wrapper.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonChangePlan")).at(0).simulate("click");

			wrapper.instance().showPlanList(plansWithAlternateOfferings[0]); // TODO: Product or ProductOffering?
			wrapper.update();
			const planListModal = wrapper.find("PlanListModal");
			const planListModalContents = getModalContents(planListModal, context);

			const interestingOffering = planListModalContents.find("OcAccordionList").at(0);

			interestingOffering.find("OcButton").filterWhere((n: ReactWrapper) => (n.prop("id") as string)
				.indexOf("buttonSelectAlternatePlan") >= 0).simulate("click");

			wrapper.instance().showPlanConfiguration(alternateDataOfferings[0]);
			wrapper.update();
			expect(wrapper.find("PlanConfigurationModal").length).toEqual(1);

			wrapper.detach();
		});
	});

	describe("RUBT-80707, Change main plan product", () => {
		const alternateMainPlanProductOfferings = [
			{
				id: "superb-plan",
				type: "productOfferings",
				productOfferingId: "superb-po",
				attributes: {
					specificationId: "superb-plan",
					specType: "PRODUCT",
					specSubType: "ADDITIONAL",
					instanceCharacteristics: {},
					priority: null,
					productOfferingGroups: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					productOfferings: [],
					name: "Postpaid SUPERB Plan",
					categories: [],
					offeringType: "productOfferings",
					inputCharacteristics: {
						icc: {
							values: [],
							description: "SIM card serial number",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "ICC",
							priority: null,
							valueRegulator: null,
							purpose: null,
							dataType: null,
							cardinality: {
								max: null,
								min: null
							},
							humanReadableId: null,
							hidden: false,
							maxValue: null,
							minValue: null,
							unitOfMeasure: null,
							validFor: {
								startDate: null,
								endDate: null
							}
						}
					},
					prices: [
						{
							type: "RECURRENT",
							name: null,
							chargedUnit: {
								amount: 1,
								currency: null,
								unitOfMeasure: "PIECES"
							},
							taxAmount: null,
							taxFreeAmount: 14.45,
							taxRate: 0,
							recurringChargePeriod: {
								count: 1,
								interval: "MONTH"
							},
							currency: "EUR",
							conditions: null,
							originalPrice: null
						},
						{
							type: "ONE_TIME",
							name: "Migration fee",
							currency: "EUR",
							taxFreeAmount: 3.0
						}
					]
				}
			},
			{
				id: "standard-po",
				type: "productOfferings",
				productOfferingId: "standard-po",
				attributes: {
					specificationId: "standard",
					specType: "PRODUCT",
					specSubType: "ADDITIONAL",
					instanceCharacteristics: {},
					priority: null,
					productOfferingGroups: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					productOfferings: [],
					name: "Standard BLV OTC NV",
					categories: [],
					inputCharacteristics: {},
					prices: [
						{
							type: "RECURRENT",
							name: null,
							chargedUnit: {
								amount: 1,
								currency: null,
								unitOfMeasure: "PIECES"
							},
							taxAmount: null,
							taxFreeAmount: 14.45,
							taxRate: 0,
							recurringChargePeriod: {
								count: 1,
								interval: "MONTH"
							},
							currency: "EUR",
							conditions: null,
							originalPrice: null
						},
						{
							type: "ONE_TIME",
							name: "Migration fee",
							currency: "EUR",
							taxFreeAmount: 3.0
						}
					]
				}
			},
			{
				id: "hybrid-po",
				type: "alternateProductOfferings",
				productOfferingId: "hybrid-po",
				attributes: {
					specificationId: "hybrid",
					specType: "PRODUCT",
					specSubType: "DATA",
					instanceCharacteristics: {},
					offeringType: "UPGRADE",
					priority: null,
					productOfferingGroups: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					productOfferings: [],
					name: "Hybrid BASIC Plan",
					categories: [],
					inputCharacteristics: {},
					prices: [
						{
							type: "RECURRENT",
							name: null,
							chargedUnit: {
								amount: 1,
								currency: null,
								unitOfMeasure: "PIECES"
							},
							taxAmount: null,
							taxFreeAmount: 19.95,
							taxRate: 0,
							recurringChargePeriod: {
								count: 1,
								interval: "MONTH"
							},
							currency: "EUR",
							conditions: null,
							originalPrice: null
						},
						{
							type: "ONE_TIME",
							name: "Migration fee",
							currency: "EUR",
							taxFreeAmount: 3.0
						}
					]
				}
			}
		] as any as Array<ProductOffering>;

		it("switches PlanListModal to PlanConfigurationModal when an alternate offering is chosen to configuration, skipping comparison", () => {
			const wrapper = attachWithContext(
				<Plans
					{...props}
					focusedProductId={subscription.productOfferingId}
					alternatePlans={alternateMainPlanProductOfferings}
				/>,
				{ context }
			);

			const plans = subscription.childProducts.filter(p => p.isPlan);
			const plansWithAlternateOfferings = plans.filter(
				p => p.hasAlternateOfferings
			);

			wrapper.find("#buttonChangePlan-juanita-agreement4-sub").hostNodes().simulate("click");

			wrapper.instance().showPlanList(plansWithAlternateOfferings[0]);
			wrapper.update();

			const planListModal = wrapper.find("PlanListModal");
			const planListModalContents = getModalContents(planListModal, context);

			const interestingOffering = planListModalContents.find("OcAccordionList").at(0);

			interestingOffering.find("OcButton").filterWhere((n: ReactWrapper) =>
					(n.prop("id") as string).startsWith("change-plan-buttonSelectAlternatePlan")).simulate("click");

			wrapper.instance().showPlanConfiguration(alternateMainPlanProductOfferings[0]);
			wrapper.update();

			const planConfigurationModal = wrapper.find("PlanConfigurationModal");
			expect(planConfigurationModal.length).toEqual(1);

			wrapper.detach();
		});

		it("goes through the Change plan flow when an alternate offering is chosen for comparison", () => {
			const individualId = "juanita";
			const initializeProductReplaceSpy = jest.fn();
			const commitProductReplaceSpy = jest.fn();
			const characteristics = {};

			const totalPrices = alternateMainPlanProductOfferings.find(o => o.id === "hybrid-po")!
				.attributes!.prices!.reduce((stack: any, elem) => {
					const { type } = elem;

					if (stack[type]) {
						stack[type].push(elem);
					} else {
						stack[type] = [elem];
					}

					return stack;
				}, {});

			const contextualPaymentMethodsWithExtraInfo = {
				basketItems: {
					id: "my-little-pink-basket",
					type: "basketItems",
					attributes: {}
				},
				contextualPaymentMethods: [
					{
						balance: 100,
						id: "balance",
						label: "Balance"
					}
				],
				characteristics,
				totalPrices,
				initializedBasket: {
					attributes: {
						upfrontPrices: true
					}
				}
			} as any as ContextualPaymentMethodsWithExtraInfo;

			const paymentInfo = {
				paymentCompletedCode: "balance-charged",
				paymentErrorCode: null,
				paymentCompleted: true
			} as any as PaymentInvocation;

			const wrapper = attachWithContext(
				<Plans
					{...props}
					individualId={individualId}
					focusedProductId={subscription.productOfferingId}
					alternatePlans={alternateMainPlanProductOfferings}
					contextualPaymentMethodsWithExtraInfo={contextualPaymentMethodsWithExtraInfo}
					paymentInfo={paymentInfo}
					actions={{
						...props.actions,
						setInputtedCharacteristic: () => {},
						commitProductReplace: commitProductReplaceSpy,
						initializeProductReplace: initializeProductReplaceSpy,
					}}
					configurations={{}}
				/>,
				{ context }
			);

			const plans = subscription.childProducts.filter(p => p.isPlan).concat(subscription);
			const plansWithAlternateOfferings = plans.filter(
				p => p.hasAlternateOfferings
			);

			/* click Change plan on a Plan */
			wrapper.find("OcButton").filterWhere((n: ReactWrapper) =>
				(n.prop("id") as string).startsWith("buttonChangePlan")).at(0).simulate("click");

			wrapper.instance().showPlanList(plansWithAlternateOfferings[1]);
			wrapper.update();

			const planListModal = wrapper.find("PlanListModal");
			const planListModalContents = getModalContents(planListModal, context);

			const interestingOffering = planListModalContents.find("OcAccordionList").at(0);

			interestingOffering.find("OcButton").filterWhere((n: ReactWrapper) =>
				(n.prop("id") as string).startsWith("change-plan-buttonSelectAlternatePlan")).simulate("click");

			const selectedOffering = alternateMainPlanProductOfferings[0];
			wrapper.instance().showPlanConfiguration(selectedOffering);
			wrapper.update();

			const planConfigurationModal = wrapper.find("PlanConfigurationModal");
			expect(planConfigurationModal.length).toEqual(1);

			const configurationModalContents = getModalContents(planConfigurationModal, context);

			expect(configurationModalContents.find("[data-test-name=\"selected-offering-name\"]").hostNodes()
				.text().toLowerCase()).toEqual(selectedOffering!.attributes!.name.toLowerCase());

			expect(configurationModalContents.find("#ProductOfferingConfigurationContainer").length).toEqual(1);

			configurationModalContents.find("form").simulate("submit");

			expect(initializeProductReplaceSpy).toHaveBeenCalledWith(
				individualId,
				subscription.agreementId,
				plansWithAlternateOfferings[1].id,
				selectedOffering.id,
				selectedOffering!.attributes!.offeringType,
				characteristics
			);
			wrapper.update();

			const planChangeConfirmationModal = wrapper.find("PlanChangeConfirmationModal");
			expect(planChangeConfirmationModal.length).toEqual(1);

			const confirmationModalContents = getModalContents(planChangeConfirmationModal, context);

			const paymentButtons = confirmationModalContents.find("OcButton").filterWhere(
				(n: ReactWrapper) => (n.prop("id") as string).startsWith("buttonPay"));

			paymentButtons.at(0).simulate("click");

			const selectedPaymentMethod = paymentButtons.at(0).prop("data-test-payment-method-id");

			expect(commitProductReplaceSpy).toHaveBeenCalledWith(
				contextualPaymentMethodsWithExtraInfo.basketId,
				contextualPaymentMethodsWithExtraInfo.contextualPaymentMethods.find((m: any) => m.id === selectedPaymentMethod)!.id);

			wrapper.instance().componentWillReceiveProps({
				paymentInfo,
				contextualPaymentMethodsWithExtraInfo
			});

			wrapper.update();
			const planChangeResultModal = wrapper.find("PlanChangeResultModal");
			expect(planChangeResultModal.length).toEqual(1);

			const planChangeResultModalContents = getModalContents(planChangeResultModal, context);
			expect(planChangeResultModalContents.text().toLowerCase()).toContain("Purchase successful".toLowerCase());

			wrapper.detach();
		});
	});
});
