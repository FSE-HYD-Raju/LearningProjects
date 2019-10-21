"use strict";

import { ConsulValues } from "../consul/consul.types";
import { SalesRepSessionActions, SalesRepSessionActionPayload } from "./salesRepSession.actions";
import { extractValues } from "./salesRepSession.utils";
import { Inventory, SalesOrganizationRole } from "../../types";

export type SalesRepSessionState = {
	showModal: boolean,
	active: boolean,
	sessionId: string,
	terminals: Array<any>,
	userRoleId: string,
	salesOrganizationRoleId: string,
	selectedTerminal: string,
	error: any,
	activeInventory?: Inventory,
	activeSalesOrganization?: SalesOrganizationRole,
	previousInventory: Inventory,
	previousSalesOrganization: SalesOrganizationRole,
	showSalesOrganizationModal: boolean,
	consulValuesLoaded: boolean,
	inventories?: Array<Inventory>,
	salesOrganizations?: Array<SalesOrganizationRole>,
	defaultStockLevel: number,
	orgIdToInventories: any,
};

const initialState = {
	showModal: false,
	active: false,
	sessionId: "",
	terminals: [],
	userRoleId: "",
	salesOrganizationRoleId: "",
	selectedTerminal: "",
	error: null,
	showSalesOrganizationModal: true,
	consulValuesLoaded: false,
	defaultStockLevel: 0
};

const salesRepSessionReducer = (state: Partial<SalesRepSessionState> = initialState, action: SalesRepSessionActionPayload) => {
	const { type } = action;
	switch (type) {
		case SalesRepSessionActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case SalesRepSessionActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues)};
		default:
			return state;
	}
};

export default salesRepSessionReducer;
