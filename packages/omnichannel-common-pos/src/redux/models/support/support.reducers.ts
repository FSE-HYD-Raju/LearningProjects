"use strict";

import { SupportActionPayload, SupportActions } from "./support.actions";
import { SupportState } from "./support.types";

export { SupportState };

const initialState: SupportState = {
	showTroubleshootingTab: true,
	cases: [],
};

const supportReducer = (state: Partial<SupportState> = initialState, action: SupportActionPayload) => {
	const { type } = action;
	switch (type) {
		case SupportActions.GET_CUSTOMER_CASES_COMPLETE:
			return {
				...state,
				cases: action.cases
			};
		default:
			return state;
	}
};

export default supportReducer;
