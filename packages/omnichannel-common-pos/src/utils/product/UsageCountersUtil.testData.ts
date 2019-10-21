import { Product } from "../../redux/types";

const PRODUCT_WITH_USAGE_COUNTERS = ({
	id: "juanita-agreement1-loan",
	name: "Product Loan 15",
	productOfferingId: "loan-15-po",
	lifeCycleStatus: "ACTIVE",
	usageCounters: [
		{
			id: "juanita-loan-usage-counter-fee",
			counterId: undefined,
			name: "Outstanding loan fee",
			value: 0.2,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Fee"
		},
		{
			id: "juanita-loan-usage-counter-credit",
			counterId: undefined,
			name: "Remaining loan credit",
			value: 1.7,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Credit"
		},
		{
			id: "juanita-loan-usage-counter-debt",
			counterId: undefined,
			name: "Outstanding loan amount",
			value: 1.4,
			limits: [],
			validFor: {
				startDate: "2018-10-04T00:00:00Z",
				endDate: undefined
			},
			unitOfMeasure: "MONETARY",
			currency: "USD",
			service: undefined,
			category: "Debt"
		}
	],
	realizingResources: [],
	realizingServices: [],
	characteristics: {
		T_DUE_DATE: "2020-03-14T17:20:00.000Z"
	},
	commercialEnrichments: [
		{
			conditions: {},
			descriptions: {
				detailed: "This is a loan product specification",
				description: "Product loan which gives 15 usd credit"
			},
			media: {},
			names: {
				"long-name": "Talktime Loan 15",
				"short-name": "Talktime Loan PS 15"
			},
			language: undefined
		}
	],
	childProducts: [],
	categories: ["Loan Products"],
	categoriesIds: ["resMobPreLoan"],
	parentProducts: [],
	specType: undefined,
	specSubType: undefined,
	user: undefined,
	owner: undefined,
	payer: undefined,
	validFor: {
		startDate: "2017-07-07T00:00:00Z",
		endDate: undefined
	},
	prices: [
		{
			type: "ONE_TIME",
			name: undefined,
			chargedUnit: {
				amount: 1,
				currency: undefined,
				unitOfMeasure: "PIECES"
			},
			taxAmount: undefined,
			taxFreeAmount: 2,
			taxIncludedAmount: undefined,
			taxRate: 0,
			recurringChargePeriod: undefined,
			currency: "USD",
			conditions: undefined,
			originalPrice: undefined
		}
	],
	simCards: undefined,
	billingAccountIds: [],
	chargingBalances: [],
	allowedTransitions: [],
	agreementId: "xxx",
	instanceCharacteristics: {},
	allowances: [
		{
			unitOfMeasure: "MONETARY",
			value: 15,
			interval: undefined,
			externalId: undefined,
			group: "Loan Credit",
			destination: [],
			commercialEnrichments: []
		},
		{
			unitOfMeasure: "MONETARY",
			value: 17,
			interval: undefined,
			externalId: undefined,
			group: "Loan Amount",
			destination: [],
			commercialEnrichments: []
		}
	],
	enhancedCharacteristics: {},
	isPlan: false,
	hasAlternateOfferings: false
} as Partial<Product>) as Product;

export { PRODUCT_WITH_USAGE_COUNTERS };
