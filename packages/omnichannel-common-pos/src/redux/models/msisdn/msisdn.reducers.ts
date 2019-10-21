"use strict";
import { get } from "lodash";
import { MsisdnActions, MsisdnActionPayload } from "./msisdn.actions";
import { ResourceStocks } from "../../types";
import { MsisdnState } from "./msisdn.types";
export { MsisdnState } from "./msisdn.types";

const initialState = {
	isMSISDNPortable: true,
	inventories: [],
	stocks: [],
	selectionStocks: [],
	reservationAttributes: {},
	reservationError: false,
	inputtedPattern: "",
	eligibleMsisdn: true,
	activeReservationId: "",
	selectedCategory: "",
};

const msisdnReducer = (state: Partial<MsisdnState> = initialState, action: MsisdnActionPayload) => {
	const { type, basket, productId, error } = action;
	switch (type) {
		case MsisdnActions.FLUX_SYNC:
			return {
				...state,
				...action.fluxState
			};
		case MsisdnActions.VALIDATE_PORT_IN_MSISDN_COMPLETE:
			return {
				...state,
				portInData: action.MSISDN,
				isMSISDNPortable: action.isMSISDNPortable
			};
		case MsisdnActions.VALIDATE_PORT_IN_MSISDN_FAIL:
			return {
				...state,
				portInData: undefined,
				isMSISDNPortable: true
			};
		case MsisdnActions.PERFORM_CHANGE_MSISDN:
			return {
				...state,
				msisdnChanges: {
					...state.msisdnChanges,
					[productId!]: {
						queryActive: true,
					}
				}
			};
		case MsisdnActions.PERFORM_CHANGE_MSISDN_COMPLETE:
			return {
				...state,
				msisdnChanges: {
					...state.msisdnChanges,
					[productId!]: {
						queryActive: false,
						basket
					}
				}
			};
		case MsisdnActions.PERFORM_CHANGE_MSISDN_FAILED:
			return {
				...state,
				msisdnChanges: {
					...state.msisdnChanges,
					[productId!]: {
						queryActive: false,
						error
					}
				}
			};
		case MsisdnActions.CLEAR_CHANGE_MSISDN:
			return {
				...state,
				msisdnChanges: {}
			};
		case MsisdnActions.PERFORM_CHANGE_CATEGORY:
			return {
				...state,
				selectedCategory: action.categoryId
			};
		case MsisdnActions.RESOURCE_INVENTORIES:
			return {
				...state
			};
		case MsisdnActions.RESOURCE_INVENTORIES_COMPLETE:
			return {
				...state,
				inventories: action.inventories,
				stocks: action.stocks,
			};
		case MsisdnActions.RESOURCE_INVENTORIES_FAILED:
			return {
				...state,
				error,
			};
		case MsisdnActions.CHANGE_INVENTORY:
			const selectedInvStocks: Array<ResourceStocks> = get(action.selectedInventory, "relationships.stocks.data") || [];

			const filteredStocks: Array<ResourceStocks> | any = action.stocks && action.stocks.filter(stock => {
				return selectedInvStocks.some((selStock: ResourceStocks) => {
					return selStock.id === stock.id;
				});
			});

			return {
				...state,
				selectedInventory: action.selectedInventory,
				selectionStocks: filteredStocks,
			};
		case MsisdnActions.RESERVE_MSISDN_COMPLETE:
			const reservationAttributes = action.response && action.response.attributes;
			return {
				...state,
				reservationAttributes: reservationAttributes,
				activeReservationId: action.reservedFor,
				reservationError: false,
				selectedCategory: action.stock,
				inputtedPattern: action.pattern,
			};
		case MsisdnActions.RELEASE_MSISDN_COMPLETE:
			const releaseId = action.releaseId;
			if (releaseId === state.activeReservationId) {
				return {
					...state,
					reservationAttributes: {},
					activeReservationId: null,
					selectedCategory: null,
					inputtedPattern: null
				};
			} else {
				return { ...state }
			}
		case MsisdnActions.ERROR:
			return {
				...state,
				error,
			};
		default:
			return state;
	}
};

export {
	initialState
};
export default msisdnReducer;
