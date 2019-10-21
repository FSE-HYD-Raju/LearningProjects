"use strict";
import { SuspensionActionPayload, SuspensionActions } from "./suspension.actions";
import { SuspensionState } from "./suspension.types";

export { SuspensionState } from "./suspension.types";

const initialState: SuspensionState = {
	suspensionProductOfferings: []
};

const suspensionReducer = (state: Partial<SuspensionState> = initialState, action: SuspensionActionPayload) => {
	const { type } = action;
	switch (type) {
		case SuspensionActions.FLUX_SYNC:
			return { ...state, ...(action as SuspensionActionPayload).fluxState };
		case SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS_COMPLETE:
			const { suspensionProductOfferings } = action;
			return {
				...state,
				suspensionProductOfferings
			};
		case SuspensionActions.GET_SUSPENSION_PRODUCT_OFFERINGS_FAIL:
			return {
				...state,
				suspensionProductOfferings: []
			};
		default:
			return state;
	}
};

export default suspensionReducer;
