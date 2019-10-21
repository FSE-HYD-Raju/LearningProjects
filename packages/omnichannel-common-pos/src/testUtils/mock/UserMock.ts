import { PersonAttributes, User } from "../../redux";
import PostalAddressMock from "./PostalAddressMock";
import IdentificationMock from "./IdentificationMock";

export interface UserMockConfig {
	id?: string;
}
export default class UserMock {
	static getDefaultValues = (): UserMockConfig => ({
		id: "user_1"
	});
	static make(config: UserMockConfig = {}): User {
		const configWithDefaults = { ...UserMock.getDefaultValues(), ...config };
		const personAttributes: PersonAttributes = {
			firstName: "John",
			lastName: "Malkovych",
			formattedName: "John Malkovych",
			birthDay: "",
			placeOfBirth: "our solar system",
			nationality: "moldovian",
			countryOfBirth: "Moldova",
			id: configWithDefaults.id!,
			postalAddresses: [
				PostalAddressMock.make({ role: "PRIMARY" }),
				PostalAddressMock.make({ role: "DELIVERY" })
			],
			identifications: [IdentificationMock.make()]
		};
		return {
			individualId: "individualId_1",
			roles: [],
			email: "mock@mock.com",
			attributes: personAttributes,
			...personAttributes
		};
	}
}
