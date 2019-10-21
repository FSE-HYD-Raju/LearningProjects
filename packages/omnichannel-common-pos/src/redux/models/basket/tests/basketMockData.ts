import { Basket } from "../../../types";
import { BasketItems } from "../basket.types";
import { BasketItem } from "../../../types";

export const getBasketResp = ({
	data: {
		id: "c3fc1a90-786c-4227-b59d-5f25c21a3889",
		type: "baskets",
		attributes: {},
		relationships: { owner: { data: null }, payer: { data: null } },
	},
} as any) as Basket;

export const basketItem = ({
	id: "test2",
	attributes: {},
	relationships: {},
	type: "basketItems",
} as any) as BasketItem;

export const filteredBasketItems: BasketItems = ([
	{
		id: "test1",
		attributes: {},
		relationships: {},
		type: "basketItems",
	},
	{
		id: "test3",
		attributes: {},
		relationships: {},
		type: "basketItems",
	},
] as any) as BasketItems;

export const basketItems: BasketItems = ([
	{
		id: "test1",
		attributes: {},
		relationships: {},
		type: "basketItems",
	},
	{
		id: "test2",
		attributes: {},
		relationships: {},
		type: "basketItems",
	},
	{
		id: "test3",
		attributes: {},
		relationships: {},
		type: "basketItems",
	},
] as any) as BasketItems;

export const getIncludeBasketData = {
	basket: ({
		id: "3b5c2182-d700-4d93-aa0e-376a3c6e4886",
		type: "baskets",
		attributes: {},
		relationships: {
			owner: {
				data: null,
			},
			basketItems: {
				data: [
					{
						id: "79305efa-280a-4907-a346-aed231c14968",
						type: "basketItems",
					},
					{
						id: "9ce9eabe-e7b8-4110-9453-38ba4502f54e",
						type: "basketItems",
					},
				],
			},
			payer: {
				data: null,
			},
		},
	} as any) as Basket,
	basketItems: ([
		{
			id: "c3fc1a9",
			type: "basketItems",
			attributes: {},
			relationships: { owner: { data: null }, payer: { data: null } },
		},
		{
			id: "c3fc1a90",
			type: "basketItems",
			attributes: {},
			relationships: { owner: { data: null }, payer: { data: null } },
		},
	] as any) as BasketItems,
	basketItemIdToAddressEntries: [],
};

export const activeBasketInit = ({
	attributes: {
		billingAddress: null,
		created: null,
		createdAt: "2019-09-12T04:41:09.805Z",
		deliveryContactMediumId: null,
		expiresAt: "2019-09-26T04:43:35.216Z",
		lastModifiedAt: "2019-09-12T04:43:35.216Z",
		lifecycleStatus: "OPEN",
		modified: null,
		referenceNumber: "H2543555934328",
		"sales - context": {},
		totalPrices: [
			{
				chargedUnit: {
					amount: 79,
					currency: "EUR",
					unitOfMeasure: "MONETARY",
				},
				currency: "EUR",
				isUpfront: false,
				recurringChargePeriod: {
					count: 1,
					interval: "MONTH",
				},
				taxAmount: 0,
				taxFreeAmount: 89,
				taxIncludedAmount: 89,
				taxRate: 0,
				type: "RECURRENT",
			},
			{
				chargedUnit: {
					amount: 50,
					currency: "EUR",
					unitOfMeasure: "MONETARY",
				},
				currency: "EUR",
				isUpfront: true,
				taxAmount: 0,
				taxFreeAmount: 80,
				taxIncludedAmount: 80,
				taxRate: 0,
				type: "ONE_TIME",
			},
		],
		totalUpfrontPrice: 80,
		upfrontPrices: true,
		id: "2cd9dd62-74d6-470c-a759-c526b1088943",
		relationships: {
			owner: {
				data: null,
			},
			payer: {
				data: null,
			},
		},
		type: "baskets",
	},
} as any) as Basket;

export const activeBasketUp = ({
	attributes: {
		billingAddress: null,
		created: null,
		createdAt: "2019-09-12T04:41:09.805Z",
		deliveryContactMediumId: null,
		expiresAt: "2019-09-26T04:43:35.216Z",
		lastModifiedAt: "2019-09-12T04:43:35.216Z",
		lifecycleStatus: "OPEN",
		modified: null,
		referenceNumber: "H2543555934328",
		"sales-context": {},
		totalPrices: [
			{
				chargedUnit: { amount: 10, currency: "EUR", unitOfMeasure: "MONETARY" },
				currency: "EUR",
				isUpfront: false,
				recurringChargePeriod: { count: 1, interval: "MONTH" },
				taxAmount: 0,
				taxFreeAmount: 10,
				taxIncludedAmount: 10,
				taxRate: 0,
				type: "RECURRENT",
			},
			{
				chargedUnit: { amount: 50, currency: "EUR", unitOfMeasure: "MONETARY" },
				currency: "EUR",
				isUpfront: true,
				taxAmount: 0,
				taxFreeAmount: 80,
				taxIncludedAmount: 80,
				taxRate: 0,
				type: "ONE_TIME",
			},
		],
		totalUpfrontPrice: 80,
		upfrontPrices: true,
	},

	id: "2cd9dd62-74d6-470c-a759-c526b1088943",
	relationships: {
		owner: { data: null },
		payer: { data: null },
	},

	type: "baskets",
} as any) as Basket;
