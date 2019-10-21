import { Agreement } from "../../../../redux/types";

// noinspection TsLint
const juanitaAgreement: Agreement = {
	id: "juanita-agreement1",
	attributes: {
		validFor: {
			startDate: "2016-11-03T00:00:00Z",
			endDate: null
		},
		referenceNumber: "5373K5",
		lifeCycleStatus: "ACTIVE",
		products: [
			{
				id: "juanita-agreement1-sub",
				name: "Hybrid BASIC Plan",
				productOfferingId: "basic-hybrid-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [
					{
						primaryId: "1135806111300047150",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: null,
						type: "SIM",
						specification: {
							name: "sim",
							id: "sim",
							specSubType: "SIM",
							specType: "PRODUCT",
							instanceCharacteristics: {},
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
							featureCharacteristics: []
						}
					},
					{
						primaryId: "0123006349",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: "ACTIVE",
						type: "MSISDN",
						specification: {
							name: "msisdn",
							id: "msisdn",
							specSubType: "MSISDN",
							specType: "PRODUCT",
							instanceCharacteristics: {
								"lookup-href": {
									values: [
										{
											value:
												"/api/msisdns?filter=(AND%20(EQ%20stock.id%20\"sales-num-stock\")%20(AND%20(EQ%20lifecycle-status%20\"" +
												"available\")%20(EQ%20number-type%20\"voice\")))",
											name:
												"/api/msisdns?filter=(AND%20(EQ%20stock.id%20\"sales-num-stock\")%20(AND%20(EQ%20lifecycle-status%20\"" +
												"available\")%20(EQ%20number-type%20\"voice\")))"
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
							inputCharacteristics: {
								number: {
									values: [],
									description: "phone number",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "MSISDN",
									priority: null
								},
								"number-type": {
									values: [
										{
											value: "regular",
											name: "regular"
										},
										{
											value: "golden",
											name: "golden"
										},
										{
											value: "platinum",
											name: "platinum"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "Number Type",
									priority: null
								}
							},
							featureCharacteristics: []
						}
					},
					{
						primaryId: "AYBA-CHYK-ONI6-S89U",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: "ACTIVE",
						type: "DEVICE",
						specification: {
							name: "yPhone XS 64Gb black",
							id: "yphone64b",
							specSubType: "HANDSET",
							specType: "PRODUCT",
							instanceCharacteristics: {
								"model-number": {
									values: [
										{
											value: "9847893598735",
											name: "9847893598735"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Model number",
									priority: null
								},
								memory: {
									values: [
										{
											value: "64Gb",
											name: "64Gb"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Memory",
									priority: null
								},
								color: {
									values: [
										{
											value: "green",
											name: "green"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Color",
									priority: null
								},
								"serial-number": {
									values: [
										{
											value: "4398345978235",
											name: "4398345978235"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Serial number",
									priority: null
								},
								"sim-type": {
									values: [
										{
											value: "nano",
											name: "nano"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Sim Type",
									priority: null
								},
								imei: {
									values: [
										{
											value: "983298324",
											name: "983298324"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "IMEI",
									priority: null
								},
								brand: {
									values: [
										{
											value: "Appelsiini",
											name: "Appelsiini"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Brand",
									priority: null
								}
							},
							inputCharacteristics: {
								"serial-number": {
									values: [],
									description: null,
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "Serial Number",
									priority: null
								}
							},
							featureCharacteristics: []
						}
					}
				],
				realizingServices: [
					{
						id: "juanita-agreement1-voicesms-ser1",
						primaryId: "CFS_voice_1000",
						validFor: null,
						lifeCycleStatus: "ACTIVE",
						type: "voice",
						allowedTransitions: [
							{
								id: "disable",
								name: "disable",
								targetType: "service"
							}
						],
						specification: {
							name: "CFS_voice_1000",
							id: "voice1000",
							specSubType: "VOICE",
							specType: "SERVICE"
						}
					},
					{
						id: "juanita-agreement1-voicesms-ser2",
						primaryId: "CFS_sms_500",
						validFor: null,
						lifeCycleStatus: "TERMINATED",
						allowedTransitions: [
							{
								id: "enable",
								name: "enable",
								targetType: "service"
							}
						],
						type: "sms",
						specification: {
							name: "CFS_sms_500",
							id: "sms500",
							specSubType: "SMS",
							specType: "SERVICE"
						}
					},
					{
						id: "juanita-agreement1-data-ser",
						primaryId: "CFS_data_50",
						validFor: null,
						lifeCycleStatus: null,
						type: "data",
						specification: {
							name: "CFS_data_50",
							id: "data50",
							specSubType: "DATA",
							specType: "PRODUCT"
						}
					},
					{
						id: "juanita-agreement1-callfwd-cfufwd",
						primaryId: "CFS_data_50",
						validFor: null,
						lifeCycleStatus: "active",
						type: "data",
						specification: {
							name: "CFSS CFNRY FWD FollowMeEverywhere",
							id: "data50",
							specSubType: "DATA",
							specType: "SERVICE"
						},
						characteristics: {
							CFMSISDN: "543221212",
							CFTIME: "10",
							CFSTATUS: "1",
							SERVICEID: "CFUFWD"
						}
					},
					{
						id: "juanita-agreement1-callfwd-cfbfwd",
						primaryId: "CFS_data_50",
						validFor: null,
						lifeCycleStatus: "active",
						type: "data",
						specification: {
							name: "CFSS CFNRY FWD FollowMeEverywhere",
							id: "data50",
							specSubType: "DATA",
							specType: "SERVICE"
						},
						characteristics: {
							CFMSISDN: "543221212",
							CFTIME: "10",
							CFSTATUS: "2",
							SERVICEID: "CFBFWD"
						}
					},
					{
						id: "juanita-agreement1-callfwd-cfnryfwd",
						primaryId: "CFS_data_50",
						validFor: null,
						lifeCycleStatus: "active",
						type: "data",
						specification: {
							name: "CFSS CFNRY FWD FollowMeEverywhere",
							id: "data50",
							specSubType: "DATA",
							specType: "SERVICE"
						},
						characteristics: {
							CFMSISDN: "543221212",
							CFTIME: "10",
							CFSTATUS: "2",
							SERVICEID: "CFNRYFWD"
						}
					},
					{
						id: "juanita-agreement1-callfwd-cfnrcfwd",
						primaryId: "CFS_data_50",
						validFor: null,
						lifeCycleStatus: "active",
						type: "data",
						specification: {
							name: "CFSS CFNRY FWD FollowMeEverywhere",
							id: "data50",
							specSubType: "DATA",
							specType: "SERVICE"
						},
						characteristics: {
							CFMSISDN: "543221212",
							CFTIME: "10",
							CFSTATUS: "2",
							SERVICEID: "CFNRCFWD"
						}
					}
				],
				characteristics: {
					"subscription-type": "HYBASIC",
					name: "Hybrid BASIC Plan"
				},
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
				childProducts: [
					{
						id: "juanita-agreement1-phone",
						name: "Appelsiini yPhone XS 64Gb black",
						productOfferingId: "yphone64b-po",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [
							{
								primaryId: "AYBA-CHYK-ONI6-S89U",
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: null
								},
								lifeCycleStatus: "ACTIVE",
								type: "DEVICE",
								specification: {
									name: "yPhone XS 64Gb black",
									id: "yphone64b",
									specSubType: "HANDSET",
									specType: "PRODUCT",
									instanceCharacteristics: {
										"model-number": {
											values: [
												{
													value: "9847893598735",
													name: "9847893598735"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Model number",
											priority: null
										},
										memory: {
											values: [
												{
													value: "64Gb",
													name: "64Gb"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Memory",
											priority: null
										},
										color: {
											values: [
												{
													value: "green",
													name: "green"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Color",
											priority: null
										},
										"serial-number": {
											values: [
												{
													value: "4398345978235",
													name: "4398345978235"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Serial number",
											priority: null
										},
										"sim-type": {
											values: [
												{
													value: "nano",
													name: "nano"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Sim Type",
											priority: null
										},
										imei: {
											values: [
												{
													value: "983298324",
													name: "983298324"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "IMEI",
											priority: null
										},
										brand: {
											values: [
												{
													value: "Appelsiini",
													name: "Appelsiini"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Brand",
											priority: null
										}
									},
									inputCharacteristics: {
										"serial-number": {
											values: [],
											description: null,
											source: null,
											subType: null,
											mandatory: true,
											validation: null,
											name: "Serial Number",
											priority: null
										}
									},
									featureCharacteristics: []
								}
							}
						],
						realizingServices: [],
						characteristics: {
							name: "Appelsiini yPhone XS 64Gb black",
							"product-id": "12345-5",
							"serial-number": "AYBA-CHYK-ONI6-S89U",
							color: "black",
							"payment-method": "TERMPAYM24VOICE",
							"sim-type": "nano",
							memory: "64Gb"
						},
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
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							},
							{
								conditions: {},
								descriptions: {
									default: "Owner's Manual"
								},
								media: {
									"owners-manual-document":
										"http://www.appelsiiniphone.com/owners-manual.pdf"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE",
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							},
							{
								conditions: {},
								descriptions: {
									default: "Warranty certificate"
								},
								media: {
									"warranty-certificate-document":
										"http://www.appelsiiniphone.com/warranty-certificate.pdf"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE",
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						specType: "PRODUCT",
						specSubType: "HANDSET"
					}
				]
			},
			{
				id: "juanita-agreement1-sub2",
				name: "Hybrid BASIC Plan",
				productOfferingId: "basic-hybrid-po",
				lifeCycleStatus: "ACTIVE",
				usageCounters: [],
				realizingResources: [
					{
						primaryId: "1135806111300047150",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: null,
						type: "SIM",
						specification: {
							name: "sim",
							id: "sim",
							specSubType: "SIM",
							specType: "PRODUCT",
							instanceCharacteristics: {},
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
							featureCharacteristics: []
						}
					},
					{
						primaryId: "0123006349",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: "ACTIVE",
						type: "MSISDN",
						specification: {
							name: "msisdn",
							id: "msisdn",
							specSubType: "MSISDN",
							specType: "PRODUCT",
							instanceCharacteristics: {
								"lookup-href": {
									values: [
										{
											value:
												"/api/msisdns?filter=(AND%20(EQ%20stock.id%20\"sales-num-stock\")" +
												"%20(AND%20(EQ%20lifecycle-status%20\"available\")%20(EQ%20number-type%20\"voice\")))",
											name:
												"/api/msisdns?filter=(AND%20(EQ%20stock.id%20\"sales-num-stock\")" +
												"%20(AND%20(EQ%20lifecycle-status%20\"available\")%20(EQ%20number-type%20\"voice\")))"
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
							inputCharacteristics: {
								number: {
									values: [],
									description: "phone number",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "MSISDN",
									priority: null
								},
								"number-type": {
									values: [
										{
											value: "regular",
											name: "regular"
										},
										{
											value: "golden",
											name: "golden"
										},
										{
											value: "platinum",
											name: "platinum"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "Number Type",
									priority: null
								}
							},
							featureCharacteristics: []
						}
					},
					{
						primaryId: "AYBA-CHYK-ONI6-S89U",
						validFor: {
							startDate: "2016-11-03T00:00:00Z",
							endDate: null
						},
						lifeCycleStatus: "ACTIVE",
						type: "DEVICE",
						specification: {
							name: "yPhone XS 64Gb black",
							id: "yphone64b",
							specSubType: "HANDSET",
							specType: "PRODUCT",
							instanceCharacteristics: {
								"model-number": {
									values: [
										{
											value: "9847893598735",
											name: "9847893598735"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Model number",
									priority: null
								},
								memory: {
									values: [
										{
											value: "64Gb",
											name: "64Gb"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Memory",
									priority: null
								},
								color: {
									values: [
										{
											value: "green",
											name: "green"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Color",
									priority: null
								},
								"serial-number": {
									values: [
										{
											value: "4398345978235",
											name: "4398345978235"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Serial number",
									priority: null
								},
								"sim-type": {
									values: [
										{
											value: "nano",
											name: "nano"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Sim Type",
									priority: null
								},
								imei: {
									values: [
										{
											value: "983298324",
											name: "983298324"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "IMEI",
									priority: null
								},
								brand: {
									values: [
										{
											value: "Appelsiini",
											name: "Appelsiini"
										}
									],
									description: null,
									source: null,
									subType: null,
									mandatory: false,
									validation: null,
									name: "Brand",
									priority: null
								}
							},
							inputCharacteristics: {
								"serial-number": {
									values: [],
									description: null,
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "Serial Number",
									priority: null
								}
							},
							featureCharacteristics: []
						}
					}
				],
				characteristics: {
					"subscription-type": "HYBASIC",
					name: "Hybrid BASIC Plan"
				},
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
				childProducts: [
					{
						id: "juanita-agreement1-phone",
						name: "Appelsiini yPhone XS 64Gb black",
						productOfferingId: "yphone64b-po",
						lifeCycleStatus: "ACTIVE",
						usageCounters: [],
						realizingResources: [
							{
								primaryId: "AYBA-CHYK-ONI6-S89U",
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: null
								},
								lifeCycleStatus: "ACTIVE",
								type: "DEVICE",
								specification: {
									name: "yPhone XS 64Gb black",
									id: "yphone64b",
									specSubType: "HANDSET",
									specType: "PRODUCT",
									instanceCharacteristics: {
										"model-number": {
											values: [
												{
													value: "9847893598735",
													name: "9847893598735"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Model number",
											priority: null
										},
										memory: {
											values: [
												{
													value: "64Gb",
													name: "64Gb"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Memory",
											priority: null
										},
										color: {
											values: [
												{
													value: "green",
													name: "green"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Color",
											priority: null
										},
										"serial-number": {
											values: [
												{
													value: "4398345978235",
													name: "4398345978235"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Serial number",
											priority: null
										},
										"sim-type": {
											values: [
												{
													value: "nano",
													name: "nano"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Sim Type",
											priority: null
										},
										imei: {
											values: [
												{
													value: "983298324",
													name: "983298324"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "IMEI",
											priority: null
										},
										brand: {
											values: [
												{
													value: "Appelsiini",
													name: "Appelsiini"
												}
											],
											description: null,
											source: null,
											subType: null,
											mandatory: false,
											validation: null,
											name: "Brand",
											priority: null
										}
									},
									inputCharacteristics: {
										"serial-number": {
											values: [],
											description: null,
											source: null,
											subType: null,
											mandatory: true,
											validation: null,
											name: "Serial Number",
											priority: null
										}
									},
									featureCharacteristics: []
								}
							}
						],
						realizingServices: [],
						characteristics: {
							name: "Appelsiini yPhone XS 64Gb black",
							"product-id": "12345-5",
							"serial-number": "AYBA-CHYK-ONI6-S89U",
							color: "black",
							"payment-method": "TERMPAYM24VOICE",
							"sim-type": "nano",
							memory: "64Gb"
						},
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
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							},
							{
								conditions: {},
								descriptions: {
									default: "Owner's Manual"
								},
								media: {
									"owners-manual-document":
										"http://www.appelsiiniphone.com/owners-manual.pdf"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE",
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							},
							{
								conditions: {},
								descriptions: {
									default: "Warranty certificate"
								},
								media: {
									"warranty-certificate-document":
										"http://www.appelsiiniphone.com/warranty-certificate.pdf"
								},
								names: {
									"long-name":
										"Appelsiini yPhone XS 64Gb black LTE",
									"manufacturer-name": "Appelsiini",
									"short-name": "Appelsiini yPhone XS"
								}
							}
						],
						specType: "PRODUCT",
						specSubType: "HANDSET"
					}
				]
			}
		]
	}
} as any as Agreement;

export default juanitaAgreement;
