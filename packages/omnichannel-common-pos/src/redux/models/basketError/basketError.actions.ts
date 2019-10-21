"user strict";

import { Action } from "redux";
import { ErrorType } from "./basketError.types";

enum BasketErrorActions {
	ADD_BASKET_ERROR = "Add_Basket_Error",
	CLEAR_BASKET_ERROR_STORE = "Clear_Min_Basket_Error_Store",
	REMOVE_BASKET_ERROR = "Clear_Basket_Error",
}

interface BasketErrorPayload extends Action<BasketErrorActions> {
	errors: Array<ErrorType>;
	productName: string;
	errorId: string;
}

const basketError = {
	addBasketError: (errorPayload: BasketErrorPayload) => ({
		type: BasketErrorActions.ADD_BASKET_ERROR, errors: errorPayload.errors, productName: errorPayload.productName
	}),
	clearBasketErrorStore: () => ({type: BasketErrorActions.CLEAR_BASKET_ERROR_STORE}),
	removeBasketError: (errorId: string) => ({type: BasketErrorActions.REMOVE_BASKET_ERROR, errorId: errorId})
};

export {
	BasketErrorActions,
	BasketErrorPayload,
	basketError,
};
