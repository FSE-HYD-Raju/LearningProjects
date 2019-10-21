import { get, attempt, isError } from "lodash";
import clearSession from "./clearSession";
const uuidv4 = require("uuid/v4");
import ErrorContainer from "../utils/ErrorContainer";
import { SessionKeys, SessionUtils } from "../utils/SessionUtils";
import { AxiosResponse, AxiosError } from "axios";
import { AppState, AppStore } from "../redux";
import errorMessages from "./setAxiosInterceptor.messages";

import {
	ChannelUtilsClassesCustomizationPoints,
	ChannelUtilsFunctionCustomizationPoints,
	withClassCustomizationFactory,
	withFunctionCustomization
} from "../customization";
import actions from "../redux/actions";
import { B2C_SUB_CHANNEL } from "../redux/utils/channel";
import { isChannelCmsAdmin } from "../utils/Channel.utils";
import ToastErrorUtil from "../redux/models/toaster/ToastErrorUtil";

export type AxiosConfig = {
	flux: any;
	store: AppStore<any>;
	intl: any;
};

export const B2C_SUB_CHANNEL_HEADER = "X-Sub-Channel";
export type CustomAxiosHeaders = Headers & {
	"Accept-Language": string;
	Locale: string;
	Authorization: string;
	"X-User-Account": string;
	"X-Trace-Token": string;
	"X-Channel": string;
	[B2C_SUB_CHANNEL_HEADER]: B2C_SUB_CHANNEL; // to differentiate between eCare/eShop
	"X-Currency": string;
	"X-Impersonated-Individual-Id": string;
	"X-Channel-Service-Name": string;
	"X-Brand": string;
	"Cms-Language": string;
	"Cms-PublishTarget": string;
	"Crnk-Compact": true;
	"X-CustomerAccountId": string;
};

export const setRequestHeaders = withFunctionCustomization(
	ChannelUtilsFunctionCustomizationPoints.SET_REQUEST_HEADERS,
	baselineSetRequestHeaders
);

export type AxiosResponseContainer = {
	response?: AxiosResponse
};

class AxiosInterceptor {
	private config: AxiosConfig;

	constructor(config: AxiosConfig) {
		if (!config.store) {
			throw Error("store should be defined store:AppStore");
		}
		this.config = config;
	}

	getStore(): AppState {
		return this.config.store.getState();
	}

	refreshResponseAuthToken(response: any) {
		// Do something with response data
		if (response && response.headers && response.headers.authorization) {
			const authorizationHeader = response.headers.authorization;

			SessionUtils.setItem(SessionKeys.auth, authorizationHeader);
			this.config.store.dispatch(actions.auth.saveAuthToken(authorizationHeader));
		}
		return response;
	}

	onRequestError (error: AxiosError) {
	}

	onResponseError(err: any) {
		const error = err.status ? err : err.response;
		const errorCode = get(err, "code", false);
		let ret = null;
		if (errorCode === "ECONNABORTED") {
			this.fireErrorConnectionTimeout();
		} else if (get(error, "status", false)) {
			let fireToast = true;
			switch (error.status) {
				case 401:
					this.handle401Response();
					fireToast = false;
					break;
				case 403:
					if (isChannelCmsAdmin()) {
						this.handle403Response();
					}
					break;
				case 404:
					// hide 404
					break;
				case 422:
					// hide 422. TODO: this is needed only by cms-admin ATM. These should be configurable per channel..
					break;
				default:
					// TODO: messages customization, title is not shown. This message will not be translated, currently it is for displaying at least anything
					const errorDetailedMessage = error.data &&
						error.data.errors &&
						error.data.errors.length > 0 &&
						error.data.errors[0].detail;
					if (errorDetailedMessage) {
						this.showError({
							id: "custom-backend-error",
							description: "Custom backend error. " + errorDetailedMessage,
							defaultMessage: errorDetailedMessage
						});
					} else {
						this.fireErrorUnidentified();
						fireToast = false;
					}
			}
			if (fireToast) {
				this.fireToastErrorAction(err);
			}
			ret = Promise.reject(error);
		} else {
			if (get(error, "message") === "Network Error") {
				this.fireErrorMessageNetworkDown();
				ret = Promise.reject(error);
			} else {
				ret = Promise.reject(
					new ErrorContainer(
						{
							status: err.message
						},
						false
					)
				);
		}
		}
		return ret;
	}

	handle401Response() {
		// RND-16092: Silent Authentication
		const { auth, user } = this.getStore();
		if (auth.silentAuthenticationEnabled && user.user) {
			this.config.store.dispatch(actions.user.aaLogin({ isSilentAuth: true }));
		} else {
			// console.log("Session expired, clearing session.");
			clearSession();
			this.config.store.dispatch(actions.user.aaLogin({}));
		}
	}

	handle403Response() {
		this.config.store.dispatch(actions.toaster.showError("Received 403 forbidden error from backend"));
	}

	showError(error: Object) {
		const formatMessage = this.config.intl.formatMessage;
		if (formatMessage) {
			this.config.store.dispatch(actions.toaster.showError(formatMessage(error)));
		} else {
			console.error("Couldn't show errorMessage: ", error);
		}
	}

	fireErrorUnidentified() {
		this.showError(errorMessages.unidentifiedMessage);
	}

