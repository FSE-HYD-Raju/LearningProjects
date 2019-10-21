"use strict";
import { ResourceInventories, MsisdnReservation } from "../../../types";

export const mockedResouceInventoryStocks = {
	data: [
		{
			attributes: {
				characteristics: {},
				extReferenceId: "",
				inventoryType: "msisdn-zone",
				name: "All"
			},
			id: "85d06156-6f94-50d6-bdf6-80b116b52120",
			links: {
				self: "/api/resource-inventories/85d06156-6f94-50d6-bdf6-80b116b52120"
			},
			meta: {
				brand: null
			},
			relationships: {
				stocks: {
					data: [
						{
							id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
							type: "resource-stocks"
						}
					],
					links: {
						related: "/api/resource-inventories/85d06156-6f94-50d6-bdf6-80b116b52120/stocks"
					}
				}
			},
		type: "resource-inventories"
	}],
	included: [
	{
			attributes: {
				characteristics: {},
				description: null,
				extReferenceId: "QV",
				name: "NUMERO ALEATORIO",
				resourceSKU: "Numero Aleatorio",
				resourceType: "msisdns",
				stockClassification: null,
				stockType: "normal"
			},
			id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
			links: {
				self: "/api/resource-stocks/5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f"
			},
			meta: {
				brand: null
			},
			relationships: {
				"resource-inventory": {
					data: {
						id: "85d06156-6f94-50d6-bdf6-80b116b52120",
						type: "resource-inventories"
					},
					links: {
						related: "/api/resource-stocks/5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f/resource-inventory"
					}
				},
				resources: {
					links: {
						related: "/api/resource-stocks/5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f/resources"
					}
				}
			},
			type: "resource-stocks"
		}]
};

export const mockedChangeResouceInventoryStocks = {
	data: [{
		id: "f8ae673d-2b80-5d05-8bfa-f0e713d0b0cd",
		type: "resource-inventories",
		attributes: {
			characteristics: {
				BRANCH_CODE: "3"
			},
			inventoryType: "msisdn-zone",
			name: "Santa Cruz",
			extReferenceId: "505"
		},
		relationships: {
			stocks: {
				data: [{
					id: "06c6b624-c6b6-50c5-8f0e-a8871e3c47a6",
					type: "resource-stocks"
				}, {
					id: "1947a250-d8d9-542b-aed9-8669ec9376b9",
					type: "resource-stocks"
				}, {
					id: "40374d72-9c83-5b98-8b27-97a95b70dbd2",
					type: "resource-stocks"
				}]
			}
		}
	}, {
		id: "48e8e7d5-ed36-5f72-aa5f-31073f3b1e88",
		type: "resource-inventories",
		attributes: {
			characteristics: {
				BRANCH_CODE: "2"
			},
			inventoryType: "msisdn-zone",
			name: "Cochabamba",
			extReferenceId: "498"
		},
		relationships: {
			stocks: {
				data: [{
					id: "05b2a8f1-22f2-5f37-9ae5-33862f67b447",
					type: "resource-stocks"
				}, {
					id: "0b427067-1655-5402-9ad8-385f47ab0a9b",
					type: "resource-stocks"
				}]
			}
		}
	}],
	included: [{
		id: "1947a250-d8d9-542b-aed9-8669ec9376b9",
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
		}
	}, {
		id: "00949759-c3a2-5a98-90bc-48506be6a01e",
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
		}
	}, {
		id: "011da9e0-e3ae-5b92-a1a2-2c21c97bf44d",
		type: "resource-stocks",
		attributes: {
			characteristics: {},
			stockType: "lucky",
			stockClassification: null,
			name: "TIGO-SUPER FACILES",
			extReferenceId: "TIGO",
			description: null,
			resourceSKU: "Tigo-Super Faciles",
			resourceType: "msisdns"
		}
	}, {
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
		}
	}, {
		id: "06c6b624-c6b6-50c5-8f0e-a8871e3c47a6",
		type: "resource-stocks",
		attributes: {
			characteristics: {},
			stockType: "normal",
			stockClassification: null,
			name: "TIGO-UGLY",
			extReferenceId: "TIGO",
			description: null,
			resourceSKU: "Tigo-Ugly",
			resourceType: "msisdns"
		}
	}]
};

