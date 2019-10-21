"use strict";

import { Action } from "redux";
import { ConsulValues } from "../../models/consul/consul.types";
import { ProductOffering } from "../../types";

export enum ComparisonActions {
	FLUX_SYNC = "Comparison_FLUX_SYNC",
	SET_VALUES = "Comparison_SET_VALUES",
	TOGGLE_ITEM = "Comparison_TOGGLE_ITEM",
	HIDE = "Comparison_HIDE",
	SHOW = "Comparison_SHOW",
	CLEAR = "Comparison_CLEAR",
	SHOW_CONFIGURATION_MODAL_FOR_PRODUCT = "Comparison_SHOW_CONFIGURATION_MODAL_FOR_PRODUCT",
}

export interface ComparisonActionPayload extends Action<ComparisonActions> {
	fluxState?: any;
	values?: ConsulValues;
	error?: string;
	item: ProductOffering;
	id: string;
}

export const comparison = {
	fluxSync: (fluxState: any) => ({type: ComparisonActions.FLUX_SYNC, fluxState}),
	setValues: (values: ConsulValues) => ({type: ComparisonActions.SET_VALUES, values}),
	toggleItem: (item: any) => ({type: ComparisonActions.TOGGLE_ITEM, item}),
	show: () => ({type: ComparisonActions.SHOW}),
	hide: () => ({type: ComparisonActions.HIDE}),
	clear: () => ({type: ComparisonActions.CLEAR}),
	showConfigurationModalForProduct: (id: string) => ({type: ComparisonActions.SHOW_CONFIGURATION_MODAL_FOR_PRODUCT, id}),
};
