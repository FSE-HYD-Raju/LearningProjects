const superbPlan = {
	type: "contextualProducts",
	id: "superb-sub-po",
	attributes: {
		commercialEnrichments: [],
		featureCharacteristics: [],
		instanceCharacteristics: {},
		productOfferings: [
			{
				categories: ["plan", "resource-change"],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "sim-po",
				name: "sim",
				inputCharacteristics: {
					"sim-type": {
						values: [
							{ value: "micro", name: "micro" },
							{
								value: "nano",
								name: "nano"
							}
						],
						mandatory: true,
						name: "SIM Type"
					},
					icc: { values: [], mandatory: true, name: "ICC" }
				},
				instanceCharacteristics: {},
				prices: [
					{
						type: "ONE_TIME",
						unitOfMeasure: "PIECES",
						taxFreeAmount: 1,
						taxRate: 0,
						currency: "EUR"
					}
				],
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "sim"
			},
			{
				categories: ["plan", "resource-change"],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "msisdn-po",
				name: "msisdn",
				inputCharacteristics: {
					number: { values: [], mandatory: true, name: "MSISDN" },
					"number-type": {
						values: [
							{ value: "regular", name: "regular" },
							{
								value: "golden",
								name: "golden"
							},
							{ value: "platinum", name: "platinum" }
						],
						mandatory: true,
						name: "Number Type"
					}
				},
				instanceCharacteristics: {
					"lookup-href": {
						values: [
							{
								value:
									"/api/msisdns?filter=(AND%20(EQ%20number-type%20%22voice%22)%20(EQ%20lifecycle-status%20%22available%22))",
								name:
									"/api/msisdns?filter=(AND%20(EQ%20number-type%20%22voice%22)%20(EQ%20lifecycle-status%20%22available%22))"
							}
						],
						mandatory: false
					}
				},
				prices: [
					{
						type: "ONE_TIME",
						unitOfMeasure: "PIECES",
						taxFreeAmount: 500,
						taxRate: 0,
						currency: "EUR",
						conditions: { "number-type": "platinum" }
					},
					{
						type: "ONE_TIME",
						unitOfMeasure: "PIECES",
						taxFreeAmount: 50,
						taxRate: 0,
						currency: "EUR",
						conditions: { "number-type": "golden" }
					},
					{
						type: "ONE_TIME",
						unitOfMeasure: "PIECES",
						taxFreeAmount: 0,
						taxRate: 0,
						currency: "EUR"
					}
				],
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "msisdn"
			}
		],
		name: "Postpaid SUPERB Plan",
		categories: ["plan", "postpaid", "voice", "data"],
		inputCharacteristics: {},
		prices: [],
		productOfferingGroups: [
			{
				cardinality: { max: 1, min: 1 },
				id: "data-pog",
				name: "Choose your data plan",
				productOfferings: [
					{
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "data2-po",
						name: "Data 2Mb/s",
						inputCharacteristics: {},
						instanceCharacteristics: {
							data: {
								values: [{ value: "2Mbps", name: "2Mbps" }],
								mandatory: false
							}
						},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 9.95,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "data2"
					},
					{
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "data21-po",
						name: "Data 21Mb/s",
						inputCharacteristics: {},
						instanceCharacteristics: {
							data: {
								values: [{ value: "21Mbps", name: "21Mbps" }],
								mandatory: false
							}
						},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 14.45,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "data21"
					},
					{
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "data50-po",
						name: "Data 50Mb/s",
						inputCharacteristics: {},
						instanceCharacteristics: {
							data: {
								values: [{ value: "50Mbps", name: "50Mbps" }],
								mandatory: false
							}
						},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 19.95,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "data50"
					}
				]
			},
			{
				cardinality: { max: 1, min: 1 },
				id: "voice-pog",
				name: "Choose your voice plan",
				productOfferings: [
					{
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "voicesms-1-po",
						name: "Voice 500min SMS 100pc package",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 9.5,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "voicesms-1"
					},
					{
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "voicesms-2-po",
						name: "Voice 1000min SMS 500pc package",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 15,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "voicesms-2"
					}
				]
			},
			{
				id: "addons-pog",
				name: "Choose additional services to your plan",
				productOfferings: [
					{
						categories: ["addon", "barring"],
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
									{ value: "rbs", name: "Billing System" }
								],
								description:
									"Tells who can activate the service.",
								mandatory: true,
								name: "Actor"
							},
							barring: {
								values: [
									{ value: "postpaid", name: "postpaid" }
								],
								description:
									"Tells what type of plan the service is compatible with.",
								mandatory: true,
								name: "Barring"
							},
							CH_ServiceType: {
								values: [{ value: "all", name: "all" }],
								description:
									"This attribute probably points out which services this barring affects?",
								mandatory: true,
								name: "Service type"
							},
							barringCategory: {
								values: [
									{ value: "blocking", name: "blocking" }
								],
								description:
									"Tells what action is applied when service is active.",
								mandatory: true,
								name: "Barring category"
							}
						},
						prices: [],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "debt-barring"
					},
					{
						categories: ["addon"],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "voicemail-po",
						name: "Voicemail",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 1.5,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "voicemail"
					},
					{
						categories: ["addon", "barring"],
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
									{ value: "customer", name: "customer" }
								],
								description:
									"Tells who can activate the service.",
								mandatory: true,
								name: "Actor"
							},
							barring: {
								values: [{ value: "voice", name: "voice" }],
								description:
									"Tells what type of plan the service is compatible with.",
								mandatory: true,
								name: "Barring"
							},
							CH_ServiceType: {
								values: [{ value: "all", name: "all" }],
								description:
									"This attribute probably points out which services this barring affects?",
								mandatory: true,
								name: "Service type"
							},
							barringCategory: {
								values: [
									{ value: "blocking", name: "blocking" }
								],
								description:
									"Tells what action is applied when service is active.",
								mandatory: true,
								name: "Barring category"
							}
						},
						prices: [],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "temp-barring"
					},
					{
						categories: ["addon"],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "fav-num-po",
						name: "Favorite numbers",
						inputCharacteristics: {
							number3: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number"
							},
							number4: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number"
							},
							number1: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								mandatory: true,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number"
							},
							number2: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number"
							},
							number5: {
								values: [],
								description:
									"The mobile number of a person close to your heart.",
								mandatory: false,
								validation: "^\\+358 [1-9](\\d) (\\d){7}$",
								name: "Favorite number"
							}
						},
						instanceCharacteristics: {},
						prices: [],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "fav-num"
					},
					{
						categories: ["addon"],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "fixed-caller-id-po",
						name: "Fixed caller identifier",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "fixed-caller-id"
					},
					{
						categories: ["addon", "barring"],
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
									{ value: "rbs", name: "Rating System" }
								],
								description:
									"Tells who can activate the service.",
								mandatory: true,
								name: "Actor"
							},
							barring: {
								values: [{ value: "voice", name: "voice" }],
								description:
									"Tells what type of plan the service is compatible with.",
								mandatory: true,
								name: "Barring"
							},
							CH_ServiceType: {
								values: [{ value: "roaming", name: "roaming" }],
								description:
									"This attribute probably points out which services this barring affects?",
								mandatory: true,
								name: "Service type"
							},
							barringCategory: {
								values: [
									{ value: "blocking", name: "blocking" }
								],
								description:
									"Tells what action is applied when service is active.",
								mandatory: true,
								name: "Barring category"
							}
						},
						prices: [],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "no-roaming"
					},
					{
						categories: ["addon"],
						commercialEnrichments: [],
						featureCharacteristics: [],
						id: "reminder-po",
						name: "Invoice reminder",
						inputCharacteristics: {},
						instanceCharacteristics: {},
						prices: [
							{
								type: "RECURRENT",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 1.5,
								taxRate: 0,
								recurringChargePeriod: 1,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "reminder"
					}
				]
			}
		]
	},
	relationships: {
		msisdns: {
			links: {
				self:
					"/omnichannel-api/api/v0/contextualProducts/superb-sub-po/relationships/msisdns",
				related:
					"/omnichannel-api/api/v0/contextualProducts/superb-sub-po/msisdns"
			}
		}
	},
	links: {
		self: "/omnichannel-api/api/v0/contextualProducts/superb-sub-po"
	}
};
const zamzung = {
	type: "contextualProducts",
	id: "zamzung-po",
	attributes: {
		commercialEnrichments: [
			{
				conditions: { memory: "32Gb", color: "white" },
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic1.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 32Gb white" }
			},
			{
				conditions: { memory: "32Gb", color: "black" },
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic2.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 32Gb black" }
			},
			{
				conditions: {},
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic2.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 64Gb black" }
			},
			{
				conditions: { memory: "32Gb", color: "blue" },
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic3.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 32Gb blue" }
			},
			{
				conditions: {},
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic1.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 64Gb white" }
			},
			{
				conditions: {},
				descriptions: {},
				media: {
					"thumbnail-image":
						"http://www.zamzung.com/phones/s5/pic3.png"
				},
				names: { "long-name": "Zamzung Anarchy S5 64Gb blue" }
			},
			{
				conditions: {},
				descriptions: {
					detailed:
						"The Anarchy S5 is the best Zamzung mobile phone by far. Water resistant up to 1 meter and 30 minutes."
				},
				media: {},
				names: { "short-name": "Zamzung Anarchy S5" }
			}
		],
		featureCharacteristics: [
			{ value: "water resistant", name: "Water Resistant" },
			{
				value: "multitouch",
				name: "Multitouch"
			},
			{ value: "Gorilla Glass 3", name: "Gorilla Glass 3" }
		],
		specificationId: "zamzung",
		instanceCharacteristics: {
			os: {
				values: [{ value: "Android v4", name: "Android v4" }],
				mandatory: false,
				name: "OS"
			},
			"sim-type": {
				values: [{ value: "nano", name: "nano" }],
				mandatory: false,
				name: "SIM Type"
			},
			"secondary-camera": {
				values: [{ value: "2MP f/2.4", name: "2MP f/2.4" }],
				mandatory: false,
				name: "Secondary Camera"
			},
			"primary-camera": {
				values: [{ value: "16MP f/2.2", name: "16MP f/2.2" }],
				mandatory: false,
				name: "Primary Camera"
			},
			resolution: {
				values: [{ value: "1080x1920", name: "1080x1920" }],
				mandatory: false,
				name: "Resolution"
			}
		},
		productOfferings: [],
		name: "Zamzung Anarchy S5",
		categories: ["device", "mobile-phone"],
		inputCharacteristics: {
			memory: {
				values: [
					{ value: "32Gb", name: "32Gb" },
					{
						value: "64Gb",
						name: "64Gb"
					}
				],
				mandatory: true,
				name: "Memory"
			},
			color: {
				values: [
					{ value: "black", name: "black" },
					{
						value: "white",
						name: "white"
					},
					{ value: "blue", name: "blue" }
				],
				mandatory: true,
				name: "Color"
			},
			"serial-number": {
				values: [],
				mandatory: true,
				name: "Serial Number"
			}
		},
		prices: [
			{
				type: "ONE_TIME",
				unitOfMeasure: "PIECES",
				taxFreeAmount: 495,
				taxRate: 0,
				currency: "EUR",
				conditions: { memory: "64Gb" }
			},
			{
				type: "ONE_TIME",
				unitOfMeasure: "PIECES",
				taxFreeAmount: 245,
				taxRate: 0,
				currency: "EUR",
				conditions: { memory: "32Gb" }
			}
		],
		productOfferingGroups: []
	},
	relationships: {
		msisdns: {
			links: {
				self:
					"/omnichannel-api/api/v0/contextualProducts/zamzung-po/relationships/msisdns",
				related:
					"/omnichannel-api/api/v0/contextualProducts/zamzung-po/msisdns"
			}
		}
	},
	links: { self: "/omnichannel-api/api/v0/contextualProducts/zamzung-po" }
};
const yphone = {
	type: "contextualProducts",
	id: "yphone-po",
	attributes: {
		commercialEnrichments: [],
		featureCharacteristics: [],
		instanceCharacteristics: {},
		productOfferings: [],
		name: "Appelsiini yPhone XS",
		categories: ["device", "mobile-phone"],
		inputCharacteristics: {},
		prices: [],
		productOfferingGroups: [
			{
				cardinality: { max: 1, min: 1 },
				id: "yphone-pog",
				name: "Pick a yPhone",
				productOfferings: [
					{
						categories: ["device", "handset", "loyal-customer"],
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet. And to our loyal customers, this brilliant handset is now more affordable than ever."
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_w.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb white LTE for loyal customers",
									"short-name":
										"Appelsiini yPhone XS for loyal customers"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone64w-loyal-po",
						name: "Appelsiini yPhone XS 64Gb white - loyal",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "64Gb", name: "64Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "white", name: "white" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 195.5,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone64w"
					},
					{
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet"
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_b.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 32Gb black LTE",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone32b-po",
						name: "Appelsiini yPhone XS 32Gb black",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "32Gb", name: "32Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "black", name: "black" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 295,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone32b"
					},
					{
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet"
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_w.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb white LTE",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone64w-po",
						name: "Appelsiini yPhone XS 64Gb white",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "64Gb", name: "64Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "white", name: "white" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 445,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone64w"
					},
					{
						categories: ["device", "handset", "loyal-customer"],
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet. And to our loyal customers, this brilliant handset is now more affordable than ever."
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_b.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE for loyal customers",
									"short-name":
										"Appelsiini yPhone XS for loyal customers"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone64b-loyal-po",
						name: "Appelsiini yPhone XS 64Gb white - loyal",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "64Gb", name: "64Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "black", name: "black" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 195.5,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone64b"
					},
					{
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet"
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_b.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone64b-po",
						name: "Appelsiini yPhone XS 64Gb black",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "64Gb", name: "64Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "black", name: "black" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 445,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone64b"
					},
					{
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									detailed:
										"The new yPhone is as essential as the shoes on your feet"
								},
								media: {
									"thumbnail-image":
										"http://www.appelsiiniphone.com/thumnail_w.jpg"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 32Gb white LTE",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						featureCharacteristics: [],
						id: "yphone32w-po",
						name: "Appelsiini yPhone XS 32Gb white",
						inputCharacteristics: {
							"serial-number": {
								values: [],
								mandatory: true,
								name: "Serial Number"
							}
						},
						instanceCharacteristics: {
							memory: {
								values: [{ value: "32Gb", name: "32Gb" }],
								mandatory: false,
								name: "Memory"
							},
							color: {
								values: [{ value: "white", name: "white" }],
								mandatory: false,
								name: "Color"
							},
							"sim-type": {
								values: [{ value: "nano", name: "nano" }],
								mandatory: false,
								name: "SIM Type"
							}
						},
						prices: [
							{
								type: "ONE_TIME",
								unitOfMeasure: "PIECES",
								taxFreeAmount: 295,
								taxRate: 0,
								currency: "EUR"
							}
						],
						productOfferingGroups: [],
						productOfferings: [],
						specificationId: "yphone32w"
					}
				]
			}
		]
	},
	relationships: {
		msisdns: {
			links: {
				self:
					"/omnichannel-api/api/v0/contextualProducts/yphone-po/relationships/msisdns",
				related:
					"/omnichannel-api/api/v0/contextualProducts/yphone-po/msisdns"
			}
		}
	},
	links: { self: "/omnichannel-api/api/v0/contextualProducts/yphone-po" }
};