export const mockedFilteredStocks = {
	included: [{
		id: "1947a250-d8d9-542b-aed9-8669ec9376b9",
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
		}
	}, {
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
		}
	}, {
		id: "06c6b624-c6b6-50c5-8f0e-a8871e3c47a6",
		type: "resource-stocks",
		attributes: {
			characteristics: {},
			stockType: "normal",
			stockClassification: null,
			name: "TIGO-UGLY",
			extReferenceId: "TIGO",
			description: null,
			resourceSKU: "Tigo-Ugly",
			resourceType: "msisdns"
		}
	}]
};

export const mockedSelectedResourceInventory: ResourceInventories = {
	id: "85d06156-6f94-50d6-bdf6-80b116b52120",
	attributes: {
		characteristics: {},
		extReferenceId: "",
		inventoryType: "msisdn-zone",
		name: "All"
	}
} as any as ResourceInventories;

export const mockedMsisdnError = {
	error: {
		errors: [
			{
				status: "500",
				code: "error-code",
				title: "Title",
				detail: "Detail"
			}
		],
		status: 500
	}
};

export const mockedMsisdnsReservationSuccess = {
	id: "kopo",
	attributes: {
		msisdns: ["0401231234", "0501231234"],
		reservedFor: "koponen"
	},
	type: "msisdn-reservations"
};

export const mockedMsisdnReservation: MsisdnReservation = {
	id: "test",
	attributes: {
		id: "msisdn1",
		reservedFor: "11111-22222-33333-44444-55555",
		msisdns: mockedMsisdnsReservationSuccess.attributes.msisdns,
		poId: "pattern-po",
		price: {},
		stock: "stock-1"
	}
} as any as MsisdnReservation;

export const mockedReserveMsisdn: MsisdnReservation = {
	data: [
		{
			attributes: {
				endTime: "2019-08-22T11:39:26.743Z",
				reservedFor: "c59f5603-859a-44d3-8875-44b9c80b9de8",
				limit: 9,
				pattern: "",
				stock: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
				type: "msisdn-reservations"
			}
		}]
} as any as MsisdnReservation;

export const mockedReserveMsisdnInput = {
	attributes: {
		endTime: "2019-08-22T11:39:26.743Z",
		reservedFor: "c59f5603-859a-44d3-8875-44b9c80b9de8",
		limit: 9,
		pattern: "",
		stock: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
		type: "msisdn-reservations",
		numberType: "",
		releaseId: "",
		product: {
			attributes: {
				id: "PO_Plan_Postpaid_Base"
			}
		}
	}
};

export const mockedReleaseMsisdn: MsisdnReservation = {
	releaseId: "9af6f573-bd3b-4888-963b-aa61cd13f26b"
} as any as MsisdnReservation;

export const mockedMsisdnReservationError = {
	error: {
		errors: [
			{
				status: "500",
				code: "error-code",
				title: "Title",
				detail: "Detail"
			}
		],
		status: 500
	}
};