	fireErrorMessageNetworkDown() {
		this.showError(errorMessages.networkError);
	}

	fireErrorConnectionTimeout() {
		this.showError(errorMessages.connectionTimeout);
	}

	fireToastErrorAction(err: any) {
		const error = err.status ? err : err.response;
		if (error.status !== 404) {
			this.config.store.dispatch(actions.toaster.showError(ToastErrorUtil.getErrorMessage(error.response)));
		}
	}

	generateActionKeyFromConfig(config: any) {
		const key =
			config.url +
			config.method +
			(config.data
				? typeof config.data === "object"
					? JSON.stringify(config.data)
					: config.data
				: "");

		return key;
	}

	setAxiosRequestInterceptor() {
		if (this.config.flux.axios) {
			this.config.flux.axios.interceptors.request.use(
				(config: any) => {
					return setRequestHeaders(config, this.config);
				},
				(error: any) => {
					return this.onRequestError(error);
				}
			);
		}
	}

	setAxiosResponseInterceptor() {
		if (this.config.flux.axios) {
			this.config.flux.axios.interceptors.response.use(
				(response: AxiosResponse) => {
					return (
						this.refreshResponseAuthToken(response) || response
					);
				},
				(error: AxiosError) => {
					return this.onResponseError(error);
				}
			);
		}
	}

	setAxiosIndicatorRequestInterceptor() {
		const { flux } = this.config;
		if (flux.axiosIndicatorInstance) {
			flux.axiosIndicatorInstance.interceptors.request.use(
				(data: any) => {
					this.config.store.dispatch(actions.loadingOverlay.showLoadingOverlay(this.generateActionKeyFromConfig(data)));
					return setRequestHeaders(data, this.config);
				},
				(error: AxiosError) => {
					this.config.store.dispatch(actions.loadingOverlay.resetLoadingOverlay());
					return this.onRequestError(error);
				}
			);
		}
	}

	setAxiosIndicatorResponseInterceptor() {
		const { flux } = this.config;
		if (flux.axiosIndicatorInstance) {
			flux.axiosIndicatorInstance.interceptors.response.use(
				(response: any) => {
					this.config.store.dispatch(actions.loadingOverlay.hideLoadingOverlay(this.generateActionKeyFromConfig(response.config)));
					return (
						this.refreshResponseAuthToken(response) || response
					);
				},
				(error: any) => {
					this.config.store.dispatch(actions.loadingOverlay.resetLoadingOverlay());
					return this.onResponseError(error);
				}
			);
		}
	}

	setAxiosInterceptor() {
		if (!this.config.flux.axios.isConfigured) {
			this.setAxiosRequestInterceptor();
			this.setAxiosResponseInterceptor();
			this.setAxiosIndicatorRequestInterceptor();
			this.setAxiosIndicatorResponseInterceptor();
			this.config.flux.axios.isConfigured = true;
		}
	}
}
/**
 * Set axios interceptors for apicalls.
 */
export default function setAxiosInterceptor(config: AxiosConfig) {
	const interceptor = withClassCustomizationFactory(
		ChannelUtilsClassesCustomizationPoints.AXIOS_INTERCEPTOR,
		AxiosInterceptor
	);

	interceptor(config).setAxiosInterceptor();
}

function baselineSetRequestHeaders(data: any, config: AxiosConfig): CustomAxiosHeaders {
	const store = config.store.getState();
	const userAccountId = store.auth.userAccountId;
	const selectedCurrency = store.currency.selectedCurrency;
	const impersonatedIndividualId = store.user.impersonatedIndividualId;
	const { selectedLanguage, selectedPublishTarget } = store.cmsAdmin;
	const { serviceNameHeaderValue = process.env.SERVICE_NAME, brand } = store.consul;
	const customerAccountEntityId = (store.customer.activeCustomerAccount && store.customer.activeCustomerAccount.id) || (store.customerCase.customerAccountId);

	const token: any = SessionUtils.getItem(SessionKeys.auth);
	const newheader: Partial<CustomAxiosHeaders> = {
		"Accept-Language": get(store.consul, "locale", "en"),
		...(token && { Authorization: token }),
		Locale: get(store.consul, "iso6392", "eng"),
		"X-Trace-Token": uuidv4(),
		"X-Channel": process.env.omnichannel,
		"X-Currency": selectedCurrency,
		"Crnk-Compact": true,
	};

	if (userAccountId) {
		newheader["X-User-Account"] = userAccountId;
	}

	if (impersonatedIndividualId) {
		newheader["X-Impersonated-Individual-Id"] = impersonatedIndividualId;
	}

	if (serviceNameHeaderValue) {
		newheader["X-Channel-Service-Name"] = serviceNameHeaderValue;
	}

	if (selectedLanguage) {
		newheader["Cms-Language"] = selectedLanguage;
	}

	if (selectedPublishTarget && selectedPublishTarget.key) {
		newheader["Cms-PublishTarget"] = selectedPublishTarget.key;
	}

	if (brand) {
		newheader["X-Brand"] = brand;
	}

	if (customerAccountEntityId) {
		newheader["X-CustomerAccountId"] = customerAccountEntityId;
	}

	if (data && data.headers && newheader) {
		Object.assign(data.headers, newheader);
	}
	if (data && data.headers && data.customHeaders) {
		Object.assign(data.headers, data.customHeaders);
	}
	return data;
}
