import { LifecycleActionPayload, LifecycleActions } from "./lifecycle.actions";
import { LifecycleState } from "./lifecycle.types";
import { createProductModificationResult, createServiceModificationResult, extractValues } from "./lifecycle.utils";
import { ConsulValues } from "../../types";

export { LifecycleState } from "./lifecycle.types";

const initialState = {
	reasons: [],
};

const lifecycleReducer = (state: Partial<LifecycleState> = initialState, action: LifecycleActionPayload): Partial<LifecycleState> => {
	const { type } = action;
	switch (type) {
		case LifecycleActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case LifecycleActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues)};
		case LifecycleActions.INITIALIZE_SERVICE_STATE_TRANSITION_COMPLETE:
			return {
				...state,
				serviceModification: createServiceModificationResult(action.initializeServiceStateTransitionsResult!)
			};
		case LifecycleActions.ACCEPT_SERVICE_LIFECYCLE_CHANGE_COMPLETE:
			return {
				...state,
				reasons: [],
				transition: undefined,
			};
		case LifecycleActions.CANCEL_LIFECYCLE_STATE_CHANGE_COMPLETE:
		case LifecycleActions.RESET_STATE_MODIFICATION_RESULT:
			return {
				...state,
				serviceModification: undefined,
				productModification: undefined,
				reasons: [],
				transition: undefined,
			};
		case LifecycleActions.INITIALIZE_PRODUCT_STATE_TRANSITION_COMPLETE:
			return {
				...state,
				productModification: createProductModificationResult(action.initializeProductStateTransitionsResult!)
			};
		case LifecycleActions.ACCEPT_PRODUCT_LIFECYCLE_CHANGE_COMPLETE:
			return {
				...state,
				reasons: [],
				transition: undefined,
			};
		case LifecycleActions.FETCH_REASONS_COMPLETE:
			return {
				...state,
				reasons: action.reasons!,
			};
		case LifecycleActions.SET_TRANSITION:
			return { ...state, transition: action.transition };
		case LifecycleActions.SET_SELECTED_SERVICE:
			return { ...state, selectedService: action.service };
		case LifecycleActions.SET_SELECTED_ADDON:
			return { ...state, selectedAddon: action.addon };
		case LifecycleActions.CLEAR_TRANSITION_STATE:
			return { ...state, reasons: [], transition: undefined, selectedService: undefined};
		default:
			return state;
	}
};

export default lifecycleReducer;