export const mockedReserveMsisdnResponse = {
	data: {
		attributes: {
			"end-datetime": "2019-08-27T06:50:02.066Z",
			limit: 9,
			"number-type": null,
			"owned-by": "",
			pattern: null,
			"reserved-for": "75cac01d-a50a-46ba-90b3-c6c540bf9650"
		},
		id: "75cac01d-a50a-46ba-90b3-c6c540bf9650",
		links: {
			self: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650"
		},
		meta: {
			brand: null
		},
		relationships: {
			msisdns: {
				data: [{
					id: "573020004212",
					type: "msisdns"
				},
				{
					id: "573020004440",
					type: "msisdns"
				},
				{
					id: "573020003774",
					type: "msisdns"
				},
				{
					id: "573020004434",
					type: "msisdns"
				},
				{
					id: "573020004237",
					type: "msisdns"
				},
				{
					id: "573020004338",
					type: "msisdns"
				},
				{
					id: "573020003719",
					type: "msisdns"
				},
				{
					id: "573020004215",
					type: "msisdns"
				},
				{
					id: "573020004417",
					type: "msisdns"
				}
				],
				links: {
					related: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650/msisdns"
				}
			},
			stock: {
				data: {
					id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
					type: "resource-stocks"
				},
				links: {
					related: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650/stock"
				}
			}
		},
		type: "msisdn-reservations"
	},
	included: [{
		attributes: {
			"associated-with": null,
			characteristics: {},
			"is-ported-in": null,
			"lifecycle-status": "reserved",
			number: "573020004417",
			"number-type": "voice",
			"owned-by": "",
			"primary-id": "573020004417",
			"quarantine-ends": null,
			"reserved-for": "75cac01d-a50a-46ba-90b3-c6c540bf9650",
			sku: "Numero Aleatorio",
			"valid-for": {
				"end-datetime": null,
				meta: {
					type: "valid-for-datetime"
				},
				"start-datetime": "2018-03-12T12:00:00.000Z"
			}
		},
		id: "573020004417",
		links: {
			self: "/api/msisdns/573020004417"
		},
		meta: {
			brand: null
		},
		relationships: {
			batch: {
				data: {
					id: "b1f3486f-0ef5-42d8-9791-901a6210dacd",
					type: "resource-batches"
				},
				links: {
					related: "/api/msisdns/573020004417/batch"
				}
			},
			"related-resources": {
				links: {
					related: "/api/msisdns/573020004417/related-resources"
				}
			},
			stock: {
				data: {
					id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
					type: "resource-stocks"
				},
				links: {
					related: "/api/msisdns/573020004417/stock"
				}
			}
		},
		type: "msisdns"
	},
	{
		attributes: {
			"associated-with": null,
			characteristics: {},
			"is-ported-in": null,
			"lifecycle-status": "reserved",
			number: "573020004338",
			"number-type": "voice",
			"owned-by": "",
			"primary-id": "573020004338",
			"quarantine-ends": null,
			"reserved-for": "75cac01d-a50a-46ba-90b3-c6c540bf9650",
			sku: "Numero Aleatorio",
			"valid-for": {
				"end-datetime": null,
				meta: {
					type: "valid-for-datetime"
				},
				"start-datetime": "2018-03-12T12:00:00.000Z"
			}
		},
		id: "573020004338",
		links: {
			self: "/api/msisdns/573020004338"
		},
		meta: {
			brand: null
		},
		relationships: {
			batch: {
				data: {
					id: "b1f3486f-0ef5-42d8-9791-901a6210dacd",
					type: "resource-batches"
				},
				links: {
					related: "/api/msisdns/573020004338/batch"
				}
			},
			"related-resources": {
				links: {
					related: "/api/msisdns/573020004338/related-resources"
				}
			},
			stock: {
				data: {
					id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
					type: "resource-stocks"
				},
				links: {
					related: "/api/msisdns/573020004338/stock"
				}
			}
		},
		type: "msisdns"
	}
	]
};

export const mockedReserveMsisdnResponse1 = {
	data: {
		attributes: {
			endTime: "2019-08-27T06:50:02.066Z",
			limit: 9,
			"number-type": null,
			"owned-by": "",
			pattern: null,
			reservedFor: "75cac01d-a50a-46ba-90b3-c6c540bf9650"
		},
		id: "75cac01d-a50a-46ba-90b3-c6c540bf9650",
		links: {
			self: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650"
		},
		meta: {
			brand: null
		},
		relationships: {
			msisdns: {
				data: [{
					id: "573020004212",
					type: "msisdns"
				},
				{
					id: "573020004440",
					type: "msisdns"
				},
				{
					id: "573020003774",
					type: "msisdns"
				},
				{
					id: "573020004434",
					type: "msisdns"
				},
				{
					id: "573020004237",
					type: "msisdns"
				},
				{
					id: "573020004338",
					type: "msisdns"
				},
				{
					id: "573020003719",
					type: "msisdns"
				},
				{
					id: "573020004215",
					type: "msisdns"
				},
				{
					id: "573020004417",
					type: "msisdns"
				}
				],
				links: {
					related: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650/msisdns"
				}
			},
			stock: {
				data: {
					id: "5a1cf6e7-ccfa-5c4f-a961-a4dc57b3556f",
					type: "resource-stocks"
				},
				links: {
					related: "/api/msisdn-reservations/75cac01d-a50a-46ba-90b3-c6c540bf9650/stock"
				}
			}
		},
		type: "msisdn-reservations"
	}
};
