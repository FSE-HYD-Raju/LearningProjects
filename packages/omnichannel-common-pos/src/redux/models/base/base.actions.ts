"use strict";

import { Action } from "redux";
import { ConsulValues } from "../..";

export enum BaseActions {
	FLUX_SYNC = "Base_FLUX_SYNC",
	// Use for synchronous setting consul values in the customization reducers. Used in W3
	SET_VALUES_CUSTOMIZATION = "Base_SET_VALUES_CUSTOMIZATION",
}

export interface BaseActionPayload extends Action<BaseActions> {
	fluxState?: any;
	error?: string;
	values?: ConsulValues;
}

export const base = {
	fluxSync: (fluxState: any) => ({ type: BaseActions.FLUX_SYNC, fluxState }),
	setValuesCustomization: (values: any) => ({ type: BaseActions.SET_VALUES_CUSTOMIZATION, values }),
};
