"use strict";

import { Action } from "redux";
import { Basket, ProductOffering, ResourceStocks, ResourceInventories, MsisdnReservation, MsisdnResponse } from "../../types";

export enum MsisdnActions {
	FLUX_SYNC = "Msisdn_FLUX_SYNC",
	PERFORM_CHANGE_MSISDN = "Msisdn_PERFORM_CHANGE_MSISDN",
	PERFORM_CHANGE_MSISDN_COMPLETE = "Msisdn_PERFORM_CHANGE_MSISDN_COMPLETE",
	PERFORM_CHANGE_MSISDN_FAILED = "Msisdn_PERFORM_CHANGE_MSISDN_FAILED",
	CLEAR_CHANGE_MSISDN = "Msisdn_CLEAR_CHANGE_MSISDN",
	VALIDATE_PORT_IN_MSISDN = "Msisdn_VALIDATE_PORT_IN_MSISDN",
	VALIDATE_PORT_IN_MSISDN_COMPLETE = "Msisdn_VALIDATE_PORT_IN_MSISDN_COMPLETE",
	VALIDATE_PORT_IN_MSISDN_FAIL = "Msisdn_VALIDATE_PORT_IN_MSISDN_FAIL",
	PERFORM_CHANGE_CATEGORY = "Msisdn_PERFORM_CHANGE_CATEGORY",
	RESOURCE_INVENTORIES = "Msisdn_RESOURCE_INVENTORIES",
	RESOURCE_INVENTORIES_COMPLETE = "Msisdn_RESOURCE_INVENTORIES_COMPLETE",
	RESOURCE_INVENTORIES_FAILED = "Msisdn_RESOURCE_INVENTORIES_FAILED",
	CHANGE_INVENTORY = "Msisdn_CHANGE_INVENTORY",
	RESERVE_MSISDN = "Msisdn_RESERVE_MSISDN",
	RESERVE_MSISDN_COMPLETE = "Msisdn_RESERVE_MSISDN_COMPLETE",
	RELEASE_MSISDN = "Msisdn_RELEASE_MSISDN",
	RELEASE_MSISDN_COMPLETE = "Msisdn_RELEASE_MSISDN_COMPLETE",
	ERROR = "Msisdn_ERROR",
}

export interface MsisdnActionPayload extends Action<MsisdnActions> {
	personId?: string;
	newMsisdn?: string;
	productId?: string;
	agreementId?: string;
	changeMsisdnPo?: string;
	selectionPo?: ProductOffering;
	basket?: Basket;
	selectedPaymentMethod?: string;
	fluxState?: any;
	error?: string;
	MSISDN?: string;
	isMSISDNPortable?: boolean;
	categoryId?: string;
	inventories?: Array<ResourceInventories>;
	stocks?: Array<ResourceStocks>;
	selectedInventory?: ResourceInventories;
	pattern?: string;
	releaseId?: string;
	reservedFor?: string;
	stock?: string;
	limit?: number;
	endTime?: string;
	numberType?: string;
	product?: ProductOffering;
	response?: MsisdnResponse;
}

export const msisdn = {
	fluxSync: (fluxState: any) => ({ type: MsisdnActions.FLUX_SYNC, fluxState }),
	performChangeMsisdn: ({ personId, newMsisdn, productId, changeMsisdnPo, selectionPo, selectedPaymentMethod, agreementId }:
		{
			personId: string, newMsisdn: string, productId: string, changeMsisdnPo: string,
			selectionPo: ProductOffering, selectedPaymentMethod: string, agreementId: string
		}) =>
		({
			type: MsisdnActions.PERFORM_CHANGE_MSISDN,
			personId,
			newMsisdn,
			productId,
			changeMsisdnPo,
			selectionPo,
			selectedPaymentMethod,
			agreementId
		}),
	performChangeMsisdnComplete: (productId: string, basket: Basket) => ({
		type: MsisdnActions.PERFORM_CHANGE_MSISDN_COMPLETE,
		productId,
		basket
	}),
	performChangeMsisdnFailed: (productId: string, error: string) => ({
		type: MsisdnActions.PERFORM_CHANGE_MSISDN_FAILED,
		productId,
		error
	}),
	clearChangeMsisdn: () =>
		({ type: MsisdnActions.CLEAR_CHANGE_MSISDN }),
	validatePortInMSISDNForBasket: (MSISDN: string) => ({ type: MsisdnActions.VALIDATE_PORT_IN_MSISDN, MSISDN }),
	validatePortInMSISDNForBasketComplete: (MSISDN: string, isMSISDNPortable: boolean) =>
		({ type: MsisdnActions.VALIDATE_PORT_IN_MSISDN_COMPLETE, MSISDN, isMSISDNPortable }),
	validatePortInMSISDNForBasketFail: (error: any) => ({ type: MsisdnActions.VALIDATE_PORT_IN_MSISDN_FAIL, error }),
	performChangeCategory: (categoryId: string) => ({
		type: MsisdnActions.PERFORM_CHANGE_CATEGORY,
		categoryId,
	}),
	getResourceInventories: () => ({
		type: MsisdnActions.RESOURCE_INVENTORIES
	}),
	getResourceInventoriesCompleted: (inventories: Array<ResourceInventories>, stocks: Array<ResourceStocks>) => ({
		type: MsisdnActions.RESOURCE_INVENTORIES_COMPLETE,
		inventories,
		stocks,
	}),
	getResourceInventoriesFailed: (error: any) => ({
		type: MsisdnActions.RESOURCE_INVENTORIES_FAILED,
		error,
	}),
	changeInventory: (selectedInventory: ResourceInventories, stocks: Array<ResourceStocks>) => ({
		type: MsisdnActions.CHANGE_INVENTORY,
		selectedInventory,
		stocks,
	}),
	reserveMsisdn: (pattern?: string, releaseId?: string, reservedFor?: string,
			stock?: string,
			limit?: number,
			product?: ProductOffering,
			endTime?: string,
			numberType?: string	) => ({
		type: MsisdnActions.RESERVE_MSISDN,
		pattern,
		releaseId,
		reservedFor,
		stock,
		limit,
		product,
		endTime,
		numberType,
	}),
	reserveMsisdnComplete: (response: MsisdnReservation, reservedFor?: string, stock?: string, pattern?: string) => ({
		type: MsisdnActions.RESERVE_MSISDN_COMPLETE,
		response,
		reservedFor,
		stock,
		pattern,
	}),
	releaseMsisdn: (releaseId: string, reservedFor: string) => ({
		type: MsisdnActions.RELEASE_MSISDN,
		releaseId,
		reservedFor
	}),
	releaseMsisdnComplete: (releaseId: string) => ({
		type: MsisdnActions.RELEASE_MSISDN_COMPLETE,
		releaseId
	}),
	error: ({ error }: { error: any }) => ({
		type: MsisdnActions.ERROR,
		error,
	}),
};
