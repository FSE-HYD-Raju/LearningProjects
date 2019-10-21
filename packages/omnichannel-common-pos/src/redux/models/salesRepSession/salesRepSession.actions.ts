"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum SalesRepSessionActions {
	FLUX_SYNC = "SalesRepSession_FLUX_SYNC",
	SET_VALUES = "SalesRepSession_SET_VALUES"
}

export interface SalesRepSessionActionPayload extends Action<SalesRepSessionActions> {
	fluxState?: any;
	values?: ConsulValues;
	error?: string;
}

export const salesRepSession = {
	fluxSync: (fluxState: any) => ({type: SalesRepSessionActions.FLUX_SYNC, fluxState}),
	setValues: (values: ConsulValues) => ({type: SalesRepSessionActions.SET_VALUES, values})
};
