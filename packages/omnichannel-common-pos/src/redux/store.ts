"use strict";

import { applyMiddleware, compose, createStore, Store, AnyAction, Reducer, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";

import DevTools from "./DevTools";
import { AppState } from "./reducers";
import { overrideReducer, InterceptReducers } from "./reducers/reducerUtils";
import rootSaga from "./saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { loggerMiddleware, enrichRunLogs, isDev, setLogs } from "./loggerMiddleware";

export type AppStore<S extends AppState> = Store<S, AnyAction>;

const sagaMiddleware = createSagaMiddleware();
const middlewares: Array<Middleware> = [
	sagaMiddleware
];

if (isDev) {
	setLogs(false);
	middlewares.unshift(loggerMiddleware);
}

export interface StoreConfig<S> {
	rootReducer: Reducer;
	customSaga?: (() => Iterator<any>)|null;
	interceptReducers?: InterceptReducers<S>;
	history: any;
	initialState?: any;
}

export const configureStore = <S extends AppState>(config: StoreConfig<S>): AppStore<S> => {

	const { rootReducer, customSaga, interceptReducers = {}, history, initialState} = config;
	const reducers = connectRouter(history)(rootReducer);

	const store = createStore(
		overrideReducer(reducers, interceptReducers),
		initialState,
		compose(
			applyMiddleware(routerMiddleware(history), ...middlewares),
			DevTools.instrument()
		)
	);

	enrichRunLogs(store);

	sagaMiddleware.run(rootSaga);
	if (customSaga) {
		sagaMiddleware.run(customSaga);
	}

	return store;
};
