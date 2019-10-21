"use strict";

import { combineReducers, Store, AnyAction } from "redux";
import {
	CustomizationBootstrapType, history, GetStoreConfig,
	reducers,
	configureStore,
	AppState,
} from "omnichannel-common-pos";

/**
 * README: All custom and overrides could be here, and reused in components as a:
 * import { AppState, actions } from "../../redux/setupRedux
 * See NavBarCurrencySelectionContainer.ts for details.
 */

export const getStore = <S extends AppState>(config: GetStoreConfig<S>) => {
	const allReducers = {...reducers, ...config.reducers};
	return configureStore<S>({
		rootReducer: combineReducers(allReducers as any),
		customSaga: config.customSaga,
		interceptReducers: config.interceptReducers,
		history,
		initialState: config.initialState

	}) as Store<S, AnyAction>;
};
