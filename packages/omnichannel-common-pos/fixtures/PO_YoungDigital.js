const po_YoungDigitalEdition = {
	"id": "PO_YoungDigitalEdition",
	"name": "Wind Young - Digital Edition",
	"categories": [],
	"commercialEnrichments": [
		{
			"conditions": {},
			"descriptions": {
				"long-description": "It is possible to acquire that offer  for people Under 30",
				"short-description": "Surf and Talk"
			},
			"media": {},
			"names": {
				"name": "Wind Young - Digital Edition"
			},
			"language": "eng"
		}
	],
	"featureCharacteristics": [
		{
			"name": "CH_CustomerInventory",
			"value": "CH_CustomerInventory",
			"language": null,
			"isDefault": null,
			"validFor": null
		},
		{
			"name": "CH_CustomerInventory",
			"value": "CH_CustomerInventory",
			"language": null,
			"isDefault": null,
			"validFor": null
		}
	],
	"inputCharacteristics": {
		"CH_Recurring_Fee": {
			"values": [],
			"description": "Recurring Fee",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Recurring Fee",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"T_Allowed_Payment_Methods": {
			"values": [
				{
					"name": "residual-credit",
					"value": "residual-credit",
					"language": null,
					"isDefault": null,
					"validFor": null
				},
				{
					"name": "credit-card",
					"value": "credit-card",
					"language": null,
					"isDefault": null,
					"validFor": null
				},
				{
					"name": "cash-on-delivery",
					"value": "cash-on-delivery",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "T_Allowed_Payment_Methods",
			"source": "System",
			"subType": "Internal",
			"mandatory": true,
			"validation": null,
			"name": "Allowed Payment Methods",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_Activation_Fee": {
			"values": [],
			"description": "Activation Fee",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Activation Fee",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		}
	},
	"instanceCharacteristics": {
		"CH_AllowanceFairUsageData": {
			"values": [
				{
					"name": "2 GB",
					"value": "2 GB",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "Fair Usage Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Fair Usage Data Allowance Included",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_AllowanceData": {
			"values": [
				{
					"name": "40 GB",
					"value": "40 GB",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Data Allowance Included",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"T_DEFAULT_VOICE_PO": {
			"values": [
				{
					"name": "PO_Voice_YDE_HB_1000_wind",
					"value": "PO_Voice_YDE_HB_1000_wind",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "Allowance product which should be selected as the default child for Voice allowance for Soft Bundle product",
			"source": "System",
			"subType": "Internal",
			"mandatory": false,
			"validation": null,
			"name": "T_DEFAULT_VOICE_PO",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_SMS_TemplateID_OK": {
			"values": [
				{
					"name": "subscriber-activation",
					"value": "subscriber-activation",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "CH_SMS_TemplateID_OK",
			"source": null,
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "CH_SMS_TemplateID_OK",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"T_DEFAULT_DATA_PO": {
			"values": [
				{
					"name": "PO_Data_YDE_HB_30_wind",
					"value": "PO_Data_YDE_HB_30_wind",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "Allowance product which should be selected as the default child for Data allowance for Soft Bundle product",
			"source": "System",
			"subType": "Internal",
			"mandatory": false,
			"validation": null,
			"name": "T_DEFAULT_DATA_PO",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_OfferFee": {
			"values": [],
			"description": "Offer Fee",
			"source": "Internal",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Offer Fee",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": true,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_RenewalPeriod": {
			"values": [],
			"description": "Renewal Period",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Renewal Period",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_AllowanceVoice": {
			"values": [
				{
					"name": "1000 minutes",
					"value": "1000 minutes",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "Voice Allowance Included",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_Bundle_Type": {
			"values": [
				{
					"name": "hardbundle",
					"value": "hardbundle",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "CH_Bundle_Type",
			"source": "System",
			"subType": null,
			"mandatory": true,
			"validation": null,
			"name": "CH_Bundle_Type",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"T_ALLOWANCE_FORM_TYPE": {
			"values": [
				{
					"name": "GRP_YDE_HB_Voice_Package,GRP_YDE_HB_Data_Package",
					"value": "GRP_YDE_HB_Voice_Package,GRP_YDE_HB_Data_Package",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "T_ALLOWANCE_FORM_TYPE",
			"source": "System",
			"subType": "Internal",
			"mandatory": true,
			"validation": null,
			"name": "T_ALLOWANCE_FORM_TYPE",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": false,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		},
		"CH_MTX_Sub_Cat_Item_ID": {
			"values": [
				{
					"name": "157",
					"value": "157",
					"language": null,
					"isDefault": null,
					"validFor": null
				}
			],
			"description": "CH_MTX_Sub_Cat_Item_ID",
			"source": "Internal",
			"subType": null,
			"mandatory": false,
			"validation": null,
			"name": "MTX Subscriber Catalogue Item Id",
			"priority": null,
			"valueRegulator": null,
			"purpose": null,
			"dataType": "STRING",
			"cardinality": {
				"max": null,
				"min": null
			},
			"humanReadableId": null,
			"hidden": true,
			"maxValue": null,
			"minValue": null,
			"unitOfMeasure": null,
			"validFor": {
				"startDate": null,
				"endDate": null
			}
		}
	},
	"prices": [
		{
			"type": "ONE_TIME",
			"name": null,
			"priority": 15,
			"chargedUnit": {
				"amount": -19,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": -19,
			"taxIncludedAmount": -19,
			"taxRate": 0,
			"recurringChargePeriod": null,
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		},
		{
			"type": "ONE_TIME",
			"name": null,
			"priority": 10,
			"chargedUnit": {
				"amount": 19,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": 19,
			"taxIncludedAmount": 19,
			"taxRate": 0,
			"recurringChargePeriod": null,
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		},
		{
			"type": "ONE_TIME",
			"name": null,
			"priority": 0,
			"chargedUnit": {
				"amount": 20,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": 20,
			"taxIncludedAmount": 20,
			"taxRate": 0,
			"recurringChargePeriod": null,
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		},
		{
			"type": "ONE_TIME",
			"name": null,
			"priority": null,
			"chargedUnit": {
				"amount": 30,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": 30,
			"taxIncludedAmount": 30,
			"taxRate": 0,
			"recurringChargePeriod": null,
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		},
		{
			"type": "ONE_TIME",
			"name": null,
			"priority": -1,
			"chargedUnit": {
				"amount": 40,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": 40,
			"taxIncludedAmount": 40,
			"taxRate": 0,
			"recurringChargePeriod": null,
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		},
		{
			"type": "RECURRENT",
			"priority": 5,
			"name": null,
			"chargedUnit": {
				"amount": 6.9,
				"currency": "EUR",
				"unitOfMeasure": "MONETARY"
			},
			"taxAmount": 0,
			"taxFreeAmount": 6.9,
			"taxIncludedAmount": 6.9,
			"taxRate": 0,
			"recurringChargePeriod": {
				"count": 1,
				"interval": "MONTH"
			},
			"currency": "EUR",
			"conditions": null,
			"originalPrice": null
		}
	],
	"priority": null,
	"productOfferingGroups": [],
	"productOfferings": [],
	"specificationId": "PO_YoungDigitalEdition",
	"productId": null,
	"specType": "PRODUCT",
	"specSubType": "MOBILE",
	"stockLevel": null,
	"discounts": [],
	"allowances": [
		{
			"unitOfMeasure": "GIGABYTES",
			"value": 40,
			"interval": {
				"count": 1,
				"interval": "MONTH"
			},
			"externalId": "40GB Data",
			"group": "Data",
			"destination": [
				"National-Data"
			],
			"commercialEnrichments": [
				{
					"conditions": {},
					"descriptions": {
						"short-description": "40GB Data"
					},
					"media": {},
					"names": {
						"name": "40GB Data"
					},
					"language": "eng"
				}
			]
		},
		{
			"unitOfMeasure": "GIGABYTES",
			"value": 2,
			"interval": {
				"count": 1,
				"interval": "MONTH"
			},
			"externalId": "2GB Fair Usage Data EU Roaming",
			"group": "Data",
			"destination": [
				"data"
			],
			"commercialEnrichments": [
				{
					"conditions": {},
					"descriptions": {
						"long-description": "Data fair usage inside EU",
						"short-description": "Data fair usage inside EU"
					},
					"media": {},
					"names": {
						"name": "Fair usage"
					},
					"language": "eng"
				}
			]
		},
		{
			"unitOfMeasure": "MINUTES",
			"value": 1000,
			"interval": {
				"count": 1,
				"interval": "MONTH"
			},
			"externalId": "1000 Domestic and EU voice mins",
			"group": "Voice",
			"destination": [
				"National-Voice"
			],
			"commercialEnrichments": [
				{
					"conditions": {},
					"descriptions": {
						"long-description": "1000 minutes for domestic calls",
						"short-description": "1000 minutes for domestic calls"
					},
					"media": {},
					"names": {
						"name": "1000 Minutes"
					},
					"language": "eng"
				}
			]
		}
	],
	"parentOfferingId": "PO_Base",
	"msisdns": null,
	"bundlingProductOfferings": null,
	"alternateProductOfferings": null,
	"shippingMethods": null,
	"optionalProductOfferings": [
		{
			"id": "PO_Travel_Weekly",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceRoamingVoiceOut": {
						"values": [
							{
								"name": "100",
								"value": "100",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Roaming Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_AllowanceRoamingVoiceIn": {
						"values": [
							{
								"name": "100",
								"value": "100",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Roaming Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_AllowanceRoamingData": {
						"values": [
							{
								"name": "0.6 GB",
								"value": "0.6 GB",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Roaming Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_AllowanceRoamingSms": {
						"values": [
							{
								"name": "200",
								"value": "200",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "SMS Roaming Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "SMS Roaming Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "163",
								"value": "163",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "Travel Weekly Recurring",
							"short-description": "Travel Weekly Recurring"
						},
						"media": {},
						"names": {
							"name": "Travel Weekly Recurring"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "Travel Weekly Recurring",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"T_Allowed_Payment_Methods": {
						"values": [
							{
								"name": "residual-credit",
								"value": "residual-credit",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "credit-card",
								"value": "credit-card",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "cash-on-delivery",
								"value": "cash-on-delivery",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "T_Allowed_Payment_Methods",
						"source": "System",
						"subType": "Internal",
						"mandatory": true,
						"validation": null,
						"name": "Allowed Payment Methods",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Activation_Fee": {
						"values": [],
						"description": "Activation Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Activation Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "ONE_TIME",
						"name": null,
						"chargedUnit": {
							"amount": 2,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 2,
						"taxIncludedAmount": 2,
						"taxRate": 0,
						"recurringChargePeriod": null,
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				],
				"inputtedCharacteristics": {
					"T_Allowed_Payment_Methods": "residual-credit"
				}
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Travel_Weekly"
			},
			"selected": false
		},
		{
			"id": "PO_Gigasnack_E",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceData": {
						"values": [
							{
								"name": "6 GB",
								"value": "6 GB",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Data Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_SMS_TemplateID_OK_CEASE": {
						"values": [
							{
								"name": "services-deactivated",
								"value": "services-deactivated",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_SMS_TemplateID_OK_CEASE",
						"source": null,
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "CH_SMS_TemplateID_OK_CEASE",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "155",
								"value": "155",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "Gigasnack is a feature that allows purchase of an additional one time data allowance.",
							"short-description": "6 GIGA Extra"
						},
						"media": {},
						"names": {
							"name": "6 GIGA Extra"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "6 GIGA Extra",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"T_Allowed_Payment_Methods": {
						"values": [
							{
								"name": "residual-credit",
								"value": "residual-credit",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "credit-card",
								"value": "credit-card",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "cash-on-delivery",
								"value": "cash-on-delivery",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "T_Allowed_Payment_Methods",
						"source": "System",
						"subType": "Internal",
						"mandatory": true,
						"validation": null,
						"name": "Allowed Payment Methods",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Activation_Fee": {
						"values": [],
						"description": "Activation Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Activation Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "ONE_TIME",
						"name": null,
						"chargedUnit": {
							"amount": 5,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 5,
						"taxIncludedAmount": 5,
						"taxRate": 0,
						"recurringChargePeriod": null,
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				],
				"inputtedCharacteristics": {
					"T_Allowed_Payment_Methods": "residual-credit"
				}
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Gigasnack_E"
			},
			"selected": false
		},
		{
			"id": "PO_SMS_200",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceSMS": {
						"values": [
							{
								"name": "200",
								"value": "200",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "SMS Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "158",
								"value": "158",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "Activate + 200 SMS is easyDiscover the convenience of adding 200 text messages to your rate plan. Activate this Wind option to send messages to all the Italian and european mobiles you want.",
							"short-description": "Add 200 SMS to your offer"
						},
						"media": {},
						"names": {
							"name": "+200 SMS Digital Edition"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "+200 SMS Digital Edition",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"CH_Recurring_Fee": {
						"values": [],
						"description": "Recurring Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Recurring Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "RECURRENT",
						"name": null,
						"chargedUnit": {
							"amount": 1,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 1,
						"taxIncludedAmount": 1,
						"taxRate": 0,
						"recurringChargePeriod": {
							"count": 1,
							"interval": "MONTH"
						},
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				]
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_SMS_200"
			},
			"selected": false
		},
		{
			"id": "PO_Chat_No_Stop",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceDataSpeedLimit": {
						"values": [
							{
								"name": "128 KB",
								"value": "128 KB",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": null,
						"source": null,
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": null,
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "160",
								"value": "160",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "Enable Data Shaping (after Data allowance has been exhausted).",
							"short-description": "Chat No Stop"
						},
						"media": {},
						"names": {
							"name": "Chat No Stop"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "Chat No Stop",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"CH_Recurring_Fee": {
						"values": [],
						"description": "Recurring Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Recurring Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"T_Allowed_Payment_Methods": {
						"values": [
							{
								"name": "residual-credit",
								"value": "residual-credit",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "credit-card",
								"value": "credit-card",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "cash-on-delivery",
								"value": "cash-on-delivery",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "T_Allowed_Payment_Methods",
						"source": "System",
						"subType": "Internal",
						"mandatory": true,
						"validation": null,
						"name": "Allowed Payment Methods",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"T_Payment_Method_Relation": {
						"values": [],
						"description": "T_Payment_Method_Relation",
						"source": null,
						"subType": "Internal",
						"mandatory": false,
						"validation": null,
						"name": "Payment Method Relation",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "RECURRENT",
						"name": null,
						"chargedUnit": {
							"amount": 1,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 1,
						"taxIncludedAmount": 1,
						"taxRate": 0,
						"recurringChargePeriod": {
							"count": 1,
							"interval": "MONTH"
						},
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				],
				"inputtedCharacteristics": {
					"T_Allowed_Payment_Methods": "residual-credit"
				}
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Chat_No_Stop"
			},
			"selected": false
		},
		{
			"id": "PO_Minuti_Illimitati",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceVoice": {
						"values": [
							{
								"name": "0",
								"value": "0",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Voice Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "161",
								"value": "161",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "+Minuti Illimitati Digital Edition",
							"short-description": "+Minuti Illimitati Digital Edition"
						},
						"media": {},
						"names": {
							"name": "+Minuti Illimitati Digital Edition"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "+Minuti Illimitati Digital Edition",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"CH_Recurring_Fee": {
						"values": [],
						"description": "Recurring Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Recurring Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "RECURRENT",
						"name": null,
						"chargedUnit": {
							"amount": 2,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 2,
						"taxIncludedAmount": 2,
						"taxRate": 0,
						"recurringChargePeriod": {
							"count": 1,
							"interval": "MONTH"
						},
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				]
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Minuti_Illimitati"
			},
			"selected": false
		},
		{
			"id": "PO_Recurring_Data_10GB_Add_On",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceFairUsageData": {
						"values": [
							{
								"name": "1.4 GB",
								"value": "1.4 GB",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Fair Usage Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Fair Usage Data Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_AllowanceData": {
						"values": [
							{
								"name": "10 GB",
								"value": "10 GB",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Data Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "159",
								"value": "159",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "+10 GIGA Digital Edition Add On",
							"short-description": "+10 GIGA Digital Edition Add On"
						},
						"media": {},
						"names": {
							"name": "+10 GIGA Digital Edition Add On"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "+10 GIGA Digital Edition Add On",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"CH_Recurring_Fee": {
						"values": [],
						"description": "Recurring Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Recurring Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "RECURRENT",
						"name": null,
						"chargedUnit": {
							"amount": 5,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 5,
						"taxIncludedAmount": 5,
						"taxRate": 0,
						"recurringChargePeriod": {
							"count": 1,
							"interval": "MONTH"
						},
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				]
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_Data_10GB_Add_On"
			},
			"selected": false
		},
		{
			"id": "PO_Recurring_ITZ_PLUS_Add_On",
			"type": "optionalProductOfferings",
			"attributes": {
				"specificationId": null,
				"specType": null,
				"instanceCharacteristics": {
					"CH_AllowanceInternationalVoice": {
						"values": [
							{
								"name": "100",
								"value": "100",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "International Voice Allowance Included. Data is measured in GB, voice in minute, SMS in units.",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "International Voice Allowance Included",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_MTX_Sub_Cat_Item_ID": {
						"values": [
							{
								"name": "162",
								"value": "162",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "CH_MTX_Sub_Cat_Item_ID",
						"source": "Internal",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "MTX Subscriber Catalogue Item Id",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": true,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"productId": null,
				"priority": null,
				"productOfferingGroups": [],
				"stockLevel": null,
				"commercialEnrichments": [
					{
						"conditions": {},
						"descriptions": {
							"long-description": "International Plus Recurring Add On International package",
							"short-description": "International Plus Recurring Add On International package"
						},
						"media": {},
						"names": {
							"name": "International Plus"
						},
						"language": "eng"
					}
				],
				"featureCharacteristics": [
					{
						"name": "CH_CustomerInventory",
						"value": "CH_CustomerInventory",
						"language": null,
						"isDefault": null,
						"validFor": null
					}
				],
				"specSubType": null,
				"discounts": [],
				"productOfferings": [],
				"parentOfferingId": null,
				"name": "International Plus",
				"categories": [],
				"allowances": [],
				"inputCharacteristics": {
					"CH_Recurring_Fee": {
						"values": [],
						"description": "Recurring Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Recurring Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"T_Allowed_Payment_Methods": {
						"values": [
							{
								"name": "residual-credit",
								"value": "residual-credit",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "credit-card",
								"value": "credit-card",
								"language": null,
								"isDefault": null,
								"validFor": null
							},
							{
								"name": "cash-on-delivery",
								"value": "cash-on-delivery",
								"language": null,
								"isDefault": null,
								"validFor": null
							}
						],
						"description": "T_Allowed_Payment_Methods",
						"source": "System",
						"subType": "Internal",
						"mandatory": true,
						"validation": null,
						"name": "Allowed Payment Methods",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Activation_Fee": {
						"values": [],
						"description": "Activation Fee",
						"source": "System",
						"subType": null,
						"mandatory": true,
						"validation": null,
						"name": "Activation Fee",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					},
					"CH_Parent_ID": {
						"values": [],
						"description": "ParentProductID",
						"source": "Order System",
						"subType": null,
						"mandatory": false,
						"validation": null,
						"name": "Parent Product",
						"priority": null,
						"valueRegulator": null,
						"purpose": null,
						"dataType": "STRING",
						"cardinality": {
							"max": null,
							"min": null
						},
						"humanReadableId": null,
						"hidden": false,
						"maxValue": null,
						"minValue": null,
						"unitOfMeasure": null,
						"validFor": {
							"startDate": null,
							"endDate": null
						}
					}
				},
				"prices": [
					{
						"type": "ONE_TIME",
						"name": null,
						"chargedUnit": {
							"amount": 2,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 2,
						"taxIncludedAmount": 2,
						"taxRate": 0,
						"recurringChargePeriod": null,
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					},
					{
						"type": "RECURRENT",
						"name": null,
						"chargedUnit": {
							"amount": 2,
							"currency": "EUR",
							"unitOfMeasure": "MONETARY"
						},
						"taxAmount": 0,
						"taxFreeAmount": 2,
						"taxIncludedAmount": 2,
						"taxRate": 0,
						"recurringChargePeriod": {
							"count": 1,
							"interval": "MONTH"
						},
						"currency": "EUR",
						"conditions": null,
						"originalPrice": null
					}
				],
				"inputtedCharacteristics": {
					"T_Allowed_Payment_Methods": "residual-credit"
				}
			},
			"relationships": {
				"bundlingProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/bundlingProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/bundlingProductOfferings"
					}
				},
				"optionalProductOfferingGroups": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/optionalProductOfferingGroups",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/optionalProductOfferingGroups"
					}
				},
				"msisdns": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/msisdns",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/msisdns"
					}
				},
				"optionalProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/optionalProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/optionalProductOfferings"
					}
				},
				"alternateProductOfferings": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/alternateProductOfferings",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/alternateProductOfferings"
					}
				},
				"shippingMethods": {
					"links": {
						"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/relationships/shippingMethods",
						"related": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On/shippingMethods"
					}
				}
			},
			"links": {
				"self": "http://localhost:8080/omnichannel-api/api/v0/optionalProductOfferings/PO_Recurring_ITZ_PLUS_Add_On"
			},
			"selected": false
		}
	],
	"optionalProductOfferingGroups": null,
	"inputtedCharacteristics": {
		"T_Allowed_Payment_Methods": "residual-credit"
	},
	"selected": true
};

export default po_YoungDigitalEdition;
