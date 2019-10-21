"use strict";

import { ConsulValues } from "../consul/consul.types";
import {
	ProductOfferingConfigurationActionPayload,
	ProductOfferingConfigurationActions
} from "./productOfferingConfiguration.actions";

import { ProductOfferingConfigurationState } from "./productOfferingConfiguration.types";
import {
	extractValues,
	makeMsisdnSoftReservation, nominationSearchComplete,
	nominationSearchStart,
	selectProductOffering,
	setEnhancedCharacteristics,
	setInputtedCharacteristic,
	toggleProductOffering
} from "./productOfferingConfiguration.utils";

export { ProductOfferingConfigurationState } from "./productOfferingConfiguration.types";

const initialState: ProductOfferingConfigurationState = {
	configurations: {},
	configurableInstallationTime: {},
	msisdnSoftReservation: undefined,
	nominationSubscriptionInformation: {},
	synchronizeEnhancedCharacteristics: true,
};

const productOfferingConfigurationReducer = (state: ProductOfferingConfigurationState = initialState,
											 action: ProductOfferingConfigurationActionPayload) => {
	const {type} = action;
	switch (type) {
		case ProductOfferingConfigurationActions.FLUX_SYNC:
			return {...state, ...action.fluxState};
		case ProductOfferingConfigurationActions.SET_VALUES:
			return {...state, ...extractValues(action.values as ConsulValues)};
		case ProductOfferingConfigurationActions.SET_CHARS_CONFIG_CONTEXT:
			return {...state, characteristicsConfigurationContext: action.config};
		case ProductOfferingConfigurationActions.TOGGLE_PRODUCT_OFFERING:
			return {...state, configurations: toggleProductOffering(state.configurations!, action.path!, action.forceSelect!)};
		case ProductOfferingConfigurationActions.SET_INPUTTED_CHARACTERISTIC: {
			return {...state,
				configurations: setInputtedCharacteristic(state.configurations,
					action.path!,
					action.key!,
					action.value!,
					state.synchronizeEnhancedCharacteristics)};
		}
		case ProductOfferingConfigurationActions.SELECT_PRODUCT_OFFERING: {
			return {
				...state,
				configurations: selectProductOffering(state.configurations,
					action.path!,
					action.value!,
					action.productOfferings!)
			};
		}
		case ProductOfferingConfigurationActions.MAKE_MSISDN_SOFT_RESERVATION_COMPLETE: {
			if (action.makeReservationResult && action.makeReservationResult.msisdnSoftReservation.status === 201) {
				return { ...state,
					msisdnSoftReservation: action.makeReservationResult,
					configurations: makeMsisdnSoftReservation(state.configurations,
						action.makeReservationResult!,
						state.synchronizeEnhancedCharacteristics)};
			}
			return state;
		}
		case ProductOfferingConfigurationActions.UPDATE_MSISDN_SOFT_RESERVATION_COMPLETE: {
			if (action.makeReservationResult && action.makeReservationResult.msisdnSoftReservation.status === 200) {
				return { ...state,
					msisdnSoftReservation: action.makeReservationResult,
					configurations: makeMsisdnSoftReservation(state.configurations,
						action.makeReservationResult!,
						state.synchronizeEnhancedCharacteristics)};
			}
			return state;
		}
		case ProductOfferingConfigurationActions.RESET_CONFIGURATIONS: {
			return {
				...state,
				configurations: {},
				msisdnSoftReservation: undefined,
				configurableInstallationTime: {},
				nominationSubscriptionInformation: {},
			};
		}
		case ProductOfferingConfigurationActions.RESET_PRODUCT_OFFERING_GROUPS: {
			const configurations =  {...state.configurations};
			configurations[action.productId!].productOfferingGroups = [];
			return {
				...state,
				configurations
			};
		}
		case ProductOfferingConfigurationActions.SET_CONFIGURABLE_INSTALLATION_TIME: {
			if (action.path && action.path.length > 0) {
				const config = action.path[0];
				const id: string = config.po ? config.po : config.pog || "";
				return {
					...state,
					configurableInstallationTime: {
						[id]: { path: action.path, key: action.key },
					}
				};
			}
			return state;
		}
		case ProductOfferingConfigurationActions.RESET_CONFIGURABLE_INSTALLATION_TIME: {
			return {
				...state,
				configurableInstallationTime: {},
			};
		}
		case ProductOfferingConfigurationActions.RESET_MSISDN_SOFT_RESERVATION: {
			return {
				...state,
				msisdnSoftReservation: undefined,
			};
		}
		case ProductOfferingConfigurationActions.SET_ENHANCED_CHARACTERISTICS: {
			return {
				...state,
				configurations: setEnhancedCharacteristics(state.configurations,
					{path: action.path!, key: action.key!, valueArray: action.valueArray!})
			};
		}
		case ProductOfferingConfigurationActions.NOMINATION_SEARCH_START: {
			return nominationSearchStart(state, action.searchTerm!, action.path!, action.nominationCharacteristics!);
		}
		case ProductOfferingConfigurationActions.NOMINATION_SEARCH_COMPLETE: {
			return nominationSearchComplete(state, action.path!, action.nominationCharacteristics!, action.nominationSearchResult, action.productOffering);
		}
		default:
			return state;
	}
};

export default productOfferingConfigurationReducer;
export {
	initialState as productOfferingConfigurationInitialState
};
