import _ from "lodash";
import R from "ramda";

const firstDateThisWeek = () => {
	const date = new Date();
	while (date.getDay() !== 0) {
		date.setDate(date.getDate() - 1);
	}
	return date;
};

const people = [
	{
		firstName: "Kathrin",
		lastName: "K",
		gender: "female",
		language: "swe",
		countryOfBirth: "SE",
		birthDay: firstDateThisWeek(),
		emails: [{ email: "kathrin.k@qvantel.com" }],
		email: "kathrin.k@qvantel.com",
		mobileNumbers: [{ number: "2398457" }],
		mobileNumber: "2398457",
		fixedLineNumbers: [{ number: "2398457" }],
		fixedLineNumber: "2398457",
		password: "qwerasdf",
		passwordConfirmation: "qwerasdf"
	},
	{
		firstName: "John",
		lastName: "Smith",
		gender: "male",
		language: "fin",
		birthDay: firstDateThisWeek(),
		countryOfBirth: "United Kingdom",
		emails: [{ email: "john.smith@qvantel.com" }],
		email: "john.smith@qvantel.com",
		mobileNumbers: [{ number: "3498573" }],
		mobileNumber: "3498573",
		fixedLineNumbers: [{ number: "52497584" }],
		fixedLineNumber: "52497584"
	}
];

const basketItems = [
	{
		id: "7879c247-9e98-40ee-bb48-544eb366494a",
		type: "basketItems",
		attributes: {
			product: {
				name: "Movie Steaming Service"
			},
			totalPrices: [
				{
					type: "ONE_TIME",
					taxFreeAmount: 1.9,
					taxRate: 0,
					currency: "EUR"
				},
				{
					type: "RECURRENT",
					taxFreeAmount: 14.9,
					taxRate: 0,
					currency: "EUR"
				}
			],
			childBasketItems: [],
			totalUpfrontPrice: 1.9,
			totalUpfrontPriceWithChildren: 1.9
		}
	},
	{
		id: "c0065ffc-77f4-4e44-b15c-fbd2f78d04ce",
		type: "basketItems",
		attributes: {
			product: {
				name: "XDSL"
			},
			totalPrices: [
				{
					type: "ONE_TIME",
					taxFreeAmount: 100.6,
					taxRate: 0,
					currency: "EUR"
				},
				{
					type: "RECURRENT",
					taxFreeAmount: 30,
					taxRate: 0,
					currency: "EUR"
				}
			],
			childBasketItems: []
		}
	}
];

const deliveryItem = {
	id: "c0065ffc-77f4-4e44-b15c-fbd2f78d04ce",
	type: "basketItems",
	inputtedCharacteristics: {
		CH_Delivery_Contact_Info: "5c5dddf6-72be-4d0a-9711-6027f247af28"
	},
	product: {
		name: "Home delivery",
		id: "PO_Home_Delivery"
	}
};

export default class MockData {
	static getPerson(searchCriteria) {
		if (searchCriteria) {
			return _.find(people, searchCriteria);
		} else {
			return people[0];
		}
	}

	static getPeople() {
		return people;
	}

	static getPostalAddress() {
		return {
			street: "1 Test St",
			coAddress: "Best Ltd.",
			postalCode: "90210",
			city: "Test City",
			country: "FI"
		};
	}

	static getUser() {
		return {
			"id": "bf588945-ce95-490a-a774-8ef91661a146",
			"type": "persons",
			"attributes": {
				"lastName": "Testeri",
				"addresses": null,
				"gender": "male",
				"fixedLineNumbers": [],
				"formattedName": "Teppo Testeri",
				"roles": null,
				"billingAccountId": null,
				"language": null,
				"emails": [
					{
						"role": "PRIMARY",
						"id": "2ab79d7b-862d-49df-8afc-e6104a914919",
						"email": "tepsteri@tepinposti.fi"
					}
				],
				"honorificSuffix": null,
				"countryOfBirth": "FI",
				"personRelationships": [],
				"birthDay": null,
				"placeOfBirth": null,
				"characteristics": null,
				"mobileNumbers": [
					{
						"role": "PRIMARY",
						"id": "a843f46d-f729-40dd-a7ce-240a64bc008e",
						"number": "1234576890"
					}
				],
				"honorificPrefix": null,
				"avatar": "/img/icon-user-male.svg",
				"privacySettings": {
					"privacy1": false,
					"privacy2": false
				},
				"postalAddresses": [
					{
						"role": "PRIMARY",
						"id": "5e30221d-ad19-4043-8088-f594f5fdf77f",
						"street": "Piippukatu 11 A 1",
						"coAddress": null,
						"postalCode": "40100",
						"city": "Roma",
						"country": "FI",
						"county": null,
						"description": null,
						"postOfficeBox": null,
						"stateOrProvince": null,
						"addressRegisterId": null,
						"apartment": null,
						"building": null
					},
					{
						"role": "DELIVERY",
						"id": "5c5dddf6-72be-4d0a-9711-6027f247af28",
						"street": "Piippukatu 11 A 1",
						"coAddress": "Piippukatu 11 A 1",
						"postalCode": "40100",
						"city": "Roma",
						"country": "FI",
						"county": null,
						"description": null,
						"postOfficeBox": null,
						"stateOrProvince": "",
						"addressRegisterId": null,
						"apartment": null,
						"building": null
					}
				],
				"identifications": [],
				"firstName": "Teppo",
				"customerAccountId": null,
				"nationality": null,
				"additionalName": null,
				"maritalStatus": null
			}
		}
	}

	static getBasket(withItems: boolean, withDeliveryItems: boolean) {
		const basket = {
			activeBasket: {
				attributes: {
					totalPrices: [],
					totalUpfrontPrice: 0
				}
			}
		};

		if (withItems) {
			basket.basketItems = basketItems;

			const totalPriceOneTime = R.reduce(
				R.add,
				0,
				basketItems.map(bi => {
					return bi.attributes.totalPrices[0].taxFreeAmount;
				})
			);
			const totalPriceMonthly = R.reduce(
				R.add,
				0,
				basketItems.map(bi => {
					return bi.attributes.totalPrices[0].taxFreeAmount;
				})
			);

			basket.activeBasket.attributes.totalPrices = [
				{
					type: "ONE_TIME",
					taxFreeAmount: totalPriceOneTime,
					taxRate: 0,
					currency: "EUR"
				},
				{
					type: "RECURRENT",
					taxFreeAmount: totalPriceMonthly,
					taxRate: 0,
					currency: "EUR"
				}
			];

			if (withDeliveryItems) {
				basket.basketItems[0].attributes.childBasketItems.push(
					deliveryItem
				);
			}
		}

		return basket;
	}
}
