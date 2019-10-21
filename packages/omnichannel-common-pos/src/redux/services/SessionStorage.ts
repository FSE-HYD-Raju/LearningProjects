"use strict";

import { attempt, isError, get, set } from "lodash";

export enum SessionStorageKeysEnum {
	app = "app",
	auth = "auth",
	user = "user",
	anonymousUser = "anonymousUser",
	salesRepUser = "salesRepUser",
	sessionUser = "sessionUser",
	returnPath = "returnPath",
	activeBasketId = "activeBasketId",
	fetchWidgetsInProgress = "fetchWidgetsInProgress",
	fetchMenuInProgress = "fetchMenuInProgress",
}

export type SessionStorageKeys = keyof typeof SessionStorageKeysEnum;

export function parseJSON(json: any): null {
	try {
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
}

export function fitDateFromSession(store: any, stateKey: string): void {
	const expiryDate = get(store[stateKey], "storedCustomer.identifications.identificationExpiryDate");
	const issuingDate = get(store[stateKey], "storedCustomer.identifications.identificationIssuingDate");
	expiryDate && set(store[stateKey], "storedCustomer.identifications.identificationExpiryDate", new Date(expiryDate));
	issuingDate && set(store[stateKey], "storedCustomer.identifications.identificationIssuingDate", new Date(issuingDate));
}

export default class SessionStorage {
	static getItem(key: SessionStorageKeys): string|null {
		return sessionStorage.getItem(key);
	}

	static setItem(key: SessionStorageKeys, data: string): void {
		sessionStorage.setItem(key, data);
	}

	static removeItem(key: SessionStorageKeys): void {
		sessionStorage.removeItem(key);
	}

	static setTimedItem(key: SessionStorageKeys, data: string): void {
		const dataWithTimeStamp = {
			data,
			initDate: Date.now()
		};

		sessionStorage.setItem(key, JSON.stringify(dataWithTimeStamp));
	}

	static clear(): void {
		sessionStorage.clear();
	}

	static getTimedItem(key: SessionStorageKeys, validityTimeMs: number = 60000): string|null {
		const item = sessionStorage.getItem(key);
		if (item) {
			const itemObject = attempt(() => JSON.parse(item));
			if (!isError(itemObject) && itemObject.initDate) {
				const timeIntervalInMilliseconds = Date.now() - itemObject.initDate;

				if (timeIntervalInMilliseconds <= validityTimeMs) {
					return itemObject.data;
				}
			} else if (isError(itemObject)) {
				console.error("User parsing failed: ", itemObject);
			}

		}

		return null;
	}
}
