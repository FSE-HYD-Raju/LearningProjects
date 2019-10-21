import PostalAddressUtil from "./PostalAddressUtil";
import { ContactMediaType, PersonAttributes, PostalAddress, User } from "../../redux/types";

const deliveryAddress = {
	city: "City",
	country: "FI",
	postalCode: "40283",
	street: "Kauppakatu 1",
	coAddress: "c/o 007",
	stateOrProvince: "Rock",
	role: "DELIVERY" as ContactMediaType
};

const primaryAddress: PostalAddress = {
	city: "New Yourk",
	country: "USA",
	postalCode: "555",
	street: "110th street",
	coAddress: "Jackie Brown",
	stateOrProvince: "NY",
	role: "PRIMARY" as ContactMediaType
};

const attributes: PersonAttributes = {
	id: "EEE42918-02FD-406B-8093-6AB923CD4661",
	gender: "female",
	birthDay: "Wed Aug 29 2000 12:26:19 GMT+0300 (EEST)",
	emails: [{ email: "t.t@test.com" }],
	mobileNumbers: [{ number: "2398457" }],
	firstName: "Teppo",
	lastName: "Tester",
	placeOfBirth: "Home",
	nationality: "Finland",
	countryOfBirth: "Finland",
	postalAddresses: [primaryAddress, deliveryAddress]
};

const user: User = {
	id: "B581D682-1526-4BFD-9809-E2B1F0CD5EFC",
	roles: [{ name: "eshop_user" }],
	email: "teppo.tester@test.com",
	attributes: attributes,
	firstName: "Teppo",
	lastName: "Tester",
	birthDay: "Wed Aug 29 2000 12:26:19 GMT+0300 (EEST)",
	emails: [{ email: "t.t@test.com" }],
	mobileNumbers: [{ number: "2398457" }],
	placeOfBirth: "Home",
	nationality: "Finland",
	countryOfBirth: "Finland"
} as User;

describe("PostalAddressUtil", () => {
	describe("PostalAddressUtil.getAddressByRole", () => {
		it("should return requested address of the user", () => {
			expect(PostalAddressUtil.getAddressByRole(user, "PRIMARY")).toBe(primaryAddress);
		});
	});
	describe("PostalAddressUtil.replaceNullValuesToUndefined", () => {
		it("should return undefined in place of nulls when postal address provided", () => {
			const postalAddressWithNulls = ({
				city: null,
				country: null,
				postalCode: null,
				street: null,
				coAddress: null,
				stateOrProvince: null,
				role: null
			} as any) as PostalAddress;
			expect(PostalAddressUtil.replaceNullValuesToUndefined(postalAddressWithNulls)).toMatchObject({
				city: undefined,
				country: undefined,
				postalCode: undefined,
				street: undefined,
				coAddress: undefined,
				stateOrProvince: undefined,
				role: undefined
			});
		});
		it("should return undefined in place of nulls when postal address provided", () => {
			expect(PostalAddressUtil.replaceNullValuesToUndefined(undefined)).toBe(undefined);
		});
	});

	describe("PostalAddressUtil.formatPostalAddress", () => {
		it("should return empty string when no address", () => {
			expect(PostalAddressUtil.formatPostalAddress()).toBe("");
		});
		it("should return empty string when empty address", () => {
			expect(PostalAddressUtil.formatPostalAddress(PostalAddressUtil.getEmptyAddressWithRole("DELIVERY"))).toBe("");
		});
		it("should return all 5 fields concatenated", () => {
			expect(PostalAddressUtil.formatPostalAddress(primaryAddress)).toBe(
				"110th street, Jackie Brown, 555, New Yourk, NY, USA"
			);
		});
		it("should return only non empty fields concatenated when has empty or undefined fields", () => {
			expect(
				PostalAddressUtil.formatPostalAddress({...primaryAddress, coAddress: undefined, stateOrProvince: ""})
			).toBe("110th street, 555, New Yourk, USA");
		});
		// TODO: remove after proper implementation for resetting optional fields would be done
		it("should return only non empty fields concatenated when has empty or undefined fields", () => {
			expect(
				PostalAddressUtil.formatPostalAddress({...primaryAddress, coAddress: "-", stateOrProvince: "-"})
			).toBe("110th street, 555, New Yourk, USA");
		});
	});

	describe("#getDeliveryAddressParts", () => {
		it("returns street, coAddress, city, postalCode, and country from address object", () => {
			const parts = PostalAddressUtil.getDeliveryAddressParts(deliveryAddress);

			const expectedKeys = ["street", "coAddress", "city", "postalCode", "country"];
			expect(Object.keys(parts).sort()).toEqual(expectedKeys.sort());
		});
	});

	describe("#getAddressForMessage", () => {
		it("returns street, coAddress, city, postalCode, stateOrProvince, and country from address object", () => {
			const parts = PostalAddressUtil.getAddressForMessage(deliveryAddress);

			const expectedKeys = ["street", "coAddress", "city", "postalCode", "stateOrProvince", "country"];
			const receivedKeys = Object.keys(parts);
			expectedKeys.forEach(key => expect(receivedKeys).toContain(key));
		});

		it("returns street, coAddress, city, postalCode, stateOrProvince, picked from address object, and name of country given as argument", () => {
			const countryName = "Finland";
			const parts = PostalAddressUtil.getAddressForMessage(deliveryAddress, countryName);

			const expectedKeys = ["street", "coAddress", "city", "postalCode", "stateOrProvince", "country"];
			const receivedKeys = Object.keys(parts);

			expectedKeys.forEach(key => expect(receivedKeys).toContain(key));
			expect(parts.country).not.toEqual(deliveryAddress.country);
			expect(parts.country).toEqual(countryName);
		});
    });

    describe("#getAddressAsString", () => {
		it("returns a string with street, city, postalCode, stateOrProvince, and country picked from address object", () => {
			const string = PostalAddressUtil.getAddressAsString(deliveryAddress);

            expect(string).toContain(deliveryAddress.street);
            expect(string).toContain(deliveryAddress.city);
            expect(string).toContain(deliveryAddress.postalCode);
            expect(string).toContain(deliveryAddress.stateOrProvince);
            expect(string).toContain(deliveryAddress.country);
        });

        it("returns a string with street, building, city, postalCode, stateOrProvince picked from address object, and name of country given as argument", () => {
            const countryName = "Finland";
			const string = PostalAddressUtil.getAddressAsString(deliveryAddress, countryName);

            expect(string).toContain(deliveryAddress.street);
            expect(string).toContain(deliveryAddress.city);
            expect(string).toContain(deliveryAddress.postalCode);
            expect(string).toContain(deliveryAddress.stateOrProvince);
            expect(string).not.toContain(deliveryAddress.country);
            expect(string).toContain(countryName);
		});
	});
});
