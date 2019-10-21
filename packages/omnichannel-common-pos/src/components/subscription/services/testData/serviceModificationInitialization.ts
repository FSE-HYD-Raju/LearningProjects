import {
	Basket,
	BasketItem,
	Price,
	ProductOffering,
	Service,
	ServiceModificationInitialization, ServiceModificationCombined, ProductModificationCombined
} from "../../../../redux/types";

const stateTransitionPrice: Price = {
	type: "ONE_TIME",
	taxFreeAmount: 2,
	currency: "EUR"
};

const hugeStateTransitionPrice: Price = {
	type: "ONE_TIME",
	taxFreeAmount: 1000,
	currency: "EUR"
};

const mockService: Service = {
	id: "juanita-agreement1-voicesms-ser1",
	primaryId: "CFS_voice_1000",
	lifeCycleStatus: "ACTIVE",
	type: "voice",
	allowedTransitions: [
		{
			id: "disable",
			name: "disable",
			targetType: "service"
		}
	],
	usageCounters: [],
	characteristics: {},
	instanceCharacteristics: {},
	specification: {
		name: "CFS_voice_1000",
		id: "voice1000",
		specSubType: "VOICE",
		specType: "SERVICE",
		instanceCharacteristics: {},
		inputCharacteristics: {},
		featureCharacteristics: []
	}
};

const serviceModificationInitializationResource: ServiceModificationInitialization =  {
	id: "",
	attributes: {
		id: "",
		productOfferingId: "fav-num-po",
		owner: {
			id: undefined,
			customerAccountId: undefined,
			billingAccountId: undefined,
			firstName: undefined,
			lastName: undefined,
			birthDay: undefined,
			avatar: undefined,
			emails: [],
			mobileNumbers: [],
			fixedLineNumbers: [],
			postalAddresses: [],
			personRelationships: undefined,
			identifications: [],
			honorificPrefix: undefined,
			additionalName: undefined,
			honorificSuffix: undefined,
			formattedName: undefined,
			gender: undefined,
			maritalStatus: undefined,
			nationality: undefined,
			placeOfBirth: undefined,
			countryOfBirth: undefined,
			language: undefined,
			privacySettings: undefined,
			characteristics: undefined,
		},
		productId: "juanita-agreement1-addon-favnum",
		agreementId: "juanita-agreement1-sub",
		stateTransition: "DISABLE",
		paymentMethods: [
			{
				id: "balance",
				balance: 100,
				label: "Main balance"
			}
		]
	},
} as any as ServiceModificationInitialization;

const productModificationInitializationBasket: Basket = {
	id: "a5828bac-8cb8-40b1-a021-26a96a90441e",
	attributes: {
		id: "a5828bac-8cb8-40b1-a021-26a96a90441e",
		createdAt: "2017-09-14T15:10:19.602Z",
		lastModifiedAt: undefined,
		lifecycleStatus: "OPEN",
		referenceNumber: "e9c80c2b-a88f-49ec-8fe5-8bf4eab734cb",
		created: undefined,
		totalPrices: [],
		modified: undefined,
		billingAddress: undefined,
		expiresAt: undefined
	}
} as any as Basket;

const productModificationInitializationProducts: Array<ProductOffering> = [
	{
		categories: [],
		commercialEnrichments: [],
		featureCharacteristics: [],
		id: "fav-num-po",
		name: "Favorite numbers",
		inputCharacteristics: {
			number3: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: undefined,
				subType: undefined,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: undefined
			},
			number4: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: undefined,
				subType: undefined,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: undefined
			},
			number1: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: undefined,
				subType: undefined,
				mandatory: true,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: undefined
			},
			number2: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: undefined,
				subType: undefined,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: undefined
			},
			number5: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: undefined,
				subType: undefined,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: undefined
			}
		},
		instanceCharacteristics: {},
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
				taxFreeAmount: 1,
				taxRate: 0,
				recurringChargePeriod: undefined,
				currency: "EUR",
				conditions: undefined,
				originalPrice: undefined
			},
			{
				type: "RECURRENT",
				name: undefined,
				chargedUnit: {
					amount: 1,
					currency: undefined,
					unitOfMeasure: "PIECES"
				},
				taxAmount: undefined,
				taxFreeAmount: 4.5,
				taxRate: 0,
				recurringChargePeriod: {
					count: 1,
					interval: "MONTH"
				},
				currency: "EUR",
				conditions: undefined,
				originalPrice: undefined
			}
		],
		priority: undefined,
		productOfferingGroups: [],
		productOfferings: [],
		specificationId: "fav-num",
		msisdns: undefined,
		bundlingProductOfferings: undefined
	} as ProductOffering
];

