import { cloneDeep, isEmpty, pick } from "lodash";
import { PostalAddress, User, StreetAddressTokens, ContactMediaTypeEnum } from "../../redux";
import { withFunctionCustomization } from "../../customization";
import { UtilsCustomizationPoints } from "../../customization/points";
import { ContactMediaType } from "../../redux/types/ContactMediaType";
import { FormattedMessageDescriptor } from "../../channelUtils";

class PostalAddressUtil {
	static getEmptyAddressWithRole(role: ContactMediaType): PostalAddress {
		return {
			city: "",
			country: "",
			postalCode: "",
			street: "",
			coAddress: "",
			stateOrProvince: "",
			role: role
		};
	}

	static replaceNullValuesToUndefined(postalAddress?: PostalAddress): PostalAddress | undefined {
		if (!postalAddress) {
			return undefined;
		}
		const postalAddressWithReplacedValues: Record<string, any> = {};
		const postalAddressFields = Object.keys(postalAddress) as Array<keyof PostalAddress>;
		if (!postalAddressFields.find(key => postalAddress[key] === null)) {
			return postalAddress;
		}
		postalAddressFields.forEach(key => {
			postalAddressWithReplacedValues[key] = postalAddress[key] === null ? undefined : postalAddress[key];
		});
		return postalAddressWithReplacedValues;
	}

	static getAddressByRole(user: any, role: ContactMediaType): PostalAddress | undefined {
		let postalAddress;
		if (user && user.address) {
			postalAddress = user.address.role === role ? user.address : null;
		} else if (user && user.postalAddresses && user.postalAddresses.length) {
			postalAddress = user.postalAddresses.find((address: PostalAddress) => address.role === role);
		} else if (user && user.attributes) {
			postalAddress = ((user && user.attributes && user.attributes.postalAddresses) || [])
				.find((a: PostalAddress) => {
					return a.role === role;
				});
		}
		return this.replaceNullValuesToUndefined(postalAddress);
	}

	static getAddressByRoleOrEmpty(user: Partial<User>, role: ContactMediaType): PostalAddress {
		return this.getAddressByRole(user, role) || this.getEmptyAddressWithRole(role);
	}

	static getPrimaryAddressAsTemplate(user: User): PostalAddress {
		const postalAddress = cloneDeep(PostalAddressUtil.getAddressByRoleOrEmpty(user, "PRIMARY"));
		delete postalAddress.id;
		postalAddress.role = "DELIVERY"; // in case we use primary address as template
		return { ...postalAddress };
	}

	static isEmptyAddress(postalAddress?: PostalAddress): boolean {
		return Boolean(
			!postalAddress ||
				Object.keys(postalAddress)
					.map(key => (postalAddress as any)[key])
					.every(value => !value || value === "")
		);
	}

	static getAllAddressesByRole(user: any, role: ContactMediaType): Array<PostalAddress> {
		let postalAddresses;
		if (user && user.address) {
			postalAddresses = user.address.role === role ? user.address : null;
		} else if (user && user.postalAddresses && user.postalAddresses.length) {
			postalAddresses = user.postalAddresses.filter((address: PostalAddress) => address.role === role);
		} else if (user && user.attributes) {
			postalAddresses = ((user && user.attributes && user.attributes.postalAddresses) || [])
				.filter((a: PostalAddress) => a.role === role);
		}
		return postalAddresses || [];
	}

	static findExistingDeliveryAddress(user: User, address: PostalAddress): PostalAddress | undefined {
		const userAddresses = PostalAddressUtil.getAllAddressesByRole(user, ContactMediaTypeEnum.DELIVERY);
		return userAddresses.find((a: PostalAddress) => PostalAddressUtil.isEquals(a, address));
	}

	static isEquals(address: PostalAddress, compareWithAddress: PostalAddress): boolean {
		const postalAddressFields = (Object.keys(compareWithAddress) as Array<keyof PostalAddress>)
			.filter((k: keyof PostalAddress) => k !== "id");
		return postalAddressFields.every((key: keyof PostalAddress) => (
			address[key] === compareWithAddress[key]
		));
	}

