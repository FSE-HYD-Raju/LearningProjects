import { PosMsisdnConfigurationModalProps } from "../PosMsisdnConfigurationModal";

const props = {
	product: {
		id: "PO_Elige_tu_Numero",
		type: "contextualProducts",
		attributes: {
			specificationId: "PO_Elige_tu_Numero",
			specType: "PRODUCT",
			instanceCharacteristics: {
				resourceSelectionRule: {
					values: [
						{
							name: "shared",
							value: "shared"
						}
					],
					description: "resourceSelectionRule",
					source: null,
					subType: null,
					mandatory: true,
					validation: null,
					name: "resourceSelectionRule",
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
			productId: null,
			priority: null,
			productOfferingGroups: [
				{
					cardinality: {
						max: 1,
						min: 0
					},
					commercialEnrichments: null,
					id: "GRP_PO_Elige_tu_Numero",
					name: "GRP_PO_Elige_tu_Numero",
					msisdnGroup: true,
					productOfferings: [
						{
							id: "PO_Muy_Faciles",
							name: "Muy Faciles",
							categories: [],
							commercialEnrichments: [],
							featureCharacteristics: [],
							inputCharacteristics: {
								CH_Already_Paid: {
									values: [],
									description: "CH_Already_Paid",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_Already_Paid",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
								"number-type": {
									values: [
										{
											name: "Muy Faciles",
											value: "Muy Faciles"
										}
									],
									description: "number-type",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "number-type",
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
								CH_SKU: {
									values: [
										{
											name: "Muy Faciles",
											value: "Muy Faciles"
										}
									],
									description: "CH_SKU",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_SKU",
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
								CH_CBS_OfferingID: {
									values: [
										{
											name: "900072",
											value: "900072"
										}
									],
									description: "CH_CBS_OfferingID",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_CBS_OfferingID",
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
								CH_BypassFOM: {
									values: [
										{
											name: "FALSE",
											value: "FALSE"
										}
									],
									description: "CH_BypassFOM",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_BypassFOM",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
							specificationId: "PO_Muy_Faciles",
							productId: "Muy Faciles",
							specType: "PRODUCT",
							specSubType: "SERVICE",
							stockLevel: null,
							msisdns: null,
							bundlingProductOfferings: null,
							alternateProductOfferings: null,
							selected: true
						},
						{
							id: "PO_Numero_Aleatorio",
							name: "Numero aleatorio",
							categories: [],
							commercialEnrichments: [],
							featureCharacteristics: [],
							inputCharacteristics: {
								CH_Already_Paid: {
									values: [],
									description: "CH_Already_Paid",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_Already_Paid",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
								CH_SKU: {
									values: [
										{
											name: "Numero Aleatorio",
											value: "Numero Aleatorio"
										}
									],
									description: "CH_SKU",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_SKU",
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
								CH_CBS_OfferingID: {
									values: [
										{
											name: "900074",
											value: "900074"
										}
									],
									description: "CH_CBS_OfferingID",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_CBS_OfferingID",
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
								CH_BypassFOM: {
									values: [
										{
											name: "FALSE",
											value: "FALSE"
										}
									],
									description: "CH_BypassFOM",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_BypassFOM",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
							specificationId: "PO_Numero_Aleatorio",
							productId: "Numero Aleatorio",
							specType: "PRODUCT",
							specSubType: "SERVICE",
							stockLevel: null,
							msisdns: null,
							bundlingProductOfferings: null,
							alternateProductOfferings: null
						},
						{
							id: "PO_Numeros_Faciles",
							name: "Numeros fáciles",
							categories: [],
							commercialEnrichments: [],
							featureCharacteristics: [],
							inputCharacteristics: {
								CH_Already_Paid: {
									values: [],
									description: "CH_Already_Paid",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_Already_Paid",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
								"number-type": {
									values: [
										{
											name: "Numeros Faciles",
											value: "Numeros Faciles"
										}
									],
									description: "number-type",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "number-type",
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
								CH_SKU: {
									values: [
										{
											name: "Numeros Faciles",
											value: "Numeros Faciles"
										}
									],
									description: "CH_SKU",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_SKU",
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
								CH_CBS_OfferingID: {
									values: [
										{
											name: "900073",
											value: "900073"
										}
									],
									description: "CH_CBS_OfferingID",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_CBS_OfferingID",
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
								CH_BypassFOM: {
									values: [
										{
											name: "FALSE",
											value: "FALSE"
										}
									],
									description: "CH_BypassFOM",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_BypassFOM",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
							specificationId: "PO_Numeros_Faciles",
							productId: "Numeros Faciles",
							specType: "PRODUCT",
							specSubType: "SERVICE",
							stockLevel: null,
							msisdns: null,
							bundlingProductOfferings: null,
							alternateProductOfferings: null
						},
						{
							id: "PO_Super_Faciles",
							name: "Super Faciles",
							categories: [],
							commercialEnrichments: [],
							featureCharacteristics: [],
							inputCharacteristics: {
								CH_Already_Paid: {
									values: [],
									description: "CH_Already_Paid",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_Already_Paid",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
								"number-type": {
									values: [
										{
											name: "Super Faciles",
											value: "Super Faciles"
										}
									],
									description: "number-type",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "number-type",
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
								CH_SKU: {
									values: [
										{
											name: "Super Faciles",
											value: "Super Faciles"
										}
									],
									description: "CH_SKU",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_SKU",
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
								CH_CBS_OfferingID: {
									values: [
										{
											name: "900071",
											value: "900071"
										}
									],
									description: "CH_CBS_OfferingID",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_CBS_OfferingID",
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
								CH_BypassFOM: {
									values: [
										{
											name: "FALSE",
											value: "FALSE"
										}
									],
									description: "CH_BypassFOM",
									source: null,
									subType: null,
									mandatory: true,
									validation: null,
									name: "CH_BypassFOM",
									priority: null,
									valueRegulator: null,
									purpose: null,
									dataType: "BOOLEAN",
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
							specificationId: "PO_Super_Faciles",
							productId: "Super Faciles",
							specType: "PRODUCT",
							specSubType: "SERVICE",
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
			specSubType: "SERVICE",
			productOfferings: [
				{
					id: "PO_Busqueda_Exacta",
					name: "Busqueda exacta",
					categories: [],
					commercialEnrichments: [],
					featureCharacteristics: [],
					inputCharacteristics: {
						CH_Already_Paid: {
							values: [],
							description: "CH_Already_Paid",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "CH_Already_Paid",
							priority: null,
							valueRegulator: null,
							purpose: null,
							dataType: "BOOLEAN",
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
						"number-type": {
							values: [
								{
									name: "Busqueda Exacta",
									value: "Busqueda Exacta"
								}
							],
							description: "number-type",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "number-type",
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
						CH_CBS_OfferingID: {
							values: [
								{
									name: "900070",
									value: "900070"
								}
							],
							description: "CH_CBS_OfferingID",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "CH_CBS_OfferingID",
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
						CH_BypassFOM: {
							values: [
								{
									name: "FALSE",
									value: "FALSE"
								}
							],
							description: "CH_BypassFOM",
							source: null,
							subType: null,
							mandatory: true,
							validation: null,
							name: "CH_BypassFOM",
							priority: null,
							valueRegulator: null,
							purpose: null,
							dataType: "BOOLEAN",
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
					specificationId: "PO_Busqueda_Exacta",
					productId: null,
					specType: "PRODUCT",
					specSubType: "SERVICE",
					stockLevel: null,
					msisdns: null,
					bundlingProductOfferings: null,
					alternateProductOfferings: null
				}
			],
			name: "Elige tu Numero",
			categories: [],
			inputCharacteristics: {},
			prices: []
		},
		relationships: {
			bundlingProductOfferings: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/relationships/bundlingProductOfferings",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/bundlingProductOfferings"
				}
			},
			msisdns: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/relationships/msisdns",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/msisdns"
				}
			},
			alternateProductOfferings: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/relationships/alternateProductOfferings",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero/alternateProductOfferings"
				}
			}
		},
		links: {
			self:
				"http://localhost:8080/omnichannel-api/api/v0/contextualProducts/PO_Elige_tu_Numero"
		}
	},
	userOpened: true,
	msisdnConfig: {
		resourceType: "shared",
		configuredIn: "product",
		product: "PO_Elige_tu_Numero",
		msisdn: ""
	},
	msisdnPog: {
		cardinality: {
			max: 1,
			min: 0
		},
		commercialEnrichments: null,
		id: "GRP_PO_Elige_tu_Numero",
		name: "GRP_PO_Elige_tu_Numero",
		msisdnGroup: true,
		productOfferings: [
			{
				id: "PO_Muy_Faciles",
				name: "Muy Faciles",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_Already_Paid: {
						values: [],
						description: "CH_Already_Paid",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_Already_Paid",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
					"number-type": {
						values: [
							{
								name: "Muy Faciles",
								value: "Muy Faciles"
							}
						],
						description: "number-type",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "number-type",
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
					CH_SKU: {
						values: [
							{
								name: "Muy Faciles",
								value: "Muy Faciles"
							}
						],
						description: "CH_SKU",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_SKU",
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
					CH_CBS_OfferingID: {
						values: [
							{
								name: "900072",
								value: "900072"
							}
						],
						description: "CH_CBS_OfferingID",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_CBS_OfferingID",
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
					CH_BypassFOM: {
						values: [
							{
								name: "FALSE",
								value: "FALSE"
							}
						],
						description: "CH_BypassFOM",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_BypassFOM",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
				specificationId: "PO_Muy_Faciles",
				productId: "Muy Faciles",
				specType: "PRODUCT",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null,
				selected: true
			},
			{
				id: "PO_Numero_Aleatorio",
				name: "Numero aleatorio",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_Already_Paid: {
						values: [],
						description: "CH_Already_Paid",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_Already_Paid",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
					CH_SKU: {
						values: [
							{
								name: "Numero Aleatorio",
								value: "Numero Aleatorio"
							}
						],
						description: "CH_SKU",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_SKU",
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
					CH_CBS_OfferingID: {
						values: [
							{
								name: "900074",
								value: "900074"
							}
						],
						description: "CH_CBS_OfferingID",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_CBS_OfferingID",
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
					CH_BypassFOM: {
						values: [
							{
								name: "FALSE",
								value: "FALSE"
							}
						],
						description: "CH_BypassFOM",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_BypassFOM",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
				specificationId: "PO_Numero_Aleatorio",
				productId: "Numero Aleatorio",
				specType: "PRODUCT",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				id: "PO_Numeros_Faciles",
				name: "Numeros fáciles",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_Already_Paid: {
						values: [],
						description: "CH_Already_Paid",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_Already_Paid",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
					"number-type": {
						values: [
							{
								name: "Numeros Faciles",
								value: "Numeros Faciles"
							}
						],
						description: "number-type",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "number-type",
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
					CH_SKU: {
						values: [
							{
								name: "Numeros Faciles",
								value: "Numeros Faciles"
							}
						],
						description: "CH_SKU",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_SKU",
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
					CH_CBS_OfferingID: {
						values: [
							{
								name: "900073",
								value: "900073"
							}
						],
						description: "CH_CBS_OfferingID",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_CBS_OfferingID",
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
					CH_BypassFOM: {
						values: [
							{
								name: "FALSE",
								value: "FALSE"
							}
						],
						description: "CH_BypassFOM",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_BypassFOM",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
				specificationId: "PO_Numeros_Faciles",
				productId: "Numeros Faciles",
				specType: "PRODUCT",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			},
			{
				id: "PO_Super_Faciles",
				name: "Super Faciles",
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				inputCharacteristics: {
					CH_Already_Paid: {
						values: [],
						description: "CH_Already_Paid",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_Already_Paid",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
					"number-type": {
						values: [
							{
								name: "Super Faciles",
								value: "Super Faciles"
							}
						],
						description: "number-type",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "number-type",
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
					CH_SKU: {
						values: [
							{
								name: "Super Faciles",
								value: "Super Faciles"
							}
						],
						description: "CH_SKU",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_SKU",
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
					CH_CBS_OfferingID: {
						values: [
							{
								name: "900071",
								value: "900071"
							}
						],
						description: "CH_CBS_OfferingID",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_CBS_OfferingID",
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
					CH_BypassFOM: {
						values: [
							{
								name: "FALSE",
								value: "FALSE"
							}
						],
						description: "CH_BypassFOM",
						source: null,
						subType: null,
						mandatory: true,
						validation: null,
						name: "CH_BypassFOM",
						priority: null,
						valueRegulator: null,
						purpose: null,
						dataType: "BOOLEAN",
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
				specificationId: "PO_Super_Faciles",
				productId: "Super Faciles",
				specType: "PRODUCT",
				specSubType: "SERVICE",
				stockLevel: null,
				msisdns: null,
				bundlingProductOfferings: null,
				alternateProductOfferings: null
			}
		]
	},
	path: [
		{
			po: "PO_Elige_tu_Numero"
		}
	],
	selectedNumber: "",
	msisdnUseInventories: true,
	msisdnReservationMinutes: 10,
	stocks: [
		{
			id: "186f76da-6251-563c-a93f-c9429ea3b363",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "NUMEROS FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numeros Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/186f76da-6251-563c-a93f-c9429ea3b363"
			}
		},
		{
			id: "1cc1d728-bde3-51d4-81fe-9db6ddd6f194",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "SUPER FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Super Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/1cc1d728-bde3-51d4-81fe-9db6ddd6f194"
			}
		},
		{
			id: "219ffd55-a6bd-4ca3-b4e1-6fc4ea49ef7c",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/219ffd55-a6bd-4ca3-b4e1-6fc4ea49ef7c"
			}
		},
		{
			id: "237828f8-3724-4b8c-869a-a0932f85c597",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "MUY FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Muy Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/237828f8-3724-4b8c-869a-a0932f85c597"
			}
		},
		{
			id: "2a5c8ec8-5e0b-40a7-87b2-de91500adec6",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/2a5c8ec8-5e0b-40a7-87b2-de91500adec6"
			}
		},
		{
			id: "2e46a1a4-3c4e-4a5f-87d8-5b39d3ee3ff9",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/2e46a1a4-3c4e-4a5f-87d8-5b39d3ee3ff9"
			}
		},
		{
			id: "40374d72-9c83-5b98-8b27-97a95b70dbd2",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "NUMEROS FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numeros Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/40374d72-9c83-5b98-8b27-97a95b70dbd2"
			}
		},
		{
			id: "5628ebdc-e4a2-41c5-95a2-8677f122b085",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/5628ebdc-e4a2-41c5-95a2-8677f122b085"
			}
		},
		{
			id: "75160cca-c558-427a-999e-211adab9ce10",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/75160cca-c558-427a-999e-211adab9ce10"
			}
		},
		{
			id: "7d6a9886-6e15-55ec-9c20-c8bfe7471a8b",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "MUY FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Muy Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/7d6a9886-6e15-55ec-9c20-c8bfe7471a8b"
			}
		},
		{
			id: "7eda6e60-50d1-4ab4-97f8-4900161a7427",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "NUMEROS FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numeros Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/7eda6e60-50d1-4ab4-97f8-4900161a7427"
			}
		},
		{
			id: "99b22e9c-cf8c-5180-af97-3f1071f3c2ac",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "MUY FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Muy Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/99b22e9c-cf8c-5180-af97-3f1071f3c2ac"
			}
		},
		{
			id: "9a50c183-99ab-5d21-ad0f-2d11d8e76c98",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "MUY FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Muy Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/9a50c183-99ab-5d21-ad0f-2d11d8e76c98"
			}
		},
		{
			id: "a571cc8b-3bd7-49a9-a81b-bb332d9a1c67",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/a571cc8b-3bd7-49a9-a81b-bb332d9a1c67"
			}
		},
		{
			id: "a7b5ab41-3269-42dd-9e9f-8de08cbad189",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/a7b5ab41-3269-42dd-9e9f-8de08cbad189"
			}
		},
		{
			id: "b3dcfb93-cc66-4c48-8da5-77403b1a8ddb",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/b3dcfb93-cc66-4c48-8da5-77403b1a8ddb"
			}
		},
		{
			id: "c527e6e5-8be6-5c4a-8c41-e78d38fb5344",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "NUMEROS FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numeros Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/c527e6e5-8be6-5c4a-8c41-e78d38fb5344"
			}
		},
		{
			id: "c91c7800-d92a-5ec9-b3bd-51cb956811d1",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "SUPER FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Super Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/c91c7800-d92a-5ec9-b3bd-51cb956811d1"
			}
		},
		{
			id: "cbdf59d9-ab4b-46bb-9e11-bf1073c8013e",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/cbdf59d9-ab4b-46bb-9e11-bf1073c8013e"
			}
		},
		{
			id: "cdd18d71-8dc9-4fe5-8360-e7fb61fbfdb9",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/cdd18d71-8dc9-4fe5-8360-e7fb61fbfdb9"
			}
		},
		{
			id: "e4428f8c-be41-4000-9cd8-fa1d3bce4cf7",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "SUPER FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Super Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/e4428f8c-be41-4000-9cd8-fa1d3bce4cf7"
			}
		},
		{
			id: "e6f51b52-edfe-4930-a894-97d64e6e8001",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/e6f51b52-edfe-4930-a894-97d64e6e8001"
			}
		},
		{
			id: "ea9571e0-2f1a-46c7-a4ea-dfd0a765fdc8",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/ea9571e0-2f1a-46c7-a4ea-dfd0a765fdc8"
			}
		},
		{
			id: "f0c93162-82c4-470d-9e4e-f538f1e0a1f9",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/f0c93162-82c4-470d-9e4e-f538f1e0a1f9"
			}
		},
		{
			id: "f3e9affc-833a-4844-a972-6d062a1e480e",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "normal",
				stockClassification: null,
				name: "NUMERO ALEATORIO",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/f3e9affc-833a-4844-a972-6d062a1e480e"
			}
		},
		{
			id: "fa82c8a1-7793-5408-8ca8-a9fb215ec623",
			type: "resource-stocks",
			attributes: {
				characteristics: {},
				stockType: "lucky",
				stockClassification: null,
				name: "SUPER FACILES",
				extReferenceId: "QV",
				description: null,
				resourceSKU: "Super Faciles",
				resourceType: "msisdns"
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-stocks/fa82c8a1-7793-5408-8ca8-a9fb215ec623"
			}
		}
	],
	inventories: [
		{
			id: "34ce835c-8237-5737-b701-362d7e6a3714",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Puerto Suarez",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "1cc1d728-bde3-51d4-81fe-9db6ddd6f194",
							type: "resource-stocks"
						},
						{
							id: "99b22e9c-cf8c-5180-af97-3f1071f3c2ac",
							type: "resource-stocks"
						},
						{
							id: "c527e6e5-8be6-5c4a-8c41-e78d38fb5344",
							type: "resource-stocks"
						},
						{
							id: "e6f51b52-edfe-4930-a894-97d64e6e8001",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/34ce835c-8237-5737-b701-362d7e6a3714/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/34ce835c-8237-5737-b701-362d7e6a3714/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/34ce835c-8237-5737-b701-362d7e6a3714"
			}
		},
		{
			id: "f21e6cd1-69f5-5600-bd10-6c96ee4edce0",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Sucre",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "ea9571e0-2f1a-46c7-a4ea-dfd0a765fdc8",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/f21e6cd1-69f5-5600-bd10-6c96ee4edce0/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/f21e6cd1-69f5-5600-bd10-6c96ee4edce0/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/f21e6cd1-69f5-5600-bd10-6c96ee4edce0"
			}
		},
		{
			id: "967dc272-cbd1-5aa6-982e-3f55d84507cc",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Any",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "237828f8-3724-4b8c-869a-a0932f85c597",
							type: "resource-stocks"
						},
						{
							id: "7eda6e60-50d1-4ab4-97f8-4900161a7427",
							type: "resource-stocks"
						},
						{
							id: "e4428f8c-be41-4000-9cd8-fa1d3bce4cf7",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/967dc272-cbd1-5aa6-982e-3f55d84507cc/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/967dc272-cbd1-5aa6-982e-3f55d84507cc/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/967dc272-cbd1-5aa6-982e-3f55d84507cc"
			}
		},
		{
			id: "26399e5b-ced8-50d2-9180-0693a56939c3",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Oruro",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "5628ebdc-e4a2-41c5-95a2-8677f122b085",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/26399e5b-ced8-50d2-9180-0693a56939c3/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/26399e5b-ced8-50d2-9180-0693a56939c3/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/26399e5b-ced8-50d2-9180-0693a56939c3"
			}
		},
		{
			id: "1898611b-881b-5578-b2db-41fa783a3855",
			type: "resource-inventories",
			attributes: {
				characteristics: {
					BRANCH_CODE: "1",
					LOCATION_CODE: "501"
				},
				inventoryType: "msisdn-zone",
				name: "La Paz",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "186f76da-6251-563c-a93f-c9429ea3b363",
							type: "resource-stocks"
						},
						{
							id: "219ffd55-a6bd-4ca3-b4e1-6fc4ea49ef7c",
							type: "resource-stocks"
						},
						{
							id: "9a50c183-99ab-5d21-ad0f-2d11d8e76c98",
							type: "resource-stocks"
						},
						{
							id: "fa82c8a1-7793-5408-8ca8-a9fb215ec623",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/1898611b-881b-5578-b2db-41fa783a3855/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/1898611b-881b-5578-b2db-41fa783a3855/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/1898611b-881b-5578-b2db-41fa783a3855"
			}
		},
		{
			id: "0126e3ae-f15a-58f9-9a14-dc1a91fb15a8",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Pando",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "2a5c8ec8-5e0b-40a7-87b2-de91500adec6",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/0126e3ae-f15a-58f9-9a14-dc1a91fb15a8/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/0126e3ae-f15a-58f9-9a14-dc1a91fb15a8/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/0126e3ae-f15a-58f9-9a14-dc1a91fb15a8"
			}
		},
		{
			id: "7eba6ed7-3b6c-5a78-bd30-c35a400935e3",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Yacuiba",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "b3dcfb93-cc66-4c48-8da5-77403b1a8ddb",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7eba6ed7-3b6c-5a78-bd30-c35a400935e3/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7eba6ed7-3b6c-5a78-bd30-c35a400935e3/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7eba6ed7-3b6c-5a78-bd30-c35a400935e3"
			}
		},
		{
			id: "8deac41f-9c60-5da0-a249-e57f015c2d64",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Cochabamba",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "f3e9affc-833a-4844-a972-6d062a1e480e",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/8deac41f-9c60-5da0-a249-e57f015c2d64/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/8deac41f-9c60-5da0-a249-e57f015c2d64/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/8deac41f-9c60-5da0-a249-e57f015c2d64"
			}
		},
		{
			id: "7ad4559c-5be1-5322-bc1b-3460826d68ad",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Tarija",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "2e46a1a4-3c4e-4a5f-87d8-5b39d3ee3ff9",
							type: "resource-stocks"
						},
						{
							id: "75160cca-c558-427a-999e-211adab9ce10",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7ad4559c-5be1-5322-bc1b-3460826d68ad/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7ad4559c-5be1-5322-bc1b-3460826d68ad/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/7ad4559c-5be1-5322-bc1b-3460826d68ad"
			}
		},
		{
			id: "385f5930-e600-563b-912b-a93e2328ff43",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Camiri",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "cbdf59d9-ab4b-46bb-9e11-bf1073c8013e",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/385f5930-e600-563b-912b-a93e2328ff43/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/385f5930-e600-563b-912b-a93e2328ff43/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/385f5930-e600-563b-912b-a93e2328ff43"
			}
		},
		{
			id: "60a1841c-bea5-5334-9a75-36579cb5ddc0",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Potosi",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "cdd18d71-8dc9-4fe5-8360-e7fb61fbfdb9",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/60a1841c-bea5-5334-9a75-36579cb5ddc0/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/60a1841c-bea5-5334-9a75-36579cb5ddc0/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/60a1841c-bea5-5334-9a75-36579cb5ddc0"
			}
		},
		{
			id: "cf5e6c6c-b43e-58d8-83a5-b6e94c6c6ce9",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Villamontes",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "a571cc8b-3bd7-49a9-a81b-bb332d9a1c67",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/cf5e6c6c-b43e-58d8-83a5-b6e94c6c6ce9/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/cf5e6c6c-b43e-58d8-83a5-b6e94c6c6ce9/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/cf5e6c6c-b43e-58d8-83a5-b6e94c6c6ce9"
			}
		},
		{
			id: "2020f5ca-300c-509e-9c33-2d23c9588ec8",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Santa Cruz",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "40374d72-9c83-5b98-8b27-97a95b70dbd2",
							type: "resource-stocks"
						},
						{
							id: "7d6a9886-6e15-55ec-9c20-c8bfe7471a8b",
							type: "resource-stocks"
						},
						{
							id: "c91c7800-d92a-5ec9-b3bd-51cb956811d1",
							type: "resource-stocks"
						},
						{
							id: "f0c93162-82c4-470d-9e4e-f538f1e0a1f9",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8"
			}
		},
		{
			id: "4cb1424d-b17a-5881-beab-23c5f457a455",
			type: "resource-inventories",
			attributes: {
				characteristics: {},
				inventoryType: "msisdn-zone",
				name: "Trinidad",
				extReferenceId: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "a7b5ab41-3269-42dd-9e9f-8de08cbad189",
							type: "resource-stocks"
						}
					],
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/4cb1424d-b17a-5881-beab-23c5f457a455/relationships/stocks",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/4cb1424d-b17a-5881-beab-23c5f457a455/stocks"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/4cb1424d-b17a-5881-beab-23c5f457a455"
			}
		}
	],
	reservationAttributes: {},
	activeReservationId: null,
	reservationError: true,
	selectedInventory: {
		id: "2020f5ca-300c-509e-9c33-2d23c9588ec8",
		type: "resource-inventories",
		attributes: {
			characteristics: {},
			inventoryType: "msisdn-zone",
			name: "Santa Cruz",
			extReferenceId: null
		},
		relationships: {
			stocks: {
				data: [
					{
						id: "40374d72-9c83-5b98-8b27-97a95b70dbd2",
						type: "resource-stocks"
					},
					{
						id: "7d6a9886-6e15-55ec-9c20-c8bfe7471a8b",
						type: "resource-stocks"
					},
					{
						id: "c91c7800-d92a-5ec9-b3bd-51cb956811d1",
						type: "resource-stocks"
					},
					{
						id: "f0c93162-82c4-470d-9e4e-f538f1e0a1f9",
						type: "resource-stocks"
					}
				],
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8/relationships/stocks",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8/stocks"
				}
			}
		},
		links: {
			self:
				"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/2020f5ca-300c-509e-9c33-2d23c9588ec8"
		}
	},
	selectedCategory: null,
	inputtedPattern: null,
	actions: {
		savePortIn: jest.fn(),
		performChangeCategory: jest.fn(),
		releaseMsisdn: jest.fn(),
		reserveMsisdn: jest.fn(),
		getResourceInventories: jest.fn(),
		changeInventory: jest.fn(),
		selectProductOffering: jest.fn(),
		saveMsisdn: jest.fn(),
		addProduct: jest.fn(),
	},
	sortedPos: [
		{
			"id": "PO_Muy_Faciles",
			"name": "Muy Faciles",
			"categories": [],
			"commercialEnrichments": [],
			"featureCharacteristics": [],
			"inputCharacteristics": {
				"CH_Already_Paid": {
					"values": [],
					"description": "CH_Already_Paid",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_Already_Paid",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
				"number-type": {
					"values": [
						{
							"name": "Muy Faciles",
							"value": "Muy Faciles"
						}
					],
					"description": "number-type",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "number-type",
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
				"CH_SKU": {
					"values": [
						{
							"name": "Muy Faciles",
							"value": "Muy Faciles"
						}
					],
					"description": "CH_SKU",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_SKU",
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
				"CH_CBS_OfferingID": {
					"values": [
						{
							"name": "900072",
							"value": "900072"
						}
					],
					"description": "CH_CBS_OfferingID",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_CBS_OfferingID",
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
				"CH_BypassFOM": {
					"values": [
						{
							"name": "FALSE",
							"value": "FALSE"
						}
					],
					"description": "CH_BypassFOM",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_BypassFOM",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
			"prices": [],
			"priority": null,
			"productOfferingGroups": [],
			"productOfferings": [],
			"specificationId": "PO_Muy_Faciles",
			"productId": "Muy Faciles",
			"specType": "PRODUCT",
			"specSubType": "SERVICE",
			"stockLevel": null,
			"msisdns": null,
			"bundlingProductOfferings": null,
			"alternateProductOfferings": null,
			"selected": true
		},
		{
			"id": "PO_Numero_Aleatorio",
			"name": "Numero aleatorio",
			"categories": [],
			"commercialEnrichments": [],
			"featureCharacteristics": [],
			"inputCharacteristics": {
				"CH_Already_Paid": {
					"values": [],
					"description": "CH_Already_Paid",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_Already_Paid",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
				"CH_SKU": {
					"values": [
						{
							"name": "Numero Aleatorio",
							"value": "Numero Aleatorio"
						}
					],
					"description": "CH_SKU",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_SKU",
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
				"CH_CBS_OfferingID": {
					"values": [
						{
							"name": "900074",
							"value": "900074"
						}
					],
					"description": "CH_CBS_OfferingID",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_CBS_OfferingID",
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
				"CH_BypassFOM": {
					"values": [
						{
							"name": "FALSE",
							"value": "FALSE"
						}
					],
					"description": "CH_BypassFOM",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_BypassFOM",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
			"prices": [],
			"priority": null,
			"productOfferingGroups": [],
			"productOfferings": [],
			"specificationId": "PO_Numero_Aleatorio",
			"productId": "Numero Aleatorio",
			"specType": "PRODUCT",
			"specSubType": "SERVICE",
			"stockLevel": null,
			"msisdns": null,
			"bundlingProductOfferings": null,
			"alternateProductOfferings": null
		},
		{
			"id": "PO_Numeros_Faciles",
			"name": "Numeros fáciles",
			"categories": [],
			"commercialEnrichments": [],
			"featureCharacteristics": [],
			"inputCharacteristics": {
				"CH_Already_Paid": {
					"values": [],
					"description": "CH_Already_Paid",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_Already_Paid",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
				"number-type": {
					"values": [
						{
							"name": "Numeros Faciles",
							"value": "Numeros Faciles"
						}
					],
					"description": "number-type",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "number-type",
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
				"CH_SKU": {
					"values": [
						{
							"name": "Numeros Faciles",
							"value": "Numeros Faciles"
						}
					],
					"description": "CH_SKU",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_SKU",
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
				"CH_CBS_OfferingID": {
					"values": [
						{
							"name": "900073",
							"value": "900073"
						}
					],
					"description": "CH_CBS_OfferingID",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_CBS_OfferingID",
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
				"CH_BypassFOM": {
					"values": [
						{
							"name": "FALSE",
							"value": "FALSE"
						}
					],
					"description": "CH_BypassFOM",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_BypassFOM",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
			"prices": [],
			"priority": null,
			"productOfferingGroups": [],
			"productOfferings": [],
			"specificationId": "PO_Numeros_Faciles",
			"productId": "Numeros Faciles",
			"specType": "PRODUCT",
			"specSubType": "SERVICE",
			"stockLevel": null,
			"msisdns": null,
			"bundlingProductOfferings": null,
			"alternateProductOfferings": null
		},
		{
			"id": "PO_Super_Faciles",
			"name": "Super Faciles",
			"categories": [],
			"commercialEnrichments": [],
			"featureCharacteristics": [],
			"inputCharacteristics": {
				"CH_Already_Paid": {
					"values": [],
					"description": "CH_Already_Paid",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_Already_Paid",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
				"number-type": {
					"values": [
						{
							"name": "Super Faciles",
							"value": "Super Faciles"
						}
					],
					"description": "number-type",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "number-type",
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
				"CH_SKU": {
					"values": [
						{
							"name": "Super Faciles",
							"value": "Super Faciles"
						}
					],
					"description": "CH_SKU",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_SKU",
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
				"CH_CBS_OfferingID": {
					"values": [
						{
							"name": "900071",
							"value": "900071"
						}
					],
					"description": "CH_CBS_OfferingID",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_CBS_OfferingID",
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
				"CH_BypassFOM": {
					"values": [
						{
							"name": "FALSE",
							"value": "FALSE"
						}
					],
					"description": "CH_BypassFOM",
					"source": null,
					"subType": null,
					"mandatory": true,
					"validation": null,
					"name": "CH_BypassFOM",
					"priority": null,
					"valueRegulator": null,
					"purpose": null,
					"dataType": "BOOLEAN",
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
			"prices": [],
			"priority": null,
			"productOfferingGroups": [],
			"productOfferings": [],
			"specificationId": "PO_Super_Faciles",
			"productId": "Super Faciles",
			"specType": "PRODUCT",
			"specSubType": "SERVICE",
			"stockLevel": null,
			"msisdns": null,
			"bundlingProductOfferings": null,
			"alternateProductOfferings": null
		}
	]
} as any as PosMsisdnConfigurationModalProps;

export default props;
