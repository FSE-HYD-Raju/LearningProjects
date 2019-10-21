"use strict";

import { MiniBasketErrorState } from "./basketError.types";
import { BasketErrorActions, BasketErrorPayload } from "./basketError.actions";
const uuidv4 = require("uuid/v4");

const basketErrorState = {
		errors: []
};

const basketErrorReducer = (state: MiniBasketErrorState = basketErrorState, action: BasketErrorPayload) => {
	const {type, errors, productName} = action;
	switch (type) {
		case BasketErrorActions.ADD_BASKET_ERROR :
			return {
				...state,
				errors:
					[...state.errors,
						{
							productName: productName,
							errorId: uuidv4(),
							error: {...errors[0]}
						}
					]
			};
		case BasketErrorActions.CLEAR_BASKET_ERROR_STORE:
			return {
				...state,
				errors: []
			};
		case  BasketErrorActions.REMOVE_BASKET_ERROR:
			return {
				...state,
				errors: state.errors.filter(error => error.errorId !== action.errorId)
			};
		default:
			return state;
	}
};

export default basketErrorReducer;
export { MiniBasketErrorState };
