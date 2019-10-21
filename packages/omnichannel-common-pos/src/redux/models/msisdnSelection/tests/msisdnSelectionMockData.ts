/* tslint:disable:max-line-length */
"use strict";

import { MsisdnReservationCreate, ProductOffering, MsisdnReservation } from "../../../types";
import { INSTANCE_CHARACTERISTIC_KEY_STOCK_ID, INSTANCE_CHARACTERISTIC_KEY_USE_CASE } from "../msisdnSelection.utils";
import { MsisdnSelectionUseCase } from "../msisdnSelection.types";

export const testPo: ProductOffering = {
	id: "noice-po",
	name: "Nice PO",
	categories: [],
	featureCharacteristics: [],
	inputCharacteristics: {},
	instanceCharacteristics: {},
	prices: [],
	commercialEnrichments: [],
	productOfferingGroups: [
		{
			id: "noice-pog",
			name: "Nice POG",
			productOfferings: [
				{
					id: "pattern-po",
					name: "Siika syli kopo easter egg",
					categories: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {
						[INSTANCE_CHARACTERISTIC_KEY_USE_CASE]: {
							mandatory: false,
							values: [
								{
									name: INSTANCE_CHARACTERISTIC_KEY_USE_CASE,
									value: MsisdnSelectionUseCase.PATTERN_SEARCH
								}
							]
						},
						[INSTANCE_CHARACTERISTIC_KEY_STOCK_ID]: {
							mandatory: false,
							values: [{ name: INSTANCE_CHARACTERISTIC_KEY_STOCK_ID, value: "stock-1" }]
						}
					},
					prices: [],
					commercialEnrichments: [],
					productOfferingGroups: [],
					productOfferings: []
				},
				{
					id: "bad-po",
					name: "Bad PO",
					categories: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {
						[INSTANCE_CHARACTERISTIC_KEY_USE_CASE]: {
							mandatory: false,
							values: [
								{ name: INSTANCE_CHARACTERISTIC_KEY_USE_CASE, value: MsisdnSelectionUseCase.SELECT }
							]
						},
						[INSTANCE_CHARACTERISTIC_KEY_STOCK_ID]: {
							mandatory: false,
							values: [{ name: INSTANCE_CHARACTERISTIC_KEY_STOCK_ID, value: "stock-2" }]
						}
					},
					prices: [],
					commercialEnrichments: [],
					productOfferingGroups: [],
					productOfferings: []
				},
				{
					id: "pattern-po-2",
					name: "Nice pattern PO dis too",
					categories: [],
					featureCharacteristics: [],
					inputCharacteristics: {},
					instanceCharacteristics: {
						[INSTANCE_CHARACTERISTIC_KEY_USE_CASE]: {
							mandatory: false,
							values: [
								{
									name: INSTANCE_CHARACTERISTIC_KEY_USE_CASE,
									value: MsisdnSelectionUseCase.PATTERN_SEARCH
								}
							]
						},
						[INSTANCE_CHARACTERISTIC_KEY_STOCK_ID]: {
							mandatory: false,
							values: [{ name: INSTANCE_CHARACTERISTIC_KEY_STOCK_ID, value: "stock-3" }]
						}
					},
					prices: [],
					commercialEnrichments: [],
					productOfferingGroups: [],
					productOfferings: []
				}
			],
			msisdnGroup: true
		}
	],
	productOfferings: []
};

export const mockedMsisdnsReservationSuccess = {
	id: "kopo",
	attributes: {
		msisdns: ["0401231234", "0501231234"],
		reservedFor: "koponen"
	},
	type: "msisdn-reservations"
};

export const mockedMsisdnsReservationSuccess2 = {
	id: "siika",
	attributes: {
		msisdns: ["0912341234"],
		reservedFor: "siikanen"
	},
	type: "msisdn-reservations"
};

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

export const mockedMsisdnReservationCreate: MsisdnReservationCreate | any = {
	attributes: {
		reservedFor: "11111-22222-33333-44444-55555",
		pattern: "123"
	}
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

export const mockedMsisdnReservationX: MsisdnReservation = {
	id: "test",
	attributes: {
		id: "msisdn1",
		reservedFor: "11111-22222-33333-44444-55555",
		msisdns: mockedMsisdnsReservationSuccess.attributes.msisdns,
		poId: "pattern-po-2",
		price: {},
		stock: "stock-3"
	}
} as any as MsisdnReservation;

export const mockedMsisdnReservation2: MsisdnReservation = {
	id: "test2",
	attributes: {
		id: "msisdn2",
		reservedFor: "11111-22222-33333-44444-55555",
		msisdns: ["0912341234"]
	}
} as any as MsisdnReservation;
