"use strict";

import { AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import { Rest } from "./Rest";
import BaseService from "./BaseService";
import { REST } from "../settings/core";

import { LocationInfo, PostalAddress, Location, City, County, Street, Address } from "../types";

const postalAddressToUrlParams = (address: PostalAddress): string => {
	const keys = Object.keys(address);

	const paramPairs = keys.filter(key => !isEmpty(address[key])).map(key => `filter[${key}]=${address[key]}`);
	const paramString = paramPairs.join("&");

	return paramString;
};

export default class LocationService extends BaseService {
	static async getLocations(
		address?: PostalAddress,
		additionalParameters?: string,
		additionalPath: string = ""
	): Promise<AxiosResponse<LocationInfo[]>> {
		let resp;

		let params = !isEmpty(address) ? "?" + postalAddressToUrlParams(address!) : "";
		if (additionalParameters) {
			if (params.indexOf("?") > -1) {
				params += "&" + additionalParameters;
			} else {
				params += "?" + additionalParameters;
			}
		}

		try {
			resp = await Rest.get(`${REST.LOCATION.GEOLOCATION}${additionalPath}`, params);
			LocationService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async validateStreetAddress(street: string) {
		let resp;
		try {
			resp = await Rest.post(REST.LOCATION.VALIDATE_ADDRESS, {
				street
			});
			LocationService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp.data;
	}

	static async validateAddress(address: PostalAddress) {
		let resp;
		try {
			resp = await Rest.post(REST.LOCATION.VALIDATE_ADDRESS, {
				...address
			},
			{ "Content-Type": "application/json" });
			LocationService.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}

	static async availabilitiesByAddressId(addressRegistryId: string) {
		let resp;
		try {
			resp = await Rest.get(`${REST.LOCATION.AVAILABILITY_ADDRESS}/${addressRegistryId}`);
			LocationService.validateResp(resp);
		} catch (e) {
			throw e;
		}

		return resp[0].availabilities ? resp[0].availabilities : null;
	}

	static async create(location: Location): Promise<AxiosResponse<Location>> {
		try {
			const resp = await Rest.post(`${REST.LOCATION.LOCATION}`, { ...location }, { "Content-Type": "application/json" });
			LocationService.validateResp(resp);
			return resp;
		} catch (e) {
			throw e;
		}
	}

	static async getCities(): Promise<AxiosResponse<City>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.LOCATION.INSTALLATION_ADDRESS}/cities`);
			 LocationService.validateResp(resp);
			 return resp;
		} catch (e) {
			throw e;
		}
	}

	static async getCounties(city: string): Promise<AxiosResponse<County>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.LOCATION.INSTALLATION_ADDRESS}/${city}/counties`);
			LocationService.validateResp(resp);
			return resp;
		} catch (e) {
			throw e;
		}
	}

	static async getStreets(city?: string, county?: string): Promise<AxiosResponse<Street>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.LOCATION.INSTALLATION_ADDRESS}/${city}/${county}/streets`);
			LocationService.validateResp(resp);
			return resp;
		} catch (e) {
			throw e;
		}
	}

	static async getAddresses(city: string, county: string, streetName: string, streetBlock: string,): Promise<AxiosResponse<Address>> {
		let resp;
		try {
			resp = await Rest.get(`${REST.LOCATION.INSTALLATION_ADDRESS}/${city}/${county}/${streetName}/${streetBlock}/buildings`);
			LocationService.validateResp(resp);
			return resp;
		} catch (e) {
			throw e;
		}
	}

}
