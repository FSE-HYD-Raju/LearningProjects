"use strict";

import { Action } from "redux";
import {
	Basket,
	BasketItem,
	BasketSelectionActionEnum,
	MessagePack,
	ProductOffering,
	TopupType,
	User,
	PostalAddress,
	BasketItemIdToAddress,
} from "../../types";
import BasketSelectors from "../../../selectors/basket/BasketSelectors";
import { InitializedAddon } from "./basket.types";
import { EnableAddonConfig, InitializeAddonConfig } from "../../services/AddonService";

enum BasketActions {
	FLUX_SYNC = "Basket_FLUX_SYNC",
	TOGGLE_MENU_NOTIFICATION = "Basket_TOGGLE_MENU_NOTIFICATION",
	SET_SHIPPING_METHOD = "Basket_SHIPPING_METHOD",
	STORE_TOPUP_PRODUCT = "Basket_STORE_TOPUP_PRODUCT",
	CHECK_BASKETS_COMPLETE = "Basket_CHECK_BASKETS_COMPLETE",
	GET_USER_BASKETS = "Basket_GET_USER_BASKETS",
	GET_USER_BASKETS_COMPLETE = "Basket_GET_USER_BASKETS_COMPLETE",
	GET_USER_BASKETS_FAILED = "Basket_GET_USER_BASKETS_FAILED",
	CREATE_BASKET = "Basket_CREATE_BASKET",
	CREATE_BASKET_COMPLETE = "Basket_CREATE_BASKET_COMPLETE",
	CREATE_BASKET_FAILED = "Basket_CREATE_BASKET_FAILED",
	DELETE_UI_BASKET = "Basket_DELETE_UI_BASKET",
	DISCARD_BASKET = "Basket_DISCARD_BASKET",
	DISCARD_BASKET_COMPLETE = "Basket_DISCARD_BASKET_COMPLETE",
	DISCARD_BASKET_FAILED = "Basket_DISCARD_BASKET_FAILED",
	GET_BASKET = "Basket_GET_BASKET",
	GET_BASKET_COMPLETE = "Basket_GET_BASKET_COMPLETE",
	GET_BASKET_FAILED = "Basket_GET_BASKET_FAILED",
	UPDATING_BASKET = "UPDATING_BASKET",
	DELETE_ITEM_FROM_BASKET = "Basket_DELETE_ITEM_FROM_BASKET",
	DELETE_ITEM_FROM_BASKET_COMPLETE = "Basket_DELETE_ITEM_FROM_BASKET_COMPLETE",
	DELETE_ITEM_FROM_BASKET_FAILED = "Basket_DELETE_ITEM_FROM_BASKET_FAILED",
	ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET = "Basket_ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET",
	ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE = "Basket_ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE",
	ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_FAILED = "Basket_ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_FAILED",
	SET_BASKET_AS_ACTIVE_BASKET = "Basket_SET_BASKET_AS_ACTIVE_BASKET",
	SET_BASKET_AS_ACTIVE_BASKET_COMPLETE = "Basket_SET_BASKET_AS_ACTIVE_BASKET_COMPLETE",
	INITIALIZE_ENABLE_ADDON = "Basket_INITIALIZE__ENABLE_ADDON",
	INITIALIZE_ENABLE_ADDON_COMPLETE = "Basket_INITIALIZE__ENABLE_ADDON_COMPLETE",
	ENABLE_ADDON = "Basket_ENABLE_ADDON",
	ENABLE_ADDON_COMPLETE = "Basket_ENABLE_ADDON_COMPLETE",
	DEACTIVATE_ADDON = "Basket_DEACTIVATE_ADDON",
	CLEAR_ADDON_INITIALIZATION = "Basket_CLEAR_ADDON_INITIALIZATION",
	STORE_ADDRESS_WITH_BASKET_ITEM_ID = "Basket_STORE_ADDRESS_WITH_BASKET_ITEM_ID",
	RESET_ADDRESS_WITH_BASKET_ITEM_ID_ENTRIES = "Basket_RESET_ADDRESS_WITH_BASKET_ITEM_ID_ENTRIES",
	VALIDATE_ICCID = "Basket_VALIDATE_ICCID",
	VALIDATE_PREACTIVATED_ICCID = "Basket_VALIDATE_PREACTIVATED_ICCID",
	REMOVE_FROM_UI_BASKET_COMPLETE = "Basket_REMOVE_FROM_UI_BASKET_COMPLETE",
	GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE = "Basket_GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE",
	GET_BASKET_AFTER_DELETE_COMPLETE = "Basket_GET_BASKET_AFTER_DELETE_COMPLETE",
	REMOVE_SHIPPING_METHODS_COMPLETE = "Basket_REMOVE_SHIPPING_METHODS_COMPLETE",
	UPDATE_BASKET_ITEMID_TO_ADDRESS_ENTRIES = "Basket_UPDATE_BASKET_ITEMID_TO_ADDRESS_ENTRIES",
}

