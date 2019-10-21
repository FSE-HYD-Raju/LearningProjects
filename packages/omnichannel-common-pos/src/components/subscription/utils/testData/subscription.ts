import { Product, Agreement } from "../../../../redux/types";

const subscription: Product = ({
	chargingBalances: [],
	id: "b1f6dfb0-3102-41a1-a50c-01ccd175de58",
	name: "Prepaid Subscription",
	productOfferingId: "PO_Base",
	lifeCycleStatus: "ACTIVE",
	usageCounters: [],
	realizingResources: [
		{
			primaryId: "393809017788",
			validFor: {
				startDate: "2018-11-07T10:52:01.401Z",
				endDate: null
			},
			lifeCycleStatus: "ACTIVE",
			type: "MSISDN",
			subType: null,
			specification: {
				name: "R_MSISDN",
				id: "R_MSISDN",
				specSubType: "MSISDN",
				specType: "RESOURCE",
				instanceCharacteristics: {},
				inputCharacteristics: {
					CH_Inventory_Id: {
						values: [],
						description: "Inventory ID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Inventory ID",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					},
					CH_Parent_ID: {
						values: [],
						description: "ParentProductID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Parent Product",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					}
				},
				featureCharacteristics: [
					{
						name: "CH_CustomerInventory",
						value: "CH_CustomerInventory",
						language: null,
						isDefault: null,
						validFor: null
					},
					{
						name: "CH_SOMSubscription",
						value: "CH_SOMSubscription",
						language: null,
						isDefault: null,
						validFor: null
					}
				]
			},
			characteristics: {
				CH_MSISDNType: "primary"
			},
			id: "421912d4-d0d6-46d8-86d8-ab5d2087dfa8"
		},
		{
			primaryId: "893580615119788",
			validFor: {
				startDate: "2018-11-07T10:52:01.401Z",
				endDate: null
			},
			lifeCycleStatus: "ACTIVE",
			type: "SIM",
			subType: "primary",
			specification: {
				name: "R_SIM",
				id: "R_SIM",
				specSubType: "SIM",
				specType: "RESOURCE",
				instanceCharacteristics: {},
				inputCharacteristics: {
					CH_Inventory_Id: {
						values: [],
						description: "Inventory ID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Inventory ID",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					},
					CH_Parent_ID: {
						values: [],
						description: "ParentProductID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Parent Product",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					}
				},
				featureCharacteristics: [
					{
						name: "CH_CustomerInventory",
						validFor: null
					},
					{
						name: "CH_SOMSubscription",
						validFor: null
					}
				]
			},
			characteristics: {
				imsi: "222881010018238"
			},
			id: "7478bf89-c5db-4024-81d4-6e75781b9a9e"
		}
	],
	realizingServices: [],
	characteristics: {
		CH_CustomerInventory: "true",
		CH_MTX_Sub_Cat_Item_ID: "16",
		CH_NumberResource: "393809017788",
		CH_PlanType: "prepaid",
		CH_SubscriptionType: "Wind Base",
		CH_T_SRV_ACTIONID: "IN",
		CH_T_SRV_BRAND: "Tre",
		CH_T_SRV_CHANNELID: "CONS",
		CH_T_SRV_CODPNTF: "LDS_NA",
		CH_T_SRV_EVENTSTATUS: "N",
		CH_T_SRV_FLAGRTG: "N",
		CH_T_SRV_MNPFLAG: "N",
		CH_T_SRV_ORIGINSYSID: "DIGSOL",
		CH_T_SRV_PAYMENTTYPE: "PRE",
		CH_T_SRV_SERVICECODE: "SRVC41",
		CH_T_SRV_TYPEID: "MOBILE",
		ProductForSubscription: "true"
	},
	commercialEnrichments: [
		{
			conditions: {},
			descriptions: {
				"short-description": "Prepaid Subscription",
				"long-description": "Prepaid Subscription"
			},
			media: {},
			names: {
				name: "Prepaid Subscription"
			},
			language: "eng"
		}
	],
	childProducts: [
		{
			chargingBalances: [
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@15@20181207000000@20190107000000",
					balanceId: "15@2018-12-07T00:00:00.000Z@2019-01-07T00:00:00.000Z",
					balanceType: "Roaming-Data-FairUsage",
					name: "Data Asset Month FAIR",
					validFor: {
						startDate: "2018-12-07T00:00:00Z",
						endDate: "3019-01-07T00:00:00Z"
					},
					value: 2147483648,
					billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
					productId: "5f2d2b79-156d-4938-8808-37c76a737e53",
					serviceId: null,
					currency: null,
					unitOfMeasure: "BYTES"
				},
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@14@20181207000000@20190107000000",
					balanceId: "14@2018-12-07T00:00:00.000Z@2019-01-07T00:00:00.000Z",
					balanceType: "National-Data",
					name: "Data Asset Month",
					validFor: {
						startDate: "2018-12-07T00:00:00Z",
						endDate: "3019-01-07T00:00:00Z"
					},
					value: 40000000000,
					billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
					productId: "5f2d2b79-156d-4938-8808-37c76a737e53",
					serviceId: null,
					currency: null,
					unitOfMeasure: "BYTES"
				},
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@17@20181207000000@20190107000000",
					balanceId: "17@2018-12-07T00:00:00.000Z@2019-01-07T00:00:00.000Z",
					balanceType: "Unknown",
					name: "Text Asset Month",
					validFor: {
						startDate: "2018-12-07T00:00:00Z",
						endDate: "3019-01-07T00:00:00Z"
					},
					value: 0,
					billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
					productId: "5f2d2b79-156d-4938-8808-37c76a737e53",
					serviceId: null,
					currency: null,
					unitOfMeasure: null
				},
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@13@20181207000000@20190107000000",
					balanceId: "13@2018-12-07T00:00:00.000Z@2019-01-07T00:00:00.000Z",
					balanceType: "National-Voice",
					name: "Voice Asset Month",
					validFor: {
						startDate: "2018-12-07T00:00:00Z",
						endDate: "3019-01-07T00:00:00Z"
					},
					value: 60000,
					billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
					productId: "5f2d2b79-156d-4938-8808-37c76a737e53",
					serviceId: null,
					currency: null,
					unitOfMeasure: "SECONDS"
				}
			],
			id: "5f2d2b79-156d-4938-8808-37c76a737e53",
			name: "Wind Young - Digital Edition",
			productOfferingId: "PO_YoungDigitalEdition",
			lifeCycleStatus: "ACTIVE",
			usageCounters: [
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@16@20181107000000@20181207000000",
					counterId: "16@2018-11-07T00:00:00.000Z@2018-12-07T00:00:00.000Z",
					name: "EXTRA SHAPING",
					value: 0,
					limits: [],
					validFor: {
						startDate: "2018-11-07T00:00:00Z",
						endDate: "2018-12-07T00:00:00Z"
					},
					unitOfMeasure: "BYTES",
					currency: "XFU",
					service: null,
					category: "Unknown"
				},
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@16@20181207000000@20190107000000",
					counterId: "16@2018-12-07T00:00:00.000Z@2019-01-07T00:00:00.000Z",
					name: "EXTRA SHAPING",
					value: 0,
					limits: [],
					validFor: {
						startDate: "2018-12-07T00:00:00Z",
						endDate: "3019-01-07T00:00:00Z"
					},
					unitOfMeasure: "BYTES",
					currency: "XFU",
					service: null,
					category: "Unknown"
				},
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@16@20190107000000@20190207000000",
					counterId: "16@2019-01-07T00:00:00.000Z@2019-02-07T00:00:00.000Z",
					name: "EXTRA SHAPING",
					value: 0,
					limits: [],
					validFor: {
						startDate: "2019-01-07T00:00:00Z",
						endDate: "3019-02-07T00:00:00Z"
					},
					unitOfMeasure: "BYTES",
					currency: "XFU",
					service: null,
					category: "Unknown"
				}
			],
			realizingResources: [],
			realizingServices: [],
			characteristics: {
				CH_Activation_Fee: "2",
				CH_AllowanceData: "40 GB",
				CH_AllowanceFairUsageData: "2 GB",
				CH_AllowanceVoice: "1000 minutes",
				CH_Bundle_Type: "hardbundle",
				CH_CustomerInventory: "true",
				CH_MTX_Sub_Cat_Item_ID: "157",
				CH_SMS_TemplateID_OK: "subscriber-activation"
			},
			commercialEnrichments: [
				{
					conditions: {},
					media: {},
					names: {
						name: "Wind Young - Digital Edition"
					},
					language: "eng"
				}
			],
			childProducts: [
				{
					chargingBalances: [
						{
							id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@19@20181212000000@20190112000000",
							balanceId: "19@2018-12-12T00:00:00.000Z@2019-01-12T00:00:00.000Z",
							balanceType: "International-Voice",
							name: "International Voice",
							validFor: {
								startDate: "2018-12-12T00:00:00Z",
								endDate: "3019-01-12T00:00:00Z"
							},
							value: 6000,
							billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
							productId: "6e0943d1-382d-42bd-9d3f-2a9adfa0d362",
							serviceId: null,
							currency: null,
							unitOfMeasure: "SECONDS"
						}
					],
					id: "6e0943d1-382d-42bd-9d3f-2a9adfa0d362",
					name: "International Plus",
					productOfferingId: "PO_Recurring_ITZ_PLUS_Add_On",
					lifeCycleStatus: "ACTIVE",
					usageCounters: [],
					realizingResources: [],
					realizingServices: [],
					characteristics: {
						CH_AllowanceInternationalVoice: "100",
						CH_CustomerInventory: "true",
						CH_MTX_Sub_Cat_Item_ID: "162",
						CH_Parent_ID: "5f2d2b79-156d-4938-8808-37c76a737e53",
						CH_SMS_TemplateID_OK: "addon_internationalcalls"
					},
					commercialEnrichments: [
						{
							conditions: {},
							media: {},
							names: {
								name: "International Plus"
							},
							language: "eng"
						}
					],
					childProducts: [],
					categories: ["additional", "commercial", "Voice", "International", "Commercial_Offer", "wind", "Additional_Recurring"],
					categoriesIds: ["additional", "commercial", "Voice", "International", "Commercial_Offer", "wind", "Additional_Recurring"],
					parentProducts: ["5f2d2b79-156d-4938-8808-37c76a737e53"],
					specType: "PRODUCT",
					specSubType: "DATA",
					user: null,
					owner: null,
					payer: null,
					validFor: {
						startDate: "2018-11-12T10:16:13.639Z",
						endDate: null
					},
					prices: [
						{
							type: "RECURRENT",
							name: null,
							chargedUnit: {
								amount: 2,
								currency: "EUR",
								unitOfMeasure: "MONETARY"
							},
							taxAmount: null,
							taxFreeAmount: 2,
							taxIncludedAmount: null,
							taxRate: null,
							recurringChargePeriod: {
								count: 1,
								interval: "MONTH"
							},
							currency: "EUR",
							isUpfront: true,
							commercialEnrichment: null,
							conditions: null,
							originalPrice: null
						}
					],
					simCards: null,
					billingAccountIds: [],
					allowedTransitions: [],
					agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
					instanceCharacteristics: {
						CH_AllowanceInternationalVoice: {
							values: [
								{
									name: "100",
									value: "100",
									language: null,
									isDefault: null,
									validFor: null
								}
							],
							description: "International Voice Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
							source: "System",
							subType: null,
							mandatory: true,
							validation: null,
							name: "International Voice Allowance Included",
							priority: null,
							valueRegulator: null,
							purpose: null,
							dataType: "STRING",
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
						CH_SMS_TemplateID_OK: {
							values: [
								{
									name: "addon_internationalcalls",
									value: "addon_internationalcalls",
									language: null,
									isDefault: null,
									validFor: null
								}
							],
							description: "CH_SMS_TemplateID_OK",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "CH_SMS_TemplateID_OK",
							priority: null,
							valueRegulator: null,
							purpose: null,
							dataType: "STRING",
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
					allowances: [
						{
							unitOfMeasure: "MINUTES",
							value: 100,
							interval: {
								count: 1,
								interval: "MONTH"
							},
							externalId: "100 mins International calls",
							group: "Voice",
							destination: ["International-Voice"],
							commercialEnrichments: []
						}
					],
					enhancedCharacteristics: {},
					isPlan: false,
					hasAlternateOfferings: false
				}
			],
			categories: [
				"FairUsageData",
				"Roaming",
				"commercial",
				"Voice",
				"prepaid",
				"prepaid-plan",
				"Commercial_Offer",
				"wind",
				"National",
				"Offers_Under_61",
				"Data",
				"plan",
				"Plan"
			],
			categoriesIds: [
				"FairUsageData",
				"Roaming",
				"commercial",
				"Voice",
				"prepaid",
				"prepaid-plan",
				"Commercial_Offer",
				"wind",
				"National",
				"Offers_Under_61",
				"Data",
				"plan",
				"Plan"
			],
			parentProducts: ["b1f6dfb0-3102-41a1-a50c-01ccd175de58"],
			specType: "PRODUCT",
			specSubType: "MOBILE",
			user: null,
			owner: null,
			payer: null,
			validFor: {
				startDate: "2018-11-07T10:52:01.401Z",
				endDate: null
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 6.9,
						currency: "EUR",
						unitOfMeasure: "MONETARY"
					},
					taxAmount: 0,
					taxFreeAmount: 6.9,
					taxIncludedAmount: 6.9,
					taxRate: 0,
					recurringChargePeriod: {
						count: 1,
						interval: "MONTH"
					},
					currency: "EUR",
					isUpfront: true,
					commercialEnrichment: null,
					conditions: null,
					originalPrice: null
				},
				{
					type: "ONE_TIME",
					name: null,
					chargedUnit: {
						amount: -19,
						currency: "EUR",
						unitOfMeasure: "MONETARY"
					},
					taxAmount: 0,
					taxFreeAmount: -19,
					taxIncludedAmount: -19,
					taxRate: 0,
					recurringChargePeriod: null,
					currency: "EUR",
					isUpfront: true,
					commercialEnrichment: null,
					conditions: null,
					originalPrice: null
				},
				{
					type: "ONE_TIME",
					name: null,
					chargedUnit: {
						amount: 19,
						currency: "EUR",
						unitOfMeasure: "MONETARY"
					},
					taxAmount: 0,
					taxFreeAmount: 19,
					taxIncludedAmount: 19,
					taxRate: 0,
					recurringChargePeriod: null,
					currency: "EUR",
					isUpfront: true,
					commercialEnrichment: null,
					conditions: null,
					originalPrice: null
				}
			],
			simCards: null,
			billingAccountIds: [],
			allowedTransitions: [],
			agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
			instanceCharacteristics: {
				CH_AllowanceFairUsageData: {
					values: [
						{
							name: "4.5 GB",
							value: "4.5 GB",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Fair Usage Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					source: "System",
					subType: null,
					mandatory: true,
					validation: null,
					name: "Fair Usage Data Allowance Included",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_AllowanceData: {
					values: [
						{
							name: "40 GB",
							value: "40 GB",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					source: "System",
					subType: null,
					mandatory: true,
					validation: null,
					name: "Data Allowance Included",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				T_DEFAULT_VOICE_PO: {
					values: [
						{
							name: "PO_Voice_YDE_HB_1000_wind",
							value: "PO_Voice_YDE_HB_1000_wind",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Allowance product which should be selected as the default child for Voice allowance for Soft Bundle product",
					source: "System",
					subType: "Internal",
					mandatory: false,
					validation: null,
					name: "T_DEFAULT_VOICE_PO",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_SMS_TemplateID_OK: {
					values: [
						{
							name: "option-activation",
							value: "option-activation",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "CH_SMS_TemplateID_OK",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "CH_SMS_TemplateID_OK",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				T_DEFAULT_DATA_PO: {
					values: [
						{
							name: "PO_Data_YDE_HB_30_wind",
							value: "PO_Data_YDE_HB_30_wind",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Allowance product which should be selected as the default child for Data allowance for Soft Bundle product",
					source: "System",
					subType: "Internal",
					mandatory: false,
					validation: null,
					name: "T_DEFAULT_DATA_PO",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_RenewalPeriod: {
					values: [],
					description: "Renewal Period",
					source: "System",
					subType: null,
					mandatory: true,
					validation: null,
					name: "Renewal Period",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_IGP_NewLine: {
					values: [
						{
							name: "PO_YoungDigitalEdition",
							value: "PO_YoungDigitalEdition",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "CH_IGP_NewLine",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "CH_IGP_NewLine",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_AllowanceVoice: {
					values: [
						{
							name: "1000 minutes",
							value: "1000 minutes",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					source: "System",
					subType: null,
					mandatory: true,
					validation: null,
					name: "Voice Allowance Included",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_Bundle_Type: {
					values: [
						{
							name: "hardbundle",
							value: "hardbundle",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "CH_Bundle_Type",
					source: "System",
					subType: null,
					mandatory: true,
					validation: null,
					name: "CH_Bundle_Type",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				T_ALLOWANCE_FORM_TYPE: {
					values: [
						{
							name: "GRP_YDE_HB_Voice_Package,GRP_YDE_HB_Data_Package",
							value: "GRP_YDE_HB_Voice_Package,GRP_YDE_HB_Data_Package",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "T_ALLOWANCE_FORM_TYPE",
					source: "System",
					subType: "Internal",
					mandatory: true,
					validation: null,
					name: "T_ALLOWANCE_FORM_TYPE",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
			allowances: [
				{
					unitOfMeasure: "GIGABYTES",
					value: 40,
					interval: {
						count: 1,
						interval: "MONTH"
					},
					externalId: "40GB Data",
					group: "Data",
					destination: ["National-Data"],
					commercialEnrichments: []
				},
				{
					unitOfMeasure: "GIGABYTES",
					value: 4.5,
					interval: {
						count: 1,
						interval: "MONTH"
					},
					externalId: "4.5 GB Fair Usage Data EU Roaming",
					group: "Data",
					destination: ["Roaming-Data-FairUsage"],
					commercialEnrichments: []
				},
				{
					unitOfMeasure: "MINUTES",
					value: 1000,
					interval: {
						count: 1,
						interval: "MONTH"
					},
					externalId: "1000 Domestic and EU voice mins",
					group: "Voice",
					destination: ["National-Voice"],
					commercialEnrichments: []
				}
			],
			enhancedCharacteristics: {},
			isPlan: true,
			hasAlternateOfferings: false
		},
		{
			chargingBalances: [],
			id: "4ec3bc05-a421-49eb-bb89-d5c5712b7791",
			name: "Marketing Consent and Permissions",
			productOfferingId: "PO_MCP",
			lifeCycleStatus: "ACTIVE",
			usageCounters: [],
			realizingResources: [],
			realizingServices: [],
			characteristics: {
				CH_CustomerInventory: "true",
				CH_MCP_3rd_Party_Enrichment: "false",
				CH_MCP_3rd_Party_Marketing: "true",
				CH_MCP_3rd_Party_Transfer: "true",
				CH_MCP_Geo_Localization: "false",
				CH_MCP_Own_Marketing: "true",
				CH_MCP_Profiling: "false"
			},
			commercialEnrichments: [
				{
					conditions: {},
					descriptions: {
						"short-description": "Marketing Consent and Permissions",
						"long-description": "Marketing Consent and Permissions"
					},
					media: {},
					names: {
						name: "Marketing Consent and Permissions"
					},
					language: "eng"
				}
			],
			childProducts: [],
			categories: ["technical"],
			categoriesIds: ["technical"],
			parentProducts: ["b1f6dfb0-3102-41a1-a50c-01ccd175de58"],
			specType: "PRODUCT",
			specSubType: "SERVICE",
			user: null,
			owner: null,
			payer: null,
			validFor: {
				startDate: "2018-11-07T10:52:01.401Z",
				endDate: null
			},
			prices: [],
			simCards: null,
			billingAccountIds: [],
			allowedTransitions: [],
			agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
			instanceCharacteristics: {
				T_FORM_NAME: {
					values: [
						{
							name: "MARKETING_CONSENT",
							value: "MARKETING_CONSENT",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Form which should be used to present the fields associated with this product.",
					source: "System",
					subType: "Internal",
					mandatory: false,
					validation: null,
					name: "T_FORM_NAME",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
			allowances: [],
			enhancedCharacteristics: {},
			isPlan: false,
			hasAlternateOfferings: false
		},
		{
			chargingBalances: [
				{
					id: "S@51487076-90fd-4ebe-88cc-28856eb10be3@11@20181218000000@20181219000000",
					balanceId: "11@2018-12-18T00:00:00.000Z@2018-12-19T00:00:00.000Z",
					balanceType: "Unknown",
					name: "Daily  Data Asset",
					validFor: {
						startDate: "2018-12-18T00:00:00Z",
						endDate: "2018-12-19T00:00:00Z"
					},
					value: 0,
					billingAccountId: "5d38d746-0b70-439d-9c06-a7efcdc9bfc1",
					productId: "98efe80b-6680-4867-938f-25c50be63e46",
					serviceId: null,
					currency: null,
					unitOfMeasure: "BYTES"
				}
			],
			id: "98efe80b-6680-4867-938f-25c50be63e46",
			name: "Wind Basic",
			productOfferingId: "PO_Wind_Basic",
			lifeCycleStatus: "ACTIVE",
			usageCounters: [],
			realizingResources: [],
			realizingServices: [],
			characteristics: {
				CH_CustomerInventory: "true",
				CH_MTX_Sub_Cat_Item_ID: "165",
				CH_NumberResource: "393809017788",
				CH_PlanType: "prepaid",
				CH_SubscriptionType: "Wind Base",
				CH_T_SRV_ACTIONID: "IN",
				CH_T_SRV_BRAND: "Tre",
				CH_T_SRV_CHANNELID: "CONS",
				CH_T_SRV_CODPNTF: "LDS_NA",
				CH_T_SRV_EVENTSTATUS: "N",
				CH_T_SRV_FLAGRTG: "N",
				CH_T_SRV_MNPFLAG: "N",
				CH_T_SRV_ORIGINSYSID: "DIGSOL",
				CH_T_SRV_PAYMENTTYPE: "PRE",
				CH_T_SRV_SERVICECODE: "SRVC41",
				CH_T_SRV_TYPEID: "MOBILE"
			},
			commercialEnrichments: [
				{
					conditions: {},
					descriptions: {
						"short-description": "Tariff plan Wind Basic",
						"long-description": "Tariff plan Wind Basic"
					},
					media: {},
					names: {
						name: "Wind Basic"
					},
					language: "eng"
				}
			],
			childProducts: [],
			categories: [],
			categoriesIds: [],
			parentProducts: ["b1f6dfb0-3102-41a1-a50c-01ccd175de58"],
			specType: "PRODUCT",
			specSubType: "SERVICE",
			user: null,
			owner: null,
			payer: null,
			validFor: {
				startDate: "2018-11-07T10:52:01.401Z",
				endDate: null
			},
			prices: [],
			simCards: null,
			billingAccountIds: [],
			allowedTransitions: [],
			agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
			instanceCharacteristics: {},
			allowances: [],
			enhancedCharacteristics: {},
			isPlan: false,
			hasAlternateOfferings: false
		},
		{
			chargingBalances: [],
			id: "2c2a53c0-e0e5-45d6-b0d8-e03b906ec235",
			name: "Recurring Weekly Top-Up",
			productOfferingId: "PO_MVP_Time_Weekly_TopUp",
			lifeCycleStatus: "ACTIVE",
			usageCounters: [],
			realizingResources: [],
			realizingServices: [
				{
					id: "474b3abc-ff25-45d2-91c8-d3cea507cc1b",
					primaryId: "1544694523071",
					validFor: {
						startDate: "2018-12-13T09:48:43.055Z",
						endDate: null
					},
					lifeCycleStatus: "ACTIVE",
					type: "CFS_MVP_Time_TopUp",
					specification: {
						name: "CFS_MVP_Time_TopUp",
						id: "CFS_MVP_Time_TopUp",
						specSubType: "DATA",
						specType: "SERVICE",
						instanceCharacteristics: {},
						inputCharacteristics: {},
						featureCharacteristics: []
					},
					allowedTransitions: [],
					characteristics: {
						CH_CustomerInventory: "true",
						CH_MTX_Sub_Cat_Item_ID: "140",
						CH_Parent_ID: "b1f6dfb0-3102-41a1-a50c-01ccd175de58",
						CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
						CH_Time_Interval: "week",
						CH_Time_Interval_Count: "1",
						CH_TopUp_Amount: "1",
						CH_TopUp_Type: "Time",
						T_FORM_NAME: "TOPUP_TIME_WEEK",
						T_Payment_Method_Relation: "Y"
					},
					instanceCharacteristics: {}
				}
			],
			characteristics: {
				CH_CustomerInventory: "true",
				CH_MTX_Sub_Cat_Item_ID: "140",
				CH_Parent_ID: "b1f6dfb0-3102-41a1-a50c-01ccd175de58",
				CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
				CH_Time_Interval: "week",
				CH_Time_Interval_Count: "1",
				CH_TopUp_Amount: "1",
				CH_TopUp_Type: "Time",
				T_FORM_NAME: "TOPUP_TIME_WEEK",
				T_Payment_Method_Relation: "Y"
			},
			commercialEnrichments: [
				{
					conditions: {},
					descriptions: {
						"short-description": "Time specific Weekly Top-Up",
						"long-description": "Time specific Weekly Top-Up"
					},
					media: {},
					names: {
						name: "Recurring Weekly Top-Up"
					},
					language: "eng"
				}
			],
			childProducts: [],
			categories: ["time-based-auto-recharge", "technical", "recurring_topup"],
			categoriesIds: ["time-based-auto-recharge", "technical", "recurring_topup"],
			parentProducts: ["b1f6dfb0-3102-41a1-a50c-01ccd175de58"],
			specType: "PRODUCT",
			specSubType: "DATA",
			user: null,
			owner: null,
			payer: null,
			validFor: {
				startDate: "2018-12-13T09:48:43.055Z",
				endDate: null
			},
			prices: [],
			simCards: null,
			billingAccountIds: [],
			allowedTransitions: [],
			agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
			instanceCharacteristics: {
				CH_Time_Interval_Count: {
					values: [
						{
							name: "1",
							value: "1",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Tells how many repetitions of the interval make a cycle",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "Interval Count",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "INTEGER",
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
				T_FORM_NAME: {
					values: [
						{
							name: "TOPUP_TIME_WEEK",
							value: "TOPUP_TIME_WEEK",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "Form which should be used to present the fields associated with this product.",
					source: "System",
					subType: "Internal",
					mandatory: false,
					validation: null,
					name: "T_FORM_NAME",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_Time_Interval: {
					values: [
						{
							name: "week",
							value: "week",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "CH_Time_Interval",
					source: "System",
					subType: null,
					mandatory: false,
					validation: null,
					name: "CH_Time_Interval",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
				CH_SMS_TemplateID_OK: {
					values: [
						{
							name: "cons-auto-recur-topup-activation",
							value: "cons-auto-recur-topup-activation",
							language: null,
							isDefault: null,
							validFor: null
						}
					],
					description: "CH_SMS_TemplateID_OK",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "CH_SMS_TemplateID_OK",
					priority: null,
					valueRegulator: null,
					purpose: null,
					dataType: "STRING",
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
			allowances: [],
			enhancedCharacteristics: {},
			isPlan: false,
			hasAlternateOfferings: false
		}
	],
	categories: ["voice", "prepaid", "CSRTOOLBOX", "prepaid-plan", "resMobPrePlan", "wind", "CSR-Toolbox", "base-subscription"],
	categoriesIds: ["voice", "prepaid", "CSRTOOLBOX", "prepaid-plan", "resMobPrePlan", "wind", "CSR-Toolbox", "base-subscription"],
	parentProducts: [],
	specType: "PRODUCT",
	specSubType: "SUBSCRIPTION",
	user: {
		id: "6ef5ae83-24c9-4fd4-8121-09d7ec1423fa",
		displayName: "Rajesh09"
	},
	owner: null,
	payer: {
		id: "6ef5ae83-24c9-4fd4-8121-09d7ec1423fa",
		displayName: "Rajesh09"
	},
	validFor: {
		startDate: "2018-11-07T10:52:01.401Z",
		endDate: null
	},
	prices: [],
	simCards: [
		{
			primaryId: "893580615119788",
			validFor: {
				startDate: "2018-08-21T06:55:04.509Z",
				endDate: null
			},
			lifeCycleStatus: "ACTIVE",
			type: "SIM",
			subType: "primary",
			specification: {
				name: "R_SIM",
				id: "R_SIM",
				specSubType: "SIM",
				specType: "RESOURCE",
				instanceCharacteristics: {},
				inputCharacteristics: {
					CH_Inventory_Id: {
						values: [],
						description: "Inventory ID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Inventory ID",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					},
					CH_Parent_ID: {
						values: [],
						description: "ParentProductID",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "Parent Product",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: {
							max: null,
							min: null
						},
						humanReadableId: null,
						hidden: true,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: {
							startDate: null,
							endDate: null
						}
					}
				},
				featureCharacteristics: [
					{
						name: "CH_CustomerInventory",
						value: "CH_CustomerInventory",
						language: null,
						isDefault: null,
						validFor: null
					},
					{
						name: "CH_SOMSubscription",
						value: "CH_SOMSubscription",
						language: null,
						isDefault: null,
						validFor: null
					}
				]
			},
			characteristics: {
				imsi: "222881010018238"
			},
			id: "893580615119788",
			simType: "Trio",
			sku: null,
			icc: "893580615119788",
			imsi: "222881010018238",
			pin1: "1234",
			pin2: "1234",
			puk1: "75689962",
			puk2: "23448830",
			simStatus: "in-use",
			reservedFor: null,
			associatedWith: null,
			ownedBy: "",
			simTechnology: null,
			msisdn: null
		}
	],
	billingAccountIds: ["5d38d746-0b70-439d-9c06-a7efcdc9bfc1"],
	allowedTransitions: [],
	agreementId: "51487076-90fd-4ebe-88cc-28856eb10be3",
	instanceCharacteristics: {
		CH_T_SRV_FLAGRTG: {
			values: [
				{
					name: "N",
					value: "N",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_FLAGRTG",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_FLAGRTG",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_CHANNELID: {
			values: [
				{
					name: "CONS",
					value: "CONS",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_CHANNELID",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_CHANNELID",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_ORIGINSYSID: {
			values: [
				{
					name: "DIGSOL",
					value: "DIGSOL",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_ORIGINSYSID",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_ORIGINSYSID",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_TYPEID: {
			values: [
				{
					name: "MOBILE",
					value: "MOBILE",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_TYPEID",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_TYPEID",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_PAYMENTTYPE: {
			values: [
				{
					name: "PRE",
					value: "PRE",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_PAYMENTTYPE",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_PAYMENTTYPE",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_EVENTSTATUS: {
			values: [
				{
					name: "N",
					value: "N",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_EVENTSTATUS",
			source: null,
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_EVENTSTATUS",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_BRAND: {
			values: [
				{
					name: "wind",
					value: "wind",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_BRAND",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_BRAND",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_CODPNTF: {
			values: [
				{
					name: "LDS_NA",
					value: "LDS_NA",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_CODPNTF",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_CODPNTF",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_NumberResource_Type: {
			values: [],
			description: "NumberResource_Type",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_NumberResource_Type",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_MNPFLAG: {
			values: [
				{
					name: "N",
					value: "N",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_MNPFLAG",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_MNPFLAG",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_ACTIONID: {
			values: [
				{
					name: "IN",
					value: "IN",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_ACTIONID",
			source: null,
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_ACTIONID",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_T_SRV_SERVICECODE: {
			values: [
				{
					name: "SRVC41",
					value: "SRVC41",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "CH_T_SRV_SERVICECODE",
			source: "Order System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "CH_T_SRV_SERVICECODE",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_SubscriptionType: {
			values: [
				{
					name: "Wind Base",
					value: "Wind Base",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "Subscription Type",
			source: "System",
			subType: null,
			mandatory: true,
			validation: null,
			name: "Subscription Type",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
		CH_PlanType: {
			values: [
				{
					name: "prepaid",
					value: "prepaid",
					language: null,
					isDefault: null,
					validFor: null
				}
			],
			description: "Subscription Type",
			source: "System",
			subType: null,
			mandatory: false,
			validation: null,
			name: "Subscription Type",
			priority: null,
			valueRegulator: null,
			purpose: null,
			dataType: "STRING",
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
	allowances: [],
	enhancedCharacteristics: {},
	isPlan: false,
	hasAlternateOfferings: false
} as any) as Product;

export {subscription};
