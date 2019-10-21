import React from "react";
import toJson from "enzyme-to-json";

import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import POSOrderCompleted from "../src/checkout/POSOrderCompleted";

describe("POSOrderCompleted", () => {
	const minProps = {
		resetPaymentStore: () => {},
		resetConfigurations: () => {},
		createBasket: () => {},
		personId: "dummy-id",
		paymentStatus: "dummy-status",
		submittedBasket: {},
		submittedBasketItems: []
	};

	it("succeeds at shallow mount, without props", () => {
		const wrapper = shallowWithContext(<POSOrderCompleted {...minProps} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at full mount with minimal props", () => {
		mountWithContext(<POSOrderCompleted {...minProps} />);
	});

	it("renders multiple levels of children correct", () => {
		const props = {
			...minProps,
			getBasketIncludeBasketItems: basketId => {
				console.log(
					"MOCKED BasketActions.getBasketIncludeBasketItems(), basketId:",
					basketId
				);
			},
			submittedBasketItems: [
				{
					id: "886e5b5f-c98f-4e51-87ea-745640525725",
					type: "basketItems",
					attributes: {
						createdAt: "2017-08-29T08:27:20.733Z",
						lastModifiedAt: "2017-08-29T08:27:20.733Z",
						inputtedCharacteristics: {},
						product: {
							categories: [],
							commercialEnrichments: [],
							id: "accessory-bundle-po",
							inputCharacteristics: {},
							instanceCharacteristics: {},
							name: "A bundle of accessories",
							prices: [],
							productOfferingGroups: [],
							productOfferings: [
								{
									id: "earplug1-po",
									name: "ZenHajzer SuperCool 32",
									prices: [
										{
											chargedUnit: {
												amount: 1,
												unitOfMeasure: "PIECES"
											},
											currency: "EUR",
											taxFreeAmount: 39.95,
											type: "ONE_TIME",
											taxRate: 0
										}
									],
									productOfferingGroups: [],
									productOfferings: [],
									specificationId: "earplug1"
								},
								{
									id: "earplug2-po",
									name: "Filip XtremeBass",
									prices: [
										{
											chargedUnit: {
												amount: 1,
												unitOfMeasure: "PIECES"
											},
											currency: "EUR",
											taxFreeAmount: 19.95,
											type: "ONE_TIME",
											taxRate: 0
										}
									],
									productOfferingGroups: [],
									productOfferings: [],
									specificationId: "earplug2"
								}
							]
						},
						quantity: 1,
						targetAgreementId: null,
						totalPrices: [],
						unitPrices: [],
						childBasketItems: [
							{
								createdAt: "2017-08-29T08:27:20.733Z",
								id: "6819f5c5-8a9f-48a0-a1b7-bc5c55df4b7b",
								inputtedCharacteristics: {},
								lastModifiedAt: "2017-08-29T08:27:20.733Z",
								product: {
									id: "earplug1-po",
									name: "ZenHajzer SuperCool 32",
									prices: [
										{
											chargedUnit: {
												amount: 1,
												unitOfMeasure: "PIECES"
											},
											currency: "EUR",
											taxFreeAmount: 39.95,
											type: "ONE_TIME",
											taxRate: 0
										}
									],
									productOfferingGroups: [],
									productOfferings: [],
									specificationId: "earplug1"
								},
								quantity: 1,
								totalPrices: [
									{
										chargedUnit: {
											amount: 1,
											unitOfMeasure: "PIECES"
										},
										currency: "EUR",
										taxFreeAmount: 39.95,
										type: "ONE_TIME",
										taxRate: 0
									}
								],
								unitPrices: [
									{
										chargedUnit: {
											amount: 1,
											unitOfMeasure: "PIECES"
										},
										currency: "EUR",
										taxFreeAmount: 39.95,
										type: "ONE_TIME",
										taxRate: 0
									}
								],
								childBasketItems: [
									{
										createdAt: "2017-08-29T08:27:20.733Z",
										id:
											"99999999-8a9f-48a0-a1b7-bc5c55df4b7b",
										inputtedCharacteristics: {},
										lastModifiedAt:
											"2017-08-29T08:27:20.733Z",
										product: {
											id: "earplug3-po",
											name: "VARATULPAT",
											prices: [
												{
													chargedUnit: {
														amount: 1,
														unitOfMeasure: "PIECES"
													},
													currency: "EUR",
													taxFreeAmount: 4.95,
													type: "ONE_TIME",
													taxRate: 0
												}
											],
											productOfferingGroups: [],
											productOfferings: [],
											specificationId: "earplug3"
										},
										quantity: 1,
										totalPrices: [
											{
												chargedUnit: {
													amount: 1,
													unitOfMeasure: "PIECES"
												},
												currency: "EUR",
												taxFreeAmount: 4.95,
												type: "ONE_TIME",
												taxRate: 0
											}
										],
										unitPrices: [
											{
												chargedUnit: {
													amount: 1,
													unitOfMeasure: "PIECES"
												},
												currency: "EUR",
												taxFreeAmount: 4.95,
												type: "ONE_TIME",
												taxRate: 0
											}
										],
										childBasketItems: [
											{
												childBasketItems: [],
												createdAt:
													"2017-08-29T08:27:20.733Z",
												id:
													"66666666-8a9f-48a0-a1b7-bc5c55df4b7b",
												inputtedCharacteristics: {},
												lastModifiedAt:
													"2017-08-29T08:27:20.733Z",
												product: {
													id: "earplug4-po",
													name:
														"VARATULPPIENVARATULPAT",
													prices: [
														{
															chargedUnit: {
																amount: 1,
																unitOfMeasure:
																	"PIECES"
															},
															currency: "EUR",
															taxFreeAmount: 2.95,
															type: "ONE_TIME",
															taxRate: 0
														}
													],
													productOfferingGroups: [],
													productOfferings: [],
													specificationId: "earplug4"
												},
												quantity: 1,
												totalPrices: [
													{
														chargedUnit: {
															amount: 1,
															unitOfMeasure:
																"PIECES"
														},
														currency: "EUR",
														taxFreeAmount: 2.95,
														type: "ONE_TIME",
														taxRate: 0
													}
												],
												unitPrices: [
													{
														chargedUnit: {
															amount: 1,
															unitOfMeasure:
																"PIECES"
														},
														currency: "EUR",
														taxFreeAmount: 2.95,
														type: "ONE_TIME",
														taxRate: 0
													}
												]
											}
										]
									}
								]
							},
							{
								childBasketItems: [],
								createdAt: "2017-08-29T08:27:20.733Z",
								id: "30040b77-126c-4a69-aba3-94365996fd1e",
								inputtedCharacteristics: {},
								lastModifiedAt: "2017-08-29T08:27:20.733Z",
								product: {
									id: "earplug2-po",
									name: "Filip XtremeBass",
									prices: [
										{
											chargedUnit: {
												amount: 1,
												unitOfMeasure: "PIECES"
											},
											currency: "EUR",
											taxFreeAmount: 19.95,
											type: "ONE_TIME",
											taxRate: 0
										}
									],
									productOfferingGroups: [],
									productOfferings: [],
									specificationId: "earplug2"
								},
								quantity: 1,
								totalPrices: [
									{
										chargedUnit: {
											amount: 1,
											unitOfMeasure: "PIECES"
										},
										currency: "EUR",
										taxFreeAmount: 19.95,
										type: "ONE_TIME",
										taxRate: 0
									}
								],
								unitPrices: [
									{
										chargedUnit: {
											amount: 1,
											unitOfMeasure: "PIECES"
										},
										currency: "EUR",
										taxFreeAmount: 19.95,
										type: "ONE_TIME",
										taxRate: 0
									}
								]
							}
						]
					}
				}
			],
			submittedBasket: {
				id: "6a176368-1de4-4c9d-af93-17b386df4501",
				type: "baskets",
				attributes: {
					createdAt: "2017-08-29T08:27:17.686Z",
					referenceNumber: "338d568f-2c79-4e1e-aaf5-bf0dcc672cf1",
					lifecycleStatus: "OPEN"
				}
			},
			showPOSDeliveryModal: t => {
				console.log(
					"MOCKED POSCheckoutActions.showPOSDeliveryModal():",
					t
				);
			}
		};

		const wrapper = mountWithContext(<POSOrderCompleted {...props} />);

		const names = wrapper
			.find(".POSOrderCompleted-product-name")
			.map(n => n.text());

		expect(names).toHaveLength(5);
		expect(names[0]).toEqual("A bundle of accessories");
		expect(names[1]).toEqual("ZenHajzer SuperCool 32");
		expect(names[2]).toEqual("VARATULPAT");
		expect(names[3]).toEqual("VARATULPPIENVARATULPAT");
		expect(names[4]).toEqual("Filip XtremeBass");
	});
});
