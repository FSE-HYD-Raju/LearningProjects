// @flow

// $FlowFixMe
import apiUrl, { restUrl } from "./urls";

// $FlowFixMe
import ErrorContainer from "./ErrorContainer";

// eslint-disable-next-line no-unused-vars
type ErrorType = {
	code: string,
	name: string,
	status: string,
	title: string,
	detail: string,
	data?: {
		errors: ?Array<*>
	},
	headers?: ?Array<*>
};

type responseDataType = {
	data: Array<*> | Object,
	included: Array<*>,
	meta: Object
};

type getResponseType = {
	config: Object,
	data: responseDataType,
	headers: Object,
	request: XMLHttpRequest,
	status: number,
	statusText: string
};

export default function(axios: Object) {
	if (!axios) {
		throw new Error("ApiCalls, no axios provided");
	}
	return class Apicalls {
		static apiUrl: string = apiUrl;
		static restUrl: string = restUrl;

		static async get(
			url: string,
			log: boolean,
			headers: Object = {}
		): responseDataType | any {
			const getUrl = this.apiUrl + url;
			if (log) {
				console.log(
					"ApiCalls get request to url: ",
					getUrl,
					"headers",
					headers
				);
			}
			try {
				const response: getResponseType = await axios.get(getUrl, {
					headers
				});
				if (log) {
					console.log("ApiCalls get response:", response);
				}
				return response.data;
			} catch (error) {
				if (log) {
					console.log("ApiCalls get request error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async getRest(
			url: string,
			headers: Object = {}
		): responseDataType | any {
			const getUrl = this.restUrl + url;
			try {
				const response: getResponseType = await axios.get(getUrl, {
					headers
				});
				return response;
			} catch (error) {
				return new ErrorContainer(error);
			}
		}

		static async getFromUrl(
			url: string,
			log: boolean
		): responseDataType | any {
			try {
				const response: getResponseType = await axios.get(url);
				if (log) {
					console.log("ApiCalls getFromUrl response:", response);
				}
				return response.data;
			} catch (error) {
				if (log) {
					console.log("ApiCalls getFromUrl request error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async patch(
			url: string,
			sendData: Object,
			sendHeaders: Object,
			log: boolean
		): responseDataType | any {
			try {
				const patchUrl = apiUrl + url;
				const response = await axios.patch(
					patchUrl,
					{
						data: sendData
					},
					{
						withCredentials: true,
						headers: sendHeaders
					}
				);
				if (log) {
					console.log("ApiCalls patch response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("ApiCalls patch request error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async post(
			url: string,
			data: Object,
			headers: Object,
			log: boolean
		): responseDataType | any {
			if (log) {
				console.log(
					"ApiCalls post request to url: ",
					apiUrl + url,
					data,
					headers
				);
			}
			try {
				const response = await axios.post(
					apiUrl + url,
					{ data },
					{ headers }
				);
				if (log) {
					console.log("ApiCalls post response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("ApiCalls post error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		/**
		 * POSTs the given data to a given URL. Can be used for POSTing a complex data type, for instance a jsonapi request with
		 * included entities.
		 * @param url url to POST to
		 * @param data payload to POST
		 * @param headers list of optional headers
		 * @param log boolean to enable / disable logging
		 * @returns {Promise.<*>}
		 */
		static async postComplex(
			url: string,
			data: Object,
			headers: Object,
			log: boolean
		) {
			if (log) {
				console.log(
					"ApiCalls post complex request to url: ",
					apiUrl + url,
					data,
					headers
				);
			}
			try {
				const response = await axios.post(apiUrl + url, data, {
					headers
				});
				if (log) {
					console.log("ApiCalls post response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("ApiCalls post error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async postREST(
			url: string,
			data: Object,
			headers: Object,
			log: boolean
		) {
			if (log) {
				console.log("ApiCalls postREST request to url: ", apiUrl + url);
			}
			try {
				const response = await axios.post(apiUrl + url, data, {
					headers
				});
				if (log) {
					console.log("ApiCalls postREST response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("ApiCalls postREST error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async delete(url: string, log: boolean) {
			try {
				const response = await axios.delete(apiUrl + url);
				if (log) {
					console.log("ApiCalls delete response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("ApiCalls delete error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}
	};
}
