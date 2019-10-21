"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import { CallForwardingServiceModify } from "../../types";

export enum ServiceActions {
    FLUX_SYNC = "Service_FLUX_SYNC",
	SET_VALUES = "Service_SET_VALUES",
	SUBMIT_CF_CONFIGURATION = "Service_SUBMIT_CF_CONFIGURATION",
	SUBMIT_CF_CONFIGURATION_COMPLETED = "Service_SUBMIT_CF_CONFIGURATION",
	SUBMIT_CF_CONFIGURATION_ERROR = "Service_SUBMIT_CF_ERROR",
	RESET_CF_CONFIGURATION = "Service_RESET_CF_CONFIGURATION",
}

export interface ServiceActionPayload extends Action<ServiceActions> {
    fluxState?: any;
    values?: ConsulValues;
    error?: string;
    individualId?: string;
    agreementId?: string;
    configuration?: Record<string, any>;
	callForwardingConfigurationErrors?: object;
	callForwardingConfigurationResult?: CallForwardingServiceModify;
}

export const service = {
    fluxSync: (fluxState: any) => ({type: ServiceActions.FLUX_SYNC, fluxState}),

	setValues: (values: ConsulValues) => ({type: ServiceActions.SET_VALUES, values}),
	submitCallForwardingConfiguration: (configuration: Record<string, any>, individualId: string, agreementId: string) =>
		({type: ServiceActions.SUBMIT_CF_CONFIGURATION, configuration, individualId, agreementId}),
	submitCallForwardingConfigurationCompleted: (result?: CallForwardingServiceModify) =>
		({type: ServiceActions.SUBMIT_CF_CONFIGURATION_COMPLETED, callForwardingConfigurationResult: result}),
	submitCallForwardingConfigurationError: (error: object) =>
		({type: ServiceActions.SUBMIT_CF_CONFIGURATION_ERROR, callForwardingConfigurationErrors: error}),
	resetCallForwardingConfiguration: () => ({type: ServiceActions.RESET_CF_CONFIGURATION}),
};
