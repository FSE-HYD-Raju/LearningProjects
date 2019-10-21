"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum SchemaActions {
    FLUX_SYNC = "Schema_FLUX_SYNC",
	SET_VALUES = "Schema_SET_VALUES"
}

export interface SchemaActionPayload extends Action<SchemaActions> {
    fluxState?: any;
    values?: ConsulValues;
    error?: string;
}

export const schema = {
    fluxSync: (fluxState: any) => ({type: SchemaActions.FLUX_SYNC, fluxState}),

	setValues: (values: ConsulValues) => ({type: SchemaActions.SET_VALUES, values})
};
