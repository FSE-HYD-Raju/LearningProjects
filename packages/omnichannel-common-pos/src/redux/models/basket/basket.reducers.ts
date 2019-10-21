"use strict";

import { get } from "lodash";

import { BasketActions, BasketActionPayload } from "./basket.actions";
import { BasketState, BasketItemIdToAddress } from "./basket.types";
import { LifecycleActions, LifecycleActionPayload } from "../lifecycle/lifecycle.actions";
import { ShippingMethod } from "../../types/ShippingMethod";
import { BasketItem } from "../../types";
import BasketUtil from "../../../utils/BasketUtil"

export { BasketState } from "./basket.types";

const initialState = (): Partial<BasketState> => ({
	showBasketMenuNotification: false,
	basketItems: [],
	unidentifiedCustomerBasket: {
		basketId: ""
	},
	checkoutConfiguration: {
		setupConfiguration: {}
	},
	requestedMandatoryConfiguration: {},
	showNoCustomerWarning: false,
	addonUpdateInProgress: false,
	reasonForAction: {
		value: "add promotion"
	}, // This is a hardcoded thing related to how basket discounts work. This should come from consul or something
	discounts: [],
	showInstallationTimeConfigurationModal: false,
	productsWithTopUps: [],
	shippingMethods: [],
	updatingBasket: false,
	portInData: null,
	validIcc: false,
	showBlacklistedCustomerWarning: false,
	basketItemIdToAddressEntries: [],
	isValidIccid: true,
	isPreactivatedIccid: true,
});

