"use strict";

import { attempt, isError, values, get } from "lodash";

import { PriceAttributeEnum } from "../types/SimplePrice";
import { ContactMediaTypeEnum } from "../types/ContactMediaType";

import { CountryOptions } from "../models/feature/feature.types";
import { PostalAddress } from "../../redux/types";

const getParsedValue = <T>(data: any, defaultValue?: T): T | undefined => {
	const value = attempt(() => JSON.parse(data));
	return isError(value) ? defaultValue : value;
};
const getSafeParsedValue = <T>(data: any, defaultValue: T): T => {
	const value = attempt(() => JSON.parse(data));
	return isError(value) ? defaultValue : value || defaultValue;
};

const getValue = <T>(data: any, defaultValue: T): T => {
	return data !== null ? data : defaultValue;
};

const priceAttributeEnumValues = values(PriceAttributeEnum);
const isValidPriceAttribute = (priceAttribute: PriceAttributeEnum): boolean =>
	priceAttributeEnumValues.indexOf(priceAttribute) >= 0;

const getPriceAttributeValue = <PriceAttributeEnum>(data: any, defaultValue?: PriceAttributeEnum): PriceAttributeEnum =>
	isValidPriceAttribute(data) ? data : defaultValue;

const isValidEnumValue = <T>(value: string, enumDef: T): boolean => {
	const enumValues = values(enumDef);
	return enumValues.indexOf(value) >= 0;
};

const getPostalAddressRoleForDefaultLocationSearch = <ContactMediaTypeEnum>(
	data: any,
	defaultValue?: ContactMediaTypeEnum
): ContactMediaTypeEnum => (isValidEnumValue(data, ContactMediaTypeEnum) ? data : defaultValue);

const getCountryOptions = <T>(data: any): CountryOptions | undefined => {
	const value: CountryOptions | undefined = getParsedValue(data, undefined);
	const asCO = value as any as CountryOptions;

	if (asCO && (asCO.country || asCO.countryName)) {
		return asCO;
	} else {
		return undefined;
	}
};

// Installation Address ( Available Timeslots )
const parseSafely = (json: any) => {
	try {
	return JSON.parse(json);
   } catch (e) { return {}; }
};

const getValueByKeyFromAddress = (address: PostalAddress, key: string) => {
	const parsedAddress = {
	  ...address,
	  description: parseSafely(address.description)
	};
	return get(parsedAddress, key);
};

export {
	getParsedValue,
	getSafeParsedValue,
	getPriceAttributeValue,
	getCountryOptions,
	isValidEnumValue,
	getPostalAddressRoleForDefaultLocationSearch,
	getValue,
	getValueByKeyFromAddress,
};
