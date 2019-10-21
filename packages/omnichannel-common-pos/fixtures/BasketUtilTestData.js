const basketTestData = {
	activeBasket: {
		id: "287bab0b-83e7-48cf-86a7-be2d8acc5b92",
		type: "baskets",
		attributes: {
			createdAt: "2018-04-23T11:42:44.129Z",
			upfrontPrices: true,
			deliveryContactMediumId: null,
			lastModifiedAt: null,
			lifecycleStatus: "OPEN",
			referenceNumber: "2c95bf40-2243-4d7b-85eb-f3f854a56352",
			created: null,
			totalPrices: [
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
					currency: "EUR"
				},
				{
					type: "ONE_TIME",
					name: null,
					chargedUnit: {
						amount: 1,
						currency: null,
						unitOfMeasure: "PIECES"
					},
					taxAmount: null,
					taxFreeAmount: 99.85,
					taxRate: 0,
					recurringChargePeriod: null,
					currency: "EUR"
				}
			],
			modified: null,
			billingAddress: null,
			expiresAt: null
		},
		relationships: {
			owner: {
				data: null,
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/owner",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/owner"
				}
			},
			eligiblePromotions: {
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/eligiblePromotions",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/eligiblePromotions"
				}
			},
			basketItems: {
				data: [
					{
						id: "679b8763-801c-492e-8a7b-de8858436ff4",
						type: "basketItems"
					},
					{
						id: "1ca175fc-fb12-4271-962d-161ca54307dc",
						type: "basketItems"
					}
				],
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/basketItems",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/basketItems"
				}
			},
			basketPaymentReceipts: {
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/basketPaymentReceipts",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/basketPaymentReceipts"
				}
			},
			selectedPromotions: {
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/selectedPromotions",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/selectedPromotions"
				}
			},
			payer: {
				data: null,
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/payer",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/payer"
				}
			},
			basketValidationInformations: {
				links: {
					self:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/relationships/basketValidationInformations",
					related:
						"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92/basketValidationInformations"
				}
			}
		},
		links: {
			self:
				"http://10.150.2.223:8080/omnichannel-api/api/v0/baskets/287bab0b-83e7-48cf-86a7-be2d8acc5b92"
		}
	}
};

const basketItemWithChildrenTestData = {
	id: "37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b",
	type: "basketItems",
	attributes: {
		basketProductId: "d3bfd9cb-e60f-49dc-98c9-d9bec3a3f92c",
		product: {
			id: "accessory-bundle-po",
			name: "A bundle of accessories",
			categories: [],
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
			inputCharacteristics: {},
			instanceCharacteristics: {},
			prices: [],
			priority: null,
			productOfferingGroups: [],
			productOfferings: [],
			specificationId: null,
			productId: null,
			specType: null,
			specSubType: null,
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null
		},
		quantity: 1,
		lastModifiedAt: "2018-07-16T07:12:04.086Z",
		inputtedCharacteristics: {},
		totalPrices: [],
		enhancedCharacteristics: {},
		childBasketItems: [
			{
				id: "cc1d0b17-61f0-4416-9ee2-771d1039d666",
				quantity: 1,
				inputtedCharacteristics: {},
				basketProductId: "e931c8dd-9200-47d0-ac27-17ae1b7c34cc",
				product: {
					id: "earplug1-po",
					name: "ZenHajzer SuperCool 32",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {
						"cable-length": {
							values: [
								{
									name: "1m",
									value: "1m"
								}
							],
							description: null,
							source: null,
							subType: null,
							mandatory: false,
							validation: null,
							name: "Cable length",
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
						},
						brand: {
							values: [
								{
									name: "ZenHajzer",
									value: "ZenHajzer"
								}
							],
							description: null,
							source: null,
							subType: null,
							mandatory: false,
							validation: null,
							name: "Brand",
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
					productId: "11111-6",
					specType: "PRODUCT",
					specSubType: "ACCESSORY",
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				},
				childBasketItems: [],
				createdAt: "2018-07-16T07:12:04.08Z",
				lastModifiedAt: "2018-07-16T07:12:04.08Z",
				unitPrices: [
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
						currency: "EUR"
					}
				],
				totalPrices: [
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
						currency: "EUR"
					}
				],
				originalUnitPrices: [],
				originalTotalPrices: [],
				enhancedCharacteristics: {}
			},
			{
				id: "7467dcd0-03c4-4c27-9cba-1d2c9f357b78",
				quantity: 1,
				inputtedCharacteristics: {},
				basketProductId: "71de37c3-063a-4889-a623-0d923c507e1b",
				product: {
					id: "earplug2-po",
					name: "Filip XtremeBass",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {
						"cable-length": {
							values: [
								{
									name: "1m",
									value: "1m"
								}
							],
							description: null,
							source: null,
							subType: null,
							mandatory: false,
							validation: null,
							name: null,
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
						},
						color: {
							values: [
								{
									name: "silver",
									value: "silver"
								}
							],
							description: null,
							source: null,
							subType: null,
							mandatory: false,
							validation: null,
							name: null,
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
						},
						brand: {
							values: [
								{
									name: "Filip",
									value: "Filip"
								}
							],
							description: null,
							source: null,
							subType: null,
							mandatory: false,
							validation: null,
							name: "Brand",
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
					productId: "11111-7",
					specType: "PRODUCT",
					specSubType: "ACCESSORY",
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				},
				childBasketItems: [],
				createdAt: "2018-07-16T07:12:04.086Z",
				lastModifiedAt: "2018-07-16T07:12:04.086Z",
				unitPrices: [
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
						currency: "EUR"
					}
				],
				totalPrices: [
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
						currency: "EUR"
					},
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
						currency: "EUR"
					}
				],
				originalUnitPrices: [],
				originalTotalPrices: [],
				enhancedCharacteristics: {}
			}
		],
		unitPrices: [],
		basketServiceId: null,
		reasonForAction: null,
		targetLifecycleStatus: null,
		createdAt: "2018-07-16T07:12:04.086Z",
		targetAgreementId: null,
		originalTotalPrices: [],
		action: null,
		originalUnitPrices: []
	},
	relationships: {
		basket: {
			data: {
				id: "15b2980c-146e-41fc-915d-882918badcad",
				type: "baskets"
			},
			links: {
				self:
					"http://omnichannel_monolith:8080/omnichannel-api/api/v0/basketItems/37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b/relationships/basket",
				related:
					"http://omnichannel_monolith:8080/omnichannel-api/api/v0/basketItems/37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b/basket"
			}
		},
		parentBasketItem: {
			data: null,
			links: {
				self:
					"http://omnichannel_monolith:8080/omnichannel-api/api/v0/basketItems/37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b/relationships/parentBasketItem",
				related:
					"http://omnichannel_monolith:8080/omnichannel-api/api/v0/basketItems/37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b/parentBasketItem"
			}
		}
	},
	links: {
		self:
			"http://omnichannel_monolith:8080/omnichannel-api/api/v0/basketItems/37b2d9f2-d4fb-4cd0-a1c7-dae30a26db6b"
	}
};

export { basketTestData, basketItemWithChildrenTestData };