const basketReducer = (state: Partial<BasketState> = initialState(), reduxAction: BasketActionPayload | LifecycleActionPayload): Partial<BasketState> => {
	const action = reduxAction as BasketActionPayload;
	const { type } = reduxAction;
	switch (type) {
		case BasketActions.FLUX_SYNC:
			return {
				...state,
				...action.fluxState
			};
		case BasketActions.SET_SHIPPING_METHOD:
			return {
				...state,
				selectedShippingMethod: action.product
			};
		case BasketActions.ASSIGN_BASKET_TO_USER_AND_DISCARD_ANOTHER_BASKET_COMPLETE:
			return {
				activeBasket: get(action, "basketAndBasketItems.basket"),
				basketItems: get(action, "basketAndBasketItems.basketItems"),
				openBaskets: undefined,
				shippingMethods: [],
				selectedShippingMethod: undefined
			};
		case BasketActions.SET_BASKET_AS_ACTIVE_BASKET_COMPLETE:
			return {
				...state,
				activeBasket: get(action, "basketAndBasketItems.basket"),
				basketItems: get(action, "basketAndBasketItems.basketItems"),
				openBaskets: undefined,
				showBasketMenuNotification: true,
				working: false,
				updatingBasket: false
			};
		case BasketActions.TOGGLE_MENU_NOTIFICATION:
			return {
				...state,
				showBasketMenuNotification: !state.showBasketMenuNotification
			};
		case BasketActions.GET_USER_BASKETS_COMPLETE:
			return {
				...state,
				openBaskets: action.openBaskets
			};
		case BasketActions.STORE_TOPUP_PRODUCT:
			return {
				...state,
				storedTopupProduct: action.data
			};
		case BasketActions.CREATE_BASKET:
			return {
				...state,
				updatingBasket: true,
				createBasketError: undefined
			};
		case BasketActions.CREATE_BASKET_COMPLETE:
			return {
				...state,
				activeBasket: action.basket,
				updatingBasket: false,
				createBasketError: undefined
			};
		case BasketActions.CREATE_BASKET_FAILED:
			return {
				...state,
				updatingBasket: false,
				createBasketError: action.error
			};
		case BasketActions.DELETE_UI_BASKET:
			return {
				...state,
				activeBasket: undefined,
				basketItems: [],
				shippingMethods: [],
				selectedShippingMethod: undefined
			};
		case BasketActions.DISCARD_BASKET:
			return {
				...state,
				updatingBasket: true,
				discardBasketError: undefined
			};
		case BasketActions.DISCARD_BASKET_COMPLETE:
			return {
				...state,
				activeBasket: action.basket,
				updatingBasket: false,
				discardBasketError: undefined
			};
		case BasketActions.DISCARD_BASKET_FAILED:
			return {
				...state,
				updatingBasket: false,
				discardBasketError: action.error
			};
		case BasketActions.GET_BASKET:
			return {
				...state,
				updatingBasket: true,
			};
		case BasketActions.GET_BASKET_COMPLETE:
			return {
				...state,
				updatingBasket: false,
				activeBasket: get(action, "basketAndBasketItems.basket"),
				basketItems: get(action, "basketAndBasketItems.basketItems"),
			};
		case BasketActions.GET_BASKET_FAILED:
			return {
				...state,
				updatingBasket: false,
			};
		case BasketActions.DELETE_ITEM_FROM_BASKET:
			return {
				...state,
				updatingBasket: true,
			};
		case BasketActions.INITIALIZE_ENABLE_ADDON_COMPLETE:
			return {
				...state,
				initializedAddon: action.initializedAddon
			};
		case BasketActions.ENABLE_ADDON_COMPLETE: {
			if (!action.addonActivationPaymentCompleted) {
				return {
					...state,
					addonSuccessfullyUpdated: false,
					addonUpdateInProgress: false,
					addonEnableError: action.addonEnableError || state.addonEnableError
				};
			} else {
				return {
					...state,
					addonSuccessfullyUpdated: true,
					addonUpdateInProgress: false,
				};
			}
		}
		case BasketActions.CLEAR_ADDON_INITIALIZATION:
			return {
				...state,
				initializedAddon: undefined,
				addonEnableError: undefined,
				addonSuccessfullyUpdated: false
			};
		case BasketActions.UPDATING_BASKET:
			return {
				...state,
				updatingBasket: action.updatingBasket
			};
		case LifecycleActions.RESET_STATE_MODIFICATION_RESULT:
			return { ...state, submittedBasket: undefined, submittedBasketItems: undefined };
		case BasketActions.STORE_ADDRESS_WITH_BASKET_ITEM_ID:
			const { basketItemId, address } = action;
			if (basketItemId && address) {
				const basketItemIdToAddressEntries = [...state.basketItemIdToAddressEntries!];
				const basketItemIdToAddress: BasketItemIdToAddress = { basketItemId, address };
				basketItemIdToAddressEntries.push(basketItemIdToAddress);
				return {
					...state,
					basketItemIdToAddressEntries
				};
			}
			return state;
		case BasketActions.UPDATE_BASKET_ITEMID_TO_ADDRESS_ENTRIES:
			return {
				...state,
				basketItemIdToAddressEntries: action.basketItemIdToAddressEntries,
			}
		case BasketActions.RESET_ADDRESS_WITH_BASKET_ITEM_ID_ENTRIES:
			return {
				...state,
				basketItemIdToAddressEntries: [],
			};
		case BasketActions.VALIDATE_ICCID:
			return {
				...state,
				isValidIccid: action.isValidIccid,
			}
		case BasketActions.VALIDATE_PREACTIVATED_ICCID:
			return {
				...state,
				isPreactivatedIccid: action.isPreactivatedIccid,
			}
		case BasketActions.GET_BASKET_AFTER_DELETE_COMPLETE:
			return {
				...state,
				activeBasket: action.activeBasket,
			}
		case BasketActions.GET_BASKET_INCLUDE_AFTER_DELETE_COMPLETE: {
			if (action.basketAndBasketItems) {
				return {
					...state,
					activeBasket: action.basketAndBasketItems.basket,
					basketItems: action.basketAndBasketItems.basketItems,
					updatingBasket: false,
					working: false,
				}
			} else {
				return state;
			}
		}
		case BasketActions.REMOVE_FROM_UI_BASKET_COMPLETE: {
			const { basketItems } = state;
			const { basketItem } = action;
			if (basketItems && basketItem) {
				const updatedBasketItems = basketItems.filter((basketItemToRemove: BasketItem) =>
					basketItemToRemove.id !== basketItem.id);
				return {
					...state,
					basketItems: updatedBasketItems,
				};
			} else {
				return state;
			}
		}
		case BasketActions.REMOVE_SHIPPING_METHODS_COMPLETE: {
			const { basketItem } = action;
			const { shippingMethods } = state;
			const updatedShippingMethods = basketItem && shippingMethods &&
				BasketUtil.removeShippingMethods(basketItem, shippingMethods);
			return {
				...state,
				shippingMethods: updatedShippingMethods,
			};
		}

		default:
			return state;
	}
};

export default basketReducer;
export {
	initialState
};
