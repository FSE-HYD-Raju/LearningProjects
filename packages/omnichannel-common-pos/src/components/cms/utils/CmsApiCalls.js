import { cmsApiUrl } from "../../../utils/urls";
import ErrorContainer from "../../../utils/ErrorContainer";
const CONNECTION_TIMEOUT = 30;
const SHOW_INDICATOR_BY_DEFAULT = true;
export default function(axios, axiosIndicatorInstance) {
	if (!axios) {
		throw new Error("CmsApiCalls, no axios provided");
	}
	if (!axiosIndicatorInstance) {
		throw new Error("CmsApiCalls, no axiosIndicatorInstance provided");
	}
	return class CmsApiCalls {
		static async get(
			url,
			log,
			showIndicator = SHOW_INDICATOR_BY_DEFAULT,
			timeoutSeconds = CONNECTION_TIMEOUT
		) {
			const getUrl = cmsApiUrl + url;

			const timeout = timeoutSeconds * 1000;

			if (log) {
				console.log("CmsApiCalls get request to url: ", getUrl);
			}
			try {
				const response = await getAxiosIntance(
					showIndicator
				).get(getUrl, { timeout });
				if (log) {
					console.log("CmsApiCalls patch response:", response);
				}
				return response.data;
			} catch (error) {
				if (log) {
					console.log("CmsApiCalls get request error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async postREST(
			url,
			data,
			log,
			showIndicator = SHOW_INDICATOR_BY_DEFAULT,
			timeoutSeconds = CONNECTION_TIMEOUT,
			skipApiUrlAdd: boolean = false
		) {
			const fullUrl = skipApiUrlAdd ? url : cmsApiUrl + url;
			if (log) {
				console.log(
					"cmsApiUrl postREST request to url: ",
					fullUrl
				);
			}
			const timeout = timeoutSeconds * 1000;
			try {
				const response = await getAxiosIntance(
					showIndicator
				).post(fullUrl, data, { timeout });
				if (log) {
					console.log("cmsApiUrl postREST response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.log("cmsApiUrl postREST error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async putREST(
			url,
			data,
			log,
			showIndicator = SHOW_INDICATOR_BY_DEFAULT,
			timeoutSeconds = CONNECTION_TIMEOUT
		) {
			if (log) {
				console.log(
					"cmsApiUrl putREST request to url: ",
					cmsApiUrl + url
				);
			}
			const timeout = timeoutSeconds * 1000;
			try {
				const response = await getAxiosIntance(
					showIndicator
				).put(cmsApiUrl + url, data, { timeout });
				if (log) {
					console.log("cmsApiUrl putREST response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.error("cmsApiUrl putREST error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}

		static async delete(
			url,
			log,
			showIndicator = SHOW_INDICATOR_BY_DEFAULT,
			customHeaders,
			timeoutSeconds = CONNECTION_TIMEOUT
		) {
			if (log) {
				console.log(
					"ApiCalls delete request to url: ",
					cmsApiUrl + url
				);
			}

			const timeout = timeoutSeconds * 1000;

			try {
				const response = await getAxiosIntance(
					showIndicator
				).delete(cmsApiUrl + url, { customHeaders, timeout });
				if (log) {
					console.log("ApiCalls delete response:", response);
				}
				return response;
			} catch (error) {
				if (log) {
					console.error("ApiCalls delete error:", error);
				}
				return new ErrorContainer(error, log);
			}
		}
	};

	function getAxiosIntance(showIndicator) {
		return showIndicator ? axiosIndicatorInstance : axios;
	}
}