const nestedBundle = {
	attributes: {
		categories: [],
		commercialEnrichments: [],
		featureCharacteristics: [],
		inputCharacteristics: {},
		instanceCharacteristics: {},
		name: "Create your own bundle",
		prices: [],
		priority: null,
		productOfferingGroups: [
			{
				cardinality: {
					max: 1,
					min: 1
				},
				commercialEnrichments: null,
				id: "GRP_PO_FL_Internet",
				msisdnGroup: false,
				name: "Fixed Line Internet Options",
				productOfferings: [
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_ADSL_10",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_DownSpeed: {
								description: "Internet DownSpeed",
								mandatory: true,
								name: "Internet DownSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "10",
										value: "10"
									}
								]
							},
							CH_Internet_Technology: {
								description: "Internet Technology",
								mandatory: true,
								name: "Internet Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "ADSL",
										value: "ADSL"
									}
								]
							},
							CH_UpSpeed: {
								description: "Internet UpSpeed",
								mandatory: true,
								name: "Internet UpSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "1",
										value: "1"
									}
								]
							}
						},
						msisdns: null,
						name: "ADSL 10 Mbit/s",
						prices: [
							{
								chargedUnit: {
									amount: 20,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 20,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Installation_Work",
								inputCharacteristics: {
									CH_Additional_information: {
										description:
											"CH_Additional_information",
										mandatory: true,
										name: "Additional information",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Device_required: {
										description: "CH_Device_required",
										mandatory: true,
										name:
											"Router required for installation",
										priority: null,
										source: "Order System",
										subType: "boolean",
										validation: null,
										values: []
									},
									CH_Install_Address: {
										description: "Install address",
										mandatory: true,
										name: "Installation address",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name:
									"Installation in customer premises (hourly fee)",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Installation_Work",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_IP_Address",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Address",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Address",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Line_ID",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Circuit ID",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Line_ID",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Router",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Internet Router",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Router",
								stockLevel: null
							}
						],
						selected: true,
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_ADSL_10",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_ADSL_20",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_DownSpeed: {
								description: "Internet DownSpeed",
								mandatory: true,
								name: "Internet DownSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "20",
										value: "20"
									}
								]
							},
							CH_Internet_Technology: {
								description: "Internet Technology",
								mandatory: true,
								name: "Internet Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "ADSL",
										value: "ADSL"
									}
								]
							},
							CH_UpSpeed: {
								description: "Internet UpSpeed",
								mandatory: true,
								name: "Internet UpSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "2",
										value: "2"
									}
								]
							}
						},
						msisdns: null,
						name: "ADSL 20 Mbit/s",
						prices: [
							{
								chargedUnit: {
									amount: 30,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 30,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Installation_Work",
								inputCharacteristics: {
									CH_Additional_information: {
										description:
											"CH_Additional_information",
										mandatory: true,
										name: "Additional information",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Device_required: {
										description: "CH_Device_required",
										mandatory: true,
										name:
											"Router required for installation",
										priority: null,
										source: "Order System",
										subType: "boolean",
										validation: null,
										values: []
									},
									CH_Install_Address: {
										description: "Install address",
										mandatory: true,
										name: "Installation address",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name:
									"Installation in customer premises (hourly fee)",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Installation_Work",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_IP_Address",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Address",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Address",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Line_ID",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Circuit ID",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Line_ID",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Router",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Internet Router",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Router",
								stockLevel: null
							}
						],
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_ADSL_20",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_Fibre_100",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_DownSpeed: {
								description: "Internet DownSpeed",
								mandatory: true,
								name: "Internet DownSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "100",
										value: "100"
									}
								]
							},
							CH_Internet_Technology: {
								description: "Internet Technology",
								mandatory: true,
								name: "Internet Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "Fibre",
										value: "Fibre"
									}
								]
							},
							CH_UpSpeed: {
								description: "Internet UpSpeed",
								mandatory: true,
								name: "Internet UpSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "10",
										value: "10"
									}
								]
							}
						},
						msisdns: null,
						name: "Fibre Connection 100 Mbit/s",
						prices: [
							{
								chargedUnit: {
									amount: 40,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 40,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Installation_Work",
								inputCharacteristics: {
									CH_Additional_information: {
										description:
											"CH_Additional_information",
										mandatory: true,
										name: "Additional information",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Device_required: {
										description: "CH_Device_required",
										mandatory: true,
										name:
											"Router required for installation",
										priority: null,
										source: "Order System",
										subType: "boolean",
										validation: null,
										values: []
									},
									CH_Install_Address: {
										description: "Install address",
										mandatory: true,
										name: "Installation address",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name:
									"Installation in customer premises (hourly fee)",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Installation_Work",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_IP_Address",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Address",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Address",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Line_ID",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Circuit ID",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Line_ID",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Router",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Internet Router",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Router",
								stockLevel: null
							}
						],
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_Fibre_100",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_Fibre_300",
						inputCharacteristics: {},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390d3fe0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_DownSpeed: {
								description: "Internet DownSpeed",
								mandatory: true,
								name: "Internet DownSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "300",
										value: "300"
									}
								]
							},
							CH_Internet_Technology: {
								description: "Internet Technology",
								mandatory: true,
								name: "Internet Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "Fibre",
										value: "Fibre"
									}
								]
							},
							CH_UpSpeed: {
								description: "Internet UpSpeed",
								mandatory: true,
								name: "Internet UpSpeed",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "50",
										value: "50"
									}
								]
							}
						},
						msisdns: null,
						name: "Fibre Connection 300 Mbit/s",
						prices: [
							{
								chargedUnit: {
									amount: 50,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 50,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Installation_Work",
								inputCharacteristics: {
									CH_Additional_information: {
										description:
											"CH_Additional_information",
										mandatory: true,
										name: "Additional information",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Device_required: {
										description: "CH_Device_required",
										mandatory: true,
										name:
											"Router required for installation",
										priority: null,
										source: "Order System",
										subType: "boolean",
										validation: null,
										values: []
									},
									CH_Install_Address: {
										description: "Install address",
										mandatory: true,
										name: "Installation address",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name:
									"Installation in customer premises (hourly fee)",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Installation_Work",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_IP_Address",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Address",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Address",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Line_ID",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Circuit ID",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Line_ID",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Router",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Internet Router",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Router",
								stockLevel: null
							}
						],
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_Fibre_300",
						stockLevel: null
					}
				]
			},
			{
				cardinality: {
					max: 1,
					min: 0
				},
				commercialEnrichments: null,
				id: "GRP_PO_FL_Phone",
				msisdnGroup: false,
				name: "Fixed Line Phone Options",
				productOfferings: [
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_500_domestic",
						inputCharacteristics: {
							CH_IP_Phone_Password: {
								description: "IP Phone Password",
								mandatory: true,
								name: "IP Phone Password",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IP_Phone_Username: {
								description: "IP Phone Username",
								mandatory: true,
								name: "IP Phone Username",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IP_Phone_device_model: {
								description: "IP Phone device model",
								mandatory: true,
								name: "IP Phone device model",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_NumberResource: {
								description: "CH_NumberResource",
								mandatory: true,
								name: "Number",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						instanceCharacteristics: {
							CH_FL_Telephone_Technology: {
								description: "CH_FL_Telephone_Technology",
								mandatory: true,
								name: "Fixed line Telephone Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "VoIP",
										value: "VoIP"
									}
								]
							},
							CH_Plan_activation_type: {
								description: "CH_Plan_activation_type",
								mandatory: true,
								name: "Plan activation type",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "456",
										value: "456"
									}
								]
							},
							CH_RatePlan: {
								description: "CH_RatePlan",
								mandatory: true,
								name: "CH_RatePlan",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "2345",
										value: "2345"
									}
								]
							}
						},
						msisdns: null,
						name: "500 mins domestic calls",
						prices: [
							{
								chargedUnit: {
									amount: 5,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 5,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Cisco_IP_Phone_7821",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Cisco IP Phone 7821",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Cisco_IP_Phone_7821",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "R_IP_Phone",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Phone",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Phone",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "R_NumberResource",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Phone Number",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_NumberResource",
								stockLevel: null
							}
						],
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_500_domestic",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_UNL_domestic_100_Americas",
						inputCharacteristics: {
							CH_IP_Phone_Password: {
								description: "IP Phone Password",
								mandatory: true,
								name: "IP Phone Password",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IP_Phone_Username: {
								description: "IP Phone Username",
								mandatory: true,
								name: "IP Phone Username",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IP_Phone_device_model: {
								description: "IP Phone device model",
								mandatory: true,
								name: "IP Phone device model",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_NumberResource: {
								description: "CH_NumberResource",
								mandatory: true,
								name: "Number",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						instanceCharacteristics: {
							CH_FL_Telephone_Technology: {
								description: "CH_FL_Telephone_Technology",
								mandatory: true,
								name: "Fixed line Telephone Technology",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "VoIP",
										value: "VoIP"
									}
								]
							},
							CH_Plan_activation_type: {
								description: "CH_Plan_activation_type",
								mandatory: true,
								name: "Plan activation type",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "456",
										value: "456"
									}
								]
							},
							CH_RatePlan: {
								description: "CH_RatePlan",
								mandatory: true,
								name: "CH_RatePlan",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "2345",
										value: "2345"
									}
								]
							}
						},
						msisdns: null,
						name: "Unlimited domestic calls and 100 mins Americas",
						prices: [
							{
								chargedUnit: {
									amount: 15,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 15,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "PO_Cisco_IP_Phone_7821",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Cisco IP Phone 7821",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "FIXED_LINE",
								specType: "PRODUCT",
								specificationId: "PO_Cisco_IP_Phone_7821",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "R_IP_Phone",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "IP Phone",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_IP_Phone",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [],
								id: "R_NumberResource",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Phone Number",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_NumberResource",
								stockLevel: null
							}
						],
						specSubType: "FIXED_LINE",
						specType: "PRODUCT",
						specificationId: "PO_UNL_domestic_100_Americas",
						stockLevel: null
					}
				]
			},
			{
				cardinality: {
					max: 1,
					min: 0
				},
				commercialEnrichments: null,
				id: "GRP_PO_IPTV",
				msisdnGroup: false,
				name: "IPTV Options",
				productOfferings: [
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_164_Channels_50HD",
						inputCharacteristics: {
							CH_IPTV_Password: {
								description: "IPTV Password",
								mandatory: true,
								name: "IPTV Password",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Set_Top_Box_model: {
								description: "IPTV Set_Top_Box model",
								mandatory: true,
								name: "IPTV Set_Top_Box model",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Username: {
								description: "IPTV Username",
								mandatory: true,
								name: "IPTV Username",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_Channel_Package_ID: {
								description: "CH_Channel_Package_ID",
								mandatory: true,
								name: "Channel Package ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "321",
										value: "321"
									}
								]
							}
						},
						msisdns: null,
						name: "TV package 164 SD and 50 HD Channels",
						prices: [
							{
								chargedUnit: {
									amount: 20,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 20,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Set_Top_Box",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Set Top Box",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Set_Top_Box",
								stockLevel: null
							}
						],
						specSubType: "ADDITIONAL",
						specType: "PRODUCT",
						specificationId: "PO_164_Channels_50HD",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_164_Channels_50HD_Netflix",
						inputCharacteristics: {
							CH_IPTV_Password: {
								description: "IPTV Password",
								mandatory: true,
								name: "IPTV Password",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Set_Top_Box_model: {
								description: "IPTV Set_Top_Box model",
								mandatory: true,
								name: "IPTV Set_Top_Box model",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Username: {
								description: "IPTV Username",
								mandatory: true,
								name: "IPTV Username",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_Channel_Package_ID: {
								description: "CH_Channel_Package_ID",
								mandatory: true,
								name: "Channel Package ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "456",
										value: "456"
									}
								]
							}
						},
						msisdns: null,
						name:
							"TV package 164 SD and 50 HD Channels with Netflix HD",
						prices: [
							{
								chargedUnit: {
									amount: 30,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 30,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Set_Top_Box",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Set Top Box",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Set_Top_Box",
								stockLevel: null
							}
						],
						specSubType: "ADDITIONAL",
						specType: "PRODUCT",
						specificationId: "PO_164_Channels_50HD_Netflix",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_87_Channels",
						inputCharacteristics: {
							CH_IPTV_Password: {
								description: "IPTV Password",
								mandatory: true,
								name: "IPTV Password",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Set_Top_Box_model: {
								description: "IPTV Set_Top_Box model",
								mandatory: true,
								name: "IPTV Set_Top_Box model",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_IPTV_Username: {
								description: "IPTV Username",
								mandatory: true,
								name: "IPTV Username",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						instanceCharacteristics: {
							CH_Case_Category: {
								description: "CH_Case_Category",
								mandatory: true,
								name: "Case Category ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679",
										value:
											"390af5f0-d0e4-11e7-9e8f-51d0af96d679"
									}
								]
							},
							CH_Channel_Package_ID: {
								description: "CH_Channel_Package_ID",
								mandatory: true,
								name: "Channel Package ID",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "123",
										value: "123"
									}
								]
							}
						},
						msisdns: null,
						name: "TV package 87 SD Channels",
						prices: [
							{
								chargedUnit: {
									amount: 10,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 10,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_Set_Top_Box",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Set Top Box",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_Set_Top_Box",
								stockLevel: null
							}
						],
						specSubType: "ADDITIONAL",
						specType: "PRODUCT",
						specificationId: "PO_87_Channels",
						stockLevel: null
					}
				]
			},
			{
				cardinality: {
					max: 1,
					min: 0
				},
				commercialEnrichments: null,
				id: "GRP_PO_Mobile",
				msisdnGroup: false,
				name: "Mobile Options",
				productOfferings: [
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_10GB_UNL_min",
						inputCharacteristics: {
							CH_Bandwidht_Increase_Technology: {
								description: "CH_Bandwidht_Increase_Technology",
								mandatory: true,
								name: "Internet access technology",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: [
									{
										name: "ADSL",
										value: "ADSL"
									}
								]
							},
							CH_ICC: {
								description: "CH_ICC",
								mandatory: true,
								name: "ICC number of SIM card",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_NumberResource: {
								description: "CH_NumberResource",
								mandatory: true,
								name: "Number",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						inputtedCharacteristics: {
							CH_Bandwidht_Increase_Technology: "ADSL"
						},
						instanceCharacteristics: {
							CH_Plan_activation_type: {
								description: "CH_Plan_activation_type",
								mandatory: true,
								name: "Plan activation type",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "123",
										value: "123"
									}
								]
							},
							CH_RatePlan: {
								description: "CH_RatePlan",
								mandatory: true,
								name: "CH_RatePlan",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "6789",
										value: "6789"
									}
								]
							}
						},
						msisdns: null,
						name: "Mobile plan 10GB data and unlimited voice",
						prices: [
							{
								chargedUnit: {
									amount: 28,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 28,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "PO_Increase_Bandwidth",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Bandwidth increase",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "SERVICE",
								specType: "PRODUCT",
								specificationId: "PO_Increase_Bandwidth",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_MSISDN",
								inputCharacteristics: {
									CH_Inventory_Id: {
										description: "Original Payer",
										mandatory: false,
										name: "CH_Inventory_Id",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Parent_ID: {
										description: "ParentProductID",
										mandatory: false,
										name: "CH_Parent_ID",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Mobile Number",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_MSISDN",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_SIM",
								inputCharacteristics: {
									CH_Inventory_Id: {
										description: "Original Payer",
										mandatory: false,
										name: "CH_Inventory_Id",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Parent_ID: {
										description: "ParentProductID",
										mandatory: false,
										name: "CH_Parent_ID",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name: "SIM Card",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_SIM",
								stockLevel: null
							}
						],
						specSubType: "MOBILE",
						specType: "PRODUCT",
						specificationId: "PO_10GB_UNL_min",
						stockLevel: null
					},
					{
						alternateProductOfferings: null,
						bundlingProductOfferings: null,
						categories: [],
						commercialEnrichments: [],
						featureCharacteristics: [
							{
								name: "CH_CustomerInventory",
								value: "CH_CustomerInventory"
							}
						],
						id: "PO_500MB_500min",
						inputCharacteristics: {
							CH_Bandwidht_Increase_Technology: {
								description: "CH_Bandwidht_Increase_Technology",
								mandatory: true,
								name: "Internet access technology",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: [
									{
										name: "ADSL",
										value: "ADSL"
									}
								]
							},
							CH_ICC: {
								description: "CH_ICC",
								mandatory: true,
								name: "ICC number of SIM card",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							},
							CH_NumberResource: {
								description: "CH_NumberResource",
								mandatory: true,
								name: "Number",
								priority: null,
								source: "Order System",
								subType: "string",
								validation: null,
								values: []
							}
						},
						inputtedCharacteristics: {
							CH_Bandwidht_Increase_Technology: "ADSL"
						},
						instanceCharacteristics: {
							CH_Plan_activation_type: {
								description: "CH_Plan_activation_type",
								mandatory: true,
								name: "Plan activation type",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "123",
										value: "123"
									}
								]
							},
							CH_RatePlan: {
								description: "CH_RatePlan",
								mandatory: true,
								name: "CH_RatePlan",
								priority: null,
								source: null,
								subType: "string",
								validation: null,
								values: [
									{
										name: "6789",
										value: "6789"
									}
								]
							}
						},
						msisdns: null,
						name: "Mobile plan 500MB data and 500 min",
						prices: [
							{
								chargedUnit: {
									amount: 8,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								conditions: {},
								currency: "EUR",
								name: null,
								originalPrice: null,
								recurringChargePeriod: {
									count: 1,
									interval: "MONTH"
								},
								taxAmount: null,
								taxFreeAmount: 8,
								taxRate: 0,
								type: "RECURRENT"
							}
						],
						priority: null,
						productOfferingGroups: [],
						productOfferings: [
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "PO_Increase_Bandwidth",
								inputCharacteristics: {},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Bandwidth increase",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "SERVICE",
								specType: "PRODUCT",
								specificationId: "PO_Increase_Bandwidth",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_MSISDN",
								inputCharacteristics: {
									CH_Inventory_Id: {
										description: "Original Payer",
										mandatory: false,
										name: "CH_Inventory_Id",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Parent_ID: {
										description: "ParentProductID",
										mandatory: false,
										name: "CH_Parent_ID",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name: "Mobile Number",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_MSISDN",
								stockLevel: null
							},
							{
								alternateProductOfferings: null,
								bundlingProductOfferings: null,
								categories: [],
								commercialEnrichments: [],
								featureCharacteristics: [
									{
										name: "CH_CustomerInventory",
										value: "CH_CustomerInventory"
									}
								],
								id: "R_SIM",
								inputCharacteristics: {
									CH_Inventory_Id: {
										description: "Original Payer",
										mandatory: false,
										name: "CH_Inventory_Id",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									},
									CH_Parent_ID: {
										description: "ParentProductID",
										mandatory: false,
										name: "CH_Parent_ID",
										priority: null,
										source: "Order System",
										subType: "string",
										validation: null,
										values: []
									}
								},
								instanceCharacteristics: {},
								msisdns: null,
								name: "SIM Card",
								prices: [],
								priority: null,
								productOfferingGroups: [],
								productOfferings: [],
								specSubType: "RESOURCE",
								specType: "RESOURCE",
								specificationId: "R_SIM",
								stockLevel: null
							}
						],
						specSubType: "MOBILE",
						specType: "PRODUCT",
						specificationId: "PO_500MB_500min",
						stockLevel: null
					}
				]
			}
		],
		productOfferings: [],
		specSubType: "FIXED_LINE",
		specType: "PRODUCT",
		specificationId: "BPO_Create_Your_Own_Bundle",
		stockLevel: null
	},
	id: "BPO_Create_Your_Own_Bundle",
	links: {
		self:
			"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle"
	},
	relationships: {
		alternateProductOfferings: {
			links: {
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/alternateProductOfferings",
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/relationships/alternateProductOfferings"
			}
		},
		bundlingProductOfferings: {
			links: {
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/bundlingProductOfferings",
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/relationships/bundlingProductOfferings"
			}
		},
		msisdns: {
			links: {
				related:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/msisdns",
				self:
					"http://tomee/omnichannel-api/api/v0/contextualProducts/BPO_Create_Your_Own_Bundle/relationships/msisdns"
			}
		}
	},
	type: "contextualProducts"
};
export { superbPlan, zamzung, yphone, nestedBundle };
