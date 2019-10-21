const wind3DataProductOfferingGroup: any = {
	cardinality: {
		max: 1,
		min: 1
	},
	commercialEnrichments: null,
	id: "GRP_ConfigurableSubscription_Data_Package",
	name: "ConfigurableSubscription Data Packages",
	msisdnGroup: false,
	productOfferings: [
		{
			id: "PO_NoData_wind",
			name: "Data package unlimited",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "0"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null,
			selected: true
		},
		{
			id: "PO_Data_Unlim_wind",
			name: "Data package unlimited",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "-1"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null,
			selected: true
		},
		{
			id: "PO_Data_100GB_wind",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "100"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null,
			selected: true
		},
		{
			id: "PO_Data_20GB_wind",
			name: "Data package 20 GB",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "20"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Default_PO: {
					"unit-of-measure": null,
					name: "CH_Default_PO",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "boolean",
					description: "Default Product Offering of type data, sms, or voice in a configurablesubscription group.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "true"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				}
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 17.9,
						currency: "EUR",
						unitOfMeasure: "MONETARY"
					},
					taxAmount: null,
					taxFreeAmount: 17.9,
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null
		},
		{
			id: "PO_Data_2GB_wind",
			name: "Data package 2 GB",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "2"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				}
			},
			prices: [
				{
					type: "RECURRENT",
					name: null,
					chargedUnit: {
						amount: 4,
						currency: "EUR",
						unitOfMeasure: "MONETARY"
					},
					taxAmount: null,
					taxFreeAmount: 4,
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null
		},
		{
			id: "PO_Data_5GB_wind",
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
				CH_Allowance: {
					"unit-of-measure": null,
					name: "Allowance Included",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
					cardinality: null,
					hidden: true,
					"sub-type": null,
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "5"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
				},
				CH_Slider_Requested: {
					"unit-of-measure": null,
					name: "CH_Slider_Requested",
					priority: null,
					source: "Internal",
					"max-value": null,
					mandatory: true,
					"data-type": "string",
					description: "CH_Slider_Requested",
					cardinality: null,
					hidden: true,
					"sub-type": "Internal",
					purpose: null,
					"value-regulator": null,
					meta: {
						type: "characteristic"
					},
					"human-readable-id": null,
					values: [
						{
							name: null,
							"is-default": null,
							meta: {
								type: "characteristic-value"
							},
							language: null,
							"valid-for": null,
							value: "data"
						}
					],
					"valid-for": null,
					"min-value": null,
					validation: null
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
			specificationId: "PS_Prepaid_Package",
			productId: null,
			specType: "PRODUCT",
			specSubType: "ADDITIONAL",
			stockLevel: null,
			msisdns: null,
			bundlingProductOfferings: null,
			alternateProductOfferings: null
		}
	]
};
export { wind3DataProductOfferingGroup };
