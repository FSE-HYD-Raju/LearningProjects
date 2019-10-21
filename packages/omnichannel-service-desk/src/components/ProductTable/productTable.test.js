import React from "react";

// $FlowFixMe
import {
	ProductOfferingUtil,
	mountWithContext,
	shallowWithContext,
	TestUtils,
} from "omnichannel-common-pos";

import _ProductTable from "../../../src/components/ProductTable/ProductTable";
const ProductTable = _ProductTable.WrappedComponent;


const redux = TestUtils.mockReduxStore({
	comparison: {},
});

const context = {
	flux: {
		stores: {},
		actions: {}
	},
	store: redux,
};

describe("ProductTable", () => {
	const columns = [
		{
			label: "name",
			valueGetter: ProductOfferingUtil.getPOName,
			sortValueGetter: ProductOfferingUtil.getPONameForSort,
			component: null,
			flex: 2,
			type: "PRODUCT"
		},
		{
			label: "contains",
			valueGetter: ProductOfferingUtil.getPOContainedNames,
			sortValueGetter: ProductOfferingUtil.getPOContainedNamesForSort,
			component: null,
			flex: 2,
			type: "CONTAINEDPRODUCTS"
		},
		{
			label: "compare",
			flex: 0.5,
			type: "COMPARISON"
		},
		{
			label: "recurringPrice",
			flex: 0.75,
			valueGetter: ProductOfferingUtil.getRecurringPriceRange,
			sortValueGetter: ProductOfferingUtil.getRecurringPriceForSort,
			type: "PRICE-RANGE"
		},
		{
			label: "oneTimePrice",
			flex: 0.75,
			valueGetter: ProductOfferingUtil.getUpfrontPriceRange,
			sortValueGetter: ProductOfferingUtil.getUpfrontPriceForSort,
			type: "PRICE-RANGE"
		}
	];

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<ProductTable columns={[]} />, {
			context
		});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<ProductTable columns={[]} />, {
			context
		});
	});

	it("renders all columns", () => {
		const product = {
			id: "accessory-bundle-po",
			type: "contextualProducts",
			attributes: {
				commercialEnrichments: [
					{
						conditions: {},
						descriptions: {
							detailed:
								"Why settle for just one set of earphones, when you can have two?"
						},
						media: {},
						names: {
							"short-name": "An enriched bundle of accessories"
						}
					}
				],
				featureCharacteristics: [],
				specificationId: null,
				instanceCharacteristics: {},
				productOfferings: [
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "earplug1-po",
						name: "ZenHajzer SuperCool 32",
						inputCharacteristics: {},
						instanceCharacteristics: {
							"cable-length": {
								values: [
									{
										value: "1m",
										name: "1m"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Cable length",
								priority: null
							},
							brand: {
								values: [
									{
										value: "ZenHajzer",
										name: "ZenHajzer"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Brand",
								priority: null
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								name: null,
								chargedUnit: {
									amount: 1,
									currency: null,
									unitOfMeasure: "PIECES"
								},
								taxAmount: null,
								taxFreeAmount: 39.95,
								taxRate: 0,
								recurringChargePeriod: null,
								currency: "EUR",
								conditions: null,
								originalPrice: null
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "earplug1",
						msisdns: null,
						bundlingProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "earplug2-po",
						name: "Filip XtremeBass",
						inputCharacteristics: {},
						instanceCharacteristics: {
							"cable-length": {
								values: [
									{
										value: "1m",
										name: "1m"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: null,
								priority: null
							},
							color: {
								values: [
									{
										value: "silver",
										name: "silver"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: null,
								priority: null
							},
							brand: {
								values: [
									{
										value: "Filip",
										name: "Filip"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Brand",
								priority: null
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								name: null,
								chargedUnit: {
									amount: 1,
									currency: null,
									unitOfMeasure: "PIECES"
								},
								taxAmount: null,
								taxFreeAmount: 19.95,
								taxRate: 0,
								recurringChargePeriod: null,
								currency: "EUR",
								conditions: null,
								originalPrice: null
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "earplug2",
						msisdns: null,
						bundlingProductOfferings: null
					}
				],
				name: "A bundle of accessories",
				categories: [],
				inputCharacteristics: {},
				prices: [],
				priority: null,
				productOfferingGroups: []
			},
		};

		const wrapper = mountWithContext(
			<ProductTable
				category="device"
				columns={columns}
				items={[product]}
				configurations={{}}
				match={{ params: {} }}
			/>,
			{
				context
			}
		);

		// 1 table
		expect(wrapper.find(".ProductTable").length).toEqual(1);

		// 5 column headers
		expect(wrapper.find(".ProductTable-header-cell").length).toEqual(5);
	});

	describe("RUBT-65823", () => {
		const mobilePhone = {
			id: "oneminus-two-po",
			attributes: {
				name: "OneMinus Two",
				categories: ["device", "mobile-phone"],
				instanceCharacteristics: {}
			}
		};

		const accessory = {
			id: "earplug2-po",
			attributes: {
				name: "Filip XtremeBass",
				categories: ["device", "accessory"],
				instanceCharacteristics: {}
			}
		};

		it("tells ProductTableRow to render comparison column for a mobile device", () => {
			const wrapper = mountWithContext(
				<ProductTable
					category="device"
					columns={columns}
					items={[mobilePhone]}
					configurations={{}}
					match={{ params: {} }}
				/>,
				{
					context
				}
			);

			expect(wrapper.find("#ProductTableHeader-compare").length).toEqual(
				1
			);
		});

		/* Skipping for now (Sep 5 2017) as it was agreed the comparison modal should be presented regardless of product types -Jussi */
		it.skip(
			"tells ProductTableRow to not render comparison column for non-mobile device products",
			() => {
				const wrapper = mountWithContext(
					<ProductTable
						category="accessory"
						columns={columns}
						items={[accessory]}
						configurations={{}}
						match={{ params: {} }}
					/>,
					{
						context
					}
				);

				expect(
					wrapper.find("#ProductTableHeader-compare").length
				).toEqual(0);
			}
		);

		it("Override configuration values on nomination case", () => {
			const wrapper = mountWithContext(<ProductTable columns={[]} />, {
				context
			});
			const inst = wrapper.instance();
			const nominationSubscriptionInformation = {
				productOffering: {
					id: "plan-prepago-tigo-4g"
				},
				associatedWith: "1122334455"
			};
			const configurations = {
				PO_POS_Nomination: {
					id: "pos-nomination"
				}
			};
			const originalPo = {
				id: "PO_POS_Nomination"
			};
			const salesPersonId = "anders.a";
			const newProps = inst.handleNominationModifications(
				nominationSubscriptionInformation,
				configurations,
				originalPo,
				salesPersonId
			);

			expect(newProps.configurations["plan-prepago-tigo-4g"].id).toEqual(
				nominationSubscriptionInformation.productOffering.id
			);
			expect(newProps.product.id).toEqual(
				nominationSubscriptionInformation.productOffering.id
			);
			expect(newProps.salesContext["sales-person-id"]).toEqual(
				salesPersonId
			);
			expect(newProps.salesContext["dealer-id"]).toEqual(
				nominationSubscriptionInformation.associatedWith
			);
		});
	});
});
