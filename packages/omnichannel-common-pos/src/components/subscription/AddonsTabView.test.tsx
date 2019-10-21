import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { mountWithContext, shallowWithContext, TestUtils } from "../../testUtils";

import { AddonsTabView, AddonsTabViewProps } from "./AddonsTabView";
import { Product } from "../../redux/types";
import { AddonsTabLifecycleFilter } from "./AddonsTabLifecycleFilter";

const storeContent = {
	productLoan: {loans: []},
	digitalLife: {
		agreements: []
	},
	sales: {
		activeAddons: [],
		availableAddons: [],
	},
	service: {
		callForwardingConfigurationErrors: undefined,
		callForwardingReasonCode: ""
	},
	lifecycle: {},
	feature: {}
};

const context = {
	flux: {
		stores: {
			UserStore: TestUtils.makeStore("context.flux.stores.UserStore", {
				user: { id: ""}
			}),
			SalesStore: TestUtils.makeActions("flux.stores.SalesStore", {
				products: [],
				availableAddons: [],
				addonsCategoryIds: ["additional", "commercial"]
			}),

		},
		actions: {
			ConsulStore: TestUtils.makeStore("flux.actions.ConsulStore"),
			SalesActions: TestUtils.makeStore("context.flux.actions.SalesActions", {
				getAlternateOfferingsForProduct: jest.fn(),
			}),
		}
	},
	store: TestUtils.mockReduxStore(storeContent)
};

