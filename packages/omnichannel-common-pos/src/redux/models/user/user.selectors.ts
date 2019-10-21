"use strict";
import { isEmpty, get } from "lodash";
import { AppState } from "../../reducers";
import { User } from "./user.types";
import { Identification, StoredCustomerType } from "../../types";
import Time from "../../../channelUtils/Time";

const isLoggedIn = () => (state: AppState): boolean => !!state.user && !!state.user.user && !isEmpty(state.user.user);
const isUserOrAnonymous = () => (state: AppState): boolean => !!state.user.user || state.user.anonymousUser;
// Return logged in user if found, otherwise return new user
const getUser = (state: AppState): User | undefined => {
	return (state.user.user && state.user.user.id && state.user.user) || state.user.newUser;
};
const getUserIdentifications = (state: AppState): Identification[] => {
	const user = getUser(state);
	return (user && user.attributes && user.attributes.identifications) || [];
};

const getStoredCustomerModel = (state: AppState): StoredCustomerType | undefined => {
	const person = { ...state.user.user } as User;
	if (!person) {
		return undefined;
	}

	const postalAddress =
		get(person, "attributes")
			? get(person, "attributes.postalAddresses[0]")
			: get(person, "postalAddresses[0]");

	const birthDay =
		get(person, "attributes.birthDay") || get(person, "birthDay");

	const identifications =
		get(person, "attributes.identifications") ||
		get(person, "identifications") ||
		[];

	const fiscalCodeIdentification = identifications.find(
		(identification: Identification) => identification.type === "personal-identity-code"
	);

	const nonFiscalCodeIdentification: Identification =
		identifications.find(
			(identification: Identification) =>
				identification.type !== "personal-identity-code" &&
				identification.validityPeriod &&
				!identification.validityPeriod.expired &&
				identification.lifecycleStatus &&
				identification.lifecycleStatus.toLowerCase() === "confirmed"
		) || {};

	const fiscalCode =
		(fiscalCodeIdentification &&
			fiscalCodeIdentification.identificationId) ||
		"";

	const identificationType = nonFiscalCodeIdentification.type;

	const identificationId = nonFiscalCodeIdentification.identificationId;

	const identificationIssuingAuthority =
		nonFiscalCodeIdentification.issuingAuthority &&
		nonFiscalCodeIdentification.issuingAuthority.name || "";

	const identificationCountry =
		nonFiscalCodeIdentification.issuingAuthority &&
		nonFiscalCodeIdentification.issuingAuthority.country;

	const identificationIssuingDate = Time.parseDateFromString(
		(nonFiscalCodeIdentification.validityPeriod &&
			nonFiscalCodeIdentification.validityPeriod.startDate) || undefined
	);

	const identificationExpiryDate = Time.parseDateFromString(
		(nonFiscalCodeIdentification.validityPeriod &&
			nonFiscalCodeIdentification.validityPeriod.endDate) || undefined
	);

	const countyOfBirth =
		get(person, "attributes.characteristics.countyOfBirth") ||
		get(person, "characteristics.countyOfBirth");

	const stateOrProvinceOfBirth =
		get(person, "attributes.characteristics.stateOrProvinceOfBirth") ||
		get(person, "characteristics.stateOrProvinceOfBirth");

	const birthDayAsDate =
		(birthDay instanceof Date && birthDay) || undefined;

	const personData = {
		id: person.id,
		firstName:
			get(person, "firstName") ||
			get(person, "attributes.firstName", ""),
		lastName:
			get(person, "lastName") ||
			get(person, "attributes.lastName", ""),
		gender: get(person, "attributes.gender") || get(person, "gender"),
		birthDay: birthDayAsDate,
		countryOfBirth:
			get(person, "attributes.countryOfBirth") ||
			get(person, "countryOfBirth"),
		placeOfBirth:
			get(person, "attributes.placeOfBirth") ||
			get(person, "placeOfBirth"),
		countyOfBirth,
		stateOrProvinceOfBirth,
		email:
			get(person, "attributes.emails[0].email", "") ||
			get(person, "emails[0].email"),
		phoneNumber:
			get(person, "attributes.mobileNumbers[0].number", "") ||
			get(person, "mobileNumbers[0].number"),
		mobileNumber:
			get(person, "attributes.mobileNumbers[0].number", "") ||
			get(person, "mobileNumbers[0].number"),
		fiscalCode,
		address: {
			street: postalAddress && postalAddress.street,
			building: postalAddress && postalAddress.building,
			description: postalAddress && postalAddress.description,
			stateOrProvince: postalAddress && postalAddress.stateOrProvince,
			county: postalAddress && postalAddress.county,
			postalCode: postalAddress && postalAddress.postalCode,
			city: postalAddress && postalAddress.city,
			country: postalAddress && postalAddress.country,
			role: postalAddress && postalAddress.role
		},
		identifications: {
			identificationId,
			identificationType,
			identificationIssuingAuthority,
			identificationCountry,
			identificationIssuingDate,
			identificationExpiryDate,
		}
	};

	return personData;
};

export { isLoggedIn, isUserOrAnonymous, getUser, getUserIdentifications, getStoredCustomerModel };
