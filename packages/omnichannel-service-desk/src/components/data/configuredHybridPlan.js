const hybridPlan = {
	id: "basic-hybrid-po",
	type: "contextualProducts",
	attributes: {
		specificationId: null,
		specType: null,
		instanceCharacteristics: {},
		priority: null,
		productOfferingGroups: [
			{
				cardinality: {
					max: 1,
					min: 1
				},
				commercialEnrichments: null,
				id: "msisdn-pog",
				name: "Choose your phone number",
				msisdnGroup: true,
				productOfferings: [
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "platinum-numbers-po",
						name: "Platinum numbers",
						inputCharacteristics: {
							number: {
								values: [],
								description: "phone number",
								source: null,
								subType: "MSISDN",
								mandatory: true,
								validation: null,
								name: "MSISDN",
								priority: null
							}
						},
						instanceCharacteristics: {
							"number-type": {
								values: [
									{
										value:
											"33333333-a00b-4e20-a9da-f0b69fb3e8b1|33333333aeea48f6906165e4c04d5515",
										name:
											"33333333-a00b-4e20-a9da-f0b69fb3e8b1|33333333aeea48f6906165e4c04d5515"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "number-type",
								priority: null
							},
							"lookup-href": {
								values: [
									{
										value:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"platinum-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
										name:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"platinum-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "MSISDN lookup hyperlink",
								priority: null
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
								taxFreeAmount: 7.99,
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
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "platinum-numbers-spec",
						specType: "RESOURCE",
						specSubType: "MSISDN",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null,
						selected: true
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "golden-numbers-po",
						name: "Golden numbers",
						inputCharacteristics: {
							number: {
								values: [],
								description: "phone number",
								source: null,
								subType: "MSISDN",
								mandatory: true,
								validation: null,
								name: "MSISDN",
								priority: null
							}
						},
						instanceCharacteristics: {
							"number-type": {
								values: [
									{
										value:
											"22222222-a00b-4e20-a9da-f0b69fb3e8b1|22222222aeea48f6906165e4c04d5515",
										name:
											"22222222-a00b-4e20-a9da-f0b69fb3e8b1|22222222aeea48f6906165e4c04d5515"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "number-type",
								priority: null
							},
							"lookup-href": {
								values: [
									{
										value:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"golden-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
										name:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"golden-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "MSISDN lookup hyperlink",
								priority: null
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "golden-numbers-spec",
						specType: "RESOURCE",
						specSubType: "MSISDN",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "regular-numbers-po",
						name: "Regular numbers",
						inputCharacteristics: {
							number: {
								values: [],
								description: "phone number",
								source: null,
								subType: "MSISDN",
								mandatory: true,
								validation: null,
								name: "MSISDN",
								priority: null
							}
						},
						instanceCharacteristics: {
							"number-type": {
								values: [
									{
										value:
											"11111111-a00b-4e20-a9da-f0b69fb3e8b1|11111111aeea48f6906165e4c04d5515",
										name:
											"11111111-a00b-4e20-a9da-f0b69fb3e8b1|11111111aeea48f6906165e4c04d5515"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "number-type",
								priority: null
							},
							"lookup-href": {
								values: [
									{
										value:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"sales-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
										name:
											'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"sales-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "MSISDN lookup hyperlink",
								priority: null
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "regular-numbers-spec",
						specType: "RESOURCE",
						specSubType: "MSISDN",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: null,
				commercialEnrichments: null,
				id: "addons-pog",
				name: "Choose additional services to your plan",
				msisdnGroup: false,
				productOfferings: [
					{
						categories: [],
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"When the bills are not paid, the owner customer can activate Dept Suspension service to prevent further issues. Debt suspension is activated by the Billing System automatically as part of the Debt collection process."
								},
								media: {},
								names: {
									"long-name":
										"Suspension due to unpaid debt",
									"short-name": "Dept Suspension"
								}
							}
						],
						featureCharacteristics: [],
						id: "debt-barring-po",
						name: "Debt suspension",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Actor: {
								values: [
									{
										value: "rbs",
										name: "Billing System"
									}
								],
								description:
									"Tells who can activate the service.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Actor",
								priority: null
							},
							barring: {
								values: [
									{
										value: "postpaid",
										name: "postpaid"
									}
								],
								description:
									"Tells what type of plan the service is compatible with.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring",
								priority: null
							},
							CH_ServiceType: {
								values: [
									{
										value: "all",
										name: "all"
									}
								],
								description:
									"This attribute probably points out which services this barring affects?",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Service type",
								priority: null
							},
							barringCategory: {
								values: [
									{
										value: "blocking",
										name: "blocking"
									}
								],
								description:
									"Tells what action is applied when service is active.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring category",
								priority: null
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
								taxFreeAmount: 0,
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
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "debt-barring",
						specType: "PRODUCT",
						specSubType: "BLOCKING",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "voicemail-po",
						name: "Voicemail",
						inputCharacteristics: {},
						instanceCharacteristics: {},
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
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "voicemail",
						specType: "PRODUCT",
						specSubType: "ADDITIONAL",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"Owner or User has the ability to suspend the use of the plan. This might come useful when your phone is lost or stolen and you want to prevent anyone to generate you an extensive bill."
								},
								media: {},
								names: {
									"long-name":
										"Suspension for all voice and data services, initiated by the Owner or User",
									"short-name": "Temporary Suspension"
								}
							}
						],
						featureCharacteristics: [],
						id: "temp-barring-po",
						name:
							"Temporary suspension - Customer initiated barring",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Actor: {
								values: [
									{
										value: "customer",
										name: "customer"
									}
								],
								description:
									"Tells who can activate the service.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Actor",
								priority: null
							},
							barring: {
								values: [
									{
										value: "voice",
										name: "voice"
									}
								],
								description:
									"Tells what type of plan the service is compatible with.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring",
								priority: null
							},
							CH_ServiceType: {
								values: [
									{
										value: "all",
										name: "all"
									}
								],
								description:
									"This attribute probably points out which services this barring affects?",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Service type",
								priority: null
							},
							barringCategory: {
								values: [
									{
										value: "blocking",
										name: "blocking"
									}
								],
								description:
									"Tells what action is applied when service is active.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring category",
								priority: null
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
								taxFreeAmount: 0,
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
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "temp-barring",
						specType: "PRODUCT",
						specSubType: "BLOCKING",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "fav-num-po",
						name: "Five favorite numbers",
						inputCharacteristics: {
							number3: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								source: null,
								subType: null,
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number",
								priority: null
							},
							number4: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								source: null,
								subType: null,
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number",
								priority: null
							},
							number1: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								source: null,
								subType: null,
								mandatory: true,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number",
								priority: null
							},
							number2: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								source: null,
								subType: null,
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number",
								priority: null
							},
							number5: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								source: null,
								subType: null,
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number",
								priority: null
							}
						},
						instanceCharacteristics: {},
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
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "fav-num",
						specType: "PRODUCT",
						specSubType: "ADDITIONAL",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "fixed-caller-id-po",
						name: "Fixed caller identifier",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "fixed-caller-id",
						specType: "PRODUCT",
						specSubType: "ADDITIONAL",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"When the Roaming Barring service is activated, no outgoing voice calls can be made while abroad. Incoming calls are as normal."
								},
								media: {},
								names: {
									"long-name":
										"Barred Voice Services While Abroad",
									"short-name": "Roaming Barring"
								}
							}
						],
						featureCharacteristics: [],
						id: "no-roaming-po",
						name: "No roaming - Customer initiated barring",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Actor: {
								values: [
									{
										value: "customer",
										name: "customer"
									},
									{
										value: "rbs",
										name: "Rating System"
									}
								],
								description:
									"Tells who can activate the service.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Actor",
								priority: null
							},
							barring: {
								values: [
									{
										value: "voice",
										name: "voice"
									}
								],
								description:
									"Tells what type of plan the service is compatible with.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring",
								priority: null
							},
							CH_ServiceType: {
								values: [
									{
										value: "roaming",
										name: "roaming"
									}
								],
								description:
									"This attribute probably points out which services this barring affects?",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Service type",
								priority: null
							},
							barringCategory: {
								values: [
									{
										value: "blocking",
										name: "blocking"
									}
								],
								description:
									"Tells what action is applied when service is active.",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Barring category",
								priority: null
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
								taxFreeAmount: 0,
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
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "no-roaming",
						specType: "PRODUCT",
						specSubType: "BLOCKING",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "reminder-po",
						name: "Invoice reminder",
						inputCharacteristics: {},
						instanceCharacteristics: {},
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
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "reminder",
						specType: "PRODUCT",
						specSubType: "ADDITIONAL",
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			}
		],
		commercialEnrichments: [
			{
				conditions: {},
				descriptions: {
					detailed:
						"This mobile plan is billed monthly and enable limited usage. Additional usage may be prepaid via mobile top-ups."
				},
				media: {},
				names: {
					"long-name":
						"Hybrid BASIC Plan with monthly invoices and additional prepaid usage",
					"short-name": "Hybrid BASIC Plan"
				}
			}
		],
		featureCharacteristics: [],
		specSubType: null,
		productOfferings: [
			{
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "data50-shared-po",
				name: "Data 50Mb/s",
				inputCharacteristics: {},
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
					},
					resourceSharingGroupId: {
						values: [
							{
								value: "shared-data50-msisdn",
								name: "shared-data50-msisdn"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Resource sharing group id",
						priority: null
					},
					resourceSelectionRule: {
						values: [
							{
								value: "shared",
								name: "shared"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Resource selection rule",
						priority: null
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
						taxFreeAmount: 4.95,
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
				priority: null,
				productOfferingGroups: [
					{
						cardinality: {
							max: 1,
							min: 1
						},
						commercialEnrichments: null,
						id: "msisdn-pog",
						name: "Choose your phone number",
						msisdnGroup: true,
						productOfferings: [
							{
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "platinum-numbers-po",
								name: "Platinum numbers",
								inputtedCharacteristics: {
									number: "0734444444"
								},
								inputCharacteristics: {
									number: {
										values: [],
										description: "phone number",
										source: null,
										subType: "MSISDN",
										mandatory: true,
										validation: null,
										name: "MSISDN",
										priority: null
									}
								},
								instanceCharacteristics: {
									"number-type": {
										values: [
											{
												value:
													"33333333-a00b-4e20-a9da-f0b69fb3e8b1|33333333aeea48f6906165e4c04d5515",
												name:
													"33333333-a00b-4e20-a9da-f0b69fb3e8b1|33333333aeea48f6906165e4c04d5515"
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "number-type",
										priority: null
									},
									"lookup-href": {
										values: [
											{
												value:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"platinum-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
												name:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"platinum-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "MSISDN lookup hyperlink",
										priority: null
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
										taxFreeAmount: 7.99,
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
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specificationId: "platinum-numbers-spec",
								specType: "RESOURCE",
								specSubType: "MSISDN",
								msisdns: null,
								bundlingProductOfferings: null,
								alternateProductOfferings: null,
								selected: true
							},
							{
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "golden-numbers-po",
								name: "Golden numbers",
								inputCharacteristics: {
									number: {
										values: [],
										description: "phone number",
										source: null,
										subType: "MSISDN",
										mandatory: true,
										validation: null,
										name: "MSISDN",
										priority: null
									}
								},
								instanceCharacteristics: {
									"number-type": {
										values: [
											{
												value:
													"22222222-a00b-4e20-a9da-f0b69fb3e8b1|22222222aeea48f6906165e4c04d5515",
												name:
													"22222222-a00b-4e20-a9da-f0b69fb3e8b1|22222222aeea48f6906165e4c04d5515"
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "number-type",
										priority: null
									},
									"lookup-href": {
										values: [
											{
												value:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"golden-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
												name:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"golden-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "MSISDN lookup hyperlink",
										priority: null
									}
								},
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specificationId: "golden-numbers-spec",
								specType: "RESOURCE",
								specSubType: "MSISDN",
								msisdns: null,
								bundlingProductOfferings: null,
								alternateProductOfferings: null
							},
							{
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "regular-numbers-po",
								name: "Regular numbers",
								inputCharacteristics: {
									number: {
										values: [],
										description: "phone number",
										source: null,
										subType: "MSISDN",
										mandatory: true,
										validation: null,
										name: "MSISDN",
										priority: null
									}
								},
								instanceCharacteristics: {
									"number-type": {
										values: [
											{
												value:
													"11111111-a00b-4e20-a9da-f0b69fb3e8b1|11111111aeea48f6906165e4c04d5515",
												name:
													"11111111-a00b-4e20-a9da-f0b69fb3e8b1|11111111aeea48f6906165e4c04d5515"
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "number-type",
										priority: null
									},
									"lookup-href": {
										values: [
											{
												value:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"sales-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))',
												name:
													'/api/msisdns?filter=(AND%20(EQ%20stock.id%20"sales-num-stock")%20(AND%20(EQ%20lifecycle-status%20"available")%20(EQ%20number-type%20"voice")))'
											}
										],
										description: null,
										source: null,
										subType: null,
										mandatory: true,
										validation: null,
										name: "MSISDN lookup hyperlink",
										priority: null
									}
								},
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specificationId: "regular-numbers-spec",
								specType: "RESOURCE",
								specSubType: "MSISDN",
								msisdns: null,
								bundlingProductOfferings: null,
								alternateProductOfferings: null
							}
						]
					}
				],
				productOfferings: [],
				specificationId: "data50-shared",
				specType: "SERVICE",
				specSubType: "DATA",
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "sim-po",
				name: "sim",
				inputCharacteristics: {
					"sim-type": {
						values: [
							{
								value: "micro",
								name: "micro"
							},
							{
								value: "nano",
								name: "nano"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Sim Type",
						priority: null
					},
					icc: {
						values: [],
						description: "SIM card serial number",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "ICC",
						priority: null
					}
				},
				instanceCharacteristics: {},
				prices: [],
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "sim",
				specType: "PRODUCT",
				specSubType: "SIM",
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null,
				inputtedCharacteristics: {
					"sim-type": "micro"
				}
			},
			{
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "voicesms-2-po",
				name: "Voice 1000min SMS 500pc package",
				inputCharacteristics: {},
				instanceCharacteristics: {
					voice: {
						values: [
							{
								value: "1000",
								name: "1000 minutes"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: null,
						priority: null
					},
					sms: {
						values: [
							{
								value: "500",
								name: "500 pieces"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: null,
						priority: null
					},
					"home-zone": {
						values: [
							{
								value: "Sweden",
								name: "sweden"
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
						taxFreeAmount: 15,
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
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "voicesms-2",
				specType: "PRODUCT",
				specSubType: "VOICE",
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			}
		],
		name: "Hybrid BASIC Plan",
		categories: [],
		inputCharacteristics: {},
		prices: []
	},
	relationships: {
		bundlingProductOfferings: {
			links: {
				self:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/relationships/bundlingProductOfferings",
				related:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/bundlingProductOfferings"
			}
		},
		msisdns: {
			links: {
				self:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/relationships/msisdns",
				related:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/msisdns"
			}
		},
		alternateProductOfferings: {
			links: {
				self:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/relationships/alternateProductOfferings",
				related:
					"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po/alternateProductOfferings"
			}
		}
	},
	links: {
		self:
			"http://52.19.87.245:8080/omnichannel-api/api/v0/contextualProducts/basic-hybrid-po"
	}
};

export default hybridPlan;