const productModificationInitializationBasketItems: Array<BasketItem> = [
	{
		id: "2ab15884-771b-4360-a220-cdd40a2a0659",
		attributes: {
			targetLifecycleStatus: "terminated",
			createdAt: "2017-09-14T15:10:19.628Z",
			product: {
				categories: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				id: "fav-num-po",
				name: "Favorite numbers",
				inputCharacteristics: {
					number3: {
						values: [],
						description:
							"The mobile number of a person close to your heart.",
						source: undefined,
						subType: undefined,
						mandatory: false,
						validation: "^\\+358 [1-9](\\d) (\\d){7}$",
						name: "Favorite number",
						priority: undefined
					},
					number4: {
						values: [],
						description:
							"The mobile number of a person close to your heart.",
						source: undefined,
						subType: undefined,
						mandatory: false,
						validation: "^\\+358 [1-9](\\d) (\\d){7}$",
						name: "Favorite number",
						priority: undefined
					},
					number1: {
						values: [],
						description:
							"The mobile number of a person close to your heart.",
						source: undefined,
						subType: undefined,
						mandatory: true,
						validation: "^\\+358 [1-9](\\d) (\\d){7}$",
						name: "Favorite number",
						priority: undefined
					},
					number2: {
						values: [],
						description:
							"The mobile number of a person close to your heart.",
						source: undefined,
						subType: undefined,
						mandatory: false,
						validation: "^\\+358 [1-9](\\d) (\\d){7}$",
						name: "Favorite number",
						priority: undefined
					},
					number5: {
						values: [],
						description:
							"The mobile number of a person close to your heart.",
						source: undefined,
						subType: undefined,
						mandatory: false,
						validation: "^\\+358 [1-9](\\d) (\\d){7}$",
						name: "Favorite number",
						priority: undefined
					}
				},
				instanceCharacteristics: {},
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
						taxFreeAmount: 1,
						taxRate: 0,
						recurringChargePeriod: undefined,
						currency: "EUR",
						conditions: undefined,
						originalPrice: undefined
					},
					{
						type: "RECURRENT",
						name: undefined,
						chargedUnit: {
							amount: 1,
							currency: undefined,
							unitOfMeasure: "PIECES"
						},
						taxAmount: undefined,
						taxFreeAmount: 4.5,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: undefined,
						originalPrice: undefined
					}
				],
				priority: undefined,
				productOfferingGroups: [],
				productOfferings: [],
				specificationId: "fav-num",
				msisdns: undefined,
				bundlingProductOfferings: undefined
			},
			targetAgreementId: "juanita-agreement1-sub",
			quantity: 1,
			lastModifiedAt: "2017-09-14T15:10:19.628Z",
			inputtedCharacteristics: {},
			totalPrices: [],
			childBasketItems: [],
			action: undefined,
			unitPrices: []
		}
	} as any as BasketItem
];

const serviceModificationInitialization: ServiceModificationCombined = {
	resource: serviceModificationInitializationResource,
	basket: productModificationInitializationBasket,
	basketItems: productModificationInitializationBasketItems
};

const productModificationInitialization: ProductModificationCombined = {
	resource: {id: "123"},
	products: productModificationInitializationProducts,
	basket: productModificationInitializationBasket,
	basketItems: productModificationInitializationBasketItems
};

export {
	productModificationInitialization,
	serviceModificationInitialization,
	stateTransitionPrice,
	hugeStateTransitionPrice,
	mockService
};
