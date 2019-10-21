const basicBundledAgreementsPo = {
	id: "basic-bundled-agreements-po",
	type: "contextualProducts",
	attributes: {
		specificationId: null,
		specType: null,
		instanceCharacteristics: {},
		priority: null,
		productOfferingGroups: [
			{
				cardinality: null,
				commercialEnrichments: null,
				id: "port-in-pog",
				name: "Choose your Port-in option",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "port-in-po",
						name: "Port In An External Number",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {
							CH_FlagPrepost: {
								values: [
									{
										name: "0",
										value: "0"
									},
									{
										name: "1",
										value: "1"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Type of contract",
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
							CH_Tenant: {
								values: [
									{
										name: "H3GI",
										value: "H3GI"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: true,
								validation: null,
								name: "Tenant",
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
							CH_FlagPreval: {
								values: [
									{
										name: "0",
										value: "0"
									},
									{
										name: "1",
										value: "1"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Pre-evaluations done",
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
							CH_ICCID: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: "^8939[1-9]{15,16}",
								name: "SIM",
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
							CH_TransferTime: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Transfer time",
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
							CH_PortInNumberResource: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: "^3[1-9]{8,9}",
								name: "Number to Port In",
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
							CH_OperatorID: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Donor network",
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
							CH_CFPI: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Codice Fiscale",
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
							CH_IMSI: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "IMSI",
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
							CH_DonVirtual: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Virtual Donor Operator",
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
							CH_NumberResource: {
								values: [],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: "^3[1-9]{8,9}",
								name: "Phone Number",
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
							CH_CreditTransferFlag: {
								values: [
									{
										name: "0",
										value: "0"
									},
									{
										name: "1",
										value: "1"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "Transfer credit",
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
						instanceCharacteristics: {
							T_FORM_NAME: {
								values: [
									{
										name: "MNP",
										value: "MNP"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "T_FORM_NAME",
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
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "MNP",
						specType: "SERVICE",
						specSubType: "SERVICE",
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					}
				]
			},
			{
				cardinality: {
					max: 1,
					min: 0
				},
				commercialEnrichments: null,
				id: "top-up-pog",
				name: "Choose your Top Up option",
				msisdnGroup: false,
				productOfferings: [
					{
						id: "threshold-top-up-po",
						name: "Threshold Top Up",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {
							CH_Threshold_Value: {
								values: []
							},
							CH_TopUp_Amount: {
								values: []
							},
							CH_Monthly_TopUp_Limit: {
								values: []
							},
							CH_Allowed_Payment_Methods: {
								values: []
							},
							CH_TopUp_Type: {
								values: []
							}
						},
						instanceCharacteristics: {
							T_FORM_NAME: {
								values: [
									{
										name: "TOPUP_THRESHOLD",
										value: "TOPUP_THRESHOLD"
									}
								],
								description: null,
								source: null,
								subType: null,
								mandatory: false,
								validation: null,
								name: "T_FORM_NAME",
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
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: null,
						specType: null,
						specSubType: null,
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						id: "time-monthly-top-up-po",
						name: "Monthly Top Up",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {},
						instanceCharacteristics: {
							T_FORM_NAME: {
								name: "TOPUP_TIME_MONTH",
								values: [
									{
										value: "TOPUP_TIME_MONTH"
									}
								]
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: null,
						specType: null,
						specSubType: null,
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						id: "time-weekly-top-up-po",
						name: "Weekly Top Up",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {},
						instanceCharacteristics: {
							T_FORM_NAME: {
								name: "TOPUP_TIME_WEEK",
								values: [
									{
										value: "TOPUP_TIME_WEEK"
									}
								]
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: null,
						specType: null,
						specSubType: null,
						stockLevel: null,
						msisdns: null,
						bundlingProductOfferings: null,
						alternateProductOfferings: null
					},
					{
						id: "smart-top-up-po",
						name: "Smart Top Up",
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [],
						inputCharacteristics: {},
						instanceCharacteristics: {
							T_FORM_NAME: {
								name: "TOPUP_SMART",
								values: [
									{
										value: "TOPUP_SMART"
									}
								]
							}
						},
						prices: [],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: null,
						specType: null,
						specSubType: null,
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
		featureCharacteristics: [],
		specSubType: null,
		productOfferings: [
			{
				id: "sim-po",
				name: "sim",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					"sim-type": {
						values: [
							{
								name: "micro",
								value: "micro"
							},
							{
								name: "nano",
								value: "nano"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Sim Type",
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
				instanceCharacteristics: {},
				prices: [],
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "sim",
				specType: "PRODUCT",
				specSubType: "SIM",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				id: "voicesms-2-po",
				name: "Voice 1000min SMS 500pc package",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {},
				instanceCharacteristics: {
					voice: {
						values: [
							{
								name: "1000 minutes",
								value: "1000"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
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
					sms: {
						values: [
							{
								name: "500 pieces",
								value: "500"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
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
					"home-zone": {
						values: [
							{
								name: "sweden",
								value: "Sweden"
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
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				id: "phone-directory-po",
				name: "Phone directory",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_ETG_Allow_Search_By_Number_Only: {
						values: [
							{
								name: "Y",
								value: "Y"
							},
							{
								name: "N",
								value: "N"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Allow search by number only",
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
					CH_ETG_Display_Short_Form: {
						values: [
							{
								name: "Y",
								value: "Y"
							},
							{
								name: "N",
								value: "N"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Short name form",
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
					CH_ETG_House_Number: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "House number",
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
					CH_ETG_Province: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "State or province",
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
					CH_ETG_City: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "City",
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
					CH_ETG_Title_or_Specialization: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Title or specialization",
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
					CH_ETG_Profession_or_Department: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Profession",
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
					CH_ETG_Allow_Postal_Advert: {
						values: [
							{
								name: "Y",
								value: "Y"
							},
							{
								name: "N",
								value: "N"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Allow postal advert",
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
					CH_ETG_Street: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Street",
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
					CH_ETG_Postal_Code: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Postal code",
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
					CH_Opt_In_ETG_Listing: {
						values: [
							{
								name: "Y",
								value: "Y"
							},
							{
								name: "N",
								value: "N"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Phone directory registration",
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
					CH_ETG_Street_Type: {
						values: [],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "Street type",
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
				instanceCharacteristics: {
					T_FORM_NAME: {
						values: [
							{
								name: "PHONE_DIRECTORY",
								value: "PHONE_DIRECTORY"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "T_FORM_NAME",
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
				prices: [],
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "phone-directory",
				specType: "SERVICE",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				id: "ISR_MCP_po",
				name: "Marketing Consent and Permissions",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_MCP_Own_Marketing: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Allow W3 Marketing",
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
					CH_MCP_Profiling: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Allow Profiling",
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
					CH_MCP_Geo_Localization: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Allow Geo Localisation",
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
					CH_MCP_3rd_Party_Transfer: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name:
							"Allow Sharing of Data with Selected Marketing Partners",
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
					CH_MCP_3rd_Party_Enrichment: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Allow 3rd Party Data Enrichment",
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
					CH_MCP_3rd_Party_Marketing: {
						values: [
							{
								name: "true",
								value: "true"
							},
							{
								name: "false",
								value: "false"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "Allow 3rd Party Marketing",
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
				instanceCharacteristics: {
					T_FORM_NAME: {
						values: [
							{
								name: "MARKETING_CONSENT",
								value: "MARKETING_CONSENT"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: "T_FORM_NAME",
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
				prices: [],
				priority: null,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "ISR_MCP",
				specType: "SERVICE",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			}
		],
		name: "BASIC Plan with Marketing agreements",
		categories: [],
		inputCharacteristics: {},
		prices: []
	},
	relationships: {
		bundlingProductOfferings: {
			links: {
				self:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/relationships/bundlingProductOfferings",
				related:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/bundlingProductOfferings"
			}
		},
		msisdns: {
			links: {
				self:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/relationships/msisdns",
				related:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/msisdns"
			}
		},
		alternateProductOfferings: {
			links: {
				self:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/relationships/alternateProductOfferings",
				related:
					"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po/alternateProductOfferings"
			}
		}
	},
	links: {
		self:
			"http://127.0.0.1:8080/omnichannel-api/api/v0/contextualProducts/basic-bundled-agreements-po"
	}
};

export default basicBundledAgreementsPo;
