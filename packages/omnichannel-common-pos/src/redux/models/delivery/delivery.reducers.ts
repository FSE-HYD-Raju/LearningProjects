"use strict";

import { DeliveryActionPayload, DeliveryActions } from "./delivery.actions";
import { DeliveryState } from "./delivery.types";

const initialState: DeliveryState = {
	shippingMethods: {},
	basketShippingMethods: {},
	activeQueries: {},
};

const deliveryReducer = (state: Partial<DeliveryState> = initialState, action: DeliveryActionPayload) => {
	const { type } = action;
	switch (type) {
		case DeliveryActions.GET_SHIPPING_METHODS_FOR_PO_COMPLETE:
			return {
				...state,
				shippingMethods: { ...state.shippingMethods, ...{ [action.poId!]: action.shippingMethods } }
			};
		case DeliveryActions.GET_SHIPPING_METHODS_FOR_PO_FAIL:
			return {
				...state,
				shippingMethods: { ...state.shippingMethods, ...{ [action.poId!]: [] } }
			};
		case DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET:
			return {
				...state,
				basketShippingMethods: {
					...state.basketShippingMethods,
					...{
						[action.basketId!]: []
					}
				},
				activeQueries: {
					...state.activeQueries,
					...{
						[action.basketId!]: true
					}
				},
			};
		case DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET_COMPLETE:
			return {
				...state,
				basketShippingMethods: {
					...state.basketShippingMethods,
					...{
						[action.basketId!]: action.basketShippingMethods
					}
				},
				activeQueries: {
					...state.activeQueries,
					...{
						[action.basketId!]: false
					}
				},
			};
		case DeliveryActions.GET_SHIPPING_METHODS_FOR_BASKET_FAIL:
			return {
				...state,
				basketShippingMethods: {
					...state.basketShippingMethods,
					...{
						[action.basketId!]: []
					}
				},
				activeQueries: {
					...state.activeQueries,
					...{
						[action.basketId!]: false
					}
				},
			};
		default:
			return state;
	}
};

export default deliveryReducer;

export { DeliveryState };
