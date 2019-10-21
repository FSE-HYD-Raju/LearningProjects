"use strict";

import { OrganizationActions, OrganizationActionPayload } from "./organization.actions";
import { OrganizationState } from "./organization.types";

export { OrganizationState };

export const initialState = (): Partial<OrganizationState> => ({
	organizationCreation: {
		queryActive: false
	}
});

const organizationReducer = (state: Partial<OrganizationState> = initialState(), action: OrganizationActionPayload) => {
	const { type, organizationCreation } = action;
	switch (type) {
		case OrganizationActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case OrganizationActions.CREATE_ORGANIZATION:
			return {...state,
				organizationCreation
			};
		case OrganizationActions.ORGANIZATION_CREATION_SUCCESS:
			return {
				...state,
				organizationCreation
			};
		case OrganizationActions.ORGANIZATION_CREATION_ERROR:
			return {
				...state,
				organizationCreation
			};
		case OrganizationActions.CLEAR_ORGANIZATION_STATE:
			return {
				...initialState()
			};
		default:
			return state;
	}
};

export default organizationReducer;
