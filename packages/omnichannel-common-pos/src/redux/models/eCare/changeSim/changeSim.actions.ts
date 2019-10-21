"use strict";

import { Action } from "redux";
import { ProductOfferingShippingMethod } from "../../../types/ShippingMethod";
import { ChangeResourceInitialization, PostalAddress, Product, ProductOffering } from "../../../types";
import { ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import { ChangeSimActionInitializeRequest } from "./changeSim.types";

export enum ChangeSimActions {
	SHOW_MODAL = "ChangeSim_SHOW_MODAL",
	SHOW_CHANGE_DELIVERY_ADDRESS = "ChangeSim_SHOW_CHANGE_DELIVERY_ADDRESS",
	SELECT_SHIPPING_METHOD = "ChangeSim_SELECT_SHIPPING_METHOD",
	SELECT_PAYMENT_METHOD = "ChangeSim_SELECT_PAYMENT_METHOD",
	SELECT_CUSTOMER_PAYMENT_METHOD = "ChangeSim_SELECT_CUSTOMER_PAYMENT_METHOD",
	SELECT_REASON = "ChangeSim_SELECT_SELECT_REASON",
	CLEANUP = "ChangeSim_CLEANUP",
	SUBMIT = "ChangeSim_SUBMIT",
	SUBMIT_COMPLETE = "ChangeSim_SUBMIT_COMPLETE",
	INITIALIZE = "ChangeSim_INITIALIZE",
	INITIALIZE_COMPLETE = "ChangeSim_INITIALIZE_COMPLETE",
	CHANGE_DELIVERY_ADDRESS = "ChangeSim_CHANGE_DELIVERY_ADDRESS",
	CHANGE_DELIVERY_ADDRESS_COMPLETE = "ChangeSim_CHANGE_DELIVERY_ADDRESS_COMPLETE",
}

export interface ChangeSimActionPayload extends Action<ChangeSimActions> {
	initializeRequest?: ChangeSimActionInitializeRequest;
	shippingMethods?: ProductOfferingShippingMethod[];
	changeResourceInitialization?: ChangeResourceInitialization;
	selectedPaymentMethod?: string;
	selectedCustomerPaymentMethod?: string;
	selectedReason?: ProductOffering;
	selectedShippingMethod?: ProductOfferingShippingMethod;
	reasons?: ProductOffering[];
	submitData?: ChangeSimServiceSubmitData;
	basketId?: string;
	showingChangeSimModal?: boolean;
	showingModifyAddressForm?: boolean;
	deliveryAddress?: {
		postalAddress?: PostalAddress;
		forceCreation?: boolean;
	};
}

export const changeSim = {
	showChangeSimModal: (showingChangeSimModal?: boolean, basketId?: string) => ({
		type: ChangeSimActions.SHOW_MODAL,
		showingChangeSimModal,
		basketId
	}),
	showChangeDeliveryAddressModal: (showingModifyAddressForm?: boolean) => ({
		type: ChangeSimActions.SHOW_CHANGE_DELIVERY_ADDRESS,
		showingModifyAddressForm
	}),
	selectReason: (selectedReason?: ProductOffering) => ({ type: ChangeSimActions.SELECT_REASON, selectedReason }),
	selectPaymentMethod: (selectedPaymentMethod?: string) => ({
		type: ChangeSimActions.SELECT_PAYMENT_METHOD,
		selectedPaymentMethod
	}),
	selectCustomerPaymentMethod: (selectedCustomerPaymentMethod?: string) => ({
		type: ChangeSimActions.SELECT_CUSTOMER_PAYMENT_METHOD,
		selectedCustomerPaymentMethod
	}),
	selectShippingMethod: (selectedShippingMethod?: ProductOfferingShippingMethod) => ({
		type: ChangeSimActions.SELECT_SHIPPING_METHOD,
		selectedShippingMethod
	}),
	changeDeliveryAddress: (postalAddress: PostalAddress, forceCreation: boolean) => ({
		type: ChangeSimActions.CHANGE_DELIVERY_ADDRESS,
		deliveryAddress: {
			postalAddress,
			forceCreation,
		},
	}),
	changeDeliveryAddressComplete: (postalAddress: PostalAddress) => ({
		type: ChangeSimActions.CHANGE_DELIVERY_ADDRESS_COMPLETE,
		deliveryAddress: {
			postalAddress,
		},
	}),
	cleanup: (basketId: string) => ({
		type: ChangeSimActions.CLEANUP,
		basketId
	}),
	submit: (submitData: ChangeSimServiceSubmitData) => ({
		type: ChangeSimActions.SUBMIT,
		submitData
	}),
	initialize: (initializeRequest: ChangeSimActionInitializeRequest) => ({
		type: ChangeSimActions.INITIALIZE,
		initializeRequest
	}),
	initializeComplete: (
		changeResourceInitialization: ChangeResourceInitialization | undefined,
		reasons: ProductOffering[],
		shippingMethods: ProductOfferingShippingMethod[],
		postalAddress: PostalAddress | undefined,
	) => ({
		type: ChangeSimActions.INITIALIZE_COMPLETE,
		changeResourceInitialization,
		reasons,
		shippingMethods,
		deliveryAddress: {
			postalAddress,
			forceCreation: false,
		},
	}),
	submitComplete: () => ({
		type: ChangeSimActions.SUBMIT_COMPLETE
	})
};
