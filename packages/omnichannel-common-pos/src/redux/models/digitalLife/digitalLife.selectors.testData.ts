import { FeatureIdentifierType } from "../../models/feature/feature.types";
import { Agreement } from "../../types/Agreement";

const agreementWithRecurringTopUps: Agreement = {
	id: "7a293446-3e40-4b42-b9b1-077ab701719e",
	type: "agreements",
	attributes: {
		chargingBalances: [
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@5",
				balanceId: "5",
				balanceType: "MoreCreditCurrency",
				name: "Bonus Currency",
				validFor: {
					startDate: "2018-09-25T07:57:45Z",
					endDate: null
				},
				value: 0,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: null,
				serviceId: null,
				currency: "EUR",
				unitOfMeasure: "MONETARY"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@8@20180925000000@20181025000000",
				balanceId: "8@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
				balanceType: "Unknown",
				name: "Data Asset Month FAIR",
				validFor: {
					startDate: "2018-09-25T00:00:00Z",
					endDate: "2018-10-25T00:00:00Z"
				},
				value: 2147483648,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: null,
				serviceId: null,
				currency: null,
				unitOfMeasure: "BYTES"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@6@20180925000000@20181025000000",
				balanceId: "6@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
				balanceType: "VoiceAssetMonth",
				name: "Voice Asset Month",
				validFor: {
					startDate: "2018-09-25T00:00:00Z",
					endDate: "2018-10-25T00:00:00Z"
				},
				value: 59880,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
				serviceId: null,
				currency: null,
				unitOfMeasure: "SECONDS"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@10@20181002000000@20181009000000",
				balanceId: "10@2018-10-02T00:00:00.000000Z@2018-10-09T00:00:00.000000Z",
				balanceType: "TRGTUGRecurringTopUpBalance1W",
				name: "TRGTUG Recurring TopUp Balance 1W",
				validFor: {
					startDate: "2018-10-02T00:00:00Z",
					endDate: "2018-10-09T00:00:00Z"
				},
				value: -1,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: null,
				serviceId: null,
				currency: null,
				unitOfMeasure: "SERVICE_SPECIFIC"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@14@20181003000000@20181010000000",
				balanceId: "14@2018-10-03T00:00:00.000000Z@2018-10-10T00:00:00.000000Z",
				balanceType: "TRGTUGRecurringTopUpBalance1W",
				name: "TRGTUG Recurring TopUp Balance 1W",
				validFor: {
					startDate: "2018-10-03T00:00:00Z",
					endDate: "2018-10-10T00:00:00Z"
				},
				value: 0,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: null,
				serviceId: null,
				currency: null,
				unitOfMeasure: "SERVICE_SPECIFIC"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@4",
				balanceId: "4",
				balanceType: "Pre-PaidCurrency",
				name: "Pre-Paid Currency",
				validFor: {
					startDate: "2018-09-25T07:57:45Z",
					endDate: null
				},
				value: 47.1,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
				serviceId: null,
				currency: "EUR",
				unitOfMeasure: "MONETARY"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@9@20180925000000@20181025000000",
				balanceId: "9@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
				balanceType: "TextAssetMonth",
				name: "Text Asset Month",
				validFor: {
					startDate: "2018-09-25T00:00:00Z",
					endDate: "2018-10-25T00:00:00Z"
				},
				value: 0,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
				serviceId: null,
				currency: null,
				unitOfMeasure: "SERVICE_SPECIFIC"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@1",
				balanceId: "1",
				balanceType: "UsageFlagBalance",
				name: "Usage Flag Balance",
				validFor: {
					startDate: "2018-09-25T07:57:36Z",
					endDate: null
				},
				value: 0,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: null,
				serviceId: null,
				currency: null,
				unitOfMeasure: "SERVICE_SPECIFIC"
			},
			{
				id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@7@20180925000000@20181025000000",
				balanceId: "7@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
				balanceType: "DataAssetMonth",
				name: "Data Asset Month",
				validFor: {
					startDate: "2018-09-25T00:00:00Z",
					endDate: "2018-10-25T00:00:00Z"
				},
				value: 42947575808,
				billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
				productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
				serviceId: null,
				currency: null,
				unitOfMeasure: "BYTES"
			}
		],
		validFor: {
			startDate: "2018-09-25T07:57:30.007Z",
			endDate: null
		},
		referenceNumber: "Hardbundle_sit_pj4",
		lifeCycleStatus: "ACTIVE",
		products: [
			{
				id: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
				name: "Prepaid Subscription",
				productOfferingId: "PO_Base",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [
					{
						primaryId: "893580954507769",
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
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
							instanceCharacteristics: {
								CH_Parent_ID: {
									values: [],
									description: "ParentProductID",
									source: "Order System",
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
							imsi: "222881095457769"
						},
						id: "ddb4df8d-f0d9-4c48-9e06-c3a1934a262e"
					},
					{
						primaryId: "393809547769",
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
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
							instanceCharacteristics: {
								CH_Parent_ID: {
									values: [],
									description: "ParentProductID",
									source: "Order System",
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
						id: "9d60fe3f-a309-484c-9c54-c88f6f980ea8"
					}
				],
				realizingServices: [],
				characteristics: {
					CH_T_SRV_EVENTSTATUS: "N",
					CH_T_SRV_BRAND: "Tre",
					CH_NumberResource: "393809547769",
					CH_T_SRV_CODPNTF: "LDS_NA",
					CH_T_SRV_ORIGINSYSID: "DIGSOL",
					CH_MTX_Sub_Cat_Item_ID: "16",
					CH_SubscriptionType: "Wind Base",
					CH_T_SRV_TYPEID: "MOBILE",
					CH_T_SRV_SERVICECODE: "SRVC41",
					CH_CustomerInventory: "true",
					CH_T_SRV_PAYMENTTYPE: "PRE",
					CH_T_SRV_CHANNELID: "CONS",
					CH_T_SRV_MNPFLAG: "N",
					CH_T_SRV_ACTIONID: "IN",
					CH_T_SRV_FLAGRTG: "N",
					ProductForSubscription: "true",
					CH_PlanType: "prepaid"
				},
				commercialEnrichments: [
					{
						conditions: {},
						descriptions: {
							"long-description": "Prepaid Subscription",
							"short-description": "Prepaid Subscription"
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
						id: "dae263f2-2379-49ef-8fb6-2dec5b23bf30",
						name: "Recurring Weekly Top-Up",
						productOfferingId: "PO_MVP_Time_Weekly_TopUp",
						lifeCycleStatus: "TERMINATED",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [
							{
								id: "3156d503-06d5-488b-ba54-e546b268fd9a",
								primaryId: "1537871341494",
								validFor: {
									startDate: "2018-09-25T10:29:01.43Z",
									endDate: "2018-10-01T08:03:00.609Z"
								},
								lifeCycleStatus: "TERMINATED",
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
								usageCounters: [],
								characteristics: {
									CH_Time_Interval_Count: "1",
									CH_Time_Interval: "week",
									PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
									CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
									CH_MTX_Sub_Cat_Item_ID: "140",
									ORDERLINE: "0",
									CH_TopUp_Amount: "15",
									CH_CustomerInventory: "true",
									TASKID: "1",
									T_FORM_NAME: "TOPUP_TIME_WEEK",
									INT_ComercialProductName: "Recurring Weekly Top-Up",
									CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
									itemSpecId: "0",
									M_EP_UDFS: "1",
									EOL: "Y",
									SingleUseID: "0",
									CH_TopUp_Type: "Time",
									CH_Payment_Method: "2",
									GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
									RECORD_TYPE: "PO",
									Action: "PROVIDE",
									T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
								},
								instanceCharacteristics: {}
							}
						],
						characteristics: {
							CH_Time_Interval_Count: "1",
							CH_Time_Interval: "week",
							PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
							CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
							CH_MTX_Sub_Cat_Item_ID: "140",
							ORDERLINE: "0",
							CH_TopUp_Amount: "20",
							CH_CustomerInventory: "true",
							TASKID: "1",
							CH_Payment_method: "05acc3c7-c023-469c-9c10-59c5752705b7",
							T_FORM_NAME: "TOPUP_TIME_WEEK",
							INT_ComercialProductName: "Recurring Weekly Top-Up",
							CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
							itemSpecId: "0",
							M_EP_UDFS: "1",
							EOL: "Y",
							SingleUseID: "0",
							CH_TopUp_Type: "Time",
							CH_Payment_Method: "2",
							GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
							RECORD_TYPE: "PO",
							Action: "PROVIDE",
							T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Time specific Weekly Top-Up",
									"short-description": "Time specific Weekly Top-Up"
								},
								media: {},
								names: {
									name: "Recurring Weekly Top-Up"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"CSRTOOLBOX",
							"B2C",
							"technical",
							"recurring_topup",
							"CSR-Toolbox"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "DATA",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-25T10:29:01.43Z",
							endDate: "2018-10-01T08:03:00.774Z"
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "79ef24b1-bc43-40f3-80d4-19c0b71df450",
						name: "Wind Basic",
						productOfferingId: "PO_Wind_Basic",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							CH_T_SRV_EVENTSTATUS: "N",
							CH_T_SRV_BRAND: "Tre",
							CH_NumberResource: "393809547769",
							CH_T_SRV_CODPNTF: "LDS_NA",
							CH_T_SRV_ORIGINSYSID: "DIGSOL",
							CH_MTX_Sub_Cat_Item_ID: "165",
							CH_SubscriptionType: "Wind Base",
							CH_T_SRV_TYPEID: "MOBILE",
							CH_T_SRV_SERVICECODE: "SRVC41",
							CH_CustomerInventory: "true",
							CH_T_SRV_PAYMENTTYPE: "PRE",
							CH_T_SRV_CHANNELID: "CONS",
							CH_T_SRV_MNPFLAG: "N",
							CH_T_SRV_ACTIONID: "IN",
							CH_T_SRV_FLAGRTG: "N",
							CH_PlanType: "prepaid"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Tariff plan Wind Basic",
									"short-description": "Tariff plan Wind Basic"
								},
								media: {},
								names: {
									name: "Wind Basic"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"Tariff_Plan"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "SERVICE",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
							endDate: null
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
						name: "Wind Young - Digital Edition",
						productOfferingId: "PO_YoungDigitalEdition",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							CH_MTX_Sub_Cat_Item_ID: "157",
							CH_CustomerInventory: "true",
							CH_AllowanceData: "40 GB",
							CH_SMS_TemplateID_OK: "subscriber-activation",
							CH_AllowanceFairUsageData: "2 GB",
							CH_Bundle_Type: "hardbundle",
							CH_Recurring_Fee: "6,9",
							CH_AllowanceVoice: "1000 minutes"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"Legal Description": "Young Digital",
									"long-description": "It is possible to acquire that offer  for people Under 30",
									"short-description": "Surf and Talk"
								},
								media: {
									"thumbnail-image": "http://portfolio.qvantel.com/app/uploads/2017/02/image002.png"
								},
								names: {
									name: "Wind Young - Digital Edition",
									"Legal-Full name": "Young Digital"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"FairUsageData",
							"Roaming",
							"Offers_Under_31",
							"Voice",
							"prepaid",
							"prepaid-plan",
							"Commercial_Offer",
							"National",
							"Data",
							"plan",
							"Plan"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "MOBILE",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
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
								conditions: null,
								originalPrice: null
							},
							{
								type: "ONE_TIME",
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
								recurringChargePeriod: null,
								currency: "EUR",
								conditions: null,
								originalPrice: null
							}
						],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [
							{
								id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@6@20180925000000@20181025000000",
								balanceId: "6@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
								balanceType: "VoiceAssetMonth",
								name: "Voice Asset Month",
								validFor: {
									startDate: "2018-09-25T00:00:00Z",
									endDate: "2018-10-25T00:00:00Z"
								},
								value: 59880,
								billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
								productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
								serviceId: null,
								currency: null,
								unitOfMeasure: "SECONDS"
							},
							{
								id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@4",
								balanceId: "4",
								balanceType: "Pre-PaidCurrency",
								name: "Pre-Paid Currency",
								validFor: {
									startDate: "2018-09-25T07:57:45Z",
									endDate: null
								},
								value: 47.1,
								billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
								productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
								serviceId: null,
								currency: "EUR",
								unitOfMeasure: "MONETARY"
							},
							{
								id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@9@20180925000000@20181025000000",
								balanceId: "9@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
								balanceType: "TextAssetMonth",
								name: "Text Asset Month",
								validFor: {
									startDate: "2018-09-25T00:00:00Z",
									endDate: "2018-10-25T00:00:00Z"
								},
								value: 0,
								billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
								productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
								serviceId: null,
								currency: null,
								unitOfMeasure: "SERVICE_SPECIFIC"
							},
							{
								id: "S@7a293446-3e40-4b42-b9b1-077ab701719e@7@20180925000000@20181025000000",
								balanceId: "7@2018-09-25T00:00:00.000000Z@2018-10-25T00:00:00.000000Z",
								balanceType: "DataAssetMonth",
								name: "Data Asset Month",
								validFor: {
									startDate: "2018-09-25T00:00:00Z",
									endDate: "2018-10-25T00:00:00Z"
								},
								value: 42947575808,
								billingAccountId: "1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe",
								productId: "02ce179d-9869-4a9b-b8c0-d506b7b21334",
								serviceId: null,
								currency: null,
								unitOfMeasure: "BYTES"
							}
						],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: true,
						hasAlternateOfferings: false
					},
					{
						id: "6599bbac-7f9e-4efa-8944-7f66685f75a4",
						name: "External Phone Directory Consent and Permissions",
						productOfferingId: "PO_ETG",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							CH_Opt_In_ETG_Listing: "false",
							CH_CustomerInventory: "true"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "External Phone Directory Consent and Permissions",
									"short-description": "External Phone Directory Consent and Permissions"
								},
								media: {},
								names: {
									name: "External Phone Directory Consent and Permissions"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "SERVICE",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
							endDate: null
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "174c71e4-8a05-427f-a9e3-8f8b14720c76",
						name: "International Plus",
						productOfferingId: "PO_Recurring_ITZ_PLUS_Add_On",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							PRODUCTID: "PO_Recurring_ITZ_PLUS_Add_On",
							CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
							CH_MTX_Sub_Cat_Item_ID: "162",
							CH_AllowanceInternationalVoice: "100",
							ORDERLINE: "0",
							CH_CustomerInventory: "true",
							TASKID: "1",
							INT_ComercialProductName: "International Plus",
							itemSpecId: "0",
							M_EP_UDFS: "1",
							EOL: "Y",
							CH_Activation_Fee: "2",
							T_Allowed_Payment_Methods: "residual-credit",
							SingleUseID: "0",
							CH_Recurring_Fee: "2",
							GLOBAL_PRODUCT_NAME: "PO_Recurring_ITZ_PLUS_Add_On",
							RECORD_TYPE: "PO",
							Action: "PROVIDE"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "International Plus Recurring Add On International package",
									"short-description": "International Plus Recurring Add On International package"
								},
								media: {},
								names: {
									name: "International Plus"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"additional",
							"International",
							"Voice",
							"Additional_Recurring"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "DATA",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-10-03T10:59:09.574Z",
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
								conditions: null,
								originalPrice: null
							}
						],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "c4c02bb5-906f-4ea3-b3a8-a4a4f90f380e",
						name: "Recurring Weekly Top-Up",
						productOfferingId: "PO_MVP_Time_Weekly_TopUp",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [
							{
								id: "3e83663f-4b63-4ce8-b111-eddce5cd8e5d",
								primaryId: "1538565202399",
								validFor: {
									startDate: "2018-10-03T11:13:22.29Z",
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
								usageCounters: [],
								characteristics: {
									CH_Time_Interval_Count: "1",
									CH_Time_Interval: "week",
									PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
									CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
									CH_MTX_Sub_Cat_Item_ID: "140",
									ORDERLINE: "0",
									CH_TopUp_Amount: "13",
									CH_CustomerInventory: "true",
									TASKID: "1",
									T_FORM_NAME: "TOPUP_TIME_WEEK",
									INT_ComercialProductName: "Recurring Weekly Top-Up",
									CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
									itemSpecId: "0",
									M_EP_UDFS: "1",
									EOL: "Y",
									SingleUseID: "0",
									CH_TopUp_Type: "Time",
									CH_Payment_Method: "2",
									GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
									RECORD_TYPE: "PO",
									Action: "PROVIDE",
									T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
								},
								instanceCharacteristics: {}
							}
						],
						characteristics: {
							CH_Time_Interval_Count: "1",
							CH_Time_Interval: "week",
							PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
							CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
							CH_MTX_Sub_Cat_Item_ID: "140",
							ORDERLINE: "0",
							CH_TopUp_Amount: "13",
							CH_CustomerInventory: "true",
							TASKID: "1",
							T_FORM_NAME: "TOPUP_TIME_WEEK",
							INT_ComercialProductName: "Recurring Weekly Top-Up",
							CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
							itemSpecId: "0",
							M_EP_UDFS: "1",
							EOL: "Y",
							SingleUseID: "0",
							CH_TopUp_Type: "Time",
							CH_Payment_Method: "2",
							GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
							RECORD_TYPE: "PO",
							Action: "PROVIDE",
							T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Time specific Weekly Top-Up",
									"short-description": "Time specific Weekly Top-Up"
								},
								media: {},
								names: {
									name: "Recurring Weekly Top-Up"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"CSRTOOLBOX",
							"B2C",
							"technical",
							"recurring_topup",
							"CSR-Toolbox"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "DATA",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-10-03T11:13:22.29Z",
							endDate: null
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "0a4416cd-e60f-4435-9388-523e2d252096",
						name: "Marketing Consent and Permissions",
						productOfferingId: "PO_MCP",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							CH_MCP_Geo_Localization: "false",
							CH_CustomerInventory: "true",
							CH_MCP_Own_Marketing: "true",
							CH_MCP_3rd_Party_Marketing: "false",
							CH_MCP_3rd_Party_Enrichment: "true",
							CH_MCP_Profiling: "false",
							CH_MCP_3rd_Party_Transfer: "true"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Marketing Consent and Permissions",
									"short-description": "Marketing Consent and Permissions"
								},
								media: {},
								names: {
									name: "Marketing Consent and Permissions"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "SERVICE",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-25T07:57:30.007Z",
							endDate: null
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "25e3a9a2-881f-488b-9392-ea8efda12397",
						name: "6 GIGA Extra",
						productOfferingId: "PO_Gigasnack_E",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [],
						characteristics: {
							PRODUCTID: "PO_Gigasnack_E",
							CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
							CH_MTX_Sub_Cat_Item_ID: "155",
							ORDERLINE: "0",
							CH_CustomerInventory: "true",
							TASKID: "1",
							INT_ComercialProductName: "6 GIGA Extra",
							CH_AllowanceData: "6 GB",
							itemSpecId: "0",
							M_EP_UDFS: "1",
							EOL: "Y",
							CH_Activation_Fee: "5",
							T_Allowed_Payment_Methods: "residual-credit",
							SingleUseID: "0",
							GLOBAL_PRODUCT_NAME: "PO_Gigasnack_E",
							RECORD_TYPE: "PO",
							Action: "PROVIDE"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Gigasnack is a feature that allows purchase of an additional one time data allowance.",
									"short-description": "6 GIGA Extra"
								},
								media: {},
								names: {
									name: "6 GIGA Extra"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"Additional_OneTime",
							"National",
							"additional"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "SERVICE",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-09-27T10:07:21.101Z",
							endDate: null
						},
						prices: [
							{
								type: "ONE_TIME",
								name: null,
								chargedUnit: {
									amount: 5,
									currency: "EUR",
									unitOfMeasure: "MONETARY"
								},
								taxAmount: null,
								taxFreeAmount: 5,
								taxIncludedAmount: null,
								taxRate: null,
								recurringChargePeriod: null,
								currency: "EUR",
								conditions: null,
								originalPrice: null
							}
						],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					},
					{
						id: "0b08e3cc-8a14-4ed2-9034-0134e18f07d3",
						name: "Recurring Weekly Top-Up",
						productOfferingId: "PO_MVP_Time_Weekly_TopUp",
						lifeCycleStatus: "TERMINATED",
						usageCounters: [],
						realizingResources: [],
						realizingServices: [
							{
								id: "05ab5e9c-2038-47fa-92af-952b49a606f5",
								primaryId: "1538381026375",
								validFor: {
									startDate: "2018-10-01T08:03:46.323Z",
									endDate: "2018-10-03T11:10:59.392Z"
								},
								lifeCycleStatus: "TERMINATED",
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
								usageCounters: [],
								characteristics: {
									CH_Time_Interval_Count: "1",
									CH_Time_Interval: "week",
									PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
									CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
									CH_MTX_Sub_Cat_Item_ID: "140",
									ORDERLINE: "0",
									CH_TopUp_Amount: "15",
									CH_CustomerInventory: "true",
									TASKID: "1",
									T_FORM_NAME: "TOPUP_TIME_WEEK",
									INT_ComercialProductName: "Recurring Weekly Top-Up",
									CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
									itemSpecId: "0",
									M_EP_UDFS: "1",
									EOL: "Y",
									SingleUseID: "0",
									CH_TopUp_Type: "Time",
									CH_Payment_Method: "2",
									GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
									RECORD_TYPE: "PO",
									Action: "PROVIDE",
									T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
								},
								instanceCharacteristics: {}
							}
						],
						characteristics: {
							CH_Time_Interval_Count: "1",
							CH_Time_Interval: "week",
							PRODUCTID: "PO_MVP_Time_Weekly_TopUp",
							CH_Parent_ID: "7993b0b1-7127-470b-a0ed-ce2eaabdd7d7",
							CH_MTX_Sub_Cat_Item_ID: "140",
							ORDERLINE: "0",
							CH_TopUp_Amount: "15",
							CH_CustomerInventory: "true",
							TASKID: "1",
							T_FORM_NAME: "TOPUP_TIME_WEEK",
							INT_ComercialProductName: "Recurring Weekly Top-Up",
							CH_SMS_TemplateID_OK: "cons-auto-recur-topup-activation",
							itemSpecId: "0",
							M_EP_UDFS: "1",
							EOL: "Y",
							SingleUseID: "0",
							CH_TopUp_Type: "Time",
							CH_Payment_Method: "2",
							GLOBAL_PRODUCT_NAME: "PO_MVP_Time_Weekly_TopUp",
							RECORD_TYPE: "PO",
							Action: "PROVIDE",
							T_Payment_Method_Relation: "05acc3c7-c023-469c-9c10-59c5752705b7"
						},
						commercialEnrichments: [
							{
								conditions: {},
								descriptions: {
									"long-description": "Time specific Weekly Top-Up",
									"short-description": "Time specific Weekly Top-Up"
								},
								media: {},
								names: {
									name: "Recurring Weekly Top-Up"
								},
								language: "eng"
							}
						],
						childProducts: [],
						categories: [
							"CSRTOOLBOX",
							"B2C",
							"technical",
							"recurring_topup",
							"CSR-Toolbox"
						],
						parentProducts: [
							"7993b0b1-7127-470b-a0ed-ce2eaabdd7d7"
						],
						specType: "PRODUCT",
						specSubType: "DATA",
						user: null,
						owner: null,
						payer: null,
						validFor: {
							startDate: "2018-10-01T08:03:46.323Z",
							endDate: "2018-10-03T11:10:59.606Z"
						},
						prices: [],
						simCards: null,
						billingAccountIds: [],
						chargingBalances: [],
						allowedTransitions: [],
						agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
						instanceCharacteristics: {},
						enhancedCharacteristics: {},
						isPlan: false,
						hasAlternateOfferings: false
					}
				],
				categories: [
					"voice",
					"prepaid",
					"CSRTOOLBOX",
					"prepaid-plan",
					"resMobPrePlan",
					"B2C",
					"CSR-Toolbox"
				],
				parentProducts: [],
				specType: "PRODUCT",
				specSubType: "SUBSCRIPTION",
				user: {
					id: "7f8a22d9-8a4c-40ff-a265-1ba8b5226152",
					displayName: "Matteo"
				},
				owner: null,
				payer: {
					id: "7f8a22d9-8a4c-40ff-a265-1ba8b5226152",
					displayName: "Matteo"
				},
				validFor: {
					startDate: "2018-09-25T07:57:30.007Z",
					endDate: null
				},
				prices: [],
				simCards: [
					{
						primaryId: "893580954507769",
						validFor: {
							startDate: "2017-12-19T10:24:28.927Z",
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
							instanceCharacteristics: {
								CH_Parent_ID: {
									values: [],
									description: "ParentProductID",
									source: "Order System",
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
							imsi: "222881095457769"
						},
						id: "ddb4df8d-f0d9-4c48-9e06-c3a1934a262e",
						simType: "Standard",
						sku: null,
						icc: "893580954507769",
						imsi: "222881095457769",
						pin1: "1234",
						pin2: "1234",
						puk1: "88900845",
						puk2: "78780743",
						simStatus: "in-use",
						reservedFor: null,
						associatedWith: null,
						ownedBy: "",
						simTechnology: null,
						msisdn: null
					}
				],
				billingAccountIds: [
					"1c9448b7-044e-4b42-a6ea-f5cd70b4ddbe"
				],
				chargingBalances: [],
				allowedTransitions: [],
				agreementId: "7a293446-3e40-4b42-b9b1-077ab701719e",
				instanceCharacteristics: {},
				enhancedCharacteristics: {},
				isPlan: false,
				hasAlternateOfferings: false
			}
		]
	},
	relationships: {
		eligiblePlans: {
			links: {
				self: "http://localhost:8080/omnichannel-api/api/v0/agreements/7a293446-3e40-4b42-b9b1-077ab701719e/relationships/eligiblePlans",
				related: "http://localhost:8080/omnichannel-api/api/v0/agreements/7a293446-3e40-4b42-b9b1-077ab701719e/eligiblePlans"
			}
		},
		usageEvents: {
			links: {
				self: "http://localhost:8080/omnichannel-api/api/v0/agreements/7a293446-3e40-4b42-b9b1-077ab701719e/relationships/usageEvents",
				related: "http://localhost:8080/omnichannel-api/api/v0/agreements/7a293446-3e40-4b42-b9b1-077ab701719e/usageEvents"
			}
		}
	},
	links: {
		self: "http://localhost:8080/omnichannel-api/api/v0/agreements/7a293446-3e40-4b42-b9b1-077ab701719e"
	}
} as any as Agreement;

const ecareRecurringTopUpsIdentifier: FeatureIdentifierType = {
	key: "CH_TopUp_Type",
	values: ["Threshold", "Time", "Smart"]
};

const recurringTopUpsAliases: Record<string, string> = {
	type: "CH_TopUp_Type",
	thresholdValue: "CH_Threshold_Value",
	amount: "CH_TopUp_Amount",
	monthlyLimit: "CH_Monthly_TopUp_Limit",
	interval: "CH_Time_Interval",
	intervalCount: "CH_Time_Interval_Count",
	customerPaymentMethod: "CH_Payment_Method",
};

export  {
	ecareRecurringTopUpsIdentifier,
	recurringTopUpsAliases,
	agreementWithRecurringTopUps
};