describe("AddonsTabView", () => {
	const minProps: AddonsTabViewProps = {
		isServicePlanViewEligible: true,
		selectedProduct: {} as any as Product,
		agreementId: "",
		lifecycleFilter: AddonsTabLifecycleFilter.ALL
	};

	it("should succeed at shallow mount without props", () => {
		const wrapper = shallowWithContext(<AddonsTabView {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mountWithContext(<AddonsTabView {...minProps} />, { context });
	});

	it("should render items", () => {
		const currentContext = {
			...context
		};
		currentContext.store = TestUtils.mockReduxStore({
			...storeContent,
			productLoan: {loans: []},
			digitalLife: {
				agreements: []
			},
			sales: {
				activeAddons: [],
				availableAddons: [
					{
						id: "temp-barring-po",
						attributes: {
							name: "Temporary suspension",
							characteristics: {
								savedcharacteristic1: "savedvalue1",
								savedcharacteristic2: "savedvalue2"
							},
							commercialEnrichments: [
								{
									conditions: {},
									descriptions: {
										detailed: "Owner or User has the ability to suspend the use of the plan. This might come useful when your phone is " +
											"lost or stolen and you want to prevent anyone to generate you an extensive bill."
									},
									media: {},
									names: {
										"long-name":
											"Suspension for all voice and data services, initiated by the Owner or User",
										"short-name": "Temporary Suspension"
									}
								}
							],
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
									taxFreeAmount: 1.5,
									taxRate: 0,
									recurringChargePeriod: {
										count: 1,
										interval: "MONTH"
									},
									currency: "EUR",
									conditions: null,
									originalPrice: null
								}
							]
						}
					}
				],
			}
		});

		const props: AddonsTabViewProps = {
			...minProps,
			selectedProduct: {} as any as Product,
			lifecycleFilter: AddonsTabLifecycleFilter.ALL
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<AddonsTabView {...props} />
			</MemoryRouter>,
			{ context: currentContext });

		const addonsListWidget = wrapper.find("OcAccordion");
		expect(addonsListWidget.length).toEqual(1);

		const availableAddonListItem = addonsListWidget.find("#addon-item-temp-barring-po");

		expect(availableAddonListItem.hostNodes()).toHaveLength(1);

		const columns = availableAddonListItem.find(".AddonsTabView-list-item-column");
		expect(columns.length).toEqual(5);

		expect(columns.first().first().text()).toContain("Temporary suspension");

		expect(columns.at(3).first().text()).toContain("Available");

		expect(columns.at(4).first().text()).toContain("Activate");
	});

	it("should render active addon items from selected subscription product", () => {
		const activeAddons = [
			{
				id: "juanita-agreement1-addon-favnum",
				name: "Five favorite numbers",
				productOfferingId: "fav-num-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [],
				realizingServices: [],
				characteristics: {
					number1: "+358408838271",
					number2: "+358408838272",
					number5: "+358408838275",
					number4: "+358408838274",
					number3: "+358408838273"
				},
				specType: "PRODUCT",
				specSubType: "ADDITIONAL",
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
						taxFreeAmount: 4.5,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				],
				allowedTransitions: [
					{
						id: "reactivate",
						name: "reactivate",
						targetType: "product"
					},
					{
						id: "resume",
						name: "resume",
						targetType: "product"
					}
				],
				agreementId: "juanita-agreement1"
			}
		];
		const currentContext = {
			...context
		};
		currentContext.store = TestUtils.mockReduxStore({
			...storeContent,
			productLoan: {loans: []},
			digitalLife: { agreements: [] },
			sales: {
				activeAddons: [
					{instanceCharacteristics: {"product-id": {values: [{value: "juanita-agreement1-addon-favnum"}]}}}
				],
				availableAddons: [],
			}
		});

		const props: AddonsTabViewProps = {
			...minProps,
			selectedProduct: {
				childProducts: activeAddons
			} as any as Product
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<AddonsTabView {...props} />
			</MemoryRouter>,
			{ context: currentContext });

		const activeAddonListItem = wrapper.find("#addon-item-juanita-agreement1-addon-favnum");

		expect(activeAddonListItem.hostNodes()).toHaveLength(1);

		const columns = activeAddonListItem.find(".AddonsTabView-list-item-column");
		expect(columns.first().first().text()).toContain("Five favorite numbers");
		expect(columns.at(3).first().text()).toContain("Active");
	});

	it("should render active addon items when categoryId == \"additional\" and categoryId == \"commercial\"", () => {
		const activeAddons = [
			{
				id: "juanita-agreement1-addon-favnum",
				name: "Five favorite numbers",
				productOfferingId: "fav-num-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [],
				realizingServices: [],
				characteristics: {
					number1: "+358408838271",
					number2: "+358408838272",
					number5: "+358408838275",
					number4: "+358408838274",
					number3: "+358408838273"
				},
				specType: "PRODUCT",
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
						taxFreeAmount: 4.5,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				],
				allowedTransitions: [
					{
						id: "reactivate",
						name: "reactivate",
						targetType: "product"
					},
					{
						id: "resume",
						name: "resume",
						targetType: "product"
					}
				],
				categoriesIds: ["additional", "commercial"],
				agreementId: "juanita-agreement1"
			}
		];
		const currentContext = {
			...context
		};
		currentContext.store = TestUtils.mockReduxStore({
			...storeContent,
			productLoan: {loans: []},
			digitalLife: { agreements: [] },
			sales: {
				activeAddons: [
					{instanceCharacteristics: {"product-id": {values: [{value: "juanita-agreement1-addon-favnum"}]}}}
				],
				availableAddons: [],
				products: [],
				addonsCategoryIds: ["additional", "commercial"],
			}
		});

		const props: AddonsTabViewProps = {
			...minProps,
			selectedProduct: {
				childProducts: activeAddons
			} as any as Product
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<AddonsTabView {...props} />
			</MemoryRouter>,
			{ context: currentContext });

		const activeAddonListItem = wrapper.find("#addon-item-juanita-agreement1-addon-favnum");

		expect(activeAddonListItem.hostNodes()).toHaveLength(1);

		const columns = activeAddonListItem.find(".AddonsTabView-list-item-column");
		expect(columns.first().first().text()).toContain("Five favorite numbers");
		expect(columns.at(3).first().text()).toContain("Active");
	});

	it("should render expanded content if the active addon is is selected", () => {
		const activeAddons = [
			{
				id: "juanita-agreement1-addon-favnum",
				name: "Five favorite numbers",
				productOfferingId: "fav-num-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [],
				realizingServices: [],
				characteristics: {
					number1: "+358408838271",
					number2: "+358408838272",
					number5: "+358408838275",
					number4: "+358408838274",
					number3: "+358408838273"
				},
				specType: "PRODUCT",
				specSubType: "ADDITIONAL",
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
						taxFreeAmount: 4.5,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				],
				allowedTransitions: [
					{
						id: "reactivate",
						name: "reactivate",
						targetType: "product"
					},
					{
						id: "resume",
						name: "resume",
						targetType: "product"
					}
				],
				agreementId: "juanita-agreement1"
			}
		];
		const currentContext = {
			...context
		};
		currentContext.store = TestUtils.mockReduxStore({
			...storeContent,
			productLoan: {loans: []},
			digitalLife: { agreements: [] },
			sales: {
				activeAddons: [
					{instanceCharacteristics: {"product-id": {values: [{value: "juanita-agreement1-addon-favnum"}]}}}
				],
				availableAddons: [],
			},
		});

		const props: AddonsTabViewProps = {
			...minProps,
			selectedProduct: {
				childProducts: activeAddons
			} as any as Product
		};

		const wrapper = mountWithContext(
			<MemoryRouter>
				<AddonsTabView {...props} />
			</MemoryRouter>,
			{ context: currentContext });

		const expandedContent = wrapper.find("#addon-expanded-content-juanita-agreement1-addon-favnum");

		expect(expandedContent.hostNodes()).toHaveLength(1);
	});
});
