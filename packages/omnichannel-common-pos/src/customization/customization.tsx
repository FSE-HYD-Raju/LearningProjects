import * as React from "react";
import customizationPointsResolver from "./CustomizationPointsResolver";
import {
	CustomizationPointsMapping, CustomizationFunction, CustomizationClass, CustomizationBootstrapType
} from "./types";
import { Store } from "react-redux";
import { FluxAlt, AppState } from "../redux";
import { debounce } from "lodash";
import { SessionUtils, SessionKeys, parseJSON, fitDateFromSession } from "../utils/SessionUtils";
import sessionSelector from "../redux/models/session/session.selectors";

/**
 * Subscribe to change store for persist state
 */
function persistState(store: any) {
	store.subscribe(() => {
		saveStateToSessionStore(store);
	});
}

export function setCustomizationPointsMapping<S extends AppState>(customizationPointsMapping: CustomizationPointsMapping<S>) {
	customizationPointsResolver.setCustomizationPointsMapping(customizationPointsMapping);
}

export function withSchemaCustomization(customizationKey: string, defaultSchema: any): any {
	return customizationPointsResolver.getSchema(customizationKey, defaultSchema);
}

/**
 * Function that works as HOC and provides ability to customize componentes
 * By default it returns defaultComponent.
 * If other component was registered to correspond to provided customizationKey - this component will be returned

 */
export function withCustomization<P>(customizationKey: string, defaultComponent: React.ComponentType<P>): React.ComponentType<P> {
	if (process.env.NODE_ENV === "test") {
		return defaultComponent;
	}
	return (props: P) => {
		const CustomizationComponentType = customizationPointsResolver.getComponent<P>(customizationKey, defaultComponent);
		return <CustomizationComponentType	{...props}/>;
	};
}

/**
 * Provides ability to customize objects (it could be configuration objects)
 * @returns custom function if registered or default function otherwise
 */
export function withObjectCustomization<T>(customizationKey: string, defaultObject: T): T {
	return customizationPointsResolver.getObject<T>(customizationKey, defaultObject);
}

/**
 * Provides ability to customize function
 * @returns custom function if registered or default function otherwise
 */
export function withFunctionCustomization(customizationKey: string, defaultFunction: CustomizationFunction): CustomizationFunction {
	return (...args: any[]): any => {
		return customizationPointsResolver.getFunction(customizationKey, defaultFunction)(...args);
	};
}

/**
 * Provides ability to customize class-instance
 * @returns custom class instance if registered or default otherwise
 */
export function withClassCustomizationFactory<T>(
	customizationKey: string,
	defaultClass: new (...args: any[]) => T
): (...args: any[]) => T {
	return (...args: any[]): T => {
		const ClassType = withClassCustomization(customizationKey, defaultClass);
		return new ClassType(...args);
	};
}

/**
 * Provides ability to customize class
 * @returns return customized class type if registered or default
 */
export function withClassCustomization<T>(
	customizationKey: string,
	defaultClass: new (...args: any[]) => T
): CustomizationClass<T> {
	return customizationPointsResolver.getClassType<T>(customizationKey, defaultClass);
}

// creates flux, redux store, connects flux and redux, sets customizationPointsMapping
export type CustomizationMappingResult<S extends AppState> = {
	flux: FluxAlt<S>;
	store: Store<S>;
	customizationPointsMapping: CustomizationPointsMapping<S>;
};

/**
 * Provides ability to persist part of state to sessionStore
 */
export const saveStateToSessionStore = debounce((store: any) => {
	const state: any = store.getState();
	SessionUtils.setItem(SessionKeys.app, JSON.stringify(sessionSelector(state)));
}, 1000);
/**
 * Util function to bootstrap application with customization configuration
 */
export function bootstrapAppWithCustomization<S extends AppState>(config: CustomizationBootstrapType<S>): CustomizationMappingResult<S> {
	const { getFlux, getStore, connectFluxReduxChannel, customizationPointsMapping } = config;
	let initialState = {};
	setCustomizationPointsMapping<S>(customizationPointsMapping);
	const flux = getFlux<S>({
		customizedStores: customizationPointsMapping.flux ? customizationPointsMapping.flux.stores : undefined,
		customizedActions: customizationPointsMapping.flux ? customizationPointsMapping.flux.actions : undefined
	});
	const sessionStore = SessionUtils.getItem(SessionKeys.app);
	const initialApp = parseJSON(sessionStore);

	if (initialApp) {
		fitDateFromSession(initialApp, "b2cCheckout");
		initialState = initialApp;
	}
	const { redux } =  customizationPointsMapping;
	const store = getStore<S>({
		reducers: redux ? redux.reducers : undefined,
		customSaga: redux ? redux.saga : null,
		initialState,
		interceptReducers: redux ? redux.interceptReducers : undefined
	});

	flux.setReduxStore(store);
	connectFluxReduxChannel(
		flux,
		store,
		customizationPointsMapping.redux ? customizationPointsMapping.redux.fluxStoreToReduxMap : {},
		customizationPointsMapping.redux ? customizationPointsMapping.redux.extendedActions : {}
	);
	persistState(store); // subscribe on store and save state to session store
	return {
		flux,
		store,
		customizationPointsMapping
	};
}
