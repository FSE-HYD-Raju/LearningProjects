"use strict";

import { combineReducers, AnyAction, Store } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createMemoryHistory } from "history";

import { connectFluxRedux, getDefaultFluxStoreMap } from "../connectFluxRedux";
import reducers, { AppState } from "../reducers";
import actions from "../actions";
import { AppStore, configureStore } from "../store";
import { FluxAlt } from "../types";
import { InterceptReducers } from "../reducers/reducerUtils";

export const mockStore = (customReducers = {}, interceptors: InterceptReducers<AppState> = {}): AppStore<any> => {
	const allReducers = {...reducers, ...customReducers};
	return configureStore({
		rootReducer: combineReducers(allReducers as any),
		history: createMemoryHistory(),
		interceptReducers: interceptors
	});
};

export const setupFluxAndReduxTest = (flux: FluxAlt<any>): FluxAlt<any> => {
	const store = mockStore();
	connectFluxRedux(flux, store, getDefaultFluxStoreMap(), actions);
	flux.setReduxStore(store);
	return flux;
};

export default class ReduxTestUtils {
	static mockStore = mockStore;
	static setupFluxAndReduxTest = setupFluxAndReduxTest;
}