	static formatPostalAddress(postalAddress?: PostalAddress): string {
		if (!postalAddress) {
			return "";
		}
		const { street, building, coAddress, postalCode, city, stateOrProvince, country } = postalAddress;
		const streetAddress = street && building ? `${street} ${building}` : street;
		const addressValues: Array<string | undefined> = [
			streetAddress,
			coAddress,
			postalCode,
			city,
			stateOrProvince,
			country
		];
		return addressValues
			.filter((key?: string) => {
				// TODO: remove "-" after proper implementation for resetting optional fields would be done
				return key && key !== "-";
			})
			.join(", ");
	}

	static isAddressCompleteEnoughForLocationQuery = (
		address: PostalAddress,
		postalAddressPartsToUseInQuery: string[]
	): boolean => postalAddressPartsToUseInQuery.every(part => !isEmpty(address[part]));

	static pickPostalAddressParts = (address: PostalAddress, parts: string[]): Partial<PostalAddress> => {
		if (parts.length) {
			return pick(address, parts);
		} else {
			return address;
		}
	};

	static dropKeysWithEmptyValues = (address: PostalAddress): PostalAddress => {
		const keys = Object.keys(address);
		return pick(address, keys.filter(key => !isEmpty(address[key]) && address[key] !== "-"));
	};

	static prepareAddressForLocationSearch = (
		address: PostalAddress,
		postalAddressPartsToUseInQuery: string[]
	): PostalAddress => {
		return PostalAddressUtil.dropKeysWithEmptyValues(
			PostalAddressUtil.pickPostalAddressParts(address, postalAddressPartsToUseInQuery)
		);
	};

	static tokenizeStreetAddress = (address: Partial<PostalAddress>, additionalParameters?: Record<string, object>): StreetAddressTokens | null => {
		const getTokens = withFunctionCustomization(
			UtilsCustomizationPoints.POSTAL_ADDRESS_UTIL_TOKENIZE_STREET_ADDRESS,
			(address: Partial<PostalAddress>, additionalParameters?: object): StreetAddressTokens | null => {
				return {
					street: address.street
				};
			}
		);

		return getTokens(address, additionalParameters);
	}

	static getDeliveryAddressParts = (address: Partial<PostalAddress>): Partial<PostalAddress> => {
		const {
			street,
			coAddress,
			city,
			postalCode,
			country
		} = address;

		const getExtraParts = withFunctionCustomization(
			UtilsCustomizationPoints.POSTAL_ADDRESS_UTIL_GET_DELIVERY_ADDRESS_PARTS,
			() => {
				return {
					street,
					coAddress,
					city,
					postalCode,
					country,
				};
			}
		);

		return getExtraParts(address);
	}

	static getAddressForMessage = (address: Partial<PostalAddress>, countryName?: string): Partial<PostalAddress> => {
		const getCustomizedAddress = withFunctionCustomization(
			UtilsCustomizationPoints.POSTAL_ADDRESS_UTIL_GET_ADDRESS_FOR_MESSAGE,
			() => {
				return {
					...address,
					country: countryName || address.country
				};
			}
		);

		return getCustomizedAddress(address, countryName);
	};

	static getAddressAsString = (address: Partial<PostalAddress>, countryName?: string | FormattedMessageDescriptor): string => {
		const message = `${address.street},
			${address.coAddress ? address.coAddress + "," : ""}
			${address.postalCode}
			${address.city},
			${address.stateOrProvince ? address.stateOrProvince + "," : ""}
			${countryName || address.country}`
		;

		const getCustomizedMessage = withFunctionCustomization(
			UtilsCustomizationPoints.POSTAL_ADDRESS_UTIL_GET_ADDRESS_AS_STRING,
			() => {
				return message;
			}
		);

		return getCustomizedMessage(address, countryName);
	};
}

export default PostalAddressUtil;
