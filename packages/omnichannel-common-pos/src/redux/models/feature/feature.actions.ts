"use strict";

import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";

export enum FeatureActions {
	SET_VALUES = "Feature_SET_VALUES",
	ENABLE_COOKIE_MESSAGE = "Feature_ENABLE_COOKIE_MESSAGE"
}

export interface FeatureActionPayload extends Action<FeatureActions> {
	error?: string;
	values?: ConsulValues;
	enableCookie?: boolean;
}

export const feature = {
	setValues: (values: ConsulValues) => ({type: FeatureActions.SET_VALUES, values}),
	enableCookieMessage: (enableCookie: boolean) => ({type: FeatureActions.ENABLE_COOKIE_MESSAGE, enableCookie})
};
