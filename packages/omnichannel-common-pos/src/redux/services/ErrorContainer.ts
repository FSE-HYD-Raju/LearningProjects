/* tslint:disable:no-console */

"use strict";

import isClient from "../../utils/isClient";

export type ErrorType = {
	code: string;
	name: string;
	status: string;
	title: string;
	detail: string;
	data?: { errors?: Array<any>|undefined };
	headers?: Array<any>|undefined;
};

export type ErrorContainerType = {
	status: string;
	errors: Array<any>;
	error: ErrorType;
	log: boolean;
};

/**
 * Created by vesak on 24/03/16.
 */
export class Error {
	status: string;
	code: string;
	title: string;
	detail: string;

	constructor(status: string | undefined, code: string | undefined, title: string | undefined, detail: string | undefined) {
		this.status = status || "undefined";
		this.code = code || "apiUndefinedError";
		this.title = title || "Undefined error";
		this.detail = detail || "ErrorContainer received an undefined error from backend";
	}
}

export default class ErrorContainer {
	errors: Array<any>;
	private status: string;
	private headers: Array<any>;

	static has(entity: any): boolean {
		return entity instanceof ErrorContainer;
	}

	static composeErrorContainerWithSingleError(status: string, code: string, title: string, detail: string, log: boolean) {
		return new ErrorContainer({
				status,
				data: {errors: [{status, code, title, detail}]}
			}, log);
	}

	constructor(error: Partial<ErrorType>, log: boolean = false) {
		let err = { ...error } as ErrorType;

		if (log) {
			console.log("Error container received error: ", error);
		}
		if (isClient && error instanceof DOMException) {
			err = {
				...err,
				status: err.code,
				data: {
					errors: [
						{
							status: err.code,
							code: "apiCalls-error-dom-exception",
							title: "ApiCalls DOMException error",
							detail: `Error name: ${err.name}`
						}
					]
				}
			};
		}

		this.status = err.status || "undefined";
		// if error contains errors array, like API errors should, assign it, otherwise try to create it based on error data
		this.errors =
			err.data && err.data.errors
				? err.data.errors
				: [new Error(err.status, err.code, err.title, err.detail)];
		this.headers = err.headers ? err.headers : [];
	}
}

export interface ErrorForModal {
	errors?: Error[];
	link?: any;
}
