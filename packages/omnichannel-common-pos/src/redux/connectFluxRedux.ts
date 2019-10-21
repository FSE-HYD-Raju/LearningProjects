"use strict";

import { isFunction, isEqual, pick, chain, values } from "lodash";
import { Store, Unsubscribe } from "redux";
import { AppActions } from "./actions";
import { AppState } from "./reducers";
import {
	Disposers,
	FluxAlt,
	FluxReduxMap,
	FluxStore,
	ReduxFluxActionMigration
} from "./types";
import { ConnectFluxReduxType } from "./types/ConnectFluxReduxType";

import { isLogsOn, isDev } from "./loggerMiddleware";

export const getDefaultFluxStoreMap = (): FluxReduxMap<AppState> => {
	return {
		B2CCheckoutStore: "b2cCheckout",
		BaseStore: "base",
		BasketStore: "basket",
		CMSAdminStore: "cmsAdmin",
		ConsulStore: "consul",
		CustomerCaseStore: "customerCase",
		CustomerStore: "customer",
		DigitalLifeStore: "digitalLife",
		CustomerInteractionsStore: "customerInteractions",
		MsisdnStore: "msisdn",
		POSCheckoutStore: "posCheckout",
		PaymentStore: "payment",
		SalesRepSessionStore: "salesRepSession",
		SalesStore: "sales",
		UserStore: "user",
	};
};

const observeFluxStore = <T, A>(fluxStore: FluxStore<T>,
								store: Store<AppState>,
								targetStoreAction: ReduxFluxActionMigration): Unsubscribe => {
	return fluxStore.listen((state: any) => {
		const pureState = filterEnumerable(state);
		store.dispatch(targetStoreAction.fluxSync(pureState));
	});
};

const observeReduxStore = (store: Store<AppState>,
						   select: (state: AppState) => AppState,
						   onChange: (data: Object) => void): Unsubscribe => {

	let currentState: Object = {};

	return store.subscribe(() => {
		const newState = select(store.getState());
		if (!isEqual(newState, currentState)) {
			currentState = {...newState};
			onChange(currentState);
		}
	});
};

const handleReduxFluxChange = <T>(fluxStore: FluxStore<T>, changed: Object, appStateProp: string, key: string) => {
	const oldState = fluxStore.getState();
	const pureState = filterEnumerable(oldState);
	if (!isEqual(pureState, changed)) {
		printLog(`${appStateProp} -> ${key}: `, pureState, "changed", changed);
		setFluxState(fluxStore, changed);
	}
};

export const connectFluxRedux: ConnectFluxReduxType = <T extends AppState, A extends AppActions>(
	flux: FluxAlt<T>,
	store: Store<AppState>,
	fluxMap: Partial<FluxReduxMap<T>>,
	actions: Partial<A>
): Disposers => {

	const state = store.getState();

	const disposers = Object
		.keys(fluxMap)
		.reduce((subs: Disposers, key: string): Disposers|any => {
			const appStateProp = fluxMap[key] as keyof AppState;
			const fluxStore = flux.stores[key];
			const targetStoreAction = actions[appStateProp] as ReduxFluxActionMigration;

			if (isStoresValid(key, fluxStore, targetStoreAction, state, appStateProp)) {
				// Flux -> Redux
				// Connect and reflect changes from flux store in redux state
				subs.fluxDisposers[key] = observeFluxStore(fluxStore, store, targetStoreAction);
				// Redux -> Flux
				// Connect and reflect changes from redux state in flux store
				subs.reduxDisposers[appStateProp] = observeReduxStore(
					store,
					(state: AppState): any => state[appStateProp],
					(changed: Object) => handleReduxFluxChange(fluxStore, changed, appStateProp, key)
				);
			}

			return subs;
		}, {
			fluxDisposers: {},
			reduxDisposers: {}
		});

	return Disposable(disposers);

};

function setFluxState<T>(store: FluxStore<T>, newState: T) {
	store.config.setState.call(store, store.state, newState);
	store.emitChange();
}

function filterEnumerable(obj: Object) {
	return pick(obj, Object.keys(obj));
}

function isStoresValid(key: string,
					   fluxStore: FluxStore<any>,
					   targetStoreAction: any,
					   state: AppState,
					   appStateProp: keyof AppState): boolean {
	const warnings = [];
	if (!fluxStore) {
		warnings.push(`key "${key}" does not exist in flux.stores`);
	}

	if (!targetStoreAction || !isFunction(targetStoreAction.fluxSync)) {
		warnings.push(`fluxSync is not a function in store for ${key}: `, targetStoreAction);
	}

	if (!state[appStateProp]) {
		warnings.push(`app state for "${appStateProp}" does not exist, please check reducers`);
	}

	if (warnings.length) {
		console.info(...warnings);
	}

	return Boolean(fluxStore && targetStoreAction && targetStoreAction.fluxSync && state[appStateProp]);
}

function printLog(action: string, ...data: any[]): void {
	if (!isDev) {
		return;
	}

	if (isLogsOn()) {
		console.groupCollapsed(action);
		console.info(
			"%c state from redux",
			"color: #4CAF50; font-weight: bold",
			...data
		);
		console.groupEnd();
	}
}

function Disposable(disposers: Disposers): Disposers {
	return {
		...disposers,
		disposeAll() {
			chain(disposers)
				.map(values)
				.flatten()
				.forEach(dispose => dispose())
				.value();
		}
	};
}
