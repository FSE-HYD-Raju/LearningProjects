const exampleProduct = {
	attributes: {
		specificationId: "PO_Postpaid_MobileBundle",
		specType: "PRODUCT",
		instanceCharacteristics: {
			CH_Plan_activation_type: {
				values: [{ name: "123", value: "123" }],
				description: "CH_Plan_activation_type",
				source: null,
				subType: null,
				mandatory: true,
				validation: null,
				name: "Plan activation type",
				priority: null,
				valueRegulator: null,
				purpose: null,
				dataType: "STRING",
				cardinality: { max: null, min: null },
				humanReadableId: null,
				hidden: false,
				maxValue: null,
				minValue: null,
				unitOfMeasure: null,
				validFor: { startDate: null, endDate: null }
			},
			CH_SubscriptionType: {
				values: [
					{
						name: "PO_Postpaid_MobileBundle",
						value: "PO_Postpaid_MobileBundle"
					}
				],
				description: "Subscription Type",
				source: "Internal",
				subType: null,
				mandatory: true,
				validation: null,
				name: "CH_SubscriptionType",
				priority: null,
				valueRegulator: null,
				purpose: null,
				dataType: "STRING",
				cardinality: { max: null, min: null },
				humanReadableId: null,
				hidden: false,
				maxValue: null,
				minValue: null,
				unitOfMeasure: null,
				validFor: { startDate: null, endDate: null }
			},
			CH_RatePlan: {
				values: [{ name: "6789", value: "6789" }],
				description: "CH_RatePlan",
				source: null,
				subType: null,
				mandatory: true,
				validation: null,
				name: "CH_RatePlan",
				priority: null,
				valueRegulator: null,
				purpose: null,
				dataType: "STRING",
				cardinality: { max: null, min: null },
				humanReadableId: null,
				hidden: false,
				maxValue: null,
				minValue: null,
				unitOfMeasure: null,
				validFor: { startDate: null, endDate: null }
			}
		},
		priority: null,
		productOfferingGroups: [
			{
				cardinality: { max: 1, min: 1 },
				commercialEnrichments: null,
				id: "GRP_Postpaid_Voice_Package",
				name: "Postpaid Voice Packages",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "PO_Voice_500",
						name: "Voice package 500 min domestic calls",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Voice_Units: {
								values: [{ name: "500", value: "500" }],
								description:
									"Amount of Voice minutes in package",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Voice minutes in package",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "PO_Voice_500",
						specType: "PRODUCT",
						specSubType: "VOICE",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null,
						selected: true
					},
					{
						id: "PO_Voice_Unl",
						name: "Voice package unlimited domestic calls",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Voice_Units: {
								values: [
									{ name: "Unlimited", value: "Unlimited" }
								],
								description:
									"Amount of Voice minutes in package",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Voice minutes in package",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [
							{
								type: "RECURRENT",
								name: null,
								chargedUnit: {
									amount: 15,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
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
						specificationId: "PO_Voice_Unl",
						specType: "PRODUCT",
						specSubType: "VOICE",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: { max: 1, min: 1 },
				commercialEnrichments: null,
				id: "GRP_Postpaid_SMS_Package",
				name: "Postpaid SMS Packages",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "PO_SMS_100",
						name: "SMS package 100 units",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_SMS_Units: {
								values: [{ name: "100", value: "100" }],
								description: "Amount of SMS units in package",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of SMS units in package",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [
							{
								type: "RECURRENT",
								name: null,
								chargedUnit: {
									amount: 1,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								taxAmount: null,
								taxFreeAmount: 1,
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
						specificationId: "PO_SMS_100",
						specType: "PRODUCT",
						specSubType: "SMS",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null,
						selected: true
					},
					{
						id: "PO_SMS_Unl",
						name: "SMS package unlimited units",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_SMS_Units: {
								values: [
									{ name: "Unlimited", value: "Unlimited" }
								],
								description: "Amount of SMS units in package",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of SMS units in package",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [
							{
								type: "RECURRENT",
								name: null,
								chargedUnit: {
									amount: 8,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								taxAmount: null,
								taxFreeAmount: 8,
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
						specificationId: "PO_SMS_Unl",
						specType: "PRODUCT",
						specSubType: "SMS",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: { max: 1, min: 0 },
				commercialEnrichments: null,
				id: "GRP_Postpaid_Roaming_Voice_Package",
				name: "Postpaid Roaming Voice packages",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "PO_Roaming_Voice_300",
						name: "Voice package 300 min roaming calls",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Voice_Units: {
								values: [{ name: "300", value: "300" }],
								description:
									"Amount of Voice minutes in package",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Voice minutes in package",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "PO_Roaming_Voice_300",
						specType: "PRODUCT",
						specSubType: "VOICE",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: { max: 1, min: 1 },
				commercialEnrichments: null,
				id: "GRP_Postpaid_Data_Package",
				name: "Postpaid Data Packages",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "PO_Data_100GB",
						name: "Data package 100 GB",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Data_Units: {
								values: [{ name: "100 GB", value: "100 GB" }],
								description:
									"Amount of Data amount in package (GB",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Data amount in package (GB",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [
							{
								type: "RECURRENT",
								name: null,
								chargedUnit: {
									amount: 29.9,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								taxAmount: null,
								taxFreeAmount: 29.9,
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
						specificationId: "PO_Data_100GB",
						specType: "PRODUCT",
						specSubType: "DATA",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null,
						selected: true
					},
					{
						id: "PO_Data_5GB",
						name: "Data package 5 GB",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Data_Units: {
								values: [{ name: "5 GB", value: "5 GB" }],
								description:
									"Amount of Data amount in package (GB",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Data amount in package (GB",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [
							{
								type: "RECURRENT",
								name: null,
								chargedUnit: {
									amount: 7,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								taxAmount: null,
								taxFreeAmount: 7,
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
						specificationId: "PO_Data_5GB",
						specType: "PRODUCT",
						specSubType: "DATA",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: { max: 1, min: 0 },
				commercialEnrichments: null,
				id: "GRP_Postpaid_Roaming_Data_Package",
				name: "Postpaid Roaming Data packages",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "PO_Roaming_Data_1GB",
						name: "Roaming data package 1 GB",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Data_Units: {
								values: [{ name: "1 GB", value: "1 GB" }],
								description:
									"Amount of Data amount in package (GB",
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Amount of Data amount in package (GB",
								priority: null,
								valueRegulator: null,
								purpose: null,
								dataType: "STRING",
								cardinality: { max: null, min: null },
								humanReadableId: null,
								hidden: false,
								maxValue: null,
								minValue: null,
								unitOfMeasure: null,
								validFor: { startDate: null, endDate: null }
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "PO_Roaming_Data_1GB",
						specType: "PRODUCT",
						specSubType: "DATA",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			}
		],
		stockLevel: null,
		commercialEnrichments: [],
		featureCharacteristics: [
			{ name: "CH_CustomerInventory", value: "CH_CustomerInventory" }
		],
		specSubType: "MOBILE",
		productOfferings: [
			{
				id: "PO_VoiceMail",
				name: "VoiceMail",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [
					{
						name: "CH_CustomerInventory",
						value: "CH_CustomerInventory"
					}
				],
				inputCharacteristics: {
					CH_NumberResource: {
						values: [],
						description: "Number",
						source: "Order System",
						subType: null,
						mandatory: true,
						validation: null,
						name: "Number",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					},
					CH_Parent_ID: {
						values: [],
						description: "ParentProductID",
						source: "Order System",
						subType: null,
						mandatory: false,
						validation: null,
						name: "CH_Parent_ID",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					}
				},
				instanceCharacteristics: {
					CH_MSISDNType: {
						values: [],
						description: "MSISDNType",
						source: "Order System",
						subType: null,
						mandatory: false,
						validation: null,
						name: "CH_MSISDNType",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					},
					CH_subClass: {
						values: [{ name: "Voicemail", value: "Voicemail" }],
						description: "Sub Class",
						source: "Internal",
						subType: null,
						mandatory: false,
						validation: null,
						name: "CH_subClass",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					},
					CH_NumberType: {
						values: [{ name: "MOBILE", value: "MOBILE" }],
						description: "NumberType",
						source: "Order System",
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_NumberType",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					},
					CH_ServiceType: {
						values: [{ name: "Voicemail", value: "Voicemail" }],
						description: "ServiceType",
						source: "Internal",
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_ServiceType",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "STRING",
						cardinality: { max: null, min: null },
						humanReadableId: null,
						hidden: false,
						maxValue: null,
						minValue: null,
						unitOfMeasure: null,
						validFor: { startDate: null, endDate: null }
					}
				},
				prices: [],
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "PO_VoiceMail",
				specType: "PRODUCT",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null,
				inputtedCharacteristics: { CH_NumberResource: "23411" }
			}
		],
		name: "Postpaid Mobile bundle",
		categories: [],
		inputCharacteristics: {
			CH_NumberResource: {
				values: [],
				description: "Number",
				source: "Order System",
				subType: null,
				mandatory: true,
				validation: null,
				name: "Number",
				priority: null,
				valueRegulator: null,
				purpose: null,
				dataType: "STRING",
				cardinality: { max: null, min: null },
				humanReadableId: null,
				hidden: false,
				maxValue: null,
				minValue: null,
				unitOfMeasure: null,
				validFor: { startDate: null, endDate: null }
			},
			CH_ICC: {
				values: [],
				description: "ICC number of SIM card",
				source: "Order System",
				subType: null,
				mandatory: true,
				validation: null,
				name: "ICC number of SIM card",
				priority: null,
				valueRegulator: null,
				purpose: null,
				dataType: "STRING",
				cardinality: { max: null, min: null },
				humanReadableId: null,
				hidden: false,
				maxValue: null,
				minValue: null,
				unitOfMeasure: null,
				validFor: { startDate: null, endDate: null }
			}
		},
		prices: [],
		id: "PO_Postpaid_MobileBundle",
		inputtedCharacteristics: { CH_ICC: "234" }
	},
	id: "PO_Postpaid_MobileBundle",
	links: {
		self:
			"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle"
	},
	relationships: {
		bundlingProductOfferings: {
			links: {
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/relationships/bundlingProductOfferings",
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/bundlingProductOfferings"
			}
		},
		msisdns: {
			links: {
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/relationships/msisdns",
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/msisdns"
			}
		},
		alternateProductOfferings: {
			links: {
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/relationships/alternateProductOfferings",
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/PO_Postpaid_MobileBundle/alternateProductOfferings"
			}
		}
	},
	type: "contextualProducts"
};

export default exampleProduct;