interface BasketActionPayload extends Action<BasketActions> {
	fluxState?: any;
	product?: ProductOffering;
	openBaskets?: Array<any>;
	individualId?: string;
	error?: string;
	data?: TopupType;
	basket?: Basket;
	basketId?: string;
	basketItemId?: string;
	basketAndBasketItems?: {
		basket: Basket;
		basketItems: Array<BasketItem>;
	};
	idOfBasketToDiscard?: string;
	owner?: User;
	initializeAddonConfig?: InitializeAddonConfig;
	initializedAddon?: InitializedAddon;
	enableAddonConfig?: EnableAddonConfig;
	addonActivationPaymentCompleted?: boolean;
	addonEnableError?: string;
	updatingBasket?: boolean;
	productId?: string;
	targetAgreementId?: string;
	// this is to display status of addon activation in toaster messages
	messages?: MessagePack;
	redirectUrl?: string;
	address?: PostalAddress;
	isValidIccid?: boolean;
	isPreactivatedIccid?: boolean;
	shippingMethodFromBasket?: boolean;
	basketItem?: BasketItem;
	activeBasket?: Basket;
	basketItemIdToAddressEntries?: BasketItemIdToAddress[];
}

const basket = {
	fluxSync: (fluxState: any) => ({ type: BasketActions.FLUX_SYNC, fluxState }),
	setSelectedShippingMethod: (product?: ProductOffering) => ({ type: BasketActions.SET_SHIPPING_METHOD, product }),
	toggleBasketMenuNotification: () => ({ type: BasketActions.TOGGLE_MENU_NOTIFICATION }),

	storeTopupProduct: (data: TopupType | null) => ({
		type: BasketActions.STORE_TOPUP_PRODUCT, data
	}),

	checkBaskets: (openBaskets: Array<Basket>, currentUser: User, activeBasket?: Basket) => {
		const basketSelectionAction = BasketSelectors.getActionByBasketStatus(
			openBaskets,
			currentUser.id,
			activeBasket
		);
		const latestBasket = BasketSelectors.getLatestCreatedBasket(openBaskets);

		switch (basketSelectionAction) {
			case BasketSelectionActionEnum.ASSIGN_ACTIVE_BASKET_TO_USER:
				return {
					type: BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET,
					basket: activeBasket,
					idOfBasketToDiscard: latestBasket && latestBasket.id,
					owner: currentUser
				};
			case BasketSelectionActionEnum.SET_AN_OPEN_BASKET_AS_ACTIVE:
				if (latestBasket) {
					return {
						type: BasketActions.SET_BASKET_AS_ACTIVE_BASKET,
						basketId: latestBasket.id
					};
				} else {
					break;
				}
			default:
		}

		return { type: BasketActions.CHECK_BASKETS_COMPLETE };
	},

	getUserBaskets: (individualId: string) => ({ type: BasketActions.GET_USER_BASKETS, individualId }),
	getUserBasketsComplete: (openBaskets: Array<Basket>) => ({
		type: BasketActions.GET_USER_BASKETS_COMPLETE,
		openBaskets
	}),
	getUserBasketsFailed: (error: string) => ({ type: BasketActions.GET_USER_BASKETS_FAILED, error }),

	createBasket: (individualId: string) => ({ type: BasketActions.CREATE_BASKET, individualId }),
	createBasketComplete: (basket: Basket) => ({ type: BasketActions.CREATE_BASKET_COMPLETE, basket }),
	createBasketFailed: (error: string) => ({ type: BasketActions.CREATE_BASKET_FAILED, error }),

	discardBasket: (basketId: string, individualId?: string, redirectUrl?: string) => ({
		type: BasketActions.DISCARD_BASKET,
		basketId,
		individualId,
		redirectUrl,
	}),
	discardBasketComplete: (basket: Basket) => ({ type: BasketActions.DISCARD_BASKET_COMPLETE, basket }),
	discardBasketFailed: (error: string) => ({ type: BasketActions.DISCARD_BASKET_FAILED, error }),

	assignBasketToUserAndDiscardAnotherBasket: (basketToAssign: Basket, owner: User, basketToDiscard?: Basket) =>
		({
			type: BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET,
			basket: basketToAssign,
			idOfBasketToDiscard: basketToDiscard && basketToDiscard.id,
			owner
		}),
	assignBasketToUserAndDiscardAnotherBasketComplete: (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) =>
		({ type: BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE, basketAndBasketItems }),
	assignBasketToUserAndDiscardAnotherBasketFailed: (error: string) =>
		({ type: BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_FAILED, error }),

	setBasketAsActiveBasket: (basketId: string) => ({ type: BasketActions.SET_BASKET_AS_ACTIVE_BASKET, basketId }),
	setBasketAsActiveBasketComplete: (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) =>
		({ type: BasketActions.SET_BASKET_AS_ACTIVE_BASKET_COMPLETE, basketAndBasketItems }),

	getBasket: (basketId: string) => ({ type: BasketActions.GET_BASKET, basketId }),
	getBasketComplete: (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) => (
		{ type: BasketActions.GET_BASKET_COMPLETE, basketAndBasketItems }
	),
	getBasketFailed: (error: string) => ({ type: BasketActions.GET_BASKET_FAILED, error }),

	deleteUIBasket: () => ({ type: BasketActions.DELETE_UI_BASKET }),

	deleteItemFromBasket: (basketItem: BasketItem, basketId: string, shippingMethodFromBasket: boolean) => ({
		type: BasketActions.DELETE_ITEM_FROM_BASKET,
		basketItem,
		basketId,
		shippingMethodFromBasket,
	}),

	deleteItemFromBasketComplete: (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) => (
		{ type: BasketActions.DELETE_ITEM_FROM_BASKET_COMPLETE, basketAndBasketItems }
	),
	deleteItemFromBasketFailed: (error: string) => ({ type: BasketActions.DELETE_ITEM_FROM_BASKET_FAILED, error }),

	getBasketAfterDeleteComplete: (activeBasket?: Basket) => ({
		type: BasketActions.GET_BASKET_AFTER_DELETE_COMPLETE,
		activeBasket,
	}),

	removeFromUIBasketComplete: (basketItem: BasketItem) => ({ type: BasketActions.REMOVE_FROM_UI_BASKET_COMPLETE, basketItem }),

	removeShippingMethodsComplete: (basketItem: BasketItem) => ({
		type: BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE,
		basketItem,
	}),

	getBasketIncludeAfterDeleteComplete: (basketAndBasketItems: { basket: Basket, basketItems: Array<BasketItem> }) => ({
		type: BasketActions.GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE,
		basketAndBasketItems,
	}),

	initializeEnableAddon: (params: InitializeAddonConfig) => ({ type: BasketActions.INITIALIZE_ENABLE_ADDON, initializeAddonConfig: params }),
	initializeEnableAddonComplete: (addon?: InitializedAddon) => (
		{ type: BasketActions.INITIALIZE_ENABLE_ADDON_COMPLETE, initializedAddon: addon }
	),

	enableAddon: (config: EnableAddonConfig, messages?: MessagePack) => ({ type: BasketActions.ENABLE_ADDON, enableAddonConfig: config, messages: messages }),

	enableAddonComplete: (paymentCompleted: boolean) => ({ type: BasketActions.ENABLE_ADDON_COMPLETE, addonActivationPaymentCompleted: paymentCompleted }),

	deactivateAddon: (productId: string, targetAgreementId: string) => ({ type: BasketActions.DEACTIVATE_ADDON, productId, targetAgreementId }),

	clearAddonInitialization: () => ({ type: BasketActions.CLEAR_ADDON_INITIALIZATION }),

	updatingBasket: (updatingBasket: boolean) => ({ type: BasketActions.UPDATING_BASKET, updatingBasket }),

	storeAddressWithBasketItemId: (basketItemId: string, address: PostalAddress) => ({
		type: BasketActions.STORE_ADDRESS_WITH_BASKET_ITEM_ID,
		basketItemId,
		address
	}),

	resetAddressWithBasketItemIdEntries: () => ({ type: BasketActions.RESET_ADDRESS_WITH_BASKET_ITEM_ID_ENTRIES }),
	validateICCID: (isValidIccid: boolean) => ({type: BasketActions.VALIDATE_ICCID, isValidIccid}),
	validatePreactivatedICCID: (isPreactivatedIccid: boolean) => ({type: BasketActions.VALIDATE_PREACTIVATED_ICCID, isPreactivatedIccid}),
	updateBasketItemIdToAddressEntries: (basketItemIdToAddressEntries: BasketItemIdToAddress[])  => ({ type: BasketActions.UPDATE_BASKET_ITEMID_TO_ADDRESS_ENTRIES, basketItemIdToAddressEntries }),
};

export {
	BasketActions,
	BasketActionPayload,
	basket
};
