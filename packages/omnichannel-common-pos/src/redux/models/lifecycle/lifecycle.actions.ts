import { Action } from "redux";
import { ConsulValues } from "../consul/consul.types";
import { InitializeAddonStateTransitionParam, InitializeServiceStateTransitionsParam } from "./lifecycle.types";
import {
	LifecycleChangeAction,
	Product,
	ProductModificationResult,
	Service,
	ServiceModificationInitializationResult,
	Reason, OrderCancel
} from "../../types";

export enum LifecycleActions {
    FLUX_SYNC = "Lifecycle_FLUX_SYNC",

	SET_VALUES = "Lifecycle_SET_VALUES",

	CANCEL_ORDER = "Lifecycle_CANCEL_ORDER",
	CANCEL_ORDER_COMPLETE = "Lifecycle_CANCEL_ORDER_COMPLETE",
	INITIALIZE_SERVICE_STATE_TRANSITION = "Lifecycle_INITIALIZE_SERVICE_STATE_TRANSITION",
	INITIALIZE_SERVICE_STATE_TRANSITION_COMPLETE = "Lifecycle_INITIALIZE_SERVICE_STATE_TRANSITION_COMPLETE",
	ACCEPT_SERVICE_LIFECYCLE_CHANGE = "Lifecycle_ACCEPT_SERVICE_LIFECYCLE_CHANGE",
	ACCEPT_SERVICE_LIFECYCLE_CHANGE_COMPLETE = "Lifecycle_ACCEPT_SERVICE_LIFECYCLE_CHANGE_COMPLETE",
	CANCEL_LIFECYCLE_STATE_CHANGE = "Lifecycle_CANCEL_LIFECYCLE_STATE_CHANGE",
	CANCEL_LIFECYCLE_STATE_CHANGE_COMPLETE = "Lifecycle_CANCEL_LIFECYCLE_STATE_CHANGE_COMPLETE",
	RESET_STATE_MODIFICATION_RESULT = "Lifecycle_RESET_STATE_MODIFICATION_RESULT",

	INITIALIZE_PRODUCT_STATE_TRANSITION = "Lifecycle_INITIALIZE_PRODUCT_STATE_TRANSITION",
	INITIALIZE_PRODUCT_STATE_TRANSITION_COMPLETE = "Lifecycle_INITIALIZE_PRODUCT_STATE_TRANSITION_COMPLETE",
	ACCEPT_PRODUCT_LIFECYCLE_CHANGE = "Lifecycle_ACCEPT_PRODUCT_LIFECYCLE_CHANGE",
	ACCEPT_PRODUCT_LIFECYCLE_CHANGE_COMPLETE = "Lifecycle_ACCEPT_PRODUCT_LIFECYCLE_CHANGE_COMPLETE",

	FETCH_REASONS = "Lifecycle_FETCH_REASONS",
	FETCH_REASONS_COMPLETE = "Lifecycle_FETCH_REASONS_COMPLETE",
	SET_TRANSITION = "Lifecycle_SET_TRANSITION",
	SET_SELECTED_SERVICE = "Lifecycle_SET_SELECTED_SERVICE",
	SET_SELECTED_ADDON = "Lifecycle_SET_SELECTED_ADDON",
	CLEAR_TRANSITION_STATE = "Lifecycle_CLEAR_TRANSITION_STATE",
}

export interface LifecycleActionPayload extends Action<LifecycleActions> {
    fluxState?: any;
    values?: ConsulValues;
    error?: string;
    initializeServiceStateTransitionsParam?: InitializeServiceStateTransitionsParam;
	initializeServiceStateTransitionsResult?: ServiceModificationInitializationResult;
	basketId?: string;
	paymentMethodId?: string;
	initializeProductStateTransitionsParam?: InitializeAddonStateTransitionParam;
	initializeProductStateTransitionsResult?: ProductModificationResult;
	transition?: LifecycleChangeAction;
	addon?: Product;
	service?: Service;
	reasons?: Array<Reason>;
	reasonId?: string;
	reasonType?: string;
	orderId?: string;
}

export const lifecycle = {
    fluxSync: (fluxState: any) => ({type: LifecycleActions.FLUX_SYNC, fluxState}),
	setValues: (values: ConsulValues) => ({type: LifecycleActions.SET_VALUES, values}),
	initializeServiceStateTransition: (param: InitializeServiceStateTransitionsParam) => (
		{ type: LifecycleActions.INITIALIZE_SERVICE_STATE_TRANSITION, initializeServiceStateTransitionsParam: param }
	),
	initializeServiceStateTransitionComplete: (result?: ServiceModificationInitializationResult) => (
		{ type: LifecycleActions.INITIALIZE_SERVICE_STATE_TRANSITION_COMPLETE, initializeServiceStateTransitionsResult: result }
	),
	acceptServiceLifecycleStatusChange: (basketId: string) => (
		{ type: LifecycleActions.ACCEPT_SERVICE_LIFECYCLE_CHANGE, basketId}
	),
	acceptServiceLifecycleStatusChangeComplete: () => ({ type: LifecycleActions.ACCEPT_SERVICE_LIFECYCLE_CHANGE_COMPLETE }),
	cancelLifecycleStatusChange: (basketId: string) => (
		{ type: LifecycleActions.CANCEL_LIFECYCLE_STATE_CHANGE, basketId}
	),
	cancelLifecycleStatusChangeComplete: () => ({ type: LifecycleActions.CANCEL_LIFECYCLE_STATE_CHANGE_COMPLETE }),
	resetStateModificationResult: () => ({ type: LifecycleActions.RESET_STATE_MODIFICATION_RESULT }),
	initializeProductStateTransition: (param: InitializeAddonStateTransitionParam) => (
		{ type: LifecycleActions.INITIALIZE_PRODUCT_STATE_TRANSITION, initializeProductStateTransitionsParam: param }
	),
	initializeProductStateTransitionComplete: (result?: ProductModificationResult) => (
		{ type: LifecycleActions.INITIALIZE_PRODUCT_STATE_TRANSITION_COMPLETE, initializeProductStateTransitionsResult: result }
	),
	acceptProductLifecycleStatusChange: (basketId: string, paymentMethodId: string | undefined) => (
		{ type: LifecycleActions.ACCEPT_PRODUCT_LIFECYCLE_CHANGE, basketId, paymentMethodId}
	),
	acceptProductLifecycleStatusChangeComplete: () => ({ type: LifecycleActions.ACCEPT_PRODUCT_LIFECYCLE_CHANGE_COMPLETE }),

	fetchReasons: (id: string | undefined, type: string) => ({ type: LifecycleActions.FETCH_REASONS, reasonId: id, reasonType: type}),
	fetchReasonsComplete: (reasons: Array<Reason>) => ({ type: LifecycleActions.FETCH_REASONS_COMPLETE, reasons}),
	setTransition: (transition: LifecycleChangeAction) => ({ type: LifecycleActions.SET_TRANSITION, transition }),
	setSelectedService: (service: Service) => ({ type: LifecycleActions.SET_SELECTED_SERVICE, service }),
	setSelectedAddon: (addon: Product) => ({ type: LifecycleActions.SET_SELECTED_ADDON, addon }),
	clearTransitionState: () => ({type: LifecycleActions.CLEAR_TRANSITION_STATE}),
	cancelOrder: (orderId: string, reasonId: string) => ({type: LifecycleActions.CANCEL_ORDER, orderId, reasonId}),
	cancelOrderComplete: (orderCancel?: OrderCancel) => ({type: LifecycleActions.CANCEL_ORDER_COMPLETE, orderCancel}), /* seems not to be used */
};
