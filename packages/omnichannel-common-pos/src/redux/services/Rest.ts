"use strict";

import { isEmpty, startsWith } from "lodash";
import * as qs from "querystring";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import ErrorContainer, { ErrorType } from "./ErrorContainer";

type HttpHeaders = Record<string, string | null>;
interface QueryParams {
	[key: string]: string | number | boolean | string[] | number[] | boolean[];
}

class Rest {
	static get = get;
	static patch = patch;
	static patchRaw = patchRaw;
	static post = post;
	static delete = doDelete;
	static clearCache = clearCache;
	static getWithHeaders = getWithHeaders;
	get = get;
	patch = patch;
	patchRaw = patchRaw;
	post = post;
	doDelete = doDelete;
	getWithHeaders = getWithHeaders;
}

const queryParams = (params: QueryParams): string => (isEmpty(params) ? "" : "?" + qs.stringify(params));
const DEFAULT_AXIOS_CONFIG = { headers: { "Content-Type": "application/vnd.api+json" } };
const SIMPLE_JSON_CONTENT_TYPE_HEADER = { "Content-Type": "application/json" };
const REQUESTS: Record<string, Record<string, AxiosPromise<any>>> = {
	GET: {},
	POST: {},
	PATCH: {}
};

// clears cached requests
// call this when other request parameters (which are set in different place like setAxiosInterceptor)
// are changed like X-Currency header
function clearCache() {
	Object.keys(REQUESTS).forEach(key => (REQUESTS[key] = {}));
}
async function get(url: string, params: string | QueryParams = "", headers?: HttpHeaders) {
	try {
		params = strigifyParamsForGet(params);
		const resp = await createCachedGetRequest(REQUESTS.GET, url + params, headers);
		return resp.data;
	} catch (error) {
		return new ErrorContainer(error);
	}
}

async function post(url: string, data: object, headers?: HttpHeaders) {
	try {
		const resp = await createCachedPostRequest(REQUESTS.POST, url, data, headers);
		return resp.data;
	} catch (error) {
		return new ErrorContainer(error);
	}
}

async function patch(url: string, data: object, headers?: HttpHeaders) {
	try {
		const resp = await createCachedPatchRequest(REQUESTS.PATCH, url, data, headers);
		return resp.data;
	} catch (error) {
		return new ErrorContainer(error);
	}
}

async function patchRaw(url: string, data: object, headers?: HttpHeaders) {
	try {
		const resp = await createCachedPatchRequest(REQUESTS.PATCH, url, data, headers);
		return resp;
	} catch (error) {
		return error;
	}
}

function strigifyParamsForGet(params: string | QueryParams): string {
	let query = typeof params === "object" ? queryParams(params) : params;

	if (!isEmpty(query) && !startsWith(query, "?")) {
		query = `?${query}`;
	}

	return query;
}

function createCachedGetRequest(container: typeof REQUESTS.GET, url: string, headers?: HttpHeaders) {
	const urlHash = url + (headers ? JSON.stringify(headers) : "");
	if (!container[urlHash]) {
		container[urlHash] = axios
			.get(url, headers ? { headers } : DEFAULT_AXIOS_CONFIG)
			.then(resp => {
				delete container[urlHash];
				return resp;
			})
			.catch(resp => {
				delete container[urlHash];
				throw resp;
			});
	}
	return container[urlHash];
}

function createCachedPostRequest(container: typeof REQUESTS.POST, url: string, data: object, headers?: HttpHeaders) {
	const urlData = url + JSON.stringify(data) + (headers ? JSON.stringify(headers) : "");
	if (!container[urlData]) {
		container[urlData] = axios
			.post(url, data, headers ? { headers } : DEFAULT_AXIOS_CONFIG)
			.then(resp => {
				delete container[urlData];
				return resp;
			})
			.catch(resp => {
				delete container[urlData];
				throw resp;
			});
	}
	return container[urlData];
}

function createCachedPatchRequest(container: typeof REQUESTS.PATCH, url: string, data: object, headers?: HttpHeaders) {
	const urlData = url + JSON.stringify(data) + (headers ? JSON.stringify(headers) : "");
	if (!container[urlData]) {
		container[urlData] = axios
			.patch(url, data, headers ? { headers } : DEFAULT_AXIOS_CONFIG)
			.then(resp => {
				delete container[urlData];
				return resp;
			})
			.catch(resp => {
				delete container[urlData];
				throw resp;
			});
	}
	return container[urlData];
}

async function doDelete(url: string) {
	try {
		const resp = await axios.delete(url, DEFAULT_AXIOS_CONFIG);
		return resp.data;
	} catch (error) {
		return new ErrorContainer(error);
	}
}

async function getWithHeaders(url: string, params: string | QueryParams = "", headers?: HttpHeaders) {
	return get(url, params, headers);
}

export { HttpHeaders, QueryParams, Rest, SIMPLE_JSON_CONTENT_TYPE_HEADER };
