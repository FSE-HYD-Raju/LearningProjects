"use strict";

import { ChangeSimActionPayload, ChangeSimActions } from "./changeSim.actions";
import { ChangeSimState } from "./changeSim.types";
import { ChangeSimUtil } from "./changeSim.util";

const initialState: ChangeSimState = {
	shippingMethods: [],
	basketId: undefined,
	paymentMethods: [],
	reasons: [],
	showingChangeSimModal: false,
	showingModifyAddressForm: false,
};

const handleInitialize = (state: Partial<ChangeSimState>, action: ChangeSimActionPayload) => {
	return {
		...state,
		basketId: undefined,
		paymentMethods: [],
		reasons: [],
		shippingMethods: [],
		selectedPaymentMethod: undefined,
		selectedCustomerPaymentMethod: undefined,
		selectedReason: undefined
	};
};

const handleInitializeComplete = (state: Partial<ChangeSimState>, action: ChangeSimActionPayload) => {
	const { changeResourceInitialization, deliveryAddress } = action;
	const reasons = action.reasons || [];
	const shippingMethods = action.shippingMethods || [];
	const basketId = ChangeSimUtil.extractBasketId(changeResourceInitialization);
	const basketItemIdToRemove = ChangeSimUtil.extractBasketItemIdToRemove(changeResourceInitialization);
	const paymentMethods =
		(changeResourceInitialization && changeResourceInitialization.attributes.paymentMethods) || [];
	const selectedPaymentMethod = paymentMethods.length > 0 && paymentMethods[0].id;
	const selectedShippingMethod = shippingMethods.length > 0 && shippingMethods[0];
	const selectedReason = undefined;
	return {
		...state,
		basketId,
		basketItemIdToRemove,
		paymentMethods,
		selectedPaymentMethod,
		selectedShippingMethod,
		selectedReason,
		shippingMethods,
		reasons,
		deliveryAddress
	};
};

const changeSimReducer = (state: Partial<ChangeSimState> = initialState, action: ChangeSimActionPayload): any => {
	const { type } = action;
	switch (type) {
		case ChangeSimActions.SHOW_MODAL:
			return {
				...state,
				showingChangeSimModal: action.showingChangeSimModal
			};
		case ChangeSimActions.SHOW_CHANGE_DELIVERY_ADDRESS:
			return {
				...state,
				showingModifyAddressForm: action.showingModifyAddressForm
			};
		case ChangeSimActions.SUBMIT:
			return {
				...state
			};
		case ChangeSimActions.SUBMIT_COMPLETE:
			return {
				...state,
				basketId: undefined,
				deliveryAddress: undefined,
			};
		case ChangeSimActions.SELECT_REASON:
			return {
				...state,
				selectedReason: action.selectedReason
			};

		case ChangeSimActions.SELECT_PAYMENT_METHOD:
			return {
				...state,
				selectedPaymentMethod: action.selectedPaymentMethod
			};
		case ChangeSimActions.SELECT_CUSTOMER_PAYMENT_METHOD:
			return {
				...state,
				selectedCustomerPaymentMethod: action.selectedCustomerPaymentMethod
			};
		case ChangeSimActions.SELECT_SHIPPING_METHOD:
			return {
				...state,
				selectedShippingMethod: action.selectedShippingMethod
			};
		case ChangeSimActions.CHANGE_DELIVERY_ADDRESS:
			return {
				...state,
				deliveryAddress: action.deliveryAddress,
			};
		case ChangeSimActions.INITIALIZE:
			return handleInitialize(state, action);
		case ChangeSimActions.INITIALIZE_COMPLETE:
			return handleInitializeComplete(state, action);

		default:
			return state;
	}
};

export default changeSimReducer;

export { ChangeSimState };
