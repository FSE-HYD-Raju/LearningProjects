"use strict";

import { Reducer, AnyAction } from "redux";
import { AppState } from "./index";

export type ReplacedReducerInterceptor<S> = (defaultReducer: Reducer<S>, state: S, action: AnyAction) => S;
export type InterceptReducers<S> = Record<AnyAction["type"], ReplacedReducerInterceptor<S>>;

export {
	overrideReducer
};

function overrideReducer<S extends AppState>(reducer: Reducer, interceptors: InterceptReducers<S> = {}) {
	return (state: S, action: AnyAction) => {
		return interceptors[action.type] ?
			interceptors[action.type](reducer, state, action) :
			reducer(state, action);
	};
}
