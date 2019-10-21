import { PostalAddress } from "../../redux/types";

const getDefaultValues = (): PostalAddress => ({
	id: "postal_address_1",
	role: "PRIMARY",
	street: "Sportivnaya",
	coAddress: "1",
	postalCode: "00003",
	city: "Kyiv",
	country: "UA",
	stateOrProvince: "kyivskaya"
});
export default class PostalAddressMock {
	static make(overrideFields?: PostalAddress): PostalAddress {
		return { ...getDefaultValues(), ...overrideFields };
	}
}
