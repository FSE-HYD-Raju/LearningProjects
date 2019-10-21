"use strict";

import { ConsulValues } from "../consul/consul.types";
import { ServiceActionPayload, ServiceActions } from "./service.actions";
import { extractValues } from "./service.utils";
import { ServiceState } from "./service.types";

export { ServiceState } from "./service.types";

const initialState = {

};

const serviceReducer = (state: Partial<ServiceState> = initialState, action: ServiceActionPayload) => {
	const { type } = action;
	switch (type) {
		case ServiceActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case ServiceActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues)};
		case ServiceActions.SUBMIT_CF_CONFIGURATION_COMPLETED:
			return {...state, callForwardingConfigurationResult: action.callForwardingConfigurationResult};
		case ServiceActions.SUBMIT_CF_CONFIGURATION_ERROR:
			return {...state, callForwardingConfigurationErrors: action.callForwardingConfigurationErrors};
		case ServiceActions.RESET_CF_CONFIGURATION:
			return {
				...state,
				callForwardingConfigurationErrors: undefined,
				callForwardingConfigurationResult: undefined,
			};
		default:
			return state;
	}
};

export default serviceReducer;
